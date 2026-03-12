// toolbar.js
// Top navigation bar: app branding on the left, draggable node palette on the right.

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={styles.toolbar}>
      {/* App branding */}
      <div style={styles.brand}>
        <span style={styles.brandIcon}>⚡</span>
        <span style={styles.brandName}>FlowForge</span>
        <span style={styles.brandTag}>Pipeline Builder</span>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Node palette label */}
      <span style={styles.paletteLabel}>Nodes</span>

      {/* Draggable node palette */}
      <div style={styles.palette}>
        <DraggableNode type="customInput"  label="Input"     icon="📥" />
        <DraggableNode type="customOutput" label="Output"    icon="📤" />
        <DraggableNode type="llm"          label="LLM"       icon="🤖" />
        <DraggableNode type="text"         label="Text"      icon="📝" />
        <DraggableNode type="api"          label="API Call"  icon="🌐" />
        <DraggableNode type="condition"    label="Condition" icon="🔀" />
        <DraggableNode type="transform"    label="Transform" icon="⚙️" />
        <DraggableNode type="timer"        label="Timer"     icon="⏱️" />
        <DraggableNode type="note"         label="Note"      icon="🗒️" />
      </div>
    </div>
  );
};

const styles = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '0 20px',
    height: '64px',
    backgroundColor: '#111827',
    borderBottom: '1px solid #1f2937',
    flexShrink: 0,
    overflowX: 'auto',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
  },
  brandIcon: {
    fontSize: '20px',
  },
  brandName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#a78bfa',
    letterSpacing: '0.3px',
  },
  brandTag: {
    fontSize: '11px',
    color: '#6b7280',
    fontWeight: '400',
  },
  divider: {
    width: '1px',
    height: '32px',
    backgroundColor: '#1f2937',
    flexShrink: 0,
  },
  paletteLabel: {
    fontSize: '11px',
    color: '#6b7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    flexShrink: 0,
  },
  palette: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
};
