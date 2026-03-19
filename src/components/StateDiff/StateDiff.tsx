/**
 * StateDiff — Mutation visibility viewer.
 *
 * A structured, human-readable "Before / After" translation of a
 * payload delta. Agents mutate databases, infrastructure, and ledgers
 * rapidly — this component provides exact proof of what changed.
 *
 * v2 — Strict Compliance & Forensics
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 1)
 */

import { useState, useMemo } from 'react';
import { VisuallyHidden } from '../../utils/a11y';
import type {
  StateDiffProps,
  DiffEntry,
  DiffGroup,
  DiffChangeType,
} from './StateDiff.types';
import styles from './StateDiff.module.css';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const CHANGE_LABELS: Record<DiffChangeType, string> = {
  added: 'Added',
  removed: 'Removed',
  modified: 'Modified',
  unchanged: 'Unchanged',
};

const CHANGE_SYMBOLS: Record<DiffChangeType, string> = {
  added: '+',
  removed: '−',
  modified: '~',
  unchanged: ' ',
};

const CHANGE_CLASSES: Record<DiffChangeType, string> = {
  added: styles.changeAdded,
  removed: styles.changeRemoved,
  modified: styles.changeModified,
  unchanged: styles.changeUnchanged,
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatValue(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return String(value);
}

function getEntryLabel(entry: DiffEntry): string {
  if (entry.label) return entry.label;
  const segments = entry.path.split('.');
  return segments[segments.length - 1];
}

function filterEntries(
  entries: DiffEntry[],
  hideUnchanged: boolean,
): DiffEntry[] {
  return hideUnchanged ? entries.filter((e) => e.type !== 'unchanged') : entries;
}

function countChanges(entries: DiffEntry[]): number {
  return entries.filter((e) => e.type !== 'unchanged').length;
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function DiffEntryRow({ entry }: { entry: DiffEntry }) {
  return (
    <div className={`${styles.entry} ${CHANGE_CLASSES[entry.type]}`} role="row">
      <span className={styles.entrySymbol} aria-hidden="true">
        {CHANGE_SYMBOLS[entry.type]}
      </span>
      <span className={styles.entryPath}>{getEntryLabel(entry)}</span>
      <span className={styles.entryValues}>
        {entry.type === 'added' ? (
          <span className={styles.valueAfter}>{formatValue(entry.after)}</span>
        ) : entry.type === 'removed' ? (
          <span className={styles.valueBefore}>{formatValue(entry.before)}</span>
        ) : entry.type === 'modified' ? (
          <>
            <span className={styles.valueBefore}>{formatValue(entry.before)}</span>
            <span className={styles.arrow} aria-hidden="true">→</span>
            <span className={styles.valueAfter}>{formatValue(entry.after)}</span>
          </>
        ) : (
          <span className={styles.valueUnchanged}>{formatValue(entry.before)}</span>
        )}
      </span>
      <VisuallyHidden>
        {`${getEntryLabel(entry)}: ${CHANGE_LABELS[entry.type]}${
          entry.type === 'modified'
            ? ` from ${formatValue(entry.before)} to ${formatValue(entry.after)}`
            : entry.type === 'added'
            ? ` value ${formatValue(entry.after)}`
            : entry.type === 'removed'
            ? ` value ${formatValue(entry.before)}`
            : ''
        }`}
      </VisuallyHidden>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */

export function StateDiff({
  title,
  description,
  entries,
  groups,
  hideUnchanged = false,
  defaultCollapsed = false,
  changeCount,
  timestamp,
  sourceId,
  className,
}: StateDiffProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  // Normalize to groups
  const resolvedGroups: DiffGroup[] = useMemo(() => {
    if (groups && groups.length > 0) return groups;
    if (entries && entries.length > 0) return [{ label: '', entries }];
    return [];
  }, [groups, entries]);

  // Compute total change count
  const totalChanges = useMemo(() => {
    if (changeCount != null) return changeCount;
    return resolvedGroups.reduce(
      (sum, g) => sum + countChanges(g.entries),
      0,
    );
  }, [resolvedGroups, changeCount]);

  const ariaLabel = useMemo(
    () => `${title}: ${totalChanges} field${totalChanges !== 1 ? 's' : ''} changed`,
    [title, totalChanges],
  );

  return (
    <div
      className={`${styles.stateDiff} ${className ?? ''}`}
      role="region"
      aria-label={ariaLabel}
    >
      {/* Header */}
      <div className={styles.header}>
        <button
          type="button"
          className={styles.headerToggle}
          onClick={() => setCollapsed((prev) => !prev)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? `Expand ${title}` : `Collapse ${title}`}
        >
          <span className={styles.collapseIcon} aria-hidden="true">
            {collapsed ? '▸' : '▾'}
          </span>
          <span className={styles.title}>{title}</span>
        </button>

        <span className={styles.changeBadge}>
          {totalChanges} change{totalChanges !== 1 ? 's' : ''}
        </span>

        {/* Metadata */}
        {(timestamp || sourceId) && (
          <span className={styles.meta}>
            {timestamp && <span className={styles.metaItem}>{timestamp}</span>}
            {sourceId && <span className={styles.metaItem}>#{sourceId}</span>}
          </span>
        )}
      </div>

      {/* Description */}
      {description && !collapsed && (
        <p className={styles.description}>{description}</p>
      )}

      {/* Diff body */}
      {!collapsed && (
        <div className={styles.body} role="table" aria-label="State changes">
          {resolvedGroups.map((group) => {
            const filtered = filterEntries(group.entries, hideUnchanged);
            if (filtered.length === 0) return null;
            return (
              <div key={group.label || 'default'} className={styles.group}>
                {group.label && (
                  <div className={styles.groupLabel} role="rowgroup">
                    {group.label}
                  </div>
                )}
                {filtered.map((entry) => (
                  <DiffEntryRow key={entry.path} entry={entry} />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
