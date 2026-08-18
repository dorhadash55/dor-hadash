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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const count = images.length;
  const isBanner = variant === "banner";
  const current = images[index];

  const scrollTo = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el || count === 0) return;
    const next = ((i % count) + count) % count;
    const slideW = el.clientWidth;
    el.scrollTo({ left: next * slideW, behavior: "smooth" });
    setIndex(next);
  }, [count]);

  const prev = useCallback(() => scrollTo(index - 1), [index, scrollTo]);
  const next = useCallback(() => scrollTo(index + 1), [index, scrollTo]);

  useEffect(() => {
    setIndex(0);
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [images]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const w = el.clientWidth || 1;
        const i = Math.round(el.scrollLeft / w);
        setIndex((cur) => (i !== cur && i >= 0 && i < count ? i : cur));
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) {
        if (e.key === "Escape") setLightbox(false);
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
        return;
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, lightbox]);

  useEffect(() => {
    if (!lightbox) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  if (count === 0 || !current) return null;

  const fitOf = (img: CityGalleryImage) => img.fit ?? "cover";

  return (
    <section
      className={isBanner ? "relative w-full" : "mt-2"}
      aria-roledescription="carousel"
      aria-label={title}
    >
      {!isBanner && (
        <>
          <h2 className="font-heading text-2xl font-semibold text-brand-blue-deep">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
        </>
      )}

      <div
        className={`overflow-hidden bg-gray-100 shadow-sm ring-1 ring-black/5 ${
          isBanner ? "rounded-none" : "mt-6 rounded-xl sm:rounded-2xl"
        }`}
      >
        <div
          ref={scrollerRef}
          className="city-gallery-track flex h-[min(68dvh,640px)] w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain"
        >
          {images.map((image, i) => {
            const contain = fitOf(image) === "contain";
            return (
              <div
                key={image.src}
                className={`relative h-full w-full min-w-full shrink-0 basis-full snap-center snap-always ${
                  contain ? "bg-white" : "bg-brand-blue-deep"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setIndex(i);
                    setLightbox(true);
                  }}
                  className="block h-full w-full cursor-zoom-in"
                  aria-label={`Agrandir : ${image.caption}`}
                >
                  <img
                    src={image.src}
                    alt={image.caption}
                    width={1280}
                    height={720}
                    draggable={false}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={`pointer-events-none h-full w-full select-none ${
                      contain ? "object-contain object-center" : "object-cover object-center"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-200 bg-white px-3 py-3 sm:px-5 sm:py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-heading text-sm font-semibold text-brand-blue-deep sm:text-base">
                {current.caption}
              </p>
              <p className="mt-0.5 text-xs text-gray-400">
                Glissez pour parcourir · appuyez pour agrandir
              </p>
            </div>
            <p className="shrink-0 pt-0.5 text-xs font-medium tabular-nums text-gray-500">
              {index + 1} / {count}
            </p>
          </div>

          {count > 1 && (
            <div className="mt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prev}
                className="flex h-11 min-w-[44px] items-center justify-center gap-1 rounded-full bg-brand-blue-deep px-4 text-sm font-medium text-white"
                aria-label="Image précédente"
              >
                <ChevronLeft />
                <span className="hidden sm:inline">Précédent</span>
              </button>
              <div className="flex max-w-[40%] flex-wrap justify-center gap-1.5">
                {images.map((image, i) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => scrollTo(i)}
                    aria-label={`Aller à l'image ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2.5 rounded-full transition-all ${
                      i === index ? "w-7 bg-brand-blue" : "w-2.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                className="flex h-11 min-w-[44px] items-center justify-center gap-1 rounded-full bg-brand-blue-deep px-4 text-sm font-medium text-white"
                aria-label="Image suivante"
              >
                <span className="hidden sm:inline">Suivant</span>
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-black/92"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setLightbox(false)}
        >
          <div className="flex items-center justify-between gap-3 px-3 py-3 text-white sm:px-5">
            <p className="min-w-0 truncate text-sm font-medium">{current.caption}</p>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="shrink-0 rounded-full bg-white/15 px-4 py-2 text-sm font-medium hover:bg-white/25"
            >
              Fermer
            </button>
          </div>
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-1 pb-4 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={current.src} alt={current.caption} className="max-h-full max-w-full object-contain" />
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-blue-deep shadow-lg sm:left-4"
                  aria-label="Image précédente"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-blue-deep shadow-lg sm:right-4"
                  aria-label="Image suivante"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>
          <p className="pb-4 text-center text-xs text-white/70">
            {index + 1} / {count}
          </p>
        </div>
      )}
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
