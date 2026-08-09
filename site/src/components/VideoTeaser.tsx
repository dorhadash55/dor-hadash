import { useState } from "react";
import { Link } from "react-router-dom";
import { useVideos } from "../admin/hooks/useAdminContent";
import type { VideoTestimonial } from "../content/videos";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import VideoModal from "./VideoModal";
import VideoTeaserCard from "./VideoTeaserCard";

export default function VideoTeaser() {
  const videoTestimonials = useVideos();
  const preview = videoTestimonials.slice(0, 3);
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  // Pas de section vide qui allonge le scroll mobile
  if (preview.length === 0) return null;

  return (
    <section className="section-shell bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal variant="blur">
          <SectionHeading
            label="Paroles d'olim"
            title="Témoignages et programme"
            action={
              <Link to="/temoignages-videos" className="btn-outline">
                Voir tout →
              </Link>
            }
          />
        </Reveal>

        <div className="mt-8 -mx-4 flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-3 scrollbar-hide sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {preview.map((v, i) => (
            <Reveal
              key={v.id}
              delay={i * 100}
              variant="scale"
              className="w-[78vw] max-w-[18.5rem] shrink-0 snap-center sm:w-auto sm:max-w-none sm:snap-align-none"
            >
              <VideoTeaserCard video={v} onPlay={() => setActiveVideo(v)} />
            </Reveal>
          ))}
        </div>
      </div>

      {activeVideo && (
        <VideoModal
          youtubeId={activeVideo.youtubeId}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}
