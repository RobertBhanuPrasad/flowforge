// textNode.js
// Part 1: Uses BaseNode abstraction.
// Part 3: Extended with auto-resize and dynamic {{variable}} handles.

import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

// Extracts valid JS variable names from {{varName}} patterns
const extractVariables = (text) => {
  const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return [...vars];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Dynamically calculate node width and height based on text length (Part 3)
  const minWidth = 200;
  const minHeight = 80;
  const charsPerLine = 20;
  const lineHeight = 18;
  const lines = Math.max(1, Math.ceil(currText.length / charsPerLine));
  const dynamicWidth = Math.min(400, Math.max(minWidth, currText.length * 8));
  const dynamicHeight = Math.max(minHeight, 50 + lines * lineHeight + variables.length * 24);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setCurrText(val);
    setVariables(extractVariables(val));
    updateNodeField(id, 'text', val);
  };

  return (
    <div
      style={{
        width: dynamicWidth,
        minHeight: dynamicHeight,
        border: '1px solid #555',
        borderRadius: 8,
        backgroundColor: '#1C2536',
        color: '#fff',
        fontFamily: 'sans-serif',
        fontSize: 12,
        padding: '8px 10px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Dynamic target handles — one per {{variable}} (Part 3) */}
      {variables.map((varName, index) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ top: `${((index + 1) / (variables.length + 1)) * 100}%` }}
        />
      ))}

      {/* Static output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />

      {/* Header */}
      <div style={{ borderBottom: '1px solid #333', paddingBottom: 4, marginBottom: 6 }}>
        <span style={{ fontWeight: 'bold', fontSize: 13, color: '#a78bfa' }}>Text</span>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ color: '#9ca3af', fontSize: 11 }}>Text:</span>
        <textarea
          value={currText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            padding: '3px 6px',
            borderRadius: 4,
            border: '1px solid #374151',
            backgroundColor: '#111827',
            color: '#fff',
            fontSize: 12,
            resize: 'none',
            boxSizing: 'border-box',
            minHeight: Math.max(40, lines * lineHeight),
          }}
        />
        {/* Show detected variables as labels */}
        {variables.length > 0 && (
          <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {variables.map((v) => (
              <span
                key={v}
                style={{
                  backgroundColor: '#312e81',
                  color: '#c4b5fd',
                  borderRadius: 4,
                  padding: '1px 6px',
                  fontSize: 10,
                }}
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
