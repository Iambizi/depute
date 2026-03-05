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
        <span className={styles.icon} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </span>
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
            <span className={`${styles.chevron} ${traceExpanded ? styles.chevronOpen : ''}`}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </span>
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
            {recommendation === 'retry' && (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                Retry with same agent
              </>
            )}
            {recommendation === 'reassign' && (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                Reassign to different agent
              </>
            )}
            {recommendation === 'cancel' && (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                Cancel this branch
              </>
            )}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.btnRetry} onClick={onRetry}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
          Retry
        </button>
        <button className={styles.btnReassign} onClick={onReassign}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
          Reassign
        </button>
        <button className={styles.btnCancel} onClick={onCancelBranch}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
          Cancel Branch
        </button>
      </div>
    </div>
  );
};
