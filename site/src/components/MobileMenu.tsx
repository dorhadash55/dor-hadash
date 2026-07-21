import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { mainNav, siteInfo, type NavItem } from "../content/site";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

/** Liens affichés dans la liste — le CTA contact est en bas. */
const mobileNavItems = mainNav.filter((item) => item.path !== "/nous-contacter");

const navIcons: Record<string, ReactNode> = {
  "/": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  ),
  "/mission": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.9 6.9L22 9.8l-5 4.9 1.2 7.1L12 18.8 5.8 21.8 7 14.7 2 9.8l7.1-.9L12 2Z" />
    </svg>
  ),
  "/lequipe": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11a4 4 0 1 0-8 0M3 20a7 7 0 0 1 14 0M19 8v6M22 11h-6" />
    </svg>
  ),
  "/nos-villes": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  "/temoignages-videos": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.5v5l5-2.5L9 9.5ZM22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
    </svg>
  ),
  "/blog": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h9l3 3v13H6V4ZM6 8h6M6 12h10M6 16h10" />
    </svg>
  ),
};

function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
    </svg>
  );
}

function MobileNavLink({
  item,
  onClose,
  index,
}: {
  item: NavItem;
  onClose: () => void;
  index: number;
}) {
  const [villesOpen, setVillesOpen] = useState(false);
  const icon = navIcons[item.path];

  if (item.children) {
    return (
      <div
        className={`mobile-menu-item overflow-hidden rounded-2xl backdrop-blur-md transition-shadow ${
          villesOpen
            ? "bg-white/15 shadow-lg shadow-black/10 ring-1 ring-white/25"
            : "bg-white/10 ring-1 ring-white/12"
        }`}
        style={{ animationDelay: `${index * 55 + 80}ms` }}
      >
        <button
          type="button"
          onClick={() => setVillesOpen((o) => !o)}
          className="flex w-full items-center gap-3.5 px-4 py-4 text-left"
          aria-expanded={villesOpen}
        >
          <span className="mobile-menu-icon">{icon}</span>
          <span className="flex-1 font-heading text-[1.05rem] font-medium tracking-wide text-white">
            {item.label}
          </span>
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 ${villesOpen ? "rotate-180" : ""}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/70" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>

        <div className={`mobile-menu-accordion ${villesOpen ? "mobile-menu-accordion-open" : ""}`}>
          <div className="overflow-hidden">
            <div className="grid grid-cols-2 gap-2 px-3 pb-2">
              {item.children.map((child) => (
                <NavLink
                  key={child.path}
                  to={child.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-center text-sm font-semibold transition-all active:scale-[0.98] ${
                      isActive
                        ? "bg-gradient-to-br from-brand-teal to-brand-teal/80 text-brand-blue-deep shadow-md shadow-brand-teal/30"
                        : "bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/18"
                    }`
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
            <NavLink
              to={item.path}
              onClick={onClose}
              className="mx-3 mb-3 flex items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-semibold text-brand-teal transition-colors hover:text-white"
            >
              Toutes les villes
              <ChevronRight className="opacity-80" />
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      onClick={onClose}
      style={{ animationDelay: `${index * 55 + 80}ms` }}
      className={({ isActive }) =>
        `mobile-menu-item group flex items-center gap-3.5 rounded-2xl px-4 py-4 transition-all active:scale-[0.99] ${
          isActive
            ? "bg-white text-brand-blue-deep shadow-xl shadow-black/25 ring-1 ring-white"
            : "bg-white/10 text-white ring-1 ring-white/12 backdrop-blur-md hover:bg-white/15"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={isActive ? "mobile-menu-icon mobile-menu-icon-active" : "mobile-menu-icon"}>
            {icon}
          </span>
          <span className="flex-1 font-heading text-[1.05rem] font-medium tracking-wide">{item.label}</span>
          <ChevronRight className={isActive ? "text-brand-blue/40" : "text-white/35 group-hover:text-white/60"} />
        </>
      )}
    </NavLink>
  );
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <button
        type="button"
        aria-label="Fermer le menu"
        onClick={onClose}
        className={`mobile-menu-backdrop fixed inset-0 z-[100] lg:hidden ${open ? "mobile-menu-backdrop-open" : ""}`}
      />

      <div
        className={`mobile-menu-panel fixed inset-0 z-[101] flex flex-col lg:hidden ${open ? "mobile-menu-panel-open" : ""}`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className="mobile-menu-bg relative flex min-h-0 flex-1 flex-col overflow-hidden">
          {/* En-tête */}
          <div className="mobile-menu-header relative flex items-center gap-4 px-5 pb-5 pt-[calc(1.25rem+env(safe-area-inset-top,0px))]">
            <img
              src="/images/logo.png"
              alt=""
              className="h-14 w-auto rounded-xl bg-white/95 p-1.5 shadow-lg shadow-black/20"
            />
            <div className="min-w-0 flex-1">
              <p className="font-heading text-xl font-semibold leading-tight text-white">Dor Hadash</p>
              <p className="mt-0.5 text-sm text-white/65">{siteInfo.tagline}</p>
            </div>
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/12 text-white ring-1 ring-white/20 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/22 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav
            className={`mobile-menu-nav relative flex-1 overflow-y-auto px-5 pb-6 ${open ? "mobile-menu-open" : ""}`}
            aria-label="Navigation principale"
          >
            <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Explorer
            </p>
            <div className="flex flex-col gap-2.5">
              {mobileNavItems.map((item, index) => (
                <MobileNavLink key={item.path} item={item} onClose={onClose} index={index} />
              ))}
            </div>
          </nav>

          {/* CTAs */}
          <div className="mobile-menu-footer relative shrink-0 px-5 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
            <NavLink
              to="/nous-contacter"
              onClick={onClose}
              className="mobile-menu-cta-primary flex items-center justify-center gap-2 rounded-2xl py-4 font-heading text-base font-semibold text-white shadow-xl transition-transform active:scale-[0.98]"
            >
              M'inscrire — c'est gratuit
            </NavLink>
            <a
              href={siteInfo.callPhone}
              className="mt-2.5 flex items-center justify-center gap-2.5 rounded-2xl bg-white/10 py-3.5 font-heading text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur-sm transition-colors hover:bg-white/16 active:scale-[0.98]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal/25 text-brand-teal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
                  />
                </svg>
              </span>
              Appeler Dor Hadash
            </a>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
