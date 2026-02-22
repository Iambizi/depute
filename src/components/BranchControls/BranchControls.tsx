import React from 'react';
import styles from './BranchControls.module.css';
import type { BranchControlsProps } from './BranchControls.types';

/**
 * BranchControls provides scoped steering mechanisms isolated to a specific branch of the agent tree.
 */
export const BranchControls: React.FC<BranchControlsProps> = ({
  className,
  branchName,
  status,
  onPause,
  onResume,
  onQuarantine,
  onCancel,
  onThrottle,
}) => {
  return (
    <div className={`${styles.base} ${className || ''}`}>
      <div className={styles.header}>
        <span className={styles.label}>Branch Controls</span>
        <span className={styles.branchName}>{branchName}</span>
      </div>
      
      <div className={styles.statusIndicator}>
        <div className={`${styles.dot} ${styles[status]}`} />
        <span className={styles.statusText}>{status}</span>
      </div>
      
      <div className={styles.actions}>
        {status === 'running' ? (
          <button className={styles.btnSecondary} onClick={onPause}>Pause</button>
        ) : (
          <button className={styles.btnPrimary} onClick={onResume}>Resume</button>
        )}
        
        {status !== 'quarantined' && (
          <button className={styles.btnWarning} onClick={onQuarantine} title="Isolate branch and halt execution">
            Quarantine
          </button>
        )}
        
        {onThrottle && (
          <button className={styles.btnSecondary} onClick={onThrottle} title="Reduce concurrency/spend">
            Throttle
          </button>
        )}
        
        <button className={styles.btnDanger} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};
