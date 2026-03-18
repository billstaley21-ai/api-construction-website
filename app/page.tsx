export default function HomePage() {
  return (
    <main>
      <div className="site-shell">
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

        <section className="hero" id="top">
          <div className="hero-overlay" />

          <nav className="hero-nav container">
            <a href="#top" className="brand">
              <img
                src="/assets/api-logo-new.png"
                alt="A.P.I. Construction"
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
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>

            <a href="#quote" className="btn btn-gold nav-cta">
              Get Free Quote
            </a>
          </nav>

          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">Trusted Exterior Contractor in Utah</div>

              <h1>
                Premium stucco, siding, and concrete work built to elevate your
                home.
              </h1>

              <p>
                A.P.I. Construction combines clean workmanship, honest pricing,
                and real field experience to deliver exterior projects that look
                sharp, last longer, and build trust from the first impression.
              </p>

              <div className="hero-actions">
                <a href="#quote" className="btn btn-gold">
                  Request Free Quote
                </a>
                <a href="#projects" className="btn btn-light">
                  View Our Work
                </a>
              </div>

              <div className="hero-pills">
                <span>Stucco Specialists</span>
                <span>Hardie &amp; Siding Upgrades</span>
                <span>Concrete Flatwork</span>
              </div>
            </div>

            <aside className="quote-card" id="quote">
              <div className="quote-card-header">
                <div className="section-kicker">Free Quote</div>
                <h2>Tell us about your project.</h2>
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
            </aside>
          </div>
        </section>

        <section className="stats-band">
          <div className="container stats-grid">
            <div className="stat-card">
              <strong>Exterior Craftsmanship</strong>
              <span>Sharp detail, clean finish, durable results.</span>
            </div>
            <div className="stat-card">
              <strong>Honest Communication</strong>
              <span>Clear pricing, realistic scope, no fluff.</span>
            </div>
            <div className="stat-card">
              <strong>Local Service</strong>
              <span>Utah County and Salt Lake County focused.</span>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container split-grid">
            <div className="content-column">
              <div className="section-kicker">About API Construction</div>
              <h2>A company built around the meaning of home.</h2>
              <p>
                A.P.I. Construction was built on the belief that every home
                deserves quality, strength, and care. “API” is the Tongan word
                for home, and that idea shapes the way we approach every project.
              </p>
              <p>
                From stucco repairs and siding upgrades to concrete flatwork, we
                focus on work that improves curb appeal, protects the property,
                and leaves the customer feeling confident in the result.
              </p>
              <p>
                We believe premium work is more than materials and finish
                quality. It is also communication, cleanliness, reliability, and
                following through.
              </p>

              <div className="about-actions">
                <a href="#services" className="btn btn-dark">
                  Explore Services
                </a>
                <a href="#contact" className="btn btn-outline-dark">
                  Talk With Us
                </a>
              </div>
            </div>

            <div className="stacked-showcase">
              <div className="showcase-primary">
                <img
                  src="/assets/stucco-house.jpg"
                  alt="Stucco home by API Construction"
                />
              </div>
              <div className="showcase-secondary">
                <img
                  src="/assets/concrete-curved-walkway.jpg"
                  alt="Concrete walkway by API Construction"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-header center">
              <div className="section-kicker">Services</div>
              <h2>Focused exterior services that protect and elevate the home.</h2>
              <p>
                We specialize in the scopes that matter most for exterior
                appearance, performance, and long-term durability.
              </p>
            </div>

            <div className="services-grid">
              <article className="service-card premium-card">
                <img
                  src="/assets/stucco-house.jpg"
                  alt="Stucco project"
                  className="service-image"
                />
                <div className="service-body">
                  <div className="service-number">01</div>
                  <h3>Stucco</h3>
                  <p>
                    Repairs, refreshes, upgrades, and complete exterior stucco
                    work with a focus on clean lines, texture consistency, and
                    curb appeal.
                  </p>
                  <a href="#quote">Get a Stucco Quote</a>
                </div>
              </article>

              <article className="service-card premium-card">
                <img
                  src="/assets/hardie-board-house.png"
                  alt="Siding project"
                  className="service-image"
                />
                <div className="service-body">
                  <div className="service-number">02</div>
                  <h3>Siding</h3>
                  <p>
                    Hardie board and exterior siding upgrades designed to create
                    a cleaner look, stronger finish, and a more modern exterior.
                  </p>
                  <a href="#quote">Get a Siding Quote</a>
                </div>
              </article>

              <article className="service-card premium-card">
                <img
                  src="/assets/concrete-flatwork.jpg"
                  alt="Concrete project"
                  className="service-image"
                />
                <div className="service-body">
                  <div className="service-number">03</div>
                  <h3>Concrete</h3>
                  <p>
                    Driveways, walkways, patios, flatwork, and replacements
                    completed with an emphasis on finish quality and clean form.
                  </p>
                  <a href="#quote">Get a Concrete Quote</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section dark-section">
          <div className="container">
            <div className="section-header center light">
              <div className="section-kicker light-kicker">Why Homeowners Choose Us</div>
              <h2>Premium results without losing the personal touch.</h2>
              <p>
                We want people to feel the difference immediately: better
                communication, better workmanship, and a finished product that
                earns trust.
              </p>
            </div>

            <div className="reasons-grid">
              <div className="reason-card">
                <h3>Clean Job Sites</h3>
                <p>
                  Professional projects should look professional from start to
                  finish.
                </p>
              </div>
              <div className="reason-card">
                <h3>Sharp Exterior Detail</h3>
                <p>
                  The lines, transitions, and finish work matter more than most
                  contractors admit.
                </p>
              </div>
              <div className="reason-card">
                <h3>Real Experience</h3>
                <p>
                  This is not sales-first contracting. It comes from hands-on
                  work in the field.
                </p>
              </div>
              <div className="reason-card">
                <h3>Fast Lead Response</h3>
                <p>
                  Customers should not have to chase down a contractor just to
                  get a quote.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section transformation-section">
          <div className="container transformation-grid">
            <div className="transformation-copy">
              <div className="section-kicker">Transformation Spotlight</div>
              <h2>Before and after work that closes deals fast.</h2>
              <p>
                Exterior transformations are one of the strongest trust builders
                on a contractor website. These are the projects that help
                homeowners imagine what is possible on their own property.
              </p>
              <a href="#quote" className="btn btn-gold">
                Request Your Quote
              </a>
            </div>

            <div className="before-after-grid">
              <div className="ba-card">
                <img
                  src="/assets/provo-home-before.png"
                  alt="Before project"
                />
                <span>Before</span>
              </div>
              <div className="ba-card">
                <img
                  src="/assets/hardie-board-house.png"
                  alt="After project"
                />
                <span>After</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section gallery-section" id="projects">
          <div className="container">
            <div className="section-header">
              <div className="section-kicker">Featured Work</div>
              <h2>Real projects that show range, finish quality, and curb appeal.</h2>
            </div>

            <div className="mosaic-grid">
              <div className="mosaic-item tall">
                <img
                  src="/assets/concrete-finish-2.jpg"
                  alt="Concrete finish project"
                />
              </div>
              <div className="mosaic-item">
                <img
                  src="/assets/concrete-finish-3.jpg"
                  alt="Concrete project"
                />
              </div>
              <div className="mosaic-item">
                <img
                  src="/assets/concrete-driveway-edge.jpg"
                  alt="Driveway edge project"
                />
              </div>
              <div className="mosaic-item wide">
                <img
                  src="/assets/concrete-curved-walkway.jpg"
                  alt="Curved walkway project"
                />
              </div>
              <div className="mosaic-item">
                <img
                  src="/assets/concrete-flatwork.jpg"
                  alt="Flatwork project"
                />
              </div>
              <div className="mosaic-item">
                <img
                  src="/assets/hardie-board-house.png"
                  alt="Siding upgrade project"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section service-area-section">
          <div className="container split-grid reverse">
            <div className="service-area-card">
              <img
                src="/assets/concrete-finish-2.jpg"
                alt="API Construction service area work"
                className="service-area-image"
              />
              <div className="service-area-body">
                <h3>Need pricing on a project?</h3>
                <p>
                  Send us your address, photos, and a short scope summary. We’ll
                  help you get moving in the right direction.
                </p>
                <a href="#quote" className="btn btn-gold btn-full">
                  Start Your Estimate
                </a>
              </div>
            </div>

            <div className="content-column">
              <div className="section-kicker">Service Area</div>
              <h2>Serving Utah County and Salt Lake County with premium exterior work.</h2>
              <p>
                A.P.I. Construction is based in Orem and focused on delivering
                strong local service with responsive communication and quality
                execution.
              </p>
              <ul className="service-area-list">
                <li>Orem</li>
                <li>Provo</li>
                <li>Lehi</li>
                <li>American Fork</li>
                <li>Pleasant Grove</li>
                <li>Springville</li>
                <li>Salt Lake County communities</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="final-cta-section" id="contact">
          <div className="container final-cta-grid">
            <div className="final-copy">
              <div className="section-kicker light-kicker">Let’s Talk</div>
              <h2>Ready to upgrade your exterior?</h2>
              <p>
                Whether you need stucco, siding, or concrete work, A.P.I.
                Construction is ready to talk through your project and provide a
                free quote.
              </p>
            </div>

            <div className="contact-panel">
              <div className="contact-row">
                <strong>Phone</strong>
                <a href="tel:+18014251766">(801) 425-1766</a>
              </div>
              <div className="contact-row">
                <strong>Email</strong>
                <a href="mailto:apiconstructionprovo@gmail.com">
                  apiconstructionprovo@gmail.com
                </a>
              </div>
              <div className="contact-row">
                <strong>Address</strong>
                <span>590 W 2000 S St, Orem, UT 84058</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
