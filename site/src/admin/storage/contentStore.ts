import { blogPosts as staticBlogPosts } from "../../content/blog";
import { hero as defaultHero } from "../../content/homepage";
import { siteInfo as defaultSiteInfo } from "../../content/site";
import { sortVideosForDisplay, videoTestimonials as staticVideos } from "../../content/videos";
import { isFirebaseConfigured } from "../firebase/config";
import {
  addContactSubmissionDoc,
  deleteBlogPostDoc,
  deleteContactSubmissionDoc,
  deleteVideoDoc,
  pushFullContentToFirestore,
  saveSiteSettingsDocument,
  startFirestoreSync,
  syncContactSubmissions,
  updateContactSubmissionDoc,
  upsertBlogPostDoc,
  upsertVideoDoc,
} from "../firebase/sync";
import type {
  AdminContent,
  BlogPost,
  ContactSubmission,
  RemoteContentPatch,
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

const excludedVideoIds = new Set<string>();
const excludedPostSlugs = new Set<string>();
let cache = defaultContent();
/** Cache trié — même référence tant que contactSubmissions n'a pas changé. */
let sortedContactSubmissions = sortSubmissions(cache.contactSubmissions);
/** Fusion static + Firebase — même référence tant que cache.videos n'a pas changé. */
let mergedVideos = mergeVideos(cache.videos);
/** Même référence tant que la liste visible n'a pas vraiment changé (useSyncExternalStore). */
let visibleBlogPosts = cache.blogPosts;
let syncInitialized = false;
/** Évite qu'un snapshot Firestore stale écrase une sauvegarde locale en cours. */
let firestoreWriteInFlight = 0;

function syncVisibleBlogPosts() {
  const next =
    excludedPostSlugs.size === 0
      ? cache.blogPosts
      : cache.blogPosts.filter((post) => !excludedPostSlugs.has(post.slug));
  if (
    next.length === visibleBlogPosts.length &&
    next.every((post, index) => post === visibleBlogPosts[index])
  ) {
    return;
  }
  visibleBlogPosts = next;
}

function isExcludedVideo(video: Pick<VideoTestimonial, "id" | "youtubeId">) {
  return excludedVideoIds.has(video.id) || excludedVideoIds.has(video.youtubeId);
}

function mergeVideos(remote: VideoTestimonial[]): VideoTestimonial[] {
  if (!remote.length) {
    return staticVideos.filter((video) => !isExcludedVideo(video));
  }

  const byId = new Map<string, VideoTestimonial>();
  for (const v of staticVideos) {
    if (isExcludedVideo(v)) continue;
    byId.set(v.youtubeId, v);
  }
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
    if (isExcludedVideo(v)) continue;
    const item = byId.get(v.youtubeId);
    if (item) {
      ordered.push(item);
      seen.add(v.youtubeId);
    }
  }
  for (const v of remote) {
    if (isExcludedVideo(v) || seen.has(v.youtubeId)) continue;
    ordered.push(byId.get(v.youtubeId) ?? v);
  }
  return sortVideosForDisplay(ordered);
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
  syncVisibleBlogPosts();
}

function applyRemoteContent(partial: RemoteContentPatch) {
  for (const id of partial.excludedVideoIds ?? []) excludedVideoIds.add(id);
  for (const slug of partial.excludedPostSlugs ?? []) excludedPostSlugs.add(slug);

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
    ...(partial.blogPosts !== undefined && {
      blogPosts: partial.blogPosts.filter((post) => !excludedPostSlugs.has(post.slug)),
    }),
    ...(partial.siteSettings !== undefined && { siteSettings: partial.siteSettings }),
  };
  if (partial.videos !== undefined) {
    mergedVideos = mergeVideos(nextVideos);
  }
  syncVisibleBlogPosts();
  persistLocalStorage();
  emit();
}

function persistLocalStorage() {
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  }
}

async function persistItems<T>(write: () => Promise<void>, applyLocal: () => T): Promise<T> {
  const result = applyLocal();
  firestoreWriteInFlight++;
  try {
    if (isFirebaseConfigured()) {
      await write();
    }
    persistLocalStorage();
    emit();
    return result;
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
  syncVisibleBlogPosts();
  persistLocalStorage();
  emit();

  if (!isFirebaseConfigured()) return;

  void (async () => {
    firestoreWriteInFlight++;
    try {
      if (content.siteSettings) {
        await saveSiteSettingsDocument(content.siteSettings);
      }
      for (const post of content.blogPosts) {
        await upsertBlogPostDoc(post);
      }
      for (const video of content.videos) {
        await upsertVideoDoc(video);
      }
    } catch (error) {
      console.error("Erreur enregistrement Firestore:", error);
    } finally {
      firestoreWriteInFlight--;
    }
  })();
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
  return visibleBlogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  if (excludedPostSlugs.has(slug)) return undefined;
  return cache.blogPosts.find((p) => p.slug === slug);
}

export function getContactSubmissions(): ContactSubmission[] {
  return sortedContactSubmissions;
}

export function getSiteSettings(): SiteSettings {
  return cache.siteSettings ?? DEFAULT_SITE_SETTINGS;
}

function applyBlogPostLocal(post: BlogPost, previousSlug?: string) {
  if (previousSlug && previousSlug !== post.slug) {
    excludedPostSlugs.add(previousSlug);
  }
  const withoutOld =
    previousSlug && previousSlug !== post.slug
      ? cache.blogPosts.filter((p) => p.slug !== previousSlug)
      : cache.blogPosts;
  const exists = withoutOld.some((p) => p.slug === post.slug);
  cache = {
    ...cache,
    blogPosts: exists
      ? withoutOld.map((p) => (p.slug === post.slug ? post : p))
      : [post, ...withoutOld],
  };
  syncVisibleBlogPosts();
}

function nextVideoSortKey(list: VideoTestimonial[]) {
  const max = list.reduce((acc, video) => Math.max(acc, video.sortKey ?? 0), 0);
  return Math.max(max, Date.now());
}

export async function upsertVideoAsync(
  video: VideoTestimonial,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const existsAlready = mergedVideos.some((item) => item.id === video.id);
  const withKey: VideoTestimonial = {
    ...video,
    ...(video.sortKey !== undefined
      ? { sortKey: video.sortKey }
      : existsAlready
        ? {}
        : { sortKey: nextVideoSortKey(mergedVideos) + 1000 }),
  };

  try {
    await persistItems(
      () => upsertVideoDoc(withKey),
      () => {
        const exists = cache.videos.some((item) => item.id === withKey.id);
        setCacheVideos(
          exists
            ? cache.videos.map((item) => (item.id === withKey.id ? withKey : item))
            : [withKey, ...cache.videos],
        );
      },
    );
    return { ok: true };
  } catch (error) {
    return { ok: false, error: formatFirestoreError(error) };
  }
}

export async function deleteVideoAsync(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await persistItems(
      () => deleteVideoDoc(id),
      () => {
        excludedVideoIds.add(id);
        const current = mergedVideos.find((video) => video.id === id);
        if (current) excludedVideoIds.add(current.youtubeId);
        setCacheVideos(cache.videos.filter((video) => video.id !== id));
      },
    );
    return { ok: true };
  } catch (error) {
    return { ok: false, error: formatFirestoreError(error) };
  }
}

export async function reorderVideosAsync(
  index: number,
  direction: -1 | 1,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const list = mergedVideos.map((video, i) => ({
    ...video,
    sortKey: video.sortKey ?? (mergedVideos.length - i) * 1000,
  }));
  const target = index + direction;
  if (target < 0 || target >= list.length) return { ok: true };

  const from = list[index];
  const to = list[target];
  list[index] = { ...to, sortKey: from.sortKey };
  list[target] = { ...from, sortKey: to.sortKey };

  try {
    await persistItems(
      async () => {
        await upsertVideoDoc(list[index]);
        await upsertVideoDoc(list[target]);
      },
      () => {
        cache = { ...cache, videos: list };
        mergedVideos = list;
      },
    );
    return { ok: true };
  } catch (error) {
    return { ok: false, error: formatFirestoreError(error) };
  }
}

export function saveBlogPosts(blogPosts: BlogPost[]) {
  cache = { ...cache, blogPosts };
  syncVisibleBlogPosts();
  persistLocalStorage();
  emit();
}

export function upsertBlogPost(post: BlogPost, previousSlug?: string) {
  applyBlogPostLocal(post, previousSlug);
  persistLocalStorage();
  emit();
  if (isFirebaseConfigured()) {
    void persistItems(
      async () => {
        await upsertBlogPostDoc(post);
        if (previousSlug && previousSlug !== post.slug) {
          await deleteBlogPostDoc(previousSlug);
        }
      },
      () => undefined,
    ).catch((error) => {
      console.error("Erreur enregistrement article:", error);
    });
  }
}

export function deleteBlogPost(slug: string) {
  excludedPostSlugs.add(slug);
  cache = { ...cache, blogPosts: cache.blogPosts.filter((p) => p.slug !== slug) };
  syncVisibleBlogPosts();
  persistLocalStorage();
  emit();
  if (isFirebaseConfigured()) {
    void persistItems(() => deleteBlogPostDoc(slug), () => undefined).catch((error) => {
      console.error("Erreur suppression article:", error);
    });
  }
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
export async function upsertBlogPostAsync(
  post: BlogPost,
  options?: { previousSlug?: string },
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await persistItems(
      async () => {
        await upsertBlogPostDoc(post);
        if (options?.previousSlug && options.previousSlug !== post.slug) {
          await deleteBlogPostDoc(options.previousSlug);
        }
      },
      () => applyBlogPostLocal(post, options?.previousSlug),
    );
    return { ok: true };
  } catch (error) {
    return { ok: false, error: formatFirestoreError(error) };
  }
}

export function getAdminStats() {
  const unread = cache.contactSubmissions.filter((s) => !s.read).length;
  return {
    videos: mergedVideos.length,
    blogPosts: getBlogPosts().length,
    contacts: cache.contactSubmissions.length,
    unreadContacts: unread,
  };
}
