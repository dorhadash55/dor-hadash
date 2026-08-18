import { useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import { prepareAlya } from "../content/prepareAlya";

export default function PreparerMonAlya() {
  const [openFaq, setOpenFaq] = useState<string | null>(prepareAlya.faq[0]?.q ?? null);

  return (
    <>
      <SeoHead />
      <PageBanner
        title="Préparer mon Alya"
        subtitle={prepareAlya.intro}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <p className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">Chronologie</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl">
              Les étapes-clés
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {prepareAlya.chronology.map((phase, i) => (
              <Reveal key={phase.title} delay={i * 80} variant="up">
                <div className="h-full rounded-2xl border border-brand-sand bg-brand-cream/50 p-5">
                  <p className="font-accent text-[11px] uppercase tracking-[0.18em] text-brand-teal">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-brand-blue-deep">{phase.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    {phase.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-teal" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <p className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">Checklist</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl">
              À préparer avant le départ
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Liste de contrôle à imprimer ou à copier — une version PDF téléchargeable pourra être ajoutée
              dès que l&apos;association la valide.
            </p>
          </Reveal>
          <ul className="mt-6 space-y-3">
            {prepareAlya.checklist.map((item, i) => (
              <Reveal key={item} delay={i * 40} variant="up">
                <li className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-sm text-gray-700 ring-1 ring-brand-sand">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-brand-blue/30 text-[10px] font-bold text-brand-blue">
                    {i + 1}
                  </span>
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <p className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">Repères pratiques</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl">
              Budget, école, diplômes, premiers jours
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {prepareAlya.topics.map((topic, i) => (
              <Reveal key={topic.title} delay={i * 60} variant="up">
                <div className="h-full rounded-2xl border border-brand-sand p-5">
                  <h3 className="font-heading text-lg font-semibold text-brand-blue-deep">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{topic.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <p className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">Liens utiles</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-blue-deep">
              Organismes officiels &amp; partenaires
            </h2>
          </Reveal>
          <ul className="mt-6 space-y-2">
            {prepareAlya.officialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-brand-blue hover:underline"
                >
                  {link.label} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <p className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">FAQ</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-blue-deep">Questions fréquentes</h2>
          </Reveal>
          <div className="mt-6 space-y-3">
            {prepareAlya.faq.map((item) => {
              const open = openFaq === item.q;
              return (
                <div key={item.q} className="overflow-hidden rounded-2xl border border-brand-sand">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : item.q)}
                    aria-expanded={open}
                    className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left"
                  >
                    <span className="font-heading text-base font-semibold text-brand-blue-deep">{item.q}</span>
                    <span className={`mt-1 shrink-0 text-brand-blue transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  {open && <p className="border-t border-brand-sand px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-600">{item.a}</p>}
                </div>
              );
            })}
          </div>

          <Reveal delay={100} className="mt-10 text-center">
            <Link to="/nous-contacter?objet=entretien" className="btn-primary inline-flex">
              Demander un premier entretien →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
