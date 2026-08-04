export type PartnerCategory =
  | "featured"
  | "institutionnel"
  | "operationnel"
  | "municipal"
  | "sante";

export type Partner = {
  slug: string;
  name: string;
  nameHe?: string;
  category: PartnerCategory;
  tagline: string;
  summary: string;
  logo?: string;
  website?: string;
  websiteLabel?: string;
  phone?: string;
  phoneDisplay?: string;
  contactName?: string;
  offer?: string;
  audience?: string;
  quote?: string;
  highlights?: string[];
};

export const partnersIntro = {
  label: "Réseau",
  title: "Nos partenaires",
  description:
    "Des partenaires institutionnels et opérationnels qui renforcent l'accompagnement Dor Hadash à chaque étape de l'Alya.",
  pageSubtitle:
    "Dor Hadash s'entoure d'institutions, d'associations et de municipalités pour mieux accompagner les familles francophones en Israël.",
};

export const partnerCategoryLabels: Record<PartnerCategory, string> = {
  featured: "Partenaires phares",
  institutionnel: "Partenaires institutionnels",
  operationnel: "Partenaires opérationnels",
  municipal: "Municipalités partenaires",
  sante: "Santé & intégration",
};

export const partners: Partner[] = [
  {
    slug: "agence-juive",
    name: "L'Agence Juive pour Israël",
    nameHe: "הסוכנות היהודית",
    category: "institutionnel",
    tagline: "Partenaire historique du programme Dor Hadash",
    summary:
      "Partenaire historique qui soutient et valide le programme Dor Hadash, et accompagne les futurs olim dans leur projet d'Alya.",
    logo: "/images/partners/agence-juive.png",
    website: "https://www.jewishagency.org/fr/",
    websiteLabel: "Site de l'Agence Juive",
  },
  {
    slug: "misrad-haklita",
    name: "Ministère de l'Alya et de l'Intégration",
    nameHe: "משרד העלייה והקליטה",
    category: "institutionnel",
    tagline: "Misrad HaKlita — intégration des nouveaux olim",
    summary:
      "Partenaire pour l'intégration des nouveaux olim et différents programmes d'accompagnement nationaux.",
    logo: "/images/partners/misrad-haklita.png",
    website: "https://www.gov.il/he/departments/ministry_of_aliyah_and_integration",
    websiteLabel: "Site du ministère",
  },
  {
    slug: "ofek-israel",
    name: "Ofek Israël",
    nameHe: "אופק ישראלי",
    category: "institutionnel",
    tagline: "Partenaire stratégique Alya",
    summary:
      "Partenaire stratégique pour plusieurs programmes et projets d'encouragement et d'accompagnement à l'Alya.",
    logo: "/images/partners/ofek-israel.png",
    website: "https://www.ofekisraeli.org/",
    websiteLabel: "Découvrir Ofek Israël",
  },
  {
    slug: "keren-layedidout",
    name: "Keren Layedidout",
    nameHe: "קרן לידידות",
    category: "institutionnel",
    tagline: "Soutien philanthropique aux olim",
    summary:
      "Partenaire philanthropique (IFCJ) qui soutient des programmes d'Alya, d'aide sociale et d'intégration en Israël.",
    logo: "/images/partners/keren-layedidout.png",
    website: "https://yedidut.org.il/",
    websiteLabel: "Site Keren Layedidout",
  },
  {
    slug: "olimaid",
    name: "OlimAid",
    category: "featured",
    tagline: "Votre Alya, enfin simple — 100 % gratuit",
    summary:
      "Guides à jour et outils IA pour décoder l'hébreu, connaître vos droits, créer un CV israélien et avancer sans stress. Le compagnon digital des olim francophones.",
    logo: "/images/partners/olimaid.png",
    website: "https://www.olimaid.com/fr",
    websiteLabel: "Essayer OlimAid — c'est gratuit",
    offer: "7 outils IA + 17 guides · gratuit · à jour 2026",
    quote: "Courrier en hébreu, droits Olim, CV, démarches : tout devient clair en quelques clics.",
    highlights: [
      "Scanner un courrier hébreu → résumé en français",
      "Lettre officielle en hébreu en 30 secondes",
      "CV israélien prêt à envoyer",
      "Vos droits Olim (Sal Klita, Arnona…)",
      "Guides pratiques + assistant en français",
    ],
  },
  {
    slug: "qualita",
    name: "Qualita",
    nameHe: "קוליטה",
    category: "operationnel",
    tagline: "Intégration des familles francophones",
    summary:
      "Partenaire pour l'intégration et l'accompagnement des familles olim, notamment francophones.",
    logo: "/images/partners/qualita.png",
    website: "https://www.qualita.org.il/",
    websiteLabel: "Site Qualita",
  },
  {
    slug: "ort-israel",
    name: "ORT Israël",
    nameHe: "אורט ישראל",
    category: "operationnel",
    tagline: "Formation et emploi",
    summary:
      "Partenaire en développement pour les parcours de formation et d'emploi des olim.",
    logo: "/images/partners/ort-israel.png",
    website: "https://www.ort.org.il/",
    websiteLabel: "Site ORT Israël",
  },
  {
    slug: "gvahim",
    name: "Gvahim",
    nameHe: "גבהים",
    category: "operationnel",
    tagline: "Emploi et accompagnement professionnel",
    summary:
      "Partenaire pour l'emploi, les webinaires et l'accompagnement professionnel des nouveaux olim.",
    logo: "/images/partners/gvahim.png",
    website: "https://gvahim.org.il/",
    websiteLabel: "Site Gvahim",
  },
  {
    slug: "oulpan-zahav",
    name: "Oulpan Zahav",
    nameHe: "אולפן זהב",
    category: "operationnel",
    tagline: "Enseignement de l'hébreu",
    summary:
      "Partenaire pédagogique pour l'apprentissage dynamique de l'hébreu, pour les adultes et les enfants.",
  },
  {
    slug: "le-pont-educatif",
    name: "Le Pont Éducatif",
    nameHe: "למענך",
    category: "featured",
    tagline: "L'école israélienne, expliquée aux parents",
    summary:
      "Un accompagnement pour dialoguer avec l'école — gan, primaire, Talmud Torah ou yéchiva — et soutenir la scolarité de vos enfants après l'Alya.",
    logo: "/images/partners/le-pont-educatif.svg",
    website: "https://lemaancha.jhesed.com/parent_request/welcome.php",
    websiteLabel: "Demander un accompagnement",
    phone: "+972547877272",
    phoneDisplay: "054-787-7272",
    contactName: "Dan Assous",
    offer: "Jusqu'à 3 h d'accompagnement offert",
    quote: "Réussir son Alya, c'est aussi réussir l'école de ses enfants.",
    highlights: [
      "Comprendre l'école israélienne",
      "Préparer l'intégration des enfants",
      "Faciliter le dialogue parents–école",
      "Aide en cas de difficulté",
    ],
  },
  {
    slug: "leumit",
    name: "Leumit",
    nameHe: "לאומית",
    category: "sante",
    tagline: "Santé et intégration",
    summary:
      "Partenaire dans le domaine de la santé et de l'intégration des nouveaux olim.",
    logo: "/images/partners/leumit.png",
    website: "https://www.leumit.co.il/",
    websiteLabel: "Site Leumit",
  },
  {
    slug: "municipalite-jerusalem",
    name: "Municipalité de Jérusalem",
    nameHe: "עיריית ירושלים",
    category: "municipal",
    tagline: "Ville partenaire Dor Hadash",
    summary:
      "Municipalité partenaire pour l'accueil et l'intégration des olim francophones à Jérusalem.",
    logo: "/images/partners/municipalite-jerusalem.png",
    website: "https://www.jerusalem.muni.il/",
    websiteLabel: "Site de la municipalité",
  },
  {
    slug: "municipalite-haifa",
    name: "Municipalité de Haïfa",
    nameHe: "עיריית חיפה",
    category: "municipal",
    tagline: "Ville partenaire Dor Hadash",
    summary:
      "Municipalité partenaire pour l'accueil et l'intégration des olim francophones à Haïfa.",
    logo: "/images/partners/municipalite-haifa.png",
    website: "https://www.haifa.muni.il/",
    websiteLabel: "Site de la municipalité",
  },
  {
    slug: "municipalite-karmiel",
    name: "Municipalité de Karmiel",
    nameHe: "עיריית כרמיאל",
    category: "municipal",
    tagline: "Ville partenaire Dor Hadash",
    summary:
      "Municipalité partenaire pour l'accueil et l'intégration des olim francophones à Karmiel.",
    logo: "/images/partners/municipalite-karmiel.png",
    website: "https://www.karmiel.muni.il/",
    websiteLabel: "Site de la municipalité",
  },
  {
    slug: "municipalite-nof-hagalil",
    name: "Municipalité de Nof HaGalil",
    nameHe: "עיריית נוף הגליל",
    category: "municipal",
    tagline: "Ville partenaire Dor Hadash",
    summary:
      "Municipalité partenaire pour l'accueil et l'intégration des olim francophones à Nof HaGalil.",
    logo: "/images/partners/municipalite-nof-hagalil.png",
    website: "https://www.nofhagalil.muni.il/",
    websiteLabel: "Site de la municipalité",
  },
];

export const getPartnerBySlug = (slug: string) =>
  partners.find((p) => p.slug === slug);

export const partnersByCategory = (category: PartnerCategory) =>
  partners.filter((p) => p.category === category);
