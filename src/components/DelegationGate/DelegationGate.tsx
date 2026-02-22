import React from 'react';
import styles from './DelegationGate.module.css';
import type { DelegationGateProps } from './DelegationGate.types';

/**
 * DelegationGate is a decision intercept where an Orchestrator commits to spinning up a new autonomous worker.
 */
export const DelegationGate: React.FC<DelegationGateProps> = ({
  className,
  sourceAgent,
  proposedSubagent,
  onApprove,
  onDeny,
}) => {
  return (
    <div className={`${styles.base} ${className || ''}`}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <path d="M3 14h7v7H3z" />
          </svg>
        </div>
        <div className={styles.headerText}>
          <h3>Spawn Request</h3>
          <p>{sourceAgent} is requesting to spin up a new subagent.</p>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Proposed Role:</span>
          <span className={styles.value}>{proposedSubagent.role}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Mandate:</span>
          <span className={styles.value}>{proposedSubagent.mandate}</span>
        </div>
        
        <div className={styles.budgetBox}>
          <div className={styles.budgetRow}>
            <span>Est. Compute:</span>
            <span className={styles.budgetLimit}>{proposedSubagent.estimatedTokens.toLocaleString()} tokens</span>
          </div>
          <div className={styles.budgetRow}>
            <span>Est. Cost:</span>
            <span className={styles.budgetLimit}>{proposedSubagent.estimatedCost}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.footer}>
        <button className={styles.btnSecondary} onClick={onDeny}>Deny Request</button>
        <button className={styles.btnPrimary} onClick={onApprove}>Authorize Spawn</button>
      </div>
    </div>
  );
};
