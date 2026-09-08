import { useCallback, useSyncExternalStore } from "react";
import {
  getBlogPosts,
  getBlogPostBySlug,
  getCities,
  getCityBySlug,
  getContactSubmissions,
  getContentSnapshot,
  getSiteSettings,
  getVideos,
  subscribeContent,
} from "../storage/contentStore";
import type { AdminContent, BlogPost, City, ContactSubmission, SiteSettings, VideoTestimonial } from "../storage/types";
import { blogPosts as staticBlogPosts } from "../../content/blog";
import { cities as staticCities } from "../../content/cities";
import { hero as defaultHero } from "../../content/homepage";
import { siteInfo as defaultSiteInfo } from "../../content/site";
import { videoTestimonials as staticVideos } from "../../content/videos";

const SERVER_DEFAULT_SITE_SETTINGS: SiteSettings = {
  email: defaultSiteInfo.email,
  phonesIsrael: [...defaultSiteInfo.phones.israel],
  phonesFrance: [...defaultSiteInfo.phones.france],
  hero: {
    eyebrow: defaultHero.eyebrow,
    title: defaultHero.title,
    subtitle: defaultHero.subtitle,
  },
};

const SERVER_DEFAULT_CONTENT: AdminContent = {
  videos: staticVideos,
  blogPosts: staticBlogPosts,
  cities: staticCities,
  contactSubmissions: [],
  siteSettings: null,
};

export function useAdminContent(): AdminContent {
  return useSyncExternalStore(subscribeContent, getContentSnapshot, () => SERVER_DEFAULT_CONTENT);
}

export function useVideos(): VideoTestimonial[] {
  return useSyncExternalStore(subscribeContent, getVideos, () => SERVER_DEFAULT_CONTENT.videos);
}

export function useBlogPosts(): BlogPost[] {
  return useSyncExternalStore(subscribeContent, getBlogPosts, () => SERVER_DEFAULT_CONTENT.blogPosts);
}

export function useBlogPost(slug: string): BlogPost | undefined {
  const getSnapshot = useCallback(() => getBlogPostBySlug(slug), [slug]);
  const getServerSnapshot = useCallback(() => staticBlogPosts.find((p) => p.slug === slug), [slug]);
  return useSyncExternalStore(subscribeContent, getSnapshot, getServerSnapshot);
}

export function useCities(): City[] {
  return useSyncExternalStore(subscribeContent, getCities, () => SERVER_DEFAULT_CONTENT.cities);
}

export function useCity(slug: string): City | undefined {
  const getSnapshot = useCallback(() => getCityBySlug(slug), [slug]);
  const getServerSnapshot = useCallback(() => staticCities.find((city) => city.slug === slug), [slug]);
  return useSyncExternalStore(subscribeContent, getSnapshot, getServerSnapshot);
}

export function useContactSubmissions(): ContactSubmission[] {
  return useSyncExternalStore(
    subscribeContent,
    getContactSubmissions,
    () => SERVER_DEFAULT_CONTENT.contactSubmissions,
  );
}

export function useSiteSettings(): SiteSettings {
  return useSyncExternalStore(subscribeContent, getSiteSettings, () => SERVER_DEFAULT_SITE_SETTINGS);
}
