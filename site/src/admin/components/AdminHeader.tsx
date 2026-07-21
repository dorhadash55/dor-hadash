import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminHeader({ title }: { title: string }) {
  const { logout, usesFirebaseAuth, userEmail } = useAuth();

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
      <h1 className="font-heading text-xl font-semibold text-brand-blue-deep">{title}</h1>
      <div className="flex items-center gap-3">
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
