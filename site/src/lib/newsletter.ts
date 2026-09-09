export const NEWSLETTER_OPEN_EVENT = "dh-open-newsletter";

export function openNewsletterModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(NEWSLETTER_OPEN_EVENT));
}

export function isValidNewsletterEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
