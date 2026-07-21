import { Link } from "react-router-dom";
import { hero as defaultHero } from "../content/homepage";
import { useHeroContent } from "../content/useSiteContent";

export default function Hero() {
  const hero = useHeroContent();

  return (
    <section className="relative overflow-hidden text-white">
      {/* Mobile : photo entière en haut, sans recadrage agressif */}
      <div className="relative lg:hidden">
        <img
          src="/images/jerusalem.jpg"
          alt=""
          aria-hidden="true"
          className="block w-full h-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/25 to-transparent" />
      </div>

      {/* Desktop : fond plein écran */}
      <img
        src="/images/jerusalem.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover object-center lg:block"
      />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-brand-blue-deep/95 via-brand-blue-deep/75 via-40% to-brand-blue-light/20 lg:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-brand-blue-deep/70 via-transparent to-transparent lg:block" />

      <div className="pointer-events-none absolute -right-24 -top-24 hidden h-96 w-96 rounded-full bg-brand-teal/20 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -left-32 bottom-0 hidden h-80 w-80 rounded-full bg-white/10 blur-3xl lg:block" />

      <div className="relative bg-brand-blue-deep px-4 py-12 sm:px-6 sm:py-16 lg:bg-transparent lg:py-28 xl:py-32">
        <div className="mx-auto max-w-7xl lg:px-0">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium tracking-wide backdrop-blur">
              {hero.eyebrow || defaultHero.eyebrow}
            </span>
            <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:mt-6 sm:text-4xl lg:text-5xl xl:text-6xl">
              {hero.title || defaultHero.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:mt-6 sm:text-lg lg:text-xl">
              {hero.subtitle || defaultHero.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                to={defaultHero.ctaPrimary.href}
                className="rounded-full bg-white px-7 py-3.5 text-center text-base font-semibold text-brand-blue shadow-lg shadow-black/10 transition-transform hover:scale-[1.03]"
              >
                {defaultHero.ctaPrimary.label}
              </Link>
              <a
                href={defaultHero.ctaSecondary.href}
                className="rounded-full border border-white/40 px-7 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                {defaultHero.ctaSecondary.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      <svg
        className="relative block w-full text-white"
        viewBox="0 0 1440 60"
        fill="currentColor"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 30 C 360 60 1080 0 1440 30 L1440 60 L0 60 Z" />
      </svg>
    </section>
  );
}
