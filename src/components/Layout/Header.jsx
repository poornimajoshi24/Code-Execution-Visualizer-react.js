import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiCpu, FiZap } from 'react-icons/fi';
import useVisualizerStore from '../../store/useVisualizerStore';

const Header = () => {
  const { currentStepIndex, executionSteps } = useVisualizerStore();

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: 'rgba(17, 17, 40, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <FiCpu size={28} color="var(--accent-purple)" />
        </motion.div>
        <div>
          <h1
            style={{
              fontSize: '18px',
              fontWeight: 700,
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Code Execution Visualizer
          </h1>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            See how your code <em>really</em> runs
          </p>
        </div>
      </div>

      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {executionSteps.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: 'rgba(0, 212, 255, 0.1)',
              borderRadius: '20px',
              border: '1px solid rgba(0, 212, 255, 0.3)',
            }}
          >
            <FiZap size={14} color="var(--accent-blue)" />
            <span style={{ fontSize: '13px', color: 'var(--accent-blue)' }}>
              Step {currentStepIndex + 1} / {executionSteps.length}
            </span>
          </motion.div>
        )}

        <motion.a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FiGithub size={20} />
        </motion.a>
      </div>
    </motion.header>
  );
};

export default Header;