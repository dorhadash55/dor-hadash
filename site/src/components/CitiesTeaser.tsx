import { Link } from "react-router-dom";
import { cities } from "../content/cities";
import CityImage from "./CityImage";

export default function CitiesTeaser() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-teal">
              Où s'installer
            </span>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl lg:text-4xl">
              Le parcours d'Alya, ville par ville
            </h2>
          </div>
          <Link
            to="/nos-villes"
            className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
          >
            Voir toutes les villes →
          </Link>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              to={`/${city.slug}`}
              className="group relative w-[82%] max-w-xs shrink-0 snap-start overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-xl sm:w-auto sm:max-w-none sm:shrink"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <CityImage
                  city={city}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-heading text-xl font-semibold text-white">{city.name}</h3>
                <p className="mt-1 text-sm text-white/85 line-clamp-2">{city.tagline}</p>
                {city.isDraft && (
                  <span className="mt-2 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs text-white backdrop-blur">
                    Programme en cours de déploiement
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
