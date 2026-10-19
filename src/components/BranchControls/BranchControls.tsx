import type React from 'react';
import { IconLock, IconPause, IconPlay, IconX } from '../../utils/icons';
import styles from './BranchControls.module.css';
import type { BranchControlsProps } from './BranchControls.types';

const STATUS_CONFIG = {
  running: { label: 'Running', dotClass: 'dotRunning', badge: 'ax-badge ax-badge-success ax-badge-dot', pulsing: true },
  paused: { label: 'Paused', dotClass: 'dotPaused', badge: 'ax-badge ax-badge-warning', pulsing: false },
  quarantined: { label: 'Quarantined', dotClass: 'dotQuarantined', badge: 'ax-badge ax-badge-danger', pulsing: false },
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
      className={`${styles.base} ax-card ${styles[`base_${status}`] ?? ''} ${className || ''}`}
      data-ax=""
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
        <span className={`${styles.statusBadge} ${config.badge}`}>
          {config.label}
        </span>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        {status === 'running' ? (
          <button className={`${styles.btnSecondary} ax-btn ax-btn-secondary`} onClick={() => onPause?.()}>
            <IconPause /> Pause
          </button>
        ) : (
          <button className={`${styles.btnPrimary} ax-btn ax-btn-primary`} onClick={() => onResume?.()}>
            <IconPlay /> Resume
          </button>
        )}

        {status !== 'quarantined' && (
          <button
            className={`${styles.btnSecondary} ax-btn ax-btn-secondary`}
            onClick={() => onQuarantine?.()}
            title="Isolate branch: halt tool calls and spawns, allow inspection"
          >
            <IconLock />
            Quarantine
          </button>
        )}

        {onThrottle && (
          <button
            className={`${styles.btnSecondary} ax-btn ax-btn-secondary`}
            onClick={onThrottle}
            title="Reduce token burn rate and concurrency"
          >
            Throttle
          </button>
        )}

        <button className={`${styles.btnDanger} ax-btn ax-btn-danger`} onClick={() => onCancel?.()}>
          <IconX />
          Cancel Branch
        </button>
      </div>
    </div>
  );
};
