import React from 'react';
import styles from './SwarmInbox.module.css';
import type { SwarmInboxItem, SwarmInboxProps } from './SwarmInbox.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SEVERITY_CLASS: Record<string, string> = {
  critical: styles.itemCritical,
  warning: styles.itemWarning,
  info: styles.itemInfo,
};

// ---------------------------------------------------------------------------
// InboxRow
// ---------------------------------------------------------------------------

interface InboxRowProps {
  item: SwarmInboxItem;
  onOpen?: (item: SwarmInboxItem) => void;
  onDismiss?: (id: string) => void;
}

function InboxRow({ item, onOpen, onDismiss }: InboxRowProps) {
  return (
    <div
      className={`${styles.item} ${SEVERITY_CLASS[item.severity] ?? ''}`}
      role={onOpen ? 'button' : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen ? () => onOpen(item) : undefined}
      onKeyDown={onOpen ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(item); } } : undefined}
      aria-label={`${item.title} from ${item.agentId}, ${item.severity}`}
    >
      <span className={styles.typeIcon} aria-hidden="true">
        {item.icon ?? '•'}
      </span>

      <div className={styles.itemContent}>
        <div className={styles.itemHeader}>
          <span className={styles.itemTitle}>{item.title}</span>
          <span className={styles.itemTime}>{item.timestamp}</span>
        </div>
        <div className={styles.itemMeta}>
          <span className={styles.agentId}>{item.agentId}</span>
          {item.branchPath && (
            <span className={styles.branchPath}>· {item.branchPath}</span>
          )}
        </div>
        {item.detail && <p className={styles.itemDetail}>{item.detail}</p>}
      </div>

      {onDismiss && (
        <button
          className={styles.dismissBtn}
          onClick={(e) => { e.stopPropagation(); onDismiss(item.id); }}
          aria-label={`Dismiss: ${item.title}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SwarmInbox
// ---------------------------------------------------------------------------

/**
 * SwarmInbox is the attention-triage layer for the entire swarm.
 * Aggregates all events that deserve human attention into a single scannable list,
 * eliminating the need to ping-pong between OrchestratorView, AgentRoster, and traces.
 */
export const SwarmInbox: React.FC<SwarmInboxProps> = ({
  className,
  items = [],
  onOpenItem,
  onDismissItem,
}) => {
  const criticalCount = items.filter((i) => i.severity === 'critical').length;

  return (
    <div
      className={`${styles.base} ${className || ''}`}
      role="region"
      aria-label={`Swarm Inbox, ${items.length} items${criticalCount > 0 ? `, ${criticalCount} critical` : ''}`}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.title}>Swarm Inbox</span>
          {criticalCount > 0 && (
            <span className={styles.criticalBadge}>{criticalCount} critical</span>
          )}
        </div>
        <span className={styles.totalBadge}>{items.length}</span>
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <p>No items requiring attention.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <InboxRow
              key={item.id}
              item={item}
              onOpen={onOpenItem}
              onDismiss={onDismissItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};
