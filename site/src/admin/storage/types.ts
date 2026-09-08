import type { BlogPost } from "../../content/blog";
import type { City } from "../../content/cities";
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

export type AdminContent = {
  videos: VideoTestimonial[];
  blogPosts: BlogPost[];
  cities: City[];
  contactSubmissions: ContactSubmission[];
  siteSettings: SiteSettings | null;
};

export type RemoteContentPatch = Partial<AdminContent> & {
  excludedVideoIds?: string[];
  excludedPostSlugs?: string[];
  excludedCitySlugs?: string[];
};

export type { BlogPost, VideoTestimonial, City };
