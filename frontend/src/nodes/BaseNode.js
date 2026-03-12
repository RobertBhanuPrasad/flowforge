// BaseNode.js
// The core abstraction for all nodes in the pipeline.
//
// PROP API:
//   id       {string}  - ReactFlow node id (passed automatically by ReactFlow)
//   data     {object}  - Initial field values from ReactFlow node data
//   title    {string}  - Header label shown at the top of the node
//   fields   {Array}   - List of field configs. Each field object:
//                          { name, label, type, default, options? }
//                          type: 'text' | 'number' | 'select' | 'textarea'
//                          options: required when type === 'select'
//   handles  {Array}   - List of Handle configs. Each handle object:
//                          { id, type, position, style? }
//                          type: 'source' | 'target'
//                          position: Position.Left | Position.Right | etc.
//   style    {object}  - Optional style overrides for the outer node container
//
// ADDING A NEW NODE takes ~10 lines — just pass config as props:
//   export const MyNode = ({ id, data }) => (
//     <BaseNode id={id} data={data} title="My Node"
//       fields={[{ name: 'val', label: 'Value', type: 'text', default: '' }]}
//       handles={[{ type: 'target', position: Position.Left,  id: `${id}-in`  },
//                 { type: 'source', position: Position.Right, id: `${id}-out` }]}
//     />
//   );

import { useState } from 'react';
import { Handle } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({ id, data, title, fields = [], handles = [], style = {} }) => {
  // Build initial field state from data prop or field defaults
  const initState = () => {
    const state = {};
    fields.forEach((field) => {
      state[field.name] = data?.[field.name] ?? field.default ?? '';
    });
    return state;
  };

  const [fieldValues, setFieldValues] = useState(initState);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleChange = (fieldName, value) => {
    setFieldValues((prev) => ({ ...prev, [fieldName]: value }));
    updateNodeField(id, fieldName, value);
  };

  const renderField = (field) => {
    const value = fieldValues[field.name];

    if (field.type === 'select') {
      return (
        <label key={field.name} style={styles.label}>
          <span style={styles.labelText}>{field.label}:</span>
          <select
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            style={styles.select}
          >
            {field.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
      );
    }

    if (field.type === 'textarea') {
      return (
        <label key={field.name} style={styles.label}>
          <span style={styles.labelText}>{field.label}:</span>
          <textarea
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            rows={3}
            style={styles.textarea}
          />
        </label>
      );
    }

    // default: text, number, etc.
    return (
      <label key={field.name} style={styles.label}>
        <span style={styles.labelText}>{field.label}:</span>
        <input
          type={field.type || 'text'}
          value={value}
          onChange={(e) => handleChange(field.name, e.target.value)}
          style={styles.input}
        />
      </label>
    );
  };

  return (
    <div style={{ ...styles.node, ...style }}>
      {/* Render all handles BEFORE content so they sit on edges */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style || {}}
        />
      ))}

      {/* Node Header */}
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
      </div>

      {/* Node Body — rendered fields */}
      {fields.length > 0 && (
        <div style={styles.body}>
          {fields.map((field) => renderField(field))}
        </div>
      )}
    </div>
  );
};

const styles = {
  node: {
    width: 200,
    minHeight: 80,
    border: '1px solid #555',
    borderRadius: 8,
    backgroundColor: '#1C2536',
    color: '#fff',
    fontFamily: 'sans-serif',
    fontSize: 12,
    boxSizing: 'border-box',
    padding: '8px 10px',
  },
  header: {
    marginBottom: 6,
    borderBottom: '1px solid #333',
    paddingBottom: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#a78bfa',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  labelText: {
    color: '#9ca3af',
    fontSize: 11,
  },
  input: {
    width: '100%',
    padding: '3px 6px',
    borderRadius: 4,
    border: '1px solid #374151',
    backgroundColor: '#111827',
    color: '#fff',
    fontSize: 12,
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '3px 6px',
    borderRadius: 4,
    border: '1px solid #374151',
    backgroundColor: '#111827',
    color: '#fff',
    fontSize: 12,
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '3px 6px',
    borderRadius: 4,
    border: '1px solid #374151',
    backgroundColor: '#111827',
    color: '#fff',
    fontSize: 12,
    resize: 'vertical',
    boxSizing: 'border-box',
  },
};
