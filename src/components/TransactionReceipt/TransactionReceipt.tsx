/**
 * TransactionReceipt — Provenance + audit log.
 *
 * A receipt-style display for completed agent actions.
 * Hash and signature values are supplied by the caller's backend.
 * This component does not hash or sign the transaction.
 *
 * v2 — Strict Compliance & Forensics
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 5)
 */

import { useState, useMemo, useCallback, type ReactNode } from 'react';
import { verify } from '../../utils/receipt';
import { downloadApprovalReceipt } from '../../utils/receiptDownload';
import { IconArrowRight, IconCheck, IconCircle, IconCopy, IconUndo, IconX } from '../../utils/icons';
import { VisuallyHidden } from '../../utils/a11y';
import type {
  TransactionReceiptProps,
  TransactionStatus,
} from './TransactionReceipt.types';
import styles from './TransactionReceipt.module.css';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

function formatStamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

const STATUS_LABELS: Record<TransactionStatus, string> = {
  success: 'Success',
  failed: 'Failed',
  pending: 'Pending',
  reverted: 'Reverted',
};

const STATUS_SYMBOLS: Record<TransactionStatus, ReactNode> = {
  success: <IconCheck />,
  failed: <IconX />,
  pending: <IconCircle />,
  reverted: <IconUndo />,
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
  signature,
  onVerify,
  copyableHash = true,
  onCopyHash,
  onViewAuditTrail,
  approvalReceipt,
  className,
}: TransactionReceiptProps) {
  const [copied, setCopied] = useState(false);
  const [hashCheck, setHashCheck] = useState<string | null>(null);

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
      className={`${styles.receipt} ax-card ${status === 'success' ? 'ax-receipt-enter' : ''} ${STATUS_CLASSES[status]} ${className ?? ''}`}
      data-ax=""
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
        {status === 'success' && <span className="ax-stamp">Approved</span>}
      </div>

      {/* Line items */}
      <div className={styles.lineItems} role="list" aria-label="Transaction details">
        {/* Timestamp */}
        <div className={styles.lineItem} role="listitem">
          <span className={styles.lineLabel}>Timestamp</span>
          <span className={styles.lineValue} suppressHydrationWarning>
            {formatStamp(timestamp)}
          </span>
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
      {(hash || signature || onViewAuditTrail || onVerify || approvalReceipt) && (
        <div className={styles.footer}>
          {signature && (
            <div className={`${styles.hashRow} ax-hash-reveal`}>
              <span className={styles.hashLabel}>Signature</span>
              <code className={styles.hashValue}>
                {signature.length > 16 ? `${signature.slice(0, 8)}…${signature.slice(-8)}` : signature}
              </code>
            </div>
          )}
          {hash && (
            <div className={`${styles.hashRow} ax-hash-reveal`}>
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
                  {copied ? <IconCheck /> : <IconCopy />}
                </button>
              )}
            </div>
          )}
          {approvalReceipt && (
            <div className={styles.hashRow}>
              <span className={styles.hashLabel}>Receipt hash</span>
              <code className={`${styles.hashValue} ${styles.hashFull}`}>{approvalReceipt.receiptHash}</code>
            </div>
          )}
          {approvalReceipt && (
            <div className={styles.proofActions}>
              <button
                type="button"
                className={styles.auditBtn}
                onClick={() => downloadApprovalReceipt(approvalReceipt)}
              >
                Export JSON
              </button>
              <button
                type="button"
                className={styles.auditBtn}
                onClick={() => {
                  void verify(approvalReceipt).then((result) => {
                    setHashCheck(result.valid ? 'Hash matches' : 'Hash does not match');
                  });
                }}
              >
                Verify hash
              </button>
              {hashCheck && <span role="status">{hashCheck}</span>}
            </div>
          )}
          {onVerify && (
            <button
              type="button"
              className={styles.auditBtn}
              onClick={() => onVerify({ hash, signature })}
            >
              Verify proof
            </button>
          )}
          {onViewAuditTrail && (
            <button
              type="button"
              className={styles.auditBtn}
              onClick={onViewAuditTrail}
              aria-label="View full audit trail"
            >
              View audit trail <IconArrowRight />
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
