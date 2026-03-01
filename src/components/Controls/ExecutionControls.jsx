import React from 'react';
import { motion } from 'framer-motion';
import {
  FiPlay,
  FiPause,
  FiSkipForward,
  FiSkipBack,
  FiRotateCcw,
  FiZap,
} from 'react-icons/fi';
import useVisualizerStore from '../../store/useVisualizerStore';
import useExecutionPlayer from '../../hooks/useExecutionPlayer';

const ExecutionControls = () => {
  const {
    isPlaying,
    playSpeed,
    setPlaySpeed,
    currentStepIndex,
    executionSteps,
    isExecuting,
  } = useVisualizerStore();

  const { executeCode, play, pause, restart, isAtEnd, isAtStart, progress } =
    useExecutionPlayer();

  const { nextStep, prevStep } = useVisualizerStore();

  const speedOptions = [
    { label: '0.5x', value: 2000 },
    { label: '1x', value: 1000 },
    { label: '2x', value: 500 },
    { label: '4x', value: 250 },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 20px',
        background: 'rgba(17, 17, 40, 0.6)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Execute Button */}
      <motion.button
        onClick={executeCode}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isExecuting}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 20px',
          background: 'var(--gradient-primary)',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontWeight: 600,
          fontSize: '13px',
          cursor: isExecuting ? 'wait' : 'pointer',
          opacity: isExecuting ? 0.6 : 1,
        }}
      >
        <FiZap size={16} />
        {isExecuting ? 'Executing...' : 'Execute'}
      </motion.button>

      {/* Divider */}
      <div
        style={{
          width: '1px',
          height: '30px',
          background: 'var(--border-color)',
        }}
      />

      {/* Playback Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <ControlButton
          onClick={restart}
          disabled={executionSteps.length === 0}
          title="Restart"
        >
          <FiRotateCcw size={16} />
        </ControlButton>

        <ControlButton
          onClick={prevStep}
          disabled={isAtStart || executionSteps.length === 0}
          title="Previous Step"
        >
          <FiSkipBack size={16} />
        </ControlButton>

        <ControlButton
          onClick={isPlaying ? pause : play}
          disabled={executionSteps.length === 0 && !isPlaying}
          title={isPlaying ? 'Pause' : 'Play'}
          primary
        >
          {isPlaying ? <FiPause size={18} /> : <FiPlay size={18} />}
        </ControlButton>

        <ControlButton
          onClick={nextStep}
          disabled={isAtEnd || executionSteps.length === 0}
          title="Next Step"
        >
          <FiSkipForward size={16} />
        </ControlButton>
      </div>

      {/* Speed Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {speedOptions.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => setPlaySpeed(option.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '4px 10px',
              background:
                playSpeed === option.value
                  ? 'rgba(0, 212, 255, 0.2)'
                  : 'transparent',
              border:
                playSpeed === option.value
                  ? '1px solid rgba(0, 212, 255, 0.5)'
                  : '1px solid var(--border-color)',
              borderRadius: '6px',
              color:
                playSpeed === option.value
                  ? 'var(--accent-blue)'
                  : 'var(--text-secondary)',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      {/* Progress Bar */}
      <div
        style={{
          flex: 1,
          height: '4px',
          background: 'var(--border-color)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          style={{
            height: '100%',
            background: 'var(--gradient-primary)',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Step Counter */}
      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', minWidth: '80px', textAlign: 'right' }}>
        {executionSteps.length > 0
          ? `${currentStepIndex + 1} / ${executionSteps.length}`
          : 'No steps'}
      </span>
    </div>
  );
};

// Reusable control button component
const ControlButton = ({ children, onClick, disabled, title, primary }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    title={title}
    whileHover={{ scale: disabled ? 1 : 1.1 }}
    whileTap={{ scale: disabled ? 1 : 0.9 }}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: primary ? '40px' : '34px',
      height: primary ? '40px' : '34px',
      background: primary
        ? 'rgba(123, 97, 255, 0.2)'
        : 'rgba(255, 255, 255, 0.05)',
      border: primary
        ? '1px solid rgba(123, 97, 255, 0.5)'
        : '1px solid var(--border-color)',
      borderRadius: '50%',
      color: disabled
        ? 'var(--text-secondary)'
        : primary
        ? 'var(--accent-purple)'
        : 'var(--text-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
    }}
  >
    {children}
  </motion.button>
);

export default ExecutionControls;