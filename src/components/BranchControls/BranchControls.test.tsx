import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { BranchControls } from './BranchControls';

describe('BranchControls', () => {
  describe('rendering', () => {
    it('renders the branch name', () => {
      render(<BranchControls branchName="branch-auth-3a" status="running" />);
      expect(screen.getByText(/branch-auth-3a/)).toBeInTheDocument();
    });

    it('renders status indicator', () => {
      render(<BranchControls branchName="branch-x" status="running" />);
      expect(screen.getByText(/running/i)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<BranchControls branchName="b" status="running" className="my-controls" />);
      expect(container.firstChild).toHaveClass('my-controls');
    });
  });

  describe('states', () => {
    it('shows Pause button when running', () => {
      render(<BranchControls branchName="b" status="running" onPause={vi.fn()} />);
      expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
    });

    it('shows Resume button when paused', () => {
      render(<BranchControls branchName="b" status="paused" onResume={vi.fn()} />);
      expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();
    });

    it('hides Quarantine button when already quarantined', () => {
      render(<BranchControls branchName="b" status="quarantined" onQuarantine={vi.fn()} />);
      expect(screen.queryByRole('button', { name: /quarantine/i })).not.toBeInTheDocument();
    });

    it('shows Quarantine button when running', () => {
      render(<BranchControls branchName="b" status="running" onQuarantine={vi.fn()} />);
      expect(screen.getByRole('button', { name: /quarantine/i })).toBeInTheDocument();
    });

    it('shows Throttle button when callback is provided', () => {
      render(<BranchControls branchName="b" status="running" onThrottle={vi.fn()} />);
      expect(screen.getByRole('button', { name: /throttle/i })).toBeInTheDocument();
    });

    it('does not show Throttle button when callback is absent', () => {
      render(<BranchControls branchName="b" status="running" />);
      expect(screen.queryByRole('button', { name: /throttle/i })).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onPause when Pause is clicked', async () => {
      const user = userEvent.setup();
      const handlePause = vi.fn();
      render(<BranchControls branchName="b" status="running" onPause={handlePause} />);

      await user.click(screen.getByRole('button', { name: /pause/i }));
      expect(handlePause).toHaveBeenCalledTimes(1);
    });

    it('calls onResume when Resume is clicked', async () => {
      const user = userEvent.setup();
      const handleResume = vi.fn();
      render(<BranchControls branchName="b" status="paused" onResume={handleResume} />);

      await user.click(screen.getByRole('button', { name: /resume/i }));
      expect(handleResume).toHaveBeenCalledTimes(1);
    });

    it('calls onQuarantine when Quarantine is clicked', async () => {
      const user = userEvent.setup();
      const handleQuarantine = vi.fn();
      render(<BranchControls branchName="b" status="running" onQuarantine={handleQuarantine} />);

      await user.click(screen.getByRole('button', { name: /quarantine/i }));
      expect(handleQuarantine).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when Cancel Branch is clicked', async () => {
      const user = userEvent.setup();
      const handleCancel = vi.fn();
      render(<BranchControls branchName="b" status="running" onCancel={handleCancel} />);

      await user.click(screen.getByRole('button', { name: /cancel branch/i }));
      expect(handleCancel).toHaveBeenCalledTimes(1);
    });

    it('calls onThrottle when Throttle is clicked', async () => {
      const user = userEvent.setup();
      const handleThrottle = vi.fn();
      render(<BranchControls branchName="b" status="running" onThrottle={handleThrottle} />);

      await user.click(screen.getByRole('button', { name: /throttle/i }));
      expect(handleThrottle).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has a region landmark', () => {
      render(<BranchControls branchName="branch-auth-3a" status="running" />);
      expect(screen.getByRole('region', { name: /branch-auth-3a/i })).toBeInTheDocument();
    });
  });
});
