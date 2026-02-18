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
}
