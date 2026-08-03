export type Partner = {
  slug: string;
  name: string;
  nameHe?: string;
  tagline: string;
  summary: string;
  logo: string;
  website: string;
  websiteLabel: string;
  phone?: string;
  phoneDisplay?: string;
  contactName?: string;
  offer?: string;
  audience?: string;
  quote?: string;
  highlights: string[];
};

export const partnersIntro = {
  label: "Réseau",
  title: "Nos partenaires",
  description:
    "Des acteurs de confiance qui complètent l'accompagnement Dor Hadash sur des besoins précis.",
  pageSubtitle:
    "Dor Hadash s'entoure de partenaires spécialisés pour mieux accompagner les familles francophones en Israël.",
};

export const partners: Partner[] = [
  {
    slug: "olimaid",
    name: "OlimAid",
    tagline: "Guides et outils IA gratuits pour réussir son Alya",
    summary:
      "OlimAid accompagne les olim francophones (et anglophones) avec des guides à jour et des outils pratiques : droits et aides (Sal Klita, Arnona, Koupat Holim), CV israélien, scanner de courriers en hébreu, générateur de lettres et aide au choix de ville. Une plateforme complémentaire à l'accompagnement humain de Dor Hadash.",
    logo: "/images/partners/olimaid.png",
    website: "https://www.olimaid.com/fr",
    websiteLabel: "Découvrir OlimAid",
    offer: "Outils IA gratuits — à jour 2026",
    audience: "Futurs olim et olim déjà installés qui veulent gagner du temps sur les démarches et l'emploi.",
    quote: "Des outils concrets pour avancer dans votre Alya, à votre rythme.",
    highlights: [
      "Guides droits & aides (Sal Klita, Arnona, santé…)",
      "CV Builder israélien (hébreu / anglais)",
      "Scanner et comprendre les courriers en hébreu",
      "Lettres types et recommandation de ville",
    ],
  },
  {
    slug: "le-pont-educatif",
    name: "Le Pont Éducatif",
    nameHe: "למענך",
    tagline: "Accompagnement scolaire des familles francophones",
    summary:
      "Le Pont Éducatif aide les familles francophones dans leur relation avec l'école israélienne — gan, école, Talmud Torah ou yéchiva. Objectif : faciliter le dialogue dès le départ, pour que l'école puisse communiquer avec les parents et agir au mieux pour l'enfant.",
    logo: "/images/partners/le-pont-educatif.svg",
    website: "https://lemaancha.jhesed.com/parent_request/welcome.php",
    websiteLabel: "Demander un accompagnement",
    phone: "+972547877272",
    phoneDisplay: "054-787-7272",
    contactName: "Dan Assous",
    offer: "Jusqu'à 3 heures d'accompagnement offert (sans déplacement)",
    audience: "Familles nouvellement arrivées ou déjà installées en Israël.",
    quote: "Réussir son Alya, c'est aussi réussir la scolarité de ses enfants.",
    highlights: [
      "Comprendre le système scolaire israélien",
      "Préparer l'intégration scolaire des enfants",
      "Faciliter les échanges parents–école",
      "Être accompagné en cas de difficulté",
    ],
  },
];
