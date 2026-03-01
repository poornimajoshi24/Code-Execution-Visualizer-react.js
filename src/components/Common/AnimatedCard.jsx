import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({
  children,
  title,
  icon,
  className = '',
  glowColor = 'var(--accent-purple)',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        boxShadow: `0 0 25px ${glowColor}40`,
        borderColor: glowColor,
      }}
      style={{
        background: 'var(--gradient-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'var(--transition)',
      }}
      className={className}
    >
      {title && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          {icon && <span style={{ fontSize: '20px' }}>{icon}</span>}
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--text-secondary)',
            }}
          >
            {title}
          </h3>
        </div>
      )}
      <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
    </motion.div>
  );
};

export default AnimatedCard;