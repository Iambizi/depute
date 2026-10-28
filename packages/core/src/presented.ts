/**
 * Handoff and presented-payload types.
 *
 * This file is the copy-paste source for `types/ax-core.ts`. It imports nothing.
 * React components import the same text from `src/types/core.ts`, which stays
 * byte-for-byte identical (`npm run types:core:check`).
 *
 * `ApprovalHandoff.fallbackBehavior` uses the same three values as the
 * reducer's `FallbackBehavior`. The component prop name stays `fallbackBehavior`.
 *
 * Amounts are decimal strings. This module does not hash or sign.
 */

export type ProvenanceTrust = 'trusted' | 'untrusted' | 'unknown';

/** Who would be paid. Identity is rail plus identifier. The display name is not the key. */
export interface PresentedPayee {
  rail: string;
  identifier: string;
  displayName?: string;
}

/** Decimal amount. `value` is a string so a receipt never stores a float. */
export interface PresentedAmount {
  value: string;
  currency: string;
}

export interface PresentedLineItem {
  label: string;
  value: string;
}

/** Same fields as an approval gate scope. */
export interface PresentedScope {
  resourceLimit?: string;
  durationSeconds?: number;
  target?: string;
}

export interface PresentedProvenance {
  source: string;
  url?: string;
  trust: ProvenanceTrust;
}

/**
 * What the human was shown. Later receipts hash this object.
 * Fields stay optional until a gate starts filling them in.
 */
export interface PresentedPayload {
  title: string;
  description?: string;
  agentReasoning?: string;
  payee?: PresentedPayee;
  amount?: PresentedAmount;
  lineItems?: PresentedLineItem[];
  scope?: PresentedScope;
  justification?: string;
  provenance?: PresentedProvenance;
}

/** Async handoff configuration on ApprovalGate and BindingApproval. */
export interface ApprovalHandoff {
  timeoutMs: number;
  fallbackBehavior: 'block' | 'abort' | 'deny';
  requireSigning?: boolean;
}

/** Context passed to handoff callbacks. */
export interface HandoffContext {
  approvalId: string;
  action: string;
  riskScore?: number;
  confidence?: number;
  deadline: number;
  timestamp: number;
}
