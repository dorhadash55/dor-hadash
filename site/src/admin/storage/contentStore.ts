import { blogPosts as staticBlogPosts } from "../../content/blog";
import { hero as defaultHero } from "../../content/homepage";
import { siteInfo as defaultSiteInfo } from "../../content/site";
import { videoTestimonials as staticVideos } from "../../content/videos";
import { isFirebaseConfigured } from "../firebase/config";
import {
  addContactSubmissionDoc,
  deleteContactSubmissionDoc,
  pushFullContentToFirestore,
  saveSiteDocument,
  saveSiteSettingsDocument,
  startFirestoreSync,
  syncContactSubmissions,
  updateContactSubmissionDoc,
} from "../firebase/sync";
import type {
  AdminContent,
  BlogPost,
  ContactSubmission,
  SiteSettings,
  VideoTestimonial,
} from "./types";

export { isFirebaseConfigured } from "../firebase/config";

const STORAGE_KEY = "dor-hadash:admin-content";

const defaultSiteSettings = (): SiteSettings => ({
  email: defaultSiteInfo.email,
  phonesIsrael: [...defaultSiteInfo.phones.israel],
  phonesFrance: [...defaultSiteInfo.phones.france],
  hero: {
    eyebrow: defaultHero.eyebrow,
    title: defaultHero.title,
    subtitle: defaultHero.subtitle,
  },
});

/** Référence stable pour useSyncExternalStore quand siteSettings est null. */
const DEFAULT_SITE_SETTINGS = defaultSiteSettings();

const defaultContent = (): AdminContent => ({
  videos: [...staticVideos],
  blogPosts: [...staticBlogPosts],
  contactSubmissions: [],
  siteSettings: null,
});

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function isBrowser() {
  return typeof window !== "undefined";
}

function sortSubmissions(submissions: ContactSubmission[]) {
  return [...submissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

let cache = defaultContent();
/** Cache trié — même référence tant que contactSubmissions n'a pas changé. */
let sortedContactSubmissions = sortSubmissions(cache.contactSubmissions);
/** Fusion static + Firebase — même référence tant que cache.videos n'a pas changé. */
let mergedVideos = mergeVideos(cache.videos);
let syncInitialized = false;
/** Évite qu'un snapshot Firestore stale écrase une sauvegarde locale en cours. */
let firestoreWriteInFlight = 0;

function mergeVideos(remote: VideoTestimonial[]): VideoTestimonial[] {
  if (!remote.length) return staticVideos;

  const byId = new Map<string, VideoTestimonial>();
  for (const v of staticVideos) byId.set(v.youtubeId, v);
  for (const v of remote) {
    const base = byId.get(v.youtubeId);
    byId.set(
      v.youtubeId,
      base
        ? {
            ...base,
            ...v,
            title: v.title?.trim() || base.title,
            caption: v.caption?.trim() || base.caption,
            category: v.category ?? base.category,
          }
        : v,
    );
  }

  const ordered: VideoTestimonial[] = [];
  const seen = new Set<string>();
  for (const v of staticVideos) {
    const item = byId.get(v.youtubeId);
    if (item) {
      ordered.push(item);
      seen.add(v.youtubeId);
    }
  }
  for (const v of remote) {
    if (!seen.has(v.youtubeId)) ordered.push(byId.get(v.youtubeId) ?? v);
  }
  return ordered;
}

function setCacheVideos(videos: VideoTestimonial[]) {
  cache = { ...cache, videos };
  mergedVideos = mergeVideos(videos);
}

function readRaw(): AdminContent {
  if (!isBrowser()) return defaultContent();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent();
    const parsed = JSON.parse(raw) as AdminContent;
    return {
      videos: parsed.videos ?? [],
      blogPosts: parsed.blogPosts?.length ? parsed.blogPosts : [...staticBlogPosts],
      contactSubmissions: parsed.contactSubmissions ?? [],
      siteSettings: parsed.siteSettings ?? null,
    };
  } catch {
    return defaultContent();
  }
}

function refreshCache() {
  cache = readRaw();
  sortedContactSubmissions = sortSubmissions(cache.contactSubmissions);
  mergedVideos = mergeVideos(cache.videos);
}

function applyRemoteContent(partial: Partial<AdminContent>) {
  if (partial.contactSubmissions !== undefined) {
    cache = { ...cache, contactSubmissions: partial.contactSubmissions };
    sortedContactSubmissions = sortSubmissions(cache.contactSubmissions);
    emit();
  }

  const hasSiteFields =
    partial.videos !== undefined ||
    partial.blogPosts !== undefined ||
    partial.siteSettings !== undefined;

  if (!hasSiteFields) return;

  if (firestoreWriteInFlight > 0) return;

  const nextVideos = partial.videos !== undefined ? partial.videos : cache.videos;
  cache = {
    ...cache,
    ...(partial.videos !== undefined && { videos: partial.videos }),
    ...(partial.blogPosts !== undefined && { blogPosts: partial.blogPosts }),
    ...(partial.siteSettings !== undefined && { siteSettings: partial.siteSettings }),
  };
  if (partial.videos !== undefined) {
    mergedVideos = mergeVideos(nextVideos);
  }
  persistLocalStorage();
  emit();
}

function persistLocalStorage() {
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  }
}

type PersistFields = "videos" | "blogPosts" | "siteSettings";

function persistSiteContent(fields: PersistFields[] = ["blogPosts", "siteSettings"]) {
  if (isFirebaseConfigured()) {
    const payload: {
      videos?: VideoTestimonial[];
      blogPosts?: BlogPost[];
      siteSettings?: SiteSettings | null;
    } = {};
    if (fields.includes("videos")) payload.videos = cache.videos;
    if (fields.includes("blogPosts")) payload.blogPosts = cache.blogPosts;
    if (fields.includes("siteSettings")) payload.siteSettings = cache.siteSettings;

    void saveSiteDocument(payload).catch((error) => {
      console.error("Erreur enregistrement Firestore:", error);
    });
    persistLocalStorage();
  } else {
    persistLocalStorage();
  }
  emit();
}

async function persistSiteContentAsync(
  fields: PersistFields[] = ["blogPosts", "siteSettings"],
  options?: { allowEmptyVideos?: boolean },
) {
  firestoreWriteInFlight++;
  try {
    if (isFirebaseConfigured()) {
      const payload: {
        videos?: VideoTestimonial[];
        blogPosts?: BlogPost[];
        siteSettings?: SiteSettings | null;
      } = {};
      if (fields.includes("videos")) payload.videos = cache.videos;
      if (fields.includes("blogPosts")) payload.blogPosts = cache.blogPosts;
      if (fields.includes("siteSettings")) payload.siteSettings = cache.siteSettings;

      await saveSiteDocument(payload, options);
      persistLocalStorage();
    } else {
      persistLocalStorage();
    }
    emit();
  } finally {
    firestoreWriteInFlight--;
  }
}

function formatFirestoreError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Erreur Firestore.";
}

function write(content: AdminContent) {
  cache = content;
  sortedContactSubmissions = sortSubmissions(content.contactSubmissions);
  mergedVideos = mergeVideos(content.videos);
  if (isFirebaseConfigured()) {
    // Protection anti-effacement active si videos est []
    void saveSiteDocument({
      videos: content.videos,
      blogPosts: content.blogPosts,
      siteSettings: content.siteSettings,
    }).catch((error) => {
      console.error("Erreur enregistrement Firestore:", error);
    });
    persistLocalStorage();
  } else {
    persistLocalStorage();
  }
  emit();
}

/** Démarre l'écoute Firestore (ou charge localStorage en mode local). */
export function initContentSync() {
  if (!isBrowser() || syncInitialized) return;
  syncInitialized = true;

  if (isFirebaseConfigured()) {
    // Affichage immédiat du dernier contenu connu, puis sync Firestore
    refreshCache();
    emit();
    startFirestoreSync(applyRemoteContent, defaultContent);
    return;
  }

  refreshCache();
  emit();
}

export function subscribeContent(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getContentSnapshot(): AdminContent {
  return cache;
}

export function getVideos(): VideoTestimonial[] {
  return mergedVideos;
}

export function getBlogPosts(): BlogPost[] {
  return cache.blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return cache.blogPosts.find((p) => p.slug === slug);
}

export function getContactSubmissions(): ContactSubmission[] {
  return sortedContactSubmissions;
}

export function getSiteSettings(): SiteSettings {
  return cache.siteSettings ?? DEFAULT_SITE_SETTINGS;
}

export function saveVideos(videos: VideoTestimonial[]) {
  setCacheVideos(videos);
  void persistSiteContentAsync(["videos"], { allowEmptyVideos: true }).catch((error) => {
    console.error("Erreur enregistrement vidéos:", error);
  });
  emit();
}

/** Enregistre les vidéos et attend la confirmation Firestore. */
export async function saveVideosAsync(
  videos: VideoTestimonial[],
): Promise<{ ok: true } | { ok: false; error: string }> {
  setCacheVideos(videos);
  emit();

  try {
    // allowEmptyVideos: suppression volontaire de toutes les vidéos depuis l'admin
    await persistSiteContentAsync(["videos"], { allowEmptyVideos: true });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: formatFirestoreError(error) };
  }
}

export function saveBlogPosts(blogPosts: BlogPost[]) {
  cache = { ...cache, blogPosts };
  persistSiteContent(["blogPosts"]);
}

export function upsertBlogPost(post: BlogPost) {
  const exists = cache.blogPosts.some((p) => p.slug === post.slug);
  const blogPosts = exists
    ? cache.blogPosts.map((p) => (p.slug === post.slug ? post : p))
    : [post, ...cache.blogPosts];
  cache = { ...cache, blogPosts };
  persistSiteContent(["blogPosts"]);
}

export function deleteBlogPost(slug: string) {
  cache = { ...cache, blogPosts: cache.blogPosts.filter((p) => p.slug !== slug) };
  persistSiteContent(["blogPosts"]);
}

export async function addContactSubmission(
  data: Omit<ContactSubmission, "id" | "createdAt" | "read">,
): Promise<ContactSubmission> {
  const submission: ContactSubmission = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  cache = {
    ...cache,
    contactSubmissions: [submission, ...cache.contactSubmissions],
  };
  sortedContactSubmissions = sortSubmissions(cache.contactSubmissions);

  if (isFirebaseConfigured()) {
    try {
      await addContactSubmissionDoc(submission);
    } catch (error) {
      // Les emails sont déjà partis côté Contact : on ne bloque pas l'utilisateur.
      // Cause fréquente : règles Firestore non publiées, ou App Check en mode Enforced.
      console.error("Erreur contact Firestore:", error);
      console.warn(
        "[Dor Hadash] Message conservé localement. Publiez firestore.rules " +
          "(create public sur contact_submissions) et vérifiez App Check → Firestore → Unenforced.",
      );
    }
  } else {
    persistLocalStorage();
  }
  emit();
  return submission;
}

export function markContactRead(id: string, read = true) {
  cache = {
    ...cache,
    contactSubmissions: cache.contactSubmissions.map((s) =>
      s.id === id ? { ...s, read } : s,
    ),
  };
  sortedContactSubmissions = sortSubmissions(cache.contactSubmissions);
  persistLocalStorage();
  emit();

  if (isFirebaseConfigured()) {
    void updateContactSubmissionDoc(id, { read }).catch((error) => {
      console.error("Erreur marquage lu Firestore:", error);
    });
  }
}

export function markAllContactsRead() {
  const unread = cache.contactSubmissions.filter((s) => !s.read);
  if (unread.length === 0) return;

  cache = {
    ...cache,
    contactSubmissions: cache.contactSubmissions.map((s) => ({ ...s, read: true })),
  };
  sortedContactSubmissions = sortSubmissions(cache.contactSubmissions);
  persistLocalStorage();
  emit();

  if (isFirebaseConfigured()) {
    for (const s of unread) {
      void updateContactSubmissionDoc(s.id, { read: true }).catch((error) => {
        console.error("Erreur marquage lu Firestore:", error);
      });
    }
  }
}

export function deleteContactSubmission(id: string) {
  cache = {
    ...cache,
    contactSubmissions: cache.contactSubmissions.filter((s) => s.id !== id),
  };
  sortedContactSubmissions = sortSubmissions(cache.contactSubmissions);

  if (isFirebaseConfigured()) {
    void deleteContactSubmissionDoc(id);
  } else {
    persistLocalStorage();
  }
  emit();
}

export function saveSiteSettings(settings: SiteSettings) {
  cache = { ...cache, siteSettings: settings };
  if (isFirebaseConfigured()) {
    void saveSiteSettingsDocument(settings).catch((error) => {
      console.error("Erreur paramètres Firestore:", error);
    });
    persistLocalStorage();
  } else {
    persistLocalStorage();
  }
  emit();
}

export function resetContentToDefaults() {
  write(defaultContent());
}

export function exportContentJson(): string {
  return JSON.stringify(cache, null, 2);
}

export function importContentJson(json: string) {
  const parsed = JSON.parse(json) as AdminContent;
  write({
    videos: parsed.videos ?? [],
    blogPosts: parsed.blogPosts ?? [],
    contactSubmissions: parsed.contactSubmissions ?? [],
    siteSettings: parsed.siteSettings ?? null,
  });

  if (isFirebaseConfigured() && parsed.contactSubmissions?.length) {
    void syncContactSubmissions(parsed.contactSubmissions).catch((error) => {
      console.error("Erreur sync contacts Firestore:", error);
    });
  }
}

/** Enregistre tout le contenu (blogs, vidéos, paramètres, contacts) dans Firestore. */
export async function pushAllContentToFirestore(): Promise<
  { ok: true } | { ok: false; error: string }
> {
  if (!isFirebaseConfigured()) {
    return { ok: false, error: "Firebase non configuré." };
  }

  try {
    await pushFullContentToFirestore(cache);
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur Firestore.";
    return { ok: false, error: message };
  }
}

/** Enregistre un article et attend la confirmation Firestore. */
export async function upsertBlogPostAsync(post: BlogPost): Promise<
  { ok: true } | { ok: false; error: string }
> {
  const exists = cache.blogPosts.some((p) => p.slug === post.slug);
  const blogPosts = exists
    ? cache.blogPosts.map((p) => (p.slug === post.slug ? post : p))
    : [post, ...cache.blogPosts];

  cache = { ...cache, blogPosts };

  try {
    await persistSiteContentAsync(["blogPosts"]);
    return { ok: true };
  } catch (error) {
    const message = formatFirestoreError(error);
    return { ok: false, error: message };
  }
}

export function getAdminStats() {
  const unread = cache.contactSubmissions.filter((s) => !s.read).length;
  return {
    videos: cache.videos.length,
    blogPosts: cache.blogPosts.length,
    contacts: cache.contactSubmissions.length,
    unreadContacts: unread,
  };
}
