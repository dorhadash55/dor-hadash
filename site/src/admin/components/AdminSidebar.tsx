import { NavLink } from "react-router-dom";
import { getAdminStats } from "../storage/contentStore";

const navItems = [
  { to: "/admin", label: "Tableau de bord", end: true },
  { to: "/admin/videos", label: "Témoignages" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/contacts", label: "Messages" },
  { to: "/admin/settings", label: "Paramètres" },
];

export default function AdminSidebar() {
  const stats = getAdminStats();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-gray-200 bg-brand-blue-deep text-white lg:w-60 lg:border-b-0 lg:border-r">
      <div className="border-b border-white/10 px-4 py-4 sm:px-5 sm:py-5">
        <p className="font-heading text-base font-semibold sm:text-lg">Dor Hadash</p>
        <p className="text-xs text-white/60">Espace admin</p>
      </div>

      <nav className="grid grid-cols-2 gap-1 px-3 py-3 sm:grid-cols-3 lg:flex lg:flex-col lg:px-2 lg:py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `rounded-lg px-2.5 py-2 text-xs font-medium transition-colors sm:px-3 sm:py-2.5 sm:text-sm ${
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {item.label}
            {item.to === "/admin/contacts" && stats.unreadContacts > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-coral px-1.5 text-[11px] font-bold">
                {stats.unreadContacts}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto hidden border-t border-white/10 p-4 lg:block">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-white/70 hover:text-white"
        >
          Voir le site →
        </a>
      </div>
    </aside>
  );
}
