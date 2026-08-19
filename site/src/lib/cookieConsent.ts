export type CookieConsent = "accepted" | "refused";

export const COOKIE_CONSENT_KEY = "dh-cookie-consent";
export const COOKIE_CONSENT_EVENT = "dh-cookie-consent";

const MAX_AGE = 60 * 60 * 24 * 180; // 6 mois

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const fromCookie = readCookie("dh_consent");
  if (fromCookie === "accepted" || fromCookie === "refused") return fromCookie;
  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "accepted" || value === "refused" ? value : null;
}

export function setCookieConsent(value: CookieConsent) {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  writeCookie("dh_consent", value);
  if (value === "refused") {
    clearOptionalCookies();
  }
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}

export function hasOptionalCookiesConsent() {
  return getCookieConsent() === "accepted";
}

export function hasAnalyticsConsent() {
  return hasOptionalCookiesConsent();
}

export function writeOptionalCookie(name: string, value: string) {
  if (!hasOptionalCookiesConsent()) return;
  writeCookie(name, value);
}

export function readOptionalCookie(name: string): string | null {
  if (!hasOptionalCookiesConsent()) return null;
  return readCookie(name);
}

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax`;
}

function readCookie(name: string): string | null {
  const prefix = `${name}=`;
  const hit = document.cookie.split("; ").find((row) => row.startsWith(prefix));
  if (!hit) return null;
  return decodeURIComponent(hit.slice(prefix.length));
}

function clearOptionalCookies() {
  ["dh_last_city", "dh_city_filters"].forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  });
}
