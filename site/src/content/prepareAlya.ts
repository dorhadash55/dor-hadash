export const checklistPdf = {
  href: "/docs/checklist-dor-hadash.pdf",
  filename: "Checklist-Dor-Hadash.pdf",
  label: "Télécharger la checklist olim (PDF)",
};

export const prepareAlya = {
  intro:
    "Un espace pratique pour anticiper les étapes-clés de votre Alya — de la réflexion en France aux premiers jours en Israël.",
  chronology: [
    {
      title: "12 à 6 mois avant",
      items: [
        "Clarifier le projet familial et la ville d’accueil",
        "Ouvrir / avancer le dossier d’Alya auprès des organismes officiels",
        "Estimer le budget (logement, scolarité, transports, réserve)",
        "Commencer l’hébreu (oulpan à distance si possible)",
      ],
    },
    {
      title: "6 mois avant",
      items: [
        "Atelier budget et préparation professionnelle",
        "Anticiper la scolarité des enfants",
        "Lister documents, diplômes et reconnaissance éventuelle",
        "Premier échange avec un coordinateur Dor Hadash",
      ],
    },
    {
      title: "Arrivée et 6 premiers mois",
      items: [
        "Accueil, démarches urgentes et référent local",
        "Oulpan, scolarité, aide à la recherche de logement",
        "Orientation emploi selon le profil et les dispositifs",
        "Ancrage communautaire — ne pas rester seul",
      ],
    },
  ],
  checklistIntro:
    "La checklist officielle Dor Hadash pour les olim : documents, démarches et points à anticiper avant le départ. Document à télécharger et à parcourir à votre rythme.",
  topics: [
    {
      title: "Budget familial prévisionnel",
      body: "Anticipez loyer, oulpan, scolarité, transports et une réserve pour les imprévus. Un atelier budget fait partie du parcours Dor Hadash — les montants dépendent de la ville et de votre situation. Consultez aussi les fourchettes indicatives de loyers sur la page Nos villes.",
    },
    {
      title: "Reconnaissance des diplômes",
      body: "Certaines professions exigent une reconnaissance ou une équivalence. Préparez vos diplômes traduits et renseignez-vous tôt auprès des organismes compétents — votre coordinateur peut vous orienter.",
    },
    {
      title: "Scolarisation des enfants",
      body: "Le système israélien diffère du français. Anticiper le type d’établissement (municipal, religieux, etc.) et le rythme d’intégration évite beaucoup de stress à l’arrivée.",
    },
    {
      title: "Les premiers jours en Israël",
      body: "Priorités : formalités olim, téléphone, banque, santé, école et premier logement. Un référent Dor Hadash vous aide à ne pas tout faire seul.",
    },
    {
      title: "Erreurs fréquentes à éviter",
      body: "Partir sans budget réaliste, choisir une ville uniquement sur une photo, sous-estimer l’hébreu, attendre d’être sur place pour tout organiser.",
    },
  ],
  officialLinks: [
    { label: "Misrad HaKlita (Absorption)", href: "https://www.gov.il/fr/departments/ministry_of_aliyah_and_integration" },
    { label: "Agence Juive", href: "https://www.jewishagency.org/fr/" },
    { label: "Nefesh B’Nefesh (infos Alya)", href: "https://www.nbn.org.il/fr/" },
    {
      label: "OlimAid — outil pratique pour préparer son Alya (partenaire)",
      href: "https://www.olimaid.com/fr",
    },
    {
      label: "Checklist olim Dor Hadash (PDF)",
      href: "/docs/checklist-dor-hadash.pdf",
      download: "Checklist-Dor-Hadash.pdf",
    },
  ] satisfies Array<{ label: string; href: string; download?: string }>,
  faq: [
    {
      q: "Dor Hadash remplace-t-il les organismes officiels ?",
      a: "Non. Nous accompagnons et orientons. Les droits olim, l’Alya et certains dispositifs restent du ressort des autorités et partenaires institutionnels.",
    },
    {
      q: "Tout est-il gratuit ?",
      a: "L’échange initial et l’accompagnement Dor Hadash sont pensés pour vous aider concrètement. Certaines prestations (logement, formations, dispositifs partenaires) dépendent de l’éligibilité, de la ville et des financements disponibles — nous le précisons dès le premier échange.",
    },
    {
      q: "Puis-je vous contacter si je suis déjà en Israël ?",
      a: "Oui. Une des portes d’entrée du site est dédiée aux personnes qui viennent d’arriver et ont besoin d’un référent local.",
    },
    {
      q: "Comment choisir ma ville ?",
      a: "Utilisez les pages villes (grille de décision) et le comparateur sur « Nos villes », puis validez avec un coordinateur selon votre famille, budget et projet.",
    },
  ],
};
