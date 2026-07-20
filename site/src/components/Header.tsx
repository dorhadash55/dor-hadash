import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { mainNav } from "../content/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [villesOpen, setVillesOpen] = useState(false);

  // Close mobile menu on route change / resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-24 items-center justify-between">
          {/* Mobile burger */}
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-brand-blue"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <NavLink to="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
            <img src="/images/logo.png" alt="Dor Hadash — Incubateur d'Alya" className="h-16 sm:h-20 w-auto object-contain" />
          </NavLink>

          {/* Desktop nav */}
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

      {/* Mobile menu panel */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[calc(100svh-4rem)] overflow-y-auto">
          <nav className="flex flex-col px-4 py-3">
            {mainNav.map((item) => (
              <div key={item.path} className="border-b border-gray-50 last:border-none">
                <NavLink
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 text-base font-medium ${isActive ? "text-brand-blue" : "text-gray-800"}`
                  }
                >
                  {item.label}
                </NavLink>
                {item.children && (
                  <div className="flex flex-wrap gap-2 pb-3">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={() => setOpen(false)}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
