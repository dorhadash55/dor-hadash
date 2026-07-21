import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { mainNav } from "../content/site";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [villesOpen, setVillesOpen] = useState(false);
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm pt-[env(safe-area-inset-top,0px)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid h-24 grid-cols-[2.75rem_1fr_2.75rem] items-center lg:flex lg:justify-between">
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={`lg:hidden col-start-1 flex h-11 w-11 items-center justify-center rounded-full transition-all ${
              open
                ? "bg-brand-blue text-white shadow-md"
                : "text-brand-blue hover:bg-brand-blue/5"
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <NavLink
            to="/"
            className="col-start-2 flex items-center justify-center shrink-0 lg:col-auto lg:justify-start"
            onClick={() => setOpen(false)}
          >
            <img src="/images/logo.png" alt="Dor Hadash — Incubateur d'Alya" className="h-16 sm:h-20 w-auto object-contain" />
          </NavLink>

          <div className="col-start-3 lg:hidden" aria-hidden="true" />

          <nav className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) =>
              item.children ? (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setVillesOpen(true)}
                  onMouseLeave={() => setVillesOpen(false)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive ? "text-brand-blue" : "text-gray-700 hover:text-brand-blue"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                  {villesOpen && (
                    <div className="absolute left-0 top-full pt-1 w-52">
                      <div className="rounded-lg border border-gray-100 bg-white shadow-lg py-2">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm transition-colors ${
                                isActive
                                  ? "text-brand-blue bg-gray-50"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-brand-blue"
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive ? "text-brand-blue" : "text-gray-700 hover:text-brand-blue"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <NavLink
              to="/nous-contacter"
              className="ml-2 rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              M'inscrire
            </NavLink>
          </nav>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}