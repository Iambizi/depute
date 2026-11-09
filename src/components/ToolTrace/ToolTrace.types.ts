/**
 * ToolTrace — Type Definitions
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 5)
 */

import type { ToolCall } from '../../types/common';

export interface ToolTraceProps {
  /** Array of tool calls to display */
  calls: ToolCall[];

  /** Whether to auto-scroll to latest entry */
  autoScroll?: boolean;

  /** Maximum height before scrolling */
  maxHeight?: string;

  /** Called when a tool call entry is clicked */
  onEntryClick?: (call: ToolCall) => void;

  /** Whether entries are expandable to show input/output */
  expandable?: boolean;

  /** Additional CSS class */
  className?: string;

  /** How long a quiet run may last before the trace warns. Unix milliseconds. */
  expectedIntervalMs?: number;

  /** Unix milliseconds of the last run the host observed. */
  lastRunAt?: number;

  /** Unix milliseconds. The stale warning stays off until this is set. */
  nowMs?: number;

  /** Fires when the last run is older than the expected interval. */
  onStale?: () => void;
}
