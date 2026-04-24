import React, { useEffect, useRef, useState } from 'react';
import { FABRICS, getThumbnailUrl, OPACITY_TYPES, COLLECTIONS } from '../data/fabricData';
import { useSelection } from '../context/SelectionContext';

export default function FabricGallery() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOpacity, setSelectedOpacity] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [showRoomSelector, setShowRoomSelector] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [newRoomName, setNewRoomName] = useState('');

  const { rooms, addRoom, addFabricToRoom } = useSelection();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Filter fabrics
  let filtered = FABRICS;

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
    if (selectedRoomId) {
      addFabricToRoom(selectedRoomId, selectedFabric);
      setShowRoomSelector(false);
      setSelectedRoomId(null);
      setSelectedFabric(null);
    }
  };

  const handleCreateNewRoom = () => {
    if (newRoomName.trim()) {
      const roomId = addRoom(newRoomName);
      addFabricToRoom(roomId, selectedFabric);
      setShowRoomSelector(false);
      setSelectedRoomId(null);
      setNewRoomName('');
      setSelectedFabric(null);
    }
  };

  return (
    <section ref={sectionRef} className={`section fabric-gallery ${isVisible ? 'visible' : ''}`}>
      <div className="section-content">
        <h2 className="section-title">Fabric Gallery</h2>
        <p className="section-subtitle">Explore 80+ premium fabrics across multiple collections</p>

        <div className="gallery-filters">
          <div className="filter-group">
            <h4>Filter by Opacity</h4>
            <div className="filter-buttons">
              {OPACITY_TYPES.map(opType => (
                <button
                  key={opType.key}
                  className={`filter-btn ${selectedOpacity === opType.key ? 'active' : ''}`}
                  onClick={() => setSelectedOpacity(selectedOpacity === opType.key ? null : opType.key)}
                >
                  {opType.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Filter by Collection</h4>
            <div className="filter-buttons">
              {COLLECTIONS.map(col => (
                <button
                  key={col}
                  className={`filter-btn ${selectedCollection === col ? 'active' : ''}`}
                  onClick={() => setSelectedCollection(selectedCollection === col ? null : col)}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {(selectedOpacity || selectedCollection) && (
            <button className="reset-filters" onClick={handleReset}>
              Reset Filters
            </button>
          )}
        </div>

        <p className="results-count">
          Showing {filtered.length} fabric{filtered.length !== 1 ? 's' : ''}
        </p>

        <div className="fabric-grid">
          {filtered.map(fabric => (
            <div
              key={fabric.sku}
              className="fabric-card"
              onClick={() => setSelectedFabric(fabric)}
            >
              <div className="fabric-thumbnail-wrapper">
                <img
                  src={getThumbnailUrl(fabric.sku)}
                  alt={`${fabric.family} - ${fabric.color}`}
                  className="fabric-thumbnail"
                  onError={(e) => {
                    e.target.style.backgroundColor = '#E5E5E5';
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="fabric-info">
                <p className="fabric-family">{fabric.family}</p>
                <p className="fabric-color">{fabric.color}</p>
                <p className="fabric-opacity">{fabric.opacity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fabric Detail Modal */}
        {selectedFabric && (
          <div className="fabric-modal" onClick={() => setSelectedFabric(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedFabric(null)}>
                ✕
              </button>

              <div className="modal-body">
                <div className="modal-image">
                  <img
                    src={getThumbnailUrl(selectedFabric.sku)}
                    alt={`${selectedFabric.family} - ${selectedFabric.color}`}
                    onError={(e) => {
                      e.target.style.backgroundColor = '#E5E5E5';
                    }}
                  />
                </div>

                <div className="modal-info">
                  <h3>{selectedFabric.family}</h3>
                  <p className="modal-color-name">{selectedFabric.color}</p>

                  <div className="modal-specs">
                    <div className="spec">
                      <span className="spec-label">SKU:</span>
                      <span className="spec-value">{selectedFabric.sku}</span>
                    </div>
                    <div className="spec">
                      <span className="spec-label">Light Transmission:</span>
                      <span className="spec-value">{selectedFabric.opacity}</span>
                    </div>
                    <div className="spec">
                      <span className="spec-label">Collection:</span>
                      <span className="spec-value">
                        {selectedFabric.collection.charAt(0).toUpperCase() + selectedFabric.collection.slice(1)}
                      </span>
                    </div>
                    <div className="spec">
                      <span className="spec-label">Type:</span>
                      <span className="spec-value">
                        {selectedFabric.type === 'sheer' && 'Sheer'}
                        {selectedFabric.type === 'translucent' && 'Translucent'}
                        {selectedFabric.type === 'roomdarkening' && 'Room Darkening'}
                        {selectedFabric.type === 'blackout' && 'Blackout'}
                      </span>
                    </div>
                  </div>

                  <div className="modal-description">
                    <p>
                      This elegant fabric is part of our curated collection, selected for quality, durability,
                      and aesthetic appeal. Each fabric is tested for light control performance and fade resistance.
                    </p>
                  </div>

                  {!showRoomSelector ? (
                    <button className="modal-request-btn add-to-room-btn" onClick={() => setShowRoomSelector(true)}>
                      Add to Room
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
