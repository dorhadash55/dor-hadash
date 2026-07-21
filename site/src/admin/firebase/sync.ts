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
  videos?: unknown;
  blogPosts?: BlogPost[];
  siteSettings?: SiteSettings | null;
};

let syncStarted = false;
let autoSeedAttempted = false;
let contactsUnsubscribe: Unsubscribe | null = null;

function normalizeVideos(raw: unknown): VideoTestimonial[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const youtubeId = String(row.youtubeId ?? row.youtube_id ?? "").trim();
      const title = String(row.title ?? "").trim();
      if (!youtubeId || !title) return null;

      return {
        id: String(row.id ?? youtubeId),
        youtubeId,
        title,
        caption: String(row.caption ?? ""),
      };
    })
    .filter((video): video is VideoTestimonial => video !== null);
}

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
      const videos = normalizeVideos(data.videos);
      const blogPosts = data.blogPosts?.length ? data.blogPosts : seed.blogPosts;
      const siteSettings = data.siteSettings ?? null;

      applyContent({ videos, blogPosts, siteSettings });

      if (import.meta.env.DEV) {
        console.info(`[Dor Hadash] Firestore : ${videos.length} vidéo(s) chargée(s).`);
      }

      if (!autoSeedAttempted && !data.blogPosts?.length && isAdminUser()) {
        autoSeedAttempted = true;
        try {
          await setDoc(
            siteRef,
            buildSitePayload({
              videos,
              blogPosts: seed.blogPosts,
              siteSettings: data.siteSettings ?? seed.siteSettings,
            }),
            { merge: true },
          );
        } catch (error) {
          console.warn("Firestore auto-seed blog:", error);
        }
      }
    },
    (error) => {
      console.warn(
        "[Dor Hadash] Impossible de lire site/content :",
        error.message,
        "→ Vérifiez App Check (Unenforced) et les variables VITE_FIREBASE_* sur Vercel.",
      );
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

export async function saveSiteSettingsDocument(settings: SiteSettings) {
  const db = getDb();
  if (!db) throw new Error("Firestore indisponible.");

  const auth = getFirebaseAuth();
  if (!auth?.currentUser) {
    throw new Error("Connectez-vous à l'admin pour enregistrer dans Firestore.");
  }

  await ensureFirebaseAuthReady();

  await setDoc(
    doc(db, "site", "content"),
    { siteSettings: settings, updatedAt: serverTimestamp() },
    { merge: true },
  );
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
