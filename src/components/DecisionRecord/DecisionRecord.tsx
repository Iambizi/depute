import React from 'react';
import styles from './DecisionRecord.module.css';

export interface DecisionRecordProps {
  /** The final human decision */
  decision: 'approved' | 'rejected' | 'modified';
  /** The human who made the decision */
  approver: {
    name: string;
    role?: string;
    timestamp: Date | string;
  };
  /** The agent context at the time of the decision */
  agentContext: {
    intent: string;
    policyInvoked?: string;
  };
  /** Optional human reasoning for the decision */
  humanReasoning?: string;
  /** Optional CSS class name */
  className?: string;
}

export function DecisionRecord({
  decision,
  approver,
  agentContext,
  humanReasoning,
  className = '',
}: DecisionRecordProps) {
  const formattedDate =
    typeof approver.timestamp === 'string'
      ? new Date(approver.timestamp).toLocaleString()
      : approver.timestamp.toLocaleString();

  return (
    <div className={`${styles.container} ${className}`} data-testid="ax-decision-record">
      <div className={styles.header}>
        <div className={styles.title}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          Decision Record
        </div>
        <div className={`${styles.badge} ${styles[decision]}`}>
          {decision}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <span className={styles.label}>Approver</span>
            <span className={styles.value}>
              {approver.name} {approver.role && <span style={{ color: 'var(--ax-text-tertiary)' }}>({approver.role})</span>}
            </span>
          </div>
          <div className={styles.section}>
            <span className={styles.label}>Timestamp</span>
            <span className={styles.valueMono}>{formattedDate}</span>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.label}>Agent Intent</span>
          <span className={styles.value}>{agentContext.intent}</span>
        </div>

        {agentContext.policyInvoked && (
          <div className={styles.section}>
            <span className={styles.label}>Policy Invoked</span>
            <span className={styles.valueMono}>{agentContext.policyInvoked}</span>
          </div>
        )}

        {humanReasoning && (
          <div className={styles.section}>
            <span className={styles.label}>Stated Reasoning</span>
            <div className={styles.reasoning}>{humanReasoning}</div>
          </div>
        )}
      </div>
    </div>
  );
}
