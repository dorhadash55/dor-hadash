import { useParams, Link, Navigate } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import CityImage from "../components/CityImage";
import { getCityBySlug } from "../content/cities";

export default function VillePage() {
  const { slug } = useParams<{ slug: string }>();
  const city = getCityBySlug(slug ?? "");

  if (!city) return <Navigate to="/nos-villes" replace />;

  return (
    <>
      <SeoHead />
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-deep to-brand-blue text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <h1 className="font-heading text-4xl font-semibold sm:text-5xl">{city.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{city.tagline}</p>
          {city.isDraft && (
            <span className="mt-4 inline-block rounded-full bg-amber-400/20 px-4 py-1.5 text-sm font-medium text-amber-100">
              Contenu en cours de finalisation avec l'association
            </span>
          )}
        </div>
      </section>

      {!city.lowResImage && (
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
      )}

      <section className="mx-auto max-w-4xl px-6 py-16">
        {city.intro.map((p, i) => (
          <p key={i} className="mb-4 leading-relaxed text-gray-700">
            {p}
          </p>
        ))}

        <div className="mt-8 space-y-10">
          {city.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-heading text-2xl font-semibold text-brand-blue-deep">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed text-gray-700">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {city.testimonials.length > 0 && (
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-semibold text-brand-blue-deep">Ils témoignent</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {city.testimonials.map((t) => (
                <blockquote key={t.name} className="rounded-2xl bg-gray-50 p-6">
                  <p className="italic text-gray-700">« {t.quote} »</p>
                  <footer className="mt-3 text-sm font-semibold text-brand-blue-deep">{t.name}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 rounded-2xl bg-brand-blue/5 p-8 text-center">
          <h2 className="font-heading text-xl font-semibold text-brand-blue-deep">
            Un projet d'Alya à {city.name} ?
          </h2>
          <p className="mt-2 text-gray-600">Parlons-en, sans engagement.</p>
          <Link
            to="/nous-contacter"
            className="mt-5 inline-block rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
