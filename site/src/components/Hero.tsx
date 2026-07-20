import { Link } from "react-router-dom";
import { hero } from "../content/homepage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      {/* Photo de fond */}
      <img
        src="/images/jerusalem.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-deep/95 via-brand-blue-deep/75 via-40% to-brand-blue-light/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/70 via-transparent to-transparent" />

      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-teal/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium tracking-wide backdrop-blur">
            {hero.eyebrow}
          </span>
          <h1 className="mt-6 font-heading text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">{hero.subtitle}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to={hero.ctaPrimary.href}
              className="rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-blue shadow-lg shadow-black/10 transition-transform hover:scale-[1.03]"
            >
              {hero.ctaPrimary.label}
            </Link>
            <a
              href={hero.ctaSecondary.href}
              className="rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>
      </div>

      {/* Wave divider */}
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
