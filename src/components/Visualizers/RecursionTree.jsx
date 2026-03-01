import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedCard from '../Common/AnimatedCard';
import useVisualizerStore from '../../store/useVisualizerStore';

const NODE_WIDTH = 90;
const NODE_HEIGHT = 40;
const LEVEL_GAP = 60;
const SIBLING_GAP = 16;

const getSubtreeWidth = (node) => {
  if (!node || !node.children || node.children.length === 0) return NODE_WIDTH;
  const childrenWidth = node.children.reduce(
    (sum, child) => sum + getSubtreeWidth(child),
    0
  );
  return Math.max(NODE_WIDTH, childrenWidth + SIBLING_GAP * (node.children.length - 1));
};

const layoutTree = (node, x = 0, y = 0) => {
  if (!node) return [];
  const items = [];
  const subtreeW = getSubtreeWidth(node);
  const nodeX = x + subtreeW / 2 - NODE_WIDTH / 2;
  items.push({ ...node, x: nodeX, y, subtreeW });

  if (node.children && node.children.length > 0) {
    let childX = x;
    node.children.forEach((child) => {
      const childW = getSubtreeWidth(child);
      items.push(...layoutTree(child, childX, y + NODE_HEIGHT + LEVEL_GAP));
      childX += childW + SIBLING_GAP;
    });
  }
  return items;
};

const RecursionTree = () => {
  const { recursionTree } = useVisualizerStore();

  const { nodes, lines, width, height } = useMemo(() => {
    if (!recursionTree) return { nodes: [], lines: [], width: 0, height: 0 };

    const flat = layoutTree(recursionTree);
    const nodeMap = {};
    flat.forEach((n) => (nodeMap[n.id] = n));

    const lines = [];
    const addLines = (node) => {
      if (!node || !node.children) return;
      node.children.forEach((child) => {
        const parent = nodeMap[node.id];
        const childNode = nodeMap[child.id];
        if (parent && childNode) {
          lines.push({
            x1: parent.x + NODE_WIDTH / 2,
            y1: parent.y + NODE_HEIGHT,
            x2: childNode.x + NODE_WIDTH / 2,
            y2: childNode.y,
          });
        }
        addLines(child);
      });
    };
    addLines(recursionTree);

    const maxX = Math.max(...flat.map((n) => n.x + NODE_WIDTH), 300);
    const maxY = Math.max(...flat.map((n) => n.y + NODE_HEIGHT), 200);

    return { nodes: flat, lines, width: maxX + 20, height: maxY + 20 };
  }, [recursionTree]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'computing':
        return 'var(--accent-orange)';
      case 'resolved':
        return 'var(--accent-green)';
      case 'base-case':
        return 'var(--accent-blue)';
      default:
        return 'var(--accent-purple)';
    }
  };

  return (
    <AnimatedCard
      title="Recursion Tree"
      icon="🌳"
      glowColor="var(--accent-orange)"
      delay={0.3}
    >
      {!recursionTree ? (
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            color: 'var(--text-secondary)',
            fontSize: '13px',
          }}
        >
          <div style={{ fontSize: '30px', marginBottom: '8px' }}>🌱</div>
          Run a recursive algorithm to see the tree grow
        </div>
      ) : (
        <div style={{ overflow: 'auto', maxHeight: '260px' }}>
          <svg width={width} height={height}>
            {lines.map((line, i) => (
              <motion.line
                key={i}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="var(--accent-purple)"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            ))}

            {nodes.map((node, i) => {
              const color = getStatusColor(node.status);
              return (
                <motion.g
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05, type: 'spring' }}
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width={NODE_WIDTH}
                    height={NODE_HEIGHT}
                    rx="8"
                    fill={`${color}20`}
                    stroke={color}
                    strokeWidth="1.5"
                  />
                  <text
                    x={node.x + NODE_WIDTH / 2}
                    y={node.y + 16}
                    textAnchor="middle"
                    fill={color}
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="var(--font-mono)"
                  >
                    {node.name}({node.args})
                  </text>
                  {node.result !== undefined && (
                    <text
                      x={node.x + NODE_WIDTH / 2}
                      y={node.y + 32}
                      textAnchor="middle"
                      fill="var(--accent-green)"
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="var(--font-mono)"
                    >
                      → {JSON.stringify(node.result)}
                    </text>
                  )}
                </motion.g>
              );
            })}
          </svg>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              padding: '8px 0',
              justifyContent: 'center',
            }}
          >
            {[
              { label: 'Computing', color: 'var(--accent-orange)' },
              { label: 'Resolved', color: 'var(--accent-green)' },
              { label: 'Base Case', color: 'var(--accent-blue)' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '10px',
                  color: 'var(--text-secondary)',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: item.color,
                  }}
                />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </AnimatedCard>
  );
};

export default RecursionTree;