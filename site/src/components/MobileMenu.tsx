import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { mobileNav, siteInfo, type NavItem } from "../content/site";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const navIcons: Record<string, ReactNode> = {
  "/#accompagnement": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21V4.5M5 4.5h11.5l-2.25 3.25L16.5 11H5" />
    </svg>
  ),
  "/nos-villes": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6.5-4.2 6.5-10A6.5 6.5 0 1 0 5.5 11c0 5.8 6.5 10 6.5 10Z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  ),
  "/preparer-mon-alya": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5h10M9 12h10M9 19h10M5 5v.01M5 12v.01M5 19v.01" />
    </svg>
  ),
  "/temoignages-videos": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 9.5v5l4.5-2.5L10 9.5Z" />
    </svg>
  ),
  "/lequipe": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 19a4.2 4.2 0 0 1 5-4" />
    </svg>
  ),
};

function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden="true">
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
  const [expanded, setExpanded] = useState(false);
  const icon = navIcons[item.path];
  const isCities = item.path === "/nos-villes";

  if (item.children) {
    return (
      <div
        className={`mobile-menu-item overflow-hidden rounded-2xl transition-all duration-300 ${
          expanded
            ? "bg-white/[0.14] shadow-lg shadow-black/15 ring-1 ring-white/25"
            : "bg-white/[0.07] ring-1 ring-white/10"
        }`}
        style={{ animationDelay: `${index * 50 + 70}ms` }}
      >
        <button
          type="button"
          onClick={() => setExpanded((o) => !o)}
          className="flex w-full items-center gap-3.5 px-3.5 py-3.5 text-left"
          aria-expanded={expanded}
        >
          <span className={`mobile-menu-icon ${expanded ? "mobile-menu-icon-open" : ""}`}>{icon}</span>
          <span className="flex-1 font-heading text-[1.02rem] font-medium tracking-wide text-white">
            {item.label}
          </span>
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full bg-brand-teal/20 text-brand-teal transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
            aria-hidden
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>

        <div className={`mobile-menu-accordion ${expanded ? "mobile-menu-accordion-open" : ""}`}>
          <div className="overflow-hidden">
            {isCities ? (
              <div className="px-3 pb-3">
                <div className="grid grid-cols-2 gap-2">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `rounded-xl px-3 py-3 text-center text-sm font-semibold transition-all active:scale-[0.98] ${
                          isActive
                            ? "bg-brand-teal text-brand-blue-deep shadow-md shadow-brand-teal/30"
                            : "bg-white/12 text-white ring-1 ring-white/15 hover:bg-white/20"
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
                  className="mt-2.5 flex items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-semibold text-brand-teal transition-colors hover:text-white"
                >
                  Toutes les villes
                  <ChevronRight className="opacity-80" />
                </NavLink>
              </div>
            ) : (
              <div className="flex flex-col gap-1 px-3 pb-3">
                {item.children.map((child) => (
                  <NavLink
                    key={child.path}
                    to={child.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white font-semibold text-brand-blue-deep"
                          : "bg-white/8 text-white/90 hover:bg-white/14"
                      }`
                    }
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const isHash = item.path.includes("#");

  return (
    <NavLink
      to={isHash ? item.path.split("#")[0] || "/" : item.path}
      end={item.path === "/"}
      onClick={(e) => {
        if (isHash) {
          e.preventDefault();
          onClose();
          const id = item.path.split("#")[1];
          window.setTimeout(() => {
            const el = id ? document.getElementById(id) : null;
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.replaceState(null, "", `#${id}`);
            } else {
              window.location.assign(item.path);
            }
          }, 280);
          return;
        }
        onClose();
      }}
      style={{ animationDelay: `${index * 50 + 70}ms` }}
      className={({ isActive }) =>
        `mobile-menu-item group flex items-center gap-3.5 rounded-2xl px-3.5 py-3.5 transition-all active:scale-[0.99] ${
          isActive && !isHash
            ? "bg-white text-brand-blue-deep shadow-xl shadow-black/25 ring-1 ring-white"
            : "bg-white/[0.07] text-white ring-1 ring-white/10 hover:bg-white/[0.12]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={isActive && !isHash ? "mobile-menu-icon mobile-menu-icon-active" : "mobile-menu-icon"}>
            {icon}
          </span>
          <span className="flex-1 font-heading text-[1.02rem] font-medium tracking-wide">{item.label}</span>
          <ChevronRight
            className={isActive && !isHash ? "text-brand-blue/35" : "text-white/30 group-hover:text-white/55"}
          />
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
          <div className="mobile-menu-header relative flex items-center gap-3.5 px-5 pb-4 pt-[calc(1.1rem+env(safe-area-inset-top,0px))]">
            <NavLink to="/" onClick={handleClose} className="shrink-0">
              <img src="/images/logo.png" alt="Dor Hadash" className="h-12 w-auto object-contain drop-shadow-md" />
            </NavLink>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-xl font-semibold leading-tight text-white">Dor Hadash</p>
              <p className="mt-0.5 text-xs text-brand-teal/90">{siteInfo.tagline}</p>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Fermer le menu"
              onClick={handleClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/12 text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>

          <nav
            className={`mobile-menu-nav relative flex-1 overflow-y-auto px-4 pb-5 ${open ? "mobile-menu-open" : ""}`}
            aria-label="Navigation principale"
          >
            <p className="mb-2.5 px-1 font-accent text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Menu
            </p>
            <div className="flex flex-col gap-2">
              {mobileNav.map((item, index) => (
                <MobileNavLink key={item.label} item={item} onClose={handleClose} index={index} />
              ))}
            </div>
          </nav>

          <div className="mobile-menu-footer relative shrink-0 px-5 py-4 pb-[calc(1.1rem+env(safe-area-inset-bottom,0px))]">
            <NavLink
              to="/nous-contacter?objet=entretien"
              onClick={handleClose}
              className="mobile-menu-cta-primary flex items-center justify-center gap-2 rounded-2xl py-3.5 font-heading text-[0.95rem] font-semibold transition-transform active:scale-[0.98]"
            >
              Demander un entretien
              <span aria-hidden>→</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
