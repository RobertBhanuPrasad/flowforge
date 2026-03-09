// transformNode.js — Transforms / formats data between nodes

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Transform"
    fields={[
      {
        name: 'transformType',
        label: 'Operation',
        type: 'select',
        default: 'To Uppercase',
        options: ['To Uppercase', 'To Lowercase', 'Trim', 'Parse JSON', 'Stringify JSON'],
      },
    ]}
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-input` },
      { type: 'source', position: Position.Right, id: `${id}-output` },
    ]}
  />
);
