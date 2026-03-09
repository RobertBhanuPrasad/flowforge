// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {/* Original 4 nodes */}
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />

                {/* 5 new nodes demonstrating the abstraction */}
                <DraggableNode type='api' label='API Call' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='note' label='Note' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='timer' label='Timer' />
            </div>
        </div>
    );
};
