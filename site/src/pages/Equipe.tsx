import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import { team } from "../content/team";

export default function Equipe() {
  return (
    <>
      <SeoHead />
      <PageBanner
        title="L'équipe Dor Hadash"
        subtitle="Toute notre équipe est présente à vos côtés afin de vous accompagner tout au long de votre première année d'Alya."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
              <img
                src={member.photo}
                alt={member.name}
                className="h-28 w-28 rounded-full object-cover shadow-md"
              />
              <h3 className="mt-5 font-heading text-lg font-semibold text-brand-blue-deep">{member.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
