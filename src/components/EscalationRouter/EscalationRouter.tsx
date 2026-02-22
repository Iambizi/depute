import React from 'react';
import styles from './EscalationRouter.module.css';
import type { EscalationRouterProps } from './EscalationRouter.types';

/**
 * EscalationRouter is the UI pattern for handling when an agent fails and the error bubbles up.
 */
export const EscalationRouter: React.FC<EscalationRouterProps> = ({
  className,
  failedAgent,
  errorSummary,
  recommendation,
  onRetry,
  onReassign,
  onCancelBranch,
}) => {
  return (
    <div className={`${styles.base} ${className || ''}`}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.icon}>⚠️</span>
          <h3>Escalation Required</h3>
        </div>
        <span className={styles.agentTag}>{failedAgent}</span>
      </div>
      
      <div className={styles.body}>
        <div className={styles.errorBox}>
          <span className={styles.errorLabel}>Failure Trace</span>
          <p className={styles.errorText}>{errorSummary}</p>
        </div>
        
        {recommendation && (
          <div className={styles.recommendationBox}>
            <span className={styles.recLabel}>Orchestrator Recommendation</span>
            <p className={styles.recText}>{recommendation}</p>
          </div>
        )}
      </div>
      
      <div className={styles.actions}>
        <button className={styles.btnDanger} onClick={onCancelBranch}>Cancel Branch</button>
        <div className={styles.resolveActions}>
          <button className={styles.btnSecondary} onClick={onReassign}>Reassign...</button>
          <button className={styles.btnPrimary} onClick={onRetry}>Adjust & Retry</button>
        </div>
      </div>
    </div>
  );
};
