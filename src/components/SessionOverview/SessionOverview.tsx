import React from 'react';
import styles from './SessionOverview.module.css';

export interface SurfaceTouched {
  type: 'file' | 'api' | 'database' | 'system';
  label: string;
  action: 'read' | 'write' | 'execute';
}

export interface KeyDecision {
  description: string;
}

export interface SessionOverviewProps {
  /** High-level semantic summary of what the agent achieved */
  sessionSummary: string;
  /** Total elapsed time of the agent session */
  duration: string;
  /** Which digital surfaces the agent interacted with */
  surfacesTouched: SurfaceTouched[];
  /** Significant decisions or path deviations made autonomously */
  keyDecisions?: KeyDecision[];
  /** Optional CSS class name */
  className?: string;
}

function getSurfaceIcon(type: SurfaceTouched['type']) {
  switch (type) {
    case 'file':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      );
    case 'api':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        </svg>
      );
    case 'database':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      );
    case 'system':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      );
  }
}

export function SessionOverview({
  sessionSummary,
  duration,
  surfacesTouched,
  keyDecisions = [],
  className = '',
}: SessionOverviewProps) {
  return (
    <div className={`${styles.container} ${className}`} data-testid="ax-session-overview">
      <div className={styles.header}>
        <div className={styles.title}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
          Session Overview
        </div>
        <div className={styles.duration}>{duration}</div>
      </div>

      <div className={styles.body}>
        <div className={styles.summaryBlock}>{sessionSummary}</div>

        <div className={styles.grid}>
          <div className={styles.surfacesGroup}>
            <div className={styles.sectionTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Impacted Surfaces
            </div>
            <div className={styles.surfacesList}>
              {surfacesTouched.map((surface, i) => (
                <div key={i} className={styles.surfaceItem}>
                  <div className={styles.surfaceLabel}>
                    <span className={styles.surfaceType}>{getSurfaceIcon(surface.type)}</span>
                    <span>{surface.label}</span>
                  </div>
                  <span className={`${styles.surfaceAction} ${styles[surface.action]}`}>
                    {surface.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {keyDecisions.length > 0 && (
            <div className={styles.decisionsGroup}>
              <div className={styles.sectionTitle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                Key AI Decisions
              </div>
              <div className={styles.decisionsList}>
                {keyDecisions.map((decision, i) => (
                  <div key={i} className={styles.decisionItem}>
                    {decision.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
