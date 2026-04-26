import React, { useState } from 'react';

export default function BlackoutChallenge() {
  const [activeSolution, setActiveSolution] = useState('none');

  const solutions = [
    {
      id: 'none',
      name: 'The Challenge',
      description: 'Even with 0% opacity blackout fabric, light still leaks around the edges when the shade is inside-mounted. This happens because light comes through the gaps around the sides, top, and bottom of the shade.',
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-09/blackout-roller-shades-living-room.jpg',
      photoAlt: 'Room with blackout shades showing light leakage around edges'
    },
    {
      id: 'channels',
      name: 'Side Channels',
      description: 'Metal channels run vertically along the left and right sides of the shade. These guide the shade smoothly while blocking light from leaking through the side gaps. Simple, effective solution.',
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-09/blackout-in-channels-roller-shades-living-room.jpg',
      photoAlt: 'Blackout roller shades with side channel guides eliminating light gaps'
    },
    {
      id: 'pocket',
      name: 'Built-in Pocket',
      description: 'A pocket is built into the ceiling or wall at the header, completely concealing the roller mechanism and blocking light from above. Creates the cleanest, most elegant look.',
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-08/sivoia-roller-recessed-pocket.jpg',
      photoAlt: 'Roller shade recessed into a ceiling pocket for seamless appearance'
    },
    {
      id: 'sill',
      name: 'Sill Angle',
      description: 'An L-shaped piece installed at the bottom sill blocks light from leaking underneath the hembar. Often used in combination with side channels for complete coverage.',
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-08/greatrm-big-sky-angle-shade-preset.jpg',
      photoAlt: 'Window with angled shade installation showing sill-level light blocking'
    },
    {
      id: 'outside',
      name: 'Outside Mount',
      description: 'By mounting the shade outside the window frame with overlap on all sides, you eliminate side gaps entirely. Additional solutions can eliminate bottom leakage.',
      photo: 'https://www.lutron.com/us/sites/hub_americas/files/styles/product_card_general_default_desktop_medium/public/2025-08/livrm-p-widr_contemp-angle-half-watch.jpg',
      photoAlt: 'Outside mounted roller shades providing full window coverage'
    }
  ];

  const activeSol = solutions.find(s => s.id === activeSolution) || solutions[0];

  return (
    <section className="section blackout-challenge">
      <div className="section-content">
        <h2 className="section-title">The Blackout Challenge</h2>
        <p className="section-subtitle">Understanding and solving light leakage</p>

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
              className={`solution-tab ${activeSolution === sol.id ? 'active' : ''}`}
              onClick={() => setActiveSolution(sol.id)}
            >
              {sol.name}
            </button>
          ))}
        </div>

        <div className="solution-panel">
          <div className="solution-photo">
            <img src={activeSol.photo} alt={activeSol.photoAlt} />
          </div>

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
