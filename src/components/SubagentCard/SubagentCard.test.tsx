import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SubagentCard } from './SubagentCard';

const BASE_PROPS = {
  agentName: 'Code-Writer-1',
  role: 'Code Writer',
  status: 'working' as const,
  currentTask: 'Writing unit tests for auth module',
  planStepCount: 6,
  planStepsCompleted: 3,
  tokensUsed: 12400,
};

describe('SubagentCard', () => {
  describe('rendering', () => {
    it('renders agent name and role', () => {
      render(<SubagentCard {...BASE_PROPS} />);
      expect(screen.getByText('Code-Writer-1')).toBeInTheDocument();
      expect(screen.getByText('Code Writer')).toBeInTheDocument();
    });

    it('renders current task when provided', () => {
      render(<SubagentCard {...BASE_PROPS} />);
      expect(screen.getByText('Writing unit tests for auth module')).toBeInTheDocument();
    });

    it('does not render task section when currentTask is absent', () => {
      render(<SubagentCard {...BASE_PROPS} currentTask={undefined} status="idle" />);
      expect(screen.queryByText('Writing unit tests for auth module')).not.toBeInTheDocument();
    });

    it('renders token count', () => {
      render(<SubagentCard {...BASE_PROPS} />);
      expect(screen.getByText(/12,400 tokens/)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<SubagentCard {...BASE_PROPS} className="my-card" />);
      expect(container.firstChild).toHaveClass('my-card');
    });
  });

  describe('states', () => {
    it('shows Working status badge', () => {
      render(<SubagentCard {...BASE_PROPS} status="working" />);
      // STATUS_TEXT maps 'working' → 'Working'
      expect(screen.getByText('Working')).toBeInTheDocument();
    });

    it('shows Blocked status badge', () => {
      render(<SubagentCard {...BASE_PROPS} status="blocked" />);
      expect(screen.getByText('Blocked')).toBeInTheDocument();
    });

    it('shows Failed status badge', () => {
      render(<SubagentCard {...BASE_PROPS} status="failed" />);
      expect(screen.getByText('Failed')).toBeInTheDocument();
    });

    it('shows plan step progress label', () => {
      render(<SubagentCard {...BASE_PROPS} />);
      // Progress is shown as "3/6"
      expect(screen.getByText('3/6')).toBeInTheDocument();
    });

    it('shows 0 tokens gracefully', () => {
      render(<SubagentCard {...BASE_PROPS} tokensUsed={0} />);
      expect(screen.getByText(/0 tokens/)).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onExpand when expand button is clicked', async () => {
      const user = userEvent.setup();
      const handleExpand = vi.fn();
      render(<SubagentCard {...BASE_PROPS} onExpand={handleExpand} />);

      const expandBtn = screen.getByRole('button', { name: /Expand Code-Writer-1/i });
      await user.click(expandBtn);
      expect(handleExpand).toHaveBeenCalledTimes(1);
    });

    it('card itself is a button when onExpand present', () => {
      render(<SubagentCard {...BASE_PROPS} onExpand={vi.fn()} />);
      // The card div gets role="button" when onExpand is provided
      expect(screen.getByRole('button', { name: /Code-Writer-1, Working/i })).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('card has accessible aria-label when interactive', () => {
      render(<SubagentCard {...BASE_PROPS} onExpand={vi.fn()} />);
      expect(screen.getByRole('button', { name: /Code-Writer-1, Working/i })).toBeInTheDocument();
    });

    it('step progress label is visible', () => {
      render(<SubagentCard {...BASE_PROPS} />);
      expect(screen.getByText('3/6')).toBeInTheDocument();
    });
  });
});
