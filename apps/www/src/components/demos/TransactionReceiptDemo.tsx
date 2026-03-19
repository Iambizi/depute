'use client';

import { TransactionReceipt } from '@/depute/components/TransactionReceipt';

export function TransactionReceiptDemo() {
  return (
    <div style={{ padding: '1rem', width: '100%' }}>
      <TransactionReceipt
        transactionId="TX-98765"
        title="Wire Transfer Complete"
        status="success"
        timestamp="2026-03-19T14:30:00Z"
        agentId="payment-agent-01"
        hash="0xabcdef1234567890abcdef1234567890fedcba09"
        lineItems={[
          { label: 'Amount', value: '$5,000.00', highlight: true },
          { label: 'From', value: 'Account ****4521' },
          { label: 'To', value: 'Account ****8903' },
          { label: 'Fee', value: '$2.50' },
          { label: 'Network', value: 'SWIFT' },
        ]}
      />
    </div>
  );
}
