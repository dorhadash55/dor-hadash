import { Link } from "react-router-dom";
import { useSiteInfo } from "../content/useSiteContent";

export default function MobileCtaBar() {
  const siteInfo = useSiteInfo();
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex border-t border-gray-100 bg-white pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <a
        href={siteInfo.callPhone}
        className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-brand-blue border-r border-gray-100"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
          />
        </svg>
        Appeler
      </a>
      <Link
        to="/nous-contacter"
        className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-brand-blue"
      >
        M'inscrire
      </Link>
    </div>
  );
}
