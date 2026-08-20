import { useState } from "react";
import {
  accompanimentDisclaimer,
  pillars,
  transversalServices,
} from "../content/homepage";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ServiceIcon from "./ServiceIcon";

const accents = [
  { iconBg: "bg-brand-blue", iconText: "text-white", border: "border-brand-blue/20" },
  { iconBg: "bg-brand-teal", iconText: "text-brand-blue-deep", border: "border-brand-teal/25" },
  { iconBg: "bg-brand-coral", iconText: "text-white", border: "border-brand-coral/20" },
  { iconBg: "bg-brand-blue-deep", iconText: "text-white", border: "border-brand-blue/20" },
];

export default function ServicesSection() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <section id="piliers" className="section-shell scroll-mt-24 bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            label="Les quatre piliers"
            title="Logement, immersion, éducation, emploi"
            description="L'identité du programme — reconnaissable partout."
          />
        </Reveal>

        {/* Mobile — accordéon fermé par défaut */}
        <Reveal delay={60} className="mt-6 sm:hidden">
          <div className="space-y-2">
            {pillars.map((s, i) => {
              const accent = accents[i % accents.length];
              const open = openTitle === s.title;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setOpenTitle(open ? null : s.title)}
                  aria-expanded={open}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left ${
                    open
                      ? "border-brand-blue/20 bg-white shadow-sm"
                      : "border-transparent bg-white/80"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accent.iconBg} ${accent.iconText}`}
                  >
                    <ServiceIcon icon={s.icon} className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-[0.95rem] font-semibold text-brand-blue-deep">
                      {s.title}
                    </h3>
                    {open ? (
                      <p className="mt-1 text-sm leading-snug text-gray-600">{s.description}</p>
                    ) : (
                      <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">{s.teaser}</p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 text-brand-blue transition-transform ${open ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <Chevron />
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Desktop — grille sans bannière */}
        <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((s, i) => {
            const accent = accents[i % accents.length];
            return (
              <Reveal
                key={s.title}
                delay={80 + i * 50}
                variant="up"
                className={`rounded-2xl border bg-white p-5 ${accent.border}`}
              >
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${accent.iconBg} ${accent.iconText}`}
                >
                  <ServiceIcon icon={s.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-heading text-lg font-semibold text-brand-blue-deep">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{s.description}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={80} className="mt-6 sm:mt-8">
          <p className="text-center font-accent text-[10px] uppercase tracking-[0.2em] text-brand-teal sm:text-xs">
            Aussi inclus
          </p>
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            {transversalServices.map((s) => (
              <li
                key={s.title}
                className="rounded-full border border-brand-sand bg-white px-3.5 py-1.5 text-xs font-medium text-brand-blue-deep sm:text-sm"
              >
                {s.title}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-gray-500 sm:mt-5 sm:text-sm">
            {accompanimentDisclaimer}
          </p>
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
