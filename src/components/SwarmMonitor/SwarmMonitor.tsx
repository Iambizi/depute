import React from 'react';
import styles from './SwarmMonitor.module.css';

export interface SwarmMonitorProps {
  /** The root layout class name */
  className?: string;
  metrics: {
    activeInstances: number;
    totalCost: string;
    tokensBurned: number;
    errorRate: number; // percentage 0-100
    estimatedTimeRemaining?: string;
  };
  onGlobalPause?: () => void;
  onGlobalKill?: () => void;
}

/**
 * SwarmMonitor provides macro-level metrics for parallel agentic swarms.
 */
export const SwarmMonitor: React.FC<SwarmMonitorProps> = ({
  className,
  metrics,
  onGlobalPause,
  onGlobalKill,
}) => {
  return (
    <div className={`${styles.base} ${className || ''}`}>
      <div className={styles.header}>
        <h3>Swarm Health Monitor</h3>
        <div className={styles.globalControls}>
          <button className={styles.pauseBtn} onClick={onGlobalPause}>Pause All</button>
          <button className={styles.killBtn} onClick={onGlobalKill}>Kill Swarm</button>
        </div>
      </div>
      
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Active Nodes</span>
          <span className={styles.metricValue}>{metrics.activeInstances}</span>
        </div>
        
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Cost Accrued</span>
          <span className={styles.metricValue}>{metrics.totalCost}</span>
          <span className={styles.metricSub}>{metrics.tokensBurned.toLocaleString()} tokens</span>
        </div>
        
        <div className={`${styles.metricCard} ${metrics.errorRate > 15 ? styles.warning : ''}`}>
          <span className={styles.metricLabel}>Error Rate</span>
          <span className={styles.metricValue}>{metrics.errorRate}%</span>
        </div>
        
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Est. Completion</span>
          <span className={styles.metricValue}>{metrics.estimatedTimeRemaining || 'Unknown'}</span>
        </div>
      </div>
    </div>
  );
};
