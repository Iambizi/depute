import React from 'react';
import styles from './OrchestratorView.module.css';

export interface OrchestratorViewProps {
  /** The root layout class name */
  className?: string;
  /** Hierarchical tree data for the swarm */
  nodes?: any[];
}

/**
 * OrchestratorView visualizes the command-and-control hierarchy of a multi-agent swarm.
 */
export const OrchestratorView: React.FC<OrchestratorViewProps> = ({
  className,
  nodes = [],
}) => {
  return (
    <div className={`${styles.base} ${className || ''}`}>
      <div className={styles.header}>
        <h3>OrchestratorView</h3>
        <span className={styles.badge}>{nodes.length} Nodes</span>
      </div>
      <div className={styles.canvas}>
        {nodes.length === 0 ? (
          <p className={styles.empty}>No agents spawned</p>
        ) : (
          <p className={styles.placeholder}>Tree visualization coming soon.</p>
        )}
      </div>
    </div>
  );
};
