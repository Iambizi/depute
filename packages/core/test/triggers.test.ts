import { describe, expect, it } from 'vitest';
import {
  justificationLength,
  requiredJustificationLength,
  requiresApproval,
  smallPaymentBurst,
  type PayeeGrant,
  type SmallPayment,
} from '../src/triggers';

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

describe('required justification', () => {
  it('asks for 100 characters only after a payment trigger', () => {
    expect(requiredJustificationLength(undefined, undefined)).toBe(0);
    expect(requiredJustificationLength(['other'], undefined)).toBe(0);
    expect(requiredJustificationLength(['new-payee'], undefined)).toBe(100);
    expect(requiredJustificationLength(['new-payee'], 40)).toBe(40);
    expect(requiredJustificationLength(['new-payee'], 0)).toBe(0);
    expect(justificationLength('  pay   the vendor  ')).toBe('pay the vendor'.length);
  });
});

function payment(partial: Partial<SmallPayment> & Pick<SmallPayment, 'identifier'>): SmallPayment {
  return {
    rail: 'usdc',
    purpose: 'Pay invoice 104',
    amount: '1.00',
    atMs: now - 60_000,
    ...partial,
  };
}

describe('smallPaymentBurst', () => {
  it('warns once for a sub-threshold burst across several payees', () => {
    const pattern = smallPaymentBurst({
      nowMs: now,
      transactions: [
        payment({ identifier: '0xaaa', amount: '1.00', atMs: now - 60_000 }),
        payment({ identifier: '0xaaa', amount: '2.00', atMs: now - 50_000 }),
        payment({ identifier: '0xbbb', rail: 'ach', amount: '3.00', atMs: now - 40_000 }),
        payment({ identifier: '0xbbb', rail: 'ach', amount: '1.50', atMs: now - 30_000 }),
        payment({ identifier: 'iban', rail: 'sepa', amount: '4.00', atMs: now - 20_000 }),
        payment({ identifier: 'iban', rail: 'sepa', amount: '0.75', atMs: now - 10_000 }),
        payment({ identifier: 'iban', rail: 'sepa', amount: '4.99', atMs: now - 5_000 }),
      ],
    });
    expect(pattern.warn).toBe(true);
    expect(pattern.count).toBe(7);
    expect(pattern.payeeCount).toBe(3);
    expect(pattern.payees.map((payee) => payee.identifier)).toEqual(['0xbbb', 'iban', '0xaaa']);
  });

  it('stays quiet for repeated payments to one payee and one purpose', () => {
    const pattern = smallPaymentBurst({
      nowMs: now,
      transactions: Array.from({ length: 8 }, (_, index) => payment({
        identifier: '0xaaa',
        amount: '1.00',
        atMs: now - (index + 1) * 1_000,
      })),
    });
    expect(pattern.warn).toBe(false);
    expect(pattern.count).toBe(8);
    expect(pattern.payeeCount).toBe(1);
  });

  it('warns when one payee is paid for two purposes past the count', () => {
    const pattern = smallPaymentBurst({
      nowMs: now,
      transactions: [
        payment({ identifier: '0xaaa', purpose: 'Pay invoice 104' }),
        payment({ identifier: '0xaaa', purpose: 'Pay invoice 104' }),
        payment({ identifier: '0xaaa', purpose: 'Pay invoice 104' }),
        payment({ identifier: '0xaaa', purpose: 'Refund fee' }),
        payment({ identifier: '0xaaa', purpose: 'Refund fee' }),
        payment({ identifier: '0xaaa', purpose: 'Refund fee' }),
      ],
    });
    expect(pattern.warn).toBe(true);
    expect(pattern.payeeCount).toBe(1);
  });

  it('collapses whitespace so the same purpose stays one group', () => {
    const pattern = smallPaymentBurst({
      nowMs: now,
      transactions: Array.from({ length: 6 }, () => payment({
        identifier: ' 0xaaa ',
        purpose: '  Pay   invoice 104  ',
      })),
    });
    expect(pattern.warn).toBe(false);
    expect(pattern.payees).toEqual([{ rail: 'usdc', identifier: '0xaaa' }]);
  });

  it('ignores amounts at the threshold, old payments, and a count that is not over the maximum', () => {
    const under = smallPaymentBurst({
      nowMs: now,
      transactions: [
        payment({ identifier: '0xaaa', amount: '5' }),
        payment({ identifier: '0xaaa', amount: '5.00' }),
        payment({ identifier: '0xbbb', amount: '9.00' }),
        payment({ identifier: '0xccc', amount: '1.00', atMs: now - 10 * 60 * 1000 }),
        payment({ identifier: '0xccc', amount: '1.00', atMs: now + 1_000 }),
        payment({ identifier: '0xccc', amount: '-1.00' }),
        payment({ identifier: '0xccc', amount: 'nope' }),
      ],
    });
    expect(under).toEqual({ warn: false, count: 0, payeeCount: 0, payees: [] });

    const five = smallPaymentBurst({
      nowMs: now,
      transactions: [
        payment({ identifier: '0xaaa' }),
        payment({ identifier: '0xaaa' }),
        payment({ identifier: '0xbbb' }),
        payment({ identifier: '0xbbb' }),
        payment({ identifier: '0xccc' }),
      ],
    });
    expect(five.warn).toBe(false);
    expect(five.count).toBe(5);
  });

  it('uses a host threshold and interval', () => {
    const pattern = smallPaymentBurst({
      nowMs: now,
      smallTxThreshold: '10',
      windowMs: 30_000,
      maxSmallTxCount: 1,
      transactions: [
        payment({ identifier: '0xaaa', amount: '9.50', atMs: now - 10_000 }),
        payment({ identifier: '0xbbb', amount: '10', atMs: now - 10_000 }),
        payment({ identifier: '0xbbb', amount: '1.00', atMs: now - 40_000 }),
        payment({ identifier: '0xccc', amount: '2.00', atMs: now - 5_000 }),
      ],
    });
    expect(pattern.warn).toBe(true);
    expect(pattern.count).toBe(2);
    expect(pattern.payeeCount).toBe(2);
  });
});
