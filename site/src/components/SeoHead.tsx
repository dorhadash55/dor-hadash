import { Head } from "vite-react-ssg";
import { useLocation } from "react-router-dom";
import { seoByPath, defaultSeo } from "../content/seo";

export const SITE_URL = "https://www.dor-hadash.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/jerusalem.jpg`;

export function absoluteUrl(path?: string | null) {
  if (!path) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type SeoHeadProps = {
  title?: string;
  description?: string;
  image?: string;
  /** website (défaut) ou article pour les posts de blog */
  ogType?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Date ISO pour og:article */
  publishedTime?: string;
  author?: string;
};

export default function SeoHead({
  title,
  description,
  image,
  ogType = "website",
  noindex = false,
  jsonLd,
  publishedTime,
  author,
}: SeoHeadProps) {
  const { pathname } = useLocation();
  const entry = seoByPath[pathname] ?? defaultSeo;
  const finalTitle = title ?? entry.title;
  const finalDescription = description ?? entry.description;
  const finalImage = absoluteUrl(image);
  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Dor Hadash" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {author && <meta property="article:author" content={author} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Head>
  );
}
