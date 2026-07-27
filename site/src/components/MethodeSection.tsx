import { useState } from "react";
import { methodeSteps } from "../content/homepage";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const stepThemes = [
  { badge: "from-brand-blue to-brand-blue-dark", glow: "shadow-brand-blue/20", ring: "ring-brand-blue/20" },
  { badge: "from-brand-teal to-emerald-500", glow: "shadow-brand-teal/25", ring: "ring-brand-teal/25" },
  { badge: "from-brand-blue-light to-brand-blue", glow: "shadow-brand-blue-light/25", ring: "ring-brand-blue-light/25" },
  { badge: "from-brand-coral to-orange-500", glow: "shadow-brand-coral/20", ring: "ring-brand-coral/20" },
];

export default function MethodeSection() {
  const [openStep, setOpenStep] = useState<string | null>(null);

  return (
    <section id="methode" className="section-shell relative overflow-x-clip bg-brand-cream">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-teal/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal variant="blur">
          <SectionHeading
            align="center"
            label="Notre méthode"
            title="La méthode Dor Hadash"
            description="Quatre étapes pour une Alya réussie."
          />
        </Reveal>

        {/* Mobile — accordion compact */}
        <Reveal delay={100} className="sm:hidden">
          <div className="relative mt-8">
            <div
              className="absolute bottom-3 left-[1.375rem] top-3 w-px bg-gradient-to-b from-brand-blue via-brand-teal to-brand-coral"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-2.5">
              {methodeSteps.map((s, i) => {
                const theme = stepThemes[i];
                const open = openStep === s.step;
                return (
                  <article key={s.step} className="methode-step relative pl-12">
                    <div
                      className={`absolute left-0 top-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${theme.badge} font-heading text-sm font-semibold text-white shadow-md ${theme.glow}`}
                    >
                      {s.step}
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenStep(open ? null : s.step)}
                      aria-expanded={open}
                      className={`w-full rounded-2xl bg-white p-3.5 text-left shadow-sm ring-1 transition ${theme.ring}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-heading text-base font-semibold text-brand-blue-deep">{s.title}</h3>
                        <span
                          className={`shrink-0 text-brand-blue transition-transform ${open ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        >
                          <Chevron />
                        </span>
                      </div>
                      {open && (
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
                      )}
                    </button>
                  </article>
                );
              })}
            </div>
            <p className="mt-3 text-center text-xs text-gray-400">Appuyez sur une étape pour voir le détail</p>
          </div>
        </Reveal>

        {/* Desktop */}
        <div className="relative mt-16 hidden sm:block">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 h-px overflow-hidden bg-brand-blue/10 lg:block"
            aria-hidden="true"
          >
            <div className="methode-progress h-full w-full origin-left bg-gradient-to-r from-brand-blue via-brand-teal to-brand-coral" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {methodeSteps.map((s, i) => {
              const theme = stepThemes[i];
              return (
                <Reveal key={s.step} delay={i * 110} variant="up">
                  <article className="methode-step group">
                    <div className="relative z-10 inline-flex">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${theme.badge} font-heading text-lg font-semibold text-white shadow-lg transition-transform duration-300 group-hover:scale-105 ${theme.glow}`}
                      >
                        {s.step}
                      </div>
                    </div>
                    <div
                      className={`mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md ${theme.ring}`}
                    >
                      <h3 className="font-heading text-lg font-semibold text-brand-blue-deep">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chevron() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
