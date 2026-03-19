import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TransactionReceipt } from './TransactionReceipt';

const defaultProps = {
  transactionId: 'TX-98765',
  title: 'Transfer Complete',
  status: 'success' as const,
  timestamp: '2026-03-19T14:30:00Z',
  lineItems: [
    { label: 'Amount', value: '$500.00', highlight: true },
    { label: 'From', value: 'Account ****4521' },
    { label: 'To', value: 'Account ****8903' },
    { label: 'Fee', value: '$1.50' },
  ],
};

describe('TransactionReceipt', () => {
  describe('rendering', () => {
    it('renders with required props', () => {
      render(<TransactionReceipt {...defaultProps} />);
      expect(screen.getByRole('region')).toBeInTheDocument();
      expect(screen.getByText('Transfer Complete')).toBeInTheDocument();
    });

    it('displays transaction ID', () => {
      render(<TransactionReceipt {...defaultProps} />);
      expect(screen.getByText('#TX-98765')).toBeInTheDocument();
    });

    it('renders all line items', () => {
      render(<TransactionReceipt {...defaultProps} />);
      expect(screen.getByText('Amount')).toBeInTheDocument();
      expect(screen.getByText('$500.00')).toBeInTheDocument();
      expect(screen.getByText('From')).toBeInTheDocument();
      expect(screen.getByText('Fee')).toBeInTheDocument();
    });

    it('renders timestamp', () => {
      render(<TransactionReceipt {...defaultProps} />);
      expect(screen.getByText('2026-03-19T14:30:00Z')).toBeInTheDocument();
    });

    it('renders agent ID when provided', () => {
      render(<TransactionReceipt {...defaultProps} agentId="payment-agent-01" />);
      expect(screen.getByText('payment-agent-01')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<TransactionReceipt {...defaultProps} className="custom-receipt" />);
      expect(screen.getByRole('region')).toHaveClass('custom-receipt');
    });
  });

  describe('status', () => {
    it('shows success status', () => {
      render(<TransactionReceipt {...defaultProps} status="success" />);
      expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('shows failed status', () => {
      render(<TransactionReceipt {...defaultProps} status="failed" />);
      expect(screen.getByText('Failed')).toBeInTheDocument();
    });

    it('shows pending status', () => {
      render(<TransactionReceipt {...defaultProps} status="pending" />);
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });

    it('shows reverted status', () => {
      render(<TransactionReceipt {...defaultProps} status="reverted" />);
      expect(screen.getByText('Reverted')).toBeInTheDocument();
    });
  });

  describe('hash and verification', () => {
    it('renders truncated hash', () => {
      render(<TransactionReceipt {...defaultProps} hash="0xabcdef1234567890abcdef1234567890" />);
      expect(screen.getByText('0xabcdef…34567890')).toBeInTheDocument();
    });

    it('renders short hash without truncation', () => {
      render(<TransactionReceipt {...defaultProps} hash="abc123" />);
      expect(screen.getByText('abc123')).toBeInTheDocument();
    });

    it('shows copy button by default', () => {
      render(<TransactionReceipt {...defaultProps} hash="0xabc" />);
      expect(screen.getByRole('button', { name: /copy hash/i })).toBeInTheDocument();
    });

    it('hides copy button when copyableHash is false', () => {
      render(<TransactionReceipt {...defaultProps} hash="0xabc" copyableHash={false} />);
      expect(screen.queryByRole('button', { name: /copy hash/i })).not.toBeInTheDocument();
    });
  });

  describe('audit trail', () => {
    it('shows audit trail button when handler provided', () => {
      render(<TransactionReceipt {...defaultProps} onViewAuditTrail={() => {}} />);
      expect(screen.getByRole('button', { name: /view full audit trail/i })).toBeInTheDocument();
    });

    it('calls onViewAuditTrail when clicked', async () => {
      const user = userEvent.setup();
      const onView = vi.fn();
      render(<TransactionReceipt {...defaultProps} onViewAuditTrail={onView} />);

      await user.click(screen.getByRole('button', { name: /view full audit trail/i }));
      expect(onView).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA role', () => {
      render(<TransactionReceipt {...defaultProps} />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('has descriptive aria-label', () => {
      render(<TransactionReceipt {...defaultProps} />);
      expect(screen.getByRole('region')).toHaveAttribute(
        'aria-label',
        'Transfer Complete: Success. Transaction TX-98765.'
      );
    });

    it('has list role for line items', () => {
      render(<TransactionReceipt {...defaultProps} />);
      expect(screen.getByRole('list', { name: 'Transaction details' })).toBeInTheDocument();
    });
  });
});
