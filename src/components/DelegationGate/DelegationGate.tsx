import React from 'react';
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
  onApprove,
  onDeny,
}) => {
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
      <div className={styles.actions}>
        <button className={styles.btnApprove} onClick={onApprove}>
          Approve Spawn
        </button>
        <button className={styles.btnDeny} onClick={onDeny}>
          Deny
        </button>
      </div>
    </div>
  );
};
