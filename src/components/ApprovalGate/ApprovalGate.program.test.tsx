import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ApprovalGate } from './ApprovalGate';

const program = {
  summary: 'Send one message, then stop.',
  text: 'await mail.send({ to: "ada@example.com" })',
  bindings: ['mail.send'],
  declaredEffects: [{ kind: 'write' as const, target: 'mailbox' }],
  budget: { durationSeconds: 90, spend: '$0', scope: 'one message' },
};

describe('ApprovalGate program preview', () => {
  it('keeps the existing approve and reject actions', async () => {
    const onApprove = vi.fn();
    const user = userEvent.setup();
    render(<ApprovalGate title="Notify Ada" program={program} onApprove={onApprove} />);
    expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Approve' }));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it('shows the program, its bindings, declared effects, and budget', () => {
    render(<ApprovalGate title="Notify Ada" program={program} />);
    expect(screen.getByText('Send one message, then stop.')).toBeInTheDocument();
    expect(screen.getByText('await mail.send({ to: "ada@example.com" })')).toBeInTheDocument();
    expect(screen.getByText('mail.send')).toBeInTheDocument();
    expect(screen.getByText('write mailbox')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('1:30')).toBeInTheDocument();
    expect(screen.getByText('one message')).toBeInTheDocument();
  });

  it('renders no program table when the preview is omitted', () => {
    render(<ApprovalGate title="Notify Ada" />);
    expect(screen.queryByText('Bindings')).not.toBeInTheDocument();
    expect(screen.queryByText('Declared effects')).not.toBeInTheDocument();
  });
});
