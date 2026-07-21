import { blogPosts as staticBlogPosts } from "../../content/blog";
import { hero as defaultHero } from "../../content/homepage";
import { siteInfo as defaultSiteInfo } from "../../content/site";
import { isFirebaseConfigured } from "../firebase/config";
import {
  addContactSubmissionDoc,
  deleteContactSubmissionDoc,
  pushFullContentToFirestore,
  saveSiteDocument,
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
  videos: [],
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
let syncInitialized = false;
/** Évite qu'un snapshot Firestore stale écrase une sauvegarde locale en cours. */
let firestoreWriteInFlight = 0;

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

  cache = {
    ...cache,
    ...(partial.videos !== undefined && { videos: partial.videos }),
    ...(partial.blogPosts !== undefined && { blogPosts: partial.blogPosts }),
    ...(partial.siteSettings !== undefined && { siteSettings: partial.siteSettings }),
  };
  emit();
}

function persistLocalStorage() {
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  }
}

function persistSiteContent() {
  if (isFirebaseConfigured()) {
    void saveSiteDocument({
      videos: cache.videos,
      blogPosts: cache.blogPosts,
      siteSettings: cache.siteSettings,
    }).catch((error) => {
      console.error("Erreur enregistrement Firestore:", error);
    });
  } else {
    persistLocalStorage();
  }
  emit();
}

async function persistSiteContentAsync() {
  firestoreWriteInFlight++;
  try {
    if (isFirebaseConfigured()) {
      await saveSiteDocument({
        videos: cache.videos,
        blogPosts: cache.blogPosts,
        siteSettings: cache.siteSettings,
      });
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
  if (isFirebaseConfigured()) {
    void saveSiteDocument({
      videos: content.videos,
      blogPosts: content.blogPosts,
      siteSettings: content.siteSettings,
    });
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
  return cache.videos;
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
  cache = { ...cache, videos };
  persistSiteContent();
}

/** Enregistre les vidéos et attend la confirmation Firestore. */
export async function saveVideosAsync(
  videos: VideoTestimonial[],
): Promise<{ ok: true } | { ok: false; error: string }> {
  cache = { ...cache, videos };
  emit();

  try {
    await persistSiteContentAsync();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: formatFirestoreError(error) };
  }
}

export function saveBlogPosts(blogPosts: BlogPost[]) {
  cache = { ...cache, blogPosts };
  persistSiteContent();
}

export function upsertBlogPost(post: BlogPost) {
  const exists = cache.blogPosts.some((p) => p.slug === post.slug);
  const blogPosts = exists
    ? cache.blogPosts.map((p) => (p.slug === post.slug ? post : p))
    : [post, ...cache.blogPosts];
  cache = { ...cache, blogPosts };
  persistSiteContent();
}

export function deleteBlogPost(slug: string) {
  cache = { ...cache, blogPosts: cache.blogPosts.filter((p) => p.slug !== slug) };
  persistSiteContent();
}

export function addContactSubmission(
  data: Omit<ContactSubmission, "id" | "createdAt" | "read">,
) {
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
    void addContactSubmissionDoc(submission).catch((error) => {
      console.error("Erreur contact Firestore:", error);
    });
  } else {
    persistLocalStorage();
  }
  emit();
}

export function markContactRead(id: string, read = true) {
  cache = {
    ...cache,
    contactSubmissions: cache.contactSubmissions.map((s) =>
      s.id === id ? { ...s, read } : s,
    ),
  };
  sortedContactSubmissions = sortSubmissions(cache.contactSubmissions);

  if (isFirebaseConfigured()) {
    void updateContactSubmissionDoc(id, { read });
  } else {
    persistLocalStorage();
  }
  emit();
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
  persistSiteContent();
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
    await persistSiteContentAsync();
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
