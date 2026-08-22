import { useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import { checklistPdf, prepareAlya } from "../content/prepareAlya";

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
            <p className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">Checklist olim</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl">
              La checklist officielle Dor Hadash
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">{prepareAlya.checklistIntro}</p>
          </Reveal>
          <Reveal delay={80}>
            <a
              href={checklistPdf.href}
              download={checklistPdf.filename}
              className="mt-6 flex flex-col gap-4 rounded-2xl border border-brand-sand bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5M12 11v6m0 0-2.5-2.5M12 17l2.5-2.5" />
                  </svg>
                </span>
                <span>
                  <span className="block font-heading text-lg font-semibold text-brand-blue-deep">
                    Checklist Dor Hadash
                  </span>
                  <span className="mt-1 block text-sm text-gray-600">
                    PDF officiel — à télécharger et à conserver.
                  </span>
                </span>
              </div>
              <span className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white">
                {checklistPdf.label}
              </span>
            </a>
          </Reveal>
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
                  {topic.title.startsWith("Budget") && (
                    <Link to="/nos-villes#loyers" className="mt-3 inline-block text-sm font-semibold text-brand-blue hover:underline">
                      Voir les fourchettes de loyers →
                    </Link>
                  )}
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
                  {...("download" in link && link.download
                    ? { download: link.download }
                    : { target: "_blank", rel: "noopener noreferrer" })}
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
            <Link
              to="/nous-contacter?objet=entretien"
              className="inline-flex rounded-full bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-brand-blue-dark"
            >
              Demander un premier entretien →
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Ou{" "}
              <Link to="/mission" className="font-semibold text-brand-blue hover:underline">
                découvrir l&apos;accompagnement
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
