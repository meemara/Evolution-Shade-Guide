import React, { useState } from 'react';
import { useSelection } from '../context/SelectionContext';

export default function SelectionBar({ onReviewClick }) {
  const { clientName, projectName, rooms, addRoom, setClientInfo } = useSelection();
  const [isExpanded, setIsExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editClient, setEditClient] = useState(clientName);
  const [editProject, setEditProject] = useState(projectName);
  const [newRoomName, setNewRoomName] = useState('');

  const totalFabrics = rooms.reduce((sum, room) => sum + room.fabricSelections.length, 0);
  const hasSelections = rooms.length > 0;

  const handleSaveInfo = () => {
    setClientInfo(editClient, editProject);
    setEditMode(false);
  };

  const handleAddRoom = () => {
    if (newRoomName.trim()) {
      addRoom(newRoomName);
      setNewRoomName('');
    }
  };

  if (!hasSelections) {
    return (
      <div className="selection-bar collapsed">
        <button
          className="selection-toggle"
          onClick={() => setIsExpanded(true)}
          title="Open selections panel"
        >
          <span className="toggle-icon">+</span>
          <span className="toggle-label">Add Selection</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`selection-bar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="selection-bar-header">
        <div className="selection-info">
          {editMode ? (
            <div className="client-info-edit">
              <input
                type="text"
                value={editClient}
                onChange={(e) => setEditClient(e.target.value)}
                placeholder="Client name"
                className="edit-input"
              />
              <input
                type="text"
                value={editProject}
                onChange={(e) => setEditProject(e.target.value)}
                placeholder="Project name"
                className="edit-input"
              />
              <button onClick={handleSaveInfo} className="save-btn">Save</button>
              <button onClick={() => setEditMode(false)} className="cancel-btn">Cancel</button>
            </div>
          ) : (
            <div className="client-info-display" onClick={() => setEditMode(true)}>
              <div className="client-project">
                {clientName && <span className="client-name">{clientName}</span>}
                {projectName && <span className="project-name">{projectName}</span>}
                {!clientName && !projectName && <span className="placeholder">Click to add client & project</span>}
              </div>
            </div>
          )}
        </div>

        <button
          className="selection-toggle-collapse"
          onClick={() => setIsExpanded(false)}
          title="Collapse"
        >
          ↓
        </button>
      </div>

      {isExpanded && (
        <div className="selection-bar-content">
          <div className="rooms-section">
            <h4>Rooms & Selections</h4>
            <div className="rooms-list">
              {rooms.map(room => (
                <div key={room.id} className="room-item">
                  <span className="room-name">{room.name}</span>
                  <span className="fabric-badge">{room.fabricSelections.length}</span>
                </div>
              ))}
            </div>

            <div className="add-room-section">
              <input
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="New room name"
                className="room-input"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddRoom();
                }}
              />
              <button onClick={handleAddRoom} className="add-room-btn">
                + Room
              </button>
            </div>
          </div>

          <div className="selection-summary">
            <div className="summary-stat">
              <span className="summary-label">Rooms</span>
              <span className="summary-value">{rooms.length}</span>
            </div>
            <div className="summary-stat">
              <span className="summary-label">Fabrics</span>
              <span className="summary-value">{totalFabrics}</span>
            </div>
          </div>

          <div className="selection-actions">
            <button className="review-btn" onClick={onReviewClick}>
              Review & Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
