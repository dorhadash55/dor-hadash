import { Link } from "react-router-dom";
import { partners, partnersIntro } from "../content/partners";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function PartnersSection() {
  const single = partners.length === 1;

  return (
    <section className="section-shell bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            label={partnersIntro.label}
            title={partnersIntro.title}
            description={partnersIntro.description}
          />
        </Reveal>

        <div
          className={`mt-8 sm:mt-12 ${
            partners.length === 1
              ? "mx-auto max-w-3xl"
              : partners.length === 2
                ? "mx-auto grid max-w-4xl gap-4 sm:grid-cols-2"
                : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {partners.map((partner, i) => (
            <Reveal key={partner.slug} delay={i * 80} variant="up">
              <Link
                to={`/partenaires#${partner.slug}`}
                className="group flex items-start gap-4 rounded-2xl bg-white p-4 ring-1 ring-brand-sand transition-shadow hover:shadow-md sm:items-center sm:gap-5 sm:p-5"
              >
                <img
                  src={partner.logo}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-xl object-contain sm:h-14 sm:w-14"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <p className="font-heading text-base font-semibold text-brand-blue-deep sm:text-lg">
                      {partner.name}
                    </p>
                    {partner.nameHe && (
                      <span className="text-sm text-brand-blue/45" dir="rtl">
                        {partner.nameHe}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-snug text-gray-600">{partner.tagline}</p>
                  {partner.offer && (
                    <p className="mt-2 text-xs font-medium text-brand-teal sm:text-sm">{partner.offer}</p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue transition-all group-hover:gap-1.5">
                    En savoir plus
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {!single && (
          <Reveal delay={120} className="mt-8 text-center">
            <Link to="/partenaires" className="btn-outline">
              Tous nos partenaires →
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
