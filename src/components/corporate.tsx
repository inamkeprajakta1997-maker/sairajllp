import { useState, type ReactNode, type FormEvent } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Warehouse,
  Truck,
  Users,
  ShieldCheck,
  Layers,
  Handshake,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { company, services, posts, testimonials, industries } from "../data/company";
import { ScrollJourney } from "./scroll-journey";
import { BrandIcon, FloatingSocialButtons } from "./social-buttons";

export function Button({
  href,
  children,
  outline = false,
}: {
  href: string;
  children: ReactNode;
  outline?: boolean;
}) {
  return (
    <a className={`button ${outline ? "outline" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const nav = [
    ["/", "Home"],
    ["/about", "About Us"],
    ["/industries", "Industries We Serve"],
    ["/group-companies", "Group Companies"],
    ["/contact", "Contact Us"],
  ];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="topbar">
        <div className="container top-inner">
          <span>
            <MapPin size={13} /> Sahajpurwadi, Pune, Maharashtra
          </span>
          <div>
            <a href={`mailto:${company.email}`}>
              <Mail size={13} />
              {company.email}
            </a>
            <a href={`tel:${company.tel}`}>
              <Phone size={13} />
              {company.phone}
            </a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container nav-inner">
          <Link to="/" className="brand" aria-label="Sairaj LLP home">
            <img src="/images/logo.svg" alt="Sairaj" width="170" height="49" />
            <span>LLP</span>
          </Link>
          <button
            className="menu-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav aria-label="Main navigation" className={open ? "nav open" : "nav"}>
            {nav.slice(0, 2).map(([href, label]) => (
              <a key={href} className={path === href ? "active" : ""} href={href}>
                {label}
              </a>
            ))}
            <div className="nav-services">
              <div className="service-nav-label">
                <a href="/services" className={path.startsWith("/services") ? "active" : ""}>
                  Services
                </a>
                <button
                  onClick={() => setDropdown(!dropdown)}
                  aria-expanded={dropdown}
                  aria-controls="service-menu"
                  aria-label="Show service menu"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
              <div id="service-menu" className={`mega ${dropdown ? "expanded" : ""}`}>
                <div>
                  <Eyebrow>WHAT WE DO</Eyebrow>
                  <h3>
                    One partner.
                    <br />
                    Everyday possibilities.
                  </h3>
                  <a href="/services" className="text-link">
                    Explore all services <ArrowRight size={17} />
                  </a>
                </div>
                <div className="mega-links">
                  {services.map((s) => (
                    <a key={s.slug} href={`/services/${s.slug}`}>
                      {s.title}
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {nav.slice(2).map(([href, label]) => (
              <a key={href} className={path === href ? "active" : ""} href={href}>
                {label}
              </a>
            ))}
            <a href="/contact" className="nav-cta">
              Get In Touch <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-about">
          <a href="/" className="brand footer-brand">
            <img src="/images/logo.svg" alt="Sairaj" width="170" height="49" />
            <span>LLP</span>
          </a>
          <p>
            Reliable industrial and logistics solutions. Bringing people, processes and businesses
            together.
          </p>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="footer-whatsapp"
          >
            <BrandIcon brand="whatsapp" size={18} /> Connect on WhatsApp <ArrowUpRight size={16} />
          </a>
        </div>
        <div>
          <h3>Explore</h3>
          {[
            ["/about", "About Us"],
            ["/services", "Our Services"],
            ["/industries", "Industries We Serve"],
            ["/group-companies", "Group Companies"],
            ["/blog", "Insights"],
            ["/inquiry", "Business Inquiry"],
          ].map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <div>
          <h3>Our Services</h3>
          {services.map((s) => (
            <a key={s.slug} href={`/services/${s.slug}`}>
              {s.title}
            </a>
          ))}
        </div>
        <div>
          <h3>Let’s Talk</h3>
          <a href={`tel:${company.tel}`}>
            <Phone size={16} />
            {company.phone}
          </a>
          <a href={`mailto:${company.email}`}>
            <Mail size={16} />
            {company.email}
          </a>
          <p>
            <MapPin size={18} />
            {company.address}
          </p>
          <p className="hours">
            Office hours
            <br />
            {company.hours}
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Sairaj LLP. All rights reserved.</span>
        <span>Industrial expertise. Personal commitment.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div id="top">
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingSocialButtons />
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  image = "/images/hero.jpg",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
}) {
  return (
    <section className="page-hero">
      <img src={image} alt="" />
      <div className="container">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          {eyebrow}
        </div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}
export function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="container cta-inner">
        <div>
          <Eyebrow>LET’S WORK TOGETHER</Eyebrow>
          <h2>
            Better business begins
            <br />
            with the right partner.
          </h2>
          <p>Connect with Sairaj LLP to discuss your business requirements.</p>
        </div>
        <div className="cta-actions">
          <Button href="/contact">Get In Touch</Button>
          <a
            className="whatsapp-link"
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            <BrandIcon brand="whatsapp" size={20} /> WhatsApp Us <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
export function ServiceCards({ items = services }: { items?: typeof services }) {
  return (
    <div className="service-grid">
      {items.map((s, i) => (
        <a className="service-card" key={s.slug} href={`/services/${s.slug}`}>
          <div className="service-image">
            <img src={s.image} alt={s.title} loading="lazy" width="600" height="400" />
            <span className="card-number">
              {String(services.indexOf(s) + 1 || i + 1).padStart(2, "0")}
            </span>
            <span className="card-arrow">
              <ArrowUpRight size={23} />
            </span>
          </div>
          <div className="service-copy">
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <span className="text-link">
              Explore Service <ArrowRight size={16} />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
export function AboutIntro() {
  return (
    <section className="section">
      <div className="container about-grid">
        <div className="about-photo">
          <img
            src="/images/warehouse.png"
            alt="Warehouse infrastructure and storage"
            loading="lazy"
            width="620"
            height="500"
          />
          <div className="experience">
            <strong>2017</strong>
            <span>
              The beginning of
              <br />
              our journey
            </span>
          </div>
          <div className="image-caption">ROOTED IN PUNE. BUILT FOR BUSINESS.</div>
        </div>
        <div className="about-copy">
          <Eyebrow>ABOUT SAIRAJ LLP</Eyebrow>
          <h2>
            A trusted partner.
            <br />A stronger tomorrow.
          </h2>
          <p className="lead">Industrial expertise, with a commitment that goes beyond service.</p>
          <p>
            Founded in 2017 by Sukhdeo Choramale in Sahajpurwadi, our business brings together
            manpower, logistics, warehousing and industrial support under one roof.
          </p>
          <p>
            Now moving forward as Sairaj LLP, we continue to support businesses with dependable
            services, tailored to their day-to-day operational needs.
          </p>
          <div className="about-checks">
            <span>
              <Check /> Integrated business solutions
            </span>
            <span>
              <Check /> Customer-focused approach
            </span>
          </div>
          <Button href="/about">Discover Our Story</Button>
        </div>
      </div>
    </section>
  );
}
const strengths = [
  {
    icon: ShieldCheck,
    title: "Dependability at every step",
    text: "A focus on safe handling, consistent delivery and reliable operational support.",
  },
  {
    icon: Layers,
    title: "Solutions that work together",
    text: "From storage and transport to staffing and facility care, coordinated around your business.",
  },
  {
    icon: Users,
    title: "People who make a difference",
    text: "Administrative, skilled, semi-skilled and unskilled teams for diverse industrial requirements.",
  },
  {
    icon: Handshake,
    title: "Your needs, our commitment",
    text: "Flexible service plans and personal attention to your requirements.",
  },
];
export function Strengths() {
  return (
    <section className="section why">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>THE SAIRAJ ADVANTAGE</Eyebrow>
            <h2>
              More than a service.
              <br />A partnership you can rely on.
            </h2>
          </div>
          <p>
            Practical solutions. Dedicated people. A shared focus on keeping your business moving.
          </p>
        </div>
        <div className="strength-grid">
          {strengths.map(({ icon: Icon, title, text }, i) => (
            <div key={title}>
              <span className="strength-icon">
                <Icon size={28} />
              </span>
              <span className="small-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function IndustryCards() {
  return (
    <div className="industry-grid">
      {industries.map(([title, text, image]) => (
        <a key={title} className="industry-card" href="/inquiry">
          <img src={image} alt={title} loading="lazy" width="500" height="600" />
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
            <ArrowUpRight size={22} />
          </div>
        </a>
      ))}
    </div>
  );
}
export function GroupGallery() {
  return (
    <div className="group-gallery">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i}>
          <img
            src={`/images/group-${i + 1}.png`}
            alt={`Company mark ${i + 1} from the original Sairaj website showcase`}
            loading="lazy"
            width="200"
            height="100"
          />
        </div>
      ))}
    </div>
  );
}
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index]!;
  return (
    <section className="section testimonials">
      <div className="container testimonial-layout">
        <div>
          <Eyebrow>BUILT ON TRUST</Eyebrow>
          <h2>
            Partnerships that
            <br />
            speak for themselves.
          </h2>
          <p>Words from customers on our original website.</p>
          <div className="slider-controls">
            <button onClick={() => setIndex((index + 2) % 3)} aria-label="Previous testimonial">
              <ChevronLeft />
            </button>
            <button onClick={() => setIndex((index + 1) % 3)} aria-label="Next testimonial">
              <ChevronRight />
            </button>
            <span>0{index + 1} / 03</span>
          </div>
        </div>
        <div className="quote-card" aria-live="polite">
          <span className="quote-mark">“</span>
          <blockquote>{t.quote}</blockquote>
          <div className="quote-person">
            <span>
              {t.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <div>
              <strong>{t.name}</strong>
              <small>Customer</small>
            </div>
            <span className="quote-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
export function BlogCards({ limit }: { limit?: number }) {
  return (
    <div className="blog-grid">
      {posts.slice(0, limit).map((p, i) => (
        <a href={`/blog/${p.slug}`} className="blog-card" key={p.slug}>
          <div className="blog-photo">
            <img
              src={`/images/blog-${i}.jpg`}
              alt={p.title}
              width="600"
              height="400"
              loading="lazy"
            />
          </div>
          <div className="blog-meta">
            <span>{p.tags[0] || p.category}</span>
            <time dateTime={p.date}>
              {new Date(p.date + "T12:00:00Z").toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
          </div>
          <h3>{p.title}</h3>
          <span className="text-link">
            Read Article <ArrowUpRight size={17} />
          </span>
        </a>
      ))}
    </div>
  );
}
export function Home() {
  return (
    <Layout>
      <section className="hero">
        <img
          className="hero-bg"
          src="/images/hero.jpg"
          alt="Industrial warehouse with forklift, storage and goods transportation"
          fetchPriority="high"
          width="1792"
          height="1024"
        />
        <div className="container hero-content">
          <Eyebrow>RELIABLE INDUSTRIAL & LOGISTICS SOLUTIONS</Eyebrow>
          <h1>
            Moving businesses
            <br />
            forward.
            <br />
            <span>Together.</span>
          </h1>
          <p>
            Dependable logistics, warehousing, manpower and industrial support. One trusted partner
            for the way your business moves.
          </p>
          <div className="hero-buttons">
            <Button href="/services">Explore Our Services</Button>
            <Button href="/contact" outline>
              Talk to Our Team
            </Button>
          </div>
          <div className="hero-bottom">
            <a href="#about">
              <span className="scroll-circle">
                <ArrowDown size={17} />
              </span>
              SCROLL TO EXPLORE
            </a>
            <span>PEOPLE. PROCESSES. POSSIBILITIES.</span>
          </div>
        </div>
        <div className="hero-side">BUILT ON TRUST. DRIVEN BY COMMITMENT.</div>
      </section>
      <div className="capability-strip">
        <div className="container">
          {[
            { icon: Warehouse, title: "Warehousing", sub: "Space to grow" },
            { icon: Truck, title: "Logistics", sub: "Connected across India" },
            { icon: Users, title: "Manpower", sub: "People you can count on" },
            { icon: ShieldCheck, title: "Industrial Support", sub: "Everyday excellence" },
          ].map(({ icon: Icon, title, sub }) => (
            <a href="/services" key={title}>
              <Icon size={29} />
              <div>
                <strong>{title}</strong>
                <span>{sub}</span>
              </div>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
      </div>
      <ScrollJourney />
      <div id="about">
        <AboutIntro />
      </div>
      <section className="section services-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>OUR CORE SERVICES</Eyebrow>
              <h2>
                Every solution.
                <br />
                One dependable partner.
              </h2>
            </div>
            <div>
              <p>
                Comprehensive support for the everyday demands of your business. Designed around
                you.
              </p>
              <a className="text-link" href="/services">
                View All Services <ArrowUpRight size={19} />
              </a>
            </div>
          </div>
          <ServiceCards />
        </div>
      </section>
      <Strengths />
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>INDUSTRIES WE SERVE</Eyebrow>
              <h2>
                Understanding your industry.
                <br />
                Supporting your ambition.
              </h2>
            </div>
            <a href="/industries" className="text-link">
              Explore Industries <ArrowUpRight size={18} />
            </a>
          </div>
          <IndustryCards />
        </div>
      </section>
      <section className="capabilities">
        <div className="container capabilities-inner">
          <Eyebrow>CONNECTED CAPABILITIES</Eyebrow>
          <h2>
            From the warehouse floor
            <br />
            to the road ahead.
          </h2>
          <div>
            <span>Store & distribute</span>
            <ArrowRight />
            <span>People & operations</span>
            <ArrowRight />
            <span>Move & deliver</span>
          </div>
          <Button href="/inquiry">Discuss Your Requirements</Button>
        </div>
      </section>
      <section className="section group-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>OUR BUSINESS FAMILY</Eyebrow>
              <h2>Connected by commitment.</h2>
            </div>
            <a className="text-link" href="/group-companies">
              Group of Companies <ArrowUpRight size={18} />
            </a>
          </div>
          <GroupGallery />
        </div>
      </section>
      <Testimonials />
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>KNOWLEDGE & PERSPECTIVES</Eyebrow>
              <h2>Insights that move us forward.</h2>
            </div>
            <a href="/blog" className="text-link">
              All Insights <ArrowUpRight size={18} />
            </a>
          </div>
          <BlogCards limit={3} />
        </div>
      </section>
      <ContactCTA />
    </Layout>
  );
}
export function InquiryForm({ shipment = false }: { shipment?: boolean }) {
  const [status, setStatus] = useState<"idle" | "preparing" | "ready" | "error">("idle");
  const [draft, setDraft] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("preparing");
    try {
      const data = new FormData(e.currentTarget);
      const text = [
        `Hello Sairaj LLP,`,
        ...Array.from(data.entries()).map(([k, v]) => `${k}: ${v}`),
      ].join("\n");
      setDraft(text);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }
  return (
    <form
      className="inquiry-form"
      onSubmit={submit}
      onChange={() => {
        if (status === "ready") setStatus("idle");
      }}
    >
      <Eyebrow>{shipment ? "BUSINESS & SHIPMENT INQUIRY" : "LET’S START A CONVERSATION"}</Eyebrow>
      <h2>{shipment ? "Tell us what you need." : "How can we help you?"}</h2>
      <p>Share your requirements and choose email or WhatsApp to send them directly to our team.</p>
      <div className="form-grid">
        <label>
          Your name
          <input required name="Name" autoComplete="name" maxLength={100} placeholder="Full name" />
        </label>
        <label>
          Email address
          <input
            required
            type="email"
            name="Email"
            autoComplete="email"
            maxLength={150}
            placeholder="you@company.com"
          />
        </label>
        <label>
          Phone number
          <input
            required
            type="tel"
            name="Phone"
            autoComplete="tel"
            pattern={"[+0-9\\s\\(\\)\\-]{7,20}"}
            title="Enter a valid phone number (7–20 characters)"
            placeholder="+91"
          />
        </label>
        <label>
          Service required
          <select name="Service" required defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
          </select>
        </label>
        {shipment && (
          <>
            <label>
              Delivery city
              <input name="Delivery city" required placeholder="Destination city" maxLength={100} />
            </label>
            <label>
              Shipment type
              <select name="Shipment type">
                <option>Express</option>
                <option>Regular</option>
              </select>
            </label>
          </>
        )}
      </div>
      <label>
        {shipment ? "Shipment / business details" : "Your message"}
        <textarea
          name="Message"
          rows={4}
          maxLength={3000}
          placeholder="Tell us about your requirements, location and preferred timeline."
        />
      </label>
      <p className="form-note">
        This form prepares your inquiry. It is sent only when you complete sending in your email app
        or WhatsApp.
      </p>
      <button className="button" disabled={status === "preparing"} type="submit">
        {status === "preparing" ? "Preparing…" : "Prepare Inquiry"}
        <ArrowUpRight size={18} />
      </button>
      <div aria-live="polite">
        {status === "ready" && (
          <div className="form-result">
            <strong>Your inquiry is ready to send.</strong>
            <p>Choose a channel below to complete sending. No inquiry has been submitted yet.</p>
            <a
              className="text-link"
              href={`mailto:${company.email}?subject=${encodeURIComponent("Business inquiry — Sairaj LLP")}&body=${encodeURIComponent(draft)}`}
            >
              Open Email <Mail size={17} />
            </a>
            <a
              className="text-link"
              target="_blank"
              rel="noreferrer"
              href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(draft)}`}
            >
              Send via WhatsApp <BrandIcon brand="whatsapp" size={17} />
            </a>
          </div>
        )}
        {status === "error" && (
          <p role="alert">Unable to prepare your inquiry. Please call {company.phone}.</p>
        )}
      </div>
    </form>
  );
}
export function ContentBlocks({ blocks }: { blocks: { type: string; text: string }[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) =>
        b.type === "heading" ? (
          <h3 key={i}>{b.text}</h3>
        ) : b.type === "item" ? (
          <p className="prose-item" key={i}>
            <Check size={16} />
            <span>{b.text}</span>
          </p>
        ) : (
          <p key={i}>{b.text}</p>
        ),
      )}
    </div>
  );
}
