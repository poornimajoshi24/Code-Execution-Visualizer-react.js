import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCard from '../Common/AnimatedCard';
import useVisualizerStore from '../../store/useVisualizerStore';

const CallStack = () => {
  const { callStack, variables } = useVisualizerStore();

  const getFrameColor = (index, total) => {
    const colors = [
      '#7b61ff',
      '#00d4ff',
      '#00e676',
      '#ff9100',
      '#ff5252',
      '#ffea00',
    ];
    return colors[index % colors.length];
  };

  return (
    <AnimatedCard
      title="Call Stack"
      icon="🏗️"
      glowColor="var(--accent-purple)"
      delay={0.1}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          height: '100%',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: '6px',
            justifyContent: 'flex-start',
            overflow: 'auto',
          }}
        >
          <AnimatePresence mode="popLayout">
            {callStack.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '30px',
                  color: 'var(--text-secondary)',
                  fontSize: '13px',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>📭</div>
                Call stack is empty.
                <br />
                Execute code to see frames appear.
              </motion.div>
            ) : (
              callStack.map((frame, index) => {
                const color = getFrameColor(index, callStack.length);
                const isTop = index === callStack.length - 1;

                return (
                  <motion.div
                    key={frame.id}
                    layout
                    initial={{ x: -50, opacity: 0, scale: 0.8 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      boxShadow: isTop
                        ? `0 0 15px ${color}40`
                        : '0 2px 8px rgba(0,0,0,0.3)',
                    }}
                    exit={{ x: 50, opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={{
                      padding: '12px 16px',
                      background: isTop
                        ? `linear-gradient(135deg, ${color}20, ${color}10)`
                        : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isTop ? color : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-sm)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {isTop && (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '3px',
                          height: '100%',
                          background: color,
                        }}
                      />
                    )}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: isTop ? color : 'var(--text-primary)',
                          }}
                        >
                          {frame.name}()
                        </span>
                        {frame.args && Object.keys(frame.args).length > 0 && (
                          <div
                            style={{
                              fontSize: '11px',
                              color: 'var(--text-secondary)',
                              fontFamily: 'var(--font-mono)',
                              marginTop: '4px',
                            }}
                          >
                            args:{' '}
                            {typeof frame.args === 'object'
                              ? JSON.stringify(frame.args)
                              : frame.args}
                          </div>
                        )}
                      </div>
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          background: `${color}20`,
                          color: color,
                          fontWeight: 600,
                        }}
                      >
                        #{index}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {Object.keys(variables).length > 0 && (
          <div
            style={{
              padding: '12px',
              background: 'rgba(0, 230, 118, 0.05)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(0, 230, 118, 0.2)',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                color: 'var(--accent-green)',
                marginBottom: '8px',
                fontWeight: 600,
              }}
            >
              Variables
            </div>
            {Object.entries(variables).map(([name, info]) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '4px 0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                }}
              >
                <span style={{ color: 'var(--accent-yellow)' }}>{name}</span>
                <span style={{ color: 'var(--text-primary)' }}>
                  {JSON.stringify(info.value)}
                </span>
              </div>
            ))}
          </div>
        )}

        {callStack.length > 0 && (
          <div
            style={{
              textAlign: 'center',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              padding: '4px',
            }}
          >
            Stack Depth:{' '}
            <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>
              {callStack.length}
            </span>
          </div>
        )}
      </div>
    </AnimatedCard>
  );
};

export default CallStack;