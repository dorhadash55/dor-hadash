import { Link } from "react-router-dom";
import AdminHeader from "../../admin/components/AdminHeader";
import { AdminButton, AdminCard, AdminLinkButton, EmptyState } from "../../admin/components/AdminUi";
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
      <AdminHeader
        title="Blog"
        description="Gérez les articles publiés sur le site. Les paragraphes supportent le gras avec **texte**."
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <AdminCard
          title={`Articles (${posts.length})`}
          action={<AdminLinkButton to="/admin/blog/new">+ Nouvel article</AdminLinkButton>}
        >
          {posts.length === 0 ? (
            <EmptyState
              title="Aucun article"
              description="Créez votre premier article pour alimenter la section blog du site."
              action={<AdminLinkButton to="/admin/blog/new">Créer un article</AdminLinkButton>}
            />
          ) : (
            <ul className="space-y-3">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={post.coverImage}
                    alt=""
                    loading="lazy"
                    className="h-20 w-full shrink-0 rounded-lg object-cover sm:h-16 sm:w-24"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-heading font-semibold text-brand-blue-deep">{post.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500">/blog/{post.slug}</p>
                    <p className="mt-1 text-xs text-gray-600">
                      {post.author} · {formatDate(post.date)}
                    </p>
                    {post.excerpt && (
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-center text-xs font-semibold text-gray-700 hover:bg-white sm:text-sm"
                    >
                      Voir ↗
                    </a>
                    <Link
                      to={`/admin/blog/${post.slug}/edit`}
                      className="rounded-lg bg-brand-blue px-3 py-1.5 text-center text-xs font-semibold text-white hover:bg-brand-blue-dark sm:text-sm"
                    >
                      Modifier
                    </Link>
                    <AdminButton variant="danger" className="text-xs sm:text-sm" onClick={() => handleDelete(post.slug, post.title)}>
                      Supprimer
                    </AdminButton>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>
      </main>
    </>
  );
}
