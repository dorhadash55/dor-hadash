export type VideoTestimonial = {
  id: string;
  youtubeId: string;
  title: string;
  caption: string;
};

// Vide pour l'instant : les vraies vidéos seront ajoutées ici (puis depuis l'admin Firebase).
// Pour tester en local, ajoutez un objet ici avec un youtubeId réel, ex: { id: "1", youtubeId: "dQw4w9WgXcQ", title: "...", caption: "..." }
export const videoTestimonials: VideoTestimonial[] = [];
