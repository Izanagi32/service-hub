import fs from "node:fs";
import path from "node:path";

/**
 * GitHub Pages serves static files only. Copying the SPA shell into each route
 * folder makes /services/, /services/miyka/ etc. return HTTP 200 instead of the
 * 404.html fallback (which is still kept for unknown URLs).
 */
const dist = path.resolve("dist");
const indexHtml = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const constants = fs.readFileSync(path.resolve("src/constants.tsx"), "utf8");
const slugs = [...constants.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((match) => match[1]);

const staticRoutes = ["services", "about", "team", "contact", "privacy", "terms"];
const routes = [...staticRoutes, ...slugs.map((slug) => `services/${slug}`)];

for (const route of routes) {
  const dir = path.join(dist, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), indexHtml);
}

const siteUrl = (process.env.VITE_SITE_URL || "https://servicehubmaster.com").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["", ...routes]
  .map(
    (route) => `  <url>
    <loc>${siteUrl}/${route}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

console.log(`Generated ${routes.length} route shells and sitemap.xml`);
