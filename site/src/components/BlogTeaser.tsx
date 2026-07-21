import { Link } from "react-router-dom";
import { useBlogPosts } from "../admin/hooks/useAdminContent";
import type { BlogPost } from "../admin/storage/types";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

const formatDateShort = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg sm:hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-blue-deep/5">
        <img
          src={post.coverImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/90 via-brand-blue-deep/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <span className="inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
            À la une
          </span>
          <time className="mt-2 block text-xs text-white/75">{formatDateShort(post.date)}</time>
          <h3 className="mt-1 font-heading text-lg font-semibold leading-snug text-white line-clamp-3">
            {post.title}
          </h3>
        </div>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue group-hover:gap-2 transition-all">
          Lire l'article
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

function CompactBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex gap-3.5 overflow-hidden rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md sm:hidden"
    >
      <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={post.coverImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <time className="text-[11px] font-semibold uppercase tracking-wide text-brand-teal">
          {formatDateShort(post.date)}
        </time>
        <h3 className="mt-1 font-heading text-sm font-semibold leading-snug text-brand-blue-deep line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-gray-500">{post.excerpt}</p>
      </div>
    </Link>
  );
}

function GridBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group hidden flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg sm:flex"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={post.coverImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <time className="text-xs font-semibold uppercase tracking-wide text-brand-teal">
          {formatDate(post.date)}
        </time>
        <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-brand-blue-deep line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue group-hover:gap-2 transition-all">
          Lire l'article
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function BlogTeaser() {
  const blogPosts = useBlogPosts();
  const latest = blogPosts.slice(0, 3);
  const [featured, ...rest] = latest;

  return (
    <section className="section-shell bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            label="Le blog"
            title="Conseils et actualités"
            description="Conseils pratiques, actualités des villes et retours d'expérience pour préparer votre Alya."
            action={
              <Link to="/blog" className="btn-outline">
                Tous les articles →
              </Link>
            }
          />
        </Reveal>

        {latest.length > 0 ? (
          <>
            <div className="mt-10 flex flex-col gap-3 sm:hidden">
              {featured && <FeaturedBlogCard post={featured} />}
              {rest.map((post) => (
                <CompactBlogCard key={post.slug} post={post} />
              ))}
            </div>

            <div className="mt-12 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <GridBlogCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-brand-sand bg-white p-10 text-center text-gray-500">
            Les premiers articles arrivent bientôt.
          </div>
        )}
      </div>
    </section>
  );
}
