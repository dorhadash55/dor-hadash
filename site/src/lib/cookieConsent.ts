export type CookieConsent = "accepted" | "refused";

export const COOKIE_CONSENT_KEY = "dh-cookie-consent";
export const COOKIE_CONSENT_EVENT = "dh-cookie-consent";

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "accepted" || value === "refused" ? value : null;
}

export function setCookieConsent(value: CookieConsent) {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}

export function hasAnalyticsConsent() {
  return getCookieConsent() === "accepted";
}
