import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import AnimatedCard from '../Common/AnimatedCard';
import useVisualizerStore from '../../store/useVisualizerStore';

const CodeEditor = () => {
  const { code, setCode, activeLineNumber, selectedPreset } = useVisualizerStore();

  // Custom style to highlight the active line
  const customLineProps = (lineNumber) => {
    const style = { display: 'block', width: '100%' };
    if (lineNumber === activeLineNumber) {
      style.backgroundColor = 'rgba(0, 212, 255, 0.15)';
      style.borderLeft = '3px solid var(--accent-blue)';
      style.paddingLeft = '8px';
    }
    return { style };
  };

  return (
    <AnimatedCard
      title="Code Editor"
      icon="📝"
      glowColor="var(--accent-blue)"
      delay={0}
    >
      {/* Algorithm Info */}
      {selectedPreset && (
        <div
          style={{
            padding: '10px 14px',
            marginBottom: '12px',
            background: 'rgba(123, 97, 255, 0.08)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(123, 97, 255, 0.2)',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
            {selectedPreset.icon} {selectedPreset.name}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            {selectedPreset.description}
          </div>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '6px',
              fontSize: '11px',
            }}
          >
            <span style={{ color: 'var(--accent-green)' }}>
              Time: {selectedPreset.timeComplexity}
            </span>
            <span style={{ color: 'var(--accent-orange)' }}>
              Space: {selectedPreset.spaceComplexity}
            </span>
          </div>
        </div>
      )}

      {/* Editable Textarea (hidden behind syntax highlighter) */}
      <div style={{ position: 'relative' }}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Write your JavaScript code here or select an algorithm from the sidebar..."
          spellCheck={false}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            zIndex: 2,
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            padding: '16px',
            resize: 'none',
            cursor: 'text',
          }}
        />

        {/* Syntax Highlighted Display */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {code ? (
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              showLineNumbers
              wrapLines
              lineProps={customLineProps}
              customStyle={{
                margin: 0,
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                background: 'rgba(0, 0, 0, 0.3)',
                maxHeight: '300px',
              }}
            >
              {code}
            </SyntaxHighlighter>
          ) : (
            <div
              style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontStyle: 'italic',
                fontSize: '13px',
              }}
            >
              👈 Select an algorithm from the sidebar to get started
            </div>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
};

export default CodeEditor;