import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { useEventPopup } from "../admin/hooks/useAdminContent";
import SmartImage from "./SmartImage";

const SEEN_PREFIX = "dor-hadash:event-popup-seen:";

export default function EventPopup() {
  const event = useEventPopup();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const active =
    Boolean(event?.enabled) &&
    now >= new Date(event?.startAt ?? "").getTime() &&
    now <= new Date(event?.endAt ?? "").getTime();

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!event || !active) {
      setOpen(false);
      return;
    }
    const seenKey = `${SEEN_PREFIX}${event.id}`;
    try {
      if (localStorage.getItem(seenKey) === "1") return;
      localStorage.setItem(seenKey, "1");
    } catch {
      // Le popup reste fonctionnel lorsque le stockage navigateur est bloqué.
    }
    setOpen(true);
  }, [event, active]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!event || !active || typeof document === "undefined") return null;

  return createPortal(
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group fixed bottom-[calc(9.25rem+env(safe-area-inset-bottom,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] z-[190] flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal text-white shadow-lg shadow-brand-blue/20 ring-4 ring-white/90 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-brand-blue focus:outline-none focus:ring-4 focus:ring-brand-teal/25 lg:bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] lg:right-[calc(1.5rem+env(safe-area-inset-right,0px))]"
          aria-label={`Ouvrir l’événement : ${event.title}`}
        >
          <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-brand-sand ring-2 ring-white" aria-hidden />
          <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v3m8-3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
          </svg>
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-brand-blue-deep px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
            Voir l’événement
          </span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[310] flex items-center justify-center bg-black/50 p-3 pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] backdrop-blur-[2px] sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setOpen(false)}
        >
          <article
            className="max-h-[calc(100dvh-6rem)] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl sm:max-h-[92dvh]"
            onClick={(clickEvent) => clickEvent.stopPropagation()}
          >
            {event.image && (
              <SmartImage
                src={event.image}
                alt=""
                className="max-h-72 w-full bg-brand-cream object-cover"
              />
            )}
            <div className="relative px-5 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand-cream text-brand-blue-deep transition hover:bg-brand-sand"
                aria-label="Fermer l’événement"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
              <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-brand-coral">
                Événement
              </p>
              <h2 id={titleId} className="mt-2 pr-10 font-heading text-2xl font-semibold leading-tight text-brand-blue-deep sm:text-3xl">
                {event.title}
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-700 sm:text-base">
                {event.content}
              </p>
              <button type="button" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full justify-center sm:w-auto">
                Fermer
              </button>
            </div>
          </article>
        </div>
      )}
    </>,
    document.body,
  );
}
