import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { inject } from "@vercel/analytics";
import { initFirebaseAnalytics } from "../admin/firebase/config";
import { COOKIE_CONSENT_EVENT, hasAnalyticsConsent } from "../lib/cookieConsent";
import { trackClick, trackPageView } from "../lib/siteAnalytics";

export default function SiteAnalytics() {
  const { pathname } = useLocation();

  useEffect(() => {
    inject();
  }, []);

  useEffect(() => {
    const startIfAllowed = () => {
      if (!hasAnalyticsConsent()) return;
      void initFirebaseAnalytics();
      trackPageView(pathname);
    };

    startIfAllowed();
    window.addEventListener(COOKIE_CONSENT_EVENT, startIfAllowed);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, startIfAllowed);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!hasAnalyticsConsent()) return;
      if (window.location.pathname.startsWith("/admin")) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("a, button")) return;
      trackClick();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
