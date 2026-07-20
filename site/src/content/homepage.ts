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
  description: string;
};

export const methodeSteps: MethodeStep[] = [
  {
    step: "01",
    title: "Diagnostic",
    description:
      "Un premier échange pour comprendre votre projet d'Alya, la ville qui vous correspond et vos besoins spécifiques (famille, couple, senior, célibataire).",
  },
  {
    step: "02",
    title: "Préparation",
    description:
      "Oulpan à distance, atelier budget individuel et préparation professionnelle avec le Hub de l'emploi, avant même votre départ de France.",
  },
  {
    step: "03",
    title: "Installation",
    description:
      "Logement, démarches administratives et accueil personnalisé par un coordinateur francophone dès votre arrivée en Israël.",
  },
  {
    step: "04",
    title: "Intégration",
    description:
      "Un accompagnement continu pendant toute votre première année : emploi, éducation, vie sociale — jusqu'à votre pleine autonomie.",
  },
];

export type Service = {
  icon: "home" | "language" | "school" | "briefcase" | "document" | "users";
  title: string;
  description: string;
  isNew?: boolean;
};

export const services: Service[] = [
  {
    icon: "home",
    title: "Logement",
    description:
      "Un premier logement abordable pour débuter sa vie en Israël (environ 90 m² pour 2 200 shekels par mois en moyenne).",
  },
  {
    icon: "language",
    title: "Immersion",
    description:
      "Apprentissage de l'hébreu en oulpan et immersion dans des structures israéliennes pour intégrer les codes et le mode de vie du pays.",
  },
  {
    icon: "school",
    title: "Éducation",
    description:
      "Un accès à l'éducation dans des écoles de haut niveau, avec programme d'aide aux devoirs et heures de soutien pour vos enfants.",
  },
  {
    icon: "briefcase",
    title: "Emploi",
    description:
      "Un bilan de compétences, une formation professionnelle en alternance et un placement en entreprise rémunéré.",
  },
  {
    icon: "document",
    title: "Démarches administratives",
    description:
      "Un coordinateur dédié vous accompagne à chaque étape : Misrad Haklita, reconnaissance des diplômes, ouverture de compte, droits et aides à l'intégration.",
    isNew: true,
  },
  {
    icon: "users",
    title: "Communauté & mentorat",
    description:
      "Rejoignez une communauté francophone bienveillante et un réseau d'olim déjà installés, prêts à partager leur expérience.",
    isNew: true,
  },
];
