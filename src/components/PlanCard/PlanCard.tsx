/**
 * PlanCard — Displays a proposed plan with steps, assumptions, and reasoning.
 *
 * The first v0 primitive for AX Components. Renders a vertical step list
 * with status icons, optional confidence badges, and expandable sections
 * for assumptions and agent reasoning.
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 1)
 * @see docs/orchestration/05-interface-states.md (PlanCard state matrix)
 */

import { useState, useMemo } from 'react';
import type { PlanStep, PlanStepStatus } from '../../types/common';
import { getConfidenceLevel } from '../../types/common';
import { VisuallyHidden, useAnnouncer } from '../../utils/a11y';
import type { PlanCardProps } from './PlanCard.types';
import styles from './PlanCard.module.css';

// ---------------------------------------------------------------------------
// Status icon map
// ---------------------------------------------------------------------------

const STATUS_ICONS: Record<PlanStepStatus, string> = {
  pending: '○',
  active: '●',
  completed: '✓',
  failed: '✕',
};

const STATUS_ICON_CLASSES: Record<PlanStepStatus, string> = {
  pending: styles.stepIconPending,
  active: styles.stepIconActive,
  completed: styles.stepIconCompleted,
  failed: styles.stepIconFailed,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getProgressLabel(
  steps: PlanStep[],
  mode: 'determinate' | 'indeterminate',
  title: string
): string {
  const completed = steps.filter((s) => s.status === 'completed').length;
  const failed = steps.filter((s) => s.status === 'failed').length;
  const active = steps.find((s) => s.status === 'active');

  if (steps.length === 0) return 'No plan available';

  if (failed > 0) {
    const failedStep = steps.find((s) => s.status === 'failed');
    return `Plan: ${title}, step ${failedStep?.label ?? ''} failed`;
  }

  if (completed === steps.length) {
    return `Plan: ${title}, all ${steps.length} steps completed`;
  }

  if (active) {
    const activeIndex = steps.indexOf(active) + 1;
    return mode === 'determinate'
      ? `Plan: ${title}, step ${activeIndex} of ${steps.length} in progress`
      : `Plan: ${title}, ${completed} steps completed, more expected`;
  }

  return `Plan: ${title}, ${steps.length} steps pending`;
}

// ---------------------------------------------------------------------------
// PlanCard Component
// ---------------------------------------------------------------------------

export function PlanCard({
  title,
  steps,
  mode = 'determinate',
  assumptions,
  reasoning,
  activeStepId,
  onStepClick,
  showConfidence = false,
  className,
}: PlanCardProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => new Set()
  );
  const [announce, AnnouncerRegion] = useAnnouncer();

  // Compute progress
  const completedCount = useMemo(
    () => steps.filter((s) => s.status === 'completed').length,
    [steps]
  );

  const progressText =
    mode === 'determinate'
      ? `${completedCount} / ${steps.length}`
      : `${completedCount} completed`;

  const ariaLabel = useMemo(
    () => getProgressLabel(steps, mode, title),
    [steps, mode, title]
  );

  // Determine which step is active (prop override or first active step)
  const resolvedActiveId = useMemo(() => {
    if (activeStepId) return activeStepId;
    return steps.find((s) => s.status === 'active')?.id ?? null;
  }, [activeStepId, steps]);

  // Toggle expandable sections
  const toggleSection = (key: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Handle step click
  const handleStepClick = (step: PlanStep) => {
    if (onStepClick) {
      onStepClick(step);
      announce(`Selected step: ${step.label}`);
    }
  };

  const handleStepKeyDown = (
    event: React.KeyboardEvent,
    step: PlanStep
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleStepClick(step);
    }
  };

  // Empty state
  if (steps.length === 0) {
    return (
      <div
        className={`${styles.planCard} ${className ?? ''}`}
        role="region"
        aria-label="No plan available"
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.emptyState}>No plan steps available</div>
        <AnnouncerRegion />
      </div>
    );
  }

  return (
    <div
      className={`${styles.planCard} ${className ?? ''}`}
      role="region"
      aria-label={ariaLabel}
    >
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.progress} aria-hidden="true">
          {progressText}
        </span>
        <VisuallyHidden>{ariaLabel}</VisuallyHidden>
      </div>

      {/* Step list */}
      <ol className={styles.stepList} aria-label={`Steps for ${title}`}>
        {steps.map((step) => {
          const isActive = step.id === resolvedActiveId;
          const isClickable = !!onStepClick;

          return (
            <li
              key={step.id}
              className={`${styles.step} ${isClickable ? styles.stepClickable : ''}`}
              aria-current={isActive ? 'step' : undefined}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onClick={isClickable ? () => handleStepClick(step) : undefined}
              onKeyDown={
                isClickable
                  ? (e) => handleStepKeyDown(e, step)
                  : undefined
              }
            >
              {/* Status icon */}
              <span
                className={`${styles.stepIcon} ${STATUS_ICON_CLASSES[step.status]}`}
                aria-hidden="true"
              >
                {STATUS_ICONS[step.status]}
              </span>

              {/* Step content */}
              <div className={styles.stepContent}>
                <span
                  className={`${styles.stepLabel} ${
                    step.status === 'failed' ? styles.stepLabelFailed : ''
                  }`}
                >
                  {step.label}
                </span>

                {step.description && (
                  <div className={styles.stepDescription}>
                    {step.description}
                  </div>
                )}

                {/* Show reasoning for active step */}
                {isActive && step.reasoning && (
                  <div className={styles.stepReasoning}>{step.reasoning}</div>
                )}
              </div>

              {/* Confidence badge */}
              {showConfidence && step.confidence != null && (
                <span
                  className={`${styles.confidenceBadge} ${
                    {
                      high: styles.confidenceHigh,
                      medium: styles.confidenceMedium,
                      low: styles.confidenceLow,
                    }[getConfidenceLevel(step.confidence)]
                  }`}
                  aria-label={`Confidence: ${step.confidence}%`}
                >
                  {step.confidence}%
                </span>
              )}
            </li>
          );
        })}

        {/* Indeterminate indicator */}
        {mode === 'indeterminate' && (
          <li className={styles.indeterminateIndicator} aria-hidden="true">
            • • •
          </li>
        )}
      </ol>

      {/* Assumptions / Reasoning sections */}
      {(assumptions?.length || reasoning) && (
        <div className={styles.footer}>
          {assumptions && assumptions.length > 0 && (
            <div>
              <button
                className={styles.sectionToggle}
                onClick={() => toggleSection('assumptions')}
                aria-expanded={expandedSections.has('assumptions')}
              >
                <span
                  className={`${styles.chevron} ${
                    expandedSections.has('assumptions')
                      ? styles.chevronOpen
                      : ''
                  }`}
                  aria-hidden="true"
                >
                  ▶
                </span>
                Assumptions ({assumptions.length})
              </button>
              {expandedSections.has('assumptions') && (
                <div className={styles.sectionContent}>
                  <ul className={styles.assumptionList}>
                    {assumptions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {reasoning && (
            <div>
              <button
                className={styles.sectionToggle}
                onClick={() => toggleSection('reasoning')}
                aria-expanded={expandedSections.has('reasoning')}
              >
                <span
                  className={`${styles.chevron} ${
                    expandedSections.has('reasoning')
                      ? styles.chevronOpen
                      : ''
                  }`}
                  aria-hidden="true"
                >
                  ▶
                </span>
                Reasoning
              </button>
              {expandedSections.has('reasoning') && (
                <div className={styles.sectionContent}>{reasoning}</div>
              )}
            </div>
          )}
        </div>
      )}

      <AnnouncerRegion />
    </div>
  );
}
