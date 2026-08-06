import { useEffect, useRef, useState, type ReactNode } from "react";
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  ),
  "/mission": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21V4.5M5 4.5h11.5l-2.25 3.25L16.5 11H5" />
    </svg>
  ),
  "/lequipe": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 19a4.2 4.2 0 0 1 5-4" />
    </svg>
  ),
  "/partenaires": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="8" cy="8" r="2.75" />
      <circle cx="16" cy="8" r="2.75" />
      <circle cx="12" cy="16.25" r="2.75" />
      <path strokeLinecap="round" d="M10.3 9.7 13.7 9.7M9.4 10.5 11 14.1M14.6 10.5 13 14.1" />
    </svg>
  ),
  "/nos-villes": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6.5-4.2 6.5-10A6.5 6.5 0 1 0 5.5 11c0 5.8 6.5 10 6.5 10Z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  ),
  "/temoignages-videos": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 9.5v5l4.5-2.5L10 9.5Z" />
    </svg>
  ),
  "/blog": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.75h7.5L19 8.25v12A1.25 1.25 0 0 1 17.75 21.5H7A1.25 1.25 0 0 1 5.75 20.25V5A1.25 1.25 0 0 1 7 3.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 3.75V8.5H19M8.5 12h7M8.5 15.5h7M8.5 19h4.5" />
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
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    const active = document.activeElement;
    if (active instanceof HTMLElement && panelRef.current?.contains(active)) {
      active.blur();
    }
    onClose();
    // Remettre le focus sur le bouton hamburger après la fermeture
    requestAnimationFrame(() => {
      document.getElementById("mobile-menu-toggle")?.focus();
    });
  };

  useEffect(() => {
    if (!mounted || !open) return;
    closeBtnRef.current?.focus();
  }, [open, mounted]);

  if (!mounted) return null;

  return createPortal(
    <>
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Fermer le menu"
        onClick={handleClose}
        className={`mobile-menu-backdrop fixed inset-0 z-[100] lg:hidden ${open ? "mobile-menu-backdrop-open" : ""}`}
        {...(!open ? { inert: true } : {})}
      />

      <div
        ref={panelRef}
        id="mobile-menu-panel"
        className={`mobile-menu-panel fixed inset-0 z-[101] flex flex-col lg:hidden ${open ? "mobile-menu-panel-open" : ""}`}
        role="dialog"
        aria-modal={open}
        aria-label="Menu de navigation"
        {...(!open ? { inert: true } : {})}
      >
        <div className="mobile-menu-bg relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="mobile-menu-header relative flex items-center gap-4 px-5 pb-5 pt-[calc(1.25rem+env(safe-area-inset-top,0px))]">
            <img
              src="/images/logo.png"
              alt=""
              className="h-14 w-auto object-contain"
            />
            <div className="min-w-0 flex-1">
              <p className="font-heading text-xl font-semibold leading-tight text-white">Dor Hadash</p>
              <p className="mt-0.5 text-sm text-white/65">{siteInfo.tagline}</p>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Fermer le menu"
              onClick={handleClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/12 text-white ring-1 ring-white/20 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/22 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>

          <nav
            className={`mobile-menu-nav relative flex-1 overflow-y-auto px-5 pb-6 ${open ? "mobile-menu-open" : ""}`}
            aria-label="Navigation principale"
          >
            <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Explorer
            </p>
            <div className="flex flex-col gap-2.5">
              {mobileNavItems.map((item, index) => (
                <MobileNavLink key={item.path} item={item} onClose={handleClose} index={index} />
              ))}
            </div>
          </nav>

          <div className="mobile-menu-footer relative shrink-0 px-5 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
            <NavLink
              to="/nous-contacter"
              onClick={handleClose}
              className="mobile-menu-cta-primary flex items-center justify-center gap-2 rounded-2xl py-4 font-heading text-base font-semibold text-white shadow-xl transition-transform active:scale-[0.98]"
            >
              M'inscrire
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
