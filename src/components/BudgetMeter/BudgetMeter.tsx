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
import type { BudgetMeterProps, BudgetSeverity } from './BudgetMeter.types';
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

const SEVERITY_LABELS: Record<BudgetSeverity, string> = {
  normal: 'Within budget',
  elevated: 'Approaching limit',
  critical: 'Near limit',
  exceeded: 'Budget exceeded',
};

/* ------------------------------------------------------------------ */
/* Default formatters                                                  */
/* ------------------------------------------------------------------ */

const defaultFormatValue = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value.toLocaleString();
};

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

  const formattedSpent = formatValue(spent);
  const formattedLimit = formatValue(limit);
  const formattedBurnRate = burnRate != null
    ? (formatBurnRate ? formatBurnRate(burnRate) : `${formatValue(burnRate)}/min`)
    : null;

  const ariaLabel = useMemo(
    () =>
      `${label}: ${formattedSpent} of ${formattedLimit} used (${Math.round(percentage)}%). ${SEVERITY_LABELS[resolvedSeverity]}.`,
    [label, formattedSpent, formattedLimit, percentage, resolvedSeverity],
  );

  if (compact) {
    return (
      <div
        className={`${styles.budgetMeterCompact} ${SEVERITY_CLASSES[resolvedSeverity]} ${className ?? ''}`}
        role="meter"
        aria-label={ariaLabel}
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
    );
  }

  return (
    <div
      className={`${styles.budgetMeter} ${SEVERITY_CLASSES[resolvedSeverity]} ${className ?? ''}`}
      role="meter"
      aria-label={ariaLabel}
      aria-valuenow={spent}
      aria-valuemin={0}
      aria-valuemax={limit}
    >
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={`${styles.severityBadge} ${SEVERITY_CLASSES[resolvedSeverity]}`}>
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
  );
}
