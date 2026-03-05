/**
 * RunControls — Execution state controls (start/pause/stop/retry).
 *
 * Button visibility changes based on RunState. Includes an actions
 * slot for extensibility (e.g., EscapeHatchBar in v1).
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 4)
 */

import { useMemo } from 'react';
import type { RunState } from '../../types/common';
import { VisuallyHidden } from '../../utils/a11y';
import type { RunControlsProps } from './RunControls.types';
import styles from './RunControls.module.css';

const STATE_LABELS: Record<RunState, string> = {
  idle: 'Idle',
  running: 'Running',
  paused: 'Paused',
  completed: 'Completed',
  failed: 'Failed',
};

const STATE_DOT_CLASSES: Record<RunState, string> = {
  idle: styles.statusDotIdle,
  running: styles.statusDotRunning,
  paused: styles.statusDotPaused,
  completed: styles.statusDotCompleted,
  failed: styles.statusDotFailed,
};

export function RunControls({
  state,
  onStart,
  onPause,
  onStop,
  onRetry,
  showLabel = true,
  actions,
  className,
}: RunControlsProps) {
  const canStart = state === 'idle' || state === 'paused';
  const canPause = state === 'running';
  const canStop = state === 'running' || state === 'paused';
  const canRetry = state === 'failed';

  const ariaLabel = useMemo(
    () => `Run controls: ${STATE_LABELS[state]}`,
    [state]
  );

  return (
    <div
      className={`${styles.runControls} ${className ?? ''}`}
      role="toolbar"
      aria-label={ariaLabel}
    >
      {/* Status indicator */}
      <span className={`${styles.statusDot} ${STATE_DOT_CLASSES[state]}`} aria-hidden="true" />
      {showLabel && (
        <span className={styles.statusLabel}>{STATE_LABELS[state]}</span>
      )}
      <VisuallyHidden>{`Current state: ${STATE_LABELS[state]}`}</VisuallyHidden>

      {/* Start / Resume */}
      {canStart && (
        <button
          className={`${styles.btn} ${styles.btnStart}`}
          onClick={onStart}
          aria-label={state === 'paused' ? 'Resume' : 'Start'}
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </button>
      )}

      {/* Pause */}
      {canPause && (
        <button
          className={`${styles.btn} ${styles.btnPause}`}
          onClick={onPause}
          aria-label="Pause"
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        </button>
      )}

      {/* Stop */}
      {canStop && (
        <button
          className={`${styles.btn} ${styles.btnStop}`}
          onClick={onStop}
          aria-label="Stop"
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
        </button>
      )}

      {/* Retry */}
      {canRetry && (
        <button
          className={`${styles.btn} ${styles.btnRetry}`}
          onClick={onRetry}
          aria-label="Retry"
          type="button"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
        </button>
      )}

      {/* Actions slot */}
      {actions && (
        <>
          <span className={styles.separator} aria-hidden="true" />
          {actions}
        </>
      )}
    </div>
  );
}
