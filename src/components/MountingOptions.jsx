import React, { useEffect, useRef, useState } from 'react';

export default function MountingOptions() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeMount, setActiveMount] = useState('inside');

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
    <section ref={sectionRef} className={`section mounting-options ${isVisible ? 'visible' : ''}`}>
      <div className="section-content">
        <h2 className="section-title">Mounting Options</h2>
        <p className="section-subtitle">Choose the right installation method for your space</p>

        <div className="mount-toggle">
          <button
            className={`toggle-btn ${activeMount === 'inside' ? 'active' : ''}`}
            onClick={() => setActiveMount('inside')}
          >
            Inside Mount
          </button>
          <button
            className={`toggle-btn ${activeMount === 'outside' ? 'active' : ''}`}
            onClick={() => setActiveMount('outside')}
          >
            Outside Mount
          </button>
        </div>

        <div className="mount-content">
          {activeMount === 'inside' ? (
            <div className="mount-option">
              <div className="mount-diagram">
                <svg viewBox="0 0 300 350" className="diagram-svg">
                  {/* Window frame */}
                  <rect x="40" y="50" width="220" height="200" fill="none" stroke="#2D2D2D" strokeWidth="3" />

                  {/* Frame trim */}
                  <rect x="35" y="45" width="230" height="210" fill="none" stroke="#6D6E71" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />

                  {/* Window glass */}
                  <rect x="50" y="60" width="200" height="180" fill="#E8F4FF" opacity="0.4" />

                  {/* Roller head - inside */}
                  <rect x="50" y="55" width="200" height="18" fill="#555" rx="9" />
                  <circle cx="60" cy="64" r="6" fill="#8CC63F" />
                  <circle cx="240" cy="64" r="6" fill="#8CC63F" />

                  {/* Shade fabric */}
                  <rect x="58" y="73" width="184" height="90" fill="#F5E6D3" opacity="0.8" />

                  {/* Light gaps - left side */}
                  <line x1="50" y1="75" x2="35" y2="65" stroke="#FFD700" strokeWidth="2" opacity="0.7" />
                  <line x1="50" y1="100" x2="30" y2="100" stroke="#FFD700" strokeWidth="2" opacity="0.7" />
                  <line x1="50" y1="140" x2="35" y2="150" stroke="#FFD700" strokeWidth="2" opacity="0.7" />

                  {/* Light gaps - right side */}
                  <line x1="250" y1="75" x2="265" y2="65" stroke="#FFD700" strokeWidth="2" opacity="0.7" />
                  <line x1="250" y1="100" x2="270" y2="100" stroke="#FFD700" strokeWidth="2" opacity="0.7" />
                  <line x1="250" y1="140" x2="265" y2="150" stroke="#FFD700" strokeWidth="2" opacity="0.7" />

                  {/* Light gaps - bottom */}
                  <line x1="100" y1="163" x2="100" y2="180" stroke="#FFD700" strokeWidth="2" opacity="0.7" />
                  <line x1="150" y1="163" x2="150" y2="185" stroke="#FFD700" strokeWidth="2" opacity="0.7" />
                  <line x1="200" y1="163" x2="200" y2="180" stroke="#FFD700" strokeWidth="2" opacity="0.7" />

                  {/* Hembar */}
                  <rect x="58" y="163" width="184" height="8" fill="#8B7355" />

                  {/* Sill */}
                  <rect x="50" y="240" width="200" height="15" fill="#8B7355" />

                  {/* Labels */}
                  <text x="15" y="75" fontSize="10" fontFamily="Arial" fill="#FFD700" fontWeight="bold">Light</text>
                  <text x="10" y="95" fontSize="10" fontFamily="Arial" fill="#FFD700" fontWeight="bold">Gaps</text>

                  <text x="260" y="75" fontSize="10" fontFamily="Arial" fill="#FFD700" fontWeight="bold">Light</text>
                  <text x="255" y="95" fontSize="10" fontFamily="Arial" fill="#FFD700" fontWeight="bold">Gaps</text>

                  <text x="110" y="205" fontSize="10" fontFamily="Arial" fill="#FFD700" fontWeight="bold">Light at Bottom</text>
                </svg>
              </div>

              <div className="mount-details">
                <h3>Inside Mount</h3>
                <p className="highlight-text">Shade fits within the window frame</p>

                <div className="pros-cons">
                  <div className="pros">
                    <h4>✓ Advantages</h4>
                    <ul>
                      <li>Clean, minimal aesthetic</li>
                      <li>Shows window trim and frame</li>
                      <li>Great for elegant spaces</li>
                      <li>Requires minimal wall space</li>
                    </ul>
                  </div>

                  <div className="cons">
                    <h4>⚠ Considerations</h4>
                    <ul>
                      <li>Light gaps around edges (shown in yellow)</li>
                      <li>Gaps on left, right, and bottom</li>
                      <li>Solution: use side channels, sill angles, or pocket mounts</li>
                      <li>Frame depth must accommodate roller</li>
                    </ul>
                  </div>
                </div>

                <p className="info-text">
                  Inside mounts work beautifully in rooms where you don't need complete blackout. For bedrooms
                  and media rooms requiring true blackout, consider outside mount or light-gap solutions.
                </p>
              </div>
            </div>
          ) : (
            <div className="mount-option">
              <div className="mount-diagram">
                <svg viewBox="0 0 300 350" className="diagram-svg">
                  {/* Outer wall */}
                  <rect x="35" y="45" width="230" height="210" fill="#D3D3D3" opacity="0.3" />

                  {/* Window frame */}
                  <rect x="40" y="50" width="220" height="200" fill="none" stroke="#2D2D2D" strokeWidth="2" />

                  {/* Window glass */}
                  <rect x="50" y="60" width="200" height="180" fill="#E8F4FF" opacity="0.4" />

                  {/* Roller head - outside, with overlap */}
                  <rect x="30" y="45" width="240" height="18" fill="#555" rx="9" />
                  <circle cx="40" cy="54" r="6" fill="#8CC63F" />
                  <circle cx="260" cy="54" r="6" fill="#8CC63F" />

                  {/* Shade fabric - covers full opening */}
                  <rect x="35" y="63" width="230" height="105" fill="#F5E6D3" opacity="0.8" />

                  {/* Overlap indicators - green */}
                  <rect x="30" y="63" width="10" height="105" fill="#8CC63F" opacity="0.4" />
                  <rect x="260" y="63" width="10" height="105" fill="#8CC63F" opacity="0.4" />

                  {/* Hembar */}
                  <rect x="35" y="168" width="230" height="8" fill="#8B7355" />

                  {/* Sill */}
                  <rect x="50" y="240" width="200" height="15" fill="#8B7355" />

                  {/* No light gaps shown - complete coverage */}
                  <text x="120" y="200" fontSize="12" fontFamily="Arial" fill="#8CC63F" fontWeight="bold">Complete Coverage</text>

                  {/* Overlap labels */}
                  <text x="32" y="120" fontSize="9" fontFamily="Arial" fill="#8CC63F" fontWeight="bold">Overlap</text>
                  <text x="267" y="120" fontSize="9" fontFamily="Arial" fill="#8CC63F" fontWeight="bold">Overlap</text>
                </svg>
              </div>

              <div className="mount-details">
                <h3>Outside Mount</h3>
                <p className="highlight-text">Shade mounts on wall/ceiling, covers full opening</p>

                <div className="pros-cons">
                  <div className="pros">
                    <h4>✓ Advantages</h4>
                    <ul>
                      <li>Complete light control (no side gaps)</li>
                      <li>Perfect for blackout applications</li>
                      <li>Covers window frame and trim</li>
                      <li>More sophisticated appearance</li>
                      <li>Better insulation properties</li>
                    </ul>
                  </div>

                  <div className="cons">
                    <h4>⚠ Considerations</h4>
                    <ul>
                      <li>Covers window trim (less visible)</li>
                      <li>Requires wall/ceiling space</li>
                      <li>Slightly more prominent profile</li>
                      <li>Light still may leak at bottom</li>
                    </ul>
                  </div>
                </div>

                <p className="info-text">
                  Outside mounts provide superior light control and are ideal for bedrooms, nurseries, and home theater spaces.
                  The shade overlaps the window opening, creating a complete seal. Additional bottom solutions can
                  eliminate any remaining light leakage.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
