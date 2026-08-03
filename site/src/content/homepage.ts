export const hero = {
  eyebrow: "Association Dor Hadash",
  title: "Votre place vous attend en Israël",
  subtitle:
    "Vous envisagez de faire votre Alya ? Préparez-vous, avec un accompagnement complet, pour une intégration réussie en Israël.",
  ctaPrimary: { label: "Je m'inscris", href: "/nous-contacter" },
  ctaSecondary: { label: "Découvrir la méthode", href: "#methode" },
};

export type MethodeStep = {
  step: string;
  title: string;
  /** Phrase courte visible sur mobile avant d'ouvrir le détail */
  teaser: string;
  description: string;
};

export const methodeSteps: MethodeStep[] = [
  {
    step: "01",
    title: "Diagnostic de votre projet",
    teaser: "On clarifie votre Alya et la ville qui vous correspond.",
    description:
      "Un premier échange pour comprendre votre projet d'Alya, la ville qui vous correspond et vos besoins spécifiques (famille, couple, senior, célibataire).",
  },
  {
    step: "02",
    title: "Préparation avant le départ",
    teaser: "Hébreu, budget et emploi : tout se prépare depuis la France.",
    description:
      "Oulpan à distance, atelier budget individuel et préparation professionnelle avec le Hub de l'emploi, avant même votre départ de France.",
  },
  {
    step: "03",
    title: "Installation à l'arrivée",
    teaser: "Logement, démarches et accueil dès votre arrivée.",
    description:
      "Aide à la recherche d'un logement, accompagnement dans les démarches administratives, et accueil personnalisé par un coordinateur francophone dès votre arrivée en Israël.",
  },
  {
    step: "04",
    title: "Intégration sur 12 mois",
    teaser: "Un suivi jusqu'à votre autonomie complète en Israël.",
    description:
      "Un accompagnement continu pendant toute votre première année : emploi, éducation, vie sociale — jusqu'à votre pleine autonomie.",
  },
];

export type Service = {
  icon: "home" | "language" | "school" | "briefcase" | "document" | "users";
  title: string;
  teaser: string;
  description: string;
  isNew?: boolean;
};

export const services: Service[] = [
  {
    icon: "home",
    title: "Logement abordable",
    teaser: "Un premier toit pour démarrer sereinement en Israël.",
    description:
      "Un premier logement abordable pour débuter sa vie en Israël (environ 90 m² pour 2 200 shekels par mois en moyenne).",
  },
  {
    icon: "language",
    title: "Immersion & hébreu",
    teaser: "Oulpan et vie locale pour intégrer les codes du pays.",
    description:
      "Apprentissage de l'hébreu en oulpan et immersion dans des structures israéliennes pour intégrer les codes et le mode de vie du pays.",
  },
  {
    icon: "school",
    title: "Éducation des enfants",
    teaser: "Écoles de qualité et soutien scolaire au quotidien.",
    description:
      "Un accès à l'éducation dans des écoles de haut niveau, avec programme d'aide aux devoirs et heures de soutien pour vos enfants.",
  },
  {
    icon: "briefcase",
    title: "Emploi & formation",
    teaser: "Bilan, alternance et placement en entreprise rémunéré.",
    description:
      "Un bilan de compétences, une formation professionnelle en alternance et un placement en entreprise rémunéré.",
  },
  {
    icon: "document",
    title: "Démarches administratives",
    teaser: "Un coordinateur à vos côtés pour toutes les formalités.",
    description:
      "Un coordinateur dédié vous accompagne à chaque étape : Misrad Haklita, reconnaissance des diplômes, ouverture de compte, droits et aides à l'intégration.",
    isNew: true,
  },
  {
    icon: "users",
    title: "Communauté & mentorat",
    teaser: "Un réseau d'olim francophones pour ne pas arriver seul.",
    description:
      "Rejoignez une communauté francophone bienveillante et un réseau d'olim déjà installés, prêts à partager leur expérience.",
    isNew: true,
  },
];
