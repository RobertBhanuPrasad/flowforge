// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="LLM"
    fields={[
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        default: 'gpt-4o',
        options: ['gpt-4o', 'gpt-4', 'gpt-3.5-turbo', 'claude-3-5-sonnet'],
      },
      {
        name: 'temperature',
        label: 'Temperature',
        type: 'number',
        default: '0.7',
      },
    ]}
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: '33%' } },
      { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: '66%' } },
      { type: 'source', position: Position.Right, id: `${id}-response` },
    ]}
  />
);
