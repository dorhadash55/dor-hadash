import { useParams, Link, Navigate } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import CityImage from "../components/CityImage";
import CityGalleryCarousel from "../components/CityGalleryCarousel";
import Reveal from "../components/Reveal";
import { getCityBySlug } from "../content/cities";

export default function VillePage() {
  const { slug } = useParams<{ slug: string }>();
  const city = getCityBySlug(slug ?? "");

  if (!city) return <Navigate to="/nos-villes" replace />;

  const gallery = city.gallery ?? [];
  const galleryMore = city.galleryMore ?? [];
  const hasGallery = gallery.length > 0;

  return (
    <>
      <SeoHead />
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-deep to-brand-blue text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <h1 className="hero-in font-heading text-4xl font-semibold sm:text-5xl" style={{ animationDelay: "60ms" }}>
            {city.name}
          </h1>
          <p className="hero-in mt-4 max-w-2xl text-lg text-white/85" style={{ animationDelay: "180ms" }}>
            {city.tagline}
          </p>
          {city.isDraft && (
            <span
              className="hero-in mt-4 inline-block rounded-full bg-amber-400/20 px-4 py-1.5 text-sm font-medium text-amber-100"
              style={{ animationDelay: "280ms" }}
            >
              Contenu en cours de finalisation avec l&apos;association
            </span>
          )}
        </div>
      </section>

      {hasGallery ? (
        <Reveal variant="fade">
          <CityGalleryCarousel
            images={gallery}
            title={city.slug === "jerusalem" ? "Pisgat Ze'ev" : city.name}
            variant="banner"
          />
        </Reveal>
      ) : (
        !city.lowResImage && (
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
        )
      )}

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16">
        {city.intro.map((p, i) => (
          <Reveal key={i} delay={i * 60} variant="up">
            <p className="mb-4 leading-relaxed text-gray-700">{p}</p>
          </Reveal>
        ))}

        <div className="mt-10 space-y-10">
          {city.sections.map((section, si) => (
            <Reveal key={section.heading} delay={Math.min(si * 80, 240)} variant="up">
              <h2 className="font-heading text-2xl font-semibold text-brand-blue-deep">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed text-gray-700">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        {city.testimonials.length > 0 && (
          <div className="mt-14">
            <Reveal>
              <h2 className="font-heading text-2xl font-semibold text-brand-blue-deep">Ils témoignent</h2>
            </Reveal>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {city.testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 90} variant="scale">
                  <blockquote className="rounded-2xl bg-gray-50 p-6">
                    <p className="italic text-gray-700">« {t.quote} »</p>
                    <footer className="mt-3 text-sm font-semibold text-brand-blue-deep">{t.name}</footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>

      {galleryMore.length > 0 && (
        <Reveal variant="up">
          <section className="mx-auto max-w-5xl px-2 sm:px-6">
            <CityGalleryCarousel
              images={galleryMore}
              title={`${city.name} en détail`}
              subtitle="Appuyez sur une slide pour l'agrandir — plus lisible sur mobile."
              variant="section"
            />
          </section>
        </Reveal>
      )}

      <section className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6">
        <Reveal variant="blur">
          <div className="rounded-2xl bg-brand-blue/5 p-8 text-center">
            <h2 className="font-heading text-xl font-semibold text-brand-blue-deep">
              Un projet d&apos;Alya à {city.name} ?
            </h2>
            <p className="mt-2 text-gray-600">Parlons-en, sans engagement.</p>
            <Link
              to="/nous-contacter"
              className="mt-5 inline-block rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark"
            >
              Nous contacter
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
