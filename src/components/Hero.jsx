import React from 'react';

export default function Hero() {
  const handleScroll = () => {
    const howShadesWorks = document.getElementById('how-shades-work');
    howShadesWorks?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <img src="/evolution-logo.svg" alt="Evolution Audio Video Automation" className="hero-logo" />
        <h1 className="hero-title">Shade Selection Guide</h1>
        <p className="hero-tagline">Understanding your options for the perfect motorized window treatment</p>

        <button className="scroll-button" onClick={handleScroll} aria-label="Scroll to next section">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      <div className="hero-background-animation">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
    </section>
  );
}
