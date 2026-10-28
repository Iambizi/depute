/**
 * Framework-free approval model.
 *
 * Hashes and signatures are caller-supplied strings. This module never
 * computes them. Recording a decision here does not make the action safe
 * and does not absorb liability. The caller's server is the authority.
 */

export type ApprovalState =
  | 'pending'
  | 'handoff_pending'
  | 'approved'
  | 'rejected'
  | 'expired'
  | 'handoff_expired'
  | 'handoff_denied';

export type ActionKind = 'tool-call' | 'program';

export type EffectKind = 'read' | 'write' | 'move';

export type FallbackBehavior = 'block' | 'abort' | 'deny';

export interface Actor {
  id: string;
  name?: string;
  role?: string;
  channel?: string;
}

export interface DeclaredEffect {
  kind: EffectKind;
  target?: string;
  detail?: string;
}

export interface ResourceLimits {
  durationSeconds?: number;
  spend?: string;
  scope?: string;
}

export interface ApprovalRequest {
  id: string;
  action: string;
  title: string;
  /** Single tool call, or a program that will dispatch many calls from a sandbox. */
  actionKind: ActionKind;
  riskScore?: number;
  confidence?: number;
  scope?: {
    resourceLimit?: string;
    durationSeconds?: number;
    target?: string;
  };
  mode: 'simple' | 'staged' | 'binding';
  terms?: { id: string; text: string }[];
  timeoutMs?: number;
  handoff?: {
    timeoutMs: number;
    fallback: FallbackBehavior;
    requireSigning?: boolean;
  };
  createdAt: number;
  /** Server clock deadline. Events at a later `at` are refused. */
  deadline?: number;
  /** Actors allowed to approve. Empty or omitted skips the roster check. */
  approverIds?: string[];
  /** Program source. Display and audit. The hash is compared, not computed here. */
  programText?: string;
  /** Caller-supplied digest of the approved program text. */
  programHash?: string;
  /** Tool or API names a program may dispatch. */
  allowedBindings?: string[];
  declaredEffects?: DeclaredEffect[];
  resourceLimits?: ResourceLimits;
}

export type ApprovalEvent =
  | { type: 'APPROVE'; by: Actor; at: number; reason?: string }
  | { type: 'REJECT'; by: Actor; at: number; reason?: string }
  | { type: 'ACK_TERM'; termId: string }
  | { type: 'HANDOFF'; deadline: number; at: number }
  | { type: 'TICK'; at: number }
  | { type: 'EXECUTE'; at: number; programHash?: string }
  | { type: 'DISPATCH'; at: number; binding: string; detail?: string };

export interface ProgramDispatch {
  binding: string;
  detail?: string;
  at: number;
}

export interface ApprovalSnapshot {
  request: ApprovalRequest;
  state: ApprovalState;
  acknowledged: string[];
  deadline?: number;
  history: ApprovalEvent[];
  consumed: boolean;
  dispatches: ProgramDispatch[];
  error?: string;
}

/**
 * Caller-supplied receipt. `programHash` and `dispatches` are strings the
 * server already produced. This type does not hash or sign.
 */
export interface Receipt {
  transactionId: string;
  status: 'success' | 'failed' | 'pending' | 'reverted';
  timestamp: string;
  approvalId: string;
  hash?: string;
  signature?: string;
  programHash?: string;
  dispatches?: string[];
}

export interface ProgramReceiptView {
  programText?: string;
  programHash?: string;
  bindings: string[];
  declaredEffects: DeclaredEffect[];
  /** Caller-supplied console output. Not produced by the reducer. */
  logs: string[];
  dispatches: ProgramDispatch[];
}

export interface DecisionRecordView {
  decision: 'approved' | 'rejected';
  /** False when the snapshot is not an approval or a rejection yet. */
  final: boolean;
  approver?: { id: string; name?: string; role?: string; at?: number };
  intent: string;
  reasoning?: string;
  program?: ProgramReceiptView;
}

export type {
  ApprovalHandoff,
  HandoffContext,
  PresentedAmount,
  PresentedLineItem,
  PresentedPayload,
  PresentedPayee,
  PresentedProvenance,
  PresentedScope,
  ProvenanceTrust,
} from './presented';
