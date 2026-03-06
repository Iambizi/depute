import React from 'react';
import styles from './TaskQueue.module.css';
import type { TaskQueueItem, TaskQueueProps, TaskPriority } from './TaskQueue.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PRIORITY_CLASS: Record<TaskPriority, string> = {
  critical: styles.priorityCritical,
  high: styles.priorityHigh,
  medium: styles.priorityMedium,
  low: styles.priorityLow,
};

const PRIORITY_LABEL: Record<TaskPriority, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Med',
  low: 'Low',
};

// ---------------------------------------------------------------------------
// TaskRow
// ---------------------------------------------------------------------------

interface TaskRowProps {
  task: TaskQueueItem;
  onTaskAction?: TaskQueueProps['onTaskAction'];
}

function TaskRow({ task, onTaskAction }: TaskRowProps) {
  return (
    <div className={`${styles.taskRow} ${styles[`row_${task.status}`] ?? ''}`}>
      {/* Priority chip */}
      <span className={`${styles.priorityChip} ${PRIORITY_CLASS[task.priority] ?? ''}`}>
        {PRIORITY_LABEL[task.priority]}
      </span>

      {/* Content */}
      <div className={styles.taskContent}>
        <span className={styles.taskTitle}>{task.title}</span>
        {task.description && (
          <span className={styles.taskDesc}>{task.description}</span>
        )}
        <div className={styles.taskMeta}>
          {task.assignedTo && (
            <span className={styles.metaItem}>→ {task.assignedTo}</span>
          )}
          {task.estimatedTokens != null && (
            <span className={styles.metaItem}>~{task.estimatedTokens.toLocaleString()} tok</span>
          )}
        </div>
      </div>

      {/* Actions */}
      {onTaskAction && (
        <div className={styles.actions}>
          {task.status === 'pending' && (
            <button
              className={styles.btnPromote}
              onClick={() => onTaskAction(task.id, 'promote')}
              title="Promote to top"
            >
              ↑
            </button>
          )}
          {task.status !== 'in_progress' && (
            <button
              className={styles.btnAssign}
              onClick={() => onTaskAction(task.id, 'assign')}
              title="Assign to agent"
            >
              ⊕
            </button>
          )}
          <button
            className={styles.btnCancel}
            onClick={() => onTaskAction(task.id, 'cancel')}
            title="Cancel task"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TaskQueue
// ---------------------------------------------------------------------------

/**
 * TaskQueue renders the backlog of pending tasks awaiting assignment to available workers.
 */
export const TaskQueue: React.FC<TaskQueueProps> = ({
  className,
  tasks = [],
  onTaskAction,
}) => {
  const pending = tasks.filter((t) => t.status === 'pending');
  const assigned = tasks.filter((t) => t.status === 'assigned');
  const inProgress = tasks.filter((t) => t.status === 'in_progress');

  const renderSection = (label: string, items: TaskQueueItem[], count: number) => (
    items.length > 0 && (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>{label}</span>
          <span className={styles.sectionCount}>{count}</span>
        </div>
        {items.map((task) => (
          <TaskRow key={task.id} task={task} onTaskAction={onTaskAction} />
        ))}
      </div>
    )
  );

  return (
    <div
      className={`${styles.base} ${className || ''}`}
      role="region"
      aria-label="Task Queue"
    >
      <div className={styles.header}>
        <span className={styles.title}>Task Queue</span>
        <span className={styles.totalBadge}>{tasks.length} tasks</span>
      </div>

      {tasks.length === 0 ? (
        <div className={styles.empty}>Queue is empty.</div>
      ) : (
        <div className={styles.body}>
          {renderSection('In Progress', inProgress, inProgress.length)}
          {renderSection('Assigned', assigned, assigned.length)}
          {renderSection('Pending', pending, pending.length)}
        </div>
      )}
    </div>
  );
};
