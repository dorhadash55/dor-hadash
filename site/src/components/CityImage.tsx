import type { City } from "../content/cities";

// Pour les villes sans photo réelle (contenu en brouillon), on affiche un
// visuel neutre plutôt qu'une photo d'une autre ville qui induirait en erreur.
export default function CityImage({ city, className }: { city: City; className?: string }) {
  if (!city.image) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-brand-blue to-brand-blue-light text-white ${className ?? ""}`}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-80">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return <img src={city.image} alt={city.name} loading="lazy" className={`object-cover ${className ?? ""}`} />;
}
