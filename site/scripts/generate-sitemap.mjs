/**
 * Génère public/sitemap.xml à partir des slugs villes + articles blog.
 * Exécuté en prebuild pour éviter la dérive manuelle.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const SITE = "https://www.dor-hadash.com";
const today = new Date().toISOString().slice(0, 10);

function extractCitySlugs(src) {
  const matches = [...src.matchAll(/slug:\s*"([^"]+)"/g)];
  return matches.map((m) => m[1]);
}

function extractBlogEntries(src) {
  const posts = [];
  const blocks = src.split(/\{\s*\n\s*slug:/).slice(1);
  for (const block of blocks) {
    const slug = block.match(/^\s*"([^"]+)"/)?.[1];
    const date = block.match(/date:\s*"([^"]+)"/)?.[1];
    if (slug && date) posts.push({ slug, date });
  }
  return posts;
}

const citiesSrc = readFileSync(join(root, "src/content/cities.ts"), "utf8");
const blogSrc = readFileSync(join(root, "src/content/blog.ts"), "utf8");
const citySlugs = extractCitySlugs(citiesSrc);
const blogPosts = extractBlogEntries(blogSrc);

const staticPages = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/mission", changefreq: "monthly", priority: "0.8" },
  { path: "/lequipe", changefreq: "monthly", priority: "0.6" },
  { path: "/partenaires", changefreq: "monthly", priority: "0.6" },
  { path: "/nos-villes", changefreq: "monthly", priority: "0.8" },
  { path: "/temoignages-videos", changefreq: "monthly", priority: "0.6" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/nous-contacter", changefreq: "yearly", priority: "0.7" },
];

function urlEntry({ loc, lastmod, changefreq, priority }) {
  const parts = [`  <url>`, `    <loc>${loc}</loc>`];
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
  if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority) parts.push(`    <priority>${priority}</priority>`);
  parts.push(`  </url>`);
  return parts.join("\n");
}

const urls = [
  ...staticPages.map((p) =>
    urlEntry({
      loc: `${SITE}${p.path === "/" ? "/" : p.path}`,
      lastmod: today,
      changefreq: p.changefreq,
      priority: p.priority,
    }),
  ),
  ...citySlugs.map((slug) =>
    urlEntry({
      loc: `${SITE}/${slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.8",
    }),
  ),
  ...blogPosts.map((post) =>
    urlEntry({
      loc: `${SITE}/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: "monthly",
      priority: "0.6",
    }),
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml: ${urls.length} URLs (${citySlugs.length} villes, ${blogPosts.length} articles)`);
