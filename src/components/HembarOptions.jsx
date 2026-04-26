import React, { useState } from 'react';

export default function HembarOptions() {
  const [activeHembar, setActiveHembar] = useState('standard');

  const options = [
    {
      id: 'standard',
      name: 'Designer Bottom Bar',
      description: 'The classic, standard weighted hembar. A solid aluminum bar that provides smooth operation and clean appearance.',
      weight: 'Standard weight',
      bestFor: 'Most installations, general residential use',
      characteristics: ['Proven design', 'Smooth operation', 'Clean appearance', 'Cost-effective'],
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-08/entry-window-bench-triathlon-select-24.jpg',
      photoAlt: 'Close-up of roller shade with designer bottom bar'
    },
    {
      id: 'sealed',
      name: 'Sealed Bottom Bar',
      description: 'A hembar with integrated sealing edges that reduce light leakage at the bottom of the shade. Ideal for blackout applications.',
      weight: 'Heavier with seal',
      bestFor: 'Bedrooms, media rooms, blackout applications',
      characteristics: ['Reduces light gaps', 'Weighted for smooth operation', 'Slightly more prominent', 'Enhances blackout'],
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-09/blackout-in-channels-roller-shades-living-room.jpg',
      photoAlt: 'Roller shade with sealed bottom bar and side channels for blackout performance'
    },
    {
      id: 'architectural',
      name: 'Architectural Bottom Bar',
      description: 'A minimal-profile hembar designed for a sleek, contemporary aesthetic. Lighter weight while maintaining control.',
      weight: 'Light weight',
      bestFor: 'Modern interiors, minimalist design, contemporary spaces',
      characteristics: ['Slim profile', 'Modern aesthetic', 'Lightweight operation', 'Clean lines'],
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-08/sivoia-qs-triathlon-battery-roller-detail-fascia-arch-closed-flipped.jpg',
      photoAlt: 'Close-up of roller shade with slim architectural bottom bar profile'
    },
    {
      id: 'cable',
      name: 'Cable-Guided Bottom Bar',
      description: 'Uses vertical cables to keep the shade tracking perfectly straight. Essential for large windows, angled installations, or environments with vibration.',
      weight: 'Variable',
      bestFor: 'Large windows, sloped/cathedral ceilings, commercial spaces, vibration-prone areas',
      characteristics: ['Perfect tracking', 'Handles large spans', 'Works on angles', 'Professional-grade'],
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-08/tensioned-shade-screenshot-1-flipped.jpg',
      photoAlt: 'Roller shade with cable-guided tension wire system for precise tracking'
    }
  ];

  const activeOption = options.find(o => o.id === activeHembar);

  return (
    <section className="section hembar-options">
      <div className="section-content">
        <h2 className="section-title">Bottom Bar Options</h2>
        <p className="section-subtitle">Choosing the right weighted bottom for your shades</p>

        <div className="hembar-tabs">
          {options.map(option => (
            <button
              key={option.id}
              className={`hembar-tab ${activeHembar === option.id ? 'active' : ''}`}
              onClick={() => setActiveHembar(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>

        {activeOption && (
          <div className="hembar-panel">
            <div className="hembar-photo">
              <img src={activeOption.photo} alt={activeOption.photoAlt} />
            </div>

            <div className="hembar-details">
              <h3>{activeOption.name}</h3>
              <p className="hembar-description">{activeOption.description}</p>

              <div className="hembar-specs">
                <div className="spec-box">
                  <h4>Weight Profile</h4>
                  <p>{activeOption.weight}</p>
                </div>

                <div className="spec-box">
                  <h4>Best For</h4>
                  <p>{activeOption.bestFor}</p>
                </div>
              </div>

              <div className="characteristics">
                <h4>Key Characteristics:</h4>
                <ul>
                  {activeOption.characteristics.map((char, idx) => (
                    <li key={idx}>{char}</li>
                  ))}
                </ul>
              </div>

              {activeHembar === 'standard' && (
                <div className="additional-notes">
                  <p>
                    The Designer Bottom Bar is our most popular choice. It provides excellent control and appearance
                    for residential installations. For superior blackout performance, consider the Sealed Bottom Bar.
                  </p>
                </div>
              )}

              {activeHembar === 'sealed' && (
                <div className="additional-notes">
                  <p>
                    The Sealed Bottom Bar is slightly heavier than standard, which provides excellent control and reduces
                    light leakage at the bottom. Highly recommended for bedrooms, nurseries, and blackout applications.
                  </p>
                </div>
              )}

              {activeHembar === 'architectural' && (
                <div className="additional-notes">
                  <p>
                    Perfect for contemporary and minimalist interiors where every element contributes to the design aesthetic.
                    The slim profile maintains visual lightness while providing reliable operation.
                  </p>
                </div>
              )}

              {activeHembar === 'cable' && (
                <div className="additional-notes">
                  <p>
                    Cable-guided systems are professional-grade solutions used in high-end residential and commercial installations.
                    They're ideal for cathedral ceilings, angled windows, large openings (72" or wider), or situations
                    where wall vibration could affect operation.
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
