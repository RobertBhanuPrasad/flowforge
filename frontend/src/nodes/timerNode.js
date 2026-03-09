// timerNode.js — Delays pipeline execution by a set number of seconds

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TimerNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Timer / Delay"
    fields={[
      { name: 'delay', label: 'Delay (seconds)', type: 'number', default: '5' },
      {
        name: 'unit',
        label: 'Unit',
        type: 'select',
        default: 'Seconds',
        options: ['Milliseconds', 'Seconds', 'Minutes'],
      },
    ]}
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-input` },
      { type: 'source', position: Position.Right, id: `${id}-output` },
    ]}
  />
);
