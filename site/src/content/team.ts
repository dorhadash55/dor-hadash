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
  "Hébergement",
  "Apprentissage de la langue",
  "Formation professionnelle en alternance",
  "Intégration à l'emploi",
  "Accompagnement d'un coordinateur pour toutes les démarches",
];

export const missionSynthese = [
  "Un logement fourni à bas prix par rapport au prix du marché",
  "Un accueil dans d'excellentes conditions",
  "Une communication locale dans les deux langues",
  "Un lieu de vie où le contact humain, l'échange et l'apprentissage des codes créent une dynamique de solidarité",
  "La facilitation de toutes les formalités administratives",
  "Un soutien financier concret et automatique",
  "Un cadre répondant aux attentes culturelles et cultuelles des olim francophones",
];
