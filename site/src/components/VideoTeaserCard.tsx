import type { VideoTestimonial } from "../content/videos";
import { youtubeThumbnailUrl } from "../admin/utils/youtube";

export default function VideoTeaserCard({
  video,
  onPlay,
}: {
  video: VideoTestimonial;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group w-full text-left transition-transform hover:-translate-y-0.5 active:scale-[0.99]"
      aria-label={`Lire : ${video.title}`}
    >
      <div className="overflow-hidden rounded-2xl border border-brand-sand bg-white shadow-sm transition-shadow group-hover:shadow-md">
        <div className="relative aspect-video w-full overflow-hidden bg-brand-blue-deep">
          <img
            src={youtubeThumbnailUrl(video.youtubeId)}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-brand-blue shadow-md transition-transform group-hover:scale-105 sm:h-11 sm:w-11">
              <svg className="ml-0.5 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-heading text-sm font-semibold leading-snug text-brand-blue-deep line-clamp-2 [overflow-wrap:anywhere]">
            {video.title}
          </h3>
        </div>
      </div>
    </button>
  );
}
