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
  EventPopupSettings,
  NewsletterSubscriber,
  RemoteContentPatch,
  SiteSettings,
  VideoTestimonial,
} from "../storage/types";
import type { BlogPost } from "../storage/types";
import type { City, CityGalleryImage, CitySection, CityTestimonial } from "../../content/cities";
import { cities as staticCities, sortCitiesForDisplay } from "../../content/cities";
import type { Partner } from "../../content/partners";
import {
  isPartnerCategory,
  isPartnerHighlightIcon,
  partners as staticPartners,
  sortPartnersForDisplay,
} from "../../content/partners";
import type { VideoCategory } from "../../content/videos";
import { sortVideosForDisplay } from "../../content/videos";
import { extractYoutubeId } from "../utils/youtube";

type SiteDocument = {
  videos?: unknown;
  blogPosts?: BlogPost[];
  siteSettings?: SiteSettings | null;
  eventPopup?: unknown;
};

let syncStarted = false;
let itemsSyncStarted = false;
let contactsUnsubscribe: Unsubscribe | null = null;
let newsletterUnsubscribe: Unsubscribe | null = null;
let itemSyncApply: ((content: RemoteContentPatch) => void) | null = null;
let itemSyncSeed: (() => AdminContent) | null = null;
let legacyVideos: VideoTestimonial[] = [];
let legacyBlogPosts: BlogPost[] = [];
let lastSiteSettings: SiteSettings | null | undefined;
let lastEventPopup: EventPopupSettings | null | undefined;
let collectionVideoDocs: Array<VideoTestimonial & { deleted?: boolean }> | null = null;
let collectionPostDocs: Array<BlogPost & { deleted?: boolean }> | null = null;
let collectionCityDocs: Array<City & { deleted?: boolean }> | null = null;
let collectionPartnerDocs: Array<Partner & { deleted?: boolean }> | null = null;

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
  eventPopup?: EventPopupSettings | null;
}) {
  const payload: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };
  if (data.videos !== undefined) payload.videos = data.videos;
  if (data.blogPosts !== undefined) payload.blogPosts = data.blogPosts;
  if (data.siteSettings !== undefined) payload.siteSettings = data.siteSettings;
  if (data.eventPopup !== undefined) payload.eventPopup = data.eventPopup;
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
    cities: seed.cities,
    partners: seed.partners,
    siteSettings: seed.siteSettings,
    eventPopup: seed.eventPopup,
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

  if (!newsletterUnsubscribe) {
    const newsletterQuery = query(collection(db, "newsletter_subscribers"), orderBy("createdAt", "desc"));
    newsletterUnsubscribe = onSnapshot(
      newsletterQuery,
      (snapshot) => {
        const newsletterSubscribers = snapshot.docs.map((d) => {
          const data = d.data() as Record<string, unknown>;
          return {
            id: d.id,
            email: String(data.email ?? d.id),
            telephone: String(data.telephone ?? ""),
            createdAt: String(data.createdAt ?? ""),
          } as NewsletterSubscriber;
        });
        applyContent({ newsletterSubscribers });
      },
      (error) => {
        console.warn("Firestore newsletter_subscribers (admin):", error.message);
      },
    );
  }
}

function stopContactsListener() {
  contactsUnsubscribe?.();
  contactsUnsubscribe = null;
  newsletterUnsubscribe?.();
  newsletterUnsubscribe = null;
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

function mergeCityLists(
  legacy: City[],
  overlay: Array<City & { deleted?: boolean }> | null,
): City[] {
  const overlayBySlug = new Map((overlay ?? []).map((city) => [city.slug, city]));
  const result: City[] = [];
  const seen = new Set<string>();

  for (const city of legacy) {
    const over = overlayBySlug.get(city.slug);
    if (over?.deleted) continue;
    result.push(over ? stripDeleted(over) : city);
    seen.add(city.slug);
  }

  if (overlay) {
    for (const city of overlay) {
      if (city.deleted || seen.has(city.slug)) continue;
      result.push(stripDeleted(city));
      seen.add(city.slug);
    }
  }

  return sortCitiesForDisplay(result);
}

function mergePartnerLists(
  legacy: Partner[],
  overlay: Array<Partner & { deleted?: boolean }> | null,
): Partner[] {
  const overlayBySlug = new Map((overlay ?? []).map((partner) => [partner.slug, partner]));
  const result: Partner[] = [];
  const seen = new Set<string>();

  for (const partner of legacy) {
    const over = overlayBySlug.get(partner.slug);
    if (over?.deleted) continue;
    result.push(over ? stripDeleted(over) : partner);
    seen.add(partner.slug);
  }
  if (overlay) {
    for (const partner of overlay) {
      if (partner.deleted || seen.has(partner.slug)) continue;
      result.push(stripDeleted(partner));
    }
  }
  return sortPartnersForDisplay(result);
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
    ...(collectionCityDocs !== null
      ? {
          cities: mergeCityLists(staticCities, collectionCityDocs),
          excludedCitySlugs: collectionCityDocs
            .filter((city) => city.deleted)
            .map((city) => city.slug),
        }
      : {}),
    ...(collectionPartnerDocs !== null
      ? {
          partners: mergePartnerLists(staticPartners, collectionPartnerDocs),
          excludedPartnerSlugs: collectionPartnerDocs
            .filter((partner) => partner.deleted)
            .map((partner) => partner.slug),
        }
      : {}),
    ...(lastSiteSettings !== undefined ? { siteSettings: lastSiteSettings } : {}),
    ...(lastEventPopup !== undefined ? { eventPopup: lastEventPopup } : {}),
  });
}

function normalizeEventPopup(raw: unknown): EventPopupSettings | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const id = String(row.id ?? "").trim();
  const title = String(row.title ?? "").trim();
  const content = String(row.content ?? "").trim();
  const startAt = String(row.startAt ?? "").trim();
  const endAt = String(row.endAt ?? "").trim();
  if (!id || !title || !content || !startAt || !endAt) return null;
  const image = String(row.image ?? "").trim();
  return {
    id,
    title,
    content,
    startAt,
    endAt,
    enabled: row.enabled === true,
    ...(image ? { image } : {}),
  };
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

function asStringArray(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => String(item)).filter((item) => item.length > 0);
}

function normalizeGallery(raw: unknown): CityGalleryImage[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const images: CityGalleryImage[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const src = String(row.src ?? "").trim();
    if (!src) continue;
    const caption = String(row.caption ?? "");
    const image: CityGalleryImage = { src, caption };
    if (row.fit === "contain" || row.fit === "cover") image.fit = row.fit;
    images.push(image);
  }
  return images.length ? images : undefined;
}

function normalizeSections(raw: unknown): CitySection[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((row) => ({
      heading: String(row.heading ?? ""),
      paragraphs: asStringArray(row.paragraphs),
    }))
    .filter((section) => section.heading || section.paragraphs.length > 0);
}

function normalizeTestimonials(raw: unknown): CityTestimonial[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((row) => ({
      name: String(row.name ?? ""),
      quote: String(row.quote ?? ""),
    }))
    .filter((item) => item.name || item.quote);
}

function normalizeCityDoc(
  id: string,
  raw: Record<string, unknown>,
): (City & { deleted?: boolean }) | null {
  const slug = String(raw.slug ?? id).trim();
  if (!slug) return null;
  if (raw.deleted === true) {
    return {
      slug,
      name: "",
      tagline: "",
      image: "",
      intro: [],
      sections: [],
      testimonials: [],
      deleted: true,
    };
  }

  const gallery = normalizeGallery(raw.gallery);
  const galleryMore = normalizeGallery(raw.galleryMore);
  const sortKey = typeof raw.sortKey === "number" ? raw.sortKey : undefined;
  const creditRaw =
    raw.photoCredit && typeof raw.photoCredit === "object"
      ? (raw.photoCredit as Record<string, unknown>)
      : null;
  const photoCredit = creditRaw
    ? { text: String(creditRaw.text ?? ""), url: String(creditRaw.url ?? "") }
    : undefined;

  return {
    slug,
    name: String(raw.name ?? ""),
    tagline: String(raw.tagline ?? ""),
    image: String(raw.image ?? ""),
    ...(raw.isDraft === true ? { isDraft: true } : {}),
    ...(raw.lowResImage === true ? { lowResImage: true } : {}),
    ...(photoCredit?.text ? { photoCredit } : {}),
    ...(gallery ? { gallery } : {}),
    ...(galleryMore ? { galleryMore } : {}),
    intro: asStringArray(raw.intro),
    sections: normalizeSections(raw.sections),
    testimonials: normalizeTestimonials(raw.testimonials),
    ...(sortKey !== undefined ? { sortKey } : {}),
  };
}

function normalizePartnerDoc(
  id: string,
  raw: Record<string, unknown>,
): (Partner & { deleted?: boolean }) | null {
  const slug = String(raw.slug ?? id).trim();
  if (!slug) return null;
  if (raw.deleted === true) {
    return {
      slug,
      name: "",
      category: "operationnel",
      tagline: "",
      summary: "",
      deleted: true,
    };
  }
  const categoryRaw = String(raw.category ?? "");
  const category = isPartnerCategory(categoryRaw) ? categoryRaw : "operationnel";
  const highlights = Array.isArray(raw.highlights)
    ? raw.highlights
        .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
        .map((item) => ({
          text: String(item.text ?? "").trim(),
          icon: String(item.icon ?? ""),
        }))
        .filter(
          (item): item is NonNullable<Partner["highlights"]>[number] =>
            Boolean(item.text) && isPartnerHighlightIcon(item.icon),
        )
    : undefined;
  const optionalString = (key: string) => {
    const value = String(raw[key] ?? "").trim();
    return value || undefined;
  };
  const sortKey = typeof raw.sortKey === "number" ? raw.sortKey : undefined;

  return {
    slug,
    name: String(raw.name ?? "").trim(),
    category,
    tagline: String(raw.tagline ?? "").trim(),
    summary: String(raw.summary ?? "").trim(),
    ...(optionalString("nameHe") ? { nameHe: optionalString("nameHe") } : {}),
    ...(optionalString("logo") ? { logo: optionalString("logo") } : {}),
    ...(optionalString("website") ? { website: optionalString("website") } : {}),
    ...(optionalString("websiteLabel") ? { websiteLabel: optionalString("websiteLabel") } : {}),
    ...(optionalString("phone") ? { phone: optionalString("phone") } : {}),
    ...(optionalString("phoneDisplay") ? { phoneDisplay: optionalString("phoneDisplay") } : {}),
    ...(optionalString("contactName") ? { contactName: optionalString("contactName") } : {}),
    ...(optionalString("offer") ? { offer: optionalString("offer") } : {}),
    ...(optionalString("audience") ? { audience: optionalString("audience") } : {}),
    ...(optionalString("quote") ? { quote: optionalString("quote") } : {}),
    ...(highlights?.length ? { highlights } : {}),
    ...(raw.showOnHome === true ? { showOnHome: true } : {}),
    ...(sortKey !== undefined ? { sortKey } : {}),
  };
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

  onSnapshot(
    collection(db, "site", "content", "cities"),
    (snapshot) => {
      collectionCityDocs = snapshot.docs
        .map((document) => normalizeCityDoc(document.id, document.data() as Record<string, unknown>))
        .filter((city): city is City & { deleted?: boolean } => Boolean(city));
      emitItemMerge();
    },
    (error) => {
      console.warn("[Dor Hadash] Lecture villes Firestore:", error.message);
    },
  );

  onSnapshot(
    collection(db, "site", "content", "partners"),
    (snapshot) => {
      collectionPartnerDocs = snapshot.docs
        .map((document) => normalizePartnerDoc(document.id, document.data() as Record<string, unknown>))
        .filter((partner): partner is Partner & { deleted?: boolean } => Boolean(partner));
      emitItemMerge();
    },
    (error) => {
      console.warn("[Dor Hadash] Lecture partenaires Firestore:", error.message);
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

export async function upsertCityDoc(city: City) {
  const db = await assertAdminWrite();
  await setDoc(
    doc(db, "site", "content", "cities", city.slug),
    withoutUndefined({
      ...city,
      deleted: false,
      updatedAt: serverTimestamp(),
    }),
  );
}

export async function deleteCityDoc(slug: string) {
  const db = await assertAdminWrite();
  await setDoc(
    doc(db, "site", "content", "cities", slug),
    { slug, deleted: true, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export async function upsertPartnerDoc(partner: Partner) {
  const db = await assertAdminWrite();
  await setDoc(
    doc(db, "site", "content", "partners", partner.slug),
    withoutUndefined({ ...partner, deleted: false, updatedAt: serverTimestamp() }),
  );
}

export async function deletePartnerDoc(slug: string) {
  const db = await assertAdminWrite();
  await setDoc(
    doc(db, "site", "content", "partners", slug),
    { slug, deleted: true, updatedAt: serverTimestamp() },
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
        lastEventPopup = seed.eventPopup;
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
      lastEventPopup = normalizeEventPopup(data.eventPopup);
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
    eventPopup?: EventPopupSettings | null;
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
    payload.siteSettings === undefined &&
    payload.eventPopup === undefined
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

export async function saveEventPopupDocument(eventPopup: EventPopupSettings | null) {
  const db = await assertAdminWrite();
  await setDoc(
    doc(db, "site", "content"),
    { eventPopup, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export async function pushFullContentToFirestore(content: AdminContent) {
  if (content.siteSettings) {
    await saveSiteSettingsDocument(content.siteSettings);
  }
  await saveEventPopupDocument(content.eventPopup);
  for (const post of content.blogPosts) {
    await upsertBlogPostDoc(post);
  }
  for (const video of content.videos) {
    await upsertVideoDoc(video);
  }
  for (const city of content.cities) {
    await upsertCityDoc(city);
  }
  for (const partner of content.partners) {
    await upsertPartnerDoc(partner);
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

export async function addNewsletterSubscriberDoc(subscriber: NewsletterSubscriber) {
  const db = getDb();
  if (!db) throw new Error("Firestore indisponible.");

  await setDoc(doc(db, "newsletter_subscribers", subscriber.id), subscriber);
}

export async function deleteNewsletterSubscriberDoc(id: string) {
  const db = getDb();
  if (!db) throw new Error("Firestore indisponible.");

  await deleteDoc(doc(db, "newsletter_subscribers", id));
}
