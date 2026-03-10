/**
 * ArtifactCard — Type Definitions
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 6)
 */

import type { Artifact } from '../../types/common';

export type ExportFormat = 'markdown' | 'json' | 'csv' | 'pr';

export interface ArtifactCardProps {
  /** The artifact to display */
  artifact: Artifact;

  /** Available export formats */
  exportFormats?: ExportFormat[];

  /** Called when an export button is clicked */
  onExport?: (format: ExportFormat) => void;

  /** Whether to show a content preview */
  showPreview?: boolean;

  /** Maximum preview height before truncation */
  maxPreviewHeight?: string;

  /**
   * When true, indicates that artifact content is still arriving from a
   * streaming backend. Exposes `data-streaming="true"` on the root element
   * as a CSS hook — the consumer decides how to style the streaming state.
   */
  isStreaming?: boolean;

  /** Additional CSS class */
  className?: string;
}
