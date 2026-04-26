import React from 'react';

export default function Summary({ onReviewClick }) {
  return (
    <section className="section summary">
      <div className="section-content">
        <h2 className="section-title">What to Expect</h2>
        <p className="section-subtitle">Your journey to the perfect motorized shades</p>

        <div className="summary-grid">
          <div className="summary-card">
            <div className="card-number">1</div>
            <h3>Consultation</h3>
            <p>
              Our design team will visit your home to understand your space, light needs, and aesthetic preferences.
              We'll discuss mounting options, fabric choices, and automation capabilities.
            </p>
          </div>

          <div className="summary-card">
            <div className="card-number">2</div>
            <h3>Design & Planning</h3>
            <p>
              We'll create detailed specifications for your installation, including precise measurements, fabric selections,
              mounting hardware, and light control solutions tailored to each window.
            </p>
          </div>

          <div className="summary-card">
            <div className="card-number">3</div>
            <h3>Fabric Sampling</h3>
            <p>
              We'll provide physical fabric samples so you can see exactly how each option looks in your space under
              your natural and artificial lighting conditions.
            </p>
          </div>

          <div className="summary-card">
            <div className="card-number">4</div>
            <h3>Custom Fabrication</h3>
            <p>
              Your shades are custom-made to your exact specifications. Each unit is tested for quality and smooth operation
              before shipment to ensure perfection.
            </p>
          </div>

          <div className="summary-card">
            <div className="card-number">5</div>
            <h3>Professional Installation</h3>
            <p>
              Our certified technicians will install your shades with precision, ensuring perfect alignment, smooth operation,
              and beautiful integration with your home.
            </p>
          </div>

          <div className="summary-card">
            <div className="card-number">6</div>
            <h3>Training & Support</h3>
            <p>
              We'll train you on how to operate your shades, explain your remote control, and walk you through any smart home
              integration. Lifetime technical support is always available.
            </p>
          </div>
        </div>

        <div className="final-message">
          <div className="message-content">
            <h3>Ready to Transform Your Space?</h3>
            <p>
              Motorized roller shades are more than a window treatment—they're an investment in comfort, convenience,
              and the overall aesthetic of your home. Our team is committed to guiding you through every step of the process
              to ensure complete satisfaction.
            </p>

            <p className="emphasis-message">
              Your Evolution Audio • Video • Automation team is here to answer any questions and help you make the
              perfect choice for every window in your home.
            </p>

            <div className="contact-info">
              <h4>Get Started Today</h4>
              <p>
                Contact us to schedule a consultation. Let's create something beautiful together.
              </p>
              <div className="contact-details">
                <p>
                  <strong>Evolution Audio • Video • Automation</strong><br />
                  Bozeman, Montana<br />
                  <a href="tel:+1-406-555-0100">Call us</a> | <a href="mailto:info@evolution.local">Email us</a>
                </p>
              </div>

              <button
                className="begin-button"
                onClick={onReviewClick}
                style={{ marginTop: '24px', width: '100%' }}
              >
                Review & Send Selections
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
