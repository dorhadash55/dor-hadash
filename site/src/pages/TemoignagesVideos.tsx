import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../admin/hooks/useAdminContent";
import {
  getVideoCategory,
  type VideoCategory,
} from "../content/videos";

const FILTERS: Array<{ id: "all" | VideoCategory; label: string }> = [
  { id: "all", label: "Tout voir" },
  { id: "temoignage", label: "Témoignages" },
  { id: "programme", label: "Le programme" },
  { id: "autre", label: "Autres" },
];

const SECTION_TITLES: Record<VideoCategory, { title: string; lead: string }> = {
  temoignage: {
    title: "Témoignages d'olim",
    lead: "Celles et ceux qui ont déjà fait le chemin partagent leur expérience.",
  },
  programme: {
    title: "Le programme Dor Hadash",
    lead: "Comprendre concrètement comment nous vous accompagnons.",
  },
  autre: {
    title: "Autres vidéos",
    lead: "Des contenus complémentaires pour préparer votre Alya.",
  },
};

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
        ...SECTION_TITLES[category],
        items: videos.filter((v) => getVideoCategory(v) === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [videos]);

  return (
    <>
      <SeoHead />
      <PageBanner
        title="Paroles d'olim"
        subtitle="Écoutez des olim francophones, et découvrez le programme Dor Hadash en vidéo."
      />

      <section className="relative overflow-hidden bg-[#f7f5f0]">
        <div
          className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full bg-brand-teal/10 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Reveal>
            <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
              Vidéos
            </p>
            <h2 className="mt-2 max-w-2xl font-heading text-[1.45rem] font-semibold leading-snug text-brand-blue-deep sm:text-3xl">
              Nous vous invitons à découvrir nos vidéos
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
              Témoignages, présentation du programme et autres contenus pour avancer sereinement dans votre projet
              d&apos;Alya — avant le départ comme après l&apos;arrivée.
            </p>
          </Reveal>

          {videos.length > 0 ? (
            <>
              <Reveal delay={80}>
                <div
                  className="mt-8 flex gap-1 border-b border-brand-blue/10 pb-px sm:mt-10"
                  role="tablist"
                  aria-label="Filtrer les vidéos"
                >
                  {FILTERS.map((item) => {
                    const active = filter === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setFilter(item.id)}
                        className={`relative min-h-11 shrink-0 px-3.5 py-2.5 text-sm font-medium transition sm:px-4 ${
                          active
                            ? "text-brand-blue-deep"
                            : "text-gray-500 hover:text-brand-blue"
                        }`}
                      >
                        {item.label}
                        {active && (
                          <span
                            className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-teal"
                            aria-hidden
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </Reveal>

              {filter === "all" ? (
                <div className="mt-8 space-y-12 sm:mt-10 sm:space-y-14">
                  {grouped.map((group, gi) => (
                    <div key={group.category}>
                      <Reveal delay={gi * 60} variant="up">
                        <div className="mb-5 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                          <div>
                            <h3 className="font-heading text-xl font-semibold text-brand-blue-deep sm:text-2xl">
                              {group.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">{group.lead}</p>
                          </div>
                          <p className="font-accent text-[11px] uppercase tracking-[0.18em] text-gray-400">
                            {group.items.length} vidéo{group.items.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      </Reveal>
                      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        {group.items.map((v, i) => (
                          <Reveal key={v.id} delay={i * 60} variant="scale">
                            <VideoCard video={v} />
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <Reveal>
                    <div className="mt-8 mb-5 sm:mt-10 sm:mb-6">
                      <h3 className="font-heading text-xl font-semibold text-brand-blue-deep sm:text-2xl">
                        {SECTION_TITLES[filter].title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">{SECTION_TITLES[filter].lead}</p>
                    </div>
                  </Reveal>
                  {filtered.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                      {filtered.map((v, i) => (
                        <Reveal key={v.id} delay={i * 60} variant="scale">
                          <VideoCard video={v} />
                        </Reveal>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-2xl bg-white/70 px-6 py-10 text-center text-sm text-gray-500 ring-1 ring-brand-sand">
                      Aucune vidéo dans cette catégorie pour le moment. Revenez bientôt, ou explorez les autres
                      filtres.
                    </p>
                  )}
                </>
              )}

              <Reveal delay={100}>
                <div className="mt-14 border-t border-brand-blue/10 pt-10 text-center sm:mt-16">
                  <p className="font-heading text-lg font-semibold text-brand-blue-deep sm:text-xl">
                    Une question après ces vidéos ?
                  </p>
                  <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
                    Échangeons sur votre projet — notre équipe vous répond rapidement.
                  </p>
                  <Link to="/nous-contacter" className="btn-primary mt-5 inline-flex">
                    Nous contacter
                  </Link>
                </div>
              </Reveal>
            </>
          ) : (
            <Reveal delay={60}>
              <div className="mt-10 rounded-2xl bg-white px-6 py-12 text-center ring-1 ring-brand-sand sm:px-10">
                <p className="font-heading text-lg font-semibold text-brand-blue-deep">
                  Les premières vidéos arrivent bientôt
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-600">
                  Nous préparons des témoignages d&apos;olim et des présentations du programme. En attendant,
                  parlez-nous de votre projet d&apos;Alya.
                </p>
                <Link to="/nous-contacter" className="btn-primary mt-6 inline-flex">
                  Nous contacter
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
