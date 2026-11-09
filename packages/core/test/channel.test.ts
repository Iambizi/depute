import { describe, expect, it } from 'vitest';
import {
  approvalSatisfiedByCode,
  channelAllows,
  channelBlocksApproval,
  requiredChannelFor,
} from '../src/channel';
import type { ApprovalChannel } from '../src/channel';
import { buildReceipt, verify } from '../src/receipt';

function channel(
  kind: ApprovalChannel['kind'],
  agentReachable: ApprovalChannel['agentReachable'],
): ApprovalChannel {
  return { kind, agentReachable, declaredBy: 'integrator' };
}

describe('requiredChannelFor', () => {
  it('asks for a channel the agent cannot read', () => {
    expect(requiredChannelFor('high-stakes')).toEqual({ agentReachable: 'no' });
    expect(requiredChannelFor('limit-or-permission')).toEqual({ agentReachable: 'no' });
  });

  it('rejects an emailed code even when a caller holds the code', () => {
    const email = channel('otp-email', 'yes');
    expect(approvalSatisfiedByCode(email, '482193', 'high-stakes')).toBe(false);
    expect(approvalSatisfiedByCode(email, '482193', 'limit-or-permission')).toBe(false);
    expect(channelAllows(email, 'limit-or-permission')).toBe(false);
  });

  it('rejects unknown reachability and accepts a passkey the integrator says the agent cannot read', () => {
    expect(channelAllows(channel('webauthn-platform', 'unknown'), 'high-stakes')).toBe(false);
    expect(channelAllows(channel('webauthn-platform', 'no'), 'high-stakes')).toBe(true);
    expect(channelBlocksApproval(channel('chat', 'unknown'), 'high-stakes')).toBe(true);
    expect(channelBlocksApproval(undefined, 'high-stakes')).toBe(false);
  });

  it('stores the declaration on the receipt hash', async () => {
    const approvalChannel = channel('otp-sms', 'yes');
    const receipt = buildReceipt({
      id: 'r1',
      instruction: 'Raise the daily cap',
      payload: { title: 'Raise the daily cap' },
      decision: {
        outcome: 'approved',
        decidedAt: '2026-11-06T12:00:00.000Z',
        presentedAt: '2026-11-06T12:00:00.000Z',
      },
      approvalChannel,
    });
    expect(receipt.approvalChannel).toEqual(approvalChannel);
    expect((await verify(receipt)).valid).toBe(true);
    const edited = {
      ...receipt,
      approvalChannel: { ...approvalChannel, agentReachable: 'no' as const },
    };
    expect((await verify(edited)).receipt).toBe('mismatch');
  });

  it('refuses a channel that claims the library checked reachability', () => {
    const forged = {
      kind: 'otp-email',
      agentReachable: 'no',
      declaredBy: 'checked',
    } as ApprovalChannel;
    expect(() => buildReceipt({
      id: 'r1',
      instruction: 'Pay',
      payload: { title: 'Pay' },
      decision: {
        outcome: 'approved',
        decidedAt: '2026-11-06T12:00:00.000Z',
        presentedAt: '2026-11-06T12:00:00.000Z',
      },
      approvalChannel: forged,
    })).toThrow(/integrator/);
  });
});
