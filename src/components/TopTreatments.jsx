import React, { useState } from 'react';

export default function TopTreatments() {
  const [activeStyle, setActiveStyle] = useState('open');

  const styles = [
    {
      id: 'open',
      name: 'Open Roll',
      description: 'The roller mechanism is fully exposed at the top. This is the most minimal, modern aesthetic.',
      aesthetic: 'Contemporary, minimalist',
      bestFor: 'Modern homes, clean-lined spaces, industrial design',
      considerations: 'Roller mechanism is visible; requires aesthetic roller tube design',
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-08/serena-select-open-roll-flip-bright-flipped.jpg',
      photoAlt: 'Close-up of open roll roller shade showing exposed roller mechanism'
    },
    {
      id: 'fascia',
      name: 'Fascia',
      description: 'A decorative panel or cover conceals the roller mechanism at the top. Available in various finishes to match your decor.',
      aesthetic: 'Traditional to contemporary, customizable',
      bestFor: 'Mid-century modern, transitional, or traditional interiors',
      considerations: 'Adds slightly more visual weight; requires installation on wall or frame',
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-08/sivoia-QS-triathlon-battery-roller-detail-fascia-closed-1_0.jpg',
      photoAlt: 'Close-up of roller shade with fabric-wrapped fascia concealing the roller'
    },
    {
      id: 'pocket',
      name: 'Pocket / Recessed',
      description: 'The roller is completely hidden in a recessed cavity built into the ceiling or wall. The cleanest, most luxurious solution.',
      aesthetic: 'Luxury minimalist, seamless',
      bestFor: 'High-end homes, custom renovations, luxury interiors',
      considerations: 'Requires structural modification; most expensive option',
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-08/sivoia-roller-recessed-pocket.jpg',
      photoAlt: 'Roller shade installed in a recessed ceiling pocket for seamless appearance'
    }
  ];

  const activeStyle_data = styles.find(s => s.id === activeStyle);

  return (
    <section className="section top-treatments">
      <div className="section-content">
        <h2 className="section-title">Top Treatments</h2>
        <p className="section-subtitle">How your roller mechanism will look when raised</p>

        <div className="treatments-tabs">
          {styles.map(style => (
            <button
              key={style.id}
              className={`treatment-tab ${activeStyle === style.id ? 'active' : ''}`}
              onClick={() => setActiveStyle(style.id)}
            >
              {style.name}
            </button>
          ))}
        </div>

        {activeStyle_data && (
          <div className="treatment-panel">
            <div className="treatment-photo">
              <img src={activeStyle_data.photo} alt={activeStyle_data.photoAlt} />
            </div>

            <div className="treatment-details">
              <h3>{activeStyle_data.name}</h3>
              <p className="treatment-description">{activeStyle_data.description}</p>

              <div className="treatment-grid">
                <div className="treatment-info-box">
                  <h4>Aesthetic</h4>
                  <p>{activeStyle_data.aesthetic}</p>
                </div>

                <div className="treatment-info-box">
                  <h4>Best For</h4>
                  <p>{activeStyle_data.bestFor}</p>
                </div>

                <div className="treatment-info-box">
                  <h4>Considerations</h4>
                  <p>{activeStyle_data.considerations}</p>
                </div>
              </div>

              {activeStyle === 'open' && (
                <div className="additional-info">
                  <p>
                    The open roll aesthetic has become increasingly popular in modern design. The exposed roller tube
                    becomes an architectural feature rather than something to hide. We offer several roller tube colors and finishes
                    to complement any interior.
                  </p>
                </div>
              )}

              {activeStyle === 'fascia' && (
                <div className="additional-info">
                  <p>
                    Fascia panels are available in wood stains, painted finishes, and materials that match your interior trim.
                    This is a classic solution that works in virtually any design style, from traditional to contemporary.
                  </p>
                </div>
              )}

              {activeStyle === 'pocket' && (
                <div className="additional-info">
                  <p>
                    A recessed pocket represents the ultimate luxury finish. The roller mechanism completely disappears into the ceiling,
                    leaving only the shade itself visible. This requires coordination during construction or renovation but creates an
                    unparalleled seamless appearance.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
