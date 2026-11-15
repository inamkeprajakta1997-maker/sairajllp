import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, IndustryCards, ContactCTA, Eyebrow } from "../components/corporate";
import { pageHead } from "../data/company";
export const Route = createFileRoute("/industries")({
  head: () =>
    pageHead(
      "Industries We Serve",
      "Industrial support for manufacturing, food and beverages, auto engineering, retail and e-commerce.",
      "/industries",
    ),
  component: () => (
    <Layout>
      <PageHero
        eyebrow="INDUSTRIES WE SERVE"
        title="Different industries. Shared ambition."
        description="Practical support shaped around the people, products and processes that drive your business."
      />
      <section className="section">
        <div className="container">
          <IndustryCards />
          <div className="industry-more">
            <Eyebrow>SUPPORT ACROSS SECTORS</Eyebrow>
            <h2>Expertise that adapts.</h2>
            <p>
              Our existing service portfolio also supports construction, corporate offices,
              educational institutions, pharmaceuticals, commercial premises and events. Discuss
              your site, workforce or logistics requirements with our team to confirm the right
              scope of service.
            </p>
          </div>
        </div>
      </section>
      <ContactCTA />
    </Layout>
  ),
});
