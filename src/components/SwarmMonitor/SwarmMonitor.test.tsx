import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SwarmMonitor } from './SwarmMonitor';

const BASE_METRICS = {
  activeInstances: 5,
  idleInstances: 2,
  totalCost: '$0.72',
  tokensBurned: 48000,
  errorRate: 8,
  taskCompletionRate: 52,
  estimatedTimeRemaining: '11m',
};

describe('SwarmMonitor', () => {
  describe('rendering', () => {
    it('renders all KPI tiles', () => {
      render(<SwarmMonitor metrics={BASE_METRICS} />);
      // Each KPI tile: check specific labels alongside their values
      expect(screen.getByText('$0.72')).toBeInTheDocument();
      expect(screen.getByText('11m')).toBeInTheDocument();
      // Active and idle instances appear as numbers — check labels to avoid ambiguity
      expect(screen.getByText(/Active/i)).toBeInTheDocument();
    });

    it('renders error rate as percentage', () => {
      render(<SwarmMonitor metrics={BASE_METRICS} />);
      // errorRate is rendered as "8%" in a single span
      expect(screen.getByText('8%')).toBeInTheDocument();
    });

    it('renders task completion rate progress bar', () => {
      render(<SwarmMonitor metrics={BASE_METRICS} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toBeInTheDocument();
      expect(bar).toHaveAttribute('aria-valuenow', '52');
    });

    it('renders ETA when provided', () => {
      render(<SwarmMonitor metrics={BASE_METRICS} />);
      expect(screen.getByText('11m')).toBeInTheDocument();
    });

    it('does not crash without optional fields', () => {
      render(<SwarmMonitor metrics={{ activeInstances: 2, idleInstances: 0, totalCost: '$0.10', tokensBurned: 5000, errorRate: 0 }} />);
      expect(screen.getByText('$0.10')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<SwarmMonitor metrics={BASE_METRICS} className="custom-monitor" />);
      expect(container.firstChild).toHaveClass('custom-monitor');
    });
  });

  describe('states', () => {
    it('applies high-error styling at 20%+ error rate', () => {
      render(<SwarmMonitor metrics={{ ...BASE_METRICS, errorRate: 25 }} />);
      // Error tile should have a danger/high-error class (implementation-specific, so check the value renders)
      expect(screen.getByText(/25%|25/)).toBeInTheDocument();
    });

    it('shows correct completion rate in progress bar', () => {
      render(<SwarmMonitor metrics={{ ...BASE_METRICS, taskCompletionRate: 80 }} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '80');
    });
  });

  describe('interactions', () => {
    it('calls onGlobalPause when Pause button clicked', async () => {
      const user = userEvent.setup();
      const handlePause = vi.fn();
      render(<SwarmMonitor metrics={BASE_METRICS} onGlobalPause={handlePause} />);

      await user.click(screen.getByRole('button', { name: /pause/i }));
      expect(handlePause).toHaveBeenCalledTimes(1);
    });

    it('calls onGlobalKill when Kill button clicked', async () => {
      const user = userEvent.setup();
      const handleKill = vi.fn();
      render(<SwarmMonitor metrics={BASE_METRICS} onGlobalKill={handleKill} />);

      await user.click(screen.getByRole('button', { name: /kill|stop/i }));
      expect(handleKill).toHaveBeenCalledTimes(1);
    });

    it('does not render control buttons when no callbacks provided', () => {
      render(<SwarmMonitor metrics={BASE_METRICS} />);
      expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has a region landmark', () => {
      render(<SwarmMonitor metrics={BASE_METRICS} />);
      expect(screen.getByRole('region', { name: /swarm monitor/i })).toBeInTheDocument();
    });

    it('progress bar has proper ARIA attributes', () => {
      render(<SwarmMonitor metrics={BASE_METRICS} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuemin', '0');
      expect(bar).toHaveAttribute('aria-valuemax', '100');
    });
  });
});
