// textNode.js
// Part 1 + Part 3.
//
// NOTE: TextNode intentionally does NOT use BaseNode. The reason is that
// Part 3 requires dynamic width/height resize and dynamic Handle generation
// based on {{variable}} patterns in the text -- both require custom render
// logic that cannot be expressed through BaseNode's static field/handle config.
// All other 8 nodes use BaseNode.

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

// Extracts valid JS variable names from {{varName}} patterns.
// Regex follows JS identifier rules: start with letter/_ /$, then alphanumeric/_ /$.
const extractVariables = (text) => {
  const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return [...vars];
};

// Width grows based on the LONGEST single line — more accurate than total char count
// because multiline text has many short lines that don't need a wide node.
const calcWidth = (text) => {
  const lines = text.split('\n');
  const longestLine = Math.max(...lines.map((l) => l.length), 1);
  return Math.min(480, Math.max(200, longestLine * 9));
};

// Textarea height grows with the actual number of lines typed.
const calcTextareaHeight = (text) => {
  const lineCount = text.split('\n').length;
  return Math.max(48, lineCount * 20);
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));
  const updateNodeField = useStore((state) => state.updateNodeField);

  const nodeWidth = calcWidth(currText);
  const textareaHeight = calcTextareaHeight(currText);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setCurrText(val);
    setVariables(extractVariables(val));
    updateNodeField(id, 'text', val);
  };

  return (
    <div
      style={{
        width: nodeWidth,
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
      {/* Handles use ReactFlow's standard absolute positioning via the top style only */}
      {variables.map((varName, index) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ top: `${((index + 1) / (variables.length + 1)) * 100}%` }}
        />
      ))}

      {/* Static output handle on the right */}
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ color: '#9ca3af', fontSize: 11 }}>Text:</span>
        <textarea
          value={currText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            height: textareaHeight,
            padding: '4px 6px',
            borderRadius: 4,
            border: '1px solid #374151',
            backgroundColor: '#111827',
            color: '#fff',
            fontSize: 12,
            resize: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
          }}
        />

        {/* Variable badge pills — quick visual reference for detected variables */}
        {variables.length > 0 && (
          <div style={{ marginTop: 2, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
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
