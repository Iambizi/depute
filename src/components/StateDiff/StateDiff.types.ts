/**
 * StateDiff — Type Definitions
 *
 * v2 Compliance & Forensics primitive.
 * Structured before/after view of state mutations.
 *
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 1)
 */

/** Type of change for a single diff entry */
export type DiffChangeType = 'added' | 'removed' | 'modified' | 'unchanged';

/** A single field-level diff entry */
export interface DiffEntry {
  /** Dot-notated path (e.g. "user.email", "balance.available") */
  path: string;

  /** Human-readable label (optional — defaults to last segment of path) */
  label?: string;

  /** Change type */
  type: DiffChangeType;

  /** Value before the mutation (null for 'added') */
  before?: string | number | boolean | null;

  /** Value after the mutation (null for 'removed') */
  after?: string | number | boolean | null;
}

/** Group of related diff entries */
export interface DiffGroup {
  /** Group label (e.g. "User Profile", "Account Balance") */
  label: string;

  /** Entries in this group */
  entries: DiffEntry[];
}

export interface StateDiffProps {
  /** Title of the diff (e.g. "Database Mutation", "Ledger Update") */
  title: string;

  /** Optional description of the mutation context */
  description?: string;

  /** Flat list of diff entries (used if groups is not provided) */
  entries?: DiffEntry[];

  /** Grouped diff entries (takes precedence over entries) */
  groups?: DiffGroup[];

  /** Whether to show only changed entries (hide 'unchanged') */
  hideUnchanged?: boolean;

  /** Whether entries start collapsed (default: false) */
  defaultCollapsed?: boolean;

  /** Total number of fields affected (badge display) */
  changeCount?: number;

  /** Timestamp of the mutation */
  timestamp?: string;

  /** ID of the tool call or step that triggered this mutation */
  sourceId?: string;

  /** Additional CSS class */
  className?: string;
}
