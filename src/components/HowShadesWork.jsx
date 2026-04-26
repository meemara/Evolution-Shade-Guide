import React from 'react';

export default function HowShadesWork() {
  return (
    <section className="section how-shades-work">
      <div className="section-content">
        <div className="split-layout">
          <div className="split-image">
            <img
              src="https://www.lutron.com/us/sites/hub_americas/files/styles/hero_homepage_and_interior_desktop_medium_2x/public/2025-09/b-roll-brooklyn-heights-0423-still-1.jpg"
              alt="Bedroom with motorized roller shades and city skyline view"
            />
          </div>

          <div className="split-content">
            <h2>How Motorized Roller Shades Work</h2>
            <p>
              Motorized roller shades provide elegant, seamless control of natural light and privacy in any space.
              A custom-cut fabric rolls smoothly up and down on a motorized tube, allowing you to adjust light
              levels from complete blackout to bright transparency—all from a remote, app, or voice command.
            </p>

            <p>
              The system integrates seamlessly with smart home ecosystems, offering preset positions, scheduling,
              and voice control. You choose the mounting style, fabric opacity, hembar finish, and light-control
              solutions to match your design vision perfectly.
            </p>

            <div className="features-list">
              <div className="feature-item">
                <h4>Smart Control</h4>
                <p>Remote, app, or voice assistant integration</p>
              </div>
              <div className="feature-item">
                <h4>Whisper Quiet</h4>
                <p>Virtually silent motorized operation</p>
              </div>
              <div className="feature-item">
                <h4>Infinite Options</h4>
                <p>80+ premium fabrics in multiple opacities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
