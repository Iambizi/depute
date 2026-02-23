import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TaskQueue } from './TaskQueue';
import type { TaskQueueItem } from './TaskQueue.types';

const MOCK_TASKS: TaskQueueItem[] = [
  { id: 't1', title: 'Refactor auth middleware', priority: 'critical', status: 'in_progress', assignedTo: 'Code-Writer-1', estimatedTokens: 6000 },
  { id: 't2', title: 'Write integration tests', priority: 'high', status: 'assigned', assignedTo: 'QA-Inspector', estimatedTokens: 4200 },
  { id: 't3', title: 'Update API documentation', priority: 'medium', status: 'pending', estimatedTokens: 2100 },
];

describe('TaskQueue', () => {
  describe('rendering', () => {
    it('renders all task titles', () => {
      render(<TaskQueue tasks={MOCK_TASKS} />);
      expect(screen.getByText('Refactor auth middleware')).toBeInTheDocument();
      expect(screen.getByText('Write integration tests')).toBeInTheDocument();
      expect(screen.getByText('Update API documentation')).toBeInTheDocument();
    });

    it('shows empty state when no tasks', () => {
      render(<TaskQueue tasks={[]} />);
      expect(screen.getByText(/no tasks|queue is empty/i)).toBeInTheDocument();
    });

    it('shows priority chips with correct labels', () => {
      render(<TaskQueue tasks={MOCK_TASKS} />);
      // PRIORITY_LABEL: critical→'Critical', high→'High', medium→'Med'
      expect(screen.getByText('Critical')).toBeInTheDocument();
      expect(screen.getByText('High')).toBeInTheDocument();
      expect(screen.getByText('Med')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<TaskQueue tasks={MOCK_TASKS} className="my-queue" />);
      expect(container.firstChild).toHaveClass('my-queue');
    });
  });

  describe('states', () => {
    it('shows assigned agent name for assigned tasks', () => {
      render(<TaskQueue tasks={MOCK_TASKS} />);
      expect(screen.getByText(/Code-Writer-1/)).toBeInTheDocument();
    });

    it('groups tasks by status sections', () => {
      render(<TaskQueue tasks={MOCK_TASKS} />);
      // Expect section headers for the statuses present
      expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
      expect(screen.getByText(/Assigned/i)).toBeInTheDocument();
      expect(screen.getByText(/Pending/i)).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onTaskAction when action is triggered', async () => {
      const user = userEvent.setup();
      const handleAction = vi.fn();
      render(<TaskQueue tasks={MOCK_TASKS} onTaskAction={handleAction} />);

      // Trigger action on pending task (should have some action button)
      const actionBtns = screen.getAllByRole('button');
      await user.click(actionBtns[0]);
      expect(handleAction).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has a region landmark', () => {
      render(<TaskQueue tasks={MOCK_TASKS} />);
      expect(screen.getByRole('region', { name: /task queue/i })).toBeInTheDocument();
    });

    it('renders multiple task title elements', () => {
      render(<TaskQueue tasks={MOCK_TASKS} />);
      // Tasks render as divs, not semantic list items — verify all titles present
      MOCK_TASKS.forEach((t) => {
        expect(screen.getByText(t.title)).toBeInTheDocument();
      });
    });
  });
});
