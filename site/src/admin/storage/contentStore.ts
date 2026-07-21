import { blogPosts as staticBlogPosts } from "../../content/blog";
import { hero as defaultHero } from "../../content/homepage";
import { siteInfo as defaultSiteInfo } from "../../content/site";
import type {
  AdminContent,
  BlogPost,
  ContactSubmission,
  SiteSettings,
  VideoTestimonial,
} from "./types";

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

if (isBrowser()) refreshCache();

function write(content: AdminContent) {
  cache = content;
  sortedContactSubmissions = sortSubmissions(content.contactSubmissions);
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    // TODO(Firebase): remplacer par Firestore sync
    // await setDoc(doc(db, 'site/content'), content)
  }
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
  write({ ...cache, videos });
}

export function saveBlogPosts(blogPosts: BlogPost[]) {
  write({ ...cache, blogPosts });
}

export function upsertBlogPost(post: BlogPost) {
  const exists = cache.blogPosts.some((p) => p.slug === post.slug);
  const blogPosts = exists
    ? cache.blogPosts.map((p) => (p.slug === post.slug ? post : p))
    : [post, ...cache.blogPosts];
  write({ ...cache, blogPosts });
}

export function deleteBlogPost(slug: string) {
  write({ ...cache, blogPosts: cache.blogPosts.filter((p) => p.slug !== slug) });
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
  write({
    ...cache,
    contactSubmissions: [submission, ...cache.contactSubmissions],
  });
  // TODO(Firebase): addDoc(collection(db, 'contact_submissions'), submission)
}

export function markContactRead(id: string, read = true) {
  write({
    ...cache,
    contactSubmissions: cache.contactSubmissions.map((s) =>
      s.id === id ? { ...s, read } : s,
    ),
  });
}

export function deleteContactSubmission(id: string) {
  write({
    ...cache,
    contactSubmissions: cache.contactSubmissions.filter((s) => s.id !== id),
  });
}

export function saveSiteSettings(settings: SiteSettings) {
  write({ ...cache, siteSettings: settings });
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
}

/** À brancher quand Firebase sera configuré. */
export function isFirebaseConfigured(): boolean {
  return Boolean(import.meta.env.VITE_FIREBASE_API_KEY);
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
