import React, { useState, useEffect } from 'react';
import styles from './DelegationGate.module.css';
import type { DelegationGateProps } from './DelegationGate.types';

/**
 * DelegationGate intercepts an Orchestrator's request to spawn a new sub-agent.
 * This is a decision gate (Y/N) focused on authorizing new autonomous capacity.
 */
export const DelegationGate: React.FC<DelegationGateProps> = ({
  className,
  requestingAgent,
  proposedSubagent,
  status = 'pending',
  timeoutSeconds,
  onApprove,
  onDeny,
  onTimeout,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(timeoutSeconds ?? 0);

  useEffect(() => {
    if (status !== 'pending' || timeRemaining <= 0) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeout?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status, timeRemaining, onTimeout]);

  return (
    <div
      className={`${styles.base} ${className || ''}`}
      role="alertdialog"
      aria-modal="true"
      aria-label={`${requestingAgent} is requesting to spawn a new agent`}
    >
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">⊕</span>
        <div className={styles.headerText}>
          <span className={styles.title}>Agent Spawn Request</span>
          <span className={styles.subtitle}>
            <strong>{requestingAgent}</strong> wants to delegate a task
          </span>
        </div>
        {timeoutSeconds != null && status === 'pending' && timeRemaining > 0 && (
          <span className={styles.timer}>
            {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
          </span>
        )}
        <span className={styles.badge}>Delegation Gate</span>
      </div>

      {/* Proposed agent details */}
      <div className={styles.body}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Role</span>
          <span className={styles.detailValue}>{proposedSubagent.role}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Mandate</span>
          <span className={styles.detailValue}>{proposedSubagent.mandate}</span>
        </div>
        {proposedSubagent.allowedTools && proposedSubagent.allowedTools.length > 0 && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Allowed Tools</span>
            <div className={styles.tagList}>
              {proposedSubagent.allowedTools.map((tool) => (
                <span key={tool} className={styles.toolTag}>{tool}</span>
              ))}
            </div>
          </div>
        )}
        {proposedSubagent.maxDepth != null && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Max Depth</span>
            <span className={styles.detailValue}>{proposedSubagent.maxDepth} levels</span>
          </div>
        )}
        <div className={styles.costRow}>
          <div className={styles.costItem}>
            <span className={styles.costLabel}>Est. Tokens</span>
            <span className={styles.costValue}>{proposedSubagent.estimatedTokens.toLocaleString()}</span>
          </div>
          <div className={styles.costItem}>
            <span className={styles.costLabel}>Est. Cost</span>
            <span className={styles.costValue}>{proposedSubagent.estimatedCost}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      {status === 'pending' ? (
        <div className={styles.actions}>
          <button className={styles.btnApprove} onClick={() => onApprove?.()}>
            Approve Spawn
          </button>
          <button className={styles.btnDeny} onClick={() => onDeny?.()}>
            Deny
          </button>
        </div>
      ) : (
        <div className={`${styles.resolvedBanner} ${styles[`resolved${status.charAt(0).toUpperCase() + status.slice(1)}`]}`}>
          {status === 'approved' && 'Spawn Approved'}
          {status === 'denied' && 'Spawn Denied'}
          {status === 'expired' && 'Request Expired'}
        </div>
      )}
    </div>
  );
};
