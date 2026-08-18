import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const dragRef = useRef({ x: 0, y: 0 });
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const count = images.length;
  const isBanner = variant === "banner";
  const current = images[index];

  const goTo = useCallback(
    (i: number) => {
      const el = scrollerRef.current;
      if (!el || count === 0) return;
      const next = ((i % count) + count) % count;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
      setIndex(next);
    },
    [count],
  );

  const prev = useCallback(() => goTo(index - 1), [index, goTo]);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const close = useCallback(() => setLightbox(false), []);

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
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = () => {
      if (!mq.matches) setLightbox(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, close, prev, next]);

  if (count === 0 || !current) return null;

  const fitOf = (img: CityGalleryImage) => img.fit ?? "cover";

  const canZoom = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const openIfTap = (i: number) => {
    if (!canZoom()) return;
    const { x, y } = dragRef.current;
    if (Math.abs(x) > 12 || Math.abs(y) > 12) return;
    setIndex(i);
    setLightbox(true);
  };

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
                  onPointerDown={(e) => {
                    dragRef.current = { x: e.clientX, y: e.clientY };
                  }}
                  onPointerUp={(e) => {
                    dragRef.current = {
                      x: e.clientX - dragRef.current.x,
                      y: e.clientY - dragRef.current.y,
                    };
                  }}
                  onClick={() => openIfTap(i)}
                  className="block h-full w-full lg:cursor-zoom-in"
                  aria-label={image.caption}
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
                <span className="lg:hidden">Glissez pour voir les photos suivantes</span>
                <span className="hidden lg:inline">Glissez pour parcourir · cliquez pour agrandir</span>
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
                    onClick={() => goTo(i)}
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

      {lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex flex-col bg-black"
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
          >
            <div className="flex items-center justify-between gap-3 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 text-white sm:px-5">
              <p className="min-w-0 truncate text-sm font-medium">{current.caption}</p>
              <button
                type="button"
                onClick={close}
                className="flex h-11 shrink-0 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-brand-blue-deep"
              >
                Fermer
              </button>
            </div>

            <button
              type="button"
              className="relative flex min-h-0 flex-1 items-center justify-center px-1"
              onClick={close}
              aria-label="Fermer l'image"
            >
              <img src={current.src} alt="" className="max-h-full max-w-full object-contain" />
            </button>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-blue-deep shadow-lg"
                  aria-label="Image précédente"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-blue-deep shadow-lg"
                  aria-label="Image suivante"
                >
                  <ChevronRight />
                </button>
              </>
            )}

            <p className="pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 text-center text-xs text-white/70">
              {index + 1} / {count} · appuyez n&apos;importe où ou sur Fermer
            </p>
          </div>,
          document.body,
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
