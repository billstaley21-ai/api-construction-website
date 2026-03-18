export default function HomePage() {
  return (
    <main>
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-left">
            <span>Licensed &amp; Insured</span>
            <span>Free Estimates</span>
            <span>Utah County &amp; Salt Lake County</span>
          </div>
          <a href="tel:+18014251766" className="topbar-phone">
            (801) 425-1766
          </a>
        </div>
      </header>

      <nav className="navbar">
        <div className="container nav-inner">
          <a href="#top" className="brand">
            <img
              src="/assets/api-logo-new.png"
              alt="A.P.I. Construction logo"
              className="brand-logo"
            />
            <div className="brand-copy">
              <strong>A.P.I. Construction</strong>
              <span>Concrete • Stucco • Siding</span>
            </div>
          </a>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#why-us">Why Us</a>
            <a href="#projects">Projects</a>
            <a href="#areas">Service Area</a>
            <a href="#contact">Contact</a>
          </div>

          <a href="#quote" className="btn btn-gold nav-cta">
            Get Free Quote
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-overlay" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Trusted Exterior Contractor in Utah</div>
            <h1>
              Covering Utah one home at a time with premium stucco, siding, and
              concrete work.
            </h1>
            <p>
              A.P.I. Construction delivers quality craftsmanship, honest pricing,
              clean job sites, and real hands-on experience across Utah County and
              Salt Lake County.
            </p>

            <div className="hero-actions">
              <a href="#quote" className="btn btn-gold">
                Request Free Quote
              </a>
              <a href="#projects" className="btn btn-outline-light">
                View Our Work
              </a>
            </div>

            <div className="hero-badges">
              <span>Stucco Specialists</span>
              <span>Hardie &amp; Siding Upgrades</span>
              <span>Concrete Flatwork</span>
            </div>
          </div>

          <div className="quote-card" id="quote">
            <div className="quote-card-top">
              <h2>Get a Free Quote</h2>
              <p>Fast response. Straight answers. No pressure.</p>
            </div>

            <form className="quote-form" action="/api/contact" method="POST">
              <div className="field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Best number to reach you"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="projectType">Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select service
                  </option>
                  <option value="Stucco">Stucco</option>
                  <option value="Siding">Siding</option>
                  <option value="Concrete">Concrete</option>
                  <option value="Exterior Remodel">Exterior Remodel</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <button type="submit" className="btn btn-gold btn-full">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="intro-strip">
        <div className="container intro-strip-grid">
          <div>
            <h3>Clean Workmanship</h3>
            <p>
              Quality work done right with sharp finish detail and pride in the
              result.
            </p>
          </div>
          <div>
            <h3>Honest Pricing</h3>
            <p>
              Clear communication and fair pricing without the runaround.
            </p>
          </div>
          <div>
            <h3>Trusted Service</h3>
            <p>
              Treating customers like family and showing up the way we say we
              will.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container two-col">
          <div className="content-block">
            <div className="section-tag">About API Construction</div>
            <h2>A family-centered construction company built on the meaning of home.</h2>
            <p>
              A.P.I. Construction was founded on the belief that every home
              deserves quality, strength, and care. “API” is the Tongan word for
              home, and that idea shapes how we approach every project.
            </p>
            <p>
              We combine hands-on field experience with a high standard for
              workmanship, professionalism, and customer service. Whether it is a
              stucco repair, new siding install, or concrete project, we focus on
              doing the job right and leaving the site clean.
            </p>
            <a href="#contact" className="btn btn-dark">
              Talk With Us
            </a>
          </div>

          <div className="feature-panel">
            <img
              src="/assets/concrete-curved-walkway.jpg"
              alt="A.P.I. Construction exterior project"
              className="feature-photo"
            />
            <div className="feature-panel-inner">
              <h3>What homeowners value most</h3>
              <ul>
                <li>Responsive communication</li>
                <li>Clean, professional job sites</li>
                <li>High-quality exterior craftsmanship</li>
                <li>Real project experience</li>
                <li>Free estimates and honest pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-heading center">
            <div className="section-tag">Our Services</div>
            <h2>Exterior services designed to protect and upgrade your property.</h2>
            <p>
              We focus on the work that improves curb appeal, weather protection,
              and long-term exterior performance.
            </p>
          </div>

          <div className="services-grid">
            <article className="service-card">
              <img
                src="/assets/stucco-house.jpg"
                alt="Stucco work by API Construction"
              />
              <div className="service-card-body">
                <h3>Stucco</h3>
                <p>
                  New stucco, repairs, patch work, exterior remediation, and
                  refreshed finishes that improve both appearance and protection.
                </p>
                <a href="#quote">Get a Stucco Quote</a>
              </div>
            </article>

            <article className="service-card">
              <img
                src="/assets/hardie-board-house.png"
                alt="Siding work by API Construction"
              />
              <div className="service-card-body">
                <h3>Siding</h3>
                <p>
                  Hardie board and exterior siding replacement for a cleaner look,
                  better durability, and stronger curb appeal.
                </p>
                <a href="#quote">Get a Siding Quote</a>
              </div>
            </article>

            <article className="service-card">
              <img
                src="/assets/concrete-flatwork.jpg"
                alt="Concrete work by API Construction"
              />
              <div className="service-card-body">
                <h3>Concrete</h3>
                <p>
                  Patios, walkways, driveways, flatwork, demo and replacement
                  work completed with an emphasis on finish quality and longevity.
                </p>
                <a href="#quote">Get a Concrete Quote</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section dark-band" id="why-us">
        <div className="container">
          <div className="section-heading center light">
            <div className="section-tag">Why Choose Us</div>
            <h2>Premium results without losing the personal touch.</h2>
            <p>
              Honest people, quality work, and a finished result you can feel
              good about.
            </p>
          </div>

          <div className="reasons-grid">
            <div className="reason-card">
              <h3>Real Jobsite Experience</h3>
              <p>
                We understand exterior work from the field, not just from a sales
                pitch.
              </p>
            </div>
            <div className="reason-card">
              <h3>Strong Communication</h3>
              <p>
                Customers deserve clarity on pricing, scope, and expectations
                from the start.
              </p>
            </div>
            <div className="reason-card">
              <h3>Work That Shows</h3>
              <p>
                Our projects are built to improve both the look and performance
                of the home.
              </p>
            </div>
            <div className="reason-card">
              <h3>Locally Focused</h3>
              <p>
                Proudly serving Utah County and Salt Lake County with responsive
                service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="container">
          <div className="section-heading">
            <div className="section-tag">Recent Projects</div>
            <h2>Real work. Real transformations. Real curb appeal.</h2>
            <p>
              Your photos do the selling here. This section should feel
              image-first and trust-building.
            </p>
          </div>

          <div className="project-grid">
            <img
              src="/assets/concrete-finish-2.jpg"
              alt="API Construction project 1"
            />
            <img
              src="/assets/concrete-finish-3.jpg"
              alt="API Construction project 2"
            />
            <img
              src="/assets/concrete-curved-walkway.jpg"
              alt="API Construction project 3"
            />
            <img
              src="/assets/concrete-driveway-edge.jpg"
              alt="API Construction project 4"
            />
            <img
              src="/assets/concrete-flatwork.jpg"
              alt="API Construction project 5"
            />
            <img
              src="/assets/hardie-board-house.png"
              alt="API Construction project 6"
            />
          </div>
        </div>
      </section>

      <section className="section before-after-section">
        <div className="container">
          <div className="section-heading center">
            <div className="section-tag">Transformation Spotlight</div>
            <h2>Before and after results that drive calls.</h2>
            <p>
              Exterior transformations are some of the strongest proof points for
              siding and stucco upgrades.
            </p>
          </div>

          <div className="before-after-grid">
            <div className="ba-card">
              <img
                src="/assets/provo-home-before.png"
                alt="Before exterior project"
              />
              <span>Before</span>
            </div>
            <div className="ba-card">
              <img
                src="/assets/hardie-board-house.png"
                alt="After exterior project"
              />
              <span>After</span>
            </div>
          </div>

          <div className="center-cta">
            <a href="#quote" className="btn btn-gold">
              Get Your Free Quote
            </a>
          </div>
        </div>
      </section>

      <section className="section area-section" id="areas">
        <div className="container two-col areas-layout">
          <div className="content-block">
            <div className="section-tag">Service Area</div>
            <h2>Serving homeowners and property owners across Northern Utah.</h2>
            <p>
              A.P.I. Construction primarily serves Utah County and Salt Lake
              County, with a focus on responsive communication, dependable
              project execution, and premium exterior results.
            </p>
            <ul className="area-list">
              <li>Orem</li>
              <li>Provo</li>
              <li>Lehi</li>
              <li>American Fork</li>
              <li>Pleasant Grove</li>
              <li>Springville</li>
              <li>Salt Lake County communities</li>
            </ul>
          </div>

          <div className="service-box">
            <img
              src="/assets/concrete-finish-2.jpg"
              alt="A.P.I. Construction service area project"
              className="service-box-photo"
            />
            <div className="service-box-body">
              <h3>Need pricing on a project?</h3>
              <p>
                Reach out with photos, address, and basic scope details and we’ll
                help you get started.
              </p>
              <a href="#quote" className="btn btn-gold btn-full">
                Request Estimate
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section final-cta" id="contact">
        <div className="container final-cta-grid">
          <div>
            <div className="section-tag light-tag">Let’s Talk</div>
            <h2>Ready to upgrade your exterior?</h2>
            <p>
              Whether you need stucco, siding, or concrete work, A.P.I.
              Construction is ready to talk through your project and provide a
              free quote.
            </p>
          </div>

          <div className="contact-card">
            <div className="contact-item">
              <strong>Phone</strong>
              <a href="tel:+18014251766">(801) 425-1766</a>
            </div>
            <div className="contact-item">
              <strong>Email</strong>
              <a href="mailto:apiconstructionprovo@gmail.com">
                apiconstructionprovo@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <strong>Address</strong>
              <span>590 W 2000 S St, Orem, UT 84058</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
