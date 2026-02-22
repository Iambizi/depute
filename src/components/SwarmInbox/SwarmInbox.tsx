import React from 'react';
import styles from './SwarmInbox.module.css';
import type { SwarmInboxItem, SwarmInboxProps } from './SwarmInbox.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TYPE_ICON: Record<string, string> = {
  approval: '✋',
  escalation: '⚠',
  policy_violation: '⛔',
  stalled: '⏳',
  budget_overrun: '💸',
  conflict: '⚡',
};

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
        {TYPE_ICON[item.type] ?? '•'}
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
          ✕
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
          <span className={styles.emptyIcon}>✓</span>
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
