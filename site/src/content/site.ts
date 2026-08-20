export const siteInfo = {
  name: "Dor Hadash",
  tagline: "Incubateur d'Alya francophone",
  email: "dorhadash5780@gmail.com",
  phones: {
    israel: ["+972-52-226-3776", "+972-54-692-8792"],
    france: ["+33-1-86-98-19-43"],
  },
  callPhone: "tel:+972522263776",
  social: {
    facebook: "https://www.facebook.com/share/1B39kgdKvT/",
    instagram: "https://www.instagram.com/dorhadash.pisgatzeev?igsh=MXhjN3Y5dmVueGdvZA==",
  },
};

export type NavItem = {
  label: string;
  /** Libellé compact pour la barre desktop (évite le wrap) */
  shortLabel?: string;
  path: string;
  children?: NavItem[];
};

/**
 * Desktop — peu d'entrées, CTA entretien séparé dans le Header.
 */
export const mainNav: NavItem[] = [
  { label: "Notre accompagnement", shortLabel: "Accompagnement", path: "/mission" },
  {
    label: "Nos villes",
    shortLabel: "Villes",
    path: "/nos-villes",
    children: [
      { label: "Toutes les villes", path: "/nos-villes" },
      { label: "Karmiel", path: "/karmiel" },
      { label: "Haïfa", path: "/haifa" },
      { label: "Jérusalem", path: "/jerusalem" },
      { label: "Nof HaGalil", path: "/nof-hagalil" },
      { label: "Netivot", path: "/netivot" },
      { label: "Ashdod", path: "/ashdod" },
      { label: "Bat Yam", path: "/bat-yam" },
    ],
  },
  { label: "Préparer mon Alya", shortLabel: "Préparer", path: "/preparer-mon-alya" },
  { label: "Témoignages", path: "/temoignages-videos" },
  {
    label: "À propos",
    path: "/lequipe",
    children: [
      { label: "L'équipe", path: "/lequipe" },
      { label: "Partenaires", path: "/partenaires" },
      { label: "Blog", path: "/blog" },
    ],
  },
];

/**
 * Liens footer — liste plate, facile à scanner.
 */
export const footerNav: NavItem[] = [
  { label: "Accueil", path: "/" },
  { label: "Accompagnement", path: "/mission" },
  { label: "Nos villes", path: "/nos-villes" },
  { label: "Préparer mon Alya", path: "/preparer-mon-alya" },
  { label: "Témoignages", path: "/temoignages-videos" },
  { label: "L'équipe", path: "/lequipe" },
  { label: "Partenaires", path: "/partenaires" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/nous-contacter" },
];

export const mobileNav: NavItem[] = [
  { label: "Accueil", path: "/" },
  { label: "Accompagnement", path: "/mission" },
  {
    label: "Nos villes",
    path: "/nos-villes",
    children: [
      { label: "Karmiel", path: "/karmiel" },
      { label: "Haïfa", path: "/haifa" },
      { label: "Jérusalem", path: "/jerusalem" },
      { label: "Nof HaGalil", path: "/nof-hagalil" },
      { label: "Netivot", path: "/netivot" },
      { label: "Ashdod", path: "/ashdod" },
      { label: "Bat Yam", path: "/bat-yam" },
    ],
  },
  { label: "Préparer mon Alya", path: "/preparer-mon-alya" },
  { label: "Témoignages", path: "/temoignages-videos" },
  {
    label: "À propos",
    path: "/lequipe",
    children: [
      { label: "L'équipe", path: "/lequipe" },
      { label: "Partenaires", path: "/partenaires" },
      { label: "Blog", path: "/blog" },
    ],
  },
];
