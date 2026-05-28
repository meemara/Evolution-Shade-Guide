import React, { useState } from 'react';
import { FABRIC_FAMILIES, getFabricImageUrl, getLutronFabricUrl, OPACITY_TYPES, COLLECTIONS } from '../data/fabricData';
import { FABRIC_COLOR_DATA } from '../data/fabricColorData';
import { getLutronFamilyMeta, CRESTRON_FAMILIES, CRESTRON_MANUFACTURERS, CRESTRON_STYLES, CRESTRON_OPENNESS, CRESTRON_COLOR_GROUPS } from '../data/fabricRepository';
import { useSelection } from '../context/SelectionContext';

// ─── Lutron color grid (existing, unchanged logic) ─────────────
function LutronColorGrid({ family, onSelectColor, selectedColor }) {
  const colors = FABRIC_COLOR_DATA[family.name] || [];
  if (colors.length === 0) return null;

  return (
    <div className="color-probe-section">
      <h4 className="color-probe-title">
        Available Colors<span className="color-count-label"> ({colors.length})</span>
      </h4>
      <div className="color-swatch-grid">
        {colors.map(c => (
          <div
            key={c.sku}
            className={`color-swatch-item ${selectedColor?.sku === c.sku ? 'active' : ''}`}
            onClick={() => onSelectColor({ name: c.color, sku: c.sku })}
            title={`${c.color} — ${c.sku}`}
          >
            <div className="color-swatch-thumb">
              <img src={getFabricImageUrl(c.sku)} alt={c.color} loading="lazy" />
            </div>
            <span className="color-swatch-name">{c.color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Lutron fabric metadata badges ─────────────────────────────
function LutronMetaBadges({ familyName }) {
  const meta = getLutronFamilyMeta(familyName);
  if (!meta) return null;

  return (
    <div className="fabric-meta-badges">
      <span className={`meta-badge ${meta.canRailroad ? 'yes' : 'no'}`}>
        {meta.canRailroad ? '✓' : '✗'} Railroad
      </span>
      <span className={`meta-badge ${meta.canSeam ? 'yes' : 'no'}`}>
        {meta.canSeam ? '✓' : '✗'} Seam
      </span>
      <span className="meta-badge neutral">
        Bolt: {meta.boltWidthIn}"
      </span>
    </div>
  );
}

// ─── Crestron color grid ───────────────────────────────────────
function CrestronColorGrid({ family, onSelectColor, selectedColor }) {
  const colors = family.colors || [];
  if (colors.length === 0) return null;

  return (
    <div className="color-probe-section">
      <h4 className="color-probe-title">
        Available Colors<span className="color-count-label"> ({colors.length})</span>
      </h4>
      <div className="color-swatch-grid">
        {colors.map(c => (
          <div
            key={c.csfCode}
            className={`color-swatch-item crestron-swatch ${selectedColor?.csfCode === c.csfCode ? 'active' : ''}`}
            onClick={() => onSelectColor({ name: c.color, csfCode: c.csfCode, ...c })}
            title={`${c.color} — ${c.csfCode}`}
          >
            <div className="color-swatch-thumb crestron-color-chip" data-group={c.colorGroup}>
              <span className="crestron-chip-letter">{c.color.charAt(0)}</span>
            </div>
            <span className="color-swatch-name">{c.color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Crestron solar performance display ────────────────────────
function SolarPerformance({ color }) {
  if (!color || !color.solarReflectance) return null;
  const rs = parseInt(color.solarReflectance) || 0;
  const as = parseInt(color.solarAbsorbance) || 0;
  const ts = parseInt(color.solarTransmittance) || 0;
  const tv = parseInt(color.visibleTransmittance) || 0;

  return (
    <div className="solar-performance">
      <h4 className="solar-title">Solar Performance</h4>
      <div className="solar-bars">
        <div className="solar-bar-row">
          <span className="solar-label">Reflectance</span>
          <div className="solar-bar-track"><div className="solar-bar-fill reflect" style={{ width: `${rs}%` }} /></div>
          <span className="solar-value">{rs}%</span>
        </div>
        <div className="solar-bar-row">
          <span className="solar-label">Absorbance</span>
          <div className="solar-bar-track"><div className="solar-bar-fill absorb" style={{ width: `${as}%` }} /></div>
          <span className="solar-value">{as}%</span>
        </div>
        <div className="solar-bar-row">
          <span className="solar-label">Transmittance</span>
          <div className="solar-bar-track"><div className="solar-bar-fill transmit" style={{ width: `${ts}%` }} /></div>
          <span className="solar-value">{ts}%</span>
        </div>
        <div className="solar-bar-row">
          <span className="solar-label">Visible Light</span>
          <div className="solar-bar-track"><div className="solar-bar-fill visible" style={{ width: `${tv}%` }} /></div>
          <span className="solar-value">{tv}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Crestron eco/safety badges ────────────────────────────────
function CrestronSafetyBadges({ color }) {
  if (!color) return null;
  const badges = [];
  if (color.fireRetardant) badges.push('Fire Retardant');
  if (color.moldResistant) badges.push('Mold Resistant');
  if (color.leadFree) badges.push('Lead Free');
  if (color.pvcFree) badges.push('PVC Free');
  if (color.recyclable) badges.push('Recyclable');
  if (color.certEnvSafe) badges.push('Env Safe');
  if (badges.length === 0) return null;

  return (
    <div className="crestron-safety-badges">
      {badges.map(b => (
        <span key={b} className="meta-badge yes">{b}</span>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main FabricGallery
// ═══════════════════════════════════════════════════════════════
export default function FabricGallery() {
  // Brand toggle
  const [activeBrand, setActiveBrand] = useState('lutron');

  // Lutron filters
  const [selectedOpacity, setSelectedOpacity] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Crestron filters
  const [crestronMfr, setCrestronMfr] = useState(null);
  const [crestronStyle, setCrestronStyle] = useState(null);
  const [crestronOpenness, setCrestronOpenness] = useState(null);

  // Shared state
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [selectedCrestronFamily, setSelectedCrestronFamily] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showRoomSelector, setShowRoomSelector] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [newRoomName, setNewRoomName] = useState('');

  const { rooms, addRoom, addFabricToRoom } = useSelection();

  // ── Lutron filtering ──
  let filteredLutron = FABRIC_FAMILIES;
  if (selectedOpacity) filteredLutron = filteredLutron.filter(f => f.type === selectedOpacity);
  if (selectedCollection) filteredLutron = filteredLutron.filter(f => f.collection === selectedCollection);

  // ── Crestron filtering ──
  let filteredCrestron = CRESTRON_FAMILIES;
  if (crestronMfr) filteredCrestron = filteredCrestron.filter(f => f.manufacturer === crestronMfr);
  if (crestronStyle) filteredCrestron = filteredCrestron.filter(f => f.fabricStyle === crestronStyle);
  if (crestronOpenness) filteredCrestron = filteredCrestron.filter(f => f.openness === crestronOpenness);

  const handleResetLutron = () => { setSelectedOpacity(null); setSelectedCollection(null); };
  const handleResetCrestron = () => { setCrestronMfr(null); setCrestronStyle(null); setCrestronOpenness(null); };

  const closeModal = () => {
    setSelectedFamily(null);
    setSelectedCrestronFamily(null);
    setShowRoomSelector(false);
    setSelectedColor(null);
    setSelectedRoomId(null);
    setNewRoomName('');
  };

  // ── Add to room (works for both brands) ──
  const handleAddToRoom = () => {
    if (!selectedRoomId) return;
    const isLutron = !!selectedFamily;
    const family = isLutron ? selectedFamily : selectedCrestronFamily;
    if (!family) return;

    addFabricToRoom(selectedRoomId, {
      brand: isLutron ? 'Lutron' : 'Crestron',
      family: isLutron ? family.name : family.fabricName,
      color: selectedColor?.name || '',
      sku: isLutron ? (selectedColor?.sku || family.sku) : (selectedColor?.csfCode || ''),
      opacity: isLutron ? family.type : (family.openness || ''),
    });
    closeModal();
  };

  const handleCreateNewRoom = () => {
    if (!newRoomName.trim()) return;
    const isLutron = !!selectedFamily;
    const family = isLutron ? selectedFamily : selectedCrestronFamily;
    if (!family) return;

    const roomId = addRoom(newRoomName);
    addFabricToRoom(roomId, {
      brand: isLutron ? 'Lutron' : 'Crestron',
      family: isLutron ? family.name : family.fabricName,
      color: selectedColor?.name || '',
      sku: isLutron ? (selectedColor?.sku || family.sku) : (selectedColor?.csfCode || ''),
      opacity: isLutron ? family.type : (family.openness || ''),
    });
    closeModal();
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'sheer': return 'Sheer / Solar Screen';
      case 'translucent': return 'Light Filtering';
      case 'roomdarkening': return 'Room Darkening';
      case 'blackout': return 'Blackout';
      default: return type;
    }
  };

  // ── Room selector panel (shared) ──
  const renderRoomSelector = () => (
    <div className="room-selector-panel">
      <h4>Select a Room</h4>
      <div className="room-selector-list">
        {rooms.map(room => (
          <button
            key={room.id}
            className={`room-option ${selectedRoomId === room.id ? 'selected' : ''}`}
            onClick={() => setSelectedRoomId(room.id)}
          >
            {room.name} <span className="fabric-count">({room.fabricSelections.length})</span>
          </button>
        ))}
      </div>
      <div className="new-room-input">
        <input type="text" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="Or create new room" className="room-name-input" />
      </div>
      <div className="room-selector-actions">
        {selectedRoomId && (
          <button className="confirm-add-btn" onClick={handleAddToRoom}>
            Add to {rooms.find(r => r.id === selectedRoomId)?.name}
          </button>
        )}
        {newRoomName.trim() && (
          <button className="create-room-btn" onClick={handleCreateNewRoom}>
            Create "{newRoomName}" & Add
          </button>
        )}
        <button className="cancel-add-btn" onClick={() => { setShowRoomSelector(false); setSelectedRoomId(null); setNewRoomName(''); }}>
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <section className="section fabric-gallery">
      <div className="section-content">
        <h2 className="section-title">Fabric Gallery</h2>
        <p className="section-subtitle">Explore roller shade fabrics from Lutron and Crestron</p>

        {/* ── Brand Toggle ── */}
        <div className="brand-toggle">
          <button className={`brand-btn ${activeBrand === 'lutron' ? 'active' : ''}`}
            onClick={() => { setActiveBrand('lutron'); handleResetCrestron(); }}>
            <span className="brand-btn-name">Lutron</span>
            <span className="brand-btn-count">{FABRIC_FAMILIES.length} families</span>
          </button>
          <button className={`brand-btn ${activeBrand === 'crestron' ? 'active' : ''}`}
            onClick={() => { setActiveBrand('crestron'); handleResetLutron(); }}>
            <span className="brand-btn-name">Crestron</span>
            <span className="brand-btn-count">{CRESTRON_FAMILIES.length} families</span>
          </button>
        </div>

        {/* ═══ LUTRON VIEW ═══ */}
        {activeBrand === 'lutron' && (
          <>
            <div className="fabric-filter-bar">
              <div className="filter-row">
                <div className="filter-group-inline">
                  <span className="filter-label">Opacity:</span>
                  <div className="filter-pills">
                    {OPACITY_TYPES.map(opType => (
                      <button key={opType.key}
                        className={`filter-pill ${selectedOpacity === opType.key ? 'active' : ''}`}
                        onClick={() => setSelectedOpacity(selectedOpacity === opType.key ? null : opType.key)}>
                        {opType.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="filter-group-inline">
                  <span className="filter-label">Collection:</span>
                  <div className="filter-pills">
                    {COLLECTIONS.map(col => (
                      <button key={col}
                        className={`filter-pill ${selectedCollection === col ? 'active' : ''}`}
                        onClick={() => setSelectedCollection(selectedCollection === col ? null : col)}>
                        {col.charAt(0).toUpperCase() + col.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                {(selectedOpacity || selectedCollection) && (
                  <button className="filter-clear" onClick={handleResetLutron}>Clear Filters</button>
                )}
              </div>
              <p className="fabric-results-count">
                {filteredLutron.length} fabric {filteredLutron.length !== 1 ? 'families' : 'family'}
              </p>
            </div>

            <div className="fabric-family-grid">
              {filteredLutron.map(family => (
                <div key={family.sku} className="fabric-family-card" onClick={() => setSelectedFamily(family)}>
                  <div className="fabric-family-image">
                    <img src={getFabricImageUrl(family.sku)} alt={family.name} loading="lazy" />
                  </div>
                  <div className="fabric-family-info">
                    <h3 className="fabric-family-name">{family.name}</h3>
                    <span className="fabric-family-count">{family.count} fabrics</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══ CRESTRON VIEW ═══ */}
        {activeBrand === 'crestron' && (
          <>
            <div className="fabric-filter-bar">
              <div className="filter-row">
                <div className="filter-group-inline">
                  <span className="filter-label">Manufacturer:</span>
                  <div className="filter-pills">
                    {CRESTRON_MANUFACTURERS.map(m => (
                      <button key={m}
                        className={`filter-pill ${crestronMfr === m ? 'active' : ''}`}
                        onClick={() => setCrestronMfr(crestronMfr === m ? null : m)}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="filter-group-inline">
                  <span className="filter-label">Openness:</span>
                  <div className="filter-pills">
                    {CRESTRON_OPENNESS.map(o => (
                      <button key={o}
                        className={`filter-pill ${crestronOpenness === o ? 'active' : ''}`}
                        onClick={() => setCrestronOpenness(crestronOpenness === o ? null : o)}>
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="filter-group-inline">
                  <span className="filter-label">Style:</span>
                  <div className="filter-pills">
                    {CRESTRON_STYLES.map(s => (
                      <button key={s}
                        className={`filter-pill ${crestronStyle === s ? 'active' : ''}`}
                        onClick={() => setCrestronStyle(crestronStyle === s ? null : s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                {(crestronMfr || crestronStyle || crestronOpenness) && (
                  <button className="filter-clear" onClick={handleResetCrestron}>Clear Filters</button>
                )}
              </div>
              <p className="fabric-results-count">
                {filteredCrestron.length} fabric {filteredCrestron.length !== 1 ? 'families' : 'family'}
              </p>
            </div>

            <div className="fabric-family-grid">
              {filteredCrestron.map(family => (
                <div key={family.fabricName} className="fabric-family-card crestron-card"
                  onClick={() => setSelectedCrestronFamily(family)}>
                  <div className="fabric-family-image crestron-family-image">
                    <div className="crestron-card-icon">
                      <span className="crestron-openness-badge">{family.openness !== 'n/a' ? family.openness : '—'}</span>
                    </div>
                  </div>
                  <div className="fabric-family-info">
                    <h3 className="fabric-family-name">{family.fabricName}</h3>
                    <span className="fabric-family-count">{family.colors.length} colors</span>
                    <span className="fabric-family-mfr">{family.manufacturer}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══ LUTRON DETAIL MODAL ═══ */}
        {selectedFamily && (
          <div className="fabric-modal" onClick={closeModal}>
            <div className="fabric-detail-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>✕</button>
              <div className="fabric-detail-layout">
                <div className="fabric-detail-image">
                  <img
                    src={getFabricImageUrl(selectedColor?.sku || selectedFamily.sku)}
                    alt={selectedColor ? `${selectedFamily.name} — ${selectedColor.name}` : selectedFamily.name}
                    onError={(e) => { e.target.style.backgroundColor = '#E5E5E5'; }}
                  />
                  {selectedColor && <div className="selected-color-label">{selectedColor.name}</div>}
                </div>
                <div className="fabric-detail-info">
                  <div className="detail-brand-label">Lutron</div>
                  <h3>{selectedFamily.name}</h3>
                  <p className="fabric-detail-count">
                    {(FABRIC_COLOR_DATA[selectedFamily.name] || []).length || selectedFamily.count} colors available
                  </p>

                  <div className="fabric-detail-specs">
                    <div className="detail-spec">
                      <span className="detail-spec-label">Light Control</span>
                      <span className="detail-spec-value">{getTypeLabel(selectedFamily.type)}</span>
                    </div>
                    <div className="detail-spec">
                      <span className="detail-spec-label">Collection</span>
                      <span className="detail-spec-value">{selectedFamily.collection.charAt(0).toUpperCase() + selectedFamily.collection.slice(1)}</span>
                    </div>
                    <div className="detail-spec">
                      <span className="detail-spec-label">SKU</span>
                      <span className="detail-spec-value">{selectedColor?.sku || selectedFamily.sku}</span>
                    </div>
                  </div>

                  <LutronMetaBadges familyName={selectedFamily.name} />

                  <LutronColorGrid family={selectedFamily} onSelectColor={setSelectedColor} selectedColor={selectedColor} />

                  <a href={getLutronFabricUrl(selectedFamily)} target="_blank" rel="noopener noreferrer" className="lutron-link-btn">
                    View on Lutron Fabrics
                  </a>

                  {!showRoomSelector ? (
                    <button className="fabric-add-btn" onClick={() => setShowRoomSelector(true)}>
                      {selectedColor ? `Add ${selectedColor.name} to Room` : 'Add to Room'}
                    </button>
                  ) : renderRoomSelector()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ CRESTRON DETAIL MODAL ═══ */}
        {selectedCrestronFamily && (
          <div className="fabric-modal" onClick={closeModal}>
            <div className="fabric-detail-modal crestron-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>✕</button>
              <div className="fabric-detail-layout">
                <div className="fabric-detail-image crestron-detail-image">
                  <div className="crestron-detail-visual">
                    <span className="crestron-big-openness">{selectedCrestronFamily.openness !== 'n/a' ? selectedCrestronFamily.openness : '—'}</span>
                    <span className="crestron-big-label">openness</span>
                  </div>
                  {selectedColor && <div className="selected-color-label">{selectedColor.name}</div>}
                </div>
                <div className="fabric-detail-info">
                  <div className="detail-brand-label crestron-brand">Crestron</div>
                  <h3>{selectedCrestronFamily.fabricName}</h3>
                  <p className="fabric-detail-count">{selectedCrestronFamily.colors.length} colors available</p>

                  <div className="fabric-detail-specs">
                    <div className="detail-spec">
                      <span className="detail-spec-label">Manufacturer</span>
                      <span className="detail-spec-value">{selectedCrestronFamily.manufacturer}</span>
                    </div>
                    <div className="detail-spec">
                      <span className="detail-spec-label">Openness</span>
                      <span className="detail-spec-value">{selectedCrestronFamily.openness}</span>
                    </div>
                    <div className="detail-spec">
                      <span className="detail-spec-label">Fabric Style</span>
                      <span className="detail-spec-value">{selectedCrestronFamily.fabricStyle}</span>
                    </div>
                    <div className="detail-spec">
                      <span className="detail-spec-label">Warranty</span>
                      <span className="detail-spec-value">{selectedCrestronFamily.warrantyYears} years</span>
                    </div>
                    {selectedColor?.csfCode && (
                      <div className="detail-spec">
                        <span className="detail-spec-label">CSF Code</span>
                        <span className="detail-spec-value">{selectedColor.csfCode}</span>
                      </div>
                    )}
                  </div>

                  {selectedCrestronFamily.composition && (
                    <div className="crestron-composition">
                      <span className="detail-spec-label">Composition</span>
                      <p className="composition-text">{selectedCrestronFamily.composition}</p>
                    </div>
                  )}

                  <div className="fabric-meta-badges">
                    <span className={`meta-badge ${selectedCrestronFamily.canRailroad ? 'yes' : 'no'}`}>
                      {selectedCrestronFamily.canRailroad ? '✓' : '✗'} Railroad
                    </span>
                    <span className={`meta-badge ${selectedCrestronFamily.canSeam ? 'yes' : 'no'}`}>
                      {selectedCrestronFamily.canSeam ? '✓' : '✗'} Seam
                    </span>
                    {selectedColor?.dualSided && <span className="meta-badge yes">Dual-Sided</span>}
                  </div>

                  <SolarPerformance color={selectedColor || selectedCrestronFamily.colors[0]} />
                  <CrestronSafetyBadges color={selectedColor || selectedCrestronFamily.colors[0]} />

                  <CrestronColorGrid family={selectedCrestronFamily} onSelectColor={setSelectedColor} selectedColor={selectedColor} />

                  {!showRoomSelector ? (
                    <button className="fabric-add-btn" onClick={() => setShowRoomSelector(true)}>
                      {selectedColor ? `Add ${selectedColor.name} to Room` : 'Add to Room'}
                    </button>
                  ) : renderRoomSelector()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
