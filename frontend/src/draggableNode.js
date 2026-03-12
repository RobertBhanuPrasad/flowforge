// draggableNode.js
// A draggable card in the toolbar palette.
// Accepts an icon (emoji) and label. Drag it onto the canvas to create a node.

import { useState } from 'react';

export const DraggableNode = ({ type, label, icon }) => {
  const [hovered, setHovered] = useState(false);

  const onDragStart = (event) => {
    const appData = { nodeType: type };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      draggable
      onDragStart={onDragStart}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        width: '68px',
        height: '52px',
        borderRadius: '8px',
        backgroundColor: hovered ? '#1e293b' : '#1C2536',
        border: hovered ? '1px solid #7c3aed' : '1px solid #374151',
        cursor: 'grab',
        userSelect: 'none',
        transition: 'border-color 0.15s ease, background-color 0.15s ease',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      <span style={{ fontSize: '16px', lineHeight: 1 }}>{icon}</span>
      <span style={{ fontSize: '10px', color: '#d1d5db', fontWeight: '500', textAlign: 'center' }}>
        {label}
      </span>
    </div>
  );
};
