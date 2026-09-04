export const checklistPdf = {
  href: "/docs/checklist-dor-hadash.pdf",
  filename: "Checklist-Dor-Hadash.pdf",
  label: "Télécharger la checklist olim (PDF)",
};

export type ChronologyContact = {
  name: string;
  detail?: string;
};

export type ChronologyPhase = {
  period: string;
  steps: string[];
  dualAction?: {
    agency: string;
    dorHadash: string;
  };
  membership?: {
    title: string;
    intro: string;
    contacts: ChronologyContact[];
  };
  cityNote?: string;
  professional?: {
    title: string;
    body: string;
  };
  meanwhile?: {
    title: string;
    items: string[];
  };
};

export const prepareAlya = {
  intro:
    "Les étapes-clés de 12 mois à 6 mois avant le départ : clarifier le projet, ouvrir le dossier à l’Agence Juive, adhérer à Dor Hadash, puis affiner budget, ville et orientation professionnelle.",
  chronology: [
    {
      period: "12 mois à 6 mois",
      steps: [
        "Clarifier le projet",
        "Échanger en famille",
        "Envisager une date de départ approximative",
      ],
      dualAction: {
        agency: "Ouvrir le dossier à l’Agence Juive afin d’obtenir votre éligibilité",
        dorHadash:
          "contacter Dor Hadash pour un premier entretien d’information et faire le point sur votre situation",
      },
      membership: {
        title: "Adhésion au programme Dor Hadash",
        intro:
          "Envoi par mail de tous les contacts dédiés aux adhérents olim Dor Hadash dans les différentes organisations et associations :",
        contacts: [
          { name: "Keren Layedidout" },
          { name: "Oulpan pré-Alya" },
          {
            name: "Étude de faisabilité professionnelle",
            detail:
              "À ce stade, commencer à lister et collecter diplômes, attestations et tous documents professionnels utiles.",
          },
          {
            name: "Étude budgétaire et financière de votre situation avec une économiste",
          },
        ],
      },
      cityNote: "On commence à réfléchir au choix de la ville d’arrivée.",
    },
    {
      period: "6 mois avant",
      steps: [
        "Étude budgétaire précise avec notre économiste spécialiste",
        "Confirmation du choix de la ville d’arrivée",
        "Anticipation scolarité des enfants",
      ],
      professional: {
        title: "Souhaits d’orientation professionnelle plus clairs",
        body: "Définition plus précise des besoins (formations, reconnaissance diplômes, réorientation professionnelle si besoin, ateliers CV israéliens, ateliers auto-entreprises, insertion, etc.).",
      },
      meanwhile: {
        title: "Et pendant ce temps",
        items: [
          "Vous avez reçu votre éligibilité",
          "Vous l’avez envoyée au Keren Layedidout pour l’ouverture du dossier",
          "Vous avez pris contact par mail avec les différents interlocuteurs qui vous fixeront un rendez-vous téléphonique",
        ],
      },
    },
  ] satisfies ChronologyPhase[],
  checklistIntro:
    "La checklist officielle Dor Hadash pour les olim : documents, démarches et points à anticiper avant le départ. Document à télécharger et à parcourir à votre rythme.",
  topics: [
    {
      title: "Budget familial prévisionnel",
      body: "Dès l’adhésion, une première étude budgétaire et financière est faite avec une économiste. Six mois avant le départ, l’étude devient plus précise. Consultez aussi les fourchettes indicatives de loyers sur la page Nos villes.",
    },
    {
      title: "Reconnaissance des diplômes",
      body: "Dès l’étude de faisabilité professionnelle, listez et collectez diplômes, attestations et documents utiles. Certaines professions exigent une reconnaissance ou une équivalence — votre coordinateur peut vous orienter.",
    },
    {
      title: "Scolarisation des enfants",
      body: "Six mois avant le départ, anticipez le type d’établissement (municipal, religieux, etc.) et le rythme d’intégration. Le système israélien diffère du français : mieux vaut ne pas attendre l’arrivée.",
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
      a: "Non. Nous accompagnons et orientons. Les droits olim, l’Alya et certains dispositifs restent du ressort des autorités et partenaires institutionnels. L’ouverture du dossier à l’Agence Juive reste indispensable pour obtenir votre éligibilité.",
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
      a: "Dès 12 à 6 mois avant, on commence à y réfléchir. Six mois avant le départ, le choix de la ville d’arrivée se confirme. Utilisez les pages villes et le comparateur, puis validez avec un coordinateur selon votre famille, budget et projet.",
    },
  ],
};
