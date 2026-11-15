import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, ServiceCards, ContactCTA } from "../components/corporate";
import { pageHead } from "../data/company";
export const Route = createFileRoute("/services/")({
  head: () =>
    pageHead(
      "Our Services",
      "Explore all ten industrial, logistics, manpower and facility support services from Sairaj LLP.",
      "/services",
    ),
  component: () => (
    <Layout>
      <PageHero
        eyebrow="OUR SERVICES"
        title="Every solution. One trusted partner."
        description="Ten connected services. Tailored to the everyday demands of your business."
      />
      <section className="section">
        <div className="container">
          <ServiceCards />
        </div>
      </section>
      <ContactCTA />
    </Layout>
  ),
});
