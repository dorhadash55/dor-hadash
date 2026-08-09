import { useMemo, useState } from "react";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
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

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        {videos.length > 0 ? (
          <>
            <Reveal>
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
                {FILTERS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition min-h-11 ${
                      filter === item.id
                        ? "bg-brand-blue text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </Reveal>

            {filter === "all" ? (
              <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
                {grouped.map((group, gi) => (
                  <div key={group.category}>
                    <Reveal delay={gi * 80} variant="up">
                      <h2 className="font-heading text-xl font-semibold text-brand-blue-deep">
                        {group.label}
                      </h2>
                    </Reveal>
                    <div className="mt-4 grid gap-5 sm:mt-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                      {group.items.map((v, i) => (
                        <Reveal key={v.id} delay={i * 70} variant="scale">
                          <VideoCard video={v} />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                {filtered.map((v, i) => (
                  <Reveal key={v.id} delay={i * 70} variant="scale">
                    <VideoCard video={v} />
                  </Reveal>
                ))}
              </div>
            )}

            {filter !== "all" && filtered.length === 0 && (
              <p className="mt-10 text-center text-gray-500">Aucune vidéo dans cette catégorie pour le moment.</p>
            )}
          </>
        ) : (
          <Reveal>
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-14 text-center text-gray-500">
              Les premières vidéos arrivent bientôt — ajoutez-les depuis l'espace admin.
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}
