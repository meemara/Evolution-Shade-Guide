import React, { useState } from 'react';

export default function LightControl() {
  const [activeLevel, setActiveLevel] = useState('translucent');

  const levels = [
    {
      id: 'sheer',
      name: 'Sheer',
      opacity: '3-10%',
      description: 'Soft diffused light. Great for living rooms and offices. Maintains daytime privacy while allowing bright natural light.',
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-09/sheer-roller-shades-living-room.jpg',
      photoAlt: 'Sheer roller shades filtering soft light in a living room',
      useCases: ['Living rooms and sitting areas', 'Home offices and studies', 'Foyers and entryways', 'Spaces where you want natural light']
    },
    {
      id: 'translucent',
      name: 'Translucent',
      opacity: '3-5%',
      description: 'Filtered light with more privacy. Ideal for dining and family spaces. Light diffuses beautifully through the fabric.',
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-09/translucent-roller-shades-living-room.jpg',
      photoAlt: 'Translucent roller shades diffusing natural light in a living room',
      useCases: ['Dining rooms', 'Family rooms', 'Kitchens', 'Daytime privacy without total darkness']
    },
    {
      id: 'roomdarkening',
      name: 'Room Darkening',
      opacity: '1-2%',
      description: 'Significantly reduced light. Perfect for bedrooms and dens. Creates a cozy atmosphere while maintaining minimal outside visibility.',
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-09/bedroom-ra3-uk-25-01.jpg',
      photoAlt: 'Room darkening roller shades creating a cozy bedroom atmosphere',
      useCases: ['Master bedrooms', 'Guest rooms', 'Den and lounge spaces', 'Creating a cozy, intimate atmosphere']
    },
    {
      id: 'blackout',
      name: 'Blackout',
      opacity: '0%',
      description: 'Complete darkness. Essential for bedrooms, nurseries, and media rooms. Blocks virtually all natural light for optimal sleep or movie viewing.',
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-09/blackout-roller-shades-living-room.jpg',
      photoAlt: 'Blackout roller shades blocking all natural light',
      useCases: ['Bedrooms (especially master)', 'Nurseries and children\'s rooms', 'Home theaters and media rooms', 'Light-sensitive spaces']
    }
  ];

  const activeDetail = levels.find(l => l.id === activeLevel);

  return (
    <section className="section light-control">
      <div className="section-content">
        <h2 className="section-title">Light Control & Opacity</h2>
        <p className="section-subtitle">Choose your level of light transmission</p>

        <div className="light-spectrum">
          {levels.map(level => (
            <div
              key={level.id}
              className={`spectrum-item ${activeLevel === level.id ? 'active' : ''}`}
              onClick={() => setActiveLevel(level.id)}
            >
              <div className="spectrum-photo-swatch">
                <img src={level.photo} alt={level.photoAlt} />
                <div className="spectrum-overlay" style={{ opacity: level.id === 'blackout' ? 0.85 : level.id === 'roomdarkening' ? 0.6 : level.id === 'translucent' ? 0.3 : 0.1 }} />
              </div>
              <p className="spectrum-label">{level.name}</p>
              <p className="spectrum-opacity">{level.opacity}</p>
            </div>
          ))}
        </div>

        {activeDetail && (
          <div className="light-detail-panel">
            <div className="light-visualization">
              <img
                src={activeDetail.photo}
                alt={activeDetail.photoAlt}
                className="light-photo"
              />
            </div>

            <div className="light-info">
              <h3>{activeDetail.name}</h3>
              <p className="light-opacity-display">{activeDetail.opacity} Light Transmission</p>
              <p className="light-description">{activeDetail.description}</p>

              <div className="use-cases">
                <h4>Best For:</h4>
                <ul>
                  {activeDetail.useCases.map((uc, i) => (
                    <li key={i}>{uc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
