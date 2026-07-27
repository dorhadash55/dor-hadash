import { Link } from "react-router-dom";
import AdminHeader from "../../admin/components/AdminHeader";
import {
  AdminCard,
  AdminLinkButton,
  AdminPageIntro,
  AdminStatCard,
  AdminBadge,
} from "../../admin/components/AdminUi";
import { useAuth } from "../../admin/auth/AuthContext";
import { useAdminContent } from "../../admin/hooks/useAdminContent";
import { getAdminStats, isFirebaseConfigured } from "../../admin/storage/contentStore";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default function AdminDashboard() {
  const content = useAdminContent();
  const stats = getAdminStats();
  const { canWriteToFirestore, usesFirebaseAuth } = useAuth();

  const checklist = [
    { label: "Firebase configuré", done: isFirebaseConfigured(), link: "/admin/settings" },
    {
      label: "Connexion Google (enregistrement)",
      done: !usesFirebaseAuth || canWriteToFirestore,
      link: "/admin/login",
    },
    { label: "Au moins 1 vidéo", done: stats.videos > 0, link: "/admin/videos" },
    { label: "Articles de blog publiés", done: stats.blogPosts > 0, link: "/admin/blog" },
    { label: "Paramètres site vérifiés", done: content.siteSettings !== null, link: "/admin/settings" },
  ];

  const recentContacts = [...content.contactSubmissions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <>
      <AdminHeader
        title="Tableau de bord"
        description="Vue d'ensemble du contenu du site et des demandes de contact."
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        {!canWriteToFirestore && usesFirebaseAuth && (
          <AdminPageIntro
            title="Action requise"
            description="Connectez-vous avec Google pour pouvoir enregistrer vidéos, articles et paramètres dans Firebase. Le mot de passe seul donne un accès en lecture."
          />
        )}

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          <AdminStatCard label="Vidéos" value={stats.videos} to="/admin/videos" hint="YouTube (témoignages & programme)" />
          <AdminStatCard label="Articles blog" value={stats.blogPosts} to="/admin/blog" />
          <AdminStatCard label="Messages" value={stats.contacts} to="/admin/contacts" />
          <AdminStatCard
            label="Non lus"
            value={stats.unreadContacts}
            to="/admin/contacts"
            highlight={stats.unreadContacts > 0}
            hint={stats.unreadContacts > 0 ? "À traiter en priorité" : "Tout est lu"}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminCard title="Actions rapides">
            <div className="grid gap-2 sm:grid-cols-2">
              <AdminLinkButton to="/admin/videos" className="w-full">
                + Vidéo YouTube
              </AdminLinkButton>
              <AdminLinkButton to="/admin/blog/new" variant="secondary" className="w-full">
                + Article blog
              </AdminLinkButton>
              <AdminLinkButton to="/admin/contacts" variant="secondary" className="w-full">
                Voir les messages
              </AdminLinkButton>
              <AdminLinkButton to="/admin/settings" variant="secondary" className="w-full">
                Modifier le hero
              </AdminLinkButton>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-brand-blue hover:underline"
              >
                Accueil ↗
              </a>
              <a
                href="/temoignages-videos"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-brand-blue hover:underline"
              >
                Vidéos ↗
              </a>
              <a
                href="/blog"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-brand-blue hover:underline"
              >
                Blog ↗
              </a>
            </div>
          </AdminCard>

          <AdminCard title="État du site">
            <ul className="space-y-3">
              {checklist.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.link}
                    className="flex items-center gap-3 rounded-lg px-1 py-0.5 text-sm transition-colors hover:bg-gray-50"
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        item.done ? "bg-brand-teal/15 text-brand-teal" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {item.done ? "✓" : "·"}
                    </span>
                    <span className={item.done ? "text-gray-700" : "text-gray-600"}>{item.label}</span>
                    {!item.done && (
                      <span className="ml-auto text-xs text-brand-blue">Configurer →</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </AdminCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminCard
            title="Derniers messages"
            action={
              stats.contacts > 0 ? (
                <Link to="/admin/contacts" className="text-xs font-medium text-brand-blue hover:underline">
                  Tout voir
                </Link>
              ) : undefined
            }
          >
            {recentContacts.length === 0 ? (
              <p className="text-sm text-gray-500">Aucune demande via le formulaire de contact pour l'instant.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {recentContacts.map((s) => (
                  <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-brand-blue-deep">
                          {s.prenom} {s.nom}
                        </p>
                        {!s.read && <AdminBadge tone="danger">Nouveau</AdminBadge>}
                      </div>
                      <p className="mt-0.5 text-xs text-gray-500">{formatDate(s.createdAt)} · {s.ville}</p>
                    </div>
                    <a href={`mailto:${s.email}`} className="text-xs font-medium text-brand-blue hover:underline">
                      Répondre
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </AdminCard>

          <AdminCard title="Contenu récent">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Vidéos</h3>
                {content.videos.length === 0 ? (
                  <p className="mt-2 text-sm text-gray-500">
                    Aucune vidéo.{" "}
                    <Link to="/admin/videos" className="text-brand-blue hover:underline">
                      Ajouter
                    </Link>
                  </p>
                ) : (
                  <ul className="mt-2 space-y-2">
                    {content.videos.slice(0, 4).map((v) => (
                      <li key={v.id} className="text-sm text-gray-700 line-clamp-1">
                        • {v.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Blog</h3>
                <ul className="mt-2 space-y-2">
                  {content.blogPosts.slice(0, 4).map((p) => (
                    <li key={p.slug} className="text-sm text-gray-700 line-clamp-1">
                      • {p.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AdminCard>
        </div>
      </main>
    </>
  );
}
