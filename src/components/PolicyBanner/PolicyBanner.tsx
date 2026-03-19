/**
 * PolicyBanner — Contextual operating policy indicator.
 *
 * A persistent banner/badge that visually anchors the agent's current
 * operating policy, ensuring the human supervisor knows whether they
 * are overseeing a sandbox, staging, or production environment.
 *
 * v2 — Strict Compliance & Forensics
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 7)
 */

import { useState, useMemo } from 'react';
import { VisuallyHidden } from '../../utils/a11y';
import type {
  PolicyBannerProps,
  PolicyMode,
  PolicySeverity,
} from './PolicyBanner.types';
import styles from './PolicyBanner.module.css';

/* ------------------------------------------------------------------ */
/* Mode → default severity mapping                                     */
/* ------------------------------------------------------------------ */

const MODE_SEVERITY: Record<PolicyMode, PolicySeverity> = {
  sandbox: 'info',
  staging: 'warning',
  production: 'critical',
  simulation: 'info',
  test: 'info',
  drafting: 'info',
  executing: 'critical',
};

const MODE_LABELS: Record<PolicyMode, string> = {
  sandbox: 'Sandbox',
  staging: 'Staging',
  production: 'Production',
  simulation: 'Simulation',
  test: 'Test',
  drafting: 'Drafting',
  executing: 'Executing',
};

const SEVERITY_CLASSES: Record<PolicySeverity, string> = {
  info: styles.severityInfo,
  warning: styles.severityWarning,
  critical: styles.severityCritical,
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function PolicyBanner({
  mode,
  label,
  description,
  severity,
  constraints,
  collapsible = false,
  collapsed: controlledCollapsed,
  onToggleCollapse,
  onViewPolicy,
  showLiveIndicator,
  className,
}: PolicyBannerProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed ?? internalCollapsed;

  const resolvedSeverity = severity ?? MODE_SEVERITY[mode];
  const resolvedLabel = label ?? MODE_LABELS[mode];

  const isLive =
    showLiveIndicator ??
    (mode === 'production' || mode === 'executing');

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed((prev) => !prev);
    }
  };

  const ariaLabel = useMemo(
    () =>
      `Policy: ${resolvedLabel}${description ? ` — ${description}` : ''}`,
    [resolvedLabel, description],
  );

  return (
    <div
      className={`${styles.policyBanner} ${SEVERITY_CLASSES[resolvedSeverity]} ${className ?? ''}`}
      role="status"
      aria-label={ariaLabel}
    >
      {/* Header row */}
      <div className={styles.header}>
        {/* Live indicator */}
        {isLive && (
          <span
            className={`${styles.liveIndicator} ${SEVERITY_CLASSES[resolvedSeverity]}`}
            aria-hidden="true"
          />
        )}

        {/* Mode badge */}
        <span className={`${styles.modeBadge} ${SEVERITY_CLASSES[resolvedSeverity]}`}>
          {resolvedLabel}
        </span>

        {/* Description */}
        {description && (
          <span className={styles.description}>{description}</span>
        )}

        {/* Spacer */}
        <span className={styles.spacer} />

        {/* View policy link */}
        {onViewPolicy && (
          <button
            type="button"
            className={styles.viewPolicyBtn}
            onClick={onViewPolicy}
            aria-label="View full policy details"
          >
            View Policy
          </button>
        )}

        {/* Collapse toggle */}
        {collapsible && (
          <button
            type="button"
            className={styles.collapseBtn}
            onClick={handleToggle}
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? 'Expand policy details' : 'Collapse policy details'}
          >
            {isCollapsed ? '▸' : '▾'}
          </button>
        )}
      </div>

      {/* Constraints (collapsible) */}
      {constraints && constraints.length > 0 && !isCollapsed && (
        <div className={styles.constraints} role="list" aria-label="Active policy constraints">
          {constraints.map((constraint) => (
            <div
              key={constraint.label}
              className={styles.constraint}
              role="listitem"
            >
              <span className={styles.constraintLabel}>{constraint.label}</span>
              <span className={styles.constraintValue}>{constraint.value}</span>
            </div>
          ))}
        </div>
      )}

      <VisuallyHidden>
        {`Current operating policy: ${resolvedLabel}. Severity: ${resolvedSeverity}.${
          constraints
            ? ` Constraints: ${constraints.map((c) => `${c.label}: ${c.value}`).join(', ')}.`
            : ''
        }`}
      </VisuallyHidden>
    </div>
  );
}
