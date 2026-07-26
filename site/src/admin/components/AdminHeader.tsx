import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { AdminBadge } from "./AdminUi";

export default function AdminHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const { logout, usesFirebaseAuth, userEmail, canWriteToFirestore } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex flex-wrap items-start justify-between gap-3 px-3 py-3 sm:px-6 sm:py-4">
        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-lg font-semibold text-brand-blue-deep sm:text-xl">{title}</h1>
          {description && (
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {usesFirebaseAuth && (
            <span className="sm:hidden">
              {canWriteToFirestore ? (
                <AdminBadge tone="success">Firebase</AdminBadge>
              ) : (
                <AdminBadge tone="warning">Lecture seule</AdminBadge>
              )}
            </span>
          )}
          {usesFirebaseAuth && userEmail && (
            <span className="hidden max-w-[180px] truncate text-xs text-brand-teal lg:inline" title={userEmail}>
              {userEmail}
            </span>
          )}
          <Link
            to="/"
            target="_blank"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-brand-blue hover:bg-gray-50"
          >
            Site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
}
