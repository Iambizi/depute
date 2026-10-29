/**
 * Whether a person followed the agent's recommendation.
 *
 * The rate is an alert only after enough decisions, and only when it is
 * over the threshold. This module does not store a log. The host passes
 * the decisions it still holds.
 */

export type AgreementChoice = 'approved' | 'rejected';

export interface AgreementDecision {
  agentRecommendation: AgreementChoice;
  humanChoice: AgreementChoice;
}

export interface AgreementRateInput {
  decisions: readonly AgreementDecision[];
  /** Alert when the rate is strictly over this. Default 0.8. */
  agreementThreshold?: number;
  /** The rate is not an alert until at least this many decisions. Default 5. */
  minimumDecisions?: number;
}

export interface AgreementRate {
  alert: boolean;
  count: number;
  agreed: number;
  /** Null when there are no decisions. */
  rate: number | null;
}

export const DEFAULT_AGREEMENT_THRESHOLD = 0.8;
export const DEFAULT_MINIMUM_AGREEMENT_DECISIONS = 5;

export function agreementRate(input: AgreementRateInput): AgreementRate {
  const threshold = Number.isFinite(input.agreementThreshold)
    ? input.agreementThreshold as number
    : DEFAULT_AGREEMENT_THRESHOLD;
  const minimum = Number.isFinite(input.minimumDecisions) && (input.minimumDecisions as number) >= 1
    ? Math.floor(input.minimumDecisions as number)
    : DEFAULT_MINIMUM_AGREEMENT_DECISIONS;
  let agreed = 0;
  for (const decision of input.decisions) {
    if (decision.agentRecommendation === decision.humanChoice) agreed += 1;
  }
  const count = input.decisions.length;
  const rate = count === 0 ? null : agreed / count;
  return {
    alert: rate !== null && count >= minimum && rate > threshold,
    count,
    agreed,
    rate,
  };
}
