import React, { useState } from 'react';

export default function MountingOptions() {
  const [activeMount, setActiveMount] = useState('inside');

  return (
    <section className="section mounting-options">
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
              <div className="mount-photo">
                <img
                  src="https://www.lutron.com/us/sites/hub_americas/files/styles/cards_short_desktop_medium_2x/public/2024-12/livrm-lascala-1-shades-up.jpg"
                  alt="Inside mounted shades in a modern living room"
                />
                <div className="photo-caption">Inside Mount — shade fits within the window frame</div>
              </div>

              <div className="mount-details">
                <h3>Inside Mount</h3>
                <p className="highlight-text">Clean, minimal aesthetic that showcases your window trim</p>

                <div className="pros-cons">
                  <div className="pros">
                    <h4>Advantages</h4>
                    <ul>
                      <li>Clean, minimal aesthetic</li>
                      <li>Shows window trim and frame</li>
                      <li>Great for elegant spaces</li>
                      <li>Requires minimal wall space</li>
                    </ul>
                  </div>

                  <div className="cons">
                    <h4>Considerations</h4>
                    <ul>
                      <li>Light gaps around edges</li>
                      <li>Gaps on left, right, and bottom</li>
                      <li>Solution: side channels, sill angles, or pocket mounts</li>
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
              <div className="mount-photo">
                <img
                  src="https://www.lutron.com/us/sites/hub_americas/files/styles/cards_short_desktop_medium_2x/public/2024-12/bedroom-sitting-area-casa-del-ritmo_25B9210.jpg"
                  alt="Outside mounted shades providing complete light control"
                />
                <div className="photo-caption">Outside Mount — shade covers the full window opening</div>
              </div>

              <div className="mount-details">
                <h3>Outside Mount</h3>
                <p className="highlight-text">Superior light control with complete coverage</p>

                <div className="pros-cons">
                  <div className="pros">
                    <h4>Advantages</h4>
                    <ul>
                      <li>Complete light control — no side gaps</li>
                      <li>Perfect for blackout applications</li>
                      <li>Covers window frame and trim</li>
                      <li>More sophisticated appearance</li>
                      <li>Better insulation properties</li>
                    </ul>
                  </div>

                  <div className="cons">
                    <h4>Considerations</h4>
                    <ul>
                      <li>Covers window trim (less visible)</li>
                      <li>Requires wall or ceiling space</li>
                      <li>Slightly more prominent profile</li>
                      <li>Light may still leak at bottom</li>
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
