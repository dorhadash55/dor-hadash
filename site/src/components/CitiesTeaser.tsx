import { Link } from "react-router-dom";
import { cities } from "../content/cities";
import CityImage from "./CityImage";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function CitiesTeaser() {
  return (
    <section className="section-shell bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal variant="blur">
          <SectionHeading
            label="Où s'installer"
            title="Le parcours d'Alya, ville par ville"
            description="Sept destinations adaptées aux olim francophones."
            action={
              <Link to="/nos-villes" className="btn-outline">
                Toutes les villes →
              </Link>
            }
          />
        </Reveal>

        <div className="mt-8 -mx-4 flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-3 scrollbar-hide sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {cities.map((city, i) => (
            <Reveal
              key={city.slug}
              delay={i * 70}
              variant="scale"
              className="w-[74vw] max-w-[18.5rem] shrink-0 snap-center sm:w-auto sm:max-w-none sm:snap-align-none"
            >
              <Link
                to={`/${city.slug}`}
                className={`group relative block h-full overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl active:scale-[0.99] sm:rounded-3xl ${
                  i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className={`w-full overflow-hidden ${i === 0 ? "aspect-[4/5] sm:aspect-[2/1]" : "aspect-[4/5] sm:aspect-[4/3]"}`}>
                  <CityImage
                    city={city}
                    variant="card"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <p className="font-accent text-[10px] uppercase tracking-[0.16em] text-brand-teal sm:hidden">
                    {String(i + 1).padStart(2, "0")} / {String(cities.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-semibold text-white sm:mt-0 sm:text-2xl">{city.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/90 sm:mt-1.5 sm:text-sm">{city.tagline}</p>
                  {city.isDraft && (
                    <span className="mt-2 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs text-white backdrop-blur">
                      Programme en cours de déploiement
                    </span>
                  )}
                  <span className="mt-2 inline-flex text-sm font-semibold text-white/95 sm:mt-3">
                    Découvrir →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
