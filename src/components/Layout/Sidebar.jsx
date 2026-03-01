import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { presetAlgorithms, getCategorizedPresets } from '../../data/presetAlgorithms';
import useVisualizerStore from '../../store/useVisualizerStore';

const Sidebar = () => {
  const { selectedPreset, setSelectedPreset } = useVisualizerStore();
  const categories = getCategorizedPresets();

  return (
    <div
      style={{
        width: '280px',
        minWidth: '280px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        padding: '20px 16px',
        overflowY: 'auto',
        height: 'calc(100vh - 57px)',
      }}
    >
      <h2
        style={{
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: 'var(--text-secondary)',
          marginBottom: '20px',
        }}
      >
        📚 Algorithms
      </h2>

      {Object.entries(categories).map(([category, presets]) => (
        <div key={category} style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--accent-purple)',
              marginBottom: '10px',
              fontWeight: 600,
            }}
          >
            {category}
          </h3>

          {presets.map((preset) => (
            <motion.button
              key={preset.id}
              onClick={() => setSelectedPreset(preset)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                marginBottom: '4px',
                background:
                  selectedPreset?.id === preset.id
                    ? 'rgba(123, 97, 255, 0.15)'
                    : 'transparent',
                border:
                  selectedPreset?.id === preset.id
                    ? '1px solid rgba(123, 97, 255, 0.4)'
                    : '1px solid transparent',
                borderRadius: 'var(--radius-sm)',
                color:
                  selectedPreset?.id === preset.id
                    ? 'var(--accent-blue)'
                    : 'var(--text-primary)',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '13px',
                transition: 'var(--transition)',
              }}
            >
              <span style={{ fontSize: '18px' }}>{preset.icon}</span>
              <div>
                <div style={{ fontWeight: 500 }}>{preset.name}</div>
                <div
                  style={{
                    fontSize: '10px',
                    color: 'var(--text-secondary)',
                    marginTop: '2px',
                  }}
                >
                  {preset.timeComplexity} • {preset.difficulty}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;