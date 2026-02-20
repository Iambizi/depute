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
      
      const continueBtn = screen.getByRole('button', { name: 'Preview & Continue →' });
      await user.click(continueBtn);
      
      // Now should show Confirm & Execute and Back buttons
      const confirmBtn = screen.getByRole('button', { name: 'Confirm & Execute ✓' });
      expect(confirmBtn).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '← Back' })).toBeInTheDocument();
      
      // Click back
      await user.click(screen.getByRole('button', { name: '← Back' }));
      expect(screen.getByRole('button', { name: 'Preview & Continue →' })).toBeInTheDocument();
      
      // Click continue then confirm
      await user.click(screen.getByRole('button', { name: 'Preview & Continue →' }));
      await user.click(screen.getByRole('button', { name: 'Confirm & Execute ✓' }));
      
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
