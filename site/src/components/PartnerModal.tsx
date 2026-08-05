import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Partner, PartnerHighlightIcon } from "../content/partners";

function HighlightIcon({ name }: { name: PartnerHighlightIcon }) {
  const common = {
    className: "h-3.5 w-3.5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "scan":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
        </svg>
      );
    case "letter":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
        </svg>
      );
    case "cv":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6M9 13h6M9 17h3" />
        </svg>
      );
    case "rights":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6M9 11h6M9 15h3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10a2 2 0 012 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 012-2z" />
        </svg>
      );
    case "guides":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 012-2h5v16H6a2 2 0 01-2-2V5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 3h5a2 2 0 012 2v12a2 2 0 01-2 2h-5V3z" />
        </svg>
      );
    case "school":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-5 9 5-9 5-9-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12v4c2 1.5 4 2.5 5 2.5S14 17.5 16 16v-4" />
        </svg>
      );
    case "kids":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="2.5" />
          <circle cx="15" cy="8" r="2.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18c.8-2.5 2.6-4 4.5-4s3.7 1.5 4.5 4M10.5 18c.8-2.5 2.6-4 4.5-4s3.7 1.5 4.5 4" />
        </svg>
      );
    case "dialog":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 6h10a2 2 0 012 2v5a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10h2a2 2 0 012 2v4a2 2 0 01-2 2h-1v2l-3-2" />
        </svg>
      );
    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9.5a2.5 2.5 0 114 2c-.7.5-1.5 1-1.5 2.5M12 17h.01" />
        </svg>
      );
  }
}

function PartnerLogo({
  partner,
  className = "h-12 w-12 rounded-xl",
}: {
  partner: Partner;
  className?: string;
}) {
  if (!partner.logo) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-xl bg-brand-cream font-heading text-sm font-semibold text-brand-blue ring-1 ring-brand-sand ${className}`}
        aria-hidden
      >
        {partner.name
          .split(/\s+/)
          .slice(0, 2)
          .map((w) => w[0])
          .join("")
          .toUpperCase()}
      </div>
    );
  }
  return (
    <img
      src={partner.logo}
      alt=""
      className={`shrink-0 bg-white object-contain p-1 shadow-sm ring-1 ring-brand-sand ${className}`}
    />
  );
}

export default function PartnerModal({
  partner,
  onClose,
}: {
  partner: Partner;
  onClose: () => void;
}) {
  const highlights = partner.highlights ?? [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("partner-modal-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("partner-modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-end justify-center bg-black/45 p-3 pb-3 pt-3 backdrop-blur-[2px] sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`partner-modal-${partner.slug}`}
      onClick={onClose}
    >
      <div
        className="flex max-h-[min(78dvh,640px)] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[min(78vh,640px)] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start gap-3 border-b border-brand-sand px-4 py-3.5 sm:px-5">
          <PartnerLogo partner={partner} />
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-brand-teal">
              Partenaire Dor Hadash
            </p>
            <h2
              id={`partner-modal-${partner.slug}`}
              className="mt-0.5 font-heading text-lg font-semibold leading-tight text-brand-blue-deep [overflow-wrap:anywhere] sm:text-xl"
            >
              {partner.name}
            </h2>
            {partner.nameHe && (
              <p className="mt-0.5 text-sm text-brand-blue/50" dir="rtl">
                {partner.nameHe}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-blue-deep"
            aria-label="Fermer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
          <p className="text-sm font-medium text-brand-teal">{partner.tagline}</p>

          {partner.quote && (
            <p className="font-heading text-base font-semibold leading-snug text-brand-blue-deep sm:text-lg">
              {partner.quote}
            </p>
          )}

          <p className="text-sm leading-relaxed text-gray-600">{partner.summary}</p>

          {partner.audience && <p className="text-sm text-gray-500">{partner.audience}</p>}

          {partner.offer && (
            <div className="rounded-xl bg-brand-cream px-3.5 py-3 ring-1 ring-brand-sand">
              <p className="text-sm font-semibold leading-snug text-brand-blue-deep">{partner.offer}</p>
            </div>
          )}

          {highlights.length > 0 && (
            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-brand-blue/45">
                {partner.slug === "olimaid"
                  ? "Ce que vous pouvez faire avec OlimAid"
                  : "Ils vous aident à"}
              </p>
              <ul className="mt-2.5 divide-y divide-brand-sand overflow-hidden rounded-xl ring-1 ring-brand-sand">
                {highlights.map((item) => (
                  <li key={item.text} className="flex gap-2.5 bg-brand-cream/40 px-3 py-2.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                      <HighlightIcon name={item.icon} />
                    </span>
                    <span className="min-w-0 pt-1 text-sm leading-snug text-gray-700 [overflow-wrap:anywhere]">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-2 border-t border-brand-sand bg-white px-4 py-3 sm:flex-row sm:px-5">
          {partner.website && (
            <a
              href={partner.website}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full justify-center px-4 py-3 text-sm sm:flex-1"
            >
              {partner.websiteLabel ?? "En savoir plus"}
            </a>
          )}
          {partner.phone && (
            <a
              href={`tel:${partner.phone}`}
              className="inline-flex w-full items-center justify-center rounded-full border border-brand-sand bg-white px-4 py-3 text-center text-sm font-semibold text-brand-blue sm:flex-1"
            >
              <span className="truncate">
                {partner.contactName ? `${partner.contactName} · ` : ""}
                {partner.phoneDisplay ?? partner.phone}
              </span>
            </a>
          )}
          {!partner.website && !partner.phone && (
            <button type="button" onClick={onClose} className="btn-primary w-full justify-center">
              Fermer
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
