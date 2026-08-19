import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCookieConsent, setCookieConsent } from "../lib/cookieConsent";

export default function CookieBanner() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setVisible(false);
      return;
    }
    setVisible(getCookieConsent() === null);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[45] px-3 pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:px-4 lg:bottom-4 lg:px-6 lg:pb-0">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-brand-blue/15 bg-white p-4 shadow-xl shadow-brand-blue/15 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-gray-700">
          Nous utilisons des cookies uniquement pour compter les visites du site. Si vous refusez, rien n&apos;est
          enregistré.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => {
              setCookieConsent("refused");
              setVisible(false);
            }}
            className="flex-1 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 sm:flex-none"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => {
              setCookieConsent("accepted");
              setVisible(false);
            }}
            className="flex-1 rounded-full bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white sm:flex-none"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
