/**
 * TransactionReceipt — Provenance + audit log.
 *
 * A receipt-style display for completed agent actions with
 * verification data. Provides proof of what happened, when,
 * and by which agent — suitable for compliance logs.
 *
 * v2 — Strict Compliance & Forensics
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 5)
 */

import { useState, useMemo, useCallback } from 'react';
import { VisuallyHidden } from '../../utils/a11y';
import type {
  TransactionReceiptProps,
  TransactionStatus,
} from './TransactionReceipt.types';
import styles from './TransactionReceipt.module.css';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const STATUS_LABELS: Record<TransactionStatus, string> = {
  success: 'Success',
  failed: 'Failed',
  pending: 'Pending',
  reverted: 'Reverted',
};

const STATUS_SYMBOLS: Record<TransactionStatus, string> = {
  success: '✓',
  failed: '✕',
  pending: '◌',
  reverted: '↩',
};

const STATUS_CLASSES: Record<TransactionStatus, string> = {
  success: styles.statusSuccess,
  failed: styles.statusFailed,
  pending: styles.statusPending,
  reverted: styles.statusReverted,
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function TransactionReceipt({
  transactionId,
  title,
  status,
  timestamp,
  lineItems,
  agentId,
  hash,
  copyableHash = true,
  onCopyHash,
  onViewAuditTrail,
  className,
}: TransactionReceiptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (hash) {
      try {
        await navigator.clipboard.writeText(hash);
        setCopied(true);
        onCopyHash?.();
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback: do nothing if clipboard API unavailable
      }
    }
  }, [hash, onCopyHash]);

  const ariaLabel = useMemo(
    () =>
      `${title}: ${STATUS_LABELS[status]}. Transaction ${transactionId}.`,
    [title, status, transactionId],
  );

  return (
    <div
      className={`${styles.receipt} ${STATUS_CLASSES[status]} ${className ?? ''}`}
      role="region"
      aria-label={ariaLabel}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={`${styles.statusIcon} ${STATUS_CLASSES[status]}`} aria-hidden="true">
            {STATUS_SYMBOLS[status]}
          </span>
          <div>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.txId}>#{transactionId}</span>
          </div>
        </div>
        <span className={`${styles.statusBadge} ${STATUS_CLASSES[status]}`}>
          {STATUS_LABELS[status]}
        </span>
      </div>

      {/* Line items */}
      <div className={styles.lineItems} role="list" aria-label="Transaction details">
        {/* Timestamp */}
        <div className={styles.lineItem} role="listitem">
          <span className={styles.lineLabel}>Timestamp</span>
          <span className={styles.lineValue}>{timestamp}</span>
        </div>

        {/* Agent ID */}
        {agentId && (
          <div className={styles.lineItem} role="listitem">
            <span className={styles.lineLabel}>Agent</span>
            <span className={`${styles.lineValue} ${styles.mono}`}>{agentId}</span>
          </div>
        )}

        {/* Custom line items */}
        {lineItems.map((item) => (
          <div
            key={item.label}
            className={`${styles.lineItem} ${item.highlight ? styles.lineItemHighlight : ''}`}
            role="listitem"
          >
            <span className={styles.lineLabel}>{item.label}</span>
            <span className={styles.lineValue}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Footer: hash + actions */}
      {(hash || onViewAuditTrail) && (
        <div className={styles.footer}>
          {hash && (
            <div className={styles.hashRow}>
              <span className={styles.hashLabel}>Verification</span>
              <code className={styles.hashValue}>
                {hash.length > 16 ? `${hash.slice(0, 8)}…${hash.slice(-8)}` : hash}
              </code>
              {copyableHash && (
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={handleCopy}
                  aria-label={copied ? 'Hash copied' : 'Copy hash'}
                >
                  {copied ? '✓' : '⧉'}
                </button>
              )}
            </div>
          )}
          {onViewAuditTrail && (
            <button
              type="button"
              className={styles.auditBtn}
              onClick={onViewAuditTrail}
              aria-label="View full audit trail"
            >
              View Audit Trail →
            </button>
          )}
        </div>
      )}

      <VisuallyHidden>
        {`Transaction receipt: ${title}. Status: ${STATUS_LABELS[status]}. ID: ${transactionId}. Completed at ${timestamp}.`}
      </VisuallyHidden>
    </div>
  );
}
