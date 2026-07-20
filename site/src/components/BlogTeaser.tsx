import { Link } from "react-router-dom";
import { blogPosts } from "../content/blog";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default function BlogTeaser() {
  const latest = blogPosts.slice(0, 3);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-teal">Le blog</span>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-blue-deep sm:text-4xl">
              Conseils et actualités
            </h2>
          </div>
          <Link to="/blog" className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark">
            Tous les articles →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <img
                  src={post.coverImage}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-medium text-gray-400">{formatDate(post.date)}</span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-brand-blue-deep line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
