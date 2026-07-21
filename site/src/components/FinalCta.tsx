import { Link } from "react-router-dom";

export default function FinalCta() {
  return (
    <section className="bg-brand-blue-deep py-16 text-center text-white sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl lg:text-4xl">Qu'attendez-vous ?</h2>
        <p className="mt-4 text-white/80">Rejoignez-nous et préparez votre Alya en toute confiance.</p>
        <Link
          to="/nous-contacter"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-base font-semibold text-brand-blue shadow-lg transition-transform hover:scale-[1.03]"
        >
          M'inscrire
        </Link>
      </div>
    </section>
  );
}
