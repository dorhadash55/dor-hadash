import { useMemo, useState } from "react";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../admin/hooks/useAdminContent";
import {
  getVideoCategory,
  videoCategoryLabels,
  type VideoCategory,
} from "../content/videos";

const FILTERS: Array<{ id: "all" | VideoCategory; label: string }> = [
  { id: "all", label: "Toutes" },
  { id: "temoignage", label: "Témoignages" },
  { id: "programme", label: "Le programme" },
  { id: "autre", label: "Autres" },
];

export default function TemoignagesVideos() {
  const videos = useVideos();
  const [filter, setFilter] = useState<"all" | VideoCategory>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return videos;
    return videos.filter((v) => getVideoCategory(v) === filter);
  }, [videos, filter]);

  const grouped = useMemo(() => {
    const order: VideoCategory[] = ["temoignage", "programme", "autre"];
    return order
      .map((category) => ({
        category,
        label: videoCategoryLabels[category],
        items: videos.filter((v) => getVideoCategory(v) === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [videos]);

  return (
    <>
      <SeoHead />
      <PageBanner
        title="Paroles d'olim"
        subtitle="Témoignages, présentation du programme Dor Hadash et autres contenus pour préparer votre Alya."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        {videos.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === item.id
                      ? "bg-brand-blue text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {filter === "all" ? (
              <div className="mt-10 space-y-12">
                {grouped.map((group) => (
                  <div key={group.category}>
                    <h2 className="font-heading text-xl font-semibold text-brand-blue-deep">
                      {group.label}
                    </h2>
                    <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                      {group.items.map((v) => (
                        <VideoCard key={v.id} video={v} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((v) => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </div>
            )}

            {filter !== "all" && filtered.length === 0 && (
              <p className="mt-10 text-center text-gray-500">Aucune vidéo dans cette catégorie pour le moment.</p>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-14 text-center text-gray-500">
            Les premières vidéos arrivent bientôt — ajoutez-les depuis l'espace admin.
          </div>
        )}
      </section>
    </>
  );
}
