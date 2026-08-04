import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import {
  partners,
  partnersIntro,
  partnerCategoryLabels,
  getPartnerBySlug,
  type Partner,
  type PartnerCategory,
} from "../content/partners";

const SECTION_ORDER: PartnerCategory[] = [
  "institutionnel",
  "featured",
  "operationnel",
  "sante",
  "municipal",
];

function PartnerLogo({
  partner,
  className = "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]",
}: {
  partner: Partner;
  className?: string;
}) {
  if (!partner.logo) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-2xl bg-brand-cream font-heading text-sm font-semibold text-brand-blue ring-1 ring-brand-sand ${className}`}
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
      className={`shrink-0 rounded-2xl bg-white object-contain p-1 ring-1 ring-brand-sand shadow-sm ${className}`}
    />
  );
}

function PartnerTeaserCard({
  partner,
  onOpen,
}: {
  partner: Partner;
  onOpen: (partner: Partner) => void;
}) {
  const hasDetails =
    Boolean(partner.highlights?.length) ||
    Boolean(partner.quote) ||
    Boolean(partner.offer) ||
    partner.category === "featured";

  return (
    <button
      type="button"
      id={partner.slug}
      onClick={() => onOpen(partner)}
      className="flex w-full scroll-mt-28 gap-4 rounded-2xl bg-white p-4 text-left ring-1 ring-brand-sand transition-shadow hover:shadow-md sm:gap-5 sm:p-5"
    >
      <PartnerLogo partner={partner} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h3 className="font-heading text-base font-semibold text-brand-blue-deep sm:text-lg">
            {partner.name}
          </h3>
          {partner.nameHe && (
            <span className="text-sm text-brand-blue/45" dir="rtl">
              {partner.nameHe}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-brand-teal">{partner.tagline}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">{partner.summary}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
          {hasDetails ? "Voir les détails" : partner.website ? "En savoir plus" : "Voir"}
          <span aria-hidden>→</span>
        </span>
      </div>
    </button>
  );
}

function PartnerModal({
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
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/45 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`partner-modal-${partner.slug}`}
      onClick={onClose}
    >
      <div
        className="flex max-h-[min(78vh,640px)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start gap-3 border-b border-brand-sand px-4 py-3.5 sm:px-5">
          <PartnerLogo partner={partner} className="h-12 w-12 rounded-xl" />
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-brand-teal">
              Partenaire Dor Hadash
            </p>
            <h2
              id={`partner-modal-${partner.slug}`}
              className="mt-0.5 font-heading text-lg font-semibold leading-tight text-brand-blue-deep sm:text-xl"
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
              <ol className="mt-2.5 divide-y divide-brand-sand overflow-hidden rounded-xl ring-1 ring-brand-sand">
                {highlights.map((item, index) => (
                  <li key={item} className="flex gap-2.5 bg-brand-cream/40 px-3 py-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue text-[11px] font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-sm leading-snug text-gray-700">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-2 border-t border-brand-sand bg-white px-4 py-3 sm:flex-row sm:px-5">
          {partner.website && (
            <a
              href={partner.website}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full justify-center sm:flex-1"
            >
              {partner.websiteLabel ?? "En savoir plus"}
            </a>
          )}
          {partner.phone && (
            <a
              href={`tel:${partner.phone}`}
              className="btn-outline w-full justify-center border border-brand-sand bg-white sm:flex-1"
            >
              {partner.contactName ? `${partner.contactName} · ` : ""}
              {partner.phoneDisplay ?? partner.phone}
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

export default function Partenaires() {
  const { hash } = useLocation();
  const [active, setActive] = useState<Partner | null>(null);

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const partner = getPartnerBySlug(id);
    if (partner) {
      setActive(partner);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, [hash]);

  return (
    <>
      <SeoHead />
      <PageBanner title={partnersIntro.title} subtitle={partnersIntro.pageSubtitle} />

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          {SECTION_ORDER.map((category) => {
            const items = partners.filter((p) => p.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category} className="mb-12 last:mb-0">
                <Reveal>
                  <p className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">
                    {partnerCategoryLabels[category]}
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-blue-deep">
                    {category === "featured"
                      ? "Accompagnement au quotidien"
                      : category === "municipal"
                        ? "Nos villes partenaires"
                        : partnerCategoryLabels[category]}
                  </h2>
                </Reveal>

                <div className="mt-6 grid gap-4">
                  {items.map((partner, i) => (
                    <Reveal key={partner.slug} delay={Math.min(i * 60, 240)} variant="up">
                      <PartnerTeaserCard partner={partner} onOpen={setActive} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}

          <Reveal delay={100} className="mt-10 text-center">
            <p className="text-sm text-gray-500">Vous préparez votre Alya avec Dor Hadash ?</p>
            <Link to="/nous-contacter" className="btn-primary mt-4 inline-flex">
              Nous contacter
            </Link>
          </Reveal>
        </div>
      </section>

      {active && <PartnerModal partner={active} onClose={() => setActive(null)} />}
    </>
  );
}
