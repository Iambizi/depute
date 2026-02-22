import React from 'react';
import styles from './SubagentCard.module.css';
import type { SubagentCardProps } from './SubagentCard.types';

const STATUS_DOT: Record<string, string> = {
  idle: styles.dotIdle,
  working: styles.dotWorking,
  blocked: styles.dotBlocked,
  failed: styles.dotFailed,
  completed: styles.dotCompleted,
};

const STATUS_TEXT: Record<string, string> = {
  idle: 'Idle',
  working: 'Working',
  blocked: 'Blocked',
  failed: 'Failed',
  completed: 'Done',
};

/**
 * SubagentCard is a dense, condensed card representing a single sub-agent in a swarm.
 * Designed to be embedded inside OrchestratorView or used standalone.
 * Clicking `onExpand` drills down to the agent's full v0 panel (ToolTrace, PlanCard, etc.)
 */
export const SubagentCard: React.FC<SubagentCardProps> = ({
  className,
  agentName,
  role,
  status,
  currentTask,
  planStepCount,
  planStepsCompleted = 0,
  tokensUsed,
  onExpand,
}) => {
  const hasPlan = planStepCount != null && planStepCount > 0;
  const planProgress = hasPlan ? Math.round((planStepsCompleted / planStepCount!) * 100) : 0;

  return (
    <div
      className={`${styles.card} ${styles[`card_${status}`] ?? ''} ${className || ''}`}
      role={onExpand ? 'button' : undefined}
      tabIndex={onExpand ? 0 : undefined}
      onClick={onExpand}
      onKeyDown={onExpand ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onExpand(); } } : undefined}
      aria-label={`${agentName}, ${STATUS_TEXT[status] ?? status}${currentTask ? `, ${currentTask}` : ''}`}
    >
      {/* Top row: status dot + name + action */}
      <div className={styles.header}>
        <div className={styles.identity}>
          <span className={`${styles.dot} ${STATUS_DOT[status] ?? ''} ${status === 'working' ? styles.dotPulsing : ''}`} aria-hidden="true" />
          <div className={styles.nameBlock}>
            <span className={styles.name}>{agentName}</span>
            {role && <span className={styles.role}>{role}</span>}
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={`${styles.statusBadge} ${styles[`badge_${status}`] ?? ''}`}>
            {STATUS_TEXT[status] ?? status}
          </span>
          {onExpand && (
            <button className={styles.expandBtn} onClick={(e) => { e.stopPropagation(); onExpand(); }} aria-label={`Expand ${agentName}`} tabIndex={-1}>
              ↗
            </button>
          )}
        </div>
      </div>

      {/* Current task */}
      {currentTask && (
        <div className={styles.task} title={currentTask}>
          {currentTask}
        </div>
      )}

      {/* Plan progress bar */}
      {hasPlan && (
        <div className={styles.progressRow}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${planProgress}%` }} />
          </div>
          <span className={styles.progressLabel}>{planStepsCompleted}/{planStepCount}</span>
        </div>
      )}

      {/* Footer meta */}
      {tokensUsed != null && (
        <div className={styles.footer}>
          <span className={styles.tokenCount}>{tokensUsed.toLocaleString()} tokens</span>
        </div>
      )}
    </div>
  );
};
