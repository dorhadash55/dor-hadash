import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import { team } from "../content/team";

export default function Equipe() {
  return (
    <>
      <SeoHead />
      <PageBanner
        title="L'équipe Dor Hadash"
        subtitle="Toute l'équipe est à vos côtés : 6 mois avant l'Alya, puis 12 mois après votre arrivée."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 80} variant="up">
              <div className="flex h-full flex-col items-center rounded-2xl border border-gray-100 p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-28 w-28 rounded-full object-cover shadow-md"
                />
                <h3 className="mt-5 font-heading text-lg font-semibold text-brand-blue-deep">{member.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/nous-contacter?objet=entretien"
            className="inline-flex rounded-full bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-brand-blue-dark"
          >
            Échanger avec l&apos;équipe →
          </Link>
        </div>
      </section>
    </>
  );
}
