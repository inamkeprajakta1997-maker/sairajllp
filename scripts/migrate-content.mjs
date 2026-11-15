import fs from "node:fs";
const decode = (s) =>
  s
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, n) =>
      String.fromCodePoint(n[0].toLowerCase() === "x" ? parseInt(n.slice(1), 16) : +n),
    )
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&[lr]squo;/g, "'")
    .replace(/&[lr]dquo;/g, '"')
    .replace(/<[^>]*>/g, "")
    .replace(/Sairaj Groups(?: Pvt\. Ltd\.)?|Sairaj Group\b/gi, "Sairaj LLP")
    .trim();
function blocks(html) {
  return [...html.matchAll(/<(p|h[1-6]|li)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((m) => ({
      type: m[1].startsWith("h") ? "heading" : m[1] === "li" ? "item" : "paragraph",
      text: decode(m[2]),
    }))
    .filter(
      (b) =>
        b.text && !b.text.startsWith("Contact Details:") && !/Website:|Phone:|Email:/.test(b.text),
    );
}
const files = fs.readdirSync("content-source").filter((f) => f.startsWith("service-"));
const services = files.map((file) => {
  const html = fs.readFileSync("content-source/" + file, "utf8");
  const body = html.split('<div class="service-details">')[1]?.split("</div>")[0] || "";
  return {
    sourceSlug: file.slice(8, -5),
    title: decode(html.match(/<title>(.*?) - sairajgroups/)[1]),
    image: html.match(/class="service-single-img">\s*<img[^>]*src="([^"]+)/)?.[1],
    blocks: blocks(body),
  };
});
const posts = JSON.parse(fs.readFileSync("content-source/posts.json", "utf8")).map((p) => ({
  slug: p.slug,
  title: decode(p.title.rendered),
  date: p.date.slice(0, 10),
  excerpt: decode(p.excerpt.rendered),
  image: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
  category: p._embedded?.["wp:term"]?.flat().find((t) => t.taxonomy === "category")?.name || "Blog",
  tags:
    p._embedded?.["wp:term"]
      ?.flat()
      .filter((t) => t.taxonomy === "post_tag")
      .map((t) => decode(t.name)) || [],
  blocks: blocks(p.content.rendered),
  source: p.link,
}));
fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("src/data/migrated.json", JSON.stringify({ services, posts }, null, 2));
console.log(`Migrated ${services.length} services and ${posts.length} articles.`);
