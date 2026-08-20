import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { mainNav, type NavItem } from "../content/site";
import MobileMenu from "./MobileMenu";
import { hashIdFromHref, scrollToId } from "../lib/scrollToId";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "relative inline-flex h-9 items-center whitespace-nowrap px-2.5 text-[13px] font-medium leading-none tracking-tight transition-colors xl:px-3 xl:text-sm",
    "after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand-teal after:transition-opacity xl:after:inset-x-3",
    isActive ? "text-brand-blue after:opacity-100" : "text-gray-700 after:opacity-0 hover:text-brand-blue",
  ].join(" ");

function DesktopLabel({ item }: { item: NavItem }) {
  if (!item.shortLabel) return <>{item.label}</>;
  return (
    <>
      <span className="xl:hidden">{item.shortLabel}</span>
      <span className="hidden xl:inline">{item.label}</span>
    </>
  );
}

function NavItemLink({
  item,
  className,
}: {
  item: NavItem;
  className: (props: { isActive: boolean }) => string;
}) {
  if (item.path.includes("#")) {
    const hashId = hashIdFromHref(item.path);
    return (
      <a
        href={item.path}
        className={className({ isActive: false })}
        onClick={(e) => {
          if (!hashId) return;
          e.preventDefault();
          if (scrollToId(hashId)) {
            window.history.replaceState(null, "", `#${hashId}`);
          } else {
            window.location.assign(item.path.startsWith("/") ? item.path : `/${item.path}`);
          }
        }}
      >
        <DesktopLabel item={item} />
      </a>
    );
  }
  return (
    <NavLink to={item.path} className={className}>
      <DesktopLabel item={item} />
    </NavLink>
  );
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
      <NavLink
        to={item.path}
        className={navLinkClass}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onFocus={openMenu}
        onBlur={scheduleClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            (e.currentTarget as HTMLElement).blur();
          }
        }}
      >
        <DesktopLabel item={item} />
        <svg
          className={`ml-1 h-3 w-3 shrink-0 opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
        >
          <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavLink>
      <div
        id={menuId}
        role="menu"
        className={`absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 pt-2 transition-all ${
          open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-xl border border-brand-sand/80 bg-white py-1.5 shadow-lg shadow-brand-blue/10">
          {item.children?.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2 text-sm leading-snug transition-colors ${
                  isActive
                    ? "bg-brand-blue/5 font-medium text-brand-blue"
                    : "text-gray-700 hover:bg-brand-cream hover:text-brand-blue"
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-blue/8 bg-brand-cream/95 backdrop-blur-md pt-[env(safe-area-inset-top,0px)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:h-[4.75rem] lg:gap-4">
        {/* Mobile toggle */}
        <button
          id="mobile-menu-toggle"
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-menu-panel"
          onClick={() => setOpen((o) => !o)}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all lg:hidden ${
            open ? "bg-brand-blue text-white shadow-md" : "text-brand-blue hover:bg-brand-blue/5"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Logo — centré mobile, à gauche desktop */}
        <NavLink
          to="/"
          className="absolute left-1/2 flex -translate-x-1/2 items-center lg:static lg:translate-x-0"
          onClick={() => setOpen(false)}
        >
          <img
            src="/images/logo.png"
            alt="Dor Hadash — Incubateur d'Alya"
            className="h-11 w-auto object-contain sm:h-12 lg:h-14"
          />
        </NavLink>

        {/* Spacer mobile pour équilibrer le hamburger */}
        <div className="h-10 w-10 shrink-0 lg:hidden" aria-hidden="true" />

        {/* Desktop nav */}
        <nav className="hidden min-w-0 flex-1 items-center justify-end lg:flex" aria-label="Navigation principale">
          <div className="flex items-center">
            {mainNav.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <NavItemLink key={item.label} item={item} className={navLinkClass} />
              ),
            )}
          </div>
          <Link
            to="/nous-contacter?objet=entretien"
            className="ml-3 inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full bg-brand-blue px-3.5 text-[13px] font-semibold leading-none text-white shadow-sm shadow-brand-blue/20 transition-all hover:bg-brand-blue-dark hover:shadow-md xl:ml-4 xl:px-4 xl:text-sm"
          >
            <span className="xl:hidden">Entretien</span>
            <span className="hidden xl:inline">Demander un entretien</span>
          </Link>
        </nav>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
