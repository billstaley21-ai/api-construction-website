"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { gallery, services, site } from "@/lib/site";

type FormState = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
};

const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" }
];

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  projectType: "Concrete",
  message: ""
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string>("");

  const filteredGallery = useMemo(() => {
    if (activeFilter === "All") return gallery;
    return gallery.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to submit form.");
      }

      setNotice("Thanks. Your request was sent successfully.");
      setForm(initialForm);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setNotice(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-links">
            <a href={site.phoneHref}>{site.phoneDisplay}</a>
            <a href={site.emailHref}>{site.email}</a>
          </div>
          <div className="topbar-trust">{site.trustLine}</div>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <a href="#home" className="brand">
            <Image src="/assets/api-logo-new.png" alt="A.P.I. Construction logo" width={220} height={78} className="brand-logo" priority />
            <div className="brand-copy">
              <span>{site.shortCompany}</span>
              <small>Concrete • Stucco • Siding</small>
            </div>
          </a>

          <nav className="desktop-nav">
            {nav.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a href="#contact" className="button button-primary">
              Get a Free Estimate
            </a>
            <button className="menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle navigation">
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-nav">
            <div className="container mobile-nav-inner">
              {nav.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="home" className="hero section-dark">
        <Image
          src="/assets/stucco-house.jpg"
          alt="Premium stucco home exterior by A.P.I. Construction"
          fill
          priority
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="eyebrow">Licensed & insured • Free estimates</div>
          <h1>Premium concrete, stucco, and siding work built to last.</h1>
          <p>
            A.P.I. Construction delivers high-quality exterior construction with clean workmanship, honest pricing,
            and a standard of care that treats every project like home.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="button button-primary">
              Get a Free Estimate
            </a>
            <a href="#gallery" className="button button-secondary">
              View Our Work
            </a>
          </div>
          <div className="hero-mini">Concrete • Stucco • Siding Experts in Utah</div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-strip-inner">
          <span>Licensed & Insured</span>
          <span>Free Estimates</span>
          <span>Quality Work Done Right</span>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container two-col about-grid">
          <div>
            <div className="section-tag">About A.P.I. Construction</div>
            <h2>More than construction. It’s about home.</h2>
          </div>
          <div className="body-copy">
            <p>
              A.P.I. Construction was built on more than craftsmanship. It was built on family, integrity, and doing
              things the right way.
            </p>
            <p>
              “API” comes from the Tongan word for <strong>home</strong>, and that meaning drives every project we take
              on. A home is more than a structure. It is where people build their lives, protect what matters, and
              create something lasting.
            </p>
            <p>
              Founded by Lata Iongi, our company is rooted in hard work, honesty, and pride in every detail. We believe
              in showing up, doing what we say we are going to do, and delivering results that last.
            </p>
            <p>
              <strong>We don’t cut corners. We don’t chase shortcuts. We do the job right the first time.</strong>
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="section section-dark">
        <div className="container">
          <div className="section-tag">Services</div>
          <h2 className="light">Concrete, stucco, and siding services with premium-level execution.</h2>
          <p className="section-intro light-copy">
            High-quality exterior construction for homeowners who want the project done cleanly, professionally, and
            with lasting results.
          </p>

          <div className="service-grid">
            {services.map((service) => (
              <article key={service.title} className="card service-card">
                <div className="card-image-wrap">
                  <Image src={service.image} alt={service.alt} width={1200} height={900} className="card-image" />
                </div>
                <div className="card-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="text-link">
                    Request a quote →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container highlight-grid">
          <div>
            <div className="section-tag">Real Projects</div>
            <h2>From worn out to done right.</h2>
            <p className="section-intro">
              We don’t just install. We transform spaces with craftsmanship, attention to detail, and finishes that
              instantly elevate curb appeal.
            </p>
            <div className="values-box">
              <span>Honest, transparent pricing</span>
              <span>Clean, professional job sites</span>
              <span>Premium workmanship</span>
              <span>Treating every customer like family</span>
            </div>
          </div>
          <div className="before-after-grid">
            <article className="card image-card">
              <Image src="/assets/concrete-patio-before.jpg" alt="Before patio project photo" width={900} height={1200} className="tall-image" />
              <div className="image-card-copy">
                <small>Before</small>
                <h3>Outdated surface</h3>
              </div>
            </article>
            <article className="card image-card image-card-offset">
              <Image src="/assets/concrete-curved-walkway.jpg" alt="After patio project photo" width={900} height={1200} className="tall-image" />
              <div className="image-card-copy">
                <small>After</small>
                <h3>Clean, durable finish</h3>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="gallery" className="section section-muted">
        <div className="container">
          <div className="gallery-header">
            <div>
              <div className="section-tag">Our Work</div>
              <h2>Real projects. Real results. Quality you can see.</h2>
              <p className="section-intro">
                Explore recent concrete, stucco, and siding work completed across Utah County and Salt Lake County.
              </p>
            </div>
            <div className="gallery-filters">
              {["All", "Concrete", "Stucco", "Siding"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={activeFilter === filter ? "filter-active" : "filter-button"}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-grid">
            {filteredGallery.map((item) => (
              <article key={`${item.title}-${item.image}`} className="card gallery-card">
                <Image src={item.image} alt={item.alt} width={1200} height={900} className="gallery-image" />
                <div className="gallery-copy">
                  <span className="badge">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container area-box">
          <div>
            <div className="section-tag light-tag">Service Area</div>
            <h2 className="light">Serving Utah with pride</h2>
          </div>
          <div>
            <p className="light-copy large-copy">{site.serviceArea}</p>
            <p className="light-copy compact-copy">
              Looking for a concrete contractor in Orem, a stucco contractor in Utah County, or Hardie board siding
              installation in Provo? A.P.I. Construction is built to deliver premium results with honest service.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container contact-grid">
          <div>
            <div className="section-tag">Contact Us</div>
            <h2>Get a free estimate.</h2>
            <p className="section-intro">Ready to start your project? Call, text, or send us a message and we’ll get back to you quickly.</p>
            <div className="contact-cards">
              <a href={site.phoneHref} className="contact-card">
                <small>Call or Text</small>
                <strong>{site.phoneDisplay}</strong>
              </a>
              <a href={site.emailHref} className="contact-card">
                <small>Email</small>
                <strong>{site.email}</strong>
              </a>
            </div>
            <div className="contact-note">
              <strong>{site.serviceArea}</strong>
              <p>{site.trustLine}</p>
            </div>
          </div>

          <form className="card form-card" onSubmit={submitForm}>
            <div className="form-grid">
              <label>
                <span>Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </label>
              <label>
                <span>Phone</span>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Your phone number"
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Your email"
                  required
                />
              </label>
              <label>
                <span>Project Type</span>
                <select value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
                  <option>Concrete</option>
                  <option>Stucco</option>
                  <option>Siding</option>
                </select>
              </label>
              <label className="full-width">
                <span>Message</span>
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project"
                  required
                />
              </label>
            </div>
            <div className="form-footer">
              <div>{site.trustLine}</div>
              <button type="submit" className="button button-dark" disabled={submitting}>
                {submitting ? "Sending..." : "Request Free Estimate"}
              </button>
            </div>
            {notice ? <p className="form-notice">{notice}</p> : null}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Image src="/assets/api-logo-new.png" alt="A.P.I. Construction logo" width={220} height={78} className="brand-logo" />
            <p>
              Premium concrete, stucco, and siding services with honest pricing, clean job sites, and quality work done
              right.
            </p>
          </div>
          <div>
            <h3>Navigation</h3>
            {nav.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <h3>Contact</h3>
            <a href={site.phoneHref}>{site.phoneDisplay}</a>
            <a href={site.emailHref}>{site.email}</a>
            <p>{site.serviceArea}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <span>© {new Date().getFullYear()} A.P.I. Construction LLC. All rights reserved.</span>
            <span>{site.trustLine}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
