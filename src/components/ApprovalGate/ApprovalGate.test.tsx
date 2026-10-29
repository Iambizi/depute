import { StrictMode } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApprovalGate } from './ApprovalGate';

describe('ApprovalGate', () => {
  describe('rendering', () => {
    it('renders with required props', () => {
      render(<ApprovalGate title="Approve Transaction" />);
      expect(screen.getByRole('heading', { name: 'Approve Transaction' })).toBeInTheDocument();
      expect(screen.getByText('Approval Required')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
    });

    it('renders with all optional props', () => {
      render(
        <ApprovalGate
          title="Send Email"
          description="Send to 5 users"
          agentReasoning="They requested it"
          confidence={95}
          scope={{ resourceLimit: '5 emails', target: 'Users' }}
          metadata={{ 'IP Address': '127.0.0.1' }}
          timeoutSeconds={120}
        />
      );
      expect(screen.getByText('Send to 5 users')).toBeInTheDocument();
      expect(screen.getByText('They requested it')).toBeInTheDocument();
      expect(screen.getByText('95% confidence')).toBeInTheDocument();
      expect(screen.getByText('Up to 5 emails')).toBeInTheDocument();
      expect(screen.getByText('127.0.0.1')).toBeInTheDocument();
      expect(screen.getByText('2:00')).toBeInTheDocument();
    });

    it('renders empty metadata gracefully', () => {
      const { container } = render(<ApprovalGate title="Test" metadata={{}} />);
      expect(container.querySelector('table')).not.toBeInTheDocument();
    });
    
    it('applies custom className', () => {
      render(<ApprovalGate title="Test" className="custom-gate" />);
      expect(screen.getByRole('alertdialog')).toHaveClass('custom-gate');
    });
  });

  describe('states', () => {
    it('displays pending state correctly', () => {
      render(<ApprovalGate title="Test" status="pending" />);
      expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
    });

    it('displays approved state correctly', () => {
      render(<ApprovalGate title="Test" status="approved" />);
      expect(screen.queryByRole('button', { name: 'Approve' })).not.toBeInTheDocument();
      // Wait for resolved banner text
      expect(screen.getAllByText('Approved').length).toBeGreaterThan(0);
    });

    it('displays rejected state correctly', () => {
      render(<ApprovalGate title="Test" status="rejected" />);
      expect(screen.queryByRole('button', { name: 'Reject' })).not.toBeInTheDocument();
      expect(screen.getAllByText('Rejected').length).toBeGreaterThan(0);
    });

    it('displays expired state correctly', () => {
      render(<ApprovalGate title="Test" status="expired" />);
      expect(screen.queryByRole('button', { name: 'Approve' })).not.toBeInTheDocument();
      expect(screen.getAllByText('Expired').length).toBeGreaterThan(0);
    });
  });

  describe('interactions', () => {
    it('emits a hashed receipt when Approve is clicked', async () => {
      const user = userEvent.setup();
      const onReceipt = vi.fn();
      render(
        <ApprovalGate
          title="Pay vendor"
          description="Invoice 104"
          now={Date.parse('2026-10-28T16:00:00.000Z')}
          presentedAt={Date.parse('2026-10-28T15:59:58.000Z')}
          approver={{ id: 'alice', name: 'Alice' }}
          receiptId="r-1"
          onReceipt={onReceipt}
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Approve' }));
      expect(onReceipt).toHaveBeenCalledTimes(1);
      const receipt = onReceipt.mock.calls[0][0];
      expect(receipt.decision.outcome).toBe('approved');
      expect(receipt.decision.approver).toEqual({ id: 'alice', name: 'Alice', method: 'click' });
      expect(receipt.decision.reviewDurationMs).toBe(2000);
      expect(receipt.receiptHash.startsWith('sha256:')).toBe(true);
      expect(receipt.presented.payload.title).toBe('Pay vendor');
    });

    it('records agreement on the receipt and hides the recommendation while blind', async () => {
      const user = userEvent.setup();
      const onReceipt = vi.fn();
      const { rerender } = render(
        <ApprovalGate
          title="Pay vendor"
          agentReasoning="The invoice matches the grant."
          agentRecommendation="approved"
          blind
          now={Date.parse('2026-10-28T16:00:00.000Z')}
          presentedAt={Date.parse('2026-10-28T16:00:00.000Z')}
          onReceipt={onReceipt}
        />,
      );
      expect(screen.getByText('The invoice matches the grant.')).toBeInTheDocument();
      expect(screen.queryByText('Agent recommends')).not.toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Approve' }));
      expect(onReceipt.mock.calls[0][0].decision.agreed).toBe(true);
      expect(onReceipt.mock.calls[0][0].decision.humanChoice).toBe('approved');

      rerender(
        <ApprovalGate
          title="Pay vendor"
          agentRecommendation="rejected"
          status="approved"
        />,
      );
      expect(screen.getByText('Reject')).toBeInTheDocument();
    });

    it('keeps approve on one click when no payment trigger fired', () => {
      render(<ApprovalGate title="Send email" />);
      expect(screen.queryByRole('textbox', { name: 'Why are you approving this?' })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Approve' })).toBeEnabled();
    });

    it('requires 100 characters before approve when a payment trigger fired', async () => {
      const user = userEvent.setup();
      const onApprove = vi.fn();
      const onReject = vi.fn();
      const onReceipt = vi.fn();
      render(
        <ApprovalGate
          title="Pay vendor"
          triggers={['new-payee']}
          now={2_000}
          presentedAt={1_000}
          onApprove={onApprove}
          onReject={onReject}
          onReceipt={onReceipt}
        />,
      );
      const approve = screen.getByRole('button', { name: 'Approve' });
      const why = screen.getByRole('textbox', { name: 'Why are you approving this?' });
      expect(approve).toBeDisabled();
      expect(screen.getByText('0 of 100 characters')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Reject' }));
      expect(onReject).toHaveBeenCalledTimes(1);
      expect(onApprove).not.toHaveBeenCalled();

      await user.click(why);
      await user.paste('x'.repeat(99));
      expect(approve).toBeDisabled();
      await user.paste('y');
      expect(approve).toBeEnabled();
      await user.click(approve);
      expect(onApprove).toHaveBeenCalledTimes(1);
      expect(onReceipt.mock.calls[1][0].decision.justification).toHaveLength(100);
    });

    it('uses the host minimum when that prop is set', async () => {
      const user = userEvent.setup();
      const onApprove = vi.fn();
      render(
        <ApprovalGate
          title="Pay vendor"
          minJustificationLength={4}
          onApprove={onApprove}
        />,
      );
      const approve = screen.getByRole('button', { name: 'Approve' });
      expect(approve).toBeDisabled();
      await user.click(screen.getByRole('textbox', { name: 'Why are you approving this?' }));
      await user.paste('paid');
      expect(approve).toBeEnabled();
      await user.click(approve);
      expect(onApprove).toHaveBeenCalledTimes(1);
    });

    it('signs with the app key, and with a passkey only when the approval is high-stakes', async () => {
      const user = userEvent.setup();
      const onReceipt = vi.fn();
      const onApprove = vi.fn();
      const appSigner = { sign: vi.fn(async () => ({ publicKey: 'app-key', signature: 'app-sig' })) };
      const passkey = {
        sign: vi.fn(async () => ({
          algorithm: 'ES256',
          publicKey: 'user-key',
          signature: 'user-sig',
          authenticatorData: 'auth',
          clientDataJSON: 'client',
        })),
      };
      const { rerender } = render(
        <ApprovalGate
          title="Pay vendor"
          now={1_700_000_002_000}
          presentedAt={1_700_000_000_000}
          approver={{ id: 'alice' }}
          onReceipt={onReceipt}
          onApprove={onApprove}
          appSigner={appSigner}
          passkey={passkey}
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Approve' }));
      expect(passkey.sign).not.toHaveBeenCalled();
      expect(onReceipt.mock.calls[0][0].signatures).toEqual([
        { signerType: 'app', algorithm: 'Ed25519', publicKey: 'app-key', signature: 'app-sig' },
      ]);
      expect(onReceipt.mock.calls[0][0].decision.approver.method).toBe('click');
      expect(onApprove).toHaveBeenCalledTimes(1);

      rerender(
        <ApprovalGate
          title="Pay vendor"
          now={1_700_000_002_000}
          presentedAt={1_700_000_000_000}
          approver={{ id: 'alice' }}
          onReceipt={onReceipt}
          onApprove={onApprove}
          appSigner={appSigner}
          passkey={passkey}
          highStakes
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Approve' }));
      expect(passkey.sign).toHaveBeenCalledTimes(1);
      expect(onReceipt.mock.calls[1][0].decision.approver.method).toBe('passkey');
      expect(onReceipt.mock.calls[1][0].signatures.map((entry: { signerType: string }) => entry.signerType)).toEqual(['app', 'user']);
    });

    it('does not approve when the app signer fails', async () => {
      const user = userEvent.setup();
      const onApprove = vi.fn();
      render(
        <ApprovalGate
          title="Pay vendor"
          onReceipt={vi.fn()}
          onApprove={onApprove}
          appSigner={{ sign: async () => { throw new Error('App key refused the receipt.'); } }}
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Approve' }));
      expect(onApprove).not.toHaveBeenCalled();
      expect(screen.getByRole('alert')).toHaveTextContent('App key refused the receipt.');
    });

    it('calls onApprove when Approve is clicked in simple mode', async () => {
      const user = userEvent.setup();
      const handleApprove = vi.fn();
      render(<ApprovalGate title="Test" onApprove={handleApprove} />);
      
      await user.click(screen.getByRole('button', { name: 'Approve' }));
      expect(handleApprove).toHaveBeenCalledTimes(1);
    });

    it('calls onReject when Reject is clicked', async () => {
      const user = userEvent.setup();
      const handleReject = vi.fn();
      render(<ApprovalGate title="Test" onReject={handleReject} />);
      
      await user.click(screen.getByRole('button', { name: 'Reject' }));
      expect(handleReject).toHaveBeenCalledTimes(1);
    });

    it('handles staged mode preview -> confirm -> execute flow', async () => {
      const user = userEvent.setup();
      const handleApprove = vi.fn();
      render(<ApprovalGate title="Test" mode="staged" onApprove={handleApprove} />);
      
      const continueBtn = screen.getByRole('button', { name: 'Preview and continue' });
      await user.click(continueBtn);
      
      // Now should show Confirm & Execute and Back buttons
      const confirmBtn = screen.getByRole('button', { name: 'Confirm and execute' });
      expect(confirmBtn).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Back' }));
      expect(screen.getByRole('button', { name: 'Preview and continue' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Preview and continue' }));
      await user.click(screen.getByRole('button', { name: 'Confirm and execute' }));
      
      expect(handleApprove).toHaveBeenCalledTimes(1);
    });
  });

  describe('timer behavior', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('counts down and triggers onTimeout', () => {
      const handleTimeout = vi.fn();
      render(<ApprovalGate title="Test" timeoutSeconds={2} onTimeout={handleTimeout} />);
      
      expect(screen.getByText('2s')).toBeInTheDocument();
      
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.getByText('1s')).toBeInTheDocument();
      
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(handleTimeout).toHaveBeenCalledTimes(1);
    });

    it('fires onTimeout once inside StrictMode', () => {
      const handleTimeout = vi.fn();
      render(
        <StrictMode>
          <ApprovalGate title="Test" timeoutSeconds={1} onTimeout={handleTimeout} />
        </StrictMode>,
      );

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(handleTimeout).toHaveBeenCalledTimes(1);
    });

    it('puts handoffDeadlineMs on the onHandoff payload', () => {
      const onHandoff = vi.fn();
      const deadline = Date.now() + 60_000;
      render(
        <StrictMode>
          <ApprovalGate
            title="Send"
            approvalHandoff={{ timeoutMs: 1000, fallbackBehavior: 'block' }}
            handoffDeadlineMs={deadline}
            pendingApprovalId="appr-1"
            onHandoff={onHandoff}
          />
        </StrictMode>,
      );

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(onHandoff).toHaveBeenCalledTimes(1);
      expect(onHandoff.mock.calls[0][0]).toMatchObject({
        approvalId: 'appr-1',
        action: 'Send',
        deadline,
      });
    });

    it('expires a handoff at the 24h payload deadline when handoffDeadlineMs is omitted', () => {
      const onHandoff = vi.fn();
      const onHandoffExpired = vi.fn();
      const { rerender } = render(
        <ApprovalGate
          title="Send"
          timeoutSeconds={30}
          approvalHandoff={{ timeoutMs: 1000, fallbackBehavior: 'block' }}
          onHandoff={onHandoff}
          onHandoffExpired={onHandoffExpired}
        />,
      );

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(onHandoff).toHaveBeenCalledTimes(1);
      const deadline = onHandoff.mock.calls[0][0].deadline as number;
      expect(deadline - Date.now()).toBeGreaterThan(23 * 60 * 60 * 1000);

      rerender(
        <ApprovalGate
          title="Send"
          status="handoff_pending"
          timeoutSeconds={30}
          approvalHandoff={{ timeoutMs: 1000, fallbackBehavior: 'block' }}
          onHandoff={onHandoff}
          onHandoffExpired={onHandoffExpired}
        />,
      );

      act(() => {
        vi.advanceTimersByTime(30_000);
      });
      expect(onHandoffExpired).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(deadline - Date.now());
      });
      expect(onHandoffExpired).toHaveBeenCalledTimes(1);
    });
  });

  describe('handoff resolution', () => {
    it('fires onHandoffResolved once when a handoff is approved', async () => {
      const onHandoffResolved = vi.fn();
      const deadline = Date.now() + 60_000;
      const { rerender } = render(
        <StrictMode>
          <ApprovalGate
            title="Send"
            status="handoff_pending"
            pendingApprovalId="appr-1"
            handoffDeadlineMs={deadline}
            onHandoffResolved={onHandoffResolved}
          />
        </StrictMode>,
      );

      rerender(
        <StrictMode>
          <ApprovalGate
            title="Send"
            status="approved"
            pendingApprovalId="appr-1"
            handoffDeadlineMs={deadline}
            onHandoffResolved={onHandoffResolved}
          />
        </StrictMode>,
      );

      await waitFor(() => {
        expect(onHandoffResolved).toHaveBeenCalledTimes(1);
      });
      expect(onHandoffResolved.mock.calls[0][0]).toBe('approved');
      expect(onHandoffResolved.mock.calls[0][1]).toMatchObject({
        approvalId: 'appr-1',
        deadline,
      });
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA roles for pending vs resolved', () => {
      const { rerender } = render(<ApprovalGate title="Test" status="pending" />);
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
      
      rerender(<ApprovalGate title="Test" status="approved" />);
      // Should change to region when not pending
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('announces status changes via aria-live', async () => {
      const { rerender } = render(<ApprovalGate title="Test" status="pending" />);
      
      // pending announce
      await waitFor(() => {
        const regions = screen.queryAllByRole('status');
        expect(regions[regions.length - 1]).toHaveTextContent('Approval required: Test');
      });

      // change to approved
      rerender(<ApprovalGate title="Test" status="approved" />);
      await waitFor(() => {
        const regions = screen.queryAllByRole('status');
        expect(regions[regions.length - 1]).toHaveTextContent('Approved: Test');
      });
    });

    it('has aria-modal when pending', () => {
      render(<ApprovalGate title="Test" status="pending" />);
      expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true');
    });
  });
});
