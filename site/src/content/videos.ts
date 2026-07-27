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
  temoignage: "Témoignage d'olé",
  programme: "Présentation du programme",
  autre: "Autre vidéo",
};

export function getVideoCategory(video: Pick<VideoTestimonial, "category">): VideoCategory {
  return video.category ?? "temoignage";
}

// Vide pour l'instant : les vraies vidéos seront ajoutées depuis l'admin Firebase.
export const videoTestimonials: VideoTestimonial[] = [];
