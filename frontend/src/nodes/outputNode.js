// outputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Output"
    fields={[
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        default: id.replace('customOutput-', 'output_'),
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        default: 'Text',
        options: ['Text', 'Image'],
      },
    ]}
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-value` },
    ]}
  />
);
