/**
 * ArtifactCard — Displays an artifact produced by agent execution.
 *
 * Shows title, type badge, content preview (with truncation + expand),
 * metadata, export actions, and provenance chain (sourceStepId / toolCallIds).
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 6)
 */

import { useState } from 'react';
import type { ArtifactCardProps, ExportFormat } from './ArtifactCard.types';
import styles from './ArtifactCard.module.css';

// ---------------------------------------------------------------------------
// Type icon map
// ---------------------------------------------------------------------------

const TYPE_ICONS: Record<string, string> = {
  markdown: '📝',
  json: '{ }',
  csv: '📊',
  code: '< >',
  other: '📄',
};

const FORMAT_LABELS: Record<ExportFormat, string> = {
  markdown: 'MD',
  json: 'JSON',
  csv: 'CSV',
  pr: 'PR',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function truncateId(id: string, maxLength = 12): string {
  if (id.length <= maxLength) return id;
  return `${id.slice(0, maxLength)}...`;
}

// ---------------------------------------------------------------------------
// ArtifactCard Component
// ---------------------------------------------------------------------------

export function ArtifactCard({
  artifact,
  exportFormats,
  onExport,
  showPreview = true,
  maxPreviewHeight = '12rem',
  className,
}: ArtifactCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const hasMetadata = artifact.metadata && Object.keys(artifact.metadata).length > 0;
  const hasProvenance = artifact.sourceStepId || (artifact.toolCallIds && artifact.toolCallIds.length > 0);

  return (
    <article
      className={`${styles.artifactCard} ${className ?? ''}`}
      aria-label={`Artifact: ${artifact.title}`}
    >
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.typeIcon} aria-hidden="true">
          {TYPE_ICONS[artifact.type] ?? TYPE_ICONS.other}
        </span>
        <div className={styles.headerContent}>
          <h3 className={styles.title}>{artifact.title}</h3>
          <span className={styles.typeBadge}>{artifact.type}</span>
        </div>
      </div>

      {/* Content preview */}
      {showPreview && artifact.content && (
        <div className={styles.previewContainer}>
          <div
            className={styles.preview}
            style={{
              maxHeight: isExpanded ? 'none' : maxPreviewHeight,
              overflow: isExpanded ? 'visible' : 'hidden',
            }}
          >
            {artifact.content}
          </div>
          {!isExpanded && <div className={styles.previewFade} />}
          <button
            className={styles.showMore}
            onClick={toggleExpand}
            aria-expanded={isExpanded}
            type="button"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        </div>
      )}

      {/* Metadata */}
      {hasMetadata && (
        <div className={styles.metadata}>
          <table className={styles.metadataTable}>
            <tbody>
              {Object.entries(artifact.metadata!).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Export actions */}
      {exportFormats && exportFormats.length > 0 && (
        <div className={styles.exportActions}>
          <span className={styles.exportLabel}>Export:</span>
          {exportFormats.map((fmt) => (
            <button
              key={fmt}
              className={styles.exportBtn}
              onClick={() => onExport?.(fmt)}
              aria-label={`Export as ${FORMAT_LABELS[fmt]}`}
              type="button"
            >
              {FORMAT_LABELS[fmt]}
            </button>
          ))}
        </div>
      )}

      {/* Provenance */}
      {hasProvenance && (
        <div className={styles.provenance}>
          {artifact.sourceStepId && (
            <span title={artifact.sourceStepId}>Step: {truncateId(artifact.sourceStepId)}</span>
          )}
          {artifact.toolCallIds && artifact.toolCallIds.length > 0 && (
            <span>
              Tools:{' '}
              {artifact.toolCallIds.map((id, index) => (
                <span key={id} title={id}>
                  {truncateId(id)}
                  {index < artifact.toolCallIds!.length - 1 ? ', ' : ''}
                </span>
              ))}
            </span>
          )}
        </div>
      )}
    </article>
  );
}
