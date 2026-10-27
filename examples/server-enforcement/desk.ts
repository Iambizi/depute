/**
 * Dispatch-point enforcement for one tool call or one program.
 *
 * The actor always comes from the session. A name in the request body
 * is not an approver. The program hash is computed here, from the text
 * that was approved and from the text presented at execution. Core only
 * compares the two digests.
 *
 * This is a Node handler, not a sandbox. A V8 isolate is a live place to
 * run the program (epic Q3). This file does not choose that runtime.
 * Refusing a call makes the decision legible. It does not make the action
 * safe, and it does not absorb liability.
 */

import { createHash } from 'node:crypto';
import {
  createApproval,
  toDecisionRecord,
  transition,
  type Actor,
  type ApprovalEvent,
  type ApprovalRequest,
  type ApprovalSnapshot,
  type DeclaredEffect,
  type DecisionRecordView,
  type ResourceLimits,
} from '../../packages/core/src/index';

export interface Session {
  actorId: string;
  name?: string;
}

export interface AuditEntry {
  approvalId: string;
  at: number;
  kind: string;
  accepted: boolean;
  error?: string;
}

export interface HandlerResult {
  accepted: boolean;
  error?: string;
  snapshot?: ApprovalSnapshot;
}

export interface ToolCallInput {
  id: string;
  action: string;
  title: string;
  approverIds: string[];
  deadline: number;
}

export interface ProgramInput extends ToolCallInput {
  programText: string;
  allowedBindings: string[];
  declaredEffects?: DeclaredEffect[];
  resourceLimits?: ResourceLimits;
}

export interface Desk {
  history(): readonly AuditEntry[];
  get(id: string): ApprovalSnapshot | undefined;
  createToolCall(input: ToolCallInput): ApprovalSnapshot;
  createProgram(input: ProgramInput): ApprovalSnapshot;
  approve(id: string, session: Session, at: number, body?: { by?: Actor; reason?: string }): HandlerResult;
  execute(id: string, at: number, presentedText?: string): HandlerResult;
  dispatch(id: string, binding: string, at: number, detail?: string): HandlerResult;
  decision(id: string, logs?: string[]): DecisionRecordView;
}

export function hashProgram(text: string): string {
  return createHash('sha256').update(text).digest('hex');
}

export function createDesk(): Desk {
  const records = new Map<string, ApprovalSnapshot>();
  const log: AuditEntry[] = [];

  function apply(id: string, at: number, kind: string, event: ApprovalEvent): HandlerResult {
    const current = records.get(id);
    if (!current) {
      const error = 'Unknown approval';
      log.push({ approvalId: id, at, kind, accepted: false, error });
      return { accepted: false, error };
    }
    const next = transition(current, event);
    if (next.error) {
      log.push({ approvalId: id, at, kind, accepted: false, error: next.error });
      return { accepted: false, error: next.error, snapshot: current };
    }
    records.set(id, next);
    log.push({ approvalId: id, at, kind, accepted: true });
    return { accepted: true, snapshot: next };
  }

  return {
    history: () => log,
    get: (id) => records.get(id),
    createToolCall(input) {
      const request: ApprovalRequest = {
        id: input.id,
        action: input.action,
        title: input.title,
        actionKind: 'tool-call',
        mode: 'simple',
        createdAt: 0,
        approverIds: input.approverIds,
        deadline: input.deadline,
      };
      const snapshot = createApproval(request);
      records.set(input.id, snapshot);
      log.push({ approvalId: input.id, at: 0, kind: 'CREATE', accepted: true });
      return snapshot;
    },
    createProgram(input) {
      const request: ApprovalRequest = {
        id: input.id,
        action: input.action,
        title: input.title,
        actionKind: 'program',
        mode: 'simple',
        createdAt: 0,
        approverIds: input.approverIds,
        deadline: input.deadline,
        programText: input.programText,
        programHash: hashProgram(input.programText),
        allowedBindings: [...input.allowedBindings],
        declaredEffects: input.declaredEffects?.map((effect) => ({ ...effect })),
        resourceLimits: input.resourceLimits ? { ...input.resourceLimits } : undefined,
      };
      const snapshot = createApproval(request);
      records.set(input.id, snapshot);
      log.push({ approvalId: input.id, at: 0, kind: 'CREATE', accepted: true });
      return snapshot;
    },
    approve(id, session, at, body) {
      const actor: Actor = { id: session.actorId, name: session.name };
      return apply(id, at, 'APPROVE', {
        type: 'APPROVE',
        by: actor,
        at,
        reason: body?.reason,
      });
    },
    execute(id, at, presentedText) {
      const current = records.get(id);
      const programHash = current?.request.actionKind === 'program'
        ? hashProgram(presentedText ?? '')
        : undefined;
      return apply(id, at, 'EXECUTE', { type: 'EXECUTE', at, programHash });
    },
    dispatch(id, binding, at, detail) {
      return apply(id, at, 'DISPATCH', { type: 'DISPATCH', at, binding, detail });
    },
    decision(id, logs) {
      const snapshot = records.get(id);
      if (!snapshot) throw new Error(`Unknown approval ${id}`);
      return toDecisionRecord(snapshot, { logs });
    },
  };
}
