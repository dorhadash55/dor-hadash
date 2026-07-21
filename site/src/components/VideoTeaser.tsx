import { Link } from "react-router-dom";
import { useVideos } from "../admin/hooks/useAdminContent";
import VideoCard from "./VideoCard";

export default function VideoTeaser() {
  const videoTestimonials = useVideos();
  const preview = videoTestimonials.slice(0, 3);

  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-teal">
              Ils témoignent
            </span>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-blue-deep sm:text-4xl">
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
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
            Les premiers témoignages vidéo arrivent bientôt.
          </div>
        )}
      </div>
    </section>
  );
}
