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
    name: "Eugène Slama",
    role: "Vice-Président — Commission financière, collecte de fonds",
    photo: "/images/team/eugene-slama.png",
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
    role: "Commission communication",
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
  { title: "Hébergement", detail: "Un premier logement pour démarrer sereinement." },
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
    "Logements équipés et sécurisés (unités pour 4 à 6 personnes, capacité d'environ 30 familles)",
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
    "La formule de base est la même pour les familles et les célibataires, avec quelques adaptations. Un contrat d'engagement est signé par les deux parties. Une participation financière couvre le logement, l'arnona, l'écolage et la garderie — financée en partie via le Sal Klita.",
  phases: [
    {
      title: "6 premiers mois",
      items: [
        "Oulpan intensif le matin (partenariat Misrad Haklita)",
        "Enfants scolarisés toute la journée (gan et écoles souvent ouverts de 7 h à 16 h)",
        "Cours de Torah l'après-midi pour le primaire",
        "Activités bénévoles l'après-midi pour pratiquer l'hébreu",
        "Logements confortables avec salle de bain et kitchenette",
        "Les parents peuvent accompagner les enfants les premiers jours à l'école",
      ],
    },
    {
      title: "6 mois suivants",
      items: [
        "Oulpan professionnel le matin",
        "Formation intensive et mise en pratique l'après-midi en entreprise locale",
        "Partenariats Misrad Haklita et Misrad Haavoda",
        "Salaire pour le travail en entreprise",
        "Accompagnement pour formations, reconnaissance de diplômes et démarches administratives",
      ],
    },
  ],
};

export const missionSynthese = [
  "Un logement fourni à un prix accessible par rapport au marché",
  "Un accueil dans d'excellentes conditions",
  "Une communication locale dans les deux langues",
  "Un lieu de vie fondé sur le contact humain, l'échange et l'apprentissage des codes",
  "La facilitation de toutes les formalités administratives",
  "Un soutien financier concret, en lien avec le projet",
  "Le développement d'une activité économique locale",
  "Un cadre culturel et cultuel adapté aux olim francophones",
];
