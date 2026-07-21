import { useState } from "react";
import { Link } from "react-router-dom";
import { useVideos } from "../admin/hooks/useAdminContent";
import type { VideoTestimonial } from "../content/videos";
import VideoModal from "./VideoModal";
import VideoTeaserCard from "./VideoTeaserCard";

export default function VideoTeaser() {
  const videoTestimonials = useVideos();
  const preview = videoTestimonials.slice(0, 3);
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-teal">
              Ils témoignent
            </span>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl lg:text-4xl">
              La parole aux olim
            </h2>
          </div>
          <Link
            to="/temoignages-videos"
            className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
          >
            Voir tous les témoignages →
          </Link>
        </div>

        {preview.length > 0 ? (
          <div className="mt-8 flex flex-wrap justify-start gap-3 sm:gap-4">
            {preview.map((v) => (
              <div key={v.id} className="w-40 sm:w-44">
                <VideoTeaserCard video={v} onPlay={() => setActiveVideo(v)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
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
