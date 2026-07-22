import { Link } from "react-router-dom";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/nof-hagalil.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-brand-blue-deep/88" />
      <div
        className="absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(41,196,169,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(43,135,218,0.4) 0%, transparent 40%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center text-white">
          <p className="font-accent text-xs uppercase tracking-[0.24em] text-brand-teal">Prochaine étape</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
            Qu'attendez-vous pour préparer votre Alya ?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
            Rejoignez Dor Hadash — inscription gratuite, accompagnement personnalisé dès le premier contact.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/nous-contacter" className="btn-primary">
              M'inscrire gratuitement →
            </Link>
            <a href="#methode" className="btn-ghost">
              Découvrir la méthode
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
