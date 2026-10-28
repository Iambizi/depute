/**
 * When a payment must be shown to a person again.
 *
 * A new payee always requires approval, including under a spend cap.
 * The same purpose, inside the granted limit and duration, does not.
 * An untrusted source always requires approval.
 *
 * Grants are session-scoped unless the host sets `allowDurable`.
 * This module does not store grants. The host passes the ones it still holds.
 * It imports only `./presented`.
 */

import type { PresentedAmount, PresentedProvenance } from '../types/core';

export type ApprovalTrigger =
  | 'new-payee'
  | 'purpose-change'
  | 'untrusted-source'
  | 'outside-grant'
  | 'grant-expired';

export interface PayeeGrant {
  rail: string;
  identifier: string;
  purpose: string;
  /** Decimal string. Same currency as the payment being checked. */
  resourceLimit: string;
  currency: string;
  durationSeconds: number;
  /** Unix milliseconds when the person granted this payee. */
  grantedAtMs: number;
  /** Session grants apply by default. Durable grants apply only when the host opts in. */
  persistence?: 'session' | 'durable';
}

export interface ApprovalPolicyInput {
  payee?: { rail: string; identifier: string };
  purpose?: string;
  amount?: PresentedAmount;
  provenance?: PresentedProvenance;
  /** Marks the decision high-stakes. It does not, by itself, open a gate. */
  irreversible?: boolean;
  /** Host-set cutoff. An amount above it is high-stakes. It does not, by itself, open a gate. */
  highStakesAmount?: PresentedAmount;
  grants?: PayeeGrant[];
  nowMs: number;
  /** When omitted, durable grants are ignored. */
  allowDurable?: boolean;
}

export interface ApprovalPolicy {
  /** True when the host should show a gate. */
  required: boolean;
  triggers: ApprovalTrigger[];
  /** True when a passkey is appropriate if a gate is shown. */
  highStakes: boolean;
}

interface Decimal {
  negative: boolean;
  whole: string;
  frac: string;
}

function normalizePurpose(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

function samePayee(
  left: { rail: string; identifier: string },
  right: { rail: string; identifier: string },
): boolean {
  return left.rail.trim() === right.rail.trim()
    && left.identifier.trim() === right.identifier.trim();
}

function parseDecimal(value: string): Decimal | null {
  const match = /^(-?)(\d+)(?:\.(\d+))?$/u.exec(value.trim());
  if (!match) return null;
  const whole = match[2].replace(/^0+(?=\d)/u, '');
  const frac = (match[3] ?? '').replace(/0+$/u, '');
  const negative = match[1] === '-' && !(whole === '0' && frac === '');
  return { negative, whole, frac };
}

/** -1 when left < right, 0 when equal, 1 when left > right. Null when either value is not a decimal. */
function compareDecimal(left: string, right: string): -1 | 0 | 1 | null {
  const a = parseDecimal(left);
  const b = parseDecimal(right);
  if (!a || !b) return null;
  if (a.negative !== b.negative) return a.negative ? -1 : 1;
  const sign = a.negative ? -1 : 1;
  const width = Math.max(a.frac.length, b.frac.length);
  const aDigits = `${a.whole}${a.frac.padEnd(width, '0')}`;
  const bDigits = `${b.whole}${b.frac.padEnd(width, '0')}`;
  const aPadded = aDigits.padStart(Math.max(aDigits.length, bDigits.length), '0');
  const bPadded = bDigits.padStart(Math.max(aDigits.length, bDigits.length), '0');
  if (aPadded === bPadded) return 0;
  return (aPadded > bPadded ? 1 : -1) * sign as -1 | 1;
}

function withinLimit(amount: PresentedAmount | undefined, grant: PayeeGrant): boolean {
  if (!amount) return true;
  if (amount.currency !== grant.currency) return false;
  const compared = compareDecimal(amount.value, grant.resourceLimit);
  return compared !== null && compared <= 0 && !parseDecimal(amount.value)?.negative;
}

function grantIsLive(grant: PayeeGrant, nowMs: number): boolean {
  if (!Number.isFinite(grant.durationSeconds) || grant.durationSeconds < 0) return false;
  if (!Number.isFinite(grant.grantedAtMs) || !Number.isFinite(nowMs)) return false;
  return nowMs < grant.grantedAtMs + grant.durationSeconds * 1000;
}

function aboveCutoff(amount: PresentedAmount | undefined, cutoff: PresentedAmount | undefined): boolean {
  if (!amount || !cutoff) return false;
  if (amount.currency !== cutoff.currency) return false;
  const compared = compareDecimal(amount.value, cutoff.value);
  return compared !== null && compared > 0;
}

export function requiresApproval(input: ApprovalPolicyInput): ApprovalPolicy {
  const triggers: ApprovalTrigger[] = [];
  const grants = (input.grants ?? []).filter((grant) => {
    if (grant.persistence === 'durable') return input.allowDurable === true;
    return true;
  });

  if (input.provenance?.trust === 'untrusted') triggers.push('untrusted-source');

  const payee = input.payee;
  if (payee) {
    const samePayeeGrants = grants.filter((grant) => samePayee(grant, payee));
    const purpose = normalizePurpose(input.purpose ?? '');
    const samePurpose = samePayeeGrants.filter((grant) => normalizePurpose(grant.purpose) === purpose);
    const live = samePurpose.filter((grant) => grantIsLive(grant, input.nowMs));
    const covering = live.filter((grant) => withinLimit(input.amount, grant));
    if (covering.length === 0) {
      if (samePayeeGrants.length === 0) triggers.push('new-payee');
      else if (samePurpose.length === 0) triggers.push('purpose-change');
      else if (live.length === 0) triggers.push('grant-expired');
      else triggers.push('outside-grant');
    }
  }

  const highStakes = triggers.includes('new-payee')
    || triggers.includes('purpose-change')
    || triggers.includes('untrusted-source')
    || input.irreversible === true
    || aboveCutoff(input.amount, input.highStakesAmount);

  return {
    required: triggers.length > 0,
    triggers,
    highStakes,
  };
}

const PAYMENT_TRIGGERS = new Set<string>([
  'new-payee',
  'purpose-change',
  'untrusted-source',
  'outside-grant',
  'grant-expired',
]);

/** Characters that count toward the why. Surrounding and extra inner space does not. */
export function justificationLength(value: string): number {
  return [...value.trim().replace(/\s+/g, ' ')].length;
}

/**
 * 100 when a payment trigger fired. An explicit minimum replaces that,
 * and zero or a negative number leaves the why optional.
 */
export function requiredJustificationLength(
  triggers: readonly string[] | undefined,
  minimum: number | undefined,
): number {
  if (minimum !== undefined) {
    if (!Number.isFinite(minimum) || minimum <= 0) return 0;
    return Math.floor(minimum);
  }
  if (triggers?.some((trigger) => PAYMENT_TRIGGERS.has(trigger))) return 100;
  return 0;
}

/** Payments strictly under this decimal, in the meter's unit, are small. */
export const DEFAULT_SMALL_TX_THRESHOLD = '5';

/** Ten minutes. A payment ages out when its age reaches this. */
export const DEFAULT_SMALL_TX_WINDOW_MS = 10 * 60 * 1000;

/** The warning appears when the small-payment count is greater than this. */
export const DEFAULT_MAX_SMALL_TX_COUNT = 5;

/** One auto-approved payment. The host leaves gated payments out of the list. */
export interface SmallPayment {
  rail: string;
  identifier: string;
  purpose: string;
  /** Decimal string in the meter's unit. */
  amount: string;
  /** Unix milliseconds when this payment was auto-approved. */
  atMs: number;
}

export interface SmallPaymentBurstInput {
  transactions: readonly SmallPayment[];
  nowMs: number;
  /** Payments strictly under this decimal count. Default "5". */
  smallTxThreshold?: string;
  /** A payment ages out when its age reaches this. Default ten minutes. */
  windowMs?: number;
  /** The warning appears when the count is greater than this. Default 5. */
  maxSmallTxCount?: number;
}

export interface SmallPayeeRef {
  rail: string;
  identifier: string;
}

export interface SmallPaymentBurst {
  /** True when one warning row should show. This never opens a gate. */
  warn: boolean;
  count: number;
  payeeCount: number;
  payees: SmallPayeeRef[];
}

/**
 * A run of small auto-approved payments.
 * One payee and one purpose stays quiet, however many times it repeats.
 * The row appears when the count is over the maximum and the payments
 * are not all the same payee and purpose.
 */
export function smallPaymentBurst(input: SmallPaymentBurstInput): SmallPaymentBurst {
  const threshold = input.smallTxThreshold ?? DEFAULT_SMALL_TX_THRESHOLD;
  const windowMs = input.windowMs ?? DEFAULT_SMALL_TX_WINDOW_MS;
  const maxCount = input.maxSmallTxCount ?? DEFAULT_MAX_SMALL_TX_COUNT;
  const empty: SmallPaymentBurst = { warn: false, count: 0, payeeCount: 0, payees: [] };
  if (!Number.isFinite(input.nowMs) || !Number.isFinite(windowMs) || windowMs < 0) return empty;
  if (!Number.isFinite(maxCount) || maxCount < 0) return empty;
  if (parseDecimal(threshold) === null) return empty;

  const payeeKeys = new Map<string, SmallPayeeRef>();
  const groups = new Set<string>();
  let count = 0;

  for (const payment of input.transactions) {
    if (!Number.isFinite(payment.atMs)) continue;
    const age = input.nowMs - payment.atMs;
    if (age < 0 || age >= windowMs) continue;
    const amount = parseDecimal(payment.amount);
    if (!amount || amount.negative) continue;
    const compared = compareDecimal(payment.amount, threshold);
    if (compared === null || compared >= 0) continue;

    count += 1;
    const rail = payment.rail.trim();
    const identifier = payment.identifier.trim();
    const payeeKey = `${rail}\u0000${identifier}`;
    if (!payeeKeys.has(payeeKey)) payeeKeys.set(payeeKey, { rail, identifier });
    groups.add(`${payeeKey}\u0000${normalizePurpose(payment.purpose)}`);
  }

  const payees = [...payeeKeys.values()].sort((left, right) => {
    if (left.rail === right.rail) {
      if (left.identifier === right.identifier) return 0;
      return left.identifier < right.identifier ? -1 : 1;
    }
    return left.rail < right.rail ? -1 : 1;
  });

  return {
    warn: count > maxCount && groups.size > 1,
    count,
    payeeCount: payees.length,
    payees,
  };
}
