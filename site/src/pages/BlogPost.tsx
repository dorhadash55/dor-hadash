import { useParams, Link, Navigate } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import RichParagraph from "../components/RichParagraph";
import { useBlogPost } from "../admin/hooks/useAdminContent";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = useBlogPost(slug ?? "");

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <SeoHead title={`${post.title} | Dor Hadash`} description={post.metaDescription} image={post.coverImage} />

      <div className="aspect-[16/9] max-h-[380px] w-full overflow-hidden bg-gray-100">
        <img src={post.coverImage} alt="" className="h-full w-full object-contain" />
      </div>

      <article className="mx-auto max-w-3xl px-6 py-14">
        <Link to="/blog" className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark">
          ← Retour au blog
        </Link>
        <h1 className="mt-4 font-heading text-3xl font-semibold text-brand-blue-deep sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          {formatDate(post.date)} · {post.author}
        </p>

        <div className="mt-8">
          {post.paragraphs.map((p, i) => (
            <RichParagraph key={i} text={p} />
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-brand-blue/5 p-8 text-center">
          <h2 className="font-heading text-xl font-semibold text-brand-blue-deep">Une question sur votre Alya ?</h2>
          <Link
            to="/nous-contacter"
            className="mt-5 inline-block rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark"
          >
            Nous contacter
          </Link>
        </div>
      </article>
    </>
  );
}
