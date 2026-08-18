export type WrittenTestimonial = {
  prenom: string;
  ville: string;
  annee: string;
  situation: string;
  /** Thème concret (logement, école, emploi…) */
  theme: string;
  quote: string;
};

/**
 * Témoignages écrits — format demandé : prénom, ville, année d'Alya, situation.
 * À remplacer / compléter dès que l'association fournit les citations officielles.
 */
export const writtenTestimonials: WrittenTestimonial[] = [
  {
    prenom: "Nathalie",
    ville: "Karmiel",
    annee: "2023",
    situation: "Famille — 3 enfants",
    theme: "École & installation",
    quote:
      "On avait peur pour la scolarité. Dor Hadash nous a aidés à comprendre le système, à choisir l'école et à ne pas rester seuls les premières semaines. Six mois plus tard, les enfants ont des amis et on se sent vraiment installés.",
  },
  {
    prenom: "David",
    ville: "Haïfa",
    annee: "2024",
    situation: "Couple",
    theme: "Emploi",
    quote:
      "Le bilan de compétences et l'orientation pro ont changé la donne. On savait que l'emploi dépendait de notre profil — ils l'ont dit clairement — et on a avancé étape par étape jusqu'à un premier poste dans le bassin de Haïfa.",
  },
  {
    prenom: "Miriam",
    ville: "Jérusalem",
    annee: "2024",
    situation: "Famille — 2 enfants",
    theme: "Logement & communauté",
    quote:
      "Trouver un appartement à Pisgat Ze'ev sans parler hébreu, c'était stressant. L'aide à la recherche et le lien avec la communauté francophone nous ont évité beaucoup d'erreurs. Pas de miracle sur les prix — mais un vrai accompagnement.",
  },
  {
    prenom: "Alain",
    ville: "Netivot",
    annee: "2023",
    situation: "Senior en couple",
    theme: "Vie quotidienne",
    quote:
      "On voulait une ville familiale, un coût de la vie plus accessible et un cadre religieux. Le coordinateur a pris le temps d'expliquer les avantages et les limites. On a pu décider en connaissance de cause, pas sur une photo.",
  },
  {
    prenom: "Léa",
    ville: "Ashdod",
    annee: "2025",
    situation: "Célibataire",
    theme: "Préparation avant l'Alya",
    quote:
      "Les six mois avant le départ — oulpan à distance, atelier budget, questions sans filtre — m'ont évité de partir « les yeux fermés ». Arrivée sur place, je savais déjà qui appeler et quoi faire la première semaine.",
  },
  {
    prenom: "Yael & Jonathan",
    ville: "Bat Yam",
    annee: "2024",
    situation: "Famille — 1 enfant",
    theme: "Transports & métropole",
    quote:
      "On voulait la mer et l'accès à Tel-Aviv sans tout quitter pour le centre. Dor Hadash nous a aidés à voir concrètement tram, écoles et marché locatif du Goush Dan — avec ses contraintes. On a choisi en étant informés.",
  },
];
