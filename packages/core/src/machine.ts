import type {
  ApprovalEvent,
  ApprovalSnapshot,
  DecisionRecordView,
  ProgramDispatch,
} from './types';

const TERMINAL = new Set<ApprovalSnapshot['state']>([
  'rejected',
  'expired',
  'handoff_expired',
  'handoff_denied',
]);

function refuse(snapshot: ApprovalSnapshot, error: string): ApprovalSnapshot {
  return { ...snapshot, error };
}

function accept(
  snapshot: ApprovalSnapshot,
  event: ApprovalEvent,
  patch: Partial<Omit<ApprovalSnapshot, 'history' | 'request'>> = {},
): ApprovalSnapshot {
  return {
    request: snapshot.request,
    state: patch.state ?? snapshot.state,
    acknowledged: patch.acknowledged ?? snapshot.acknowledged,
    deadline: patch.deadline !== undefined ? patch.deadline : snapshot.deadline,
    history: [...snapshot.history, event],
    consumed: patch.consumed ?? snapshot.consumed,
    dispatches: patch.dispatches ?? snapshot.dispatches,
  };
}

function pastDeadline(snapshot: ApprovalSnapshot, at: number): boolean {
  const deadline = snapshot.deadline ?? snapshot.request.deadline;
  return deadline !== undefined && at > deadline;
}

function approverAllowed(snapshot: ApprovalSnapshot, actorId: string): boolean {
  const roster = snapshot.request.approverIds;
  if (!roster || roster.length === 0) return true;
  return roster.includes(actorId);
}

function canDecide(snapshot: ApprovalSnapshot): boolean {
  return snapshot.state === 'pending' || snapshot.state === 'handoff_pending';
}

export function createApproval(request: ApprovalSnapshot['request']): ApprovalSnapshot {
  return {
    request: structuredClone(request),
    state: 'pending',
    acknowledged: [],
    deadline: request.deadline,
    history: [],
    consumed: false,
    dispatches: [],
  };
}

export function isTerminal(state: ApprovalSnapshot['state']): boolean {
  return TERMINAL.has(state);
}

export function can(snapshot: ApprovalSnapshot, type: ApprovalEvent['type']): boolean {
  switch (type) {
    case 'APPROVE':
    case 'REJECT':
      return canDecide(snapshot);
    case 'HANDOFF':
      return snapshot.state === 'pending';
    case 'ACK_TERM':
      return canDecide(snapshot);
    case 'TICK':
      return !isTerminal(snapshot.state);
    case 'EXECUTE':
    case 'DISPATCH':
      return snapshot.state === 'approved' && !snapshot.consumed;
    default:
      return false;
  }
}

export function transition(snapshot: ApprovalSnapshot, event: ApprovalEvent): ApprovalSnapshot {
  switch (event.type) {
    case 'APPROVE':
    case 'REJECT': {
      if (!canDecide(snapshot)) return refuse(snapshot, `${event.type} is not allowed from ${snapshot.state}`);
      if (pastDeadline(snapshot, event.at)) return refuse(snapshot, `${event.type} is after the deadline`);
      if (!approverAllowed(snapshot, event.by.id)) return refuse(snapshot, `${event.type} actor is not an approver`);
      const state = event.type === 'APPROVE'
        ? 'approved'
        : snapshot.state === 'handoff_pending'
          ? 'handoff_denied'
          : 'rejected';
      return accept(snapshot, event, { state });
    }
    case 'HANDOFF': {
      if (snapshot.state !== 'pending') return refuse(snapshot, `HANDOFF is not allowed from ${snapshot.state}`);
      return accept(snapshot, event, { state: 'handoff_pending', deadline: event.deadline });
    }
    case 'ACK_TERM': {
      if (!canDecide(snapshot)) return refuse(snapshot, `ACK_TERM is not allowed from ${snapshot.state}`);
      const known = snapshot.request.terms?.some((term) => term.id === event.termId) ?? false;
      if (!known) return refuse(snapshot, `Unknown term ${event.termId}`);
      if (snapshot.acknowledged.includes(event.termId)) return accept(snapshot, event);
      return accept(snapshot, event, { acknowledged: [...snapshot.acknowledged, event.termId] });
    }
    case 'TICK': {
      if (isTerminal(snapshot.state)) return refuse(snapshot, `TICK is not allowed from ${snapshot.state}`);
      if (!pastDeadline(snapshot, event.at)) return accept(snapshot, event);
      if (snapshot.state === 'handoff_pending') {
        const fallback = snapshot.request.handoff?.fallback ?? 'block';
        const state = fallback === 'deny' ? 'handoff_denied' : 'handoff_expired';
        return accept(snapshot, event, { state });
      }
      return accept(snapshot, event, { state: 'expired' });
    }
    case 'EXECUTE': {
      if (snapshot.state !== 'approved') return refuse(snapshot, `EXECUTE is not allowed from ${snapshot.state}`);
      if (snapshot.consumed) return refuse(snapshot, 'Approval already consumed');
      if (pastDeadline(snapshot, event.at)) return refuse(snapshot, 'EXECUTE is after the deadline');
      if (snapshot.request.actionKind === 'program') {
        if (!snapshot.request.programHash || event.programHash !== snapshot.request.programHash) {
          return refuse(snapshot, 'Program hash does not match the approved program');
        }
      }
      return accept(snapshot, event, { consumed: true });
    }
    case 'DISPATCH': {
      if (snapshot.state !== 'approved') return refuse(snapshot, `DISPATCH is not allowed from ${snapshot.state}`);
      if (snapshot.consumed) return refuse(snapshot, 'Approval already consumed');
      if (pastDeadline(snapshot, event.at)) return refuse(snapshot, 'DISPATCH is after the deadline');
      if (snapshot.request.actionKind !== 'program') {
        return refuse(snapshot, 'DISPATCH applies to program approvals');
      }
      const allowed = snapshot.request.allowedBindings ?? [];
      if (!allowed.includes(event.binding)) {
        return refuse(snapshot, `Binding ${event.binding} is outside the approved set`);
      }
      const dispatch: ProgramDispatch = {
        binding: event.binding,
        detail: event.detail,
        at: event.at,
      };
      return accept(snapshot, event, { dispatches: [...snapshot.dispatches, dispatch] });
    }
    default:
      return snapshot;
  }
}

export function toDecisionRecord(
  snapshot: ApprovalSnapshot,
  extras?: { logs?: string[] },
): DecisionRecordView {
  const decisionEvent = [...snapshot.history].reverse().find(
    (event) => event.type === 'APPROVE' || event.type === 'REJECT',
  );
  const approver = decisionEvent && (decisionEvent.type === 'APPROVE' || decisionEvent.type === 'REJECT')
    ? {
        id: decisionEvent.by.id,
        name: decisionEvent.by.name,
        role: decisionEvent.by.role,
        at: decisionEvent.at,
      }
    : undefined;
  const reasoning = decisionEvent && 'reason' in decisionEvent ? decisionEvent.reason : undefined;
  const view: DecisionRecordView = {
    decision: snapshot.state === 'approved' ? 'approved' : 'rejected',
    final: snapshot.state === 'approved' || snapshot.state === 'rejected' || snapshot.state === 'handoff_denied',
    approver,
    intent: snapshot.request.action,
    reasoning,
  };
  if (snapshot.request.actionKind === 'program') {
    view.program = {
      programText: snapshot.request.programText,
      programHash: snapshot.request.programHash,
      bindings: [...(snapshot.request.allowedBindings ?? [])],
      declaredEffects: [...(snapshot.request.declaredEffects ?? [])],
      logs: [...(extras?.logs ?? [])],
      dispatches: snapshot.dispatches.map((dispatch) => ({ ...dispatch })),
    };
  }
  return view;
}
