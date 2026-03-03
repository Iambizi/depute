'use client';

import { TaskQueue } from '@/depute/components/TaskQueue';
import { generateMockTaskQueue } from '@/depute/utils/mockData';

const tasks = generateMockTaskQueue(6);

export function TaskQueueDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <TaskQueue tasks={tasks} />
    </div>
  );
}
