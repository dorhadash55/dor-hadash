import { Link } from "react-router-dom";
import Reveal from "./Reveal";

export default function FinalCta() {
  return (
    <section className="relative overflow-x-clip">
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

      <div className="relative mx-auto max-w-7xl px-4 py-8 pb-[5.5rem] sm:px-6 sm:py-16 sm:pb-16">
        <Reveal variant="blur" className="mx-auto max-w-2xl text-center text-white">
          <p className="font-accent text-xs uppercase tracking-[0.24em] text-brand-teal">Prochaine étape</p>
          <h2 className="mt-2 font-heading text-xl font-semibold text-balance sm:mt-3 sm:text-4xl lg:text-5xl">
            Prêt à préparer votre Alya ?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/85 sm:mt-4 sm:text-lg">
            Un premier échange pour clarifier votre projet — sans engagement.
          </p>
          <div className="mt-4 flex w-full flex-col items-stretch justify-center gap-2 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
            <Link to="/nous-contacter?objet=entretien" className="btn-primary w-full justify-center sm:w-auto">
              Demander un premier entretien →
            </Link>
            <Link
              to="/preparer-mon-alya"
              className="btn-ghost w-full justify-center px-5 py-2.5 text-sm sm:w-auto sm:py-3 sm:text-base"
            >
              Faire le point sur mon projet
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
