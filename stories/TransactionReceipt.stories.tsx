import type { Meta, StoryObj } from '@storybook/react';
import { TransactionReceipt } from '../src/components/TransactionReceipt';
import type { TransactionReceiptProps } from '../src/components/TransactionReceipt';

const meta: Meta<TransactionReceiptProps> = {
  title: 'v2 — Compliance & Forensics/TransactionReceipt',
  component: TransactionReceipt,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TransactionReceiptProps>;

export const Success: Story = {
  args: {
    transactionId: 'TX-98765',
    title: 'Wire Transfer Complete',
    status: 'success',
    timestamp: '2026-03-19T14:30:00Z',
    agentId: 'payment-agent-01',
    hash: '0xabcdef1234567890abcdef1234567890fedcba09',
    lineItems: [
      { label: 'Amount', value: '$5,000.00', highlight: true },
      { label: 'From', value: 'Account ****4521' },
      { label: 'To', value: 'Account ****8903' },
      { label: 'Fee', value: '$2.50' },
      { label: 'Network', value: 'SWIFT' },
    ],
    onViewAuditTrail: () => alert('Opening audit trail...'),
  },
};

export const Failed: Story = {
  args: {
    transactionId: 'TX-98766',
    title: 'API Deployment',
    status: 'failed',
    timestamp: '2026-03-19T15:00:00Z',
    lineItems: [
      { label: 'Service', value: 'api-gateway' },
      { label: 'Version', value: 'v2.1.0' },
      { label: 'Error', value: 'Health check timeout', highlight: true },
    ],
  },
};

export const Reverted: Story = {
  args: {
    transactionId: 'TX-98767',
    title: 'Database Migration',
    status: 'reverted',
    timestamp: '2026-03-19T16:00:00Z',
    hash: '0x1234abcd',
    lineItems: [
      { label: 'Schema', value: 'users_v3' },
      { label: 'Rows Affected', value: '12,450' },
      { label: 'Revert Reason', value: 'Constraint violation detected', highlight: true },
    ],
  },
};
