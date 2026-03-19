/**
 * RollbackTimeline — Type Definitions
 *
 * v2 Compliance & Forensics primitive.
 * Undo-tree for agentic tool sequences.
 *
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 2)
 */

/** Status of a rollback point */
export type RollbackPointStatus = 'available' | 'current' | 'rolled-back' | 'irreversible';

/** A single point in the rollback timeline */
export interface RollbackPoint {
  /** Unique identifier */
  id: string;

  /** Human-readable label (e.g. "Updated user email", "Deployed v2.1") */
  label: string;

  /** Detailed description */
  description?: string;

  /** Status of this rollback point */
  status: RollbackPointStatus;

  /** Timestamp of the action */
  timestamp: string;

  /** Tool call ID that produced this state */
  toolCallId?: string;

  /** Whether this action is reversible */
  reversible: boolean;

  /** Number of downstream actions that would also be undone */
  dependentCount?: number;
}

export interface RollbackTimelineProps {
  /** Title (e.g. "Action Timeline", "Undo History") */
  title: string;

  /** Ordered list of rollback points (oldest first) */
  points: RollbackPoint[];

  /** Called when user requests rollback to a specific point */
  onRollback?: (pointId: string) => void;

  /** Whether to confirm before rollback (default: true) */
  requireConfirmation?: boolean;

  /** Additional CSS class */
  className?: string;
}
