import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, GroupGallery, ContactCTA, Eyebrow } from "../components/corporate";
import { pageHead } from "../data/company";
export const Route = createFileRoute("/group-companies")({
  head: () =>
    pageHead(
      "Group of Companies",
      "The company showcase retained from the original Sairaj website.",
      "/group-companies",
    ),
  component: () => (
    <Layout>
      <PageHero
        eyebrow="GROUP OF COMPANIES"
        title="Together, we move forward."
        description="Preserving the business showcase from our original website."
      />
      <section className="section">
        <div className="container">
          <Eyebrow>OUR BUSINESS FAMILY</Eyebrow>
          <h2>Connected by commitment.</h2>
          <p className="section-description">
            The original website displayed these company marks under “Family Group Of Companies”.
          </p>
          <GroupGallery />
          <div className="editorial-placeholder">
            Company names, relationship descriptions and official website links are awaiting
            confirmation. The original site did not provide those details as text; no ownership or
            affiliation is inferred here.
          </div>
        </div>
      </section>
      <ContactCTA />
    </Layout>
  ),
});
