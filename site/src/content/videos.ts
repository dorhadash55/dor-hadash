export type VideoCategory = "temoignage" | "programme" | "autre";

export type VideoTestimonial = {
  id: string;
  youtubeId: string;
  title: string;
  caption: string;
  /** Type de contenu — défaut témoignage pour les anciennes entrées */
  category?: VideoCategory;
};

export const videoCategoryLabels: Record<VideoCategory, string> = {
  temoignage: "Témoignage d'olim",
  programme: "Le programme",
  autre: "Autre vidéo",
};

export function getVideoCategory(video: Pick<VideoTestimonial, "category">): VideoCategory {
  return video.category ?? "temoignage";
}

/**
 * Vidéos éditoriales Dor Hadash.
 * Firebase (site/content.videos) reste la source live ; cette liste sert de socle
 * et complète les IDs absents côté Firestore.
 */
export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "yrFA6Gut1Lg",
    youtubeId: "yrFA6Gut1Lg",
    title: "Qualita & Dor Hadash",
    caption: "Quand Qualita et Dor Hadash unissent leurs forces pour accompagner les olim francophones.",
    category: "temoignage",
  },
  {
    id: "sCUoN36RAhc",
    youtubeId: "sCUoN36RAhc",
    title: "Un nouveau programme pour futurs olim à Haifa",
    caption: "Patricia Hassoun présente l'incubateur Dor Hadash à Haifa, avec la communauté du Rav Avner Ajout.",
    category: "programme",
  },
  {
    id: "2lB-J4uQHoI",
    youtubeId: "2lB-J4uQHoI",
    title: "Dor Hadash pour réussir son Alya",
    caption: "Focus Qualita #508 — le programme Dor Hadash expliqué pour préparer et réussir son Alya.",
    category: "programme",
  },
  {
    id: "52RrBzqQbRc",
    youtubeId: "52RrBzqQbRc",
    title: "L'Alya à Jérusalem avec Dor Hadash",
    caption: "Focus Qualita #531 — s'installer à Jérusalem avec l'accompagnement Dor Hadash.",
    category: "programme",
  },
  {
    id: "IOgHS9mNf24",
    youtubeId: "IOgHS9mNf24",
    title: "Karmiel, perle de Galilée",
    caption: "Vue d'ensemble de Karmiel, l'une des villes d'accueil du programme Dor Hadash.",
    category: "autre",
  },
];
