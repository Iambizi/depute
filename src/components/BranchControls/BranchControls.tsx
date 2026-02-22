import React from 'react';
import styles from './BranchControls.module.css';
import type { BranchControlsProps } from './BranchControls.types';

const STATUS_CONFIG = {
  running: { label: 'Running', dotClass: 'dotRunning', pulsing: true },
  paused: { label: 'Paused', dotClass: 'dotPaused', pulsing: false },
  quarantined: { label: 'Quarantined', dotClass: 'dotQuarantined', pulsing: false },
};

/**
 * BranchControls provides scoped steering mechanisms for a specific branch of the agent tree.
 * Complements the global RunControls from v0 — operates at branch/sub-tree level.
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
  const config = STATUS_CONFIG[status];

  return (
    <div
      className={`${styles.base} ${styles[`base_${status}`] ?? ''} ${className || ''}`}
      role="region"
      aria-label={`Branch controls for ${branchName}`}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.identity}>
          <span
            className={`${styles.dot} ${styles[config.dotClass] ?? ''} ${config.pulsing ? styles.dotPulsing : ''}`}
            aria-hidden="true"
          />
          <div className={styles.nameBlock}>
            <span className={styles.label}>Branch</span>
            <span className={styles.branchName}>{branchName}</span>
          </div>
        </div>
        <span className={`${styles.statusBadge} ${styles[`badge_${status}`] ?? ''}`}>
          {config.label}
        </span>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        {status === 'running' ? (
          <button className={styles.btnSecondary} onClick={onPause}>
            ⏸ Pause
          </button>
        ) : (
          <button className={styles.btnPrimary} onClick={onResume}>
            ▶ Resume
          </button>
        )}

        {status !== 'quarantined' && (
          <button
            className={styles.btnWarning}
            onClick={onQuarantine}
            title="Isolate branch: halt tool calls and spawns, allow inspection"
          >
            🔒 Quarantine
          </button>
        )}

        {onThrottle && (
          <button
            className={styles.btnSecondary}
            onClick={onThrottle}
            title="Reduce token burn rate and concurrency"
          >
            ↓ Throttle
          </button>
        )}

        <button className={styles.btnDanger} onClick={onCancel}>
          ⊘ Cancel Branch
        </button>
      </div>
    </div>
  );
};
