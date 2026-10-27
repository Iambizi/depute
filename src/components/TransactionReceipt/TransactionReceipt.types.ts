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

  /**
   * Hash produced by the caller's backend. Display only.
   * This component does not hash the transaction.
   */
  hash?: string;

  /** Signature produced by the caller's backend. Display only. */
  signature?: string;

  /** App-supplied check for the displayed hash and signature. */
  onVerify?: (proof: { hash?: string; signature?: string }) => void;

  /** Whether to show a copy button for the hash */
  copyableHash?: boolean;

  /** Called when hash is copied */
  onCopyHash?: () => void;

  /** Called when user requests full audit trail */
  onViewAuditTrail?: () => void;

  /**
   * Caller-supplied digest of the program that ran.
   * This component does not hash the program.
   */
  programHash?: string;

  /**
   * Side effects the server actually dispatched, one string per RPC.
   * Logs are not a substitute for this list.
   */
  dispatches?: string[];

  /** Caller-supplied console output from the program. */
  logs?: string[];

  /** Additional CSS class */
  className?: string;
}
