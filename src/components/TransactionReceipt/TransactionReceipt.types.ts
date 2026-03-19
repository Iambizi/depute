/**
 * TransactionReceipt — Type Definitions
 *
 * v2 Compliance & Forensics primitive.
 * Provenance + audit log for completed agent actions.
 *
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 5)
 */

/** Transaction status */
export type TransactionStatus = 'success' | 'failed' | 'pending' | 'reverted';

/** A line item in the receipt */
export interface ReceiptLineItem {
  /** Label (e.g. "Tool Used", "Duration", "Gas Fee") */
  label: string;

  /** Value */
  value: string;

  /** Whether this is a highlight field */
  highlight?: boolean;
}

export interface TransactionReceiptProps {
  /** Transaction/action ID */
  transactionId: string;

  /** Title (e.g. "Transfer Complete", "Deployment Receipt") */
  title: string;

  /** Status of the transaction */
  status: TransactionStatus;

  /** Timestamp of completion */
  timestamp: string;

  /** Line items to display */
  lineItems: ReceiptLineItem[];

  /** Agent that performed the action */
  agentId?: string;

  /** Hash or signature for verification */
  hash?: string;

  /** Whether to show a copy button for the hash */
  copyableHash?: boolean;

  /** Called when hash is copied */
  onCopyHash?: () => void;

  /** Called when user requests full audit trail */
  onViewAuditTrail?: () => void;

  /** Additional CSS class */
  className?: string;
}
