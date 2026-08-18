import { useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import { addContactSubmission } from "../admin/storage/contentStore";
import { useSiteInfo } from "../content/useSiteContent";
import { cities } from "../content/cities";
import { sendContactEmails } from "../lib/sendContactEmails";

const horizons = [
  "Moins de 6 mois",
  "6 à 12 mois",
  "Plus d'un an",
  "Pas encore décidé",
];

const situations = ["Seul(e)", "Couple", "Famille", "Senior"];
const etapes = [
  "Réflexion",
  "Dossier ouvert",
  "Date d'Alya fixée",
  "Déjà en Israël",
];
const contactPrefs = ["Téléphone", "WhatsApp", "Email"];

const fieldClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base text-gray-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 disabled:opacity-60 sm:text-sm";

const labelClass = "mb-1.5 block text-sm font-medium leading-snug text-gray-700";

const objetCopy: Record<string, { title: string; subtitle: string; note: string; etapeDefault?: string }> = {
  entretien: {
    title: "Demander un premier entretien",
    subtitle:
      "Un échange avec un coordinateur pour clarifier votre Alya — sans engagement. Remplissez le formulaire, nous vous recontactons.",
    note: "Objet : premier entretien",
  },
  arrive: {
    title: "Je viens d'arriver en Israël",
    subtitle:
      "Besoin d'un référent local ou d'aide sur les démarches urgentes ? Décrivez votre situation, nous vous orientons rapidement.",
    note: "Objet : arrivée récente en Israël",
    etapeDefault: "Déjà en Israël",
  },
  ville: {
    title: "Choisir sa ville",
    subtitle: "Dites-nous votre profil et vos critères — un coordinateur vous aide à affiner le choix.",
    note: "Objet : orientation ville",
  },
};

export default function Contact() {
  const siteInfo = useSiteInfo();
  const [searchParams] = useSearchParams();
  const objet = searchParams.get("objet") ?? "";
  const copy = objetCopy[objet];

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bannerTitle = copy?.title ?? "Nous contacter";
  const bannerSubtitle =
    copy?.subtitle ??
    "Une question sur votre Alya ? Contactez-nous par téléphone, email ou via le formulaire ci-dessous.";

  const etapeDefault = useMemo(() => copy?.etapeDefault ?? "", [copy?.etapeDefault]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSending(true);

    const form = new FormData(e.currentTarget);
    const prenom = String(form.get("prenom") ?? "");
    const nom = String(form.get("nom") ?? "");
    const email = String(form.get("email") ?? "");
    const telephone = String(form.get("telephone") ?? "");
    const ville = String(form.get("ville") ?? "");
    const horizon = String(form.get("horizon") ?? "");
    const situation = String(form.get("situation") ?? "");
    const enfants = String(form.get("enfants") ?? "");
    const profession = String(form.get("profession") ?? "");
    const etape = String(form.get("etape") ?? "");
    const contactPref = String(form.get("contactPref") ?? "");
    const userMessage = String(form.get("message") ?? "").trim();

    const extras = [
      copy?.note,
      situation && `Situation : ${situation}`,
      enfants && `Enfants : ${enfants}`,
      profession && `Situation professionnelle : ${profession}`,
      etape && `Étape du projet : ${etape}`,
      contactPref && `Contact préféré : ${contactPref}`,
    ]
      .filter(Boolean)
      .join("\n");

    const message = [extras, userMessage].filter(Boolean).join("\n\n");

    const payload = {
      prenom,
      nom,
      email,
      telephone,
      ville,
      horizon,
      message,
    };

    try {
      await sendContactEmails(payload);
      await addContactSubmission(payload);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Réessayez ou contactez-nous par téléphone.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SeoHead />
      <PageBanner title={bannerTitle} subtitle={bannerSubtitle} />

      <section className="bg-brand-cream/40">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Infos */}
            <Reveal variant="left">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="font-heading text-xl font-semibold leading-tight text-brand-blue-deep sm:text-2xl">
                    Appelez-nous
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                    <li className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                      <span className="shrink-0 font-medium text-brand-blue-deep">Israël</span>
                      <span>{siteInfo.phones.israel.join(" · ")}</span>
                    </li>
                    <li className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                      <span className="shrink-0 font-medium text-brand-blue-deep">France</span>
                      <span>{siteInfo.phones.france.join(" · ")}</span>
                    </li>
                    <li className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                      <span className="shrink-0 font-medium text-brand-blue-deep">Email</span>
                      <a
                        href={`mailto:${siteInfo.email}`}
                        className="break-all text-brand-blue hover:underline"
                      >
                        {siteInfo.email}
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold leading-tight text-brand-blue-deep sm:text-2xl">
                    L&apos;équipe est là pour vous
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                    Notre programme, un premier échange, une envie de devenir donateur, ou tout autre sujet lié à
                    Dor Hadash : nous sommes là pour vous.
                  </p>
                </div>

                <aside className="flex gap-3 rounded-2xl border border-brand-blue/10 bg-white px-4 py-3.5 shadow-sm sm:px-5 sm:py-4">
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal"
                    aria-hidden
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </span>
                  <p className="min-w-0 text-sm leading-snug text-gray-700 sm:leading-relaxed">
                    Nous vous répondons généralement sous{" "}
                    <span className="font-semibold text-brand-blue-deep">48 heures ouvrées</span>.
                  </p>
                </aside>

                <p className="text-sm leading-relaxed text-gray-600">
                  Pas encore prêt pour un entretien ?{" "}
                  <Link to="/preparer-mon-alya" className="font-semibold text-brand-blue hover:underline">
                    Faire le point sur mon projet →
                  </Link>
                </p>
              </div>
            </Reveal>

            {/* Formulaire */}
            <Reveal variant="right" delay={100}>
              <div className="rounded-2xl border border-brand-sand bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                {submitted ? (
                  <div className="py-8 text-center sm:py-10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-deep">
                      Merci, votre message a bien été envoyé !
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
                      Un email de confirmation vient de vous être envoyé. Nous revenons vers vous sous 48 h
                      ouvrées en général.
                    </p>
                    <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-left text-sm leading-relaxed text-amber-900/90">
                      Pensez à vérifier vos <strong>spams / courriers indésirables</strong> si vous ne voyez pas
                      le message dans votre boîte de réception.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                      <div className="min-w-0">
                        <label htmlFor="prenom" className={labelClass}>
                          Prénom
                        </label>
                        <input id="prenom" name="prenom" type="text" required disabled={sending} className={fieldClass} />
                      </div>
                      <div className="min-w-0">
                        <label htmlFor="nom" className={labelClass}>
                          Nom
                        </label>
                        <input id="nom" name="nom" type="text" required disabled={sending} className={fieldClass} />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="email" className={labelClass}>
                        Email
                      </label>
                      <input id="email" name="email" type="email" required disabled={sending} className={fieldClass} />
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="telephone" className={labelClass}>
                        Téléphone
                      </label>
                      <input id="telephone" name="telephone" type="tel" required disabled={sending} className={fieldClass} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                      <div className="min-w-0">
                        <label htmlFor="situation" className={labelClass}>
                          Situation
                        </label>
                        <select
                          id="situation"
                          name="situation"
                          required
                          defaultValue=""
                          disabled={sending}
                          className={fieldClass}
                        >
                          <option value="" disabled>
                            Sélectionner…
                          </option>
                          {situations.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="min-w-0">
                        <label htmlFor="enfants" className={labelClass}>
                          Enfants (nombre &amp; âge)
                        </label>
                        <input
                          id="enfants"
                          name="enfants"
                          type="text"
                          placeholder="Ex. 2 — 6 et 10 ans"
                          disabled={sending}
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="profession" className={labelClass}>
                        Situation professionnelle
                      </label>
                      <input
                        id="profession"
                        name="profession"
                        type="text"
                        placeholder="Métier, recherche d'emploi, retraité…"
                        disabled={sending}
                        className={fieldClass}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                      <div className="min-w-0">
                        <label htmlFor="ville" className={labelClass}>
                          Ville envisagée
                        </label>
                        <select
                          id="ville"
                          name="ville"
                          required
                          defaultValue=""
                          disabled={sending}
                          className={fieldClass}
                        >
                          <option value="" disabled>
                            Sélectionner…
                          </option>
                          {cities.map((c) => (
                            <option key={c.slug} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                          <option value="autre">Autre / pas encore choisi</option>
                        </select>
                      </div>
                      <div className="min-w-0">
                        <label htmlFor="horizon" className={labelClass}>
                          Horizon de départ
                        </label>
                        <select
                          id="horizon"
                          name="horizon"
                          required
                          defaultValue=""
                          disabled={sending}
                          className={fieldClass}
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

                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                      <div className="min-w-0">
                        <label htmlFor="etape" className={labelClass}>
                          Étape du projet
                        </label>
                        <select
                          id="etape"
                          name="etape"
                          required
                          defaultValue={etapeDefault}
                          disabled={sending}
                          className={fieldClass}
                        >
                          <option value="" disabled>
                            Sélectionner…
                          </option>
                          {etapes.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="min-w-0">
                        <label htmlFor="contactPref" className={labelClass}>
                          Contact préféré
                        </label>
                        <select
                          id="contactPref"
                          name="contactPref"
                          required
                          defaultValue=""
                          disabled={sending}
                          className={fieldClass}
                        >
                          <option value="" disabled>
                            Sélectionner…
                          </option>
                          {contactPrefs.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="message" className={labelClass}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        disabled={sending}
                        className={`${fieldClass} resize-y min-h-[6.5rem]`}
                        placeholder={
                          objet === "entretien"
                            ? "Quelques mots sur votre projet et vos disponibilités…"
                            : undefined
                        }
                      />
                    </div>

                    <p className="text-xs leading-relaxed text-gray-500">
                      Vos données sont utilisées uniquement pour vous recontacter au sujet de votre demande.
                      Elles ne sont pas revendues. Vous pouvez demander leur suppression en nous écrivant.
                    </p>

                    {error && (
                      <p className="rounded-xl bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700" role="alert">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="flex w-full items-center justify-center rounded-full bg-brand-blue px-5 py-3.5 text-sm font-semibold leading-none text-white transition-colors hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
                    >
                      {sending ? "Envoi en cours…" : "Demander mon premier échange"}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
