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
