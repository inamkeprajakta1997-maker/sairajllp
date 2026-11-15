import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, BlogCards, ContactCTA } from "../components/corporate";
import { pageHead } from "../data/company";
export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead(
      "Insights",
      "Read Sairaj LLP insights on logistics, warehousing, manpower and industrial business support.",
      "/blog",
    ),
  component: () => (
    <Layout>
      <PageHero
        eyebrow="INSIGHTS"
        title="Perspectives for the road ahead."
        description="Explore articles from our original company blog, now brought together under Sairaj LLP."
      />
      <section className="section">
        <div className="container">
          <BlogCards />
        </div>
      </section>
      <ContactCTA />
    </Layout>
  ),
});
