import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TransactionReceipt } from './TransactionReceipt';

const base = {
  transactionId: 'TX-1',
  title: 'Program finished',
  status: 'success' as const,
  timestamp: '2026-10-26T18:00:00Z',
  lineItems: [{ label: 'Agent', value: 'notifier' }],
};

describe('TransactionReceipt program receipt', () => {
  it('shows the program hash, the dispatch list, and the logs', () => {
    render(
      <TransactionReceipt
        {...base}
        programHash="0123456789abcdef0123456789abcdef"
        dispatches={['mail.send to ada']}
        logs={['sent']}
      />,
    );
    expect(screen.getByText('01234567…89abcdef')).toBeInTheDocument();
    expect(screen.getByText('mail.send to ada')).toBeInTheDocument();
    expect(screen.getByText('sent')).toBeInTheDocument();
  });

  it('shows that nothing was dispatched when only logs were supplied', () => {
    render(<TransactionReceipt {...base} logs={['done']} dispatches={[]} />);
    expect(screen.getByText('Dispatched effects')).toBeInTheDocument();
    expect(screen.getByText('None recorded')).toBeInTheDocument();
    expect(screen.getByText('done')).toBeInTheDocument();
  });

  it('leaves a single-call receipt without a dispatch row', () => {
    render(<TransactionReceipt {...base} />);
    expect(screen.queryByText('Dispatched effects')).not.toBeInTheDocument();
  });
});
