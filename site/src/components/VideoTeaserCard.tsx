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
      className="group w-full text-left transition-transform hover:-translate-y-0.5"
    >
      <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-shadow group-hover:shadow-md">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-blue-deep">
          <img
            src={youtubeThumbnailUrl(video.youtubeId)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-brand-blue shadow-md transition-transform group-hover:scale-105">
              <svg className="ml-0.5 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="p-2.5">
          <h3 className="font-heading text-xs font-semibold leading-snug text-brand-blue-deep line-clamp-2">
            {video.title}
          </h3>
        </div>
      </div>
    </button>
  );
}
