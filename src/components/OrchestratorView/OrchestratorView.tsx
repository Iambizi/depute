import React, { useState } from 'react';
import styles from './OrchestratorView.module.css';
import type { OrchestratorNode, OrchestratorViewProps } from './OrchestratorView.types';

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

const STATUS_DOT: Record<string, string> = {
  idle: styles.dotIdle,
  working: styles.dotWorking,
  blocked: styles.dotBlocked,
  failed: styles.dotFailed,
  completed: styles.dotCompleted,
};

const STATUS_LABELS: Record<string, string> = {
  idle: 'Idle',
  working: 'Working',
  blocked: 'Blocked',
  failed: 'Failed',
  completed: 'Done',
};

// ---------------------------------------------------------------------------
// TreeNode — recursive sub-component
// ---------------------------------------------------------------------------

interface TreeNodeProps {
  node: OrchestratorNode;
  depth: number;
  selectedNodeId?: string;
  onNodeClick?: (node: OrchestratorNode) => void;
}

function TreeNode({ node, depth, selectedNodeId, onNodeClick }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = node.id === selectedNodeId;
  const isClickable = !!onNodeClick;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNodeClick) onNodeClick(node);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onNodeClick) onNodeClick(node);
    }
  };

  return (
    <li className={styles.treeItem}>
      {/* Node card */}
      <div
        className={`${styles.node} ${styles[`depth${Math.min(depth, 3)}`] ?? ''} ${
          isSelected ? styles.nodeSelected : ''
        } ${isClickable ? styles.nodeClickable : ''}`}
        onClick={isClickable ? handleClick : undefined}
        onKeyDown={isClickable ? handleKeyDown : undefined}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-pressed={isClickable ? isSelected : undefined}
        aria-label={`${node.label}, ${STATUS_LABELS[node.status] ?? node.status}`}
      >
        {/* Expand/collapse toggle */}
        {hasChildren && (
          <button
            className={styles.toggle}
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            aria-label={expanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
            aria-expanded={expanded}
          >
            <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}>
              ▶
            </span>
          </button>
        )}

        {!hasChildren && <span className={styles.togglePlaceholder} />}

        {/* Status dot */}
        <span
          className={`${styles.dot} ${STATUS_DOT[node.status] ?? ''}`}
          aria-hidden="true"
        />

        {/* Label & meta */}
        <div className={styles.nodeMeta}>
          <span className={styles.nodeLabel}>{node.label}</span>
          {node.role && <span className={styles.nodeRole}>{node.role}</span>}
          {node.currentTask && (
            <span className={styles.nodeTask} title={node.currentTask}>
              {node.currentTask}
            </span>
          )}
        </div>

        {/* Status badge */}
        <span className={`${styles.statusBadge} ${styles[`badge_${node.status}`] ?? ''}`}>
          {STATUS_LABELS[node.status] ?? node.status}
        </span>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <ul className={styles.treeChildren} role="group" aria-label={`Sub-agents of ${node.label}`}>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedNodeId={selectedNodeId}
              onNodeClick={onNodeClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// ---------------------------------------------------------------------------
// OrchestratorView
// ---------------------------------------------------------------------------

/**
 * OrchestratorView visualizes the command-and-control hierarchy of a multi-agent swarm.
 * Renders a collapsible recursive tree of OrchestratorNodes.
 */
export const OrchestratorView: React.FC<OrchestratorViewProps> = ({
  className,
  nodes = [],
  onNodeClick,
  selectedNodeId,
}) => {
  const totalNodes = countNodes(nodes);

  return (
    <div
      className={`${styles.base} ${className || ''}`}
      role="region"
      aria-label="Orchestrator agent tree"
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.title}>Orchestrator View</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.nodeBadge}>{totalNodes} agents</span>
        </div>
      </div>

      {/* Tree */}
      <div className={styles.canvas}>
        {nodes.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>⬡</span>
            <p>No agents spawned yet.</p>
          </div>
        ) : (
          <ul
            className={styles.treeRoot}
            role="tree"
            aria-label="Agent hierarchy"
          >
            {nodes.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                depth={0}
                selectedNodeId={selectedNodeId}
                onNodeClick={onNodeClick}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function countNodes(nodes: OrchestratorNode[]): number {
  return nodes.reduce((acc, n) => acc + 1 + countNodes(n.children ?? []), 0);
}
