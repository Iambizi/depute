/**
 * RollbackTimeline — Undo-tree for agentic tool sequences.
 *
 * Allows a human to walk back agent state cleanly when a
 * hallucination or error is caught late in a multi-step sequence.
 *
 * v2 — Strict Compliance & Forensics
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 2)
 */

import { useState, useMemo } from 'react';
import { VisuallyHidden } from '../../utils/a11y';
import type {
  RollbackTimelineProps,
  RollbackPoint,
  RollbackPointStatus,
} from './RollbackTimeline.types';
import styles from './RollbackTimeline.module.css';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const STATUS_CLASSES: Record<RollbackPointStatus, string> = {
  available: styles.pointAvailable,
  current: styles.pointCurrent,
  'rolled-back': styles.pointRolledBack,
  irreversible: styles.pointIrreversible,
};

const STATUS_LABELS: Record<RollbackPointStatus, string> = {
  available: 'Available',
  current: 'Current',
  'rolled-back': 'Rolled back',
  irreversible: 'Irreversible',
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function RollbackTimeline({
  title,
  points,
  onRollback,
  requireConfirmation = true,
  className,
}: RollbackTimelineProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const currentIndex = useMemo(
    () => points.findIndex((p) => p.status === 'current'),
    [points],
  );

  const handleRollbackClick = (point: RollbackPoint) => {
    if (!point.reversible || point.status === 'current' || point.status === 'rolled-back') return;

    if (requireConfirmation && confirmingId !== point.id) {
      setConfirmingId(point.id);
      return;
    }

    setConfirmingId(null);
    onRollback?.(point.id);
  };

  const handleCancel = () => {
    setConfirmingId(null);
  };

  const rollbackableCount = points.filter((p) => p.reversible && p.status === 'available').length;

  return (
    <div
      className={`${styles.rollbackTimeline} ${className ?? ''}`}
      role="region"
      aria-label={`${title}: ${points.length} actions, ${rollbackableCount} reversible`}
    >
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.countBadge}>
          {points.length} action{points.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Timeline */}
      <div className={styles.timeline} role="list" aria-label="Rollback points">
        {points.map((point, index) => {
          const isConfirming = confirmingId === point.id;
          const canRollback = point.reversible && point.status === 'available' && onRollback;

          return (
            <div
              key={point.id}
              className={`${styles.point} ${STATUS_CLASSES[point.status]}`}
              role="listitem"
            >
              {/* Connector line */}
              {index < points.length - 1 && (
                <span
                  className={`${styles.connector} ${
                    index < currentIndex ? styles.connectorPast : styles.connectorFuture
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* Dot */}
              <span className={`${styles.dot} ${STATUS_CLASSES[point.status]}`} aria-hidden="true">
                {point.status === 'irreversible' ? '🔒' : point.status === 'current' ? '●' : '○'}
              </span>

              {/* Content */}
              <div className={styles.pointContent}>
                <div className={styles.pointHeader}>
                  <span className={styles.pointLabel}>{point.label}</span>
                  <span className={styles.pointTimestamp}>{point.timestamp}</span>
                </div>

                {point.description && (
                  <p className={styles.pointDescription}>{point.description}</p>
                )}

                {!point.reversible && point.status !== 'current' && (
                  <span className={styles.irreversibleTag}>Irreversible</span>
                )}

                {/* Rollback controls */}
                {canRollback && !isConfirming && (
                  <button
                    type="button"
                    className={styles.rollbackBtn}
                    onClick={() => handleRollbackClick(point)}
                    aria-label={`Rollback to: ${point.label}`}
                  >
                    ↩ Rollback to here
                    {point.dependentCount != null && point.dependentCount > 0 && (
                      <span className={styles.dependentCount}>
                        ({point.dependentCount} dependent action{point.dependentCount !== 1 ? 's' : ''})
                      </span>
                    )}
                  </button>
                )}

                {/* Confirmation */}
                {isConfirming && (
                  <div className={styles.confirmBar} role="alert">
                    <span className={styles.confirmText}>
                      Undo all actions after this point?
                    </span>
                    <button
                      type="button"
                      className={styles.confirmBtn}
                      onClick={() => handleRollbackClick(point)}
                      aria-label="Confirm rollback"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className={styles.cancelBtn}
                      onClick={handleCancel}
                      aria-label="Cancel rollback"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <VisuallyHidden>
                {`Step ${index + 1}: ${point.label}. Status: ${STATUS_LABELS[point.status]}. ${
                  point.reversible ? 'Reversible.' : 'Irreversible.'
                }`}
              </VisuallyHidden>
            </div>
          );
        })}
      </div>
    </div>
  );
}
