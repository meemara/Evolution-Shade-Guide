import React, { useEffect, useRef, useState } from 'react';

export default function HembarOptions() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeHembar, setActiveHembar] = useState('standard');

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

  const options = [
    {
      id: 'standard',
      name: 'Designer Bottom Bar',
      description: 'The classic, standard weighted hembar. A solid aluminum bar that provides smooth operation and clean appearance.',
      weight: 'Standard weight',
      bestFor: 'Most installations, general residential use',
      characteristics: ['Proven design', 'Smooth operation', 'Clean appearance', 'Cost-effective'],
      diagram: 'standard'
    },
    {
      id: 'sealed',
      name: 'Sealed Bottom Bar',
      description: 'A hembar with integrated sealing edges that reduce light leakage at the bottom of the shade. Ideal for blackout applications.',
      weight: 'Heavier with seal',
      bestFor: 'Bedrooms, media rooms, blackout applications',
      characteristics: ['Reduces light gaps', 'Weighted for smooth operation', 'Slightly more prominent', 'Enhances blackout'],
      diagram: 'sealed'
    },
    {
      id: 'architectural',
      name: 'Architectural Bottom Bar',
      description: 'A minimal-profile hembar designed for a sleek, contemporary aesthetic. Lighter weight while maintaining control.',
      weight: 'Light weight',
      bestFor: 'Modern interiors, minimalist design, contemporary spaces',
      characteristics: ['Slim profile', 'Modern aesthetic', 'Lightweight operation', 'Clean lines'],
      diagram: 'architectural'
    },
    {
      id: 'cable',
      name: 'Cable-Guided Bottom Bar',
      description: 'Uses vertical cables to keep the shade tracking perfectly straight. Essential for large windows, angled installations, or environments with vibration.',
      weight: 'Variable',
      bestFor: 'Large windows, sloped/cathedral ceilings, commercial spaces, vibration-prone areas',
      characteristics: ['Perfect tracking', 'Handles large spans', 'Works on angles', 'Professional-grade'],
      diagram: 'cable'
    }
  ];

  const activeOption = options.find(o => o.id === activeHembar);

  const renderDiagram = (type) => {
    switch (type) {
      case 'standard':
        return (
          <svg viewBox="0 0 300 250" className="diagram-svg">
            {/* Window frame */}
            <rect x="40" y="30" width="220" height="180" fill="none" stroke="#2D2D2D" strokeWidth="2" />

            {/* Glass */}
            <rect x="50" y="40" width="200" height="160" fill="#E8F4FF" opacity="0.3" />

            {/* Shade fabric */}
            <rect x="60" y="50" width="180" height="110" fill="#F5E6D3" opacity="0.8" />

            {/* Standard hembar - simple solid bar */}
            <rect x="60" y="160" width="180" height="12" fill="#555" />
            <line x1="60" y1="160" x2="240" y2="160" stroke="#333" strokeWidth="1" opacity="0.5" />
            <line x1="60" y1="166" x2="240" y2="166" stroke="#999" strokeWidth="1" opacity="0.5" />
            <line x1="60" y1="172" x2="240" y2="172" stroke="#333" strokeWidth="1" opacity="0.5" />

            {/* Sill */}
            <rect x="50" y="210" width="200" height="15" fill="#8B7355" />

            {/* Light showing at bottom */}
            <line x1="80" y1="172" x2="80" y2="195" stroke="#FFD700" strokeWidth="2" opacity="0.5" />
            <line x1="150" y1="172" x2="150" y2="200" stroke="#FFD700" strokeWidth="2" opacity="0.5" />
            <line x1="220" y1="172" x2="220" y2="195" stroke="#FFD700" strokeWidth="2" opacity="0.5" />

            {/* Labels */}
            <text x="120" y="195" fontSize="10" fontFamily="Arial" fill="#FFD700">Some light gap</text>
          </svg>
        );

      case 'sealed':
        return (
          <svg viewBox="0 0 300 250" className="diagram-svg">
            {/* Window frame */}
            <rect x="40" y="30" width="220" height="180" fill="none" stroke="#2D2D2D" strokeWidth="2" />

            {/* Glass */}
            <rect x="50" y="40" width="200" height="160" fill="#E8F4FF" opacity="0.3" />

            {/* Shade fabric */}
            <rect x="60" y="50" width="180" height="110" fill="#F5E6D3" opacity="0.8" />

            {/* Sealed hembar - with extended edges */}
            <rect x="60" y="160" width="180" height="14" fill="#555" />
            {/* Sealing extensions */}
            <rect x="58" y="165" width="184" height="3" fill="#333" opacity="0.7" />
            <line x1="60" y1="160" x2="240" y2="160" stroke="#333" strokeWidth="1" opacity="0.5" />
            <line x1="60" y1="167" x2="240" y2="167" stroke="#999" strokeWidth="1" opacity="0.5" />
            <line x1="60" y1="174" x2="240" y2="174" stroke="#333" strokeWidth="1" opacity="0.5" />

            {/* Sill */}
            <rect x="50" y="210" width="200" height="15" fill="#8B7355" />

            {/* Minimal light showing */}
            <line x1="150" y1="174" x2="150" y2="185" stroke="#FFD700" strokeWidth="1" opacity="0.3" />

            {/* Seal indicators - green */}
            <text x="65" y="148" fontSize="9" fontFamily="Arial" fill="#8CC63F" fontWeight="bold">Seal</text>
            <text x="215" y="148" fontSize="9" fontFamily="Arial" fill="#8CC63F" fontWeight="bold">Seal</text>

            {/* Labels */}
            <text x="105" y="195" fontSize="10" fontFamily="Arial" fill="#8CC63F">Greatly reduced light gap</text>
          </svg>
        );

      case 'architectural':
        return (
          <svg viewBox="0 0 300 250" className="diagram-svg">
            {/* Window frame */}
            <rect x="40" y="30" width="220" height="180" fill="none" stroke="#2D2D2D" strokeWidth="2" />

            {/* Glass */}
            <rect x="50" y="40" width="200" height="160" fill="#E8F4FF" opacity="0.3" />

            {/* Shade fabric */}
            <rect x="60" y="50" width="180" height="115" fill="#F5E6D3" opacity="0.8" />

            {/* Architectural hembar - minimal profile */}
            <rect x="60" y="165" width="180" height="7" fill="#666" />
            <line x1="60" y1="165" x2="240" y2="165" stroke="#333" strokeWidth="0.5" opacity="0.5" />
            <line x1="60" y1="169" x2="240" y2="169" stroke="#999" strokeWidth="0.5" opacity="0.5" />

            {/* Sill */}
            <rect x="50" y="210" width="200" height="15" fill="#8B7355" />

            {/* Light gap present */}
            <line x1="80" y1="172" x2="80" y2="195" stroke="#FFD700" strokeWidth="2" opacity="0.5" />
            <line x1="150" y1="172" x2="150" y2="200" stroke="#FFD700" strokeWidth="2" opacity="0.5" />
            <line x1="220" y1="172" x2="220" y2="195" stroke="#FFD700" strokeWidth="2" opacity="0.5" />

            {/* Modern aesthetic indicator */}
            <text x="110" y="190" fontSize="10" fontFamily="Arial" fill="#2D2D2D">Minimal profile</text>
            <text x="105" y="205" fontSize="9" fontFamily="Arial" fill="#6D6E71">Contemporary aesthetic</text>
          </svg>
        );

      case 'cable':
        return (
          <svg viewBox="0 0 300 250" className="diagram-svg">
            {/* Window frame */}
            <rect x="40" y="30" width="220" height="180" fill="none" stroke="#2D2D2D" strokeWidth="2" />

            {/* Glass */}
            <rect x="50" y="40" width="200" height="160" fill="#E8F4FF" opacity="0.3" />

            {/* Shade fabric */}
            <rect x="60" y="50" width="180" height="110" fill="#F5E6D3" opacity="0.8" />

            {/* Standard hembar */}
            <rect x="60" y="160" width="180" height="12" fill="#555" />

            {/* Vertical guide cables - shown in green */}
            <line x1="70" y1="48" x2="70" y2="172" stroke="#8CC63F" strokeWidth="2" />
            <line x1="230" y1="48" x2="230" y2="172" stroke="#8CC63F" strokeWidth="2" />

            {/* Additional guide cables */}
            <line x1="120" y1="48" x2="120" y2="172" stroke="#8CC63F" strokeWidth="1.5" opacity="0.6" />
            <line x1="180" y1="48" x2="180" y2="172" stroke="#8CC63F" strokeWidth="1.5" opacity="0.6" />

            {/* Cable guides at top */}
            <circle cx="70" cy="48" r="4" fill="#8CC63F" />
            <circle cx="230" cy="48" r="4" fill="#8CC63F" />
            <circle cx="120" cy="48" r="3" fill="#8CC63F" opacity="0.6" />
            <circle cx="180" cy="48" r="3" fill="#8CC63F" opacity="0.6" />

            {/* Sill */}
            <rect x="50" y="210" width="200" height="15" fill="#8B7355" />

            {/* Label */}
            <text x="80" y="70" fontSize="10" fontFamily="Arial" fill="#8CC63F" fontWeight="bold">Guide Cables</text>
            <text x="100" y="195" fontSize="10" fontFamily="Arial" fill="#8CC63F">Perfect tracking even on large spans</text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <section ref={sectionRef} className={`section hembar-options ${isVisible ? 'visible' : ''}`}>
      <div className="section-content">
        <h2 className="section-title">Bottom Bar / Hembar Options</h2>
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
            <div className="hembar-diagram">{renderDiagram(activeOption.diagram)}</div>

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
