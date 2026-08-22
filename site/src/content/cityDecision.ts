import { coordinatorSummary } from "./coordinators";
import { rentSummary } from "./rents";

export type DecisionRow = {
  label: string;
  value: string;
};

function housingRow(slug: string, fallback: string) {
  const rent = rentSummary(slug);
  return rent ? `${rent} ${fallback}` : fallback;
}

function contactRow(slug: string, fallback: string) {
  return coordinatorSummary(slug) ?? fallback;
}

export type CityDecisionProfile = {
  slug: string;
  /** Tags pour le comparateur simple */
  tags: Array<
    | "famille"
    | "celibataire"
    | "senior"
    | "pratiquant"
    | "budget"
    | "emploi"
    | "sans-voiture"
    | "mer"
    | "galilee"
  >;
  rows: DecisionRow[];
};

export const cityDecisions: CityDecisionProfile[] = [
  {
    slug: "karmiel",
    tags: ["famille", "celibataire", "budget", "emploi", "galilee", "sans-voiture"],
    rows: [
      { label: "Profil idéal", value: "Jeunes couples et familles ; cadre dynamique et sécurisant au cœur de la Galilée." },
      { label: "Logement", value: housingRow("karmiel", "Prix raisonnables, nouveaux quartiers ; Mercaz Klita possible selon le programme — sans prix garanti.") },
      { label: "Emploi", value: "Industrie, services, proximité Haïfa ; campus Braude et hubs tech locaux." },
      { label: "Éducation", value: "Réseau scolaire large (ganim, écoles, lycées), activités et soutien selon les dispositifs." },
      { label: "Vie religieuse", value: "Communauté accueillante ; synagogues et vie locale selon le quartier." },
      { label: "Oulpan", value: "Oulpans pour débutants et avancés, groupes de conversation." },
      { label: "Transport", value: "Train et bus vers tout le pays ; voiture utile mais pas indispensable au quotidien." },
      { label: "Coût de la vie", value: "Plus accessible que le centre du pays — à confirmer selon quartier et taille du logement." },
      { label: "Accompagnement", value: "Partenariat municipal : démarches, logement, oulpan, formation, emploi, éducation." },
      { label: "Contact local", value: contactRow("karmiel", "Coordinateur Dor Hadash / municipalité — à préciser lors du premier échange.") },
    ],
  },
  {
    slug: "haifa",
    tags: ["famille", "celibataire", "emploi", "pratiquant", "mer", "sans-voiture", "budget"],
    rows: [
      { label: "Profil idéal", value: "Familles et actifs ; ville abordable entre mer et Carmel, religieuse et ouverte." },
      { label: "Logement", value: housingRow("haifa", "Loyers du centre souvent plus accessibles que le marché national — selon quartier, état et meublé.") },
      { label: "Emploi", value: "High-tech (Matam), Technion, université, port — bassin d’emploi diversifié." },
      { label: "Éducation", value: "Écoles variées ; orientation selon le projet familial (dont options traditionnalistes/religieuses)." },
      { label: "Vie religieuse", value: "Communauté du Rav Dr Elyaou Zini et tissu religieux local." },
      { label: "Oulpan", value: "Oulpan intensif prévu dans le parcours (ex. matins pendant les premiers mois)." },
      { label: "Transport", value: "Train, bus, métro — bonne mobilité sans voiture." },
      { label: "Coût de la vie", value: "Globalement plus accessible que Tel-Aviv / Jérusalem centre." },
      { label: "Accompagnement", value: "Coordinateur municipal, communauté locale, Qualita et partenaires." },
      { label: "Contact local", value: contactRow("haifa", "Coordinateur municipal Haïfa — via Dor Hadash au premier échange.") },
    ],
  },
  {
    slug: "jerusalem",
    tags: ["famille", "pratiquant", "emploi", "sans-voiture"],
    rows: [
      { label: "Profil idéal", value: "Familles souhaitant Jérusalem ; Pisgat Ze’ev comme ancrage résidentiel." },
      { label: "Logement", value: "Aide à la recherche (sur place ou visio) ; Pisgat Ze’ev parmi les tarifs plus favorables de Jérusalem." },
      { label: "Emploi", value: "Bassin économique en croissance ; suivi Hub Qualita selon profil." },
      { label: "Éducation", value: "Ganim, écoles primaires et secondaires ; orientation selon le projet familial." },
      { label: "Vie religieuse", value: "Plus de 50 synagogues à Pisgat Ze’ev ; communauté francophone Ahavat Israël." },
      { label: "Oulpan", value: "Parcours pré-Alya et oulpan intensif après l’arrivée selon le programme." },
      { label: "Transport", value: "Bus et tramway (plusieurs stations à Pisgat Ze’ev) ; routes 1 et 443." },
      { label: "Coût de la vie", value: "Élevé en centre ; Pisgat Ze’ev plus accessible — à confirmer au cas par cas." },
      { label: "Accompagnement", value: "Coordinateur municipal, Qualita, communauté Ahavat Israël, coach émotionnel." },
      { label: "Contact local", value: contactRow("jerusalem", "Référent Jérusalem / Pisgat Ze’ev — via le formulaire de contact.") },
    ],
  },
  {
    slug: "nof-hagalil",
    tags: ["famille", "budget", "galilee", "pratiquant"],
    rows: [
      { label: "Profil idéal", value: "Familles cherchant cadre, avantages fiscaux et projet résidentiel en Galilée." },
      { label: "Logement", value: "Aide au loyer possible selon dispositifs ; cadre résidentiel en développement." },
      { label: "Emploi", value: "Pôles high-tech et zones industrielles ; proximité Haïfa pour élargir le bassin." },
      { label: "Éducation", value: "Structures locales ; détail selon le quartier et le profil des enfants." },
      { label: "Vie religieuse", value: "Vie communautaire selon les garinim et synagogues locales." },
      { label: "Oulpan", value: "Solutions locales à confirmer avec le coordinateur et le Misrad Haklita." },
      { label: "Transport", value: "Voiture souvent utile ; futurs liens ferroviaires vers Haïfa en projet." },
      { label: "Coût de la vie", value: "Avantages fiscaux jusqu’à 18 % selon éligibilité — à vérifier au cas par cas." },
      { label: "Accompagnement", value: "Programme Dor Hadash + partenaires locaux pour l’installation." },
      { label: "Contact local", value: contactRow("nof-hagalil", "Référent Nof HaGalil — via Dor Hadash.") },
    ],
  },
  {
    slug: "netivot",
    tags: ["famille", "budget", "pratiquant", "senior"],
    rows: [
      { label: "Profil idéal", value: "Familles (et seniors) attirés par une ville familiale du Neguev, cadre communautaire." },
      { label: "Logement", value: housingRow("netivot", "Aide au loyer pour olim selon dispositifs ; marché plus accessible que le centre.") },
      { label: "Emploi", value: "Emploi local et bassins proches — à croiser avec le profil professionnel." },
      { label: "Éducation", value: "Réseau scolaire familial ; orientation Dor Hadash selon les enfants." },
      { label: "Vie religieuse", value: "Forte identité religieuse et communautaire." },
      { label: "Oulpan", value: "Solutions locales selon le Misrad Haklita et le programme." },
      { label: "Transport", value: "Voiture souvent recommandée pour le quotidien et l’emploi." },
      { label: "Coût de la vie", value: "Avantages fiscaux et coût globalement plus bas que le centre du pays." },
      { label: "Accompagnement", value: "Accompagnement Dor Hadash avant, pendant et après l’Alya." },
      { label: "Contact local", value: contactRow("netivot", "Référent Netivot — via le premier entretien.") },
    ],
  },
  {
    slug: "ashdod",
    tags: ["famille", "mer", "emploi", "celibataire", "sans-voiture"],
    rows: [
      { label: "Profil idéal", value: "Familles et actifs ; ville méditerranéenne familiale avec communauté francophone." },
      { label: "Logement", value: housingRow("ashdod", "Marché locatif côtier — selon quartier, taille et meublé.") },
      { label: "Emploi", value: "Port, services, industrie ; accès vers le centre du pays." },
      { label: "Éducation", value: "Réseau scolaire urbain ; soutien selon les dispositifs locaux." },
      { label: "Vie religieuse", value: "Communautés et synagogues selon les quartiers." },
      { label: "Oulpan", value: "Oulpan et parcours d’intégration selon le programme Dor Hadash." },
      { label: "Transport", value: "Bus et liaisons ; voiture utile selon le quartier et le travail." },
      { label: "Coût de la vie", value: "Intermédiaire — plus accessible que Tel-Aviv, variable près de la mer." },
      { label: "Accompagnement", value: "Accompagnement avant, pendant et après l’Alya." },
      { label: "Contact local", value: contactRow("ashdod", "Référent Ashdod — via Dor Hadash.") },
    ],
  },
  {
    slug: "bat-yam",
    tags: ["famille", "mer", "emploi", "sans-voiture", "celibataire"],
    rows: [
      { label: "Profil idéal", value: "Familles et actifs voulant la mer aux portes de Tel-Aviv, avec mobilité métropolitaine." },
      { label: "Logement", value: housingRow("bat-yam", "Marché tendu du Goush Dan — aide à la recherche, sans prix garanti.") },
      { label: "Emploi", value: "Accès au bassin de Tel-Aviv / Goush Dan via transports." },
      { label: "Éducation", value: "Écoles de quartier ; orientation selon le projet familial." },
      { label: "Vie religieuse", value: "Vie de quartier et communautés selon le secteur." },
      { label: "Oulpan", value: "Solutions locales + parcours Dor Hadash." },
      { label: "Transport", value: "Tram ligne rouge (10 stations), bus, accès Ayalon — voiture souvent optionnelle." },
      { label: "Coût de la vie", value: "Élevé (métropole) — à anticiper dès le budget prévisionnel." },
      { label: "Accompagnement", value: "Prise en compte des réalités du Goush Dan : locatif, scolarité, emploi, réseau." },
      { label: "Contact local", value: contactRow("bat-yam", "Référent Bat Yam — via le formulaire de contact.") },
    ],
  },
];

export function getCityDecision(slug: string) {
  return cityDecisions.find((c) => c.slug === slug);
}
