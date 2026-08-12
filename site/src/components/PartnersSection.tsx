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
        className="flex aspect-square w-full max-w-[5.5rem] items-center justify-center font-heading text-base font-semibold text-brand-blue transition-transform duration-300 group-hover:scale-[1.03] sm:max-w-[6.5rem] sm:text-lg"
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
      className="aspect-square w-full max-w-[5.5rem] object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:max-w-[6.5rem]"
    />
  );
}

export default function PartnersSection() {
  const [active, setActive] = useState<Partner | null>(null);
  const preview = HOME_PARTNER_SLUGS.map((slug) => partners.find((p) => p.slug === slug)).filter(
    (p): p is Partner => Boolean(p),
  );

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

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:mt-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-5">
          {preview.map((partner, i) => (
            <Reveal key={partner.slug} delay={Math.min(i * 50, 220)} variant="up">
              <button
                type="button"
                onClick={() => setActive(partner)}
                className="group flex w-full flex-col items-center text-center transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <PartnerLogoMark partner={partner} />
                <p className="mt-2.5 font-heading text-[13px] font-semibold leading-snug text-brand-blue-deep transition-colors duration-300 [overflow-wrap:anywhere] group-hover:text-brand-blue sm:mt-3 sm:text-sm">
                  {partner.name}
                </p>
                <span
                  className="mt-1 text-[11px] font-semibold text-brand-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-xs"
                  aria-hidden
                >
                  Voir →
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8 flex justify-center sm:mt-10">
          <Link
            to="/partenaires"
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-brand-blue/20 transition hover:-translate-y-0.5 hover:bg-brand-blue-dark hover:shadow-lg sm:px-10 sm:py-4 sm:text-lg"
          >
            Voir tous
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>

      {active && <PartnerModal partner={active} onClose={() => setActive(null)} />}
    </section>
  );
}
