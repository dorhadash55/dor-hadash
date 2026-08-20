import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../admin/hooks/useAdminContent";
import { writtenTestimonials } from "../content/testimonials";
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
  const [showAllQuotes, setShowAllQuotes] = useState(false);

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

  const mobileQuotes = showAllQuotes ? writtenTestimonials : writtenTestimonials.slice(0, 2);

  return (
    <>
      <SeoHead />
      <PageBanner
        title="Témoignages"
        subtitle="Vidéos et retours d'olim pour vous projeter dans votre Alya."
      />

      <section id="videos" className="relative scroll-mt-24 overflow-hidden bg-[#f7f5f0]">
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
          <Reveal>
            <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-[#168a78]">
              En vidéo
            </p>
            <h2 className="mt-2 font-heading text-[1.45rem] font-semibold leading-snug text-brand-blue-deep sm:text-3xl">
              Voir et entendre le programme
            </h2>
          </Reveal>

          {videos.length > 0 ? (
            <>
              <div
                className="mt-5 flex gap-1 overflow-x-auto border-b border-brand-blue/10 pb-px scrollbar-hide sm:mt-8"
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
                        active ? "text-brand-blue-deep" : "text-gray-500 hover:text-brand-blue"
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

              {filter === "all" ? (
                <div className="mt-6 space-y-10 sm:mt-10 sm:space-y-14">
                  {grouped.map((group) => (
                    <div key={group.category}>
                      <div className="mb-4 sm:mb-6">
                        <h3 className="font-heading text-lg font-semibold text-brand-blue-deep sm:text-2xl">
                          {group.title}
                        </h3>
                        <p className="mt-0.5 hidden text-sm text-gray-600 sm:block">{group.lead}</p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        {group.items.map((v) => (
                          <VideoCard key={v.id} video={v} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length > 0 ? (
                <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                  {filtered.map((v) => (
                    <VideoCard key={v.id} video={v} />
                  ))}
                </div>
              ) : (
                <p className="mt-8 rounded-2xl bg-white/70 px-6 py-10 text-center text-sm text-gray-500 ring-1 ring-brand-sand">
                  Aucune vidéo dans cette catégorie pour le moment.
                </p>
              )}
            </>
          ) : (
            <div className="mt-6 rounded-2xl bg-white px-6 py-10 text-center ring-1 ring-brand-sand">
              <p className="font-heading text-lg font-semibold text-brand-blue-deep">
                Les vidéos arrivent bientôt
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
                En attendant, les témoignages écrits ci-dessous donnent déjà une idée du parcours.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
          <Reveal>
            <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-[#168a78]">
              En quelques mots
            </p>
            <h2 className="mt-2 font-heading text-[1.45rem] font-semibold text-brand-blue-deep sm:text-3xl">
              Ils en parlent
            </h2>
          </Reveal>

          <div className="mt-5 space-y-3 sm:hidden">
            {mobileQuotes.map((t) => (
              <blockquote key={`${t.prenom}-${t.ville}`} className="rounded-xl border border-brand-sand bg-brand-cream/40 p-4">
                <p className="font-accent text-[10px] uppercase tracking-[0.16em] text-brand-teal">{t.theme}</p>
                <p className="mt-2 text-sm leading-snug text-gray-700 line-clamp-4">« {t.quote} »</p>
                <footer className="mt-3 text-xs text-gray-500">
                  <span className="font-semibold text-brand-blue-deep">{t.prenom}</span>
                  {" · "}
                  {t.ville} · Alya {t.annee}
                </footer>
              </blockquote>
            ))}
            {writtenTestimonials.length > 2 && (
              <button
                type="button"
                onClick={() => setShowAllQuotes((v) => !v)}
                className="w-full py-2.5 text-center text-sm font-semibold text-brand-blue"
              >
                {showAllQuotes ? "Réduire" : `Lire les ${writtenTestimonials.length - 2} autres témoignages`}
              </button>
            )}
          </div>

          <div className="mt-8 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {writtenTestimonials.map((t) => (
              <blockquote
                key={`${t.prenom}-${t.ville}-${t.annee}`}
                className="flex h-full flex-col rounded-2xl border border-brand-sand bg-brand-cream/40 p-6"
              >
                <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-brand-teal">{t.theme}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">« {t.quote} »</p>
                <footer className="mt-5 border-t border-brand-sand pt-4">
                  <p className="font-heading text-base font-semibold text-brand-blue-deep">{t.prenom}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {t.situation} · {t.ville} · Alya {t.annee}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-sand bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6 sm:py-12">
          <p className="font-heading text-lg font-semibold text-brand-blue-deep sm:text-xl">
            Une question sur votre projet ?
          </p>
          <Link
            to="/nous-contacter?objet=entretien"
            className="mt-5 inline-flex rounded-full bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-brand-blue-dark"
          >
            Demander un premier entretien
          </Link>
        </div>
      </section>
    </>
  );
}
