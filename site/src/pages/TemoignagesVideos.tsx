import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../admin/hooks/useAdminContent";

export default function TemoignagesVideos() {
  const videoTestimonials = useVideos();

  return (
    <>
      <SeoHead />
      <PageBanner
        title="Témoignages"
        subtitle="Des olim accompagnés par Dor Hadash racontent leur installation en Israël."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        {videoTestimonials.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videoTestimonials.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-14 text-center text-gray-500">
            Les premiers témoignages vidéo arrivent bientôt — ajoutez-les depuis l'espace admin.
          </div>
        )}
      </section>
    </>
  );
}
