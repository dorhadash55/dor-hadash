import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import CityImage from "../components/CityImage";
import CityGalleryCarousel from "../components/CityGalleryCarousel";
import Reveal from "../components/Reveal";
import { getCityBySlug, type CitySection } from "../content/cities";

function teaserFrom(section: CitySection) {
  const first = section.paragraphs[0] ?? "";
  if (first.length <= 88) return first;
  return `${first.slice(0, 85).trimEnd()}…`;
}

function SectionAccordion({
  section,
  index,
  defaultOpen = false,
}: {
  section: CitySection;
  index: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-shadow ${
        open
          ? "border-brand-teal/30 bg-white shadow-md shadow-brand-blue/5"
          : "border-brand-sand bg-white/80"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-4 py-4 text-left active:bg-brand-cream/60"
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 font-heading text-sm font-bold text-brand-blue">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-heading text-[1.05rem] font-semibold leading-snug text-brand-blue-deep">
            {section.heading}
          </span>
          {!open && (
            <span className="mt-1 block text-sm leading-snug text-gray-500">{teaserFrom(section)}</span>
          )}
        </span>
        <span
          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-blue transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
          <div className="space-y-3 border-t border-brand-sand px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-600">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PillarCards({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {paragraphs.map((p, i) => {
        const colon = p.indexOf(" : ");
        const title = colon > 0 ? p.slice(0, colon) : `Pilier ${i + 1}`;
        const body = colon > 0 ? p.slice(colon + 3) : p;
        return (
          <Reveal key={title} delay={i * 70} variant="scale">
            <div className="city-pillar h-full rounded-2xl border border-brand-sand bg-white p-4 shadow-sm">
              <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-brand-teal">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-heading text-base font-semibold text-brand-blue-deep">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{body}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function DesktopSection({ section, index }: { section: CitySection; index: number }) {
  const isPillars = /pilier/i.test(section.heading);
  return (
    <Reveal delay={Math.min(index * 70, 220)} variant="up">
      <div className={`rounded-2xl px-1 py-1 sm:px-0 ${index % 2 === 1 ? "sm:bg-brand-cream/50 sm:px-6 sm:py-6" : ""}`}>
        <div className="flex items-center gap-3">
          <span className="hidden h-px flex-1 bg-brand-sand sm:block" aria-hidden />
          <h2 className="font-heading text-2xl font-semibold text-brand-blue-deep sm:text-center">
            {section.heading}
          </h2>
          <span className="hidden h-px flex-1 bg-brand-sand sm:block" aria-hidden />
        </div>
        {isPillars ? (
          <PillarCards paragraphs={section.paragraphs} />
        ) : (
          <div className="mt-4 space-y-3">
            {section.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-gray-700">
                {p}
              </p>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function VillePage() {
  const { slug } = useParams<{ slug: string }>();
  const city = getCityBySlug(slug ?? "");

  if (!city) return <Navigate to="/nos-villes" replace />;

  const gallery = city.gallery ?? [];
  const galleryMore = city.galleryMore ?? [];
  const heroSrc = gallery[0]?.src ?? city.image;
  // Évite un carrousel redondant si la seule image galerie = déjà le hero
  const galleryForCarousel = gallery.filter((img) => img.src !== heroSrc);
  const hasGallery = galleryForCarousel.length > 0;
  const ogImage = heroSrc
    ? `https://www.dor-hadash.com${heroSrc.startsWith("/") ? heroSrc : `/${heroSrc}`}`
    : undefined;

  return (
    <>
      <SeoHead image={ogImage} />

      {/* Hero immersif */}
      <section className="relative min-h-[58vh] overflow-hidden text-white sm:min-h-[62vh]">
        {heroSrc ? (
          <img
            src={heroSrc}
            alt={`${city.name} — ${city.tagline}`}
            className="city-hero-img absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-deep to-brand-blue" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/55 to-brand-blue-deep/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(41,196,169,0.18),transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-[7.5rem] pt-24 sm:min-h-[62vh] sm:px-6 sm:pb-14">
          <p
            className="city-hero-in font-accent text-[11px] uppercase tracking-[0.22em] text-brand-teal"
            style={{ animationDelay: "40ms" }}
          >
            Nos villes
          </p>
          <h1
            className="city-hero-in mt-2 font-heading text-[1.85rem] font-semibold leading-tight sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            {city.name}
          </h1>
          <p
            className="city-hero-in mt-3 max-w-xl text-sm leading-snug text-white/88 sm:text-lg sm:leading-relaxed"
            style={{ animationDelay: "220ms" }}
          >
            {city.tagline}
          </p>
          {city.isDraft && (
            <span
              className="city-hero-in mt-4 inline-flex w-fit rounded-full bg-amber-400/20 px-3.5 py-1.5 text-xs font-medium text-amber-100"
              style={{ animationDelay: "300ms" }}
            >
              Contenu en cours de finalisation
            </span>
          )}
          <div
            className="city-hero-in mt-5 flex w-full flex-col gap-2.5 sm:mt-6 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-2"
            style={{ animationDelay: "340ms" }}
          >
            <a href="#ville-contenu" className="btn-primary w-full justify-center px-5 py-3 text-sm sm:w-auto">
              Découvrir {city.name}
            </a>
            <Link
              to="/nous-contacter"
              className="btn-ghost w-full justify-center px-5 py-3 text-sm sm:w-auto"
            >
              Parler à un coordinateur
            </Link>
          </div>
        </div>
      </section>

      <section id="ville-contenu" className="scroll-mt-20 bg-brand-cream">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <Reveal>
            <p className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">À propos</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl">
              Pourquoi {city.name} ?
            </h2>
          </Reveal>

          <div className="mt-6 space-y-4">
            {city.intro.map((p, i) => (
              <Reveal key={i} delay={i * 80} variant="up">
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <Reveal>
            <p className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">Le parcours</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl">
              Tout savoir sur {city.name}
            </h2>
            <p className="mt-2 text-sm text-gray-500 sm:hidden">Appuyez sur une section pour lire le détail.</p>
          </Reveal>

          {/* Mobile — accordion */}
          <div className="mt-6 space-y-3 sm:hidden">
            {city.sections.map((section, i) => (
              <Reveal key={section.heading} delay={Math.min(i * 50, 200)} variant="up">
                <SectionAccordion section={section} index={i} defaultOpen={i === 0} />
              </Reveal>
            ))}
          </div>

          {/* Desktop — sections ouvertes */}
          <div className="mt-10 hidden space-y-10 sm:block">
            {city.sections.map((section, i) => (
              <DesktopSection key={section.heading} section={section} index={i} />
            ))}
          </div>

          {city.testimonials.length > 0 && (
            <div className="mt-14">
              <Reveal>
                <h2 className="font-heading text-2xl font-semibold text-brand-blue-deep">Ils témoignent</h2>
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6">
                {city.testimonials.map((t, i) => (
                  <Reveal key={t.name} delay={i * 90} variant="scale">
                    <blockquote className="rounded-2xl bg-brand-cream p-5 ring-1 ring-brand-sand sm:p-6">
                      <p className="text-sm italic leading-relaxed text-gray-700 sm:text-base">« {t.quote} »</p>
                      <footer className="mt-3 text-sm font-semibold text-brand-blue-deep">{t.name}</footer>
                    </blockquote>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Galeries en bas de page — après le contenu */}
      {hasGallery && (
        <Reveal variant="fade">
          <section className="bg-white px-2 pb-4 pt-2 sm:px-6 sm:pb-6">
            <div className="mx-auto max-w-5xl">
              <CityGalleryCarousel
                images={galleryForCarousel}
                title={city.slug === "jerusalem" ? "Pisgat Ze'ev" : `${city.name} en images`}
                subtitle="Glissez pour parcourir — appuyez pour agrandir."
                variant="section"
              />
            </div>
          </section>
        </Reveal>
      )}

      {!hasGallery && !city.lowResImage && city.image && (
        <Reveal variant="fade">
          <div className="relative aspect-[16/9] max-h-[380px] w-full overflow-hidden">
            <CityImage city={city} className="h-full w-full" />
            {city.photoCredit && (
              <a
                href={city.photoCredit.url}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-2 right-3 rounded bg-black/40 px-2 py-1 text-[11px] text-white/90 hover:text-white"
              >
                {city.photoCredit.text}
              </a>
            )}
          </div>
        </Reveal>
      )}

      {galleryMore.length > 0 && (
        <Reveal variant="up">
          <section className="bg-white px-2 py-8 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-5xl">
              <CityGalleryCarousel
                images={galleryMore}
                title={`${city.name} — suite`}
                subtitle="Glissez pour parcourir — appuyez pour agrandir."
                variant="section"
              />
            </div>
          </section>
        </Reveal>
      )}

      <section className="bg-brand-cream px-4 py-12 sm:px-6 sm:py-16">
        <Reveal variant="blur">
          <div className="city-cta mx-auto max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue-deep to-brand-blue px-6 py-10 text-center text-white shadow-xl shadow-brand-blue/25 sm:px-10">
            <p className="font-accent text-[11px] uppercase tracking-[0.2em] text-brand-teal">Prochaine étape</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
              Un projet d&apos;Alya à {city.name} ?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/80">
              Parlons-en avec un coordinateur — sans engagement.
            </p>
            <Link to="/nous-contacter" className="btn-primary mt-6 inline-flex w-full justify-center bg-brand-teal px-5 py-3 text-brand-blue-deep hover:bg-white sm:w-auto">
              Nous contacter
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
