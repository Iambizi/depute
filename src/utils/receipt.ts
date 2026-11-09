/**
 * Portable approval receipt.
 *
 * This module hashes the receipt and attaches signatures a host signer
 * returns. It does not generate keys or store keys. Program hashes on
 * the approval machine stay caller-supplied. A signature, when present,
 * is checked by a verifier the host injects.
 *
 * The CLI copies this file. It imports `./presented`, `./channel`, and `./triggers`.
 */

import type { ApprovalChannel } from './channel';
import { assertApprovalChannel } from './channel';
import type { PresentedPayload, PresentedProvenance, PresentedScope } from '../types/core';
import type { ChangeRequest } from './triggers';
import { assertChangeRequest } from './triggers';

export type {
  AgentReachability,
  ApprovalChannel,
  ApprovalChannelKind,
  ChannelRequirement,
  ChannelRule,
} from './channel';
export {
  CHANNEL_DECLARED_LABEL,
  approvalSatisfiedByCode,
  assertApprovalChannel,
  channelAllows,
  channelBlocksApproval,
  channelKindLabel,
  channelWarningText,
  reachabilityLabel,
  requiredChannelFor,
} from './channel';

export type ReceiptOutcome = 'approved' | 'rejected' | 'expired' | 'denied';
export type ReceiptChoice = 'approved' | 'rejected';
export type ReceiptMethod = 'click' | 'passkey' | 'handoff' | 'chat';
export type ReceiptExecutionStatus = 'success' | 'failed' | 'pending' | 'reverted' | 'not-run';

/** Present only when the receipt is an emergency stop. Approval receipts omit it. */
export type ReceiptKind = 'stop';

/** A later payment state. It lives on a new receipt, never on a signed one. */
export type PaymentFollowUpState = 'held' | 'voided' | 'refunded';

export interface PaymentFollowUp {
  state: PaymentFollowUpState;
  at: string;
}

const PAYMENT_FOLLOW_UPS = new Set<PaymentFollowUpState>(['held', 'voided', 'refunded']);

export function assertPaymentFollowUp(value: PaymentFollowUp): void {
  if (!PAYMENT_FOLLOW_UPS.has(value.state)) throw new Error('payment follow-up state is not recognized.');
  if (typeof value.at !== 'string' || Number.isNaN(Date.parse(value.at))) {
    throw new Error('payment follow-up needs a time.');
  }
}

/** Shown deadline when the host does not pass one. The backend still enforces it. */
export const DEFAULT_APPROVAL_EXPIRY_MS = 10 * 60 * 1000;

export function approvalDeadline(issuedAtMs: number, expiresAtMs?: number): { issuedAt: string; expiresAt: string } {
  if (!Number.isFinite(issuedAtMs)) throw new Error('issuedAt must be a time.');
  const expires = expiresAtMs ?? issuedAtMs + DEFAULT_APPROVAL_EXPIRY_MS;
  if (!Number.isFinite(expires) || expires < issuedAtMs) {
    throw new Error('expiresAt must be at or after issuedAt.');
  }
  return {
    issuedAt: new Date(issuedAtMs).toISOString(),
    expiresAt: new Date(expires).toISOString(),
  };
}

export type LimitEnforcement = 'server' | 'client' | 'agent-instruction' | 'unknown';

/** A limit the integrator says someone enforces. depute does not check that claim. */
export interface DeclaredLimit {
  label: string;
  enforcement: LimitEnforcement;
  enforcedBy?: string;
}

const LIMIT_ENFORCEMENTS = new Set<LimitEnforcement>([
  'server',
  'client',
  'agent-instruction',
  'unknown',
]);

export function assertDeclaredLimits(limits: readonly DeclaredLimit[]): void {
  for (const limit of limits) {
    if (typeof limit.label !== 'string' || limit.label.trim() === '' || !LIMIT_ENFORCEMENTS.has(limit.enforcement)) {
      throw new Error('Each limit needs a label and a declared enforcement.');
    }
    if (limit.enforcedBy !== undefined && typeof limit.enforcedBy !== 'string') {
      throw new Error('enforcedBy must be a name.');
    }
  }
}

export type CredentialMode =
  | 'delegated-token'
  | 'shared-user-credentials'
  | 'own-identity'
  | 'unknown';

/** Who acted, and whether they used the person's own login. Declared by the host. */
export interface ReceiptActor {
  agentId: string;
  vendor?: string;
  model?: string;
  credentialMode: CredentialMode;
  onBehalfOf: string;
}

const CREDENTIAL_MODES = new Set<CredentialMode>([
  'delegated-token',
  'shared-user-credentials',
  'own-identity',
  'unknown',
]);

export function assertActor(actor: ReceiptActor): void {
  if (
    typeof actor.agentId !== 'string' || actor.agentId.trim() === ''
    || typeof actor.onBehalfOf !== 'string' || actor.onBehalfOf.trim() === ''
    || !CREDENTIAL_MODES.has(actor.credentialMode)
  ) {
    throw new Error('actor needs an agent id, the person they act for, and a credential mode.');
  }
}

export type RequirementStatus = 'confirmed-with-user' | 'assumed' | 'unknown';

/** Something the agent needed. `assumed` and `unknown` need the person to say they checked. */
export interface ApprovalRequirement {
  text: string;
  status: RequirementStatus;
}

/** Hash of the terms the person was shown. The integrator keeps the full text. */
export interface TermsShown {
  textHash: string;
  sourceUrl: string;
  version: string;
  shownAt: string;
}

export function assertTermsShown(value: TermsShown): void {
  if (!isReceiptHash(value.textHash)) throw new Error('termsShown.textHash must be a sha256 digest.');
  if (typeof value.sourceUrl !== 'string' || value.sourceUrl.trim() === '') {
    throw new Error('termsShown needs a source URL.');
  }
  if (typeof value.version !== 'string' || value.version.trim() === '') {
    throw new Error('termsShown needs a version.');
  }
  if (typeof value.shownAt !== 'string' || Number.isNaN(Date.parse(value.shownAt))) {
    throw new Error('termsShown.shownAt must be a time.');
  }
}

const REQUIREMENT_STATUSES = new Set<RequirementStatus>([
  'confirmed-with-user',
  'assumed',
  'unknown',
]);

export function assertRequirements(requirements: readonly ApprovalRequirement[]): void {
  for (const item of requirements) {
    if (typeof item.text !== 'string' || item.text.trim() === '' || !REQUIREMENT_STATUSES.has(item.status)) {
      throw new Error('Each requirement needs text and a status.');
    }
  }
}

export function requirementsNeedCheck(requirements: readonly ApprovalRequirement[] | undefined): boolean {
  return requirements?.some((item) => item.status !== 'confirmed-with-user') ?? false;
}

export function actorWarning(actor: ReceiptActor): string | undefined {
  if (actor.credentialMode === 'shared-user-credentials' || actor.credentialMode === 'unknown') {
    return 'Acting as you (shared login)';
  }
  return undefined;
}

export function limitDeclaration(limit: DeclaredLimit): string {
  if (limit.enforcement === 'server') {
    return limit.enforcedBy
      ? `Enforced by ${limit.enforcedBy} (declared)`
      : 'Enforced by the server (declared)';
  }
  if (limit.enforcement === 'client') {
    return limit.enforcedBy
      ? `Enforced in the client by ${limit.enforcedBy} (declared)`
      : 'Enforced in the client (declared)';
  }
  if (limit.enforcement === 'agent-instruction') return 'Instruction only, not enforced.';
  return 'Enforcement unknown. Declared by the integrator.';
}

export interface ReceiptApprover {
  id: string;
  name?: string;
  method: ReceiptMethod;
}

export interface ReceiptDecision {
  outcome: ReceiptOutcome;
  approver?: ReceiptApprover;
  /** ISO-8601 time. */
  decidedAt: string;
  /** ISO-8601 time the payload was first shown. */
  presentedAt: string;
  reviewDurationMs?: number;
  justification?: string;
  acknowledgedTermIds?: string[];
  /** The choice the agent recommended, when the host supplied one. */
  agentRecommendation?: ReceiptChoice;
  /** The choice the person made. Set only for an approve or a reject. */
  humanChoice?: ReceiptChoice;
  /** True when the person's choice matched the recommendation. */
  agreed?: boolean;
}

export interface ReceiptExecution {
  status: ReceiptExecutionStatus;
  at?: string;
  detail?: string;
}

export interface ReceiptAttestation {
  type: string;
  value: string;
}

/** Present in the schema now. R1a does not create these. */
export interface ReceiptSignature {
  signerType: 'app' | 'user';
  algorithm: string;
  publicKey: string;
  signature: string;
  authenticatorData?: string;
  clientDataJSON?: string;
}

export interface ApprovalReceipt {
  version: '1';
  id: string;
  kind?: ReceiptKind;
  instruction: string;
  presented: {
    payload: PresentedPayload;
    payloadHash: string;
  };
  decision: ReceiptDecision;
  execution?: ReceiptExecution;
  triggers?: string[];
  provenance?: PresentedProvenance;
  highStakes?: boolean;
  /** Integrator-declared channel. Reachability is not verified. */
  approvalChannel?: ApprovalChannel;
  /** Limit or permission change shown to the person. */
  changeRequest?: ChangeRequest;
  /** Limits and who the integrator says enforces them, at approval time. */
  limits?: DeclaredLimit[];
  actor?: ReceiptActor;
  requirements?: ApprovalRequirement[];
  /** ISO-8601 time the approval was issued. */
  issuedAt?: string;
  /** ISO-8601 time the approval display expires. The backend enforces this. */
  expiresAt?: string;
  /** Hash of the terms shown. The full text stays with the integrator. */
  termsShown?: TermsShown;
  /** Set only on a follow-up receipt. The earlier receipt is not rewritten. */
  payment?: PaymentFollowUp;
  attestations?: ReceiptAttestation[];
  previousReceiptHash?: string;
  signatures?: ReceiptSignature[];
  receiptHash: string;
}

export interface ReceiptDraft {
  id: string;
  kind?: ReceiptKind;
  instruction: string;
  payload: PresentedPayload;
  decision: ReceiptDecision;
  execution?: ReceiptExecution;
  triggers?: string[];
  provenance?: PresentedProvenance;
  highStakes?: boolean;
  approvalChannel?: ApprovalChannel;
  changeRequest?: ChangeRequest;
  limits?: DeclaredLimit[];
  actor?: ReceiptActor;
  requirements?: ApprovalRequirement[];
  issuedAt?: string;
  expiresAt?: string;
  termsShown?: TermsShown;
  payment?: PaymentFollowUp;
  attestations?: ReceiptAttestation[];
  previousReceiptHash?: string;
  signatures?: ReceiptSignature[];
}

/** Fields a gate already has. `buildDecisionReceipt` fills the hashes. */
export interface DecisionReceiptInput {
  id?: string;
  kind?: ReceiptKind;
  instruction?: string;
  payload?: PresentedPayload;
  title: string;
  description?: string;
  agentReasoning?: string;
  scope?: PresentedScope;
  justification?: string;
  approver?: { id: string; name?: string };
  outcome: ReceiptOutcome;
  method?: ReceiptMethod;
  presentedAtMs: number;
  decidedAtMs: number;
  acknowledgedTermIds?: string[];
  /** When set on an approve or reject, the receipt records whether the person followed it. */
  agentRecommendation?: ReceiptChoice;
  triggers?: string[];
  provenance?: PresentedProvenance;
  highStakes?: boolean;
  approvalChannel?: ApprovalChannel;
  changeRequest?: ChangeRequest;
  limits?: DeclaredLimit[];
  actor?: ReceiptActor;
  requirements?: ApprovalRequirement[];
  /** Unix milliseconds. Defaults to `presentedAtMs`. */
  issuedAtMs?: number;
  /** Unix milliseconds. Defaults to issued time plus 10 minutes. */
  expiresAtMs?: number;
  termsShown?: TermsShown;
  previousReceiptHash?: string;
  fallbackId: string;
}

export interface ReceiptVerifier {
  verify(input: {
    algorithm: string;
    publicKey: string;
    signature: string;
    hash: string;
    authenticatorData?: string;
    clientDataJSON?: string;
    signerType: 'app' | 'user';
  }): Promise<boolean> | boolean;
}

/** App key. Signs the receipt hash string, prefixed `sha256:`. */
export interface ReceiptAppSigner {
  sign(receiptHash: string): Promise<Pick<ReceiptSignature, 'publicKey' | 'signature'>>;
}

/**
 * User passkey. The challenge is the raw 32-byte digest inside `receiptHash`.
 * The relying-party id stays with the host that built this signer.
 */
export interface ReceiptPasskeySigner {
  sign(receiptHash: string): Promise<Required<Pick<ReceiptSignature,
    'algorithm' | 'publicKey' | 'signature' | 'authenticatorData' | 'clientDataJSON'>>>;
}

export interface SignatureCheck {
  signerType: 'app' | 'user';
  status: 'valid' | 'invalid' | 'unverified';
}

export interface ReceiptVerification {
  /** Hashes match, a previous hash is well-formed when present, and every signature is valid. */
  valid: boolean;
  payload: 'match' | 'mismatch';
  receipt: 'match' | 'mismatch';
  previousReceiptHash: 'absent' | 'well-formed' | 'malformed';
  signatures: SignatureCheck[];
}

const HASH_RE = /^sha256:[0-9a-f]{64}$/;

const K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

function rotr(x: number, n: number): number {
  return (x >>> n) | (x << (32 - n));
}

function utf8(text: string): Uint8Array {
  const bytes: number[] = [];
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code < 0x10000) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f),
      );
    }
  }
  return Uint8Array.from(bytes);
}

/** Lowercase hex SHA-256 of a UTF-8 string, prefixed `sha256:`. */
export function sha256(text: string): string {
  const data = utf8(text);
  const bitLength = data.length * 8;
  const pad = (64 - ((data.length + 9) % 64)) % 64;
  const padded = new Uint8Array(data.length + 1 + pad + 8);
  padded.set(data);
  padded[data.length] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(padded.length - 8, Math.floor(bitLength / 0x100000000));
  view.setUint32(padded.length - 4, bitLength >>> 0);

  const h = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ]);
  const w = new Uint32Array(64);

  for (let offset = 0; offset < padded.length; offset += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(offset + i * 4);
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }
    let a = h[0], b = h[1], c = h[2], d = h[3], e = h[4], f = h[5], g = h[6], hh = h[7];
    for (let i = 0; i < 64; i++) {
      const s1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (hh + s1 + ch + K[i] + w[i]) >>> 0;
      const s0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (s0 + maj) >>> 0;
      hh = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }
    h[0] = (h[0] + a) >>> 0;
    h[1] = (h[1] + b) >>> 0;
    h[2] = (h[2] + c) >>> 0;
    h[3] = (h[3] + d) >>> 0;
    h[4] = (h[4] + e) >>> 0;
    h[5] = (h[5] + f) >>> 0;
    h[6] = (h[6] + g) >>> 0;
    h[7] = (h[7] + hh) >>> 0;
  }

  let hex = '';
  for (const word of h) hex += word.toString(16).padStart(8, '0');
  return `sha256:${hex}`;
}

function encode(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') {
    if (!Number.isInteger(value) || !Number.isSafeInteger(value)) {
      throw new Error('Canonical JSON allows only safe integers.');
    }
    return String(value);
  }
  if (Array.isArray(value)) {
    const items = value.map((item) => {
      if (item === undefined) throw new Error('Canonical JSON does not allow empty array slots.');
      return encode(item);
    });
    return `[${items.join(',')}]`;
  }
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const keys = Object.keys(record).filter((key) => record[key] !== undefined).sort();
    return `{${keys.map((key) => `${JSON.stringify(key)}:${encode(record[key])}`).join(',')}}`;
  }
  throw new Error('Canonical JSON cannot encode this value.');
}

/** Sorted-key JSON, UTF-8, no extra whitespace. Undefined fields are omitted. */
export function canonicalize(value: unknown): string {
  return encode(value);
}

export function isReceiptHash(value: string): boolean {
  return HASH_RE.test(value);
}

function hashBody(receipt: Omit<ApprovalReceipt, 'receiptHash' | 'signatures'>): string {
  return sha256(canonicalize(receipt));
}

export function buildReceipt(draft: ReceiptDraft): ApprovalReceipt {
  if (draft.previousReceiptHash !== undefined && !isReceiptHash(draft.previousReceiptHash)) {
    throw new Error('previousReceiptHash must be a sha256 digest.');
  }
  if (draft.approvalChannel) assertApprovalChannel(draft.approvalChannel);
  if (draft.changeRequest) assertChangeRequest(draft.changeRequest);
  if (draft.limits) assertDeclaredLimits(draft.limits);
  if (draft.actor) assertActor(draft.actor);
  if (draft.requirements) assertRequirements(draft.requirements);
  if (draft.termsShown) assertTermsShown(draft.termsShown);
  if (draft.kind !== undefined && draft.kind !== 'stop') {
    throw new Error('receipt kind must be stop when set.');
  }
  if (draft.payment) {
    assertPaymentFollowUp(draft.payment);
    if (!draft.previousReceiptHash) throw new Error('A payment follow-up needs previousReceiptHash.');
  }
  const payloadHash = sha256(canonicalize(draft.payload));
  const unsigned = {
    version: '1' as const,
    id: draft.id,
    kind: draft.kind,
    instruction: draft.instruction,
    presented: { payload: draft.payload, payloadHash },
    decision: draft.decision,
    execution: draft.execution,
    triggers: draft.triggers,
    provenance: draft.provenance,
    highStakes: draft.highStakes,
    approvalChannel: draft.approvalChannel,
    changeRequest: draft.changeRequest,
    limits: draft.limits,
    actor: draft.actor,
    requirements: draft.requirements,
    issuedAt: draft.issuedAt,
    expiresAt: draft.expiresAt,
    termsShown: draft.termsShown,
    payment: draft.payment,
    attestations: draft.attestations,
    previousReceiptHash: draft.previousReceiptHash,
  };
  return {
    ...unsigned,
    signatures: draft.signatures,
    receiptHash: hashBody(unsigned),
  };
}

/** A new receipt for a later payment state. The previous receipt is not changed. */
export function buildPaymentFollowUp(input: {
  previousReceiptHash: string;
  state: PaymentFollowUpState;
  atMs: number;
  title: string;
  id?: string;
}): ApprovalReceipt {
  return buildReceipt({
    id: input.id ?? input.previousReceiptHash,
    instruction: input.title,
    payload: { title: input.title },
    decision: {
      outcome: 'approved',
      decidedAt: new Date(input.atMs).toISOString(),
      presentedAt: new Date(input.atMs).toISOString(),
    },
    payment: { state: input.state, at: new Date(input.atMs).toISOString() },
    previousReceiptHash: input.previousReceiptHash,
  });
}

export function buildDecisionReceipt(input: DecisionReceiptInput): ApprovalReceipt {
  const payload: PresentedPayload = input.payload ?? {
    title: input.title,
    description: input.description,
    agentReasoning: input.agentReasoning,
    scope: input.scope,
    justification: input.justification,
    provenance: input.provenance,
  };
  const deadline = approvalDeadline(input.issuedAtMs ?? input.presentedAtMs, input.expiresAtMs);
  const reviewDurationMs = Math.max(0, input.decidedAtMs - input.presentedAtMs);
  const method = input.method ?? 'click';
  const decision: ReceiptDecision = {
    outcome: input.outcome,
    decidedAt: new Date(input.decidedAtMs).toISOString(),
    presentedAt: new Date(input.presentedAtMs).toISOString(),
    reviewDurationMs,
    justification: input.justification ?? payload.justification,
    acknowledgedTermIds: input.acknowledgedTermIds,
  };
  if (input.approver && input.outcome !== 'expired') {
    decision.approver = { ...input.approver, method };
  }
  if (
    input.agentRecommendation
    && (input.outcome === 'approved' || input.outcome === 'rejected')
  ) {
    decision.agentRecommendation = input.agentRecommendation;
    decision.humanChoice = input.outcome;
    decision.agreed = input.agentRecommendation === input.outcome;
  }
  return buildReceipt({
    id: input.id ?? input.fallbackId,
    kind: input.kind,
    instruction: input.instruction ?? input.title,
    payload,
    decision,
    triggers: input.triggers,
    provenance: input.provenance ?? payload.provenance,
    highStakes: input.highStakes,
    approvalChannel: input.approvalChannel,
    changeRequest: input.changeRequest,
    limits: input.limits,
    actor: input.actor,
    requirements: input.requirements,
    issuedAt: deadline.issuedAt,
    expiresAt: deadline.expiresAt,
    termsShown: input.termsShown,
    previousReceiptHash: input.previousReceiptHash,
  });
}

export async function verify(
  receipt: ApprovalReceipt,
  verifier?: ReceiptVerifier,
): Promise<ReceiptVerification> {
  const compare = (run: () => boolean): 'match' | 'mismatch' => {
    try {
      return run() ? 'match' : 'mismatch';
    } catch {
      return 'mismatch';
    }
  };
  const payload = compare(() => sha256(canonicalize(receipt.presented.payload)) === receipt.presented.payloadHash);
  const receiptStatus = compare(() => {
    const body: Record<string, unknown> = { ...receipt };
    delete body.receiptHash;
    delete body.signatures;
    return sha256(canonicalize(body)) === receipt.receiptHash;
  });

  const previousReceiptHash = receipt.previousReceiptHash === undefined
    ? 'absent'
    : isReceiptHash(receipt.previousReceiptHash) ? 'well-formed' : 'malformed';

  const signatures: SignatureCheck[] = [];
  for (const entry of receipt.signatures ?? []) {
    if (!verifier) {
      signatures.push({ signerType: entry.signerType, status: 'unverified' });
      continue;
    }
    const ok = await verifier.verify({
      algorithm: entry.algorithm,
      publicKey: entry.publicKey,
      signature: entry.signature,
      hash: receipt.receiptHash,
      authenticatorData: entry.authenticatorData,
      clientDataJSON: entry.clientDataJSON,
      signerType: entry.signerType,
    });
    signatures.push({ signerType: entry.signerType, status: ok ? 'valid' : 'invalid' });
  }

  const signaturesOk = signatures.every((entry) => entry.status === 'valid');
  return {
    valid: payload === 'match'
      && receiptStatus === 'match'
      && previousReceiptHash !== 'malformed'
      && signaturesOk,
    payload,
    receipt: receiptStatus,
    previousReceiptHash,
    signatures,
  };
}

/** Short status for a verify button. Hash and signature failures stay distinct. */
export function receiptCheckLabel(result: ReceiptVerification): string {
  const hashOk = result.payload === 'match'
    && result.receipt === 'match'
    && result.previousReceiptHash !== 'malformed';
  if (!hashOk) return 'Hash does not match';
  if (result.signatures.some((entry) => entry.status === 'invalid')) {
    return 'Hash matches. Signature does not.';
  }
  if (result.signatures.some((entry) => entry.status === 'unverified')) {
    return 'Hash matches. Signature was not checked.';
  }
  return 'Hash matches';
}

/** Append signatures. They are outside the hash, so the digest stays put. */
export function withSignatures(
  receipt: ApprovalReceipt,
  signatures: ReceiptSignature[],
): ApprovalReceipt {
  if (signatures.length === 0) return receipt;
  return {
    ...receipt,
    signatures: [...(receipt.signatures ?? []), ...signatures],
  };
}

function wantsPasskey(
  outcome: ReceiptOutcome,
  highStakes: boolean | undefined,
  passkey: ReceiptPasskeySigner | undefined,
): boolean {
  const human = outcome === 'approved' || outcome === 'rejected';
  return Boolean(highStakes) && passkey !== undefined && human;
}

/**
 * Ask the host signers for signatures. The app signer runs for every
 * outcome. The passkey runs only for a high-stakes approval or rejection.
 */
export async function signApprovalReceipt(
  receipt: ApprovalReceipt,
  signers: { app?: ReceiptAppSigner; passkey?: ReceiptPasskeySigner },
): Promise<ApprovalReceipt> {
  const jobs: Promise<ReceiptSignature>[] = [];
  if (signers.app) {
    const app = signers.app;
    jobs.push(app.sign(receipt.receiptHash).then((signed) => ({
      signerType: 'app' as const,
      algorithm: 'Ed25519',
      publicKey: signed.publicKey,
      signature: signed.signature,
    })));
  }
  if (wantsPasskey(receipt.decision.outcome, receipt.highStakes, signers.passkey) && signers.passkey) {
    const passkey = signers.passkey;
    jobs.push(passkey.sign(receipt.receiptHash).then((signed) => ({
      signerType: 'user' as const,
      algorithm: signed.algorithm,
      publicKey: signed.publicKey,
      signature: signed.signature,
      authenticatorData: signed.authenticatorData,
      clientDataJSON: signed.clientDataJSON,
    })));
  }
  return withSignatures(receipt, await Promise.all(jobs));
}

/** Build the receipt, then attach host signatures when signers are set. */
export async function buildSignedDecisionReceipt(
  input: DecisionReceiptInput,
  signers: { app?: ReceiptAppSigner; passkey?: ReceiptPasskeySigner } = {},
): Promise<ApprovalReceipt> {
  const method = wantsPasskey(input.outcome, input.highStakes, signers.passkey)
    ? 'passkey'
    : input.method;
  const receipt = buildDecisionReceipt({ ...input, method });
  if (!signers.app && !signers.passkey) return receipt;
  return signApprovalReceipt(receipt, signers);
}
