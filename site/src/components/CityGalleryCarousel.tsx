import { useCallback, useEffect, useRef, useState } from "react";
import type { CityGalleryImage } from "../content/cities";

type Props = {
  images: CityGalleryImage[];
  title?: string;
  /** Bannière pleine largeur sous le titre (défaut) ou section avec titres */
  variant?: "banner" | "section";
};

export default function CityGalleryCarousel({
  images,
  title = "Galerie",
  variant = "banner",
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = images.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = window.setInterval(() => goTo(index + 1), 3000);
    return () => window.clearInterval(id);
  }, [count, paused, index, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  if (count === 0) return null;

  const isBanner = variant === "banner";

  return (
    <section
      className={isBanner ? "relative w-full bg-brand-blue-deep" : "bg-brand-cream"}
      aria-roledescription="carousel"
      aria-label={title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={
          isBanner
            ? "relative w-full"
            : "mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14"
        }
      >
        <div
          className={
            isBanner
              ? "relative w-full overflow-hidden"
              : "relative overflow-hidden rounded-2xl bg-brand-blue-deep shadow-lg ring-1 ring-black/5 sm:rounded-3xl"
          }
          onTouchStart={(e) => {
            touchStartX.current = e.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current == null) return;
            const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(delta) < 40) return;
            if (delta > 0) prev();
            else next();
          }}
        >
          <div
            className={
              isBanner
                ? "relative aspect-[16/10] w-full max-h-[42vh] sm:aspect-[16/9] sm:max-h-[420px] lg:max-h-[480px]"
                : "relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9] lg:max-h-[560px]"
            }
          >
            {images.map((image, i) => (
              <figure
                key={image.src}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  i === index ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={i !== index}
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-12 pt-14 sm:px-8 sm:pb-14">
                  <figcaption className="mx-auto max-w-7xl font-heading text-sm font-semibold text-white sm:text-lg lg:text-xl">
                    {image.caption}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-blue-deep shadow-md backdrop-blur transition hover:bg-white sm:left-4 sm:h-11 sm:w-11"
                aria-label="Photo précédente"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-blue-deep shadow-md backdrop-blur transition hover:bg-white sm:right-4 sm:h-11 sm:w-11"
                aria-label="Photo suivante"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="absolute bottom-3 left-0 right-0 z-10 flex items-center justify-center gap-2 sm:bottom-4">
                {images.map((image, i) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Aller à la photo ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              <p className="absolute right-3 top-3 z-10 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur sm:right-5 sm:top-4">
                {index + 1} / {count}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
