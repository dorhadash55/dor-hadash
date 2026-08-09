import { useEffect } from "react";
import { createPortal } from "react-dom";
import { extractYoutubeId, youtubeEmbedUrl } from "../admin/utils/youtube";

export default function VideoModal({
  youtubeId,
  title,
  onClose,
}: {
  youtubeId: string;
  title: string;
  onClose: () => void;
}) {
  const id = extractYoutubeId(youtubeId) ?? youtubeId.trim();

  useEffect(() => {
    if (!id) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("video-modal-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("video-modal-open");
    };
  }, [id, onClose]);

  if (typeof document === "undefined" || !id) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Largeur plafonnée par la hauteur dispo → 16:9 intact en portrait ET paysage */}
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-black shadow-2xl sm:rounded-2xl"
        style={{ width: "min(100%, 48rem, calc((100svh - 7.5rem) * 16 / 9))" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5 sm:px-4">
          <p className="min-w-0 truncate text-sm font-medium text-white/90">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg text-white hover:bg-white/25"
            aria-label="Fermer la vidéo"
          >
            ✕
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            className="absolute inset-0 h-full w-full border-0"
            src={youtubeEmbedUrl(id, { autoplay: true })}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            loading="eager"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
