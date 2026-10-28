/**
 * BudgetMeter — Type Definitions
 *
 * v2 Compliance & Forensics primitive.
 * Visual gauge showing session budget vs. burn rate.
 *
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 6)
 */

import type { SmallPayment, SmallPaymentBurst } from '../../utils/triggers';

export type { SmallPayment, SmallPaymentBurst };

/** Budget resource type — what is being metered */
export type BudgetUnit = 'currency' | 'tokens' | 'api-calls' | 'compute' | 'custom';

/** Budget severity thresholds */
export type BudgetSeverity = 'normal' | 'elevated' | 'critical' | 'exceeded';

export interface BudgetMeterProps {
  /** Human-readable label (e.g. "Session Budget", "Token Allowance") */
  label: string;

  /** Current amount spent/consumed */
  spent: number;

  /** Maximum budget allowance */
  limit: number;

  /** Unit of measurement */
  unit: BudgetUnit;

  /** Display format for the value (e.g. "$1,250", "3.2k tokens") — if omitted, raw number is shown */
  formatValue?: (value: number) => string;

  /** Current burn rate per minute (optional) */
  burnRate?: number;

  /** Format function for burn rate display */
  formatBurnRate?: (rate: number) => string;

  /** Estimated time remaining at current burn rate (human-readable, e.g. "~12 min") */
  estimatedTimeRemaining?: string;

  /** Threshold percentage for "elevated" severity (default: 60) */
  elevatedThreshold?: number;

  /** Threshold percentage for "critical" severity (default: 85) */
  criticalThreshold?: number;

  /** Override auto-calculated severity */
  severity?: BudgetSeverity;

  /** Called when budget is fully consumed */
  onBudgetExceeded?: () => void;

  /** Called when budget crosses the critical threshold */
  onCriticalThreshold?: () => void;

  /** Whether to show a compact inline variant (default: false) */
  compact?: boolean;

  /**
   * Auto-approved payments, in this meter's unit.
   * Leave gated payments out. The list does not open a second gate.
   */
  transactions?: readonly SmallPayment[];

  /** Unix milliseconds. The burst warning stays off until this is set. */
  nowMs?: number;

  /** Decimal string. Payments strictly under this count. Default "5". */
  smallTxThreshold?: string;

  /** A payment ages out when its age reaches this. Default ten minutes. */
  windowMs?: number;

  /** The warning row appears when the small-payment count is greater than this. Default 5. */
  maxSmallTxCount?: number;

  /**
   * Fires once for a payee set. Fires again when that set changes,
   * or after the payments age out and a new burst starts.
   */
  onSmallTxPattern?: (pattern: SmallPaymentBurst) => void;

  /** Additional CSS class */
  className?: string;
}
