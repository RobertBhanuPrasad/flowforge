// submit.js
// Part 4: Sends pipeline nodes + edges to the backend and shows an alert
// with the number of nodes, edges, and whether the pipeline is a DAG.

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);

  // Pull nodes and edges directly from the Zustand store
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // User-friendly alert as required by the assessment
      const dagStatus = data.is_dag
        ? 'Yes — this is a valid DAG'
        : 'No — this pipeline contains a cycle';

      alert(
        `Pipeline Analysis\n` +
        `─────────────────\n` +
        `Nodes     : ${data.num_nodes}\n` +
        `Edges     : ${data.num_edges}\n` +
        `Valid DAG : ${dagStatus}`
      );
    } catch (err) {
      alert(
        `Could not reach the backend.\n` +
        `Make sure the server is running on port 8000.\n\n` +
        `Error: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={loading ? { ...styles.button, ...styles.buttonLoading } : styles.button}
      >
        {loading ? 'Analysing...' : 'Submit Pipeline'}
      </button>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    backgroundColor: '#0f1117',
    borderTop: '1px solid #1f2937',
  },
  button: {
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 32px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    letterSpacing: '0.4px',
  },
  buttonLoading: {
    backgroundColor: '#4b5563',
    cursor: 'not-allowed',
  },
};
