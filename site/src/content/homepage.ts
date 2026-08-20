export const hero = {
  eyebrow: "Association Dor Hadash",
  title: "Chaque Alya est unique. Notre accompagnement aussi.",
  subtitle:
    "De la préparation en France jusqu'à votre intégration en Israël, Dor Hadash vous accompagne personnellement, étape par étape.",
  /** Entretien = contact direct ; faire le point = page pratique avant de prendre RDV */
  ctaPrimary: { label: "Demander un premier entretien", href: "/nous-contacter?objet=entretien" },
  ctaSecondary: { label: "Faire le point sur mon projet", href: "/preparer-mon-alya" },
};

/** Les 4 piliers officiels Dor Hadash — identité du programme */
export type Pillar = {
  icon: "home" | "users" | "school" | "briefcase";
  title: string;
  teaser: string;
  description: string;
};

export const pillars: Pillar[] = [
  {
    icon: "home",
    title: "Logement",
    teaser: "Trouver un premier lieu de vie adapté à votre projet.",
    description:
      "Aide à la recherche d'un logement (sur place ou à distance) selon votre budget et votre ville — sans prix garanti. Selon le programme, l'accueil peut passer par un Mercaz Klita, une structure communautaire ou un appartement en ville.",
  },
  {
    icon: "users",
    title: "Immersion & intégration",
    teaser: "Comprendre les codes et créer du lien, sans rester seul.",
    description:
      "Oulpan, vie locale, accompagnateur référent et ancrage communautaire : pour s'intégrer concrètement dans la société israélienne, à votre rythme.",
  },
  {
    icon: "school",
    title: "Éducation",
    teaser: "Orienter et soutenir la scolarité de vos enfants.",
    description:
      "Conseils pour le choix d'école, compréhension du système israélien, et accompagnement parents/enfants (dont partenariats comme le Pont Éducatif) — selon la ville et les dispositifs disponibles.",
  },
  {
    icon: "briefcase",
    title: "Emploi",
    teaser: "Construire votre avenir professionnel en Israël.",
    description:
      "Orientation, bilan, formation et suivi d'intégration professionnelle avec nos partenaires (dont Qualita / Misrad Haavoda). Les opportunités dépendent du profil, de la ville et de l'éligibilité aux dispositifs.",
  },
];

/** Services transversaux (en plus des 4 piliers) */
export type Service = {
  icon: "home" | "language" | "school" | "briefcase" | "document" | "users";
  title: string;
  teaser: string;
  description: string;
};

export const transversalServices: Service[] = [
  {
    icon: "language",
    title: "Hébreu & oulpan",
    teaser: "Progresser en hébreu avant et après l'arrivée.",
    description:
      "Oulpan à distance avant le départ, puis oulpan intensif, pour retraités ou professionnel selon votre étape — en lien avec le Misrad Haklita et les structures locales.",
  },
  {
    icon: "document",
    title: "Démarches administratives",
    teaser: "Un fil conducteur pour les formalités du quotidien.",
    description:
      "Orientation vers Misrad Haklita, droits olim, banque, santé et démarches courantes — avec un accompagnateur pour ne pas rester seul face aux formalités.",
  },
  {
    icon: "users",
    title: "Communauté & mentorat",
    teaser: "Un réseau francophone pour s'ancrer plus vite.",
    description:
      "Mise en relation avec des olim déjà installés et des communautés locales, pour partager l'expérience et créer du lien dès l'arrivée.",
  },
];

/** @deprecated — alias pour compatibilité ; préférer pillars */
export const services = pillars.map((p) => ({
  ...p,
  isNew: false as boolean | undefined,
}));

export const trustProofs = [
  { value: "2020", label: "Association créée" },
  { value: "280+", label: "Personnes accompagnées" },
  { value: "153", label: "Familles arrivées depuis le 7 oct. 2023" },
  { value: "7", label: "Villes d'accompagnement" },
];

export const accompanimentDisclaimer =
  "Chaque accompagnement dépend du profil de la famille, de la ville choisie, des dispositifs disponibles et des critères d'éligibilité. Dor Hadash s'engage à vous informer clairement dès le premier échange.";

export type EntryDoor = {
  title: string;
  description: string;
  href: string;
};

export const entryDoors: EntryDoor[] = [
  {
    title: "Je prépare mon Alya depuis la France",
    description: "Chronologie, checklist et premiers échanges avec un coordinateur.",
    href: "/preparer-mon-alya",
  },
  {
    title: "Je viens d'arriver en Israël",
    description: "Les premiers jours, le référent local et les démarches urgentes.",
    href: "/nous-contacter?objet=arrive",
  },
  {
    title: "Je cherche la ville qui me correspond",
    description: "Comparer les villes et trouver le bon environnement pour votre famille.",
    href: "/nos-villes",
  },
  {
    title: "J'ai besoin d'aide pour l'emploi, l'école ou le logement",
    description: "Nos quatre piliers : des réponses concrètes, sans faux espoirs.",
    href: "/#piliers",
  },
];

/**
 * Témoignages courts pour l'accueil — même source que la page Paroles d'olim.
 */
export type { WrittenTestimonial as HomeTestimonial } from "./testimonials";
export { writtenTestimonials as homeTestimonials } from "./testimonials";
