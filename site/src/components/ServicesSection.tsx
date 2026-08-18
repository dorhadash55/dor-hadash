import { useState } from "react";
import { Link } from "react-router-dom";
import {
  accompanimentDisclaimer,
  pillars,
  transversalServices,
} from "../content/homepage";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ServiceIcon from "./ServiceIcon";

const accents = [
  { iconBg: "bg-brand-blue", iconText: "text-white", border: "border-brand-blue/20", softBg: "bg-brand-blue/10", softText: "text-brand-blue" },
  { iconBg: "bg-brand-teal", iconText: "text-brand-blue-deep", border: "border-brand-teal/25", softBg: "bg-brand-teal/15", softText: "text-brand-teal" },
  { iconBg: "bg-brand-coral", iconText: "text-white", border: "border-brand-coral/20", softBg: "bg-brand-coral/10", softText: "text-brand-coral" },
  { iconBg: "bg-brand-blue-deep", iconText: "text-white", border: "border-brand-blue/20", softBg: "bg-brand-blue/10", softText: "text-brand-blue" },
];

export default function ServicesSection() {
  const [openTitle, setOpenTitle] = useState<string | null>(pillars[0]?.title ?? null);

  return (
    <section id="piliers" className="section-shell scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            label="Les quatre piliers"
            title="Logement, immersion, éducation, emploi"
            description="L'identité du programme Dor Hadash — reconnaissable partout."
          />
        </Reveal>

        {/* Mobile — accordion avec icônes contrastées */}
        <Reveal delay={80} className="sm:hidden">
          <div className="mt-8 space-y-2.5">
            {pillars.map((s, i) => {
              const accent = accents[i % accents.length];
              const open = openTitle === s.title;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setOpenTitle(open ? null : s.title)}
                  aria-expanded={open}
                  className={`flex w-full items-start gap-3.5 rounded-2xl border px-3.5 py-3.5 text-left transition-shadow ${
                    open
                      ? "border-brand-blue/20 bg-white shadow-md shadow-brand-blue/5"
                      : "border-brand-sand bg-brand-cream/80"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent.iconBg} ${accent.iconText}`}
                  >
                    <ServiceIcon icon={s.icon} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-heading text-base font-semibold leading-snug text-brand-blue-deep">
                        {s.title}
                      </h3>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue/8 text-brand-blue transition-transform ${open ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      >
                        <Chevron />
                      </span>
                    </div>
                    <p className={`mt-1.5 text-sm leading-relaxed text-gray-600 ${open ? "" : "line-clamp-2"}`}>
                      {open ? s.description : s.teaser}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-center text-xs text-gray-400">Appuyez pour lire le détail</p>
        </Reveal>

        {/* Desktop */}
        <div className="mt-14 hidden space-y-5 sm:block">
          <Reveal delay={80} variant="blur">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="/images/hero-accompagnement.jpg"
                alt=""
                className="aspect-[21/8] w-full object-cover lg:aspect-[21/7]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-deep/92 via-brand-blue-deep/55 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end px-5 py-8 sm:justify-center sm:px-8 sm:py-10 lg:px-12">
                <p className="font-accent text-xs uppercase tracking-[0.22em] text-brand-teal">Dor Hadash</p>
                <p className="mt-2 max-w-lg font-heading text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-3xl">
                  Quatre piliers clairs — pas un catalogue de services.
                </p>
                <Link
                  to="/nous-contacter?objet=entretien"
                  className="btn-ghost mt-5 w-full justify-center text-sm sm:w-fit"
                >
                  Demander un premier entretien →
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((s, i) => {
              const accent = accents[i % accents.length];
              return (
                <Reveal
                  key={s.title}
                  delay={120 + i * 70}
                  variant="up"
                  className={`group rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${accent.border}`}
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${accent.iconBg} ${accent.iconText}`}
                  >
                    <ServiceIcon icon={s.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-deep">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={100} className="mt-10 sm:mt-14">
          <p className="font-accent text-center text-xs uppercase tracking-[0.2em] text-brand-teal">
            Services transversaux
          </p>
          <h3 className="mt-2 text-center font-heading text-xl font-semibold text-brand-blue-deep sm:text-2xl">
            Hébreu, démarches et communauté
          </h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {transversalServices.map((s, i) => {
              const accent = accents[i % accents.length];
              return (
                <div
                  key={s.title}
                  className={`rounded-2xl border bg-brand-cream/70 p-4 sm:p-5 ${accent.border}`}
                >
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${accent.iconBg} ${accent.iconText}`}
                  >
                    <ServiceIcon icon={s.icon} className="h-5 w-5" />
                  </div>
                  <h4 className="mt-3 font-heading text-base font-semibold text-brand-blue-deep">{s.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{s.description}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-8 sm:mt-10">
          <aside className="rounded-2xl border border-brand-blue/15 bg-brand-blue/[0.04] px-5 py-4 text-sm leading-relaxed text-gray-700 sm:px-6 sm:py-5 sm:text-base">
            <p className="font-medium text-brand-blue-deep">Transparence</p>
            <p className="mt-1.5">{accompanimentDisclaimer}</p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function Chevron() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
