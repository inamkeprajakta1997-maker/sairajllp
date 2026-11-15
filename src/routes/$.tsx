import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { posts, services } from "../data/company";

// Preserve inbound links from the previous WordPress website.
export const Route = createFileRoute("/$")({
  loader: ({ params }) => {
    const path = (params._splat || "").replace(/\/$/, "");
    if (path === "free-consulting") throw redirect({ to: "/inquiry", statusCode: 301 });
    const service = services.find((s) => path === `service/${s.sourceSlug}`);
    if (service)
      throw redirect({ to: "/services/$slug", params: { slug: service.slug }, statusCode: 301 });
    const post = posts.find((p) => path === p.slug);
    if (post) throw redirect({ to: "/blog/$slug", params: { slug: post.slug }, statusCode: 301 });
    throw notFound();
  },
});
