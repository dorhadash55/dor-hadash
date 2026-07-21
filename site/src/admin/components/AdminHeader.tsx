import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminHeader({ title }: { title: string }) {
  const { logout, usesFirebaseAuth, userEmail } = useAuth();

  return (
    <header className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-white px-3 py-3 sm:gap-3 sm:px-6 sm:py-4">
      <h1 className="min-w-0 font-heading text-lg font-semibold text-brand-blue-deep sm:text-xl">{title}</h1>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {usesFirebaseAuth && userEmail && (
          <span className="hidden text-xs text-brand-teal sm:inline">
            Connecté : {userEmail}
          </span>
        )}
        <Link
          to="/"
          target="_blank"
          className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark lg:hidden"
        >
          Voir le site
        </Link>
        <button
          type="button"
          onClick={logout}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}
