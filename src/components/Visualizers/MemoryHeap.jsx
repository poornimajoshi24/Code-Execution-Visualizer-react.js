import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCard from '../Common/AnimatedCard';
import useVisualizerStore from '../../store/useVisualizerStore';

const MemoryHeap = () => {
  const { memoryHeap } = useVisualizerStore();
  const entries = Object.entries(memoryHeap);

  const getTypeColor = (type) => {
    switch (type) {
      case 'stack-frame':
        return 'var(--accent-purple)';
      case 'reference':
        return 'var(--accent-blue)';
      case 'primitive':
        return 'var(--accent-green)';
      default:
        return 'var(--accent-orange)';
    }
  };

  const totalSize = entries.reduce((sum, [, val]) => {
    const sizeStr = val.size || '0 bytes';
    return sum + parseInt(sizeStr);
  }, 0);

  return (
    <AnimatedCard
      title="Memory Heap"
      icon="🧠"
      glowColor="var(--accent-green)"
      delay={0.2}
    >
      {entries.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            color: 'var(--text-secondary)',
            fontSize: '13px',
          }}
        >
          <div style={{ fontSize: '30px', marginBottom: '8px' }}>💤</div>
          No memory allocated yet
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '12px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                marginBottom: '4px',
              }}
            >
              <span>Allocated Memory</span>
              <span>{totalSize} bytes</span>
            </div>
            <div
              style={{
                height: '6px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{ width: `${Math.min((totalSize / 500) * 100, 100)}%` }}
                style={{
                  height: '100%',
                  background: 'var(--gradient-primary)',
                  borderRadius: '3px',
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '8px',
              maxHeight: '150px',
              overflow: 'auto',
            }}
          >
            <AnimatePresence>
              {entries.map(([address, data]) => {
                const color = getTypeColor(data.type);
                return (
                  <motion.div
                    key={address}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      padding: '10px',
                      background: `${color}10`,
                      border: `1px solid ${color}40`,
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '11px',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: color,
                        fontWeight: 600,
                        marginBottom: '4px',
                      }}
                    >
                      {address}
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      {data.function || data.name || 'unknown'}
                    </div>
                    <div
                      style={{
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-mono)',
                        marginTop: '2px',
                        wordBreak: 'break-all',
                      }}
                    >
                      {typeof data.value !== 'undefined'
                        ? JSON.stringify(data.value).slice(0, 30)
                        : data.type}
                    </div>
                    <div
                      style={{
                        marginTop: '4px',
                        fontSize: '10px',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {data.size}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </>
      )}
    </AnimatedCard>
  );
};

export default MemoryHeap;