import { describe, expect, it } from 'vitest';
import { requiresApproval, type PayeeGrant } from '../src/triggers';

const now = Date.parse('2026-10-28T16:00:00.000Z');

function grant(partial: Partial<PayeeGrant> = {}): PayeeGrant {
  return {
    rail: 'usdc',
    identifier: '0xabc',
    purpose: 'Pay invoice 104',
    resourceLimit: '25.00',
    currency: 'USD',
    durationSeconds: 600,
    grantedAtMs: now - 60_000,
    ...partial,
  };
}

describe('requiresApproval', () => {
  it('gates a new payee even when the amount is under a spend cap', () => {
    const policy = requiresApproval({
      payee: { rail: 'usdc', identifier: '0xnew' },
      purpose: 'Pay invoice 104',
      amount: { value: '1.00', currency: 'USD' },
      grants: [grant()],
      nowMs: now,
      highStakesAmount: { value: '100.00', currency: 'USD' },
    });
    expect(policy.required).toBe(true);
    expect(policy.triggers).toEqual(['new-payee']);
    expect(policy.highStakes).toBe(true);
  });

  it('does not re-gate the same purpose inside the limit and duration', () => {
    const policy = requiresApproval({
      payee: { rail: ' usdc ', identifier: '0xabc' },
      purpose: '  Pay   invoice 104 ',
      amount: { value: '25.00', currency: 'USD' },
      grants: [grant()],
      nowMs: now,
    });
    expect(policy).toEqual({ required: false, triggers: [], highStakes: false });
  });

  it('gates a purpose change and an amount past the grant', () => {
    const changed = requiresApproval({
      payee: { rail: 'usdc', identifier: '0xabc' },
      purpose: 'Pay invoice 105',
      amount: { value: '1.00', currency: 'USD' },
      grants: [grant()],
      nowMs: now,
    });
    expect(changed.triggers).toEqual(['purpose-change']);
    expect(changed.highStakes).toBe(true);

    const over = requiresApproval({
      payee: { rail: 'usdc', identifier: '0xabc' },
      purpose: 'Pay invoice 104',
      amount: { value: '25.01', currency: 'USD' },
      grants: [grant()],
      nowMs: now,
    });
    expect(over.triggers).toEqual(['outside-grant']);
    expect(over.highStakes).toBe(false);
  });

  it('gates an expired grant and ignores durable grants unless the host opts in', () => {
    const expired = requiresApproval({
      payee: { rail: 'usdc', identifier: '0xabc' },
      purpose: 'Pay invoice 104',
      amount: { value: '1.00', currency: 'USD' },
      grants: [grant({ grantedAtMs: now - 601_000 })],
      nowMs: now,
    });
    expect(expired.triggers).toEqual(['grant-expired']);

    const durable = requiresApproval({
      payee: { rail: 'usdc', identifier: '0xabc' },
      purpose: 'Pay invoice 104',
      amount: { value: '1.00', currency: 'USD' },
      grants: [grant({ persistence: 'durable' })],
      nowMs: now,
    });
    expect(durable.triggers).toEqual(['new-payee']);

    const optedIn = requiresApproval({
      payee: { rail: 'usdc', identifier: '0xabc' },
      purpose: 'Pay invoice 104',
      amount: { value: '1.00', currency: 'USD' },
      grants: [grant({ persistence: 'durable' })],
      nowMs: now,
      allowDurable: true,
    });
    expect(optedIn.required).toBe(false);
  });

  it('re-gates an untrusted source and marks a large amount high-stakes without opening a covered grant', () => {
    const untrusted = requiresApproval({
      payee: { rail: 'usdc', identifier: '0xabc' },
      purpose: 'Pay invoice 104',
      amount: { value: '1.00', currency: 'USD' },
      provenance: { source: 'email', trust: 'untrusted' },
      grants: [grant()],
      nowMs: now,
    });
    expect(untrusted.required).toBe(true);
    expect(untrusted.triggers).toEqual(['untrusted-source']);
    expect(untrusted.highStakes).toBe(true);

    const large = requiresApproval({
      payee: { rail: 'usdc', identifier: '0xabc' },
      purpose: 'Pay invoice 104',
      amount: { value: '20.00', currency: 'USD' },
      grants: [grant()],
      nowMs: now,
      highStakesAmount: { value: '10.00', currency: 'USD' },
      irreversible: true,
    });
    expect(large.required).toBe(false);
    expect(large.highStakes).toBe(true);
  });
});
