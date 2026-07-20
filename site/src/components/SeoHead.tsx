import { Head } from "vite-react-ssg";
import { useLocation } from "react-router-dom";
import { seoByPath, defaultSeo } from "../content/seo";

const SITE_URL = "https://www.dor-hadash.com";

type SeoHeadProps = {
  title?: string;
  description?: string;
  image?: string;
};

export default function SeoHead({ title, description, image }: SeoHeadProps) {
  const { pathname } = useLocation();
  const entry = seoByPath[pathname] ?? defaultSeo;
  const finalTitle = title ?? entry.title;
  const finalDescription = description ?? entry.description;
  const finalImage = image ?? `${SITE_URL}/images/logo.png`;
  const canonical = `${SITE_URL}${pathname}`;

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Dor Hadash" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
    </Head>
  );
}
