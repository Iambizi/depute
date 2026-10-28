/**
 * Portable approval receipt.
 *
 * This module hashes the receipt. It does not generate keys,
 * store keys, or sign. Program hashes on the approval machine stay
 * caller-supplied. A signature, when present, is checked by a verifier
 * the host injects.
 *
 * The CLI copies this file. It imports only `./presented`.
 */

import type { PresentedPayload, PresentedProvenance, PresentedScope } from './presented';

export type ReceiptOutcome = 'approved' | 'rejected' | 'expired' | 'denied';
export type ReceiptMethod = 'click' | 'passkey' | 'handoff' | 'chat';
export type ReceiptExecutionStatus = 'success' | 'failed' | 'pending' | 'reverted' | 'not-run';

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
  attestations?: ReceiptAttestation[];
  previousReceiptHash?: string;
  signatures?: ReceiptSignature[];
  receiptHash: string;
}

export interface ReceiptDraft {
  id: string;
  instruction: string;
  payload: PresentedPayload;
  decision: ReceiptDecision;
  execution?: ReceiptExecution;
  triggers?: string[];
  provenance?: PresentedProvenance;
  highStakes?: boolean;
  attestations?: ReceiptAttestation[];
  previousReceiptHash?: string;
  signatures?: ReceiptSignature[];
}

/** Fields a gate already has. `buildDecisionReceipt` fills the hashes. */
export interface DecisionReceiptInput {
  id?: string;
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
  triggers?: string[];
  provenance?: PresentedProvenance;
  highStakes?: boolean;
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
  const payloadHash = sha256(canonicalize(draft.payload));
  const unsigned = {
    version: '1' as const,
    id: draft.id,
    instruction: draft.instruction,
    presented: { payload: draft.payload, payloadHash },
    decision: draft.decision,
    execution: draft.execution,
    triggers: draft.triggers,
    provenance: draft.provenance,
    highStakes: draft.highStakes,
    attestations: draft.attestations,
    previousReceiptHash: draft.previousReceiptHash,
  };
  return {
    ...unsigned,
    signatures: draft.signatures,
    receiptHash: hashBody(unsigned),
  };
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
  return buildReceipt({
    id: input.id ?? input.fallbackId,
    instruction: input.instruction ?? input.title,
    payload,
    decision,
    triggers: input.triggers,
    provenance: input.provenance ?? payload.provenance,
    highStakes: input.highStakes,
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
