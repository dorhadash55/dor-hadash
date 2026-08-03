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
  path: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: "Accueil", path: "/" },
  { label: "Mission", path: "/mission" },
  { label: "L'équipe", path: "/lequipe" },
  { label: "Partenaires", path: "/partenaires" },
  {
    label: "Nos Villes",
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
  { label: "Paroles d'olim", path: "/temoignages-videos" },
  { label: "Blog", path: "/blog" },
  { label: "Nous Contacter", path: "/nous-contacter" },
];
