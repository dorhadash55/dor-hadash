import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useContactSubmissions } from "../hooks/useAdminContent";

const navItems = [
  { to: "/admin", label: "Tableau de bord", end: true, icon: "◉" },
  { to: "/admin/videos", label: "Vidéos", icon: "▶" },
  { to: "/admin/blog", label: "Blog", icon: "✎" },
  { to: "/admin/contacts", label: "Messages", icon: "✉" },
  { to: "/admin/settings", label: "Paramètres", icon: "⚙" },
];

export default function AdminSidebar() {
  const submissions = useContactSubmissions();
  const unreadContacts = submissions.filter((s) => !s.read).length;
  const { canWriteToFirestore, userEmail } = useAuth();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-gray-200 bg-brand-blue-deep text-white lg:w-64 lg:border-b-0 lg:border-r lg:min-h-dvh">
      <div className="border-b border-white/10 px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="" className="h-9 w-auto rounded bg-white/95 p-0.5" />
          <div>
            <p className="font-heading text-base font-semibold leading-tight">Dor Hadash</p>
            <p className="text-xs text-white/60">Espace admin</p>
          </div>
        </div>
      </div>

      <nav className="grid grid-cols-2 gap-1 px-3 py-3 sm:grid-cols-3 lg:flex lg:flex-col lg:px-2 lg:py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-2.5 py-2.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span className="text-sm opacity-80" aria-hidden>
              {item.icon}
            </span>
            <span className="truncate">{item.label}</span>
            {item.to === "/admin/contacts" && unreadContacts > 0 && (
              <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-coral px-1.5 text-[10px] font-bold">
                {unreadContacts}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 p-3 lg:p-4">
        <div className="mb-3 hidden lg:block">
          {canWriteToFirestore ? (
            <span className="inline-flex rounded-full bg-brand-teal/20 px-2.5 py-0.5 text-xs font-semibold text-brand-teal">
              Firebase actif
            </span>
          ) : (
            <span className="inline-flex rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-semibold text-amber-200">
              Lecture seule
            </span>
          )}
          {userEmail && (
            <p className="mt-2 truncate text-xs text-white/60" title={userEmail}>
              {userEmail}
            </p>
          )}
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-white/85 hover:bg-white/10 sm:text-sm lg:justify-start"
        >
          Voir le site public →
        </a>
      </div>
    </aside>
  );
}
