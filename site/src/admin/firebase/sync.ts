import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDb, getFirebaseAuth, isFirebaseConfigured } from "./config";
import { ensureFirebaseAuthReady } from "./authReady";
import type { AdminContent, ContactSubmission, SiteSettings, VideoTestimonial } from "../storage/types";
import type { BlogPost } from "../storage/types";

type SiteDocument = {
  videos: VideoTestimonial[];
  blogPosts: BlogPost[];
  siteSettings: SiteSettings | null;
};

let syncStarted = false;
let autoSeedAttempted = false;
let contactsUnsubscribe: Unsubscribe | null = null;

function buildSitePayload(data: {
  videos: VideoTestimonial[];
  blogPosts: BlogPost[];
  siteSettings: SiteSettings | null;
}) {
  return {
    videos: data.videos,
    blogPosts: data.blogPosts,
    siteSettings: data.siteSettings,
    updatedAt: serverTimestamp(),
  };
}

function isAdminUser(): boolean {
  return Boolean(getFirebaseAuth()?.currentUser);
}

function applySeedLocally(
  applyContent: (content: Partial<AdminContent>) => void,
  getSeedContent: () => AdminContent,
) {
  const seed = getSeedContent();
  applyContent({
    videos: seed.videos,
    blogPosts: seed.blogPosts,
    siteSettings: seed.siteSettings,
  });
}

function startContactsListener(
  applyContent: (content: Partial<AdminContent>) => void,
) {
  const db = getDb();
  if (!db || contactsUnsubscribe) return;

  const contactsQuery = query(collection(db, "contact_submissions"), orderBy("createdAt", "desc"));
  contactsUnsubscribe = onSnapshot(
    contactsQuery,
    (contactsSnapshot) => {
      const contactSubmissions = contactsSnapshot.docs.map(
        (d) => ({ id: d.id, ...d.data() }) as ContactSubmission,
      );
      applyContent({ contactSubmissions });
    },
    (error) => {
      console.warn("Firestore contact_submissions (admin):", error.message);
    },
  );
}

function stopContactsListener() {
  contactsUnsubscribe?.();
  contactsUnsubscribe = null;
}

function watchAdminAuth(applyContent: (content: Partial<AdminContent>) => void) {
  const auth = getFirebaseAuth();
  if (!auth) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      startContactsListener(applyContent);
    } else {
      stopContactsListener();
    }
  });
}

export function startFirestoreSync(
  applyContent: (content: Partial<AdminContent>) => void,
  getSeedContent: () => AdminContent,
) {
  if (!isFirebaseConfigured() || syncStarted || typeof window === "undefined") return;
  const db = getDb();
  if (!db) return;

  syncStarted = true;
  const siteRef = doc(db, "site", "content");

  onSnapshot(
    siteRef,
    async (snapshot) => {
      const seed = getSeedContent();

      if (!snapshot.exists()) {
        applySeedLocally(applyContent, getSeedContent);
        if (isAdminUser()) {
          try {
            await setDoc(siteRef, buildSitePayload(seed));
          } catch (error) {
            console.warn("Firestore seed site/content:", error);
          }
        }
        return;
      }

      const data = snapshot.data() as SiteDocument;

      if (!autoSeedAttempted && !data.blogPosts?.length && isAdminUser()) {
        autoSeedAttempted = true;
        try {
          await setDoc(
            siteRef,
            buildSitePayload({
              videos: data.videos ?? seed.videos,
              blogPosts: seed.blogPosts,
              siteSettings: data.siteSettings ?? seed.siteSettings,
            }),
            { merge: true },
          );
        } catch (error) {
          console.warn("Firestore auto-seed blog:", error);
        }
        return;
      }

      applyContent({
        videos: data.videos ?? [],
        blogPosts: data.blogPosts?.length ? data.blogPosts : seed.blogPosts,
        siteSettings: data.siteSettings ?? null,
      });
    },
    (error) => {
      console.warn("Firestore site/content:", error.message);
      applySeedLocally(applyContent, getSeedContent);
    },
  );

  watchAdminAuth(applyContent);
  if (isAdminUser()) {
    startContactsListener(applyContent);
  }
}

export async function saveSiteDocument(data: {
  videos: VideoTestimonial[];
  blogPosts: BlogPost[];
  siteSettings: SiteSettings | null;
}) {
  const db = getDb();
  if (!db) throw new Error("Firestore indisponible.");

  const auth = getFirebaseAuth();
  if (!auth?.currentUser) {
    throw new Error("Connectez-vous à l'admin pour enregistrer dans Firestore.");
  }

  const user = await ensureFirebaseAuthReady();

  try {
    await setDoc(doc(db, "site", "content"), buildSitePayload(data), { merge: true });
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === "permission-denied") {
      throw new Error(
        `Permission Firestore refusée pour ${user.email ?? "?"}. ` +
          "Vérifiez : (1) Règles Firestore publiées, (2) App Check désactivé pour Firestore, " +
          "(3) projet dor-hadash-a1202.",
      );
    }
    throw error;
  }
}

export async function pushFullContentToFirestore(content: AdminContent) {
  await saveSiteDocument({
    videos: content.videos,
    blogPosts: content.blogPosts,
    siteSettings: content.siteSettings,
  });
  await syncContactSubmissions(content.contactSubmissions);
}

export async function syncContactSubmissions(submissions: ContactSubmission[]) {
  const db = getDb();
  if (!db) throw new Error("Firestore indisponible.");
  if (!submissions.length) return;

  const batch = writeBatch(db);
  for (const submission of submissions) {
    batch.set(doc(db, "contact_submissions", submission.id), submission);
  }
  await batch.commit();
}

export async function addContactSubmissionDoc(submission: ContactSubmission) {
  const db = getDb();
  if (!db) throw new Error("Firestore indisponible.");

  await setDoc(doc(db, "contact_submissions", submission.id), submission);
}

export async function updateContactSubmissionDoc(id: string, data: Partial<ContactSubmission>) {
  const db = getDb();
  if (!db) throw new Error("Firestore indisponible.");

  await updateDoc(doc(db, "contact_submissions", id), data);
}

export async function deleteContactSubmissionDoc(id: string) {
  const db = getDb();
  if (!db) throw new Error("Firestore indisponible.");

  await deleteDoc(doc(db, "contact_submissions", id));
}
