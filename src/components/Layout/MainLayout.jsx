import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CodeEditor from '../Editor/CodeEditor';
import CallStack from '../Visualizers/CallStack';
import MemoryHeap from '../Visualizers/MemoryHeap';
import RecursionTree from '../Visualizers/RecursionTree';
import ComplexityGraph from '../Visualizers/ComplexityGraph';
import ExecutionControls from '../Controls/ExecutionControls';
import useVisualizerStore from '../../store/useVisualizerStore';

const MainLayout = () => {
  const { output, variables, activeLineNumber } = useVisualizerStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Controls Bar */}
          <ExecutionControls />

          {/* Main Content Area */}
          <div
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: '12px',
              padding: '12px',
              overflow: 'auto',
            }}
          >
            {/* Top Left: Code Editor */}
            <div style={{ minHeight: 0 }}>
              <CodeEditor />
            </div>

            {/* Top Right: Call Stack */}
            <div style={{ minHeight: 0 }}>
              <CallStack />
            </div>

            {/* Bottom Left: Recursion Tree + Variables */}
            <div
              style={{
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ flex: 1 }}>
                <RecursionTree />
              </div>
            </div>

            {/* Bottom Right: Memory + Complexity */}
            <div
              style={{
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ flex: 1 }}>
                <MemoryHeap />
              </div>
              <div style={{ flex: 1 }}>
                <ComplexityGraph />
              </div>
            </div>
          </div>

          {/* Output Bar */}
          {output.length > 0 && (
            <div
              style={{
                padding: '10px 20px',
                background: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border-color)',
                maxHeight: '100px',
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  marginBottom: '6px',
                }}
              >
                Console Output
              </div>
              {output.map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--accent-green)',
                  }}
                >
                  {'>'} {line}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;