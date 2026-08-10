import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { campaignVisuals, type CampaignVisual } from "../content/homepage";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function CampaignLightbox({
  visual,
  onClose,
}: {
  visual: CampaignVisual;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("campaign-lightbox-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("campaign-lightbox-open");
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={visual.title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-lg text-white hover:bg-white/25 sm:right-6"
        aria-label="Fermer l'affiche"
      >
        ✕
      </button>
      <img
        src={visual.src}
        alt={visual.alt}
        className="max-h-[min(92svh,920px)] max-w-full object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body,
  );
}

export default function CampaignVisuals() {
  const [active, setActive] = useState<CampaignVisual | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#f3f0ea] py-10 sm:py-14">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-brand-teal/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-brand-blue/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal variant="blur">
          <SectionHeading
            label="Nos programmes"
            title="En un coup d'œil"
            description="Trois affiches pour comprendre Dor Hadash : l'incubateur d'Alya, l'accompagnement 360°, et la réussite scolaire des enfants."
          />
        </Reveal>

        <div className="mt-8 -mx-4 flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2 scrollbar-hide sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
          {campaignVisuals.map((visual, i) => (
            <Reveal
              key={visual.id}
              delay={i * 90}
              variant="scale"
              className="w-[78vw] max-w-[20rem] shrink-0 snap-center sm:w-auto sm:max-w-none sm:snap-align-none"
            >
              <button
                type="button"
                onClick={() => setActive(visual)}
                className="group block w-full text-left transition-transform active:scale-[0.99]"
                aria-label={`Agrandir : ${visual.title}`}
              >
                <span className="block overflow-hidden rounded-xl bg-white shadow-[0_12px_40px_-18px_rgba(15,40,80,0.45)] ring-1 ring-brand-blue/10 transition-shadow group-hover:shadow-[0_18px_48px_-16px_rgba(15,40,80,0.5)]">
                  <img
                    src={visual.src}
                    alt={visual.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] sm:aspect-[4/5]"
                  />
                </span>
                <span className="mt-3 block font-heading text-sm font-semibold text-brand-blue-deep sm:text-base">
                  {visual.title}
                </span>
                <span className="mt-0.5 block text-xs text-brand-teal sm:text-sm">Agrandir →</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && <CampaignLightbox visual={active} onClose={() => setActive(null)} />}
    </section>
  );
}
