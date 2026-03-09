// conditionNode.js — Branches pipeline based on a condition (true / false)

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Condition"
    fields={[
      { name: 'condition', label: 'Expression', type: 'text', default: 'value > 0' },
    ]}
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-input` },
      { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '35%' } },
      { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '65%' } },
    ]}
  />
);
