import React, { useEffect, useRef, useState } from 'react';

export default function BlackoutChallenge() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSolution, setActiveSolution] = useState('none');

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

  const solutions = [
    {
      id: 'none',
      name: 'The Challenge',
      description: 'Even with 0% opacity blackout fabric, light still leaks around the edges when the shade is inside-mounted. This happens because light comes through the gaps around the sides, top, and bottom of the shade.',
      diagram: 'challenge'
    },
    {
      id: 'channels',
      name: 'Side Channels / Rails',
      description: 'Metal channels run vertically along the left and right sides of the shade. These guide the shade smoothly while blocking light from leaking through the side gaps. Simple, effective solution.',
      diagram: 'channels'
    },
    {
      id: 'pocket',
      name: 'Built-in Pocket',
      description: 'A pocket is built into the ceiling or wall at the header, completely concealing the roller mechanism and blocking light from above. Creates the cleanest, most elegant look.',
      diagram: 'pocket'
    },
    {
      id: 'sill',
      name: 'Sill Angle / L-Bracket',
      description: 'An L-shaped piece installed at the bottom sill blocks light from leaking underneath the hembar. Often used in combination with side channels for complete coverage.',
      diagram: 'sill'
    },
    {
      id: 'outside',
      name: 'Outside Mount with Overlap',
      description: 'By mounting the shade outside the window frame with overlap on all sides, you eliminate side gaps entirely. Additional solutions can eliminate bottom leakage.',
      diagram: 'outside'
    }
  ];

  const activeSol = solutions.find(s => s.id === activeSolution) || solutions[0];

  const renderDiagram = (type) => {
    switch (type) {
      case 'challenge':
        return (
          <svg viewBox="0 0 300 350" className="solution-diagram-svg">
            {/* Window frame */}
            <rect x="40" y="50" width="220" height="200" fill="none" stroke="#2D2D2D" strokeWidth="3" />
            <rect x="35" y="45" width="230" height="210" fill="none" stroke="#6D6E71" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />

            {/* Window glass */}
            <rect x="50" y="60" width="200" height="180" fill="#E8F4FF" opacity="0.3" />

            {/* Roller head */}
            <rect x="50" y="55" width="200" height="18" fill="#2D2D2D" rx="9" />

            {/* Blackout shade */}
            <rect x="58" y="73" width="184" height="110" fill="#1a1a1a" />

            {/* Light leaks shown in red/yellow */}
            {/* Left side */}
            <line x1="50" y1="75" x2="25" y2="60" stroke="#FF4444" strokeWidth="3" opacity="0.8" />
            <line x1="50" y1="110" x2="20" y2="110" stroke="#FF4444" strokeWidth="3" opacity="0.8" />
            <line x1="50" y1="145" x2="25" y2="160" stroke="#FF4444" strokeWidth="3" opacity="0.8" />

            {/* Right side */}
            <line x1="250" y1="75" x2="275" y2="60" stroke="#FF4444" strokeWidth="3" opacity="0.8" />
            <line x1="250" y1="110" x2="280" y2="110" stroke="#FF4444" strokeWidth="3" opacity="0.8" />
            <line x1="250" y1="145" x2="275" y2="160" stroke="#FF4444" strokeWidth="3" opacity="0.8" />

            {/* Bottom */}
            <line x1="80" y1="183" x2="80" y2="205" stroke="#FF4444" strokeWidth="3" opacity="0.8" />
            <line x1="150" y1="183" x2="150" y2="210" stroke="#FF4444" strokeWidth="3" opacity="0.8" />
            <line x1="220" y1="183" x2="220" y2="205" stroke="#FF4444" strokeWidth="3" opacity="0.8" />

            {/* Hembar */}
            <rect x="58" y="183" width="184" height="8" fill="#333" />

            {/* Labels */}
            <text x="10" y="65" fontSize="11" fontFamily="Arial" fill="#FF4444" fontWeight="bold">LIGHT</text>
            <text x="270" y="65" fontSize="11" fontFamily="Arial" fill="#FF4444" fontWeight="bold">LIGHT</text>
            <text x="110" y="225" fontSize="11" fontFamily="Arial" fill="#FF4444" fontWeight="bold">LIGHT LEAKAGE</text>
          </svg>
        );

      case 'channels':
        return (
          <svg viewBox="0 0 300 350" className="solution-diagram-svg">
            {/* Window frame */}
            <rect x="40" y="50" width="220" height="200" fill="none" stroke="#2D2D2D" strokeWidth="3" />
            <rect x="35" y="45" width="230" height="210" fill="none" stroke="#6D6E71" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />

            {/* Window glass */}
            <rect x="50" y="60" width="200" height="180" fill="#E8F4FF" opacity="0.3" />

            {/* Roller head */}
            <rect x="50" y="55" width="200" height="18" fill="#2D2D2D" rx="9" />

            {/* Side channels - shown in green */}
            <rect x="45" y="73" width="8" height="110" fill="#8CC63F" />
            <rect x="247" y="73" width="8" height="110" fill="#8CC63F" />

            {/* Blackout shade with channels */}
            <rect x="53" y="73" width="194" height="110" fill="#1a1a1a" />

            {/* Guide lines on channels */}
            <line x1="49" y1="90" x2="49" y2="170" stroke="#6D6E71" strokeWidth="1" opacity="0.5" strokeDasharray="3,3" />
            <line x1="251" y1="90" x2="251" y2="170" stroke="#6D6E71" strokeWidth="1" opacity="0.5" strokeDasharray="3,3" />

            {/* No light leaks */}

            {/* Hembar */}
            <rect x="58" y="183" width="184" height="8" fill="#333" />

            {/* Labels */}
            <text x="25" y="120" fontSize="10" fontFamily="Arial" fill="#8CC63F" fontWeight="bold">Channel</text>
            <text x="250" y="120" fontSize="10" fontFamily="Arial" fill="#8CC63F" fontWeight="bold">Channel</text>
            <text x="110" y="215" fontSize="11" fontFamily="Arial" fill="#2D2D2D" fontWeight="bold">Side gaps blocked by channels</text>
          </svg>
        );

      case 'pocket':
        return (
          <svg viewBox="0 0 300 350" className="solution-diagram-svg">
            {/* Ceiling */}
            <rect x="30" y="20" width="240" height="15" fill="#D3D3D3" />

            {/* Pocket in ceiling - shown in darker gray */}
            <rect x="40" y="25" width="220" height="25" fill="#999" opacity="0.6" />
            <text x="140" y="42" fontSize="9" fontFamily="Arial" fill="#FFF" fontWeight="bold">Pocket</text>

            {/* Window frame */}
            <rect x="40" y="50" width="220" height="200" fill="none" stroke="#2D2D2D" strokeWidth="3" />

            {/* Window glass */}
            <rect x="50" y="60" width="200" height="180" fill="#E8F4FF" opacity="0.3" />

            {/* Roller head completely hidden in pocket */}
            <rect x="50" y="32" width="200" height="18" fill="#2D2D2D" rx="9" opacity="0.3" />

            {/* Blackout shade */}
            <rect x="58" y="73" width="184" height="110" fill="#1a1a1a" />

            {/* No visible roller, no light gaps at top */}

            {/* Hembar */}
            <rect x="58" y="183" width="184" height="8" fill="#333" />

            {/* Clean line at top */}
            <line x1="50" y1="50" x2="250" y2="50" stroke="#2D2D2D" strokeWidth="2" />

            {/* Labels */}
            <text x="120" y="215" fontSize="11" fontFamily="Arial" fill="#2D2D2D" fontWeight="bold">Roller hidden in pocket - no light leaks</text>
            <text x="105" y="230" fontSize="10" fontFamily="Arial" fill="#6D6E71">Most elegant and luxurious appearance</text>
          </svg>
        );

      case 'sill':
        return (
          <svg viewBox="0 0 300 350" className="solution-diagram-svg">
            {/* Window frame */}
            <rect x="40" y="50" width="220" height="200" fill="none" stroke="#2D2D2D" strokeWidth="3" />

            {/* Window glass */}
            <rect x="50" y="60" width="200" height="180" fill="#E8F4FF" opacity="0.3" />

            {/* Roller head */}
            <rect x="50" y="55" width="200" height="18" fill="#2D2D2D" rx="9" />

            {/* Blackout shade */}
            <rect x="58" y="73" width="184" height="110" fill="#1a1a1a" />

            {/* Hembar */}
            <rect x="58" y="183" width="184" height="8" fill="#333" />

            {/* Sill angle - L-bracket shown in green */}
            <polygon points="50,190 50,210 270,210 270,190 270,195 55,195" fill="#8CC63F" opacity="0.7" />
            <line x1="50" y1="190" x2="270" y2="190" stroke="#2D2D2D" strokeWidth="1" />
            <line x1="50" y1="195" x2="270" y2="195" stroke="#2D2D2D" strokeWidth="1" />

            {/* Sill */}
            <rect x="50" y="210" width="200" height="15" fill="#8B7355" />

            {/* Label */}
            <text x="120" y="210" fontSize="10" fontFamily="Arial" fill="#2D2D2D" fontWeight="bold">Sill Angle</text>
            <text x="90" y="230" fontSize="10" fontFamily="Arial" fill="#2D2D2D">Blocks light at bottom - often paired with side channels</text>
          </svg>
        );

      case 'outside':
        return (
          <svg viewBox="0 0 300 350" className="solution-diagram-svg">
            {/* Outer wall */}
            <rect x="30" y="45" width="240" height="210" fill="#D3D3D3" opacity="0.3" />

            {/* Window frame - smaller, inside */}
            <rect x="40" y="50" width="220" height="200" fill="none" stroke="#2D2D2D" strokeWidth="2" />

            {/* Window glass */}
            <rect x="50" y="60" width="200" height="180" fill="#E8F4FF" opacity="0.3" />

            {/* Roller head - OUTSIDE and larger */}
            <rect x="25" y="45" width="250" height="18" fill="#2D2D2D" rx="9" />
            <circle cx="35" cy="54" r="6" fill="#8CC63F" />
            <circle cx="265" cy="54" r="6" fill="#8CC63F" />

            {/* Shade fabric - covers entire opening with overlap */}
            <rect x="30" y="63" width="240" height="115" fill="#1a1a1a" />

            {/* Overlap areas shown in green */}
            <rect x="25" y="63" width="10" height="115" fill="#8CC63F" opacity="0.4" />
            <rect x="265" y="63" width="10" height="115" fill="#8CC63F" opacity="0.4" />

            {/* Hembar */}
            <rect x="30" y="178" width="240" height="8" fill="#333" />

            {/* Sill */}
            <rect x="50" y="240" width="200" height="15" fill="#8B7355" />

            {/* Labels */}
            <text x="32" y="120" fontSize="9" fontFamily="Arial" fill="#8CC63F" fontWeight="bold">Overlap</text>
            <text x="270" y="120" fontSize="9" fontFamily="Arial" fill="#8CC63F" fontWeight="bold">Overlap</text>
            <text x="80" y="230" fontSize="11" fontFamily="Arial" fill="#2D2D2D" fontWeight="bold">Complete side coverage</text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <section ref={sectionRef} className={`section blackout-challenge ${isVisible ? 'visible' : ''}`}>
      <div className="section-content">
        <h2 className="section-title">The Blackout Challenge</h2>
        <p className="section-subtitle">Understanding and solving light leakage with inside-mounted shades</p>

        <div className="challenge-intro">
          <p>
            Even the best blackout fabric (0% opacity) cannot block light from leaking around its edges
            when the shade is mounted inside the window frame. This is physics, not a product flaw.
            The good news: there are elegant solutions.
          </p>
        </div>

        <div className="solutions-tabs">
          {solutions.map(sol => (
            <button
              key={sol.id}
              className={`solution-tab ${activeSolution === sol.id || (activeSolution === '' && sol.id === 'none') ? 'active' : ''}`}
              onClick={() => setActiveSolution(sol.id)}
            >
              {sol.name}
            </button>
          ))}
        </div>

        <div className="solution-panel">
          <div className="solution-diagram">{renderDiagram(activeSol.diagram)}</div>

          <div className="solution-details">
            <h3>{activeSol.name}</h3>
            <p className="solution-description">{activeSol.description}</p>

            {activeSol.id === 'none' && (
              <div className="why-it-happens">
                <h4>Why This Happens:</h4>
                <ul>
                  <li><strong>Side Gaps:</strong> Light enters from the left and right edges of the shade frame</li>
                  <li><strong>Top Gap:</strong> Light enters above the roller mechanism at the header</li>
                  <li><strong>Bottom Gap:</strong> Light enters below the hembar at the sill</li>
                </ul>
                <p className="emphasis-text">
                  For true blackout in inside-mounted applications, one or more of the solutions below is recommended.
                </p>
              </div>
            )}

            {activeSol.id === 'channels' && (
              <div className="solution-benefits">
                <h4>Benefits:</h4>
                <ul>
                  <li>Prevents light leakage from left and right sides</li>
                  <li>Guides the shade for smooth, precise operation</li>
                  <li>Clean, unobtrusive appearance</li>
                  <li>Works with both inside and outside mounts</li>
                </ul>
                <p className="note-text">Often paired with a sill angle to address bottom leakage</p>
              </div>
            )}

            {activeSol.id === 'pocket' && (
              <div className="solution-benefits">
                <h4>Benefits:</h4>
                <ul>
                  <li>Completely conceals the roller mechanism</li>
                  <li>Blocks all light from top</li>
                  <li>Creates the most elegant, minimalist appearance</li>
                  <li>Premium luxury aesthetic</li>
                </ul>
                <p className="note-text">Requires recessed cavity in ceiling or wall during construction or renovation</p>
              </div>
            )}

            {activeSol.id === 'sill' && (
              <div className="solution-benefits">
                <h4>Benefits:</h4>
                <ul>
                  <li>Blocks light leakage at the bottom</li>
                  <li>Simple retrofit installation</li>
                  <li>Minimal visual impact</li>
                  <li>Affordable solution</li>
                </ul>
                <p className="note-text">Best combined with side channels for complete blackout performance</p>
              </div>
            )}

            {activeSol.id === 'outside' && (
              <div className="solution-benefits">
                <h4>Benefits:</h4>
                <ul>
                  <li>Eliminates side gaps completely</li>
                  <li>Broader aesthetic design options</li>
                  <li>Better insulation and thermal control</li>
                  <li>Maximum light control without additional hardware</li>
                </ul>
                <p className="note-text">May require additional sill angles for complete bottom closure</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
