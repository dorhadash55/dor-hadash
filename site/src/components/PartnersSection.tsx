import { useState } from "react";
import { Link } from "react-router-dom";
import { partners, type Partner } from "../content/partners";
import PartnerModal from "./PartnerModal";
import Reveal from "./Reveal";

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
        className="flex h-12 w-12 items-center justify-center font-heading text-sm font-semibold text-brand-blue sm:h-14 sm:w-14"
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
      className="h-12 w-12 object-contain sm:h-14 sm:w-14"
    />
  );
}

/** Bandeau logos compact — pas une section marketing pleine hauteur. */
export default function PartnersSection() {
  const [active, setActive] = useState<Partner | null>(null);
  const preview = HOME_PARTNER_SLUGS.map((slug) => partners.find((p) => p.slug === slug)).filter(
    (p): p is Partner => Boolean(p),
  );

  return (
    <section className="border-y border-brand-blue/8 bg-white py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="font-accent text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-teal sm:text-xs">
                Partenaires
              </p>
              <p className="mt-1 font-heading text-base font-semibold text-brand-blue-deep sm:text-lg">
                Un réseau institutionnel
              </p>
            </div>
            <Link
              to="/partenaires"
              className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
            >
              Voir tous →
            </Link>
          </div>
        </Reveal>

        <div className="mt-4 flex gap-4 overflow-x-auto pb-1 scrollbar-hide sm:mt-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:overflow-visible sm:pb-0">
          {preview.map((partner) => (
            <button
              key={partner.slug}
              type="button"
              onClick={() => setActive(partner)}
              className="flex w-[4.75rem] shrink-0 flex-col items-center text-center transition active:scale-[0.98] sm:w-auto"
            >
              <PartnerLogoMark partner={partner} />
              <p className="mt-1.5 line-clamp-2 font-heading text-[11px] font-semibold leading-tight text-brand-blue-deep sm:text-xs">
                {partner.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {active && <PartnerModal partner={active} onClose={() => setActive(null)} />}
    </section>
  );
}
