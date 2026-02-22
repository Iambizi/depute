import React from 'react';
import styles from './HandoffProtocol.module.css';
import type { HandoffProtocolProps } from './HandoffProtocol.types';

/**
 * HandoffProtocol is a comprehension UI for visualizing context transfers between agents.
 */
export const HandoffProtocol: React.FC<HandoffProtocolProps> = ({
  className,
  sourceAgent,
  destinationAgent,
  goal,
  payloadSummary,
  onIntercept,
}) => {
  return (
    <div className={`${styles.base} ${className || ''}`}>
      <div className={styles.header}>
        <div className={styles.transferPath}>
          <span className={styles.entity}>{sourceAgent}</span>
          <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span className={styles.entity}>{destinationAgent}</span>
        </div>
        <span className={styles.label}>Context Handoff</span>
      </div>
      
      <div className={styles.body}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Assigned Goal</span>
          <span className={styles.fieldValue}>{goal}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Payload Summary</span>
          <span className={styles.fieldValue}>{payloadSummary}</span>
        </div>
      </div>
      
      {onIntercept && (
        <div className={styles.footer}>
          <button className={styles.interceptBtn} onClick={onIntercept}>
            Intercept & Review Payload
          </button>
        </div>
      )}
    </div>
  );
};
