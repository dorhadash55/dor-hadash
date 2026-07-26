import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
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
  const [lightbox, setLightbox] = useState(false);
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

  const current = images[index];
  const fitOf = (img: CityGalleryImage) => img.fit ?? "cover";
  const isContain = Boolean(current && fitOf(current) === "contain");
  const isDocumentGallery = !isBanner && images.some((img) => fitOf(img) === "contain");

  // Bannière : autoplay rapide. Documents texte : pas d'autoplay (lecture).
  useEffect(() => {
    if (count <= 1 || paused || isDocumentGallery) return;
    const id = window.setInterval(() => goTo(index + 1), isBanner ? 3500 : 4500);
    return () => window.clearInterval(id);
  }, [count, paused, index, goTo, isBanner, isDocumentGallery]);

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

  const onSwipe = {
    onTouchStart: (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0]?.clientX ?? null;
    },
    onTouchEnd: (e: TouchEvent) => {
      if (touchStartX.current == null) return;
      const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(delta) < 40) return;
      if (delta > 0) prev();
      else next();
    },
  };

  // —— Bannière photos paysage ——
  if (isBanner) {
    return (
      <section
        className="relative w-full bg-brand-blue-deep"
        aria-roledescription="carousel"
        aria-label={title}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        {...onSwipe}
      >
        <div className="relative h-[52vw] min-h-[220px] max-h-[280px] w-full overflow-hidden sm:h-[42vw] sm:min-h-[320px] sm:max-h-[440px] lg:max-h-[500px]">
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
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-11 pt-12 sm:px-8 sm:pb-12">
                <figcaption className="font-heading text-base font-semibold text-white sm:text-xl">
                  {image.caption}
                </figcaption>
              </div>
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
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-blue-deep shadow-md sm:right-3 sm:h-11 sm:w-11"
                aria-label="Photo suivante"
              >
                <ChevronRight />
              </button>
              <Dots images={images} index={index} goTo={goTo} light />
            </>
          )}
        </div>
      </section>
    );
  }

  // —— Section bas de page (plaquettes / slides texte lisibles) ——
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

      <div className="mt-6 overflow-hidden rounded-xl bg-gray-100 shadow-sm ring-1 ring-black/5 sm:rounded-2xl">
        <div className="relative bg-white" {...onSwipe}>
          {/* Image pleine largeur, hauteur naturelle — texte le plus grand possible */}
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="block w-full cursor-zoom-in text-left"
            aria-label={`Agrandir : ${current.caption}`}
          >
            <img
              key={current.src}
              src={current.src}
              alt={current.caption}
              width={1280}
              height={720}
              loading="eager"
              decoding="async"
              className={
                isContain
                  ? "mx-auto max-h-[min(78vh,920px)] w-full object-contain object-top bg-white"
                  : "h-auto max-h-[min(70vh,720px)] w-full object-cover"
              }
            />
          </button>
        </div>

        {/* Contrôles sous l'image — ne masquent jamais le texte */}
        <div className="border-t border-gray-200 bg-white px-3 py-3 sm:px-5 sm:py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-heading text-sm font-semibold text-brand-blue-deep sm:text-base">
                {current.caption}
              </p>
              <p className="mt-0.5 text-xs text-gray-400 sm:hidden">
                Appuyez pour agrandir · glissez pour changer
              </p>
              <p className="mt-0.5 hidden text-xs text-gray-400 sm:block">
                Cliquez pour agrandir et mieux lire le texte
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
                aria-label="Slide précédente"
              >
                <ChevronLeft />
                <span className="hidden sm:inline">Précédent</span>
              </button>

              <div className="flex flex-wrap justify-center gap-1.5">
                {images.map((image, i) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Aller à la slide ${i + 1}`}
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
                aria-label="Slide suivante"
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
            {...onSwipe}
          >
            <img
              src={current.src}
              alt={current.caption}
              className="max-h-full max-w-full object-contain"
            />

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-blue-deep shadow-lg sm:left-4"
                  aria-label="Slide précédente"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-blue-deep shadow-lg sm:right-4"
                  aria-label="Slide suivante"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

          <p className="pb-4 text-center text-xs text-white/70">
            {index + 1} / {count} — glissez ou utilisez les flèches
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

function Dots({
  images,
  index,
  goTo,
  light,
}: {
  images: CityGalleryImage[];
  index: number;
  goTo: (i: number) => void;
  light?: boolean;
}) {
  return (
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
              ? light
                ? "w-6 bg-white"
                : "w-6 bg-brand-blue"
              : light
                ? "w-2 bg-white/55"
                : "w-2 bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
