import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import Reveal from "../components/Reveal";
import {
  missionQuote,
  missionIntro,
  missionSupport,
  missionAudience,
  missionVillage,
  missionIncubator,
  missionProgram,
  missionSynthese,
} from "../content/team";

const supportIcons: ReactNode[] = [
  <svg key="h" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />
  </svg>,
  <svg key="l" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v11H8l-4 3V6Z" />
  </svg>,
  <svg key="b" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 9h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9Z" />
  </svg>,
  <svg key="d" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h8l4 4v14H7V3Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 3v4h4M9 13h6M9 17h4" />
  </svg>,
];

function Accordion({
  title,
  teaser,
  children,
  defaultOpen = false,
}: {
  title: string;
  teaser?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left active:bg-white/5"
      >
        <span className="min-w-0 flex-1">
          <span className="block font-heading text-[1.05rem] font-semibold tracking-wide text-white">
            {title}
          </span>
          {teaser && !open && (
            <span className="mt-1 block text-sm leading-snug text-white/60">{teaser}</span>
          )}
        </span>
        <span
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-teal/20 text-brand-teal transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
          <div className="border-t border-white/10 px-4 pb-4 pt-3 text-sm leading-relaxed text-white/80">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function PillarRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const cards = [...rail.querySelectorAll<HTMLElement>("[data-pillar]")];
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = cards.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setActive(idx);
      },
      { root: rail, threshold: [0.55, 0.75] },
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (i: number) => {
    const rail = railRef.current;
    const card = rail?.querySelectorAll<HTMLElement>("[data-pillar]")[i];
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div>
      <div
        ref={railRef}
        className="mt-7 -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4"
      >
        {missionSupport.map((item, i) => (
          <article
            key={item.title}
            data-pillar
            className="mission-pillar group relative w-[82vw] max-w-[18rem] shrink-0 snap-center overflow-hidden rounded-[1.35rem] bg-white p-5 sm:w-auto sm:max-w-none"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-teal/10 transition-transform duration-500 group-hover:scale-125"
              aria-hidden
            />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-light text-white shadow-md shadow-brand-blue/25">
              {supportIcons[i]}
            </span>
            <p className="relative mt-5 font-accent text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal">
              0{i + 1}
            </p>
            <h3 className="relative mt-1 font-heading text-xl font-semibold text-brand-blue-deep">{item.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-gray-600">{item.detail}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 sm:hidden" role="tablist" aria-label="Piliers">
        {missionSupport.map((item, i) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={item.title}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? "w-7 bg-brand-teal" : "w-1.5 bg-brand-blue/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Mission() {
  return (
    <>
      <SeoHead />

      {/* Hero immersif plein écran */}
      <section className="relative flex min-h-[min(92svh,44rem)] flex-col justify-end overflow-hidden text-white">
        <img
          src="/images/jerusalem.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] mission-hero-img"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#021a4a] via-[#032d7a]/78 to-[#032d7a]/35"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 45% at 15% 20%, rgba(41,196,169,0.28), transparent 55%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-3xl px-4 pb-10 pt-24 sm:px-6 sm:pb-16 sm:pt-28">
          <h1 className="mission-hero-in font-heading text-3xl font-semibold tracking-wide text-white sm:text-5xl">
            Dor Hadash
          </h1>
          <p
            className="mission-hero-in mt-1 font-accent text-xs uppercase tracking-[0.28em] text-brand-teal sm:text-sm"
            style={{ animationDelay: "120ms" }}
          >
            Notre mission
          </p>

          <blockquote
            className="mission-hero-in mt-6 max-w-2xl border-l-2 border-brand-teal/80 pl-4 sm:mt-8 sm:pl-5"
            style={{ animationDelay: "220ms" }}
          >
            <p className="font-heading text-[1.35rem] font-medium leading-[1.25] text-balance sm:text-3xl lg:text-4xl">
              « {missionQuote.text} »
            </p>
            <footer className="mt-4 text-sm text-white/70">
              <span className="font-semibold text-white">{missionQuote.author}</span>
              <span className="text-white/45"> — {missionQuote.role}</span>
            </footer>
          </blockquote>

          <p
            className="mission-hero-in mt-6 max-w-xl text-[0.95rem] leading-relaxed text-white/85 sm:mt-8 sm:text-lg"
            style={{ animationDelay: "340ms" }}
          >
            {missionIntro}
          </p>

          <a
            href="#parcours"
            className="mission-hero-in mt-8 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/18"
            style={{ animationDelay: "460ms" }}
          >
            Voir le parcours 12 mois
            <svg className="h-4 w-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* 4 piliers */}
      <section className="relative overflow-hidden bg-brand-cream py-11 sm:py-16">
        <div
          className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-brand-teal/10 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
              01 — Le projet
            </p>
            <h2 className="mt-2 font-heading text-[1.65rem] font-semibold leading-tight text-brand-blue-deep sm:text-4xl">
              Un appui concret, à chaque étape
            </h2>
            <p className="mt-2 max-w-xl text-sm text-gray-600 sm:text-base">
              Glissez pour découvrir les quatre piliers de l&apos;intégration.
            </p>
          </Reveal>
          <PillarRail />
        </div>
      </section>

      {/* Village — éditorial */}
      <section className="bg-white py-11 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
              02 — Le cadre
            </p>
            <h2 className="mt-2 font-heading text-[1.65rem] font-semibold text-brand-blue-deep sm:text-4xl">
              Un village communautaire
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 text-[1.05rem] font-medium leading-relaxed text-brand-blue-deep sm:text-xl">
              {missionVillage[0]}
            </p>
          </Reveal>

          <div className="mt-6 space-y-4">
            {missionVillage.slice(1).map((p, i) => (
              <Reveal key={p} delay={120 + i * 60}>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue-deep to-brand-blue px-5 py-5 text-white sm:px-6 sm:py-6">
              <p className="font-accent text-[11px] uppercase tracking-[0.2em] text-brand-teal">Pour qui ?</p>
              <p className="mt-2 text-sm font-medium leading-relaxed sm:text-base">{missionAudience}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Incubateur */}
      <section className="relative overflow-hidden bg-brand-blue-deep py-11 text-white sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 90% 0%, rgba(41,196,169,0.28), transparent 50%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(43,135,218,0.25), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
              03 — L&apos;incubateur
            </p>
            <h2 className="mt-2 font-heading text-[1.65rem] font-semibold sm:text-4xl">
              Pensé pour l&apos;Alya francophone
            </h2>
            <p className="mt-3 max-w-lg text-sm text-white/70 sm:text-base">
              Un lieu de vie complet — ouvrez chaque volet pour le détail.
            </p>
          </Reveal>

          <div className="mt-7 space-y-3 sm:hidden">
            <Reveal>
              <Accordion
                title="Le lieu"
                teaser="À proximité d'une grande ville, pensé pour le quotidien."
                defaultOpen
              >
                {missionIncubator.lieu}
              </Accordion>
            </Reveal>
            <Reveal delay={50}>
              <Accordion
                title="Les équipements"
                teaser="Logements, école, synagogue, sport et cadre de vie."
              >
                <ul className="space-y-2.5">
                  {missionIncubator.equipements.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </Reveal>
            <Reveal delay={100}>
              <Accordion
                title="L'accueil"
                teaser="Idéal pour les familles dès la première période d'intégration."
              >
                {missionIncubator.accueil}
              </Accordion>
            </Reveal>
          </div>

          <div className="mt-8 hidden space-y-9 sm:block">
            <Reveal>
              <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">Le lieu</h3>
              <p className="mt-2 leading-relaxed text-white/85">{missionIncubator.lieu}</p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">Les équipements</h3>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {missionIncubator.equipements.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-white/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">L&apos;accueil</h3>
              <p className="mt-2 leading-relaxed text-white/85">{missionIncubator.accueil}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Programme timeline */}
      <section id="parcours" className="scroll-mt-24 bg-brand-cream py-11 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
              04 — Le parcours
            </p>
            <h2 className="mt-2 font-heading text-[1.65rem] font-semibold text-brand-blue-deep sm:text-4xl">
              12 mois pour devenir autonome
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">{missionProgram.intro}</p>
          </Reveal>

          <div className="relative mt-9 space-y-5">
            <div
              className="absolute bottom-6 left-[1.15rem] top-6 w-px bg-gradient-to-b from-brand-blue via-brand-teal to-brand-coral sm:left-[1.35rem]"
              aria-hidden
            />
            {missionProgram.phases.map((phase, i) => (
              <Reveal key={phase.title} delay={i * 100}>
                <article className="relative pl-12 sm:pl-14">
                  <div
                    className={`absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full font-heading text-sm font-semibold text-white shadow-lg sm:h-11 sm:w-11 sm:text-base ${
                      i === 0
                        ? "bg-brand-blue shadow-brand-blue/30"
                        : "bg-brand-teal shadow-brand-teal/30"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="overflow-hidden rounded-[1.25rem] bg-white p-4 ring-1 ring-black/[0.04] sm:p-6">
                    <div className="flex items-center gap-3">
                      <p className="font-accent text-[11px] uppercase tracking-[0.2em] text-brand-teal">
                        Étape {i + 1}
                      </p>
                      <span className="h-px flex-1 bg-gradient-to-r from-brand-teal/40 to-transparent" />
                    </div>
                    <h3 className="mt-1.5 font-heading text-xl font-semibold text-brand-blue-deep sm:text-2xl">
                      {phase.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {phase.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-gray-700">
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
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Synthèse + CTA */}
      <section className="bg-white py-11 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
              05 — En clair
            </p>
            <h2 className="mt-2 font-heading text-[1.65rem] font-semibold text-brand-blue-deep sm:text-4xl">
              Ce que vous gagnez
            </h2>
          </Reveal>

          <ul className="mt-7 space-y-2">
            {missionSynthese.map((item, i) => (
              <Reveal key={item} delay={Math.min(i * 35, 250)}>
                <li className="flex items-start gap-3 border-b border-brand-sand/80 py-3.5 text-sm leading-relaxed text-gray-800 last:border-0 sm:text-base">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 font-heading text-xs font-bold text-brand-teal">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={100}>
            <div className="relative mt-10 overflow-hidden rounded-[1.5rem] bg-brand-blue-deep px-5 py-9 text-center text-white sm:px-8 sm:py-12">
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(41,196,169,0.35), transparent 55%)",
                }}
                aria-hidden
              />
              <div className="relative">
                <p className="font-accent text-xs uppercase tracking-[0.22em] text-brand-teal">Prochaine étape</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
                  Prêt à en parler avec Dor Hadash ?
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-white/75">
                  Un coordinateur vous répond rapidement.
                </p>
                <Link to="/nous-contacter" className="btn-primary mt-7 inline-flex">
                  Nous contacter →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
