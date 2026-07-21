import { Link } from "react-router-dom";
import { useSiteInfo } from "../content/useSiteContent";
import { mainNav } from "../content/site";

export default function Footer() {
  const siteInfo = useSiteInfo();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-blue-deep text-white pb-[calc(6rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-teal via-brand-blue-light to-brand-coral" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/images/logo.png" alt="Dor Hadash" className="mb-4 h-12 w-auto rounded bg-white/95 p-1" />
          <p className="text-sm leading-relaxed text-white/70">
            Incubateur d'Alya francophone — accompagner les francophones dans leur intégration en Israël.
          </p>
        </div>

        <div>
          <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal mb-4">Navigation</h3>
          <ul className="space-y-2.5 text-sm">
            {mainNav.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-white/80 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal mb-4">Contact</h3>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li>
              <a href={`mailto:${siteInfo.email}`} className="transition-colors hover:text-white">
                {siteInfo.email}
              </a>
            </li>
            <li>Israël : {siteInfo.phones.israel.join(" · ")}</li>
            <li>France : {siteInfo.phones.france.join(" · ")}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-accent text-xs uppercase tracking-[0.2em] text-brand-teal mb-4">Suivez-nous</h3>
          <a
            href={siteInfo.social.facebook}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 transition-colors hover:border-white/40 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
            </svg>
            Facebook
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center font-accent text-xs tracking-wide text-white/45">
        © {year} Dor Hadash — Tous droits réservés
      </div>
    </footer>
  );
}
