import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import PartnerModal from "../components/PartnerModal";
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
      className={`shrink-0 rounded-2xl bg-white object-contain p-1 shadow-sm ring-1 ring-brand-sand ${className}`}
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
