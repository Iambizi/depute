import React, { useState } from 'react';
import styles from './EscalationRouter.module.css';
import type { EscalationRouterProps } from './EscalationRouter.types';

/**
 * EscalationRouter surfaces a leaf-agent failure to the human, with the failure trace
 * and options to retry, reassign to a different agent, or cancel the whole branch.
 */
export const EscalationRouter: React.FC<EscalationRouterProps> = ({
  className,
  failedAgent,
  branchId,
  errorSummary,
  errorTrace,
  recommendation,
  onRetry,
  onReassign,
  onCancelBranch,
}) => {
  const [traceExpanded, setTraceExpanded] = useState(false);

  return (
    <div
      className={`${styles.base} ${className || ''}`}
      role="alertdialog"
      aria-modal="true"
      aria-label={`Escalation: ${failedAgent} failed`}
    >
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">⚠</span>
        <div className={styles.headerText}>
          <span className={styles.title}>Agent Failure Escalated</span>
          <span className={styles.subtitle}>
            <strong>{failedAgent}</strong>{branchId ? ` · branch ${branchId}` : ''}
          </span>
        </div>
        <span className={styles.failedBadge}>Failed</span>
      </div>

      {/* Error summary */}
      <div className={styles.errorBox}>
        <p className={styles.errorSummary}>{errorSummary}</p>
      </div>

      {/* Error trace (collapsible) */}
      {errorTrace && (
        <div className={styles.traceSection}>
          <button
            className={styles.traceToggle}
            onClick={() => setTraceExpanded(!traceExpanded)}
            aria-expanded={traceExpanded}
          >
            <span className={`${styles.chevron} ${traceExpanded ? styles.chevronOpen : ''}`}>▶</span>
            {traceExpanded ? 'Hide' : 'Show'} Error Trace
          </button>
          {traceExpanded && (
            <pre className={styles.trace}>{errorTrace}</pre>
          )}
        </div>
      )}

      {/* System recommendation */}
      {recommendation && (
        <div className={styles.recommendation}>
          <span className={styles.recLabel}>System Recommendation</span>
          <span className={styles.recValue}>
            {recommendation === 'retry' && '↺ Retry with same agent'}
            {recommendation === 'reassign' && '⇄ Reassign to different agent'}
            {recommendation === 'cancel' && '⊘ Cancel this branch'}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.btnRetry} onClick={onRetry}>
          ↺ Retry
        </button>
        <button className={styles.btnReassign} onClick={onReassign}>
          ⇄ Reassign
        </button>
        <button className={styles.btnCancel} onClick={onCancelBranch}>
          ⊘ Cancel Branch
        </button>
      </div>
    </div>
  );
};
