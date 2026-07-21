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

  return (
    <section className="section-shell bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            label="Ils témoignent"
            title="La parole aux olim"
            action={
              <Link to="/temoignages-videos" className="btn-outline">
                Tous les témoignages →
              </Link>
            }
          />
        </Reveal>

        {preview.length > 0 ? (
          <Reveal delay={100}>
            <div className="mt-10 flex flex-wrap justify-start gap-4">
              {preview.map((v) => (
                <div key={v.id} className="w-40 sm:w-48">
                  <VideoTeaserCard video={v} onPlay={() => setActiveVideo(v)} />
                </div>
              ))}
            </div>
          </Reveal>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-brand-sand bg-brand-cream p-10 text-center text-gray-500">
            Les premiers témoignages vidéo arrivent bientôt.
          </div>
        )}
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
