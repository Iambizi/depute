import React from 'react';
import styles from './SwarmMonitor.module.css';
import type { SwarmMonitorProps } from './SwarmMonitor.types';

/**
 * SwarmMonitor is the macro-dashboard for the entire swarm.
 * Tracks cost, token burn, active instances, error rates, and time-to-completion.
 */
export const SwarmMonitor: React.FC<SwarmMonitorProps> = ({
  className,
  metrics,
  onGlobalPause,
  onGlobalKill,
}) => {
  const errorSeverity =
    metrics.errorRate > 25 ? 'high' : metrics.errorRate > 10 ? 'medium' : 'low';

  return (
    <div
      className={`${styles.base} ${className || ''}`}
      role="region"
      aria-label="Swarm Monitor"
    >
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>Swarm Monitor</span>
        <div className={styles.controls}>
          {onGlobalPause && (
            <button className={styles.btnPause} onClick={onGlobalPause} aria-label="Pause all agents">
              ⏸ Pause All
            </button>
          )}
          {onGlobalKill && (
            <button className={styles.btnKill} onClick={onGlobalKill} aria-label="Kill all agents">
              ⏹ Kill All
            </button>
          )}
        </div>
      </div>

      {/* Metrics grid */}
      <div className={styles.grid}>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{metrics.activeInstances}</span>
          <span className={styles.metricLabel}>Active</span>
          <span className={`${styles.dot} ${styles.dotWorking}`} />
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{metrics.idleInstances}</span>
          <span className={styles.metricLabel}>Idle</span>
          <span className={`${styles.dot} ${styles.dotIdle}`} />
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{metrics.totalCost}</span>
          <span className={styles.metricLabel}>Total Cost</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>
            {(metrics.tokensBurned / 1000).toFixed(1)}k
          </span>
          <span className={styles.metricLabel}>Tokens</span>
        </div>
        <div className={`${styles.metric} ${styles[`metricError_${errorSeverity}`] ?? ''}`}>
          <span className={styles.metricValue}>{metrics.errorRate}%</span>
          <span className={styles.metricLabel}>Error Rate</span>
        </div>
        {metrics.estimatedTimeRemaining && (
          <div className={styles.metric}>
            <span className={styles.metricValue}>{metrics.estimatedTimeRemaining}</span>
            <span className={styles.metricLabel}>ETA</span>
          </div>
        )}
      </div>

      {/* Task completion bar */}
      {metrics.taskCompletionRate != null && (
        <div className={styles.completionRow}>
          <span className={styles.completionLabel}>Completion</span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${metrics.taskCompletionRate}%` }}
              role="progressbar"
              aria-valuenow={metrics.taskCompletionRate}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span className={styles.completionValue}>{metrics.taskCompletionRate}%</span>
        </div>
      )}
    </div>
  );
};
