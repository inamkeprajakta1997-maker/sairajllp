import fs from "node:fs";
const slugs = [
  "warehouse-rental",
  "mathadi-services",
  "manpower-solutions",
  "housekeeping",
  "vehicle-forklift-rental",
  "goods-transportation",
  "corrugated-boxes",
  "scrap-services",
  "canteen-food",
  "pest-control",
];
const { posts } = JSON.parse(fs.readFileSync("src/data/migrated.json", "utf8"));
const paths = [
  "/",
  "/about",
  "/services",
  "/industries",
  "/group-companies",
  "/blog",
  "/contact",
  "/inquiry",
  ...slugs.map((s) => "/services/" + s),
  ...posts.map((p) => "/blog/" + p.slug),
];
fs.writeFileSync(
  "public/sitemap.xml",
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map((p) => `  <url><loc>https://sairajgroups.in${p}</loc></url>`).join("\n") +
    "\n</urlset>\n",
);
fs.writeFileSync(
  "public/robots.txt",
  "User-agent: *\nAllow: /\nSitemap: https://sairajgroups.in/sitemap.xml\n",
);
console.log(`Generated sitemap with ${paths.length} pages.`);
