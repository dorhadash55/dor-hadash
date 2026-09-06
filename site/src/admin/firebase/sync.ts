import {
  collection,
  deleteDoc,
  doc,
  getDoc,
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
import { startMediaSync } from "./mediaStore";
import { ensureFirebaseAuthReady } from "./authReady";
import type {
  AdminContent,
  ContactSubmission,
  RemoteContentPatch,
  SiteSettings,
  VideoTestimonial,
} from "../storage/types";
import type { BlogPost } from "../storage/types";
import type { VideoCategory } from "../../content/videos";
import { sortVideosForDisplay } from "../../content/videos";
import { extractYoutubeId } from "../utils/youtube";

type SiteDocument = {
  videos?: unknown;
  blogPosts?: BlogPost[];
  siteSettings?: SiteSettings | null;
};

let syncStarted = false;
let itemsSyncStarted = false;
let contactsUnsubscribe: Unsubscribe | null = null;
let itemSyncApply: ((content: RemoteContentPatch) => void) | null = null;
let itemSyncSeed: (() => AdminContent) | null = null;
let legacyVideos: VideoTestimonial[] = [];
let legacyBlogPosts: BlogPost[] = [];
let lastSiteSettings: SiteSettings | null | undefined;
let collectionVideoDocs: Array<VideoTestimonial & { deleted?: boolean }> | null = null;
let collectionPostDocs: Array<BlogPost & { deleted?: boolean }> | null = null;

function normalizeVideos(raw: unknown): VideoTestimonial[] {
  if (!Array.isArray(raw)) return [];

  const videos: VideoTestimonial[] = [];

  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const youtubeId =
      extractYoutubeId(String(row.youtubeId ?? row.youtube_id ?? "")) ??
      String(row.youtubeId ?? row.youtube_id ?? "").trim();
    const title = String(row.title ?? "").trim();
    if (!youtubeId || !title) continue;

    const category: VideoCategory =
      row.category === "programme" || row.category === "autre" || row.category === "temoignage"
        ? row.category
        : "temoignage";

    const sortKey = typeof row.sortKey === "number" ? row.sortKey : undefined;
    videos.push({
      id: String(row.id ?? youtubeId),
      youtubeId,
      title,
      caption: String(row.caption ?? ""),
      category,
      ...(sortKey !== undefined ? { sortKey } : {}),
    });
  }

  return videos;
}

function buildSitePayload(data: {
  videos?: VideoTestimonial[];
  blogPosts?: BlogPost[];
  siteSettings?: SiteSettings | null;
}) {
  const payload: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };
  if (data.videos !== undefined) payload.videos = data.videos;
  if (data.blogPosts !== undefined) payload.blogPosts = data.blogPosts;
  if (data.siteSettings !== undefined) payload.siteSettings = data.siteSettings;
  return payload;
}

function isAdminUser(): boolean {
  return Boolean(getFirebaseAuth()?.currentUser);
}

function applySeedLocally(
  applyContent: (content: RemoteContentPatch) => void,
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
  applyContent: (content: RemoteContentPatch) => void,
) {
  const db = getDb();
  if (!db || contactsUnsubscribe) return;

  const contactsQuery = query(collection(db, "contact_submissions"), orderBy("createdAt", "desc"));
  contactsUnsubscribe = onSnapshot(
    contactsQuery,
    (contactsSnapshot) => {
      const contactSubmissions = contactsSnapshot.docs.map((d) => {
        const data = d.data() as Record<string, unknown>;
        return {
          id: d.id,
          prenom: String(data.prenom ?? ""),
          nom: String(data.nom ?? ""),
          email: String(data.email ?? ""),
          telephone: String(data.telephone ?? ""),
          ville: String(data.ville ?? ""),
          horizon: String(data.horizon ?? ""),
          message: String(data.message ?? ""),
          createdAt: String(data.createdAt ?? ""),
          // Toujours un booléen (évite read manquant → badge bloqué)
          read: data.read === true,
        } as ContactSubmission;
      });
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

function stripDeleted<T extends { deleted?: boolean }>(item: T): Omit<T, "deleted"> {
  const { deleted: _deleted, ...rest } = item;
  return rest;
}

function mergePostLists(
  legacy: BlogPost[],
  overlay: Array<BlogPost & { deleted?: boolean }> | null,
): BlogPost[] {
  const overlayBySlug = new Map((overlay ?? []).map((post) => [post.slug, post]));
  const result: BlogPost[] = [];

  if (overlay) {
    for (const post of overlay) {
      if (post.deleted || legacy.some((item) => item.slug === post.slug)) continue;
      result.push(stripDeleted(post));
    }
  }

  for (const post of legacy) {
    const over = overlayBySlug.get(post.slug);
    if (over?.deleted) continue;
    result.push(over ? stripDeleted(over) : post);
  }

  return result;
}

function mergeVideoLists(
  legacy: VideoTestimonial[],
  overlay: Array<VideoTestimonial & { deleted?: boolean }> | null,
): VideoTestimonial[] {
  const overlayById = new Map((overlay ?? []).map((video) => [video.id, video]));
  const overlayByYoutube = new Map(
    (overlay ?? []).filter((video) => video.youtubeId).map((video) => [video.youtubeId, video]),
  );
  const result: VideoTestimonial[] = [];

  if (overlay) {
    for (const video of overlay) {
      if (
        video.deleted ||
        legacy.some((item) => item.id === video.id || item.youtubeId === video.youtubeId)
      ) {
        continue;
      }
      result.push(stripDeleted(video));
    }
  }

  for (const video of legacy) {
    const over = overlayById.get(video.id) ?? overlayByYoutube.get(video.youtubeId);
    if (over?.deleted) continue;
    result.push(over ? stripDeleted(over) : video);
  }

  return sortVideosForDisplay(result);
}

function emitItemMerge() {
  if (!itemSyncApply || !itemSyncSeed) return;
  const seed = itemSyncSeed();
  itemSyncApply({
    videos: mergeVideoLists(legacyVideos, collectionVideoDocs),
    blogPosts: mergePostLists(
      legacyBlogPosts.length ? legacyBlogPosts : seed.blogPosts,
      collectionPostDocs,
    ),
    excludedVideoIds: (collectionVideoDocs ?? [])
      .filter((video) => video.deleted)
      .map((video) => video.id),
    excludedPostSlugs: (collectionPostDocs ?? [])
      .filter((post) => post.deleted)
      .map((post) => post.slug),
    ...(lastSiteSettings !== undefined ? { siteSettings: lastSiteSettings } : {}),
  });
}

function normalizePostDoc(
  id: string,
  raw: Record<string, unknown>,
): (BlogPost & { deleted?: boolean }) | null {
  const slug = String(raw.slug ?? id).trim();
  if (!slug) return null;
  if (raw.deleted === true) {
    return { slug, title: "", excerpt: "", metaDescription: "", author: "", date: "", coverImage: "", legacyUrl: "", paragraphs: [], deleted: true };
  }

  const paragraphs = Array.isArray(raw.paragraphs)
    ? raw.paragraphs.map((p) => String(p))
    : [];
  const sortKey = typeof raw.sortKey === "number" ? raw.sortKey : undefined;

  return {
    slug,
    title: String(raw.title ?? ""),
    ...(typeof raw.seoTitle === "string" ? { seoTitle: raw.seoTitle } : {}),
    excerpt: String(raw.excerpt ?? ""),
    metaDescription: String(raw.metaDescription ?? ""),
    author: String(raw.author ?? ""),
    date: String(raw.date ?? ""),
    coverImage: String(raw.coverImage ?? ""),
    legacyUrl: String(raw.legacyUrl ?? `/blog/${slug}/`),
    paragraphs,
    ...(sortKey !== undefined ? { sortKey } : {}),
  };
}

function normalizeVideoDoc(
  id: string,
  raw: Record<string, unknown>,
): (VideoTestimonial & { deleted?: boolean }) | null {
  if (raw.deleted === true) {
    return { id, youtubeId: "", title: "", caption: "", deleted: true };
  }

  const videos = normalizeVideos([{ ...raw, id: raw.id ?? id }]);
  return videos[0] ?? null;
}

function startItemCollectionsSync(
  applyContent: (content: RemoteContentPatch) => void,
  getSeedContent: () => AdminContent,
) {
  if (itemsSyncStarted) return;
  const db = getDb();
  if (!db) return;

  itemsSyncStarted = true;
  itemSyncApply = applyContent;
  itemSyncSeed = getSeedContent;

  onSnapshot(
    collection(db, "site", "content", "posts"),
    (snapshot) => {
      collectionPostDocs = snapshot.docs
        .map((document) => normalizePostDoc(document.id, document.data() as Record<string, unknown>))
        .filter((post): post is BlogPost & { deleted?: boolean } => Boolean(post));
      emitItemMerge();
    },
    (error) => {
      console.warn("[Dor Hadash] Lecture posts Firestore:", error.message);
    },
  );

  onSnapshot(
    collection(db, "site", "content", "videos"),
    (snapshot) => {
      collectionVideoDocs = snapshot.docs
        .map((document) => normalizeVideoDoc(document.id, document.data() as Record<string, unknown>))
        .filter((video): video is VideoTestimonial & { deleted?: boolean } => Boolean(video));
      emitItemMerge();
    },
    (error) => {
      console.warn("[Dor Hadash] Lecture vidéos Firestore:", error.message);
    },
  );
}

async function assertAdminWrite() {
  const db = getDb();
  if (!db) throw new Error("Firestore indisponible.");

  const auth = getFirebaseAuth();
  if (!auth?.currentUser) {
    throw new Error(
      "Session Firebase absente. Connectez-vous avec Google (compte admin) pour enregistrer dans Firestore.",
    );
  }

  await ensureFirebaseAuthReady();
  return db;
}

function withoutUndefined(data: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
}

export async function upsertBlogPostDoc(post: BlogPost) {
  const db = await assertAdminWrite();
  await setDoc(
    doc(db, "site", "content", "posts", post.slug),
    withoutUndefined({
      ...post,
      deleted: false,
      updatedAt: serverTimestamp(),
    }),
  );
}

export async function deleteBlogPostDoc(slug: string) {
  const db = await assertAdminWrite();
  await setDoc(
    doc(db, "site", "content", "posts", slug),
    { slug, deleted: true, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export async function upsertVideoDoc(video: VideoTestimonial) {
  const db = await assertAdminWrite();
  await setDoc(
    doc(db, "site", "content", "videos", video.id),
    withoutUndefined({
      ...video,
      deleted: false,
      updatedAt: serverTimestamp(),
    }),
  );
}

export async function deleteVideoDoc(id: string) {
  const db = await assertAdminWrite();
  await setDoc(
    doc(db, "site", "content", "videos", id),
    { id, deleted: true, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

function watchAdminAuth(applyContent: (content: RemoteContentPatch) => void) {
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
  applyContent: (content: RemoteContentPatch) => void,
  getSeedContent: () => AdminContent,
) {
  if (!isFirebaseConfigured() || syncStarted || typeof window === "undefined") return;
  const db = getDb();
  if (!db) return;

  syncStarted = true;
  itemSyncApply = applyContent;
  itemSyncSeed = getSeedContent;
  startMediaSync();
  startItemCollectionsSync(applyContent, getSeedContent);
  const siteRef = doc(db, "site", "content");

  onSnapshot(
    siteRef,
    async (snapshot) => {
      const seed = getSeedContent();

      if (!snapshot.exists()) {
        applySeedLocally(applyContent, getSeedContent);
        legacyVideos = [];
        legacyBlogPosts = seed.blogPosts;
        lastSiteSettings = seed.siteSettings;
        emitItemMerge();
        if (isAdminUser()) {
          try {
            await setDoc(
              siteRef,
              { siteSettings: seed.siteSettings, updatedAt: serverTimestamp() },
              { merge: true },
            );
          } catch (error) {
            console.warn("Firestore seed site/content:", error);
          }
        }
        return;
      }

      const data = snapshot.data() as SiteDocument;
      legacyVideos = normalizeVideos(data.videos);
      legacyBlogPosts = data.blogPosts?.length ? data.blogPosts : seed.blogPosts;
      lastSiteSettings = data.siteSettings ?? null;
      emitItemMerge();

      if (import.meta.env.DEV) {
        console.info(`[Dor Hadash] Firestore : ${legacyVideos.length} vidéo(s) héritée(s).`);
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

type SaveSiteOptions = {
  /** Autoriser l'écriture explicite de videos: [] (suppression volontaire dans l'admin vidéos). */
  allowEmptyVideos?: boolean;
};

/**
 * Écrit partiellement site/content.
 * Protection : une liste videos vide n'écrase jamais des vidéos déjà présentes en Firebase,
 * sauf si allowEmptyVideos=true (action volontaire depuis la page Vidéos).
 */
export async function saveSiteDocument(
  data: {
    videos?: VideoTestimonial[];
    blogPosts?: BlogPost[];
    siteSettings?: SiteSettings | null;
  },
  options: SaveSiteOptions = {},
) {
  const db = getDb();
  if (!db) throw new Error("Firestore indisponible.");

  const auth = getFirebaseAuth();
  if (!auth?.currentUser) {
    throw new Error(
      "Session Firebase absente. Connectez-vous avec Google (compte admin) pour enregistrer dans Firestore.",
    );
  }

  const user = await ensureFirebaseAuthReady();
  const siteRef = doc(db, "site", "content");
  const payload = { ...data };

  if (payload.videos !== undefined && payload.videos.length === 0 && !options.allowEmptyVideos) {
    try {
      const snap = await getDoc(siteRef);
      const remoteVideos = normalizeVideos(snap.data()?.videos);
      if (remoteVideos.length > 0) {
        console.warn(
          "[Dor Hadash] Protection anti-effacement : refus d'écraser",
          remoteVideos.length,
          "vidéo(s) Firebase avec une liste locale vide.",
        );
        delete payload.videos;
      }
    } catch (error) {
      console.warn("[Dor Hadash] Impossible de vérifier les vidéos distantes:", error);
      delete payload.videos;
    }
  }

  if (
    payload.videos === undefined &&
    payload.blogPosts === undefined &&
    payload.siteSettings === undefined
  ) {
    return;
  }

  try {
    await setDoc(siteRef, buildSitePayload(payload), { merge: true });
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
    throw new Error(
      "Session Firebase absente. Connectez-vous avec Google (compte admin) pour enregistrer dans Firestore.",
    );
  }

  await ensureFirebaseAuthReady();

  await setDoc(
    doc(db, "site", "content"),
    { siteSettings: settings, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export async function pushFullContentToFirestore(content: AdminContent) {
  if (content.siteSettings) {
    await saveSiteSettingsDocument(content.siteSettings);
  }
  for (const post of content.blogPosts) {
    await upsertBlogPostDoc(post);
  }
  for (const video of content.videos) {
    await upsertVideoDoc(video);
  }
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
