import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Layout, PageHero, InquiryForm, Eyebrow } from "../components/corporate";
import { pageHead, company } from "../data/company";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact Us",
      "Contact Sairaj LLP in Sahajpurwadi, Pune. Call +91 9922469898 or discuss your business requirements.",
      "/contact",
    ),
  component: () => (
    <Layout>
      <PageHero
        eyebrow="CONTACT US"
        title="Good partnerships start with a conversation."
        description="Let’s find the right solution for your business."
      />
      <section className="section">
        <div className="container contact-grid">
          <div>
            <Eyebrow>WE’RE HERE TO HELP</Eyebrow>
            <h2>Let’s connect.</h2>
            <p>
              Talk to our team about logistics, warehousing, manpower or any of our industrial
              support services.
            </p>
            <div className="contact-details">
              <a href={`tel:${company.tel}`}>
                <Phone />
                <span>
                  <small>CALL OUR TEAM</small>
                  {company.phone}
                </span>
              </a>
              <a href={`mailto:${company.email}`}>
                <Mail />
                <span>
                  <small>EMAIL US</small>
                  {company.email}
                </span>
              </a>
              <div>
                <MapPin />
                <span>
                  <small>VISIT US</small>
                  {company.address}
                </span>
              </div>
              <div>
                <Clock />
                <span>
                  <small>OFFICE HOURS</small>
                  {company.hours}
                </span>
              </div>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>
      <section className="map-section">
        <iframe
          title="Sairaj LLP office location — Sahajpurwadi"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </Layout>
  ),
});
