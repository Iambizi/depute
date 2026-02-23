import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { HandoffProtocol } from './HandoffProtocol';

const BASE_PROPS = {
  sourceAgent: 'Researcher-A',
  destinationAgent: 'Code-Writer-1',
  goal: 'Implement caching layer for auth service',
  summary: 'Research complete. Drafted caching strategy using Redis.',
  payload: [
    { label: 'Approved Plan', value: 'plan-7f3a2b' },
    { label: 'Token Budget', value: '12,000 remaining' },
  ],
  nextRequest: 'Implement the caching layer and write integration tests.',
  canIntercept: true,
};

describe('HandoffProtocol', () => {
  describe('rendering', () => {
    it('renders source and destination agents', () => {
      render(<HandoffProtocol {...BASE_PROPS} />);
      expect(screen.getByText('Researcher-A')).toBeInTheDocument();
      expect(screen.getByText('Code-Writer-1')).toBeInTheDocument();
    });

    it('renders the goal', () => {
      render(<HandoffProtocol {...BASE_PROPS} />);
      expect(screen.getByText('Implement caching layer for auth service')).toBeInTheDocument();
    });

    it('renders the summary', () => {
      render(<HandoffProtocol {...BASE_PROPS} />);
      expect(screen.getByText('Research complete. Drafted caching strategy using Redis.')).toBeInTheDocument();
    });

    it('renders payload items', () => {
      render(<HandoffProtocol {...BASE_PROPS} />);
      expect(screen.getByText('Approved Plan')).toBeInTheDocument();
      expect(screen.getByText('plan-7f3a2b')).toBeInTheDocument();
    });

    it('renders next request when provided', () => {
      render(<HandoffProtocol {...BASE_PROPS} />);
      expect(screen.getByText(/Implement the caching layer/)).toBeInTheDocument();
    });

    it('does not render payload section when payload is omitted', () => {
      render(<HandoffProtocol {...BASE_PROPS} payload={undefined} />);
      expect(screen.queryByText('Approved Plan')).not.toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('shows Intercept button when canIntercept is true', () => {
      render(<HandoffProtocol {...BASE_PROPS} canIntercept={true} onIntercept={vi.fn()} />);
      expect(screen.getByRole('button', { name: /intercept/i })).toBeInTheDocument();
    });

    it('hides Intercept button when canIntercept is false', () => {
      render(<HandoffProtocol {...BASE_PROPS} canIntercept={false} />);
      expect(screen.queryByRole('button', { name: /intercept/i })).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onAccept when Accept Handoff is clicked', async () => {
      const user = userEvent.setup();
      const handleAccept = vi.fn();
      render(<HandoffProtocol {...BASE_PROPS} onAccept={handleAccept} />);

      await user.click(screen.getByRole('button', { name: /Accept Handoff/i }));
      expect(handleAccept).toHaveBeenCalledTimes(1);
    });

    it('calls onIntercept when Intercept & Override is clicked', async () => {
      const user = userEvent.setup();
      const handleIntercept = vi.fn();
      render(<HandoffProtocol {...BASE_PROPS} canIntercept={true} onIntercept={handleIntercept} />);

      await user.click(screen.getByRole('button', { name: /Intercept/i }));
      expect(handleIntercept).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when Cancel is clicked', async () => {
      const user = userEvent.setup();
      const handleCancel = vi.fn();
      render(<HandoffProtocol {...BASE_PROPS} onCancel={handleCancel} />);

      await user.click(screen.getByRole('button', { name: /Cancel/i }));
      expect(handleCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has a dialog role', () => {
      render(<HandoffProtocol {...BASE_PROPS} />);
      // HandoffProtocol uses role="dialog"
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('dialog has an accessible label', () => {
      render(<HandoffProtocol {...BASE_PROPS} />);
      expect(screen.getByRole('dialog', { name: /Handoff from Researcher-A/i })).toBeInTheDocument();
    });
  });
});
