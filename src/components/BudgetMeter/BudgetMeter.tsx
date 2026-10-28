/**
 * BudgetMeter — Resource constraint gauge.
 *
 * A visual gauge showing session budget vs. burn rate, designed for
 * delegation scenarios where humans give agents a spending/usage
 * limit and let them run autonomously within bounds.
 *
 * v2 — Strict Compliance & Forensics
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 6)
 */

import { useMemo, useEffect, useRef } from 'react';
import { VisuallyHidden } from '../../utils/a11y';
import {
  DEFAULT_SMALL_TX_THRESHOLD,
  DEFAULT_SMALL_TX_WINDOW_MS,
  smallPaymentBurst,
} from '../../utils/triggers';
import type { SmallPaymentBurst } from '../../utils/triggers';
import type { BudgetMeterProps, BudgetSeverity, BudgetUnit } from './BudgetMeter.types';
import styles from './BudgetMeter.module.css';

/* ------------------------------------------------------------------ */
/* Severity computation                                                */
/* ------------------------------------------------------------------ */

function computeSeverity(
  spent: number,
  limit: number,
  elevatedThreshold: number,
  criticalThreshold: number,
): BudgetSeverity {
  if (limit <= 0) return 'exceeded';
  const pct = (spent / limit) * 100;
  if (pct >= 100) return 'exceeded';
  if (pct >= criticalThreshold) return 'critical';
  if (pct >= elevatedThreshold) return 'elevated';
  return 'normal';
}

const SEVERITY_CLASSES: Record<BudgetSeverity, string> = {
  normal: styles.severityNormal,
  elevated: styles.severityElevated,
  critical: styles.severityCritical,
  exceeded: styles.severityExceeded,
};

const SEVERITY_BADGES: Record<BudgetSeverity, string> = {
  normal: 'ax-badge ax-badge-success',
  elevated: 'ax-badge ax-badge-warning',
  critical: 'ax-badge ax-badge-warning',
  exceeded: 'ax-badge ax-badge-danger',
};

const SEVERITY_LABELS: Record<BudgetSeverity, string> = {
  normal: 'Within budget',
  elevated: 'Approaching limit',
  critical: 'Near limit',
  exceeded: 'Budget exceeded',
};

/* ------------------------------------------------------------------ */
/* Default formatters                                                  */
/* ------------------------------------------------------------------ */

const UNIT_LABELS: Record<BudgetUnit, string> = {
  currency: 'currency',
  tokens: 'tokens',
  'api-calls': 'API calls',
  compute: 'compute',
  custom: 'units',
};

const defaultFormatValue = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value.toLocaleString();
};

function windowLabel(windowMs: number): string {
  if (windowMs > 0 && windowMs % 60_000 === 0) {
    const minutes = windowMs / 60_000;
    return minutes === 1 ? '1 minute' : `${minutes} minutes`;
  }
  const seconds = Math.round(windowMs / 1000);
  return seconds === 1 ? '1 second' : `${seconds} seconds`;
}

function burstMessage(burst: SmallPaymentBurst, threshold: string, windowMs: number): string {
  const payments = burst.count === 1 ? 'payment' : 'payments';
  const payees = burst.payeeCount === 1 ? 'payee' : 'payees';
  return `${burst.count} ${payments} under ${threshold} reached ${burst.payeeCount} ${payees} in the last ${windowLabel(windowMs)}. This warning does not open another approval.`;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function BudgetMeter({
  label,
  spent,
  limit,
  unit,
  formatValue = defaultFormatValue,
  burnRate,
  formatBurnRate,
  estimatedTimeRemaining,
  elevatedThreshold = 60,
  criticalThreshold = 85,
  severity: overrideSeverity,
  onBudgetExceeded,
  onCriticalThreshold,
  compact = false,
  transactions,
  nowMs,
  smallTxThreshold = DEFAULT_SMALL_TX_THRESHOLD,
  windowMs = DEFAULT_SMALL_TX_WINDOW_MS,
  maxSmallTxCount,
  onSmallTxPattern,
  className,
}: BudgetMeterProps) {
  const resolvedSeverity =
    overrideSeverity ?? computeSeverity(spent, limit, elevatedThreshold, criticalThreshold);

  const percentage = useMemo(
    () => (limit > 0 ? Math.min((spent / limit) * 100, 100) : 100),
    [spent, limit],
  );

  // Track previous severity to fire callbacks only on transitions
  const prevSeverityRef = useRef(resolvedSeverity);
  useEffect(() => {
    const prev = prevSeverityRef.current;
    prevSeverityRef.current = resolvedSeverity;

    if (resolvedSeverity === 'exceeded' && prev !== 'exceeded') {
      onBudgetExceeded?.();
    }
    if (resolvedSeverity === 'critical' && prev !== 'critical') {
      onCriticalThreshold?.();
    }
  }, [resolvedSeverity, onBudgetExceeded, onCriticalThreshold]);

  const burst = useMemo(() => {
    if (!transactions || nowMs === undefined) return null;
    return smallPaymentBurst({
      transactions,
      nowMs,
      smallTxThreshold,
      windowMs,
      maxSmallTxCount,
    });
  }, [transactions, nowMs, smallTxThreshold, windowMs, maxSmallTxCount]);

  const notifiedPayees = useRef<string | null>(null);
  useEffect(() => {
    if (!burst?.warn) {
      notifiedPayees.current = null;
      return;
    }
    const key = burst.payees.map((payee) => `${payee.rail}\u0000${payee.identifier}`).join('\n');
    if (notifiedPayees.current === key) return;
    notifiedPayees.current = key;
    onSmallTxPattern?.(burst);
  }, [burst, onSmallTxPattern]);

  const warning = burst?.warn ? (
    <p className={styles.burst} role="status">
      {burstMessage(burst, smallTxThreshold, windowMs)}
    </p>
  ) : null;

  const formattedSpent = formatValue(spent);
  const formattedLimit = formatValue(limit);
  const formattedBurnRate = burnRate != null
    ? (formatBurnRate ? formatBurnRate(burnRate) : `${formatValue(burnRate)}/min`)
    : null;

  const unitLabel = UNIT_LABELS[unit];
  const ariaLabel = useMemo(
    () =>
      `${label}: ${formattedSpent} of ${formattedLimit} ${unitLabel} used (${Math.round(percentage)}%). ${SEVERITY_LABELS[resolvedSeverity]}.`,
    [label, formattedSpent, formattedLimit, unitLabel, percentage, resolvedSeverity],
  );

  if (compact) {
    return (
      <div className={styles.stack}>
        <div
          className={`${styles.budgetMeterCompact} ax-card ${SEVERITY_CLASSES[resolvedSeverity]} ${className ?? ''}`}
          data-ax=""
          role="meter"
          aria-label={ariaLabel}
          aria-valuetext={`${formattedSpent} of ${formattedLimit} ${unitLabel}`}
          aria-valuenow={spent}
          aria-valuemin={0}
          aria-valuemax={limit}
        >
          <span className={styles.compactLabel}>{label}</span>
          <span className={styles.compactValue}>
            {formattedSpent}
            <span className={styles.compactSeparator}>/</span>
            {formattedLimit}
          </span>
          <div className={styles.compactBar}>
            <div
              className={`${styles.compactBarFill} ${SEVERITY_CLASSES[resolvedSeverity]}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        {warning}
      </div>
    );
  }

  return (
    <div className={styles.stack}>
      <div
        className={`${styles.budgetMeter} ax-card ${SEVERITY_CLASSES[resolvedSeverity]} ${className ?? ''}`}
        data-ax=""
        role="meter"
        aria-label={ariaLabel}
        aria-valuetext={`${formattedSpent} of ${formattedLimit} ${unitLabel}`}
        aria-valuenow={spent}
        aria-valuemin={0}
        aria-valuemax={limit}
      >
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={`${styles.severityBadge} ${SEVERITY_BADGES[resolvedSeverity]}`}>
          {SEVERITY_LABELS[resolvedSeverity]}
        </span>
      </div>

      {/* Progress bar */}
      <div className={styles.barContainer}>
        <div
          className={`${styles.barFill} ${SEVERITY_CLASSES[resolvedSeverity]}`}
          style={{ width: `${percentage}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Values row */}
      <div className={styles.values}>
        <span className={styles.valueSpent}>{formattedSpent}</span>
        <span className={styles.valueSeparator}>of</span>
        <span className={styles.valueLimit}>{formattedLimit}</span>
        <span className={styles.valuePercentage}>({Math.round(percentage)}%)</span>
      </div>

      {/* Metadata row (burn rate / time remaining) */}
      {(formattedBurnRate || estimatedTimeRemaining) && (
        <div className={styles.metadata}>
          {formattedBurnRate && (
            <span className={styles.metaItem}>
              <span className={styles.metaLabel}>Burn rate</span>
              <span className={styles.metaValue}>{formattedBurnRate}</span>
            </span>
          )}
          {estimatedTimeRemaining && (
            <span className={styles.metaItem}>
              <span className={styles.metaLabel}>Est. remaining</span>
              <span className={styles.metaValue}>{estimatedTimeRemaining}</span>
            </span>
          )}
        </div>
      )}

      <VisuallyHidden>{ariaLabel}</VisuallyHidden>
      </div>
      {warning}
    </div>
  );
}
