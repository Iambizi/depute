/**
 * CapabilityMatrix — Permission inspector / Agent Handshake.
 *
 * A matrix or permission inspector showing what an agent can and
 * cannot do in a given context. Makes tool contracts visible to
 * the human supervisor.
 *
 * v2 — Strict Compliance & Forensics
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 3)
 */

import { useMemo } from 'react';
import { VisuallyHidden } from '../../utils/a11y';
import type {
  CapabilityMatrixProps,
  Capability,
  PermissionLevel,
} from './CapabilityMatrix.types';
import styles from './CapabilityMatrix.module.css';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const PERMISSION_LABELS: Record<PermissionLevel, string> = {
  full: 'Full Access',
  read: 'Read Only',
  write: 'Write Only',
  none: 'Denied',
  conditional: 'Conditional',
};

const PERMISSION_SYMBOLS: Record<PermissionLevel, string> = {
  full: '✓',
  read: '◐',
  write: '◑',
  none: '✕',
  conditional: '◎',
};

const PERMISSION_CLASSES: Record<PermissionLevel, string> = {
  full: styles.permFull,
  read: styles.permRead,
  write: styles.permWrite,
  none: styles.permNone,
  conditional: styles.permConditional,
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function groupCapabilities(
  capabilities: Capability[],
): Map<string, Capability[]> {
  const groups = new Map<string, Capability[]>();
  for (const cap of capabilities) {
    const category = cap.category ?? 'General';
    const existing = groups.get(category) ?? [];
    existing.push(cap);
    groups.set(category, existing);
  }
  return groups;
}

/* ------------------------------------------------------------------ */
/* Sub-component                                                       */
/* ------------------------------------------------------------------ */

function CapabilityRow({
  capability,
  highlightDenied,
  onClick,
}: {
  capability: Capability;
  highlightDenied: boolean;
  onClick?: (cap: Capability) => void;
}) {
  const isDenied = capability.permission === 'none';
  const rowClass = `${styles.row} ${PERMISSION_CLASSES[capability.permission]} ${
    isDenied && highlightDenied ? styles.rowDenied : ''
  }`;

  return (
    <div
      className={rowClass}
      role="row"
      onClick={onClick ? () => onClick(capability) : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(capability); } } : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      <span className={`${styles.permBadge} ${PERMISSION_CLASSES[capability.permission]}`}>
        <span aria-hidden="true">{PERMISSION_SYMBOLS[capability.permission]}</span>
        <VisuallyHidden>{PERMISSION_LABELS[capability.permission]}</VisuallyHidden>
      </span>
      <span className={styles.capName}>{capability.name}</span>
      {capability.description && (
        <span className={styles.capDesc}>{capability.description}</span>
      )}
      {capability.permission === 'conditional' && capability.condition && (
        <span className={styles.capCondition}>if {capability.condition}</span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */

export function CapabilityMatrix({
  title,
  description,
  capabilities,
  agentId,
  groupByCategory = true,
  highlightDenied = true,
  onCapabilityClick,
  className,
}: CapabilityMatrixProps) {
  const grouped = useMemo(
    () => (groupByCategory ? groupCapabilities(capabilities) : null),
    [capabilities, groupByCategory],
  );

  const summary = useMemo(() => {
    const allowed = capabilities.filter((c) => c.permission !== 'none').length;
    const denied = capabilities.filter((c) => c.permission === 'none').length;
    return { allowed, denied, total: capabilities.length };
  }, [capabilities]);

  const ariaLabel = useMemo(
    () =>
      `${title}: ${summary.allowed} allowed, ${summary.denied} denied out of ${summary.total} capabilities`,
    [title, summary],
  );

  return (
    <div
      className={`${styles.capabilityMatrix} ${className ?? ''}`}
      role="region"
      aria-label={ariaLabel}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.title}>{title}</h3>
          {agentId && (
            <span className={styles.agentId}>{agentId}</span>
          )}
        </div>
        <div className={styles.summaryBadges}>
          <span className={`${styles.summaryBadge} ${styles.permFull}`}>
            {summary.allowed} allowed
          </span>
          <span className={`${styles.summaryBadge} ${styles.permNone}`}>
            {summary.denied} denied
          </span>
        </div>
      </div>

      {description && (
        <p className={styles.description}>{description}</p>
      )}

      {/* Matrix body */}
      <div className={styles.body} role="table" aria-label="Capability permissions">
        {grouped ? (
          Array.from(grouped.entries()).map(([category, caps]) => (
            <div key={category} className={styles.group}>
              <div className={styles.groupLabel} role="rowgroup">{category}</div>
              {caps.map((cap) => (
                <CapabilityRow
                  key={cap.name}
                  capability={cap}
                  highlightDenied={highlightDenied}
                  onClick={onCapabilityClick}
                />
              ))}
            </div>
          ))
        ) : (
          capabilities.map((cap) => (
            <CapabilityRow
              key={cap.name}
              capability={cap}
              highlightDenied={highlightDenied}
              onClick={onCapabilityClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
