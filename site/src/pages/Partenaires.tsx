import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import { partners, partnersIntro, type Partner } from "../content/partners";

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article
      id={partner.slug}
      className="scroll-mt-28 overflow-hidden rounded-2xl bg-white ring-1 ring-brand-sand"
    >
      {/* Header */}
      <div className="border-b border-brand-sand px-5 py-5 sm:px-8 sm:py-6">
        <div className="flex items-start gap-4">
          <img
            src={partner.logo}
            alt=""
            className="h-14 w-14 shrink-0 rounded-2xl object-contain shadow-sm sm:h-16 sm:w-16"
          />
          <div className="min-w-0 pt-0.5">
            <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-brand-teal sm:text-xs">
              Partenaire Dor Hadash
            </p>
            <h2 className="mt-1 font-heading text-xl font-semibold leading-tight text-brand-blue-deep sm:text-2xl">
              {partner.name}
            </h2>
            {partner.nameHe && (
              <p className="mt-0.5 text-base text-brand-blue/50" dir="rtl">
                {partner.nameHe}
              </p>
            )}
            <p className="mt-2 text-sm text-gray-600">{partner.tagline}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-5 py-6 sm:space-y-7 sm:px-8 sm:py-8">
        {partner.quote && (
          <p className="font-heading text-lg font-semibold leading-snug text-brand-blue-deep text-balance sm:text-xl">
            {partner.quote}
          </p>
        )}

        <p className="text-sm leading-relaxed text-gray-600 sm:text-[0.9375rem]">{partner.summary}</p>

        {partner.audience && (
          <p className="text-sm text-gray-500">{partner.audience}</p>
        )}

        {partner.offer && (
          <div className="rounded-xl bg-brand-cream px-4 py-3.5 ring-1 ring-brand-sand">
            <p className="text-sm font-semibold leading-snug text-brand-blue-deep">{partner.offer}</p>
          </div>
        )}

        <div>
          <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-brand-blue/45">
            Ils vous aident à
          </p>
          <ol className="mt-3 space-y-0 divide-y divide-brand-sand overflow-hidden rounded-xl ring-1 ring-brand-sand">
            {partner.highlights.map((item, index) => (
              <li key={item} className="flex gap-3 bg-brand-cream/40 px-3.5 py-3.5 sm:px-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue text-[11px] font-bold text-white">
                  {index + 1}
                </span>
                <span className="pt-0.5 text-sm leading-snug text-gray-700">{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap">
          <a
            href={partner.website}
            target="_blank"
            rel="noreferrer"
            className="btn-primary w-full justify-center sm:w-auto"
          >
            {partner.websiteLabel}
          </a>
          {partner.phone && (
            <a
              href={`tel:${partner.phone}`}
              className="btn-outline w-full justify-center border border-brand-sand bg-white px-5 py-3 sm:w-auto"
            >
              {partner.contactName ? `${partner.contactName} · ` : ""}
              {partner.phoneDisplay ?? partner.phone}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Partenaires() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
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
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
          <Reveal>
            <PartnerCard partner={partners[0]} />
          </Reveal>

          {partners.slice(1).map((partner, i) => (
            <Reveal key={partner.slug} delay={(i + 1) * 80} className="mt-6">
              <PartnerCard partner={partner} />
            </Reveal>
          ))}

          <Reveal delay={100} className="mt-10 text-center">
            <p className="text-sm text-gray-500">Vous préparez votre Alya avec Dor Hadash ?</p>
            <Link to="/nous-contacter" className="btn-primary mt-4 inline-flex">
              Nous contacter
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
