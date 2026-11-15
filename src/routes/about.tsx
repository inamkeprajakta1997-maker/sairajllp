import { createFileRoute } from "@tanstack/react-router";
import {
  Layout,
  PageHero,
  AboutIntro,
  Strengths,
  ContactCTA,
  Eyebrow,
} from "../components/corporate";
import { pageHead } from "../data/company";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About Us",
      "Discover Sairaj LLP, founded in Sahajpurwadi in 2017 by Sukhdeo Choramale.",
      "/about",
    ),
  component: About,
});
function About() {
  return (
    <Layout>
      <PageHero
        eyebrow="ABOUT US"
        title="Our commitment. Your momentum."
        description="A business built around people, dependable service and lasting relationships."
      />
      <AboutIntro />
      <section className="section pale">
        <div className="container story-grid">
          <div>
            <Eyebrow>OUR JOURNEY</Eyebrow>
            <h2>
              Rooted in experience.
              <br />
              Ready for what’s next.
            </h2>
          </div>
          <div>
            <h3>2017 · Where it began</h3>
            <p>
              Founded by Sukhdeo Choramale in Sahajpurwadi, the business began its journey as Sairaj
              Group, providing industrial services to businesses in food, beverages, auto
              engineering and manufacturing.
            </p>
            <h3>Moving forward as Sairaj LLP</h3>
            <p>
              Our updated identity brings our services together under the Sairaj LLP name,
              continuing our focus on customer satisfaction and reliable industrial support.
            </p>
            <h3>Our leadership</h3>
            <p>Sukhdeo Choramale — Founder and CEO, as listed on the original company website.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Eyebrow>OUR DIRECTION</Eyebrow>
          <h2>Purpose, with clarity.</h2>
          <div className="values-grid">
            <div>
              <h3>Vision</h3>
              <p className="editorial-placeholder">
                Company-approved vision statement to be added.
              </p>
            </div>
            <div>
              <h3>Mission</h3>
              <p className="editorial-placeholder">
                Company-approved mission statement to be added.
              </p>
            </div>
            <div>
              <h3>Our service values</h3>
              <p>
                Customer satisfaction, reliable service, tailored solutions and a commitment to
                legal compliance are described on our original website.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Strengths />
      <ContactCTA />
    </Layout>
  );
}
