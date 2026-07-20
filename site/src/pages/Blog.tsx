import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import PageBanner from "../components/PageBanner";
import { blogPosts } from "../content/blog";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default function Blog() {
  return (
    <>
      <SeoHead />
      <PageBanner title="Blog" subtitle="Toute l'actualité Dor Hadash : conseils, démarches et témoignages." />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
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
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-medium text-gray-400">
                  {formatDate(post.date)} · {post.author}
                </span>
                <h2 className="mt-2 font-heading text-lg font-semibold text-brand-blue-deep">{post.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
