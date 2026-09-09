import type { BlogPost } from "../../content/blog";
import type { City } from "../../content/cities";
import type { Partner } from "../../content/partners";
import type { VideoTestimonial } from "../../content/videos";

export type ContactSubmission = {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  horizon: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  telephone: string;
  createdAt: string;
};

/** Marqueur des inscriptions newsletter stockées comme message de contact. */
export const NEWSLETTER_CONTACT_MARKER = "newsletter";

export function isNewsletterContact(submission: Pick<ContactSubmission, "ville" | "horizon">) {
  return (
    submission.ville === NEWSLETTER_CONTACT_MARKER ||
    submission.horizon === NEWSLETTER_CONTACT_MARKER
  );
}

export type HeroSettings = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type SiteSettings = {
  email: string;
  phonesIsrael: string[];
  phonesFrance: string[];
  hero: HeroSettings;
};

export type EventPopupSettings = {
  id: string;
  title: string;
  content: string;
  image?: string;
  startAt: string;
  endAt: string;
  enabled: boolean;
};

export type AdminContent = {
  videos: VideoTestimonial[];
  blogPosts: BlogPost[];
  cities: City[];
  partners: Partner[];
  contactSubmissions: ContactSubmission[];
  newsletterSubscribers: NewsletterSubscriber[];
  siteSettings: SiteSettings | null;
  eventPopup: EventPopupSettings | null;
};

export type RemoteContentPatch = Partial<AdminContent> & {
  excludedVideoIds?: string[];
  excludedPostSlugs?: string[];
  excludedCitySlugs?: string[];
  excludedPartnerSlugs?: string[];
};

export type { BlogPost, VideoTestimonial, City, Partner };
