import React from 'react';
import styles from './SwarmInbox.module.css';
import type { SwarmInboxItem, SwarmInboxProps } from './SwarmInbox.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TYPE_ICON: Record<string, React.ReactNode> = {
  approval: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path></svg>,
  escalation: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  policy_violation: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>,
  stalled: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  budget_overrun: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
  conflict: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
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
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
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
