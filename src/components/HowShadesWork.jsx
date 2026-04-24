import React, { useEffect, useRef, useState } from 'react';

export default function HowShadesWork() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section id="how-shades-work" ref={sectionRef} className={`section how-shades-work ${isVisible ? 'visible' : ''}`}>
      <div className="section-content">
        <h2 className="section-title">How Motorized Roller Shades Work</h2>
        <p className="section-subtitle">A modern approach to light control and privacy</p>

        <div className="how-shades-grid">
          <div className="how-shades-text">
            <p>
              Motorized roller shades provide elegant, smooth control of natural light and privacy in any space.
              The system is simple in concept but refined in execution: a custom-cut fabric shade rolls up and down
              on a motorized roller tube, allowing you to adjust light levels from complete blackout to bright transparency.
            </p>
            <p>
              Available with optional dimming capabilities, these shades integrate seamlessly with smart home
              systems, offering preset positions, scheduling, and voice control. You choose the mounting style,
              fabric opacity, and finishing details to match your design vision.
            </p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <div>
                  <h4>Smart Control</h4>
                  <p>Control via remote, app, or voice assistant</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚙️</div>
                <div>
                  <h4>Quiet Operation</h4>
                  <p>Whisper-quiet motors ensure peaceful motion</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎨</div>
                <div>
                  <h4>Infinite Options</h4>
                  <p>100+ fabrics in multiple opacity levels</p>
                </div>
              </div>
            </div>
          </div>

          <div className="shade-diagram">
            <svg viewBox="0 0 300 400" className="diagram-svg">
              {/* Frame */}
              <rect x="40" y="30" width="220" height="340" fill="none" stroke="#2D2D2D" strokeWidth="3" />

              {/* Window glass */}
              <rect x="50" y="50" width="200" height="200" fill="#E8F4FF" opacity="0.5" stroke="none" />

              {/* Roller mechanism */}
              <rect x="50" y="45" width="200" height="20" fill="#555" rx="10" />
              <circle cx="60" cy="55" r="8" fill="#8CC63F" />
              <circle cx="240" cy="55" r="8" fill="#8CC63F" />

              {/* Shade fabric */}
              <rect x="55" y="65" width="190" height="120" fill="#F5E6D3" opacity="0.8" />

              {/* Light rays showing through */}
              <line x1="70" y1="80" x2="50" y2="70" stroke="#FFD700" strokeWidth="2" opacity="0.6" />
              <line x1="150" y1="80" x2="150" y2="50" stroke="#FFD700" strokeWidth="2" opacity="0.6" />
              <line x1="230" y1="80" x2="250" y2="70" stroke="#FFD700" strokeWidth="2" opacity="0.6" />

              {/* Cord */}
              <line x1="245" y1="65" x2="245" y2="290" stroke="#666" strokeWidth="1.5" />
              <circle cx="245" cy="290" r="4" fill="#666" />

              {/* Sill */}
              <rect x="50" y="310" width="200" height="15" fill="#8B7355" />

              {/* Labels */}
              <text x="260" y="60" fontSize="11" fontFamily="Arial" fill="#2D2D2D" fontWeight="bold">Roller Head</text>
              <text x="260" y="140" fontSize="11" fontFamily="Arial" fill="#2D2D2D" fontWeight="bold">Shade Fabric</text>
              <text x="260" y="310" fontSize="11" fontFamily="Arial" fill="#2D2D2D" fontWeight="bold">Hembar</text>

              {/* Motor indicator */}
              <circle cx="60" cy="55" r="12" fill="none" stroke="#8CC63F" strokeWidth="2" opacity="0.4" />
              <text x="15" y="60" fontSize="10" fontFamily="Arial" fill="#8CC63F" fontWeight="bold">MOTOR</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
