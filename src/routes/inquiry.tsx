import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, InquiryForm } from "../components/corporate";
import { pageHead } from "../data/company";
export const Route = createFileRoute("/inquiry")({
  head: () =>
    pageHead(
      "Business & Shipment Inquiry",
      "Discuss your shipment, destination, service and industrial business requirements with Sairaj LLP.",
      "/inquiry",
    ),
  component: () => (
    <Layout>
      <PageHero
        eyebrow="BUSINESS INQUIRY"
        title="Your next move starts here."
        description="From a single shipment to ongoing operational support, tell us what your business needs."
      />
      <section className="section pale">
        <div className="container form-container">
          <InquiryForm shipment />
        </div>
      </section>
    </Layout>
  ),
});
