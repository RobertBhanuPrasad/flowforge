// App.js
// Root layout: Toolbar (top) -> Canvas (fills remaining height) -> Submit (bottom)

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={styles.app}>
      <PipelineToolbar />
      <div style={styles.canvas}>
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#0f1117',
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
    overflow: 'hidden',
  },
};

export default App;
