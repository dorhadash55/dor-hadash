import { useState, type FormEvent } from "react";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import { siteInfo } from "../content/site";
import { cities } from "../content/cities";

const horizons = [
  "Moins de 6 mois",
  "6 à 12 mois",
  "Plus d'un an",
  "Pas encore décidé",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: brancher sur Firestore (collection contact_submissions) une fois Firebase configuré.
    setSubmitted(true);
  };

  return (
    <>
      <SeoHead />
      <PageBanner
        title="Nous contacter"
        subtitle="Une question sur votre Alya ? Contactez-nous par téléphone, email ou via le formulaire ci-dessous."
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-semibold text-brand-blue-deep">Appelez-nous</h2>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>Israël : {siteInfo.phones.israel.join(" ou ")}</li>
              <li>France : {siteInfo.phones.france.join(" ou ")}</li>
              <li>
                Email :{" "}
                <a href={`mailto:${siteInfo.email}`} className="text-brand-blue hover:underline">
                  {siteInfo.email}
                </a>
              </li>
            </ul>

            <h2 className="mt-10 font-heading text-xl font-semibold text-brand-blue-deep">
              L'équipe est là pour vous
            </h2>
            <p className="mt-3 text-gray-700">
              Notre programme, votre inscription, une envie de devenir donateur, ou tout autre sujet lié à Dor
              Hadash : nous sommes là pour vous !
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-deep">
                  Merci, votre message a bien été envoyé !
                </h3>
                <p className="mt-2 text-sm text-gray-600">Nous revenons vers vous très rapidement.</p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="prenom" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Prénom
                    </label>
                    <input
                      id="prenom"
                      name="prenom"
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="nom" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>

                <div>
                  <label htmlFor="telephone" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ville" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Ville envisagée
                    </label>
                    <select
                      id="ville"
                      name="ville"
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    >
                      <option value="" disabled>
                        Sélectionner…
                      </option>
                      {cities.map((c) => (
                        <option key={c.slug} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="horizon" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Horizon de départ
                    </label>
                    <select
                      id="horizon"
                      name="horizon"
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    >
                      <option value="" disabled>
                        Sélectionner…
                      </option>
                      {horizons.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-blue py-3 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
                >
                  Envoyer
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
