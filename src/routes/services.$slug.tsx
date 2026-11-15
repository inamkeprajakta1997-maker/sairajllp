import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  Layout,
  PageHero,
  Eyebrow,
  ContentBlocks,
  ServiceCards,
  ContactCTA,
  Button,
} from "../components/corporate";
import { services, pageHead, company } from "../data/company";
export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug || s.sourceSlug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(
          loaderData.service.title,
          loaderData.service.description,
          `/services/${loaderData.service.slug}`,
        )
      : {},
  component: Service,
});
function Service() {
  const { service: s } = Route.useLoaderData();
  return (
    <Layout>
      <PageHero eyebrow={s.title} title={s.headline} description={s.description} image={s.image} />
      <section className="section">
        <div
          className={`container detail-layout ${services.findIndex((item) => item.slug === s.slug) % 2 ? "alternate" : ""}`}
        >
          <article>
            <Eyebrow>BUILT AROUND YOUR REQUIREMENTS</Eyebrow>
            <h2>{s.title}</h2>
            <ContentBlocks blocks={s.blocks || []} />
          </article>
          <aside>
            <h3>Find your solution</h3>
            {services.map((item) => (
              <a
                className={item.slug === s.slug ? "selected" : ""}
                href={`/services/${item.slug}`}
                key={item.slug}
              >
                {item.title}
                <span>↗</span>
              </a>
            ))}
            <div className="aside-contact">
              <h3>Let’s discuss your needs.</h3>
              <p>Our team can help you choose the right service for your business.</p>
              <Button href="/inquiry">Make an Inquiry</Button>
              <a href={`tel:${company.tel}`}>{company.phone}</a>
            </div>
          </aside>
        </div>
      </section>
      <section className="section pale">
        <div className="container">
          <Eyebrow>CONNECTED SERVICES</Eyebrow>
          <h2>Support that goes further.</h2>
          <ServiceCards items={services.filter((item) => item.slug !== s.slug).slice(0, 3)} />
        </div>
      </section>
      <ContactCTA />
    </Layout>
  );
}
