import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import CityImage from "../components/CityImage";
import { cities } from "../content/cities";

export default function NosVilles() {
  return (
    <>
      <SeoHead />
      <PageBanner
        title="Nos villes d'accueil"
        subtitle="Six villes partenaires, six ambiances différentes : trouvez celle qui correspond à votre projet d'Alya."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              to={`/${city.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <CityImage
                  city={city}
                  variant="card"
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-heading text-xl font-semibold text-brand-blue-deep">{city.name}</h2>
                <p className="mt-2 text-sm text-gray-600">{city.tagline}</p>
                {city.isDraft && (
                  <span className="mt-3 inline-block w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                    Contenu en cours de finalisation
                  </span>
                )}
                <span className="mt-4 text-sm font-semibold text-brand-blue group-hover:text-brand-blue-dark">
                  Découvrir {city.name} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
