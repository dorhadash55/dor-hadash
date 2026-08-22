export type CityRent = {
  /** Slug de la page ville, si elle existe */
  slug?: string;
  name: string;
  threeRooms: string;
  fourRooms: string;
};

/** Fourchettes indicatives — août 2026 */
export const rentUpdatedLabel = "août 2026";

export const cityRents: CityRent[] = [
  { slug: "haifa", name: "Haïfa", threeRooms: "4 200 à 6 500 ₪", fourRooms: "5 800 à 8 500 ₪" },
  { slug: "karmiel", name: "Karmiel", threeRooms: "2 800 à 3 800 ₪", fourRooms: "3 600 à 4 800 ₪" },
  { slug: "netivot", name: "Netivot", threeRooms: "3 300 à 4 300 ₪", fourRooms: "3 800 à 5 000 ₪" },
  { slug: "bat-yam", name: "Bat Yam", threeRooms: "4 500 à 6 000 ₪", fourRooms: "5 800 à 7 800 ₪" },
  { slug: "ashdod", name: "Ashdod", threeRooms: "4 200 à 5 800 ₪", fourRooms: "5 200 à 7 000 ₪" },
  { name: "Ashkelon", threeRooms: "3 000 à 4 200 ₪", fourRooms: "4 000 à 5 500 ₪" },
];

export const rentDisclaimer =
  "Ces estimations correspondent aux loyers mensuels demandés et n’incluent généralement pas l’arnona, le vaad bayit, l’eau, l’électricité ou les frais d’agence. Elles varient fortement selon le quartier, l’état du logement, la présence d’un mamad, d’un ascenseur, d’un parking ou d’une terrasse.";

export function getCityRent(slug: string) {
  return cityRents.find((r) => r.slug === slug);
}

export function rentSummary(slug: string) {
  const rent = getCityRent(slug);
  if (!rent) return null;
  return `Indicatif ${rentUpdatedLabel} : 3 pièces ${rent.threeRooms} · 4 pièces ${rent.fourRooms}.`;
}
