import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { hero as defaultHero } from "../content/homepage";
import { useHeroContent } from "../content/useSiteContent";

export default function Hero() {
  const hero = useHeroContent();

  return (
    <section className="relative overflow-hidden bg-brand-blue-deep text-white">
      <Head>
        <link rel="preload" as="image" href="/images/jerusalem.jpg" fetchPriority="high" />
      </Head>
      {/* Image */}
      <div className="relative lg:absolute lg:inset-0">
        <img
          src="/images/jerusalem.jpg"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          sizes="100vw"
          className="block h-auto max-h-[52vh] w-full object-cover object-center lg:h-full lg:max-h-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/55 to-brand-blue-deep/15 lg:bg-gradient-to-r lg:from-brand-blue-deep/95 lg:via-brand-blue-deep/72 lg:via-45% lg:to-brand-blue-light/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/90 via-transparent to-transparent lg:from-brand-blue-deep/50" />
      </div>

      {/* Motif discret — pas du generic AI blob */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-0 max-w-7xl flex-col justify-end px-4 pb-10 pt-6 sm:px-6 sm:pb-14 lg:min-h-[88vh] lg:justify-center lg:py-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <p className="font-accent text-xs uppercase tracking-[0.28em] text-brand-teal sm:text-sm">
              {hero.eyebrow || defaultHero.eyebrow}
            </p>
            <h1 className="mt-3 font-heading text-[2rem] font-semibold leading-[1.08] text-balance sm:text-4xl lg:text-5xl xl:text-[3.35rem]">
              {hero.title || defaultHero.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/88 sm:mt-5 sm:text-lg lg:text-xl">
              {hero.subtitle || defaultHero.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to={defaultHero.ctaPrimary.href} className="btn-primary group">
                {defaultHero.ctaPrimary.label}
                <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                  →
                </span>
              </Link>
              <a href={defaultHero.ctaSecondary.href} className="btn-ghost">
                {defaultHero.ctaSecondary.label}
              </a>
            </div>
          </div>

          {/* Panneau latéral desktop — ancrage visuel */}
          <div className="hidden lg:block">
            <div className="ml-auto max-w-sm rounded-2xl border border-white/15 bg-white/8 p-6 backdrop-blur-md">
              <p className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal">Pour qui ?</p>
              <ul className="mt-4 space-y-3 text-sm text-white/90">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" aria-hidden="true" />
                  Familles, couples et célibataires en projet d'Alya
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" aria-hidden="true" />
                  Accompagnement francophone de la préparation à l'intégration
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" aria-hidden="true" />
                  Logement, emploi, éducation et communauté
                </li>
              </ul>
              <div className="mt-6 border-t border-white/15 pt-5">
                <p className="font-heading text-2xl font-semibold text-white">Gratuit</p>
                <p className="mt-1 text-xs text-white/65">Programme d'accompagnement sans frais pour les olim</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-wave text-[#f7f5f0]" aria-hidden="true" />
    </section>
  );
}
