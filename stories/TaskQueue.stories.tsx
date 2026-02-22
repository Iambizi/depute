import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TaskQueue } from '../src/components/TaskQueue';
import { generateMockTaskQueue } from '../src/utils/mockData';
import type { TaskQueueItem } from '../src/components/TaskQueue/TaskQueue.types';

const meta: Meta<typeof TaskQueue> = {
  title: 'AX Components v1/TaskQueue',
  component: TaskQueue,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TaskQueue>;

// ============================================================
// SHARED
// ============================================================

export const Default: Story = {
  args: { tasks: generateMockTaskQueue(8) },
};

export const AllPending: Story = {
  name: 'State: All Pending',
  args: {
    tasks: generateMockTaskQueue(5).map((t) => ({ ...t, status: 'pending' as const, assignedTo: undefined })),
  },
};

export const AllInProgress: Story = {
  name: 'State: All In Progress',
  args: {
    tasks: generateMockTaskQueue(4).map((t) => ({ ...t, status: 'in_progress' as const, assignedTo: 'Code-Writer-1' })),
  },
};

export const CriticalFirst: Story = {
  name: 'State: Critical Priority Tasks',
  args: {
    tasks: generateMockTaskQueue(6).map((t, i) => ({
      ...t, priority: i < 2 ? 'critical' as const : t.priority,
    })),
  },
};

export const EmptyQueue: Story = {
  name: 'State: Empty Queue',
  args: { tasks: [] },
};

// ============================================================
// PROTOTYPING
// ============================================================

export const PrototypeInteractive: Story = {
  name: 'Prototype: Assign + Promote Tasks',
  render: () => {
    const [tasks, setTasks] = useState<TaskQueueItem[]>(generateMockTaskQueue(7));

    const handleAction = (id: string, action: 'promote' | 'assign' | 'cancel') => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          if (action === 'assign') return { ...t, status: 'assigned' as const, assignedTo: 'Code-Writer-1' };
          if (action === 'promote') return { ...t, status: 'in_progress' as const };
          return t;
        })
      );
    };

    return <TaskQueue tasks={tasks} onTaskAction={handleAction} />;
  },
};

// ============================================================
// PRODUCTION
// ============================================================

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: {
    tasks: [
      { id: 't1', title: 'Refactor auth middleware', priority: 'critical', status: 'in_progress', assignedTo: 'Code-Writer-1', estimatedTokens: 6000 },
      { id: 't2', title: 'Write integration tests for billing', priority: 'high', status: 'assigned', assignedTo: 'QA-Inspector', estimatedTokens: 4200 },
      { id: 't3', title: 'Document new API endpoints', priority: 'medium', status: 'pending', estimatedTokens: 2100 },
      { id: 't4', title: 'Optimize database query performance', priority: 'low', status: 'pending', estimatedTokens: 3500 },
    ] satisfies TaskQueueItem[],
  },
};
