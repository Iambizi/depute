import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DecisionRecord } from './DecisionRecord';

const base = {
  decision: 'approved' as const,
  approver: {
    name: 'Ada',
    role: 'Owner',
    timestamp: '2026-10-26T18:00:00Z',
  },
  agentContext: { intent: 'Notify Ada' },
};

describe('DecisionRecord program receipt', () => {
  it('shows the hash, the logs, and the effects that were dispatched', () => {
    render(
      <DecisionRecord
        {...base}
        program={{
          text: 'await mail.send({})',
          hash: 'hash-ok',
          bindings: ['mail.send'],
          declaredEffects: [{ kind: 'write', target: 'mailbox' }],
          logs: ['sent'],
          dispatches: [{ binding: 'mail.send', detail: 'to ada' }],
        }}
      />,
    );
    expect(screen.getByText('hash-ok')).toBeInTheDocument();
    expect(screen.getByText('await mail.send({})')).toBeInTheDocument();
    expect(screen.getByText('Bindings: mail.send')).toBeInTheDocument();
    expect(screen.getByText('Declared: write mailbox')).toBeInTheDocument();
    expect(screen.getByText('mail.send — to ada')).toBeInTheDocument();
    expect(screen.getByText('sent')).toBeInTheDocument();
  });

  it('shows that nothing was dispatched when only logs were supplied', () => {
    render(
      <DecisionRecord
        {...base}
        program={{ logs: ['done'] }}
      />,
    );
    expect(screen.getByText('Dispatched effects')).toBeInTheDocument();
    expect(screen.getByText('None recorded')).toBeInTheDocument();
    expect(screen.getByText('done')).toBeInTheDocument();
  });

  it('leaves a single-call record without a program section', () => {
    render(<DecisionRecord {...base} />);
    expect(screen.queryByText('Dispatched effects')).not.toBeInTheDocument();
  });
});
