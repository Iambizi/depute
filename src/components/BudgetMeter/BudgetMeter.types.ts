/**
 * BudgetMeter — Type Definitions
 *
 * v2 Compliance & Forensics primitive.
 * Visual gauge showing session budget vs. burn rate.
 *
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 6)
 */

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

  /** Additional CSS class */
  className?: string;
}
