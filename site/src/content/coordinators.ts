export type CoordinatorPerson = {
  name: string;
  phones: string[];
  email?: string;
};

export type CityCoordinatorGroup = {
  /** Slug de la page ville, si elle existe */
  slug?: string;
  name: string;
  recruiting?: boolean;
  people: CoordinatorPerson[];
};

export const cityCoordinators: CityCoordinatorGroup[] = [
  {
    slug: "ashdod",
    name: "Ashdod",
    people: [{ name: "Caroline Chetrit", phones: ["054-361-5521"], email: "chetritc@hotmail.fr" }],
  },
  {
    name: "Ashkelon",
    people: [
      { name: "Shirel Perez", phones: ["058-711-1733"], email: "shirel-p@ashkelon.muni.il" },
      { name: "Valérie Illouz", phones: ["050-244-7832"] },
    ],
  },
  {
    slug: "bat-yam",
    name: "Bat Yam",
    people: [{ name: "Raya", phones: ["03-911-2057"], email: "rayal@ptikva.org.il" }],
  },
  {
    slug: "haifa",
    name: "Haïfa",
    people: [{ name: "Rivka Berrebi", phones: ["04-911-1411", "050-923-2485"] }],
  },
  {
    slug: "jerusalem",
    name: "Jérusalem",
    people: [{ name: "Levana Helena Altar", phones: ["058-449-4661"], email: "Levana_al@jerusalem.muni.il" }],
  },
  {
    slug: "karmiel",
    name: "Karmiel",
    people: [{ name: "Claris", phones: ["052-475-4020"] }],
  },
  {
    slug: "netivot",
    name: "Netivot",
    people: [{ name: "Yael Nahmias", phones: ["054-945-2055"], email: "Yael.n@netivot.muni.il" }],
  },
  {
    slug: "nof-hagalil",
    name: "Nof HaGalil",
    recruiting: true,
    people: [],
  },
];

export function getCityCoordinator(slug: string) {
  return cityCoordinators.find((c) => c.slug === slug);
}

/** Convertit un numéro israélien affiché (0X-XXX-XXXX) en lien tel: */
export function toTelHref(display: string) {
  const digits = display.replace(/\D/g, "");
  if (digits.startsWith("0")) return `tel:+972${digits.slice(1)}`;
  if (digits.startsWith("972")) return `tel:+${digits}`;
  return `tel:${digits}`;
}

export function coordinatorSummary(slug: string) {
  const group = getCityCoordinator(slug);
  if (!group) return null;
  if (group.recruiting) {
    return "Poste de coordinateur local francophone en cours de recrutement — contactez Dor Hadash.";
  }
  return group.people
    .map((p) => {
      const bits = [p.name, p.phones.join(" / ")];
      if (p.email) bits.push(p.email);
      return bits.join(" — ");
    })
    .join(" · ");
}
