import { describe, expect, it } from 'vitest';
import { agreementRate } from '../src/agreement';
import type { AgreementDecision } from '../src/agreement';

function decision(agreed: boolean): AgreementDecision {
  return {
    agentRecommendation: 'approved',
    humanChoice: agreed ? 'approved' : 'rejected',
  };
}

describe('agreementRate', () => {
  it('stays quiet until five decisions, including a perfect shorter run', () => {
    const four = agreementRate({
      decisions: [decision(true), decision(true), decision(true), decision(true)],
    });
    expect(four.alert).toBe(false);
    expect(four.rate).toBe(1);
    expect(four.count).toBe(4);
  });

  it('alerts when agreement is over 80 percent across at least five decisions', () => {
    const exact = agreementRate({
      decisions: [decision(true), decision(true), decision(true), decision(true), decision(false)],
    });
    expect(exact.agreed).toBe(4);
    expect(exact.rate).toBe(0.8);
    expect(exact.alert).toBe(false);

    const over = agreementRate({
      decisions: [
        decision(true),
        decision(true),
        decision(true),
        decision(true),
        decision(true),
        decision(false),
      ],
    });
    expect(over.alert).toBe(true);
    expect(over.agreed).toBe(5);
    expect(over.count).toBe(6);
  });

  it('counts a rejection that follows a reject recommendation as agreement', () => {
    const pattern = agreementRate({
      minimumDecisions: 1,
      decisions: [{ agentRecommendation: 'rejected', humanChoice: 'rejected' }],
    });
    expect(pattern.agreed).toBe(1);
    expect(pattern.alert).toBe(true);
  });

  it('returns an empty rate when there is nothing to compare', () => {
    expect(agreementRate({ decisions: [] })).toEqual({
      alert: false,
      count: 0,
      agreed: 0,
      rate: null,
    });
  });
});
