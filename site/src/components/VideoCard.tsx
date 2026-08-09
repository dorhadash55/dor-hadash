import { useState } from "react";
import type { VideoTestimonial } from "../content/videos";
import { getVideoCategory, videoCategoryLabels } from "../content/videos";
import { youtubeThumbnailUrl } from "../admin/utils/youtube";
import VideoModal from "./VideoModal";

export default function VideoCard({ video }: { video: VideoTestimonial }) {
  const [active, setActive] = useState(false);
  const category = getVideoCategory(video);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group relative block aspect-video w-full overflow-hidden bg-brand-blue-deep text-left active:opacity-95"
          aria-label={`Lire : ${video.title}`}
        >
          <img
            src={youtubeThumbnailUrl(video.youtubeId)}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-brand-blue shadow-lg transition-transform group-hover:scale-105 group-active:scale-95">
              <svg className="ml-1 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </button>
        <div className="p-4 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-teal">
            {videoCategoryLabels[category]}
          </p>
          <h3 className="mt-1 font-heading text-[0.95rem] font-semibold leading-snug text-brand-blue-deep [overflow-wrap:anywhere] sm:text-base">
            {video.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 [overflow-wrap:anywhere]">{video.caption}</p>
        </div>
      </div>

      {active && (
        <VideoModal
          youtubeId={video.youtubeId}
          title={video.title}
          onClose={() => setActive(false)}
        />
      )}
    </>
  );
}
