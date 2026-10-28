import { describe, expect, it } from 'vitest';
import type {
  ApprovalHandoff,
  HandoffContext,
  PresentedPayload,
} from '../src/index';

describe('presented types', () => {
  it('describes a payment the human can see and a handoff around it', () => {
    const payload: PresentedPayload = {
      title: 'Pay vendor',
      description: 'Settlement for the open invoice',
      agentReasoning: 'The invoice matches the purchase order.',
      payee: { rail: 'usdc', identifier: '0xabc', displayName: 'Vendor' },
      amount: { value: '3.00', currency: 'USD' },
      lineItems: [{ label: 'Invoice', value: '3.00' }],
      scope: { resourceLimit: '$500', durationSeconds: 3600, target: 'vendor' },
      justification: 'Invoice 104 matches the approved purchase order.',
      provenance: { source: 'docs', url: 'https://example.com/invoice', trust: 'untrusted' },
    };
    const handoff: ApprovalHandoff = {
      timeoutMs: 86_400_000,
      fallbackBehavior: 'deny',
      requireSigning: true,
    };
    const context: HandoffContext = {
      approvalId: payload.title,
      action: 'pay',
      riskScore: 80,
      confidence: 60,
      deadline: 1_700_000_000_000,
      timestamp: 1_699_999_000_000,
    };

    expect(payload.payee?.identifier).toBe('0xabc');
    expect(payload.amount?.value).toBe('3.00');
    expect(handoff.fallbackBehavior).toBe('deny');
    expect(context.action).toBe('pay');
  });
});
