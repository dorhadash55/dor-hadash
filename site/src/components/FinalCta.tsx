import { Link } from "react-router-dom";

export default function FinalCta() {
  return (
    <section className="bg-brand-blue-deep py-20 text-center text-white">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl">Qu'attendez-vous ?</h2>
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
