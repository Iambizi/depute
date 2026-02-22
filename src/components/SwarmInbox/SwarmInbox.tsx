import React from 'react';
import styles from './SwarmInbox.module.css';

export interface SwarmInboxItem {
  id: string;
  type: 'approval' | 'escalation' | 'policy_violation' | 'stalled';
  title: string;
  agentId: string;
  branchPath: string;
  timestamp: string;
}

export interface SwarmInboxProps {
  /** The root layout class name */
  className?: string;
  items?: SwarmInboxItem[];
  onOpenItem?: (id: string) => void;
  onDismissItem?: (id: string) => void;
}

/**
 * SwarmInbox is the global aggregation layer for events that require human attention.
 */
export const SwarmInbox: React.FC<SwarmInboxProps> = ({
  className,
  items = [],
  onOpenItem,
  onDismissItem,
}) => {
  return (
    <div className={`${styles.base} ${className || ''}`}>
      <div className={styles.header}>
        <h3>Attention Triage</h3>
        <span className={styles.badge}>{items.length} Requires Review</span>
      </div>
      
      <div className={styles.list}>
        {items.length === 0 ? (
          <div className={styles.empty}>Swarm operating autonomously. No interventions needed.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className={`${styles.item} ${styles[item.type]}`}>
              <div className={styles.itemIcon}>
                {item.type === 'approval' && '✋'}
                {item.type === 'escalation' && '⚠️'}
                {item.type === 'policy_violation' && '🛑'}
                {item.type === 'stalled' && '⏱️'}
              </div>
              
              <div className={styles.itemContent}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.timestamp}>{item.timestamp}</span>
                </div>
                <div className={styles.itemMeta}>
                  <span className={styles.agentTag}>{item.agentId}</span>
                  <span className={styles.branchPath}>{item.branchPath}</span>
                </div>
              </div>
              
              <div className={styles.itemActions}>
                <button className={styles.btnReview} onClick={() => onOpenItem?.(item.id)}>Review</button>
                <button className={styles.btnDismiss} onClick={() => onDismissItem?.(item.id)}>Dismiss</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
