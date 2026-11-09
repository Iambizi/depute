import { useState } from 'react';
import type React from 'react';
import { IconChevron } from '../../utils/icons';
import { buildDecisionReceipt, buildSignedDecisionReceipt } from '../../utils/receipt';
import styles from './EscalationRouter.module.css';
import type { EscalationRouterProps, StopState } from './EscalationRouter.types';

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
  onStop,
  onResume,
  passkey,
  onReceipt,
}) => {
  const [traceExpanded, setTraceExpanded] = useState(false);
  const [stopPhase, setStopPhase] = useState<StopState>('armed');
  const [stopError, setStopError] = useState<string | null>(null);

  const stop = async () => {
    if (!onStop || stopPhase === 'stopping') return;
    setStopPhase('stopping');
    setStopError(null);
    try {
      const result = await onStop();
      if (result?.confirmed) {
        setStopPhase('stopped');
        onReceipt?.(buildDecisionReceipt({
          title: `Stop ${failedAgent}`,
          outcome: 'approved',
          kind: 'stop',
          presentedAtMs: Date.now(),
          decidedAtMs: Date.now(),
          fallbackId: failedAgent,
        }));
        return;
      }
      setStopPhase('unknown');
    } catch {
      setStopPhase('unknown');
      setStopError('The stop was not confirmed.');
    }
  };

  const resume = async () => {
    if (!passkey || stopPhase !== 'stopped') return;
    try {
      const receipt = await buildSignedDecisionReceipt({
        title: `Resume ${failedAgent}`,
        outcome: 'approved',
        highStakes: true,
        presentedAtMs: Date.now(),
        decidedAtMs: Date.now(),
        fallbackId: failedAgent,
      }, { passkey });
      onReceipt?.(receipt);
      onResume?.();
      setStopPhase('armed');
    } catch {
      setStopError('Resume was not signed.');
    }
  };

  return (
    <div
      className={`${styles.base} ax-card ax-gate ${className || ''}`}
      data-ax=""
      role="alertdialog"
      aria-modal="true"
      aria-label={`Escalation: ${failedAgent} failed`}
    >
      {/* Header */}
      <div className={styles.header}>
        <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
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
            <span className={`${styles.chevron} ${traceExpanded ? styles.chevronOpen : ''}`}><IconChevron /></span>
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
            {recommendation === 'retry' && 'Retry with same agent'}
            {recommendation === 'reassign' && 'Reassign to different agent'}
            {recommendation === 'cancel' && 'Cancel this branch'}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.btnRetry} onClick={onRetry}>
          Retry
        </button>
        <button className={styles.btnReassign} onClick={onReassign}>
          Reassign
        </button>
        <button className={styles.btnCancel} onClick={onCancelBranch}>
          Cancel Branch
        </button>
        {onStop && stopPhase !== 'stopped' && (
          <button type="button" className={styles.btnCancel} onClick={() => { void stop(); }} disabled={stopPhase === 'stopping'}>
            {stopPhase === 'stopping' ? 'Stopping' : 'Stop'}
          </button>
        )}
        {onStop && stopPhase === 'stopped' && (
          <button type="button" className={styles.btnRetry} onClick={() => { void resume(); }} disabled={!passkey}>
            Resume
          </button>
        )}
      </div>
      {onStop && (
        <p role="status">
          {stopPhase === 'armed' && 'Armed'}
          {stopPhase === 'stopping' && 'Stopping'}
          {stopPhase === 'stopped' && 'Stopped'}
          {stopPhase === 'failed' && 'Failed'}
          {stopPhase === 'unknown' && 'Unknown'}
        </p>
      )}
      {stopError && <p role="alert">{stopError}</p>}
    </div>
  );
};
