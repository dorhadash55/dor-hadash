import { Link } from "react-router-dom";
import { partners, partnersIntro, type Partner } from "../content/partners";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function PartnerLogoMark({ partner }: { partner: Partner }) {
  if (!partner.logo) {
    return (
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-cream font-heading text-sm font-semibold text-brand-blue ring-1 ring-brand-sand sm:h-[4.5rem] sm:w-[4.5rem]"
        aria-hidden
      >
        {partner.name
          .split(/\s+/)
          .slice(0, 2)
          .map((w) => w[0])
          .join("")
          .toUpperCase()}
      </div>
    );
  }
  return (
    <img
      src={partner.logo}
      alt=""
      className="h-16 w-16 rounded-2xl bg-white object-contain p-1.5 shadow-sm ring-1 ring-brand-sand sm:h-[4.5rem] sm:w-[4.5rem]"
    />
  );
}

export default function PartnersSection() {
  const institutionnels = partners.filter((p) => p.category === "institutionnel");
  const olimaid = partners.find((p) => p.slug === "olimaid");
  const others = partners.filter(
    (p) => p.category !== "institutionnel" && p.slug !== "olimaid",
  );

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

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {institutionnels.map((partner, i) => (
            <Reveal key={partner.slug} delay={Math.min(i * 40, 200)} variant="up">
              <Link
                to={`/partenaires#${partner.slug}`}
                className="group flex h-full flex-col items-center rounded-2xl bg-white p-4 text-center ring-1 ring-brand-sand transition-shadow hover:shadow-md sm:p-5"
              >
                <PartnerLogoMark partner={partner} />
                <p className="mt-3 font-heading text-sm font-semibold leading-snug text-brand-blue-deep sm:text-base">
                  {partner.name}
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-snug text-gray-500 sm:text-sm">
                  {partner.tagline}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        {olimaid && (
          <Reveal delay={80} variant="up">
            <a
              href={olimaid.website}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 flex flex-col gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-white to-brand-cream p-5 ring-2 ring-brand-teal/40 transition-shadow hover:shadow-lg sm:mt-8 sm:flex-row sm:items-center sm:gap-7 sm:p-6"
            >
              <img
                src={olimaid.logo}
                alt=""
                className="mx-auto h-16 w-16 shrink-0 object-contain sm:mx-0 sm:h-20 sm:w-20"
              />
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-brand-teal">
                  Essayez dès maintenant
                </p>
                <p className="mt-1 font-heading text-xl font-semibold text-brand-blue-deep sm:text-2xl">
                  {olimaid.name}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-gray-600 sm:text-base">
                  {olimaid.tagline}
                </p>
                <p className="mt-1 text-sm text-gray-500">{olimaid.quote}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-teal px-4 py-2 text-sm font-semibold text-brand-blue-deep transition-transform group-hover:translate-x-0.5">
                  Essayer gratuitement
                  <span aria-hidden>→</span>
                </span>
              </div>
            </a>
          </Reveal>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {others.map((partner, i) => (
            <Reveal key={partner.slug} delay={Math.min(i * 40, 280)} variant="up">
              <Link
                to={`/partenaires#${partner.slug}`}
                className="group flex h-full flex-col items-center rounded-2xl bg-white p-4 text-center ring-1 ring-brand-sand transition-shadow hover:shadow-md sm:p-5"
              >
                <PartnerLogoMark partner={partner} />
                <p className="mt-3 font-heading text-sm font-semibold leading-snug text-brand-blue-deep sm:text-base">
                  {partner.name}
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-snug text-gray-500 sm:text-sm">
                  {partner.tagline}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8 text-center">
          <Link to="/partenaires" className="btn-outline">
            Tous nos partenaires →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
