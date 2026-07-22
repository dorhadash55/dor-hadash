import type { City } from "../content/cities";
import { cardImageSrc } from "../utils/images";

type CityImageProps = {
  city: City;
  className?: string;
  /** Cartes homepage / liste — fichier *-card.jpg plus léger */
  variant?: "full" | "card";
  /** Hero ou première image visible */
  priority?: boolean;
};

export default function CityImage({
  city,
  className,
  variant = "full",
  priority = false,
}: CityImageProps) {
  if (!city.image) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-brand-blue to-brand-blue-light text-white ${className ?? ""}`}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-80"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11Z"
          />
          <circle cx="12" cy="10" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  const src = variant === "card" ? cardImageSrc(city.image) : city.image;

  return (
    <img
      src={src}
      alt={city.name}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      sizes={
        variant === "card"
          ? "(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 400px"
          : "(max-width: 768px) 100vw, 1280px"
      }
      className={`object-cover ${className ?? ""}`}
    />
  );
}
