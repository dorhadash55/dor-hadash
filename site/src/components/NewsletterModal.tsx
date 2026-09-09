import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { addNewsletterSubscriber } from "../admin/storage/contentStore";
import { NEWSLETTER_OPEN_EVENT, isValidNewsletterEmail } from "../lib/newsletter";
import { sendNewsletterEmails } from "../lib/sendNewsletterEmails";

const fieldClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base text-gray-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 disabled:opacity-60 sm:text-sm";

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const titleId = useId();
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setSubmitted(false);
      setError(null);
    };
    window.addEventListener(NEWSLETTER_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(NEWSLETTER_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => emailRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const handleClose = () => {
    if (sending) return;
    setOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const telephone = String(form.get("telephone") ?? "").trim();

    if (!isValidNewsletterEmail(email)) {
      setError("Indiquez une adresse email valide.");
      return;
    }

    setSending(true);
    try {
      await sendNewsletterEmails({ email, telephone });
      try {
        await addNewsletterSubscriber({ email, telephone });
      } catch (storeError) {
        console.warn("[Dor Hadash] Enregistrement newsletter:", storeError);
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'envoyer l'inscription. Réessayez dans un instant.",
      );
    } finally {
      setSending(false);
    }
  };

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-end justify-center bg-black/45 p-3 backdrop-blur-[2px] sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 border-b border-brand-sand px-4 py-3.5 sm:px-5">
          <div className="min-w-0 flex-1">
            <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-brand-teal">
              Newsletter
            </p>
            <h2 id={titleId} className="mt-0.5 font-heading text-lg font-semibold text-brand-blue-deep sm:text-xl">
              Pour tous les francophones
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-blue-deep"
            aria-label="Fermer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="space-y-3 px-4 py-5 sm:px-5">
            <p className="font-heading text-base font-semibold text-brand-blue-deep">
              Vous êtes inscrit ✓
            </p>
            <p className="text-sm leading-relaxed text-gray-600">
              Merci. Chaque semaine : actualités, conseils sur l’Alya, intégration, villes et vie en Israël.
            </p>
            <button type="button" onClick={handleClose} className="btn-primary w-full justify-center">
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4 px-4 py-5 sm:px-5">
            <p className="text-sm leading-relaxed text-gray-600">
              Un email par semaine, sans spam, que vous soyez encore en France, en réflexion sur votre
              Alya ou déjà installé en Israël.
            </p>
            <div>
              <label htmlFor="newsletter-email" className="mb-1.5 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                ref={emailRef}
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={sending}
                placeholder="vous@email.com"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="newsletter-phone" className="mb-1.5 block text-sm font-medium text-gray-700">
                Téléphone <span className="font-normal text-gray-400">(optionnel)</span>
              </label>
              <input
                id="newsletter-phone"
                name="telephone"
                type="tel"
                autoComplete="tel"
                disabled={sending}
                placeholder="+33 ou +972…"
                className={fieldClass}
              />
            </div>
            {error && <p className="text-sm text-brand-coral">{error}</p>}
            <button type="submit" disabled={sending} className="btn-primary w-full justify-center">
              {sending ? "Envoi…" : "Envoyer"}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
