import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import { missionQuote, missionIntro, missionSupport, missionSynthese } from "../content/team";

export default function Mission() {
  return (
    <>
      <SeoHead />
      <PageBanner title="Notre mission" />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <blockquote className="border-l-4 border-brand-teal pl-6">
          <p className="font-heading text-2xl text-brand-blue-deep">« {missionQuote.text} »</p>
          <footer className="mt-2 text-sm text-gray-500">
            {missionQuote.author} — {missionQuote.role}
          </footer>
        </blockquote>

        <p className="mt-10 text-lg leading-relaxed text-gray-700">{missionIntro}</p>

        <h2 className="mt-12 font-heading text-2xl font-semibold text-brand-blue-deep">
          Un appui complet pour votre intégration
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {missionSupport.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 text-gray-700">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal" />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-heading text-2xl font-semibold text-brand-blue-deep">
          Un incubateur pour l'Alya francophone
        </h2>
        <p className="mt-4 leading-relaxed text-gray-700">
          Les olim sont accueillis dans un « village communautaire » (kibboutz, Mercaz Klita ou autre), où le
          contact humain, l'échange et l'apprentissage des codes sont l'essence même du programme. Ce projet est
          conçu pour rendre le olé pleinement autonome, qu'il soit jeune célibataire, en couple, en famille ou
          senior actif.
        </p>
        <p className="mt-4 leading-relaxed text-gray-700">
          Au cours des six premiers mois, les parents suivent un Oulpan intensif le matin pendant que les enfants
          sont scolarisés toute la journée. Les six mois suivants combinent Oulpan professionnel et formation en
          alternance en entreprise, rémunérée, en partenariat avec le Misrad Haklita et le Misrad Haavoda.
        </p>

        <h2 className="mt-12 font-heading text-2xl font-semibold text-brand-blue-deep">En synthèse</h2>
        <ul className="mt-6 space-y-3">
          {missionSynthese.map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-700">
              <svg className="mt-1 h-5 w-5 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
