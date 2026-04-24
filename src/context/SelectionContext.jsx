import React, { createContext, useContext, useState } from 'react';

const SelectionContext = createContext();

export function SelectionProvider({ children }) {
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [rooms, setRooms] = useState([]);

  const addRoom = (roomName) => {
    const newRoom = {
      id: Date.now(),
      name: roomName || `Room ${rooms.length + 1}`,
      fabricSelections: [],
    };
    setRooms([...rooms, newRoom]);
    return newRoom.id;
  };

  const removeRoom = (roomId) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  const addFabricToRoom = (roomId, fabricData) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          fabricSelections: [
            ...room.fabricSelections,
            {
              id: Date.now(),
              sku: fabricData.sku,
              family: fabricData.family,
              color: fabricData.color,
              opacity: fabricData.opacity,
              notes: fabricData.notes || '',
            },
          ],
        };
      }
      return room;
    }));
  };

  const removeFabricFromRoom = (roomId, fabricId) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          fabricSelections: room.fabricSelections.filter(f => f.id !== fabricId),
        };
      }
      return room;
    }));
  };

  const setClientInfo = (client, project) => {
    setClientName(client);
    setProjectName(project);
  };

  const clearAll = () => {
    setClientName('');
    setProjectName('');
    setRooms([]);
  };

  return (
    <SelectionContext.Provider
      value={{
        clientName,
        projectName,
        rooms,
        addRoom,
        removeRoom,
        addFabricToRoom,
        removeFabricFromRoom,
        setClientInfo,
        clearAll,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within SelectionProvider');
  }
  return context;
}
