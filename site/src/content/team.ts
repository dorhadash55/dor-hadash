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

export const missionAudience =
  "Ce programme s'adresse aux jeunes célibataires ou en couple, aux familles et aux seniors actifs.";

export const missionVillage = [
  "Selon la ville et le programme choisi, l'accueil peut s'effectuer dans un Mercaz Klita, une structure communautaire ou directement dans un logement en ville. Le contact humain, l'échange et l'apprentissage des codes restent au cœur du parcours.",
  "Ce projet est conçu pour rendre le olé autonome.",
  "Dor Hadash accueille chaque famille dans le respect de son identité, de son mode de vie et de ses besoins, en l'orientant vers un environnement adapté.",
];

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
        "Formation et mise en pratique l'après-midi en entreprise locale — selon les opportunités et l'éligibilité",
        "Partenariat Misrad Haavoda",
        "Suivi budgétaire au 8ᵉ mois d'Alya par l'accompagnant initial",
        "Aide aux démarches administratives et professionnelles",
      ],
    },
  ],
};
