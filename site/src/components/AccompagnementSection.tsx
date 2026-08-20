import { useState } from "react";
import {
  missionAudience,
  missionIntro,
  missionProgram,
  missionQuote,
  missionVillage,
} from "../content/team";
import Reveal from "./Reveal";

const phaseColors = [
  "bg-brand-blue",
  "bg-brand-teal",
  "bg-brand-coral",
];

/**
 * Accompagnement compact : citation + cadre + parcours en accordéon
 * (remplace les deux anciennes sections Mission / Parcours trop longues).
 */
export default function AccompagnementSection() {
  const [openPhase, setOpenPhase] = useState<number | null>(0);

  return (
    <section id="accompagnement" className="section-shell scroll-mt-24 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
            Notre accompagnement
          </p>
          <blockquote className="mt-3 border-l-2 border-brand-teal pl-3.5 sm:mt-4 sm:pl-5">
            <p className="font-heading text-lg font-medium leading-snug text-brand-blue-deep text-balance sm:text-2xl">
              « {missionQuote.text} »
            </p>
            <footer className="mt-2 text-xs text-gray-500 sm:mt-3 sm:text-sm">
              <span className="font-semibold text-brand-blue-deep">{missionQuote.author}</span>
              <span className="text-gray-400"> — {missionQuote.role}</span>
            </footer>
          </blockquote>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:mt-5 sm:text-base">
            {missionIntro}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            {missionVillage[0]}
          </p>
          <p className="mt-4 rounded-xl bg-brand-blue-deep px-4 py-3 text-sm font-medium leading-snug text-white sm:px-5 sm:py-3.5">
            <span className="font-accent text-[10px] uppercase tracking-[0.18em] text-brand-teal">
              Pour qui ?{" "}
            </span>
            {missionAudience}
          </p>
        </Reveal>

        <div id="parcours" className="mt-8 scroll-mt-24 sm:mt-10">
          <Reveal>
            <h2 className="font-heading text-xl font-semibold text-brand-blue-deep sm:text-3xl">
              6 mois avant, 12 mois après
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
              Préparation 6 mois avant le départ, puis 12 mois d&apos;intégration après l&apos;arrivée — avec un
              contrat d&apos;engagement signé des deux côtés.
            </p>
          </Reveal>

          <div className="mt-5 space-y-2 sm:mt-6">
            {missionProgram.phases.map((phase, i) => {
              const open = openPhase === i;
              return (
                <Reveal key={phase.title} delay={i * 60}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-colors ${
                      open
                        ? "border-brand-blue/20 bg-brand-cream/60"
                        : "border-brand-sand bg-brand-cream/40"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenPhase(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center gap-3 px-3.5 py-3.5 text-left sm:gap-4 sm:px-4 sm:py-4"
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-sm font-semibold text-white sm:h-9 sm:w-9 ${phaseColors[i] ?? phaseColors[0]}`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-heading text-base font-semibold text-brand-blue-deep sm:text-lg">
                          {phase.title}
                        </span>
                        {!open && (
                          <span className="mt-0.5 block text-xs text-gray-500 sm:text-sm">
                            {phase.items.length} étapes · appuyer pour voir
                          </span>
                        )}
                      </span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue/8 text-brand-blue transition-transform ${open ? "rotate-180" : ""}`}
                        aria-hidden
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-2 border-t border-brand-sand/80 px-3.5 pb-3.5 pt-3 sm:px-4 sm:pb-4">
                          {phase.items.map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-snug text-gray-700">
                              <svg
                                className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                aria-hidden
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
