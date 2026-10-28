import { describe, expect, it } from 'vitest';
import {
  buildDecisionReceipt,
  buildReceipt,
  canonicalize,
  sha256,
  verify,
  type ApprovalReceipt,
} from '../src/receipt';

const payload = {
  title: 'Pay vendor',
  amount: { value: '3.00', currency: 'USD' },
  payee: { rail: 'usdc', identifier: '0xabc', displayName: 'Vendor' },
};

function draft() {
  return buildReceipt({
    id: 'r-1',
    instruction: 'Pay the invoice',
    payload,
    decision: {
      outcome: 'approved',
      approver: { id: 'alice', name: 'Alice', method: 'click' },
      decidedAt: '2026-10-28T16:00:00.000Z',
      presentedAt: '2026-10-28T15:59:58.000Z',
      reviewDurationMs: 2000,
      justification: 'Invoice 104 matches the purchase order.',
    },
    highStakes: true,
    previousReceiptHash: sha256('previous'),
  });
}

describe('sha256', () => {
  it('matches the empty-string and abc test vectors', () => {
    expect(sha256('')).toBe('sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    expect(sha256('abc')).toBe('sha256:ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  });
});

describe('canonicalize', () => {
  it('sorts keys and omits undefined fields', () => {
    expect(canonicalize({ b: 1, a: 'x', c: undefined })).toBe('{"a":"x","b":1}');
  });

  it('keeps array order', () => {
    expect(canonicalize(['b', 'a'])).toBe('["b","a"]');
  });
});

describe('approval receipt', () => {
  it('round-trips a hash and rejects a changed field', async () => {
    const receipt = draft();
    expect(receipt.presented.payloadHash.startsWith('sha256:')).toBe(true);
    expect(receipt.signatures).toBeUndefined();
    await expect(verify(receipt)).resolves.toMatchObject({
      valid: true,
      payload: 'match',
      receipt: 'match',
      previousReceiptHash: 'well-formed',
      signatures: [],
    });

    const tampered: ApprovalReceipt = {
      ...receipt,
      instruction: 'Pay a different invoice',
    };
    await expect(verify(tampered)).resolves.toMatchObject({ valid: false, receipt: 'mismatch' });
  });

  it('hashes the same bytes when object key order changes', () => {
    const first = buildReceipt({
      id: 'r-1',
      instruction: 'Pay',
      payload: { title: 'Pay', payee: { identifier: 'a', rail: 'usdc' } },
      decision: {
        outcome: 'approved',
        decidedAt: '2026-10-28T16:00:00.000Z',
        presentedAt: '2026-10-28T16:00:00.000Z',
        reviewDurationMs: 0,
      },
    });
    const second = buildReceipt({
      instruction: 'Pay',
      id: 'r-1',
      decision: {
        reviewDurationMs: 0,
        presentedAt: '2026-10-28T16:00:00.000Z',
        decidedAt: '2026-10-28T16:00:00.000Z',
        outcome: 'approved',
      },
      payload: { payee: { rail: 'usdc', identifier: 'a' }, title: 'Pay' },
    });
    expect(second.receiptHash).toBe(first.receiptHash);
    expect(second.presented.payloadHash).toBe(first.presented.payloadHash);
  });

  it('leaves an injected signature unverified until a verifier is supplied', async () => {
    const receipt = buildReceipt({
      id: 'r-2',
      instruction: 'Pay',
      payload: { title: 'Pay' },
      decision: {
        outcome: 'approved',
        decidedAt: '2026-10-28T16:00:00.000Z',
        presentedAt: '2026-10-28T16:00:00.000Z',
        reviewDurationMs: 0,
      },
      signatures: [{
        signerType: 'app',
        algorithm: 'Ed25519',
        publicKey: 'pub',
        signature: 'sig',
      }],
    });
    const open = await verify(receipt);
    expect(open.valid).toBe(false);
    expect(open.signatures).toEqual([{ signerType: 'app', status: 'unverified' }]);

    const checked = await verify(receipt, { verify: async () => true });
    expect(checked.signatures[0]?.status).toBe('valid');
    expect(checked.valid).toBe(true);
  });

  it('rejects a malformed previous hash', () => {
    expect(() => buildReceipt({
      id: 'r-3',
      instruction: 'Pay',
      payload: { title: 'Pay' },
      decision: {
        outcome: 'rejected',
        decidedAt: '2026-10-28T16:00:00.000Z',
        presentedAt: '2026-10-28T16:00:00.000Z',
        reviewDurationMs: 0,
      },
      previousReceiptHash: 'not-a-hash',
    })).toThrow(/previousReceiptHash/);
  });

  it('builds a gate receipt from the fields the human saw', () => {
    const receipt = buildDecisionReceipt({
      title: 'Pay vendor',
      description: 'Invoice 104',
      outcome: 'approved',
      approver: { id: 'alice', name: 'Alice' },
      presentedAtMs: Date.parse('2026-10-28T15:59:58.000Z'),
      decidedAtMs: Date.parse('2026-10-28T16:00:00.000Z'),
      fallbackId: 'local',
      acknowledgedTermIds: ['wire'],
    });
    expect(receipt.instruction).toBe('Pay vendor');
    expect(receipt.presented.payload.description).toBe('Invoice 104');
    expect(receipt.decision.reviewDurationMs).toBe(2000);
    expect(receipt.decision.approver).toEqual({ id: 'alice', name: 'Alice', method: 'click' });
    expect(receipt.decision.acknowledgedTermIds).toEqual(['wire']);
  });
});
