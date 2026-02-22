export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'assigned' | 'in_progress';

export interface TaskQueueItem {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  /** Agent the task is assigned to, if any */
  assignedTo?: string;
  status: TaskStatus;
  estimatedTokens?: number;
}

export interface TaskQueueProps {
  /** The root layout class name */
  className?: string;
  /** List of tasks in the backlog queue */
  tasks?: TaskQueueItem[];
  /** Callback when a user acts on a task */
  onTaskAction?: (id: string, action: 'promote' | 'assign' | 'cancel') => void;
}
