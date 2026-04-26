import React from 'react';

export default function Hero({ onContinue }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <img src="/evolution-logo.svg" alt="Evolution Audio Video Automation" className="hero-logo" />
        <h1 className="hero-title">Shade Selection Guide</h1>
        <p className="hero-tagline">
          Discover the perfect motorized roller shades for your home. Explore mounting options, light control,
          fabrics, and finishes that elevate your space.
        </p>

        <button className="begin-button" onClick={onContinue}>
          Begin Guide
        </button>
      </div>
    </section>
  );
}
