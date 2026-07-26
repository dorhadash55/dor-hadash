import { useCallback, useEffect, useRef, useState } from "react";
import type { CityGalleryImage } from "../content/cities";

type Props = {
  images: CityGalleryImage[];
  title?: string;
  subtitle?: string;
  variant?: "banner" | "section";
};

export default function CityGalleryCarousel({
  images,
  title = "Galerie",
  subtitle,
  variant = "banner",
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = images.length;
  const isBanner = variant === "banner";

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
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = window.setInterval(() => goTo(index + 1), isBanner ? 3500 : 4500);
    return () => window.clearInterval(id);
  }, [count, paused, index, goTo, isBanner]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  if (count === 0) return null;

  const current = images[index];
  const fitOf = (img: CityGalleryImage) => img.fit ?? "cover";
  const isContain = fitOf(current) === "contain";

  const carousel = (
    <div
      className={
        isBanner
          ? "relative w-full overflow-hidden"
          : "relative w-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 sm:rounded-2xl"
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
          isContain
            ? "relative aspect-[16/9] w-full bg-white"
            : isBanner
              ? "relative h-[52vw] min-h-[220px] max-h-[280px] w-full bg-brand-blue-deep sm:h-[42vw] sm:min-h-[320px] sm:max-h-[440px] lg:max-h-[500px]"
              : "relative aspect-[16/10] w-full bg-brand-blue-deep sm:aspect-[16/9]"
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
              width={1280}
              height={720}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className={`h-full w-full ${
                fitOf(image) === "contain" ? "object-contain bg-white" : "object-cover object-center"
              }`}
            />
            {fitOf(image) !== "contain" && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-11 pt-12 sm:px-8 sm:pb-12">
                <figcaption className="font-heading text-base font-semibold text-white sm:text-xl">
                  {image.caption}
                </figcaption>
              </div>
            )}
          </figure>
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-blue-deep shadow-md sm:left-3 sm:h-11 sm:w-11"
              aria-label="Photo précédente"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-blue-deep shadow-md sm:right-3 sm:h-11 sm:w-11"
              aria-label="Photo suivante"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5 sm:gap-2">
              {images.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Aller à la photo ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? isContain
                        ? "w-6 bg-brand-blue"
                        : "w-6 bg-white"
                      : isContain
                        ? "w-2 bg-gray-300"
                        : "w-2 bg-white/55"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {isContain && (
        <div className="flex items-center justify-between gap-3 border-t border-gray-100 bg-white px-4 py-3">
          <p className="min-w-0 flex-1 text-sm font-medium text-brand-blue-deep">{current.caption}</p>
          <p className="shrink-0 text-xs text-gray-400">
            {index + 1} / {count}
          </p>
        </div>
      )}
    </div>
  );

  if (isBanner) {
    return (
      <section
        className="relative w-full bg-brand-blue-deep"
        aria-roledescription="carousel"
        aria-label={title}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {carousel}
      </section>
    );
  }

  return (
    <section
      className="mt-14 border-t border-gray-100 pt-12"
      aria-roledescription="carousel"
      aria-label={title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 className="font-heading text-2xl font-semibold text-brand-blue-deep">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
      <div className="mt-6">{carousel}</div>
      <p className="mt-3 text-center text-xs text-gray-400 sm:hidden">Glissez pour changer de photo</p>
    </section>
  );
}
