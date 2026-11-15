import { createFileRoute, notFound } from "@tanstack/react-router";
import { Layout, PageHero, ContentBlocks, ContactCTA } from "../components/corporate";
import { posts, pageHead } from "../data/company";
export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(
          loaderData.post.title,
          loaderData.post.excerpt.slice(0, 160),
          `/blog/${loaderData.post.slug}`,
        )
      : {},
  component: Article,
});
function Article() {
  const { post } = Route.useLoaderData();
  return (
    <Layout>
      <PageHero
        eyebrow="INSIGHTS"
        title={post.title}
        image={`/images/blog-${posts.findIndex((p) => p.slug === post.slug)}.jpg`}
      />
      <article className="section container article">
        <div className="article-meta">
          <time dateTime={post.date}>{post.date}</time>
          <span>Sairaj LLP · From our company archives</span>
        </div>
        <ContentBlocks blocks={post.blocks} />
        <div className="article-tags" aria-label="Article topics">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a className="text-link" href="/blog">
          ← Back to all insights
        </a>
      </article>
      <ContactCTA />
    </Layout>
  );
}
