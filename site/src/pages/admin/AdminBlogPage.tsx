import { Link } from "react-router-dom";
import AdminHeader from "../../admin/components/AdminHeader";
import { AdminButton, AdminCard, EmptyState } from "../../admin/components/AdminUi";
import { useBlogPosts } from "../../admin/hooks/useAdminContent";
import { deleteBlogPost } from "../../admin/storage/contentStore";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default function AdminBlogPage() {
  const posts = useBlogPosts();

  const handleDelete = (slug: string, title: string) => {
    if (!confirm(`Supprimer l'article « ${title} » ?`)) return;
    deleteBlogPost(slug);
  };

  return (
    <>
      <AdminHeader title="Blog" />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <AdminCard
          title={`Articles (${posts.length})`}
          action={
            <Link to="/admin/blog/new">
              <AdminButton>+ Nouvel article</AdminButton>
            </Link>
          }
        >
          {posts.length === 0 ? (
            <EmptyState
              title="Aucun article"
              description="Créez votre premier article de blog."
            />
          ) : (
            <>
              <ul className="space-y-3 md:hidden">
                {posts.map((post) => (
                  <li
                    key={post.slug}
                    className="rounded-xl border border-gray-100 bg-gray-50/80 p-4"
                  >
                    <p className="font-medium text-brand-blue-deep">{post.title}</p>
                    <p className="mt-1 text-xs text-gray-500">/{post.slug}</p>
                    <p className="mt-2 text-xs text-gray-600">
                      {post.author} · {formatDate(post.date)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm">
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-blue hover:underline"
                      >
                        Voir
                      </a>
                      <Link to={`/admin/blog/${post.slug}/edit`} className="text-brand-blue hover:underline">
                        Modifier
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.slug, post.title)}
                        className="text-brand-coral hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="-mx-4 hidden overflow-x-auto px-4 md:mx-0 md:block md:px-0">
                <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500">
                    <th className="pb-3 pr-4 font-medium">Titre</th>
                    <th className="pb-3 pr-4 font-medium">Auteur</th>
                    <th className="pb-3 pr-4 font-medium">Date</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {posts.map((post) => (
                    <tr key={post.slug}>
                      <td className="py-3 pr-4">
                        <p className="font-medium text-brand-blue-deep">{post.title}</p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">/{post.slug}</p>
                      </td>
                      <td className="py-3 pr-4 text-gray-600">{post.author}</td>
                      <td className="py-3 pr-4 text-gray-600">{formatDate(post.date)}</td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-brand-blue hover:underline"
                          >
                            Voir
                          </a>
                          <Link to={`/admin/blog/${post.slug}/edit`} className="text-brand-blue hover:underline">
                            Modifier
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(post.slug, post.title)}
                            className="text-brand-coral hover:underline"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </>
          )}
        </AdminCard>
      </main>
    </>
  );
}
