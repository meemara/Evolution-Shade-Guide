import React, { useState } from 'react';
import { useSelection } from '../context/SelectionContext';
import { TEAM_MEMBERS } from '../data/teamData';
import { getFabricImageUrl } from '../data/fabricData';

export default function SelectionReview({ isOpen, onClose }) {
  const { clientName, projectName, rooms, setClientInfo, removeFabricFromRoom, removeRoom } = useSelection();
  const [editMode, setEditMode] = useState(false);
  const [editClient, setEditClient] = useState(clientName);
  const [editProject, setEditProject] = useState(projectName);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [additionalEmail, setAdditionalEmail] = useState('');
  const [sendStatus, setSendStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveInfo = () => {
    setClientInfo(editClient, editProject);
    setEditMode(false);
  };

  const toggleTeamMember = (email) => {
    setSelectedMembers(prev =>
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
  };

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          projectName,
          rooms,
          date: new Date().toLocaleDateString(),
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${clientName || 'Selections'}-${projectName || 'Project'}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        setSendStatus({ type: 'success', message: 'PDF downloaded successfully!' });
      } else {
        setSendStatus({ type: 'error', message: 'Failed to generate PDF' });
      }
    } catch (error) {
      setSendStatus({ type: 'error', message: 'Error generating PDF: ' + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = async () => {
    const recipients = [...selectedMembers];
    if (additionalEmail.trim()) {
      recipients.push(additionalEmail.trim());
    }

    if (recipients.length === 0) {
      setSendStatus({ type: 'error', message: 'Please select recipients' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/send-selections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          projectName,
          rooms,
          recipientEmails: selectedMembers,
          additionalEmail: additionalEmail.trim(),
          date: new Date().toLocaleDateString(),
        }),
      });

      if (response.ok) {
        setSendStatus({
          type: 'success',
          message: `Selections sent to ${recipients.length} recipient(s)`,
        });
        setTimeout(() => {
          setSendStatus(null);
          onClose();
        }, 2000);
      } else {
        const error = await response.json();
        setSendStatus({ type: 'error', message: error.message || 'Failed to send email' });
      }
    } catch (error) {
      setSendStatus({ type: 'error', message: 'Error sending email: ' + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const totalFabrics = rooms.reduce((sum, room) => sum + room.fabricSelections.length, 0);

  return (
    <div className="selection-review-overlay">
      <div className="selection-review-modal">
        <div className="review-header">
          <h2>Review Your Selections</h2>
          <button className="review-close" onClick={onClose}>✕</button>
        </div>

        <div className="review-content">
          {/* Client & Project Info */}
          <div className="review-section client-section">
            <div className="section-header">
              <h3>Client & Project</h3>
              {!editMode && (
                <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
              )}
            </div>

            {editMode ? (
              <div className="edit-fields">
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
                <div className="edit-buttons">
                  <button onClick={handleSaveInfo} className="save-btn">Save</button>
                  <button onClick={() => setEditMode(false)} className="cancel-btn">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="info-display">
                {clientName && <p><strong>Client:</strong> {clientName}</p>}
                {projectName && <p><strong>Project:</strong> {projectName}</p>}
                {!clientName && !projectName && <p className="empty-info">No client or project info yet</p>}
              </div>
            )}
          </div>

          {/* Rooms & Selections */}
          <div className="review-section selections-section">
            <div className="section-header">
              <h3>Rooms & Fabric Selections ({totalFabrics})</h3>
            </div>

            <div className="rooms-container">
              {rooms.length === 0 ? (
                <p className="empty-message">No rooms or selections yet</p>
              ) : (
                rooms.map(room => (
                  <div key={room.id} className="room-card">
                    <div className="room-header">
                      <h4>{room.name}</h4>
                      <button
                        className="remove-room-btn"
                        onClick={() => removeRoom(room.id)}
                        title="Remove room"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="fabrics-list">
                      {room.fabricSelections.length === 0 ? (
                        <p className="no-fabrics">No fabrics selected</p>
                      ) : (
                        room.fabricSelections.map(fabric => (
                          <div key={fabric.id} className="fabric-selection">
                            <div className="fabric-thumbnail-small">
                              <img
                                src={getFabricImageUrl(fabric.sku)}
                                alt={fabric.family || fabric.name}
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            </div>
                            <div className="fabric-details">
                              <div className="fabric-name">
                                <strong>{fabric.family}</strong> - {fabric.color}
                              </div>
                              <div className="fabric-specs">
                                <span className="spec">SKU: {fabric.sku}</span>
                                <span className="spec">Light: {fabric.opacity}</span>
                              </div>
                              {fabric.notes && <div className="fabric-notes">Note: {fabric.notes}</div>}
                            </div>
                            <button
                              className="remove-fabric-btn"
                              onClick={() => removeFabricFromRoom(room.id, fabric.id)}
                              title="Remove fabric"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Send Options */}
          <div className="review-section send-section">
            <div className="section-header">
              <h3>Send to Team</h3>
            </div>

            <div className="team-selector">
              <h4>Select Team Members</h4>
              <div className="team-checkboxes">
                {TEAM_MEMBERS.map(member => (
                  <label key={member.email} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.email)}
                      onChange={() => toggleTeamMember(member.email)}
                    />
                    <span>{member.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="additional-email">
              <label>
                Or add another email:
                <input
                  type="email"
                  value={additionalEmail}
                  onChange={(e) => setAdditionalEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="email-input"
                />
              </label>
            </div>

            {sendStatus && (
              <div className={`status-message ${sendStatus.type}`}>
                {sendStatus.message}
              </div>
            )}

            <div className="action-buttons">
              <button
                className="download-pdf-btn"
                onClick={handleDownloadPDF}
                disabled={isLoading || totalFabrics === 0}
              >
                {isLoading ? 'Generating...' : '📥 Download PDF'}
              </button>
              <button
                className="send-email-btn"
                onClick={handleSendEmail}
                disabled={isLoading || (selectedMembers.length === 0 && !additionalEmail.trim())}
              >
                {isLoading ? 'Sending...' : '📧 Send Email'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
