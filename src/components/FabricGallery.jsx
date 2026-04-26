import React, { useState } from 'react';
import { FABRIC_FAMILIES, getFabricImageUrl, getLutronFabricUrl, OPACITY_TYPES, COLLECTIONS } from '../data/fabricData';
import { FABRIC_COLOR_DATA } from '../data/fabricColorData';
import { useSelection } from '../context/SelectionContext';

// Component that displays real color variants from scraped Lutron data
function ColorGrid({ family, onSelectColor, selectedColor }) {
  const colors = FABRIC_COLOR_DATA[family.name] || [];

  if (colors.length === 0) return null;

  return (
    <div className="color-probe-section">
      <h4 className="color-probe-title">
        Available Colors
        <span className="color-count-label"> ({colors.length})</span>
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

export default function FabricGallery() {
  const [selectedOpacity, setSelectedOpacity] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showRoomSelector, setShowRoomSelector] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [newRoomName, setNewRoomName] = useState('');

  const { rooms, addRoom, addFabricToRoom } = useSelection();

  // Filter families
  let filtered = FABRIC_FAMILIES;

  if (selectedOpacity) {
    filtered = filtered.filter(f => f.type === selectedOpacity);
  }

  if (selectedCollection) {
    filtered = filtered.filter(f => f.collection === selectedCollection);
  }

  const handleReset = () => {
    setSelectedOpacity(null);
    setSelectedCollection(null);
  };

  const handleAddToRoom = () => {
    if (selectedRoomId && selectedFamily) {
      addFabricToRoom(selectedRoomId, {
        ...selectedFamily,
        family: selectedFamily.name,
        color: selectedColor?.name || '',
        sku: selectedColor?.sku || selectedFamily.sku,
        opacity: selectedFamily.type,
      });
      setShowRoomSelector(false);
      setSelectedRoomId(null);
      setSelectedFamily(null);
      setSelectedColor(null);
    }
  };

  const handleCreateNewRoom = () => {
    if (newRoomName.trim() && selectedFamily) {
      const roomId = addRoom(newRoomName);
      addFabricToRoom(roomId, {
        ...selectedFamily,
        family: selectedFamily.name,
        color: selectedColor?.name || '',
        sku: selectedColor?.sku || selectedFamily.sku,
        opacity: selectedFamily.type,
      });
      setShowRoomSelector(false);
      setSelectedRoomId(null);
      setNewRoomName('');
      setSelectedFamily(null);
      setSelectedColor(null);
    }
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

  return (
    <section className="section fabric-gallery">
      <div className="section-content">
        <h2 className="section-title">Fabric Gallery</h2>
        <p className="section-subtitle">Explore our curated selection of Lutron roller shade fabrics</p>

        <div className="fabric-filter-bar">
          <div className="filter-row">
            <div className="filter-group-inline">
              <span className="filter-label">Opacity:</span>
              <div className="filter-pills">
                {OPACITY_TYPES.map(opType => (
                  <button
                    key={opType.key}
                    className={`filter-pill ${selectedOpacity === opType.key ? 'active' : ''}`}
                    onClick={() => setSelectedOpacity(selectedOpacity === opType.key ? null : opType.key)}
                  >
                    {opType.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group-inline">
              <span className="filter-label">Collection:</span>
              <div className="filter-pills">
                {COLLECTIONS.map(col => (
                  <button
                    key={col}
                    className={`filter-pill ${selectedCollection === col ? 'active' : ''}`}
                    onClick={() => setSelectedCollection(selectedCollection === col ? null : col)}
                  >
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {(selectedOpacity || selectedCollection) && (
              <button className="filter-clear" onClick={handleReset}>
                Clear Filters
              </button>
            )}
          </div>

          <p className="fabric-results-count">
            {filtered.length} fabric {filtered.length !== 1 ? 'families' : 'family'}
          </p>
        </div>

        <div className="fabric-family-grid">
          {filtered.map(family => (
            <div
              key={family.sku}
              className="fabric-family-card"
              onClick={() => setSelectedFamily(family)}
            >
              <div className="fabric-family-image">
                <img
                  src={getFabricImageUrl(family.sku)}
                  alt={family.name}
                  loading="lazy"
                />
              </div>
              <div className="fabric-family-info">
                <h3 className="fabric-family-name">{family.name}</h3>
                <span className="fabric-family-count">{family.count} fabrics</span>
              </div>
            </div>
          ))}
        </div>

        {/* Fabric Family Detail Modal */}
        {selectedFamily && (
          <div className="fabric-modal" onClick={() => { setSelectedFamily(null); setShowRoomSelector(false); setSelectedColor(null); }}>
            <div className="fabric-detail-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => { setSelectedFamily(null); setShowRoomSelector(false); setSelectedColor(null); }}>
                ✕
              </button>

              <div className="fabric-detail-layout">
                <div className="fabric-detail-image">
                  <img
                    src={getFabricImageUrl(selectedColor?.sku || selectedFamily.sku)}
                    alt={selectedColor ? `${selectedFamily.name} — ${selectedColor.name}` : selectedFamily.name}
                    onError={(e) => {
                      e.target.style.backgroundColor = '#E5E5E5';
                    }}
                  />
                  {selectedColor && (
                    <div className="selected-color-label">{selectedColor.name}</div>
                  )}
                </div>

                <div className="fabric-detail-info">
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
                      <span className="detail-spec-value">
                        {selectedFamily.collection.charAt(0).toUpperCase() + selectedFamily.collection.slice(1)}
                      </span>
                    </div>
                    <div className="detail-spec">
                      <span className="detail-spec-label">SKU</span>
                      <span className="detail-spec-value">{selectedColor?.sku || selectedFamily.sku}</span>
                    </div>
                  </div>

                  <ColorGrid
                    family={selectedFamily}
                    onSelectColor={setSelectedColor}
                    selectedColor={selectedColor}
                  />

                  <a
                    href={getLutronFabricUrl(selectedFamily)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lutron-link-btn"
                  >
                    View All Colors on Lutron
                  </a>

                  {!showRoomSelector ? (
                    <button className="fabric-add-btn" onClick={() => setShowRoomSelector(true)}>
                      {selectedColor ? `Add ${selectedColor.name} to Room` : 'Add to Room'}
                    </button>
                  ) : (
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
                        <input
                          type="text"
                          value={newRoomName}
                          onChange={(e) => setNewRoomName(e.target.value)}
                          placeholder="Or create new room"
                          className="room-name-input"
                        />
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
                        <button className="cancel-add-btn" onClick={() => {
                          setShowRoomSelector(false);
                          setSelectedRoomId(null);
                          setNewRoomName('');
                        }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
