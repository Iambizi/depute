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

const IconDocument = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const IconCode = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const IconData = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const TYPE_ICONS: Record<string, React.ReactNode> = {
  markdown: <IconDocument />,
  json: <IconCode />,
  csv: <IconData />,
  code: <IconCode />,
  other: <IconDocument />,
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
  isStreaming = false,
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
      data-streaming={isStreaming || undefined}
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
