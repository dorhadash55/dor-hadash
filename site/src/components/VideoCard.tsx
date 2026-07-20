import type { VideoTestimonial } from "../content/videos";

export default function VideoCard({ video }: { video: VideoTestimonial }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="aspect-video w-full bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-5">
        <h3 className="font-heading text-base font-semibold text-brand-blue-deep">{video.title}</h3>
        <p className="mt-1 text-sm text-gray-600">{video.caption}</p>
      </div>
    </div>
  );
}
