import { useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import Reveal from "../components/Reveal";
import {
  missionQuote,
  missionIntro,
  missionAudience,
  missionVillage,
  missionProgram,
} from "../content/team";

const phaseColors = ["bg-brand-blue", "bg-brand-teal", "bg-brand-coral"];

const nextSteps = [
  { label: "Préparer mon Alya", href: "/preparer-mon-alya" },
  { label: "Choisir une ville", href: "/nos-villes" },
  { label: "Paroles d'olim", href: "/temoignages-videos" },
];

export default function Mission() {
  const [openPhase, setOpenPhase] = useState<number | null>(0);

  return (
    <>
      <SeoHead />

      <section className="relative overflow-hidden bg-brand-blue-deep text-white">
        <img
          src="/images/jerusalem.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/80 to-brand-blue-deep/45" aria-hidden />

        <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28">
          <p className="font-accent text-xs uppercase tracking-[0.28em] text-brand-teal">Dor Hadash</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-wide sm:text-5xl">
            Notre accompagnement
          </h1>
          <blockquote className="mt-6 max-w-2xl border-l-2 border-brand-teal/80 pl-4 sm:mt-8 sm:pl-5">
            <p className="font-heading text-[1.35rem] font-medium leading-snug text-balance sm:text-3xl">
              « {missionQuote.text} »
            </p>
            <footer className="mt-3 text-sm text-white/70">
              <span className="font-semibold text-white">{missionQuote.author}</span>
              <span className="text-white/45"> — {missionQuote.role}</span>
            </footer>
          </blockquote>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/85 sm:text-lg">{missionIntro}</p>
          <a
            href="#parcours"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/18"
          >
            Voir le parcours
            <span aria-hidden>↓</span>
          </a>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-[#168a78]">
              Le cadre
            </p>
            <h2 className="mt-2 font-heading text-[1.65rem] font-semibold text-brand-blue-deep sm:text-4xl">
              Un accueil adapté à chaque projet
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">{missionVillage[0]}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              {missionVillage[2]}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 rounded-2xl bg-brand-blue-deep px-5 py-5 text-white sm:px-6">
              <p className="font-accent text-[11px] uppercase tracking-[0.2em] text-brand-teal">Pour qui ?</p>
              <p className="mt-2 text-sm font-medium leading-relaxed sm:text-base">{missionAudience}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="parcours" className="section-shell scroll-mt-24 bg-brand-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-[#168a78]">
              Le parcours
            </p>
            <h2 className="mt-2 font-heading text-[1.65rem] font-semibold text-brand-blue-deep sm:text-4xl">
              6 mois avant, 12 mois après
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              Préparation 6 mois avant le départ, puis 12 mois d&apos;intégration après l&apos;arrivée. La formule
              de base est la même pour les familles et les célibataires, avec quelques adaptations.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              Les démarches concrètes — Agence Juive, adhésion, contacts partenaires — sont détaillées dans{" "}
              <Link to="/preparer-mon-alya" className="font-semibold text-brand-blue hover:underline">
                Préparer mon Alya
              </Link>
              .
            </p>
          </Reveal>

          <div className="mt-6 space-y-2 sm:mt-8">
            {missionProgram.phases.map((phase, i) => {
              const open = openPhase === i;
              return (
                <Reveal key={phase.title} delay={i * 50}>
                  <div
                    className={`overflow-hidden rounded-2xl border ${
                      open ? "border-brand-blue/20 bg-white" : "border-brand-sand bg-white/80"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenPhase(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center gap-3 px-3.5 py-3.5 text-left sm:px-4 sm:py-4"
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-sm font-semibold text-white ${phaseColors[i] ?? phaseColors[0]}`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-heading text-base font-semibold text-brand-blue-deep sm:text-lg">
                          {phase.title}
                        </span>
                        {!open && (
                          <span className="mt-0.5 block text-xs text-gray-500">{phase.items.length} étapes</span>
                        )}
                      </span>
                      <span
                        className={`text-brand-blue transition-transform ${open ? "rotate-180" : ""}`}
                        aria-hidden
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    {open && (
                      <ul className="space-y-2 border-t border-brand-sand px-3.5 pb-4 pt-3 sm:px-4">
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
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="font-accent text-xs uppercase tracking-[0.22em] text-[#168a78]">Prochaine étape</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl">
              Prêt à en parler ?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              Un coordinateur vous répond rapidement — sans engagement.
            </p>
            <Link
              to="/nous-contacter?objet=entretien"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-blue/20 transition hover:bg-brand-blue-dark"
            >
              Demander un premier entretien →
            </Link>
            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-brand-blue">
              {nextSteps.map((step) => (
                <Link key={step.href} to={step.href} className="hover:underline">
                  {step.label} →
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
