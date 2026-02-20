import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RunControls } from './RunControls';

describe('RunControls', () => {
  describe('rendering', () => {
    it('renders with required props', () => {
      render(<RunControls state="idle" />);
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
      expect(screen.getByText('Idle')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    });

    it('renders with all optional props', () => {
      render(
        <RunControls
          state="running"
          showLabel={false}
          actions={<button>Custom Action</button>}
          className="custom-controls"
        />
      );
      expect(screen.queryByText('Running')).not.toBeInTheDocument(); // label is visually hidden or not rendered
      // The visually hidden text still contains the state
      expect(screen.getByText('Current state: Running')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Custom Action' })).toBeInTheDocument();
      expect(screen.getByRole('toolbar')).toHaveClass('custom-controls');
    });

    it('applies custom className', () => {
      render(<RunControls state="idle" className="test-class" />);
      expect(screen.getByRole('toolbar')).toHaveClass('test-class');
    });
  });

  describe('states', () => {
    it('displays idle state correctly', () => {
      render(<RunControls state="idle" />);
      expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Pause' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Stop' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Retry' })).not.toBeInTheDocument();
    });

    it('displays running state correctly', () => {
      render(<RunControls state="running" />);
      expect(screen.queryByRole('button', { name: 'Start' })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
    });

    it('displays paused state correctly', () => {
      render(<RunControls state="paused" />);
      // In paused state, the play button is labeled "Resume"
      expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Pause' })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
    });

    it('displays completed state correctly', () => {
      render(<RunControls state="completed" />);
      // No buttons should be visible in completed state
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('displays failed state correctly', () => {
      render(<RunControls state="failed" />);
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Start' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Stop' })).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onStart when Start is clicked', async () => {
      const user = userEvent.setup();
      const onStart = vi.fn();
      render(<RunControls state="idle" onStart={onStart} />);
      
      await user.click(screen.getByRole('button', { name: 'Start' }));
      expect(onStart).toHaveBeenCalledTimes(1);
    });

    it('calls onStart when Resume is clicked', async () => {
      const user = userEvent.setup();
      const onStart = vi.fn();
      render(<RunControls state="paused" onStart={onStart} />);
      
      await user.click(screen.getByRole('button', { name: 'Resume' }));
      expect(onStart).toHaveBeenCalledTimes(1);
    });

    it('calls onPause when Pause is clicked', async () => {
      const user = userEvent.setup();
      const onPause = vi.fn();
      render(<RunControls state="running" onPause={onPause} />);
      
      await user.click(screen.getByRole('button', { name: 'Pause' }));
      expect(onPause).toHaveBeenCalledTimes(1);
    });

    it('calls onStop when Stop is clicked', async () => {
      const user = userEvent.setup();
      const onStop = vi.fn();
      render(<RunControls state="running" onStop={onStop} />);
      
      await user.click(screen.getByRole('button', { name: 'Stop' }));
      expect(onStop).toHaveBeenCalledTimes(1);
    });

    it('calls onRetry when Retry is clicked', async () => {
      const user = userEvent.setup();
      const onRetry = vi.fn();
      render(<RunControls state="failed" onRetry={onRetry} />);
      
      await user.click(screen.getByRole('button', { name: 'Retry' }));
      expect(onRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA role', () => {
      render(<RunControls state="idle" />);
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });

    it('has correct ARIA labels for buttons', () => {
      const { rerender } = render(<RunControls state="running" />);
      expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();

      rerender(<RunControls state="failed" />);
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    });

    it('provides a descriptive aria-label on the toolbar', () => {
      render(<RunControls state="idle" />);
      expect(screen.getByRole('toolbar')).toHaveAttribute('aria-label', 'Run controls: Idle');
    });

    it('provides visually hidden current state text', () => {
      render(<RunControls state="paused" />);
      // VisuallyHidden renders a span with visually hidden styles, but text is accessible
      expect(screen.getByText('Current state: Paused')).toBeInTheDocument();
    });
  });
});
