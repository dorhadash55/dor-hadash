import { siteInfo as defaultSiteInfo } from "./site";
import { useSiteSettings } from "../admin/hooks/useAdminContent";

export function useSiteInfo() {
  const settings = useSiteSettings();
  return {
    ...defaultSiteInfo,
    email: settings.email,
    phones: {
      israel: settings.phonesIsrael,
      france: settings.phonesFrance,
    },
  };
}

export function useHeroContent() {
  const settings = useSiteSettings();
  return settings.hero;
}
