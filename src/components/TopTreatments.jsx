import React, { useEffect, useRef, useState } from 'react';

export default function TopTreatments() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStyle, setActiveStyle] = useState('open');

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

  const styles = [
    {
      id: 'open',
      name: 'Open Roll',
      description: 'The roller mechanism is fully exposed at the top. This is the most minimal, modern aesthetic.',
      aesthetic: 'Contemporary, minimalist',
      bestFor: 'Modern homes, clean-lined spaces, industrial design',
      considerations: 'Roller mechanism is visible; requires aesthetic roller tube design',
      diagram: 'open'
    },
    {
      id: 'fascia',
      name: 'Fascia',
      description: 'A decorative panel or cover conceals the roller mechanism at the top. Available in various finishes to match your décor.',
      aesthetic: 'Traditional to contemporary, customizable',
      bestFor: 'Mid-century modern, transitional, or traditional interiors',
      considerations: 'Adds slightly more visual weight; requires installation on wall or frame',
      diagram: 'fascia'
    },
    {
      id: 'pocket',
      name: 'Pocket / Recessed',
      description: 'The roller is completely hidden in a recessed cavity built into the ceiling or wall. The cleanest, most luxurious solution.',
      aesthetic: 'Luxury minimalist, seamless',
      bestFor: 'High-end homes, custom renovations, luxury interiors',
      considerations: 'Requires structural modification; most expensive option',
      diagram: 'pocket'
    }
  ];

  const activeStyle_data = styles.find(s => s.id === activeStyle);

  const renderDiagram = (type) => {
    switch (type) {
      case 'open':
        return (
          <svg viewBox="0 0 300 280" className="diagram-svg">
            {/* Wall */}
            <rect x="30" y="20" width="240" height="20" fill="#D3D3D3" />

            {/* Window frame */}
            <rect x="40" y="40" width="220" height="200" fill="none" stroke="#2D2D2D" strokeWidth="3" />

            {/* Window glass */}
            <rect x="50" y="50" width="200" height="180" fill="#E8F4FF" opacity="0.4" />

            {/* Roller tube - visible, exposed */}
            <rect x="50" y="42" width="200" height="16" fill="#555" rx="8" />
            <circle cx="60" cy="50" r="6" fill="#8CC63F" />
            <circle cx="240" cy="50" r="6" fill="#8CC63F" />

            {/* Shade fabric */}
            <rect x="58" y="58" width="184" height="100" fill="#F5E6D3" opacity="0.8" />

            {/* Hembar */}
            <rect x="58" y="158" width="184" height="7" fill="#8B7355" />

            {/* Labels */}
            <text x="130" y="35" fontSize="12" fontFamily="Arial" fill="#2D2D2D" fontWeight="bold">Visible Roller</text>
            <text x="115" y="200" fontSize="11" fontFamily="Arial" fill="#2D2D2D">Modern, minimal aesthetic</text>
          </svg>
        );

      case 'fascia':
        return (
          <svg viewBox="0 0 300 280" className="diagram-svg">
            {/* Wall */}
            <rect x="30" y="20" width="240" height="20" fill="#D3D3D3" />

            {/* Fascia panel - decorative cover */}
            <rect x="45" y="35" width="210" height="25" fill="#8B7355" rx="2" />
            <rect x="50" y="40" width="200" height="15" fill="#A0826D" />

            {/* Window frame inside fascia */}
            <rect x="40" y="60" width="220" height="180" fill="none" stroke="#2D2D2D" strokeWidth="3" />

            {/* Window glass */}
            <rect x="50" y="70" width="200" height="160" fill="#E8F4FF" opacity="0.4" />

            {/* Roller tube - hidden behind fascia */}
            <rect x="50" y="48" width="200" height="16" fill="#555" rx="8" opacity="0.3" />

            {/* Shade fabric */}
            <rect x="58" y="66" width="184" height="100" fill="#F5E6D3" opacity="0.8" />

            {/* Hembar */}
            <rect x="58" y="166" width="184" height="7" fill="#8B7355" />

            {/* Fascia details - wood grain texture */}
            <line x1="60" y1="45" x2="240" y2="45" stroke="#9B936D" strokeWidth="1" opacity="0.5" />
            <line x1="60" y1="50" x2="240" y2="50" stroke="#9B936D" strokeWidth="1" opacity="0.5" />

            {/* Labels */}
            <text x="120" y="210" fontSize="11" fontFamily="Arial" fill="#2D2D2D">Decorative fascia hides roller</text>
          </svg>
        );

      case 'pocket':
        return (
          <svg viewBox="0 0 300 280" className="diagram-svg">
            {/* Ceiling */}
            <rect x="30" y="20" width="240" height="15" fill="#D3D3D3" />

            {/* Pocket cavity */}
            <rect x="40" y="25" width="220" height="30" fill="#999" opacity="0.6" />
            <line x1="40" y1="25" x2="260" y2="25" stroke="#666" strokeWidth="1" />
            <text x="130" y="45" fontSize="10" fontFamily="Arial" fill="#FFF" fontWeight="bold">Pocket</text>

            {/* Window frame */}
            <rect x="40" y="55" width="220" height="180" fill="none" stroke="#2D2D2D" strokeWidth="3" />

            {/* Window glass */}
            <rect x="50" y="65" width="200" height="160" fill="#E8F4FF" opacity="0.4" />

            {/* Roller tube - completely hidden */}
            <rect x="50" y="32" width="200" height="16" fill="#555" rx="8" opacity="0.2" />

            {/* Shade fabric starts just below pocket opening */}
            <rect x="58" y="63" width="184" height="100" fill="#F5E6D3" opacity="0.8" />

            {/* Hembar */}
            <rect x="58" y="163" width="184" height="7" fill="#8B7355" />

            {/* Clean line where pocket ends and window begins */}
            <line x1="40" y1="55" x2="260" y2="55" stroke="#2D2D2D" strokeWidth="2" />

            {/* Labels */}
            <text x="110" y="210" fontSize="11" fontFamily="Arial" fill="#2D2D2D">Roller hidden in recessed pocket</text>
            <text x="80" y="230" fontSize="10" fontFamily="Arial" fill="#6D6E71">Most luxurious, seamless appearance</text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <section ref={sectionRef} className={`section top-treatments ${isVisible ? 'visible' : ''}`}>
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
            <div className="treatment-diagram">{renderDiagram(activeStyle_data.diagram)}</div>

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
