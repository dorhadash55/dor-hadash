export type TeamMember = {
  name: string;
  role: string;
  photo: string;
};

export const team: TeamMember[] = [
  {
    name: "Patricia Hassoun",
    role: "Présidente",
    photo: "/images/team/patricia-hassoun.png",
  },
  {
    name: "Frank Pila",
    role: "Collecte de fonds",
    photo: "/images/team/frank-pila.jpg",
  },
  {
    name: "Rav Yoël Kling",
    role: "Commission Éthique et Éducation",
    photo: "/images/team/rav-yoel-kling.png",
  },
  {
    name: "Maurice Hassoun",
    role: "Trésorier — Commission financière",
    photo: "/images/team/maurice-hassoun.png",
  },
  {
    name: "Johann Habib",
    role: "Avocat — Commission Éthique et Éducation, Relations extérieures",
    photo: "/images/team/johann-habib.png",
  },
  {
    name: "Guillaume Hassoun",
    role: "Commission gouvernance — stratégie",
    photo: "/images/team/guillaume-hassoun.jpeg",
  },
];

export const missionQuote = {
  text: "Pour une Alya réussie il faut avoir une vision à long terme",
  author: "Patricia Hassoun",
  role: "Présidente de Dor Hadash",
};

export const missionIntro =
  "L'association Dor Hadash est une structure d'accompagnement à l'intégration sociale et professionnelle des olim francophones en Israël.";

export const missionSupport = [
  {
    title: "Aide au logement",
    detail: "Conseils et aide à la recherche d'un premier appartement — sans prix garanti.",
  },
  { title: "Apprentissage de la langue", detail: "Oulpan intensif et immersion dans la vie locale." },
  {
    title: "Formation & emploi",
    detail: "Alternance, apprentissage en entreprise et intégration professionnelle.",
  },
  {
    title: "Accompagnement administratif",
    detail: "Un suivi concret pour toutes les démarches du quotidien.",
  },
];

export const missionAudience =
  "Ce programme s'adresse aux jeunes célibataires ou en couple, aux familles et aux seniors actifs.";

export const missionVillage = [
  "Les olim sont accueillis dans un « village communautaire » (kibboutz, Mercaz Klita ou autre), où le contact humain, l'échange, la compréhension et l'apprentissage des codes sont l'essence même du programme.",
  "Ce projet est conçu pour rendre le olé autonome.",
  "La structure d'accueil se veut religieusement traditionaliste : respect du Chabbat et des fêtes, cacherout, offices et éducation religieuse — pour rassurer les familles traditionalistes.",
];

export const missionIncubator = {
  lieu: "Situé à proximité d'une grande ville, avec les équipements nécessaires au quotidien.",
  equipements: [
    "Aide à la recherche d'un premier logement selon le cadre d'accueil (Mercaz Klita, kibboutz ou autre)",
    "Réfectoire pour repas et réunions (facultatif)",
    "Synagogue",
    "Gan, écoles, camps de vacances et activités pour tous les âges",
    "Laverie (option)",
    "Cadre vert, propre et calme",
    "Équipements sportifs, aires de jeux et piscine",
    "Contexte agricole",
  ],
  accueil:
    "L'expérience du village est particulièrement adaptée aux familles pendant la première période d'intégration : amitiés, familiarisation avec le mode de vie israélien, insertion sociale et professionnelle, puis participation active à la communauté.",
};

export const missionProgram = {
  intro:
    "Le programme Dor Hadash dure 6 mois avant l'Alya et 12 mois après l'arrivée. La formule de base est la même pour les familles et les célibataires, avec quelques adaptations. Un contrat d'engagement est signé par les deux parties.",
  phases: [
    {
      title: "6 mois avant l'Alya",
      items: [
        "Diagnostic de votre projet et choix de la ville d'accueil",
        "Oulpan à distance pour poser les bases de l'hébreu",
        "Atelier budget individuel pour anticiper le coût de la vie",
        "Préparation professionnelle avec le Hub de l'emploi",
        "Accompagnement sur les démarches préalables au départ",
      ],
    },
    {
      title: "6 premiers mois après l'Alya",
      items: [
        "Accompagnement référent — vous n'êtes jamais seul",
        "Oulpan intensif ou pour retraités (Misrad Haklita)",
        "Scolarité : conseils et soutien parents / enfants (mahon, gan et écoles)",
        "Activités bénévoles ou travail d'appoint l'après-midi pour pratiquer l'hébreu",
        "Aide à la recherche d'un premier logement (sur place ou à distance), selon votre budget — sans prix garanti",
        "Emploi : orientation, conseils et suivi de l'intégration professionnelle",
      ],
    },
    {
      title: "6 mois suivants",
      items: [
        "Second oulpan ou oulpan professionnel",
        "Formation et mise en pratique l'après-midi en entreprise locale",
        "Partenariat Misrad Haavoda",
        "Suivi budgétaire au 8ᵉ mois d'Alya par l'accompagnant initial",
        "Aide aux démarches administratives et professionnelles",
      ],
    },
  ],
};

export const missionSynthese = [
  "Une aide à la recherche de logement, selon votre budget et votre ville — sans prix garanti",
  "Un accueil dans d'excellentes conditions",
  "Une communication locale dans les deux langues",
  "Un lieu de vie fondé sur le contact humain, l'échange et l'apprentissage des codes",
  "La facilitation de toutes les formalités administratives",
  "Un soutien financier concret, en lien avec le projet",
  "Le développement d'une activité économique locale",
  "Un cadre culturel et cultuel adapté aux olim francophones",
];
