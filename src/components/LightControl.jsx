import React, { useEffect, useRef, useState } from 'react';

export default function LightControl() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeLevel, setActiveLevel] = useState('translucent');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const levels = [
    {
      id: 'sheer',
      name: 'Sheer',
      opacity: '3-10%',
      description: 'Soft diffused light. Great for living rooms and offices. Maintains daytime privacy while allowing bright natural light.',
      lightLevel: 0.08,
      color: '#FFF8DC'
    },
    {
      id: 'translucent',
      name: 'Translucent',
      opacity: '3-5%',
      description: 'Filtered light with more privacy. Ideal for dining and family spaces. Light diffuses beautifully through the fabric.',
      lightLevel: 0.04,
      color: '#F5E6D3'
    },
    {
      id: 'roomdarkening',
      name: 'Room Darkening',
      opacity: '1-2%',
      description: 'Significantly reduced light. Perfect for bedrooms and dens. Creates a cozy atmosphere while maintaining minimal outside visibility.',
      lightLevel: 0.015,
      color: '#D4C5B9'
    },
    {
      id: 'blackout',
      name: 'Blackout',
      opacity: '0%',
      description: 'Complete darkness. Essential for bedrooms, nurseries, and media rooms. Blocks virtually all natural light for optimal sleep or movie viewing.',
      lightLevel: 0,
      color: '#2D2D2D'
    }
  ];

  const activeDetail = levels.find(l => l.id === activeLevel);

  return (
    <section ref={sectionRef} className={`section light-control ${isVisible ? 'visible' : ''}`}>
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
              <div
                className="spectrum-swatch"
                style={{ backgroundColor: level.color }}
              ></div>
              <p className="spectrum-label">{level.name}</p>
              <p className="spectrum-opacity">{level.opacity}</p>
            </div>
          ))}
        </div>

        {activeDetail && (
          <div className="light-detail-panel">
            <div className="light-visualization">
              <svg viewBox="0 0 300 250" className="diagram-svg">
                {/* Frame */}
                <rect x="40" y="30" width="220" height="180" fill="none" stroke="#2D2D2D" strokeWidth="2" />

                {/* Background light */}
                <defs>
                  <linearGradient id="sunlight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 0.6 }} />
                  </linearGradient>
                </defs>

                {/* Outdoor bright area */}
                <rect x="0" y="0" width="300" height="250" fill="url(#sunlight)" />

                {/* Shade fabric with varying opacity */}
                <rect
                  x="50"
                  y="50"
                  width="200"
                  height="140"
                  fill={activeDetail.color}
                  opacity={1 - activeDetail.lightLevel}
                  stroke="#6D6E71"
                  strokeWidth="1"
                />

                {/* Light rays showing through */}
                {activeDetail.lightLevel > 0 && (
                  <>
                    <circle cx="80" cy="100" r="8" fill="#FFD700" opacity={activeDetail.lightLevel * 0.8} />
                    <circle cx="150" cy="80" r="10" fill="#FFD700" opacity={activeDetail.lightLevel * 0.7} />
                    <circle cx="220" cy="110" r="9" fill="#FFD700" opacity={activeDetail.lightLevel * 0.8} />
                    <circle cx="120" cy="150" r="7" fill="#FFD700" opacity={activeDetail.lightLevel * 0.6} />
                    <circle cx="200" cy="160" r="8" fill="#FFD700" opacity={activeDetail.lightLevel * 0.7} />
                  </>
                )}

                {/* Hembar */}
                <rect x="50" y="190" width="200" height="6" fill="#8B7355" />
              </svg>
            </div>

            <div className="light-info">
              <h3>{activeDetail.name}</h3>
              <p className="light-opacity-display">{activeDetail.opacity} Light Transmission</p>
              <p className="light-description">{activeDetail.description}</p>

              <div className="use-cases">
                <h4>Best For:</h4>
                <ul>
                  {activeLevel === 'sheer' && (
                    <>
                      <li>Living rooms and sitting areas</li>
                      <li>Home offices and studies</li>
                      <li>Foyers and entryways</li>
                      <li>Spaces where you want natural light</li>
                    </>
                  )}
                  {activeLevel === 'translucent' && (
                    <>
                      <li>Dining rooms</li>
                      <li>Family rooms</li>
                      <li>Kitchens</li>
                      <li>Daytime privacy without total darkness</li>
                    </>
                  )}
                  {activeLevel === 'roomdarkening' && (
                    <>
                      <li>Master bedrooms</li>
                      <li>Guest rooms</li>
                      <li>Den and lounge spaces</li>
                      <li>Creating a cozy, intimate atmosphere</li>
                    </>
                  )}
                  {activeLevel === 'blackout' && (
                    <>
                      <li>Bedrooms (especially master)</li>
                      <li>Nurseries and children's rooms</li>
                      <li>Home theaters and media rooms</li>
                      <li>Light-sensitive spaces</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
