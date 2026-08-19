import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import CityImage from "../components/CityImage";
import Reveal from "../components/Reveal";
import { cities } from "../content/cities";
import { cityDecisions } from "../content/cityDecision";
import { readOptionalCookie, writeOptionalCookie } from "../lib/cookieConsent";

const criteria = [
  { id: "famille", label: "Famille avec enfants" },
  { id: "celibataire", label: "Célibataire / couple" },
  { id: "senior", label: "Senior actif" },
  { id: "pratiquant", label: "Cadre religieux / traditionaliste" },
  { id: "budget", label: "Budget maîtrisé" },
  { id: "emploi", label: "Priorité emploi / bassins d’activité" },
  { id: "sans-voiture", label: "Se déplacer sans voiture" },
  { id: "mer", label: "Proximité mer" },
  { id: "galilee", label: "Galilée / cadre nature" },
] as const;

type CriterionId = (typeof criteria)[number]["id"];

export default function NosVilles() {
  const heroCity = cities.find((c) => c.slug === "karmiel") ?? cities[0];
  const heroSrc = heroCity?.image ?? heroCity?.gallery?.[0]?.src;
  const [selected, setSelected] = useState<CriterionId[]>([]);
  const lastCitySlug = readOptionalCookie("dh_last_city");
  const lastCity = cities.find((c) => c.slug === lastCitySlug);

  useEffect(() => {
    const saved = readOptionalCookie("dh_city_filters");
    if (!saved) return;
    const ids = saved.split(",").filter((id): id is CriterionId => criteria.some((c) => c.id === id));
    if (ids.length) setSelected(ids);
  }, []);

  useEffect(() => {
    if (selected.length === 0) return;
    writeOptionalCookie("dh_city_filters", selected.join(","));
  }, [selected]);

  const suggestions = useMemo(() => {
    if (selected.length === 0) return [];
    return cityDecisions
      .map((city) => ({
        slug: city.slug,
        score: selected.filter((t) => city.tags.includes(t)).length,
      }))
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [selected]);

  const toggle = (id: CriterionId) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <>
      <SeoHead />

      <section className="relative min-h-[52vh] overflow-hidden text-white sm:min-h-[56vh]">
        {heroSrc ? (
          <img src={heroSrc} alt="" className="city-hero-img absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-deep to-brand-blue" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/60 to-brand-blue-deep/30" />

        <div className="relative mx-auto flex min-h-[52vh] max-w-7xl flex-col justify-end px-4 pb-[7.5rem] pt-24 sm:min-h-[56vh] sm:px-6 sm:pb-14">
          <p
            className="city-hero-in font-accent text-[11px] uppercase tracking-[0.22em] text-brand-teal"
            style={{ animationDelay: "40ms" }}
          >
            Destinations
          </p>
          <h1
            className="city-hero-in mt-2 font-heading text-[1.85rem] font-semibold leading-tight sm:text-5xl"
            style={{ animationDelay: "120ms" }}
          >
            Nos villes d&apos;accueil
          </h1>
          <p
            className="city-hero-in mt-3 max-w-xl text-sm leading-snug text-white/88 sm:text-lg sm:leading-relaxed"
            style={{ animationDelay: "220ms" }}
          >
            Sept villes partenaires — comparez, choisissez, validez avec un coordinateur.
          </p>
          <div
            className="city-hero-in mt-5 flex w-full flex-col gap-2.5 sm:mt-6 sm:w-auto sm:flex-row"
            style={{ animationDelay: "320ms" }}
          >
            <a href="#comparateur" className="btn-primary w-full justify-center px-5 py-3 text-sm sm:w-fit">
              Quelle ville me correspond ?
            </a>
            <a href="#liste-villes" className="btn-ghost w-full justify-center px-5 py-3 text-sm sm:w-fit">
              Voir les villes
            </a>
          </div>
        </div>
      </section>

      <section id="comparateur" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          {lastCity && (
            <p className="mb-8 rounded-2xl bg-brand-cream px-4 py-3 text-sm text-gray-700">
              Vous consultiez{" "}
              <Link to={`/${lastCity.slug}`} className="font-semibold text-brand-blue hover:underline">
                {lastCity.name}
              </Link>
              .
            </p>
          )}

          <Reveal>
            <p className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">Comparateur</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl">
              Quelle ville correspond à votre projet ?
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Cochez quelques critères. Les suggestions sont indicatives — un coordinateur affine selon votre
              situation réelle.
            </p>
          </Reveal>

          <div className="mt-6 flex flex-wrap gap-2">
            {criteria.map((c) => {
              const on = selected.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggle(c.id)}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    on
                      ? "bg-brand-blue text-white"
                      : "bg-brand-cream text-brand-blue-deep ring-1 ring-brand-sand hover:bg-white"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {suggestions.length > 0 && (
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {suggestions.map((s) => {
                const city = cities.find((c) => c.slug === s.slug);
                if (!city) return null;
                return (
                  <Link
                    key={s.slug}
                    to={`/${s.slug}`}
                    className="rounded-2xl border border-brand-sand bg-brand-cream/40 px-5 py-4 transition-shadow hover:shadow-md"
                  >
                    <p className="font-heading text-lg font-semibold text-brand-blue-deep">{city.name}</p>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{city.tagline}</p>
                    <p className="mt-2 text-xs font-medium text-brand-teal">
                      {s.score} critère{s.score > 1 ? "s" : ""} en commun →
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section id="liste-villes" className="scroll-mt-20 bg-brand-cream">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <Reveal>
            <p className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">Choisir sa ville</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl">
              Où vous projetez-vous ?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-gray-600 sm:hidden">
              Glissez horizontalement, puis ouvrez la ville qui vous parle.
            </p>
          </Reveal>

          <div className="mt-6 -mx-4 flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-3 scrollbar-hide sm:hidden">
            {cities.map((city, i) => (
              <Reveal
                key={city.slug}
                delay={i * 60}
                variant="scale"
                className="w-[78vw] max-w-[20rem] shrink-0 snap-center"
              >
                <Link
                  to={`/${city.slug}`}
                  className="group relative block overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <CityImage
                      city={city}
                      variant="card"
                      className="h-full w-full object-cover transition-transform duration-700 group-active:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-brand-teal">
                      {String(i + 1).padStart(2, "0")} / {String(cities.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-heading text-xl font-semibold text-white">{city.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/85">{city.tagline}</p>
                    {city.isDraft && (
                      <span className="mt-2 inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] text-white backdrop-blur">
                        Programme en déploiement
                      </span>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white">
                      Découvrir <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city, i) => (
              <Reveal key={city.slug} delay={i * 70} variant="up">
                <Link
                  to={`/${city.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl shadow-md ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-[5/4] overflow-hidden">
                    <CityImage
                      city={city}
                      variant="card"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/90 via-brand-blue-deep/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h2 className="font-heading text-2xl font-semibold text-white">{city.name}</h2>
                    <p className="mt-1.5 line-clamp-2 text-sm text-white/90">{city.tagline}</p>
                    {city.isDraft && (
                      <span className="mt-2 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs text-white backdrop-blur">
                        Contenu en cours de finalisation
                      </span>
                    )}
                    <span className="mt-3 inline-flex text-sm font-semibold text-brand-teal transition-all group-hover:gap-1.5">
                      Découvrir {city.name} →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <Reveal variant="blur">
          <div className="city-cta mx-auto max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue-deep to-brand-blue px-6 py-10 text-center text-white shadow-xl shadow-brand-blue/25 sm:px-10">
            <p className="font-accent text-[11px] uppercase tracking-[0.2em] text-brand-teal">Pas encore choisi ?</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
              On vous aide à trouver la bonne ville
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/80">
              Un coordinateur Dor Hadash vous oriente selon votre famille, votre budget et votre projet.
            </p>
            <Link
              to="/nous-contacter?objet=ville"
              className="btn-primary mt-6 inline-flex bg-brand-teal text-brand-blue-deep hover:bg-white"
            >
              Demander un premier entretien
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
