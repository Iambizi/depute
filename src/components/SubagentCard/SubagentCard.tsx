import React from 'react';
import styles from './SubagentCard.module.css';
import type { SubagentCardProps } from './SubagentCard.types';

/**
 * SubagentCard is a condensed node component showing an individual worker's status.
 */
export const SubagentCard: React.FC<SubagentCardProps> = ({
  className,
  agentName,
  status,
  currentTask,
  onExpand,
}) => {
  return (
    <div 
      className={`${styles.base} ${className || ''} ${onExpand ? styles.clickable : ''}`}
      onClick={onExpand}
      role={onExpand ? 'button' : undefined}
      tabIndex={onExpand ? 0 : undefined}
    >
      <div className={styles.header}>
        <div className={styles.agentInfo}>
          <div className={`${styles.statusIndicator} ${styles[status]}`} />
          <span className={styles.agentName}>{agentName}</span>
        </div>
        <span className={`${styles.statusBadge} ${styles[status]}`}>
          {status}
        </span>
      </div>
      
      {currentTask && (
        <div className={styles.taskLabel}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span className={styles.taskText}>{currentTask}</span>
        </div>
      )}
    </div>
  );
};
