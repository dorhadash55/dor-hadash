import { Link } from "react-router-dom";
import AdminHeader from "../../admin/components/AdminHeader";
import { AdminCard, AdminButton } from "../../admin/components/AdminUi";
import { useAdminContent } from "../../admin/hooks/useAdminContent";
import { getAdminStats, isFirebaseConfigured } from "../../admin/storage/contentStore";

export default function AdminDashboard() {
  const content = useAdminContent();
  const stats = getAdminStats();

  const checklist = [
    { label: "Firebase configuré", done: isFirebaseConfigured() },
    { label: "Au moins 1 témoignage vidéo", done: stats.videos > 0 },
    { label: "Articles de blog publiés", done: stats.blogPosts > 0 },
    { label: "Paramètres site vérifiés", done: content.siteSettings !== null },
  ];

  return (
    <>
      <AdminHeader title="Tableau de bord" />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Vidéos", value: stats.videos, to: "/admin/videos" },
            { label: "Articles blog", value: stats.blogPosts, to: "/admin/blog" },
            { label: "Messages", value: stats.contacts, to: "/admin/contacts" },
            { label: "Non lus", value: stats.unreadContacts, to: "/admin/contacts" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="mt-1 font-heading text-3xl font-semibold text-brand-blue-deep">{item.value}</p>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminCard title="Actions rapides">
            <div className="flex flex-wrap gap-3">
              <Link to="/admin/videos">
                <AdminButton>Ajouter une vidéo</AdminButton>
              </Link>
              <Link to="/admin/blog/new">
                <AdminButton variant="secondary">Nouvel article</AdminButton>
              </Link>
              <Link to="/admin/contacts">
                <AdminButton variant="secondary">Voir les messages</AdminButton>
              </Link>
            </div>
          </AdminCard>

          <AdminCard title="Checklist de mise en route">
            <ul className="space-y-3">
              {checklist.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      item.done ? "bg-brand-teal/15 text-brand-teal" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {item.done ? "✓" : "·"}
                  </span>
                  <span className={item.done ? "text-gray-700" : "text-gray-500"}>{item.label}</span>
                </li>
              ))}
            </ul>
          </AdminCard>
        </div>

        <AdminCard title="Aperçu du contenu">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Dernières vidéos</h3>
              {content.videos.length === 0 ? (
                <p className="mt-2 text-sm text-gray-500">Aucune vidéo pour l'instant.</p>
              ) : (
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  {content.videos.slice(0, 3).map((v) => (
                    <li key={v.id}>• {v.title}</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Derniers articles</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                {content.blogPosts.slice(0, 3).map((p) => (
                  <li key={p.slug}>• {p.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </AdminCard>
      </main>
    </>
  );
}
