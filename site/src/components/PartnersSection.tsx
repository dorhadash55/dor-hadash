import { useState } from "react";
import { Link } from "react-router-dom";
import { partners, partnersIntro, type Partner } from "../content/partners";
import PartnerModal from "./PartnerModal";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/** Sélection courte pour l'accueil — le reste est sur /partenaires */
const HOME_PARTNER_SLUGS = [
  "agence-juive",
  "misrad-haklita",
  "ofek-israel",
  "qualita",
  "olimaid",
] as const;

function PartnerLogoMark({ partner }: { partner: Partner }) {
  if (!partner.logo) {
    return (
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-cream font-heading text-sm font-semibold text-brand-blue ring-1 ring-brand-sand transition-transform duration-300 group-hover:scale-110 group-hover:ring-brand-teal/40 sm:h-16 sm:w-16"
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
      className="h-14 w-14 rounded-2xl bg-white object-contain p-1.5 shadow-sm ring-1 ring-brand-sand transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:ring-brand-teal/40 sm:h-16 sm:w-16"
    />
  );
}

export default function PartnersSection() {
  const [active, setActive] = useState<Partner | null>(null);
  const preview = HOME_PARTNER_SLUGS.map((slug) => partners.find((p) => p.slug === slug)).filter(
    (p): p is Partner => Boolean(p),
  );
  const moreCount = Math.max(0, partners.length - preview.length);

  return (
    <section className="section-shell bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            label={partnersIntro.label}
            title={partnersIntro.title}
            description="Institutions, associations et outils qui complètent l'accompagnement Dor Hadash — découvrez le réseau complet sur notre page partenaires."
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {preview.map((partner, i) => (
            <Reveal key={partner.slug} delay={Math.min(i * 50, 220)} variant="up">
              <button
                type="button"
                onClick={() => setActive(partner)}
                className="group flex h-full w-full flex-col items-center rounded-2xl bg-white p-3 text-center ring-1 ring-brand-sand transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-lg hover:shadow-brand-blue/10 hover:ring-brand-teal/45 active:scale-[0.98] sm:p-5"
              >
                <PartnerLogoMark partner={partner} />
                <p className="mt-2.5 font-heading text-[13px] font-semibold leading-snug text-brand-blue-deep transition-colors duration-300 [overflow-wrap:anywhere] group-hover:text-brand-blue sm:mt-3 sm:text-sm">
                  {partner.name}
                </p>
                <span
                  className="mt-2 text-[11px] font-semibold text-brand-teal opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:text-xs"
                  aria-hidden
                >
                  Voir →
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8">
          <Link
            to="/partenaires"
            className="group flex flex-col items-stretch gap-4 rounded-2xl border border-dashed border-brand-blue/25 bg-white/70 px-5 py-5 text-center transition-colors hover:border-brand-teal/50 hover:bg-white sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:text-left"
          >
            <div>
              <p className="font-heading text-base font-semibold text-brand-blue-deep sm:text-lg">
                Voir tous nos partenaires
              </p>
              <p className="mt-1 text-sm text-gray-500">
                <span className="sm:hidden">{partners.length} partenaires — page dédiée</span>
                <span className="hidden sm:inline">
                  {partners.length} partenaires institutionnels et opérationnels
                  {moreCount > 0 ? ` — dont ${moreCount} de plus sur la page dédiée` : ""}.
                </span>
              </p>
            </div>
            <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-transform group-hover:translate-x-0.5 sm:w-auto">
              Page partenaires
              <span aria-hidden>→</span>
            </span>
          </Link>
        </Reveal>
      </div>

      {active && <PartnerModal partner={active} onClose={() => setActive(null)} />}
    </section>
  );
}
