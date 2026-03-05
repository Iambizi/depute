/**
 * ToolTrace — Vertical timeline of tool calls.
 *
 * Shows tool name, status, duration, and optionally input/output JSON.
 * Supports auto-scroll for streaming and policy flag badges.
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 5)
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { VisuallyHidden, useAnnouncer } from '../../utils/a11y';
import type { ToolTraceProps } from './ToolTrace.types';
import styles from './ToolTrace.module.css';

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: '',
  running: '',
  completed: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  failed: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
};

const STATUS_DOT_CLASSES: Record<string, string> = {
  pending: styles.dotPending,
  running: styles.dotRunning,
  completed: styles.dotCompleted,
  failed: styles.dotFailed,
};

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

// ---------------------------------------------------------------------------
// ToolTrace Component
// ---------------------------------------------------------------------------

export function ToolTrace({
  calls,
  autoScroll = true,
  maxHeight = '24rem',
  onEntryClick,
  expandable = true,
  className,
}: ToolTraceProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const [announce, AnnouncerRegion] = useAnnouncer();
  const prevCountRef = useRef(calls.length);

  // Auto-scroll on new entries
  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return;
    if (calls.length > prevCountRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    prevCountRef.current = calls.length;
  }, [calls.length, autoScroll]);

  // Announce new entries
  useEffect(() => {
    if (calls.length > 0) {
      const latest = calls[calls.length - 1];
      if (latest.status === 'completed') {
        announce(`${latest.name} completed${latest.duration ? ` in ${formatDuration(latest.duration)}` : ''}`);
      } else if (latest.status === 'failed') {
        announce(`${latest.name} failed: ${latest.error ?? 'unknown error'}`);
      } else if (latest.status === 'running') {
        announce(`${latest.name} started`);
      }
    }
  }, [calls, announce]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  if (calls.length === 0) {
    return (
      <div
        className={`${styles.toolTrace} ${className ?? ''}`}
        role="log"
        aria-label="Tool trace"
      >
        <div className={styles.emptyState}>No tool calls yet</div>
        <AnnouncerRegion />
      </div>
    );
  }

  return (
    <div
      className={`${styles.toolTrace} ${className ?? ''}`}
      role="log"
      aria-label="Tool trace"
    >
      <div
        ref={scrollRef}
        className={styles.scrollContainer}
        style={{ maxHeight }}
      >
        <ol className={styles.timeline} aria-label="Tool call timeline">
          {calls.map((call) => {
            const isExpanded = expandedIds.has(call.id);
            const isClickable = !!onEntryClick;
            const hasDetails = expandable && (call.input || call.output);

            return (
              <li
                key={call.id}
                className={`${styles.entry} ${isClickable ? styles.entryClickable : ''}`}
                onClick={isClickable ? () => onEntryClick(call) : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={
                  isClickable
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onEntryClick(call);
                        }
                      }
                    : undefined
                }
              >
                {/* Status dot */}
                <span
                  className={`${styles.dot} ${STATUS_DOT_CLASSES[call.status]}`}
                  aria-hidden="true"
                >
                  {STATUS_ICONS[call.status]}
                </span>

                <div className={styles.entryContent}>
                  <div className={styles.entryHeader}>
                    <span className={styles.toolName}>{call.name}</span>
                    {call.duration != null && (
                      <span className={styles.duration}>
                        {formatDuration(call.duration)}
                      </span>
                    )}
                  </div>

                  {/* Error message */}
                  {call.error && (
                    <div className={styles.errorMessage}>{call.error}</div>
                  )}

                  {/* Policy flags */}
                  {call.policyFlags && (
                    <div className={styles.policyFlags}>
                      {call.policyFlags.requiresApproval && (
                        <span className={styles.policyBadge}>approval</span>
                      )}
                      {call.policyFlags.writesState && (
                        <span className={styles.policyBadge}>writes</span>
                      )}
                      {call.policyFlags.externalAction && (
                        <span className={styles.policyBadge}>external</span>
                      )}
                    </div>
                  )}

                  {/* Expandable input/output */}
                  {hasDetails && (
                    <>
                      <button
                        className={styles.expandToggle}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(call.id);
                        }}
                        aria-expanded={isExpanded}
                        type="button"
                      >
                        <span
                          className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}
                          aria-hidden="true"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </span>
                        Details
                      </button>

                      {isExpanded && (
                        <div className={styles.expandedContent}>
                          {call.input && (
                            <>
                              <div className={styles.jsonLabel}>Input</div>
                              <pre className={styles.jsonBlock}>
                                {JSON.stringify(call.input, null, 2)}
                              </pre>
                            </>
                          )}
                          {call.output && (
                            <>
                              <div className={styles.jsonLabel}>Output</div>
                              <pre className={styles.jsonBlock}>
                                {JSON.stringify(call.output, null, 2)}
                              </pre>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <VisuallyHidden>
        <AnnouncerRegion />
      </VisuallyHidden>
    </div>
  );
}
