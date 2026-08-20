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
    <section className="section-shell bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal variant="blur">
          <SectionHeading
            label="Paroles d'olim"
            title="Ils en parlent"
            action={
              <Link to="/temoignages-videos" className="btn-outline">
                Voir tout →
              </Link>
            }
          />
        </Reveal>

        <div className="mt-5 -mx-4 flex gap-2.5 overflow-x-auto snap-x snap-mandatory px-4 pb-2 scrollbar-hide sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
          {preview.map((v, i) => (
            <Reveal
              key={v.id}
              delay={i * 70}
              variant="scale"
              className="w-[72vw] max-w-[16rem] shrink-0 snap-center sm:w-auto sm:max-w-none sm:snap-align-none"
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
