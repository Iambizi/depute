import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { BindingApproval, LIABILITY_NOTICE_ID } from './BindingApproval';

const defaultProps = {
  title: 'Wire Transfer Authorization',
  description: 'Agent requests authorization to execute a $5,000 wire transfer.',
};

const sampleTerms = [
  { id: 't1', text: 'I authorize the transfer of $5,000', acknowledged: false },
  { id: 't2', text: 'I understand this action is irreversible', acknowledged: false },
  { id: 't3', text: 'I confirm the recipient details are correct', acknowledged: false },
];

describe('BindingApproval', () => {
  describe('rendering', () => {
    it('renders with required props', () => {
      render(<BindingApproval {...defaultProps} />);
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
      expect(screen.getByText('Wire Transfer Authorization')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<BindingApproval {...defaultProps} />);
      expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    });

    it('shows impact statement', () => {
      render(<BindingApproval {...defaultProps} impactStatement="$5,000 will be transferred immediately" />);
      expect(screen.getByText('$5,000 will be transferred immediately')).toBeInTheDocument();
    });

    it('shows signer identity', () => {
      render(<BindingApproval {...defaultProps} signerIdentity="alice@company.com" />);
      expect(screen.getByText('alice@company.com')).toBeInTheDocument();
    });

    it('hides a blind recommendation until the decision is closed', () => {
      const { rerender } = render(
        <BindingApproval {...defaultProps} agentRecommendation="approved" blind />,
      );
      expect(screen.queryByText('Agent recommends')).not.toBeInTheDocument();
      rerender(
        <BindingApproval {...defaultProps} agentRecommendation="approved" blind status="signed" />,
      );
      expect(screen.getByText('Approve')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<BindingApproval {...defaultProps} className="custom-binding" />);
      expect(screen.getByRole('alertdialog')).toHaveClass('custom-binding');
    });
  });

  describe('status', () => {
    it('shows reviewing status by default', () => {
      render(<BindingApproval {...defaultProps} />);
      expect(screen.getByText('Under Review')).toBeInTheDocument();
    });

    it('shows signing status when isSigning is true', () => {
      render(<BindingApproval {...defaultProps} isSigning />);
      const signingElements = screen.getAllByText('Signing…');
      expect(signingElements.length).toBeGreaterThanOrEqual(1);
    });

    it('shows signed status', () => {
      render(<BindingApproval {...defaultProps} status="signed" />);
      expect(screen.getByText('Signed')).toBeInTheDocument();
    });

    it('shows rejected status', () => {
      render(<BindingApproval {...defaultProps} status="rejected" />);
      expect(screen.getByText('Rejected')).toBeInTheDocument();
    });

    it('shows expired status', () => {
      render(<BindingApproval {...defaultProps} status="expired" />);
      expect(screen.getByText('Expired')).toBeInTheDocument();
    });
  });

  describe('terms', () => {
    it('renders terms with checkboxes', () => {
      render(<BindingApproval {...defaultProps} terms={sampleTerms} />);
      expect(screen.getByText('I authorize the transfer of $5,000')).toBeInTheDocument();
      expect(screen.getByText('I understand this action is irreversible')).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    });

    it('shows term count', () => {
      render(<BindingApproval {...defaultProps} terms={sampleTerms} />);
      expect(screen.getByText('Terms (0/3 acknowledged)')).toBeInTheDocument();
    });

    it('disables sign button when terms are not all acknowledged', () => {
      render(<BindingApproval {...defaultProps} terms={sampleTerms} onSign={() => {}} />);
      expect(screen.getByRole('button', { name: /sign and approve/i })).toBeDisabled();
    });

    it('enables sign button after all terms acknowledged', async () => {
      const user = userEvent.setup();
      render(<BindingApproval {...defaultProps} terms={sampleTerms} onSign={() => {}} />);

      const checkboxes = screen.getAllByRole('checkbox');
      for (const cb of checkboxes) {
        await user.click(cb);
      }

      expect(screen.getByRole('button', { name: /sign and approve/i })).not.toBeDisabled();
    });

    it('requires the liability notice before sign and records the acknowledgement', async () => {
      const user = userEvent.setup();
      const onSign = vi.fn();
      const onReject = vi.fn();
      const onReceipt = vi.fn();
      const notice = 'You are the actor of record for what this agent does.';
      render(
        <BindingApproval
          {...defaultProps}
          terms={sampleTerms}
          liabilityNotice={notice}
          onSign={onSign}
          onReject={onReject}
          onReceipt={onReceipt}
        />,
      );
      expect(screen.getByText(notice)).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox')).toHaveLength(4);
      expect(screen.getByRole('button', { name: /sign and approve/i })).toBeDisabled();
      expect(screen.getByRole('button', { name: /reject/i })).toBeEnabled();

      const boxes = screen.getAllByRole('checkbox');
      for (const box of boxes.slice(0, 3)) await user.click(box);
      expect(screen.getByRole('button', { name: /sign and approve/i })).toBeDisabled();
      await user.click(boxes[3]);
      await user.click(screen.getByRole('button', { name: /sign and approve/i }));
      expect(onSign).toHaveBeenCalledTimes(1);
      expect(onReject).not.toHaveBeenCalled();
      const receipt = onReceipt.mock.calls[0][0];
      expect(receipt.decision.acknowledgedTermIds).toContain(LIABILITY_NOTICE_ID);
      expect(receipt.presented.payload.lineItems).toEqual([
        { label: 'Liability notice', value: notice },
      ]);
    });

    it('does not add a second checkbox when the host already used the notice id', () => {
      render(
        <BindingApproval
          {...defaultProps}
          terms={[{ id: LIABILITY_NOTICE_ID, text: 'Host copy', acknowledged: false }]}
          liabilityNotice="Shown copy"
        />,
      );
      expect(screen.getAllByRole('checkbox')).toHaveLength(1);
      expect(screen.getByText('Shown copy')).toBeInTheDocument();
      expect(screen.queryByText('Host copy')).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('requires a why before sign when a payment trigger fired', async () => {
      const user = userEvent.setup();
      const onSign = vi.fn();
      render(<BindingApproval {...defaultProps} triggers={['purpose-change']} onSign={onSign} />);
      const sign = screen.getByRole('button', { name: /sign and approve/i });
      expect(sign).toBeDisabled();
      await user.click(screen.getByRole('textbox', { name: 'Why are you approving this?' }));
      await user.paste('x'.repeat(100));
      expect(sign).toBeEnabled();
      await user.click(sign);
      expect(onSign).toHaveBeenCalledTimes(1);
    });

    it('calls onSign when sign button is clicked', async () => {
      const user = userEvent.setup();
      const onSign = vi.fn();
      render(<BindingApproval {...defaultProps} onSign={onSign} />);

      await user.click(screen.getByRole('button', { name: /sign and approve/i }));
      expect(onSign).toHaveBeenCalledTimes(1);
    });

    it('calls onReject when reject button is clicked', async () => {
      const user = userEvent.setup();
      const onReject = vi.fn();
      render(<BindingApproval {...defaultProps} onReject={onReject} />);

      await user.click(screen.getByRole('button', { name: /reject/i }));
      expect(onReject).toHaveBeenCalledTimes(1);
    });

    it('hides action buttons for terminal states', () => {
      render(<BindingApproval {...defaultProps} status="signed" />);
      expect(screen.queryByRole('button', { name: /sign/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /reject/i })).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has alertdialog role', () => {
      render(<BindingApproval {...defaultProps} />);
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('has descriptive aria-label', () => {
      render(<BindingApproval {...defaultProps} />);
      expect(screen.getByRole('alertdialog')).toHaveAttribute(
        'aria-label',
        expect.stringContaining('Wire Transfer Authorization')
      );
    });

    it('checkboxes have accessible labels', () => {
      render(<BindingApproval {...defaultProps} terms={sampleTerms} />);
      expect(screen.getByRole('checkbox', { name: /authorize the transfer/i })).toBeInTheDocument();
    });
  });

  describe('backend proof', () => {
    it('displays a supplied signature and calls onVerify', async () => {
      const user = userEvent.setup();
      const onVerify = vi.fn();
      render(
        <BindingApproval
          {...defaultProps}
          signature="sig-from-backend"
          hash="hash-from-backend"
          onVerify={onVerify}
        />,
      );
      expect(screen.getByText('sig-from-backend')).toBeInTheDocument();
      expect(screen.getByText('hash-from-backend')).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Verify proof' }));
      expect(onVerify).toHaveBeenCalledWith({
        signature: 'sig-from-backend',
        hash: 'hash-from-backend',
      });
    });
  });
});
