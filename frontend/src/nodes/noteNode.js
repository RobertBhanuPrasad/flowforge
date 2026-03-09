// noteNode.js — A comment/annotation node with no handles

import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Note"
    fields={[
      { name: 'note', label: 'Comment', type: 'textarea', default: 'Add a note...' },
    ]}
    handles={[]}
    style={{ borderColor: '#d97706', backgroundColor: '#1c1a0e' }}
  />
);
