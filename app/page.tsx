export default function HomePage() {
  return (
    <main>
      <div className="topbar">
        <div className="container topbar-inner">
          <div>Licensed &amp; Insured • Free Estimates</div>
          <div>Quality Work Done Right</div>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav">
          <a href="#" className="brand">
            <div className="brand-mark">API</div>
            <div className="brand-text">
              <strong>A.P.I. Construction</strong>
              <span>Concrete • Stucco • Siding</span>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="#contact" className="btn btn-primary">
            Get a Free Estimate
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">Trusted concrete, stucco, and siding contractor</div>
            <h1>Premium concrete, stucco, and siding work built to last.</h1>
            <p>
              A.P.I. Construction delivers high-quality exterior construction with clean
              workmanship, honest pricing, and a standard of care that treats every project
              like home.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Get a Free Estimate
              </a>
              <a href="#services" className="btn btn-secondary">
                View Services
              </a>
            </div>

            <div className="hero-points">
              <span>Concrete</span>
              <span>Stucco</span>
              <span>Siding</span>
              <span>Serving Utah County &amp; Salt Lake County</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container about-grid">
          <div>
            <div className="section-label">About API Construction</div>
            <h2 className="section-title">Built on quality, honesty, and pride in the work.</h2>
            <p className="section-text">
              API Construction was built on the belief that every home deserves quality,
              strength, and care.
            </p>
            <p className="section-text">
              Our founder, Lata Iongi, immigrated to the United States as a teenager,
              bringing with him the values of hard work, family, and craftsmanship. After
              years of hands-on experience across the construction industry, Lata earned his
              contracting license in 2003 and started his own company—naming it API, the
              Tongan word for home.
            </p>
            <p className="section-text">
              Today, A.P.I. Construction continues that mission: quality work done right,
              honest pricing, clean job sites, and treating every customer like family.
            </p>
          </div>

          <div className="about-card">
            <div className="about-logo">API</div>
            <div className="about-card-content">
              <h3>Why homeowners choose us</h3>
              <ul className="check-list">
                <li>Licensed and insured</li>
                <li>Free estimates</li>
                <li>Clean, professional job sites</li>
                <li>Honest pricing and clear communication</li>
                <li>Concrete, stucco, and siding specialists</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section section-alt">
        <div className="container">
          <div className="section-label">Services</div>
          <h2 className="section-title">Exterior construction services you can count on.</h2>
          <p className="section-text section-intro">
            We focus on the work that protects, strengthens, and upgrades the exterior of your
            property.
          </p>

          <div className="services-grid">
            <article className="service-card">
              <h3>Concrete</h3>
              <p>
                Driveways, patios, walkways, flatwork, replacements, and new pours completed
                with durability and clean finish work in mind.
              </p>
            </article>

            <article className="service-card">
              <h3>Stucco</h3>
              <p>
                New stucco, patch and repair work, remediation, and exterior upgrades with a
                focus on weather protection and curb appeal.
              </p>
            </article>

            <article className="service-card">
              <h3>Siding</h3>
              <p>
                Fiber cement and exterior siding installation and replacement that improves the
                look, performance, and longevity of your home.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="gallery" className="section">
        <div className="container">
          <div className="section-label">Our Work</div>
          <h2 className="section-title">A standard of workmanship you can see.</h2>

          <div className="gallery-grid">
            <div className="gallery-card">
              <div className="gallery-placeholder">Project Photo</div>
            </div>
            <div className="gallery-card">
              <div className="gallery-placeholder">Project Photo</div>
            </div>
            <div className="gallery-card">
              <div className="gallery-placeholder">Project Photo</div>
            </div>
          </div>

          <p className="gallery-note">
            Replace these placeholders with your actual project photos when you’re ready.
          </p>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container contact-grid">
          <div>
            <div className="section-label">Contact</div>
            <h2 className="section-title">Let’s talk about your project.</h2>
            <p className="section-text">
              Reach out for a free estimate. We serve homeowners and property owners across
              Utah County and Salt Lake County.
            </p>

            <div className="contact-info">
              <div>
                <strong>Phone</strong>
                <a href="tel:+18014251766">(801) 425-1766</a>
              </div>
              <div>
                <strong>Email</strong>
                <a href="mailto:apiconstructionprovo@gmail.com">
                  apiconstructionprovo@gmail.com
                </a>
              </div>
              <div>
                <strong>Location</strong>
                <span>590 W 2000 S St, Orem, UT 84058</span>
              </div>
            </div>
          </div>

          <form className="contact-form" action="/api/contact" method="POST">
            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required />
              </div>

              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" required />
              </div>

              <div className="field field-full">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />
              </div>

              <div className="field field-full">
                <label htmlFor="projectType">Project Type</label>
                <select id="projectType" name="projectType" required defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="Concrete">Concrete</option>
                  <option value="Stucco">Stucco</option>
                  <option value="Siding">Siding</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="field field-full">
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us about your project..."
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Submit Request
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
