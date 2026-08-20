import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCookieConsent, setCookieConsent } from "../lib/cookieConsent";

export default function CookieBanner() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);

  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener("dh-open-cookie-banner", open);
    return () => window.removeEventListener("dh-open-cookie-banner", open);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setVisible(false);
      return;
    }
    setVisible(getCookieConsent() === null);
  }, [pathname]);

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
      className="fixed inset-x-0 bottom-0 z-[45] px-3 pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:px-4 lg:bottom-4 lg:px-6 lg:pb-0"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-brand-blue/15 bg-white p-4 shadow-xl shadow-brand-blue/15 sm:p-5">
        <p id="cookie-banner-title" className="font-heading text-base font-semibold text-brand-blue-deep">
          Cookies
        </p>
        <p id="cookie-banner-text" className="mt-1.5 text-sm leading-relaxed text-gray-700">
          Ce site utilise des cookies pour fonctionner, mémoriser vos choix (ville consultée, filtres) et
          améliorer l&apos;expérience. Vous pouvez tout accepter, ou garder uniquement l&apos;essentiel.
        </p>
        {details && (
          <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-gray-500">
            <li>
              <strong className="text-gray-700">Essentiels</strong> — faire marcher le site et retenir votre
              réponse (toujours actifs).
            </li>
            <li>
              <strong className="text-gray-700">Préférences</strong> — se souvenir de la ville et des filtres
              que vous avez regardés.
            </li>
            <li>
              <strong className="text-gray-700">Mesure d&apos;audience</strong> — pages vues et clics, de façon
              anonyme, pour améliorer le site.
            </li>
          </ul>
        )}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setDetails((v) => !v)}
            className="text-left text-xs font-medium text-brand-blue hover:underline"
          >
            {details ? "Masquer le détail" : "En savoir plus"}
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setCookieConsent("refused");
                setVisible(false);
              }}
              className="flex-1 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 sm:flex-none"
            >
              Essentiels seulement
            </button>
            <button
              type="button"
              onClick={() => {
                setCookieConsent("accepted");
                setVisible(false);
              }}
              className="flex-1 rounded-full bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white sm:flex-none"
            >
              Tout accepter
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
