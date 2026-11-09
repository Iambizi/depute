import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { EscalationRouter } from './EscalationRouter';

const BASE_PROPS = {
  failedAgent: 'Code-Writer-1',
  branchId: 'branch-3a',
  errorSummary: 'Tool call `call_api` failed after 3 retries with 503.',
  errorTrace: `MaxRetriesExceeded: call_api failed after 3 attempts`,
  recommendation: 'retry' as const,
  onRetry: vi.fn(),
  onReassign: vi.fn(),
  onCancelBranch: vi.fn(),
};

describe('EscalationRouter', () => {
  describe('rendering', () => {
    it('renders the failed agent name', () => {
      render(<EscalationRouter {...BASE_PROPS} />);
      expect(screen.getByText('Code-Writer-1')).toBeInTheDocument();
    });

    it('renders the branch ID', () => {
      render(<EscalationRouter {...BASE_PROPS} />);
      expect(screen.getByText(/branch-3a/)).toBeInTheDocument();
    });

    it('renders the error summary', () => {
      render(<EscalationRouter {...BASE_PROPS} />);
      expect(screen.getByText('Tool call `call_api` failed after 3 retries with 503.')).toBeInTheDocument();
    });

    it('renders the trace toggle button', () => {
      render(<EscalationRouter {...BASE_PROPS} />);
      // Toggle starts collapsed, shows "Show Error Trace"
      expect(screen.getByRole('button', { name: /show error trace/i })).toBeInTheDocument();
    });

    it('does not render trace toggle when errorTrace is absent', () => {
      render(<EscalationRouter {...BASE_PROPS} errorTrace={undefined} />);
      expect(screen.queryByRole('button', { name: /error trace/i })).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<EscalationRouter {...BASE_PROPS} className="custom-escalation" />);
      expect(screen.getByRole('alertdialog')).toHaveClass('custom-escalation');
    });
  });

  describe('states', () => {
    it('shows System Recommendation section when recommendation provided', () => {
      render(<EscalationRouter {...BASE_PROPS} recommendation="retry" />);
      expect(screen.getByText('System Recommendation')).toBeInTheDocument();
      expect(screen.getByText(/Retry with same agent/i)).toBeInTheDocument();
    });

    it('shows reassign recommendation text', () => {
      render(<EscalationRouter {...BASE_PROPS} recommendation="reassign" />);
      expect(screen.getByText(/Reassign to different agent/i)).toBeInTheDocument();
    });

    it('shows trace content when toggle is expanded', async () => {
      const user = userEvent.setup();
      render(<EscalationRouter {...BASE_PROPS} />);

      const showBtn = screen.getByRole('button', { name: /show error trace/i });
      await user.click(showBtn);

      // Trace content becomes visible; button switches to Hide
      expect(screen.getByRole('button', { name: /hide error trace/i })).toBeInTheDocument();
      expect(screen.getByText(/MaxRetriesExceeded/)).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onRetry when Retry is clicked', async () => {
      const user = userEvent.setup();
      const handleRetry = vi.fn();
      render(<EscalationRouter {...BASE_PROPS} onRetry={handleRetry} />);

      await user.click(screen.getByRole('button', { name: /^Retry$/i }));
      expect(handleRetry).toHaveBeenCalledTimes(1);
    });

    it('calls onReassign when Reassign is clicked', async () => {
      const user = userEvent.setup();
      const handleReassign = vi.fn();
      render(<EscalationRouter {...BASE_PROPS} onReassign={handleReassign} />);

      await user.click(screen.getByRole('button', { name: /Reassign/i }));
      expect(handleReassign).toHaveBeenCalledTimes(1);
    });

    it('calls onCancelBranch when Cancel Branch is clicked', async () => {
      const user = userEvent.setup();
      const handleCancel = vi.fn();
      render(<EscalationRouter {...BASE_PROPS} onCancelBranch={handleCancel} />);

      await user.click(screen.getByRole('button', { name: /Cancel Branch/i }));
      expect(handleCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has alertdialog role', () => {
      render(<EscalationRouter {...BASE_PROPS} />);
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('has aria-modal attribute', () => {
      render(<EscalationRouter {...BASE_PROPS} />);
      expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('emergency stop', () => {
    it('shows stopped only after the host confirms and does not ask for a passkey', async () => {
      const user = userEvent.setup();
      const passkey = { sign: vi.fn() };
      const onReceipt = vi.fn();
      const onStop = vi.fn(async () => ({ confirmed: true }));
      render(<EscalationRouter {...BASE_PROPS} onStop={onStop} onReceipt={onReceipt} passkey={passkey} />);
      expect(screen.getByRole('status')).toHaveTextContent('Armed');
      await user.click(screen.getByRole('button', { name: 'Stop' }));
      expect(screen.getByRole('status')).toHaveTextContent('Stopped');
      expect(onReceipt.mock.calls[0][0].kind).toBe('stop');
      expect(passkey.sign).not.toHaveBeenCalled();
    });

    it('shows unknown when the host does not confirm', async () => {
      const user = userEvent.setup();
      const onReceipt = vi.fn();
      render(<EscalationRouter {...BASE_PROPS} onStop={async () => ({ confirmed: false })} onReceipt={onReceipt} />);
      await user.click(screen.getByRole('button', { name: 'Stop' }));
      expect(screen.getByRole('status')).toHaveTextContent('Unknown');
      expect(onReceipt).not.toHaveBeenCalled();
    });

    it('keeps resume off until a passkey is passed', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <EscalationRouter {...BASE_PROPS} onStop={async () => ({ confirmed: true })} />,
      );
      await user.click(screen.getByRole('button', { name: 'Stop' }));
      expect(screen.getByRole('button', { name: 'Resume' })).toBeDisabled();
      const passkey = {
        sign: vi.fn(async () => ({
          algorithm: 'ES256',
          publicKey: 'pk',
          signature: 'sig',
          authenticatorData: 'aa',
          clientDataJSON: 'bb',
        })),
      };
      const onReceipt = vi.fn();
      rerender(
        <EscalationRouter
          {...BASE_PROPS}
          onStop={async () => ({ confirmed: true })}
          passkey={passkey}
          onReceipt={onReceipt}
        />,
      );
      expect(screen.getByRole('button', { name: 'Resume' })).toBeEnabled();
      await user.click(screen.getByRole('button', { name: 'Resume' }));
      expect(passkey.sign).toHaveBeenCalledTimes(1);
      expect(onReceipt.mock.calls[0][0].highStakes).toBe(true);
      expect(onReceipt.mock.calls[0][0].kind).toBeUndefined();
    });
  });
});
