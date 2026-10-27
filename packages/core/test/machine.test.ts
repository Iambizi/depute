import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  can,
  createApproval,
  isTerminal,
  toDecisionRecord,
  transition,
  type ApprovalEvent,
  type ApprovalSnapshot,
  type ApprovalState,
} from '../src/index';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function snapshot(state: ApprovalState, patch?: Partial<ApprovalSnapshot['request']>): ApprovalSnapshot {
  const request = {
    id: 'apr-1',
    action: 'wire',
    title: 'Wire',
    actionKind: 'tool-call' as const,
    mode: 'simple' as const,
    createdAt: 0,
    terms: [{ id: 't1', text: 'I understand' }],
    approverIds: ['ada'],
    ...patch,
  };
  return {
    request,
    state,
    acknowledged: [],
    deadline: request.deadline,
    history: [],
    consumed: false,
    dispatches: [],
  };
}

const events: Record<ApprovalEvent['type'], ApprovalEvent> = {
  APPROVE: { type: 'APPROVE', by: { id: 'ada', name: 'Ada' }, at: 10, reason: 'within policy' },
  REJECT: { type: 'REJECT', by: { id: 'ada' }, at: 10, reason: 'no' },
  ACK_TERM: { type: 'ACK_TERM', termId: 't1' },
  HANDOFF: { type: 'HANDOFF', deadline: 50, at: 10 },
  TICK: { type: 'TICK', at: 10 },
  EXECUTE: { type: 'EXECUTE', at: 10 },
  DISPATCH: { type: 'DISPATCH', at: 10, binding: 'mail.send' },
};

const states: ApprovalState[] = [
  'pending',
  'handoff_pending',
  'approved',
  'rejected',
  'expired',
  'handoff_expired',
  'handoff_denied',
];

describe('transition matrix', () => {
  it.each(states.flatMap((state) => (Object.keys(events) as ApprovalEvent['type'][]).map((type) => [state, type] as const)))(
    '%s + %s',
    (state, type) => {
      const before = snapshot(state);
      const after = transition(before, events[type]);
      if (after.error) {
        expect(after.state).toBe(before.state);
        expect(after.history).toBe(before.history);
        expect(after.consumed).toBe(before.consumed);
        expect(after.dispatches).toBe(before.dispatches);
      } else {
        expect(after.history).toHaveLength(1);
      }
    },
  );
});

describe('can and isTerminal', () => {
  it('treats rejected, expired, and handoff terminals as terminal', () => {
    expect(isTerminal('approved')).toBe(false);
    expect(isTerminal('pending')).toBe(false);
    expect(isTerminal('rejected')).toBe(true);
    expect(isTerminal('expired')).toBe(true);
    expect(isTerminal('handoff_expired')).toBe(true);
    expect(isTerminal('handoff_denied')).toBe(true);
    expect(can(snapshot('pending'), 'APPROVE')).toBe(true);
    expect(can(snapshot('approved'), 'EXECUTE')).toBe(true);
    expect(can(snapshot('approved'), 'DISPATCH')).toBe(true);
    expect(can(snapshot('rejected'), 'EXECUTE')).toBe(false);
  });
});

describe('single-call approval', () => {
  it('approves from pending and refuses a second decision', () => {
    const pending = createApproval(snapshot('pending').request);
    const approved = transition(pending, events.APPROVE);
    expect(approved.state).toBe('approved');
    expect(approved.error).toBeUndefined();
    const again = transition(approved, events.APPROVE);
    expect(again.error).toMatch(/not allowed/);
    expect(again.state).toBe('approved');
  });

  it('rejects an approve after the deadline and from a non-approver', () => {
    const pending = snapshot('pending', { deadline: 5 });
    const late = transition(pending, { type: 'APPROVE', by: { id: 'ada' }, at: 6 });
    expect(late.error).toMatch(/deadline/);
    expect(late.state).toBe('pending');
    const stranger = transition(pending, { type: 'APPROVE', by: { id: 'eve' }, at: 1 });
    expect(stranger.error).toMatch(/not an approver/);
    expect(stranger.state).toBe('pending');
  });

  it('expires a handoff the same way for block and abort, and denies for deny', () => {
    for (const fallback of ['block', 'abort'] as const) {
      const waiting = snapshot('handoff_pending', {
        deadline: 5,
        handoff: { timeoutMs: 1, fallback },
      });
      const expired = transition(waiting, { type: 'TICK', at: 6 });
      expect(expired.state).toBe('handoff_expired');
    }
    const waiting = snapshot('handoff_pending', {
      deadline: 5,
      handoff: { timeoutMs: 1, fallback: 'deny' },
    });
    expect(transition(waiting, { type: 'TICK', at: 6 }).state).toBe('handoff_denied');
  });

  it('consumes a tool-call execution once', () => {
    const approved = snapshot('approved');
    const done = transition(approved, events.EXECUTE);
    expect(done.consumed).toBe(true);
    expect(done.error).toBeUndefined();
    const replay = transition(done, events.EXECUTE);
    expect(replay.error).toMatch(/consumed/);
    expect(replay.consumed).toBe(true);
  });
});

describe('program approval', () => {
  const program = {
    actionKind: 'program' as const,
    programText: 'await mail.send()',
    programHash: 'hash-ok',
    allowedBindings: ['mail.send'],
    declaredEffects: [{ kind: 'write' as const, target: 'mailbox' }],
  };

  it('rejects execution before approval', () => {
    const pending = snapshot('pending', program);
    const result = transition(pending, { type: 'EXECUTE', at: 10, programHash: 'hash-ok' });
    expect(result.error).toMatch(/not allowed/);
    expect(result.consumed).toBe(false);
  });

  it('rejects a program whose hash differs from the approved text', () => {
    const approved = snapshot('approved', program);
    const result = transition(approved, { type: 'EXECUTE', at: 10, programHash: 'hash-tampered' });
    expect(result.error).toMatch(/hash/);
    expect(result.consumed).toBe(false);
    expect(result.history).toHaveLength(0);
  });

  it('rejects a dispatch outside the approved bindings', () => {
    const approved = snapshot('approved', program);
    const result = transition(approved, { type: 'DISPATCH', at: 10, binding: 'wire.send' });
    expect(result.error).toMatch(/outside the approved set/);
    expect(result.dispatches).toHaveLength(0);
  });

  it('rejects replay of a consumed program approval', () => {
    const approved = snapshot('approved', program);
    const ran = transition(approved, { type: 'EXECUTE', at: 10, programHash: 'hash-ok' });
    expect(ran.consumed).toBe(true);
    const replay = transition(ran, { type: 'EXECUTE', at: 11, programHash: 'hash-ok' });
    expect(replay.error).toMatch(/consumed/);
  });

  it('records allowed dispatches and keeps them on the decision record beside logs', () => {
    let current = snapshot('approved', program);
    current = transition(current, { type: 'DISPATCH', at: 10, binding: 'mail.send', detail: 'to ada' });
    expect(current.error).toBeUndefined();
    const view = toDecisionRecord(current, { logs: ['sent'] });
    expect(view.program?.logs).toEqual(['sent']);
    expect(view.program?.dispatches).toEqual([{ binding: 'mail.send', detail: 'to ada', at: 10 }]);
    expect(view.program?.programHash).toBe('hash-ok');
    expect(view.decision).toBe('approved');
    expect(view.program?.declaredEffects[0]?.kind).toBe('write');
  });

  it('does not invent a modified decision', () => {
    const view = toDecisionRecord(snapshot('rejected', program));
    expect(view.decision).toBe('rejected');
    expect(view.final).toBe(true);
  });
});

describe('core sources stay free of host APIs', () => {
  it('does not reference react, the DOM, Date.now, or crypto', () => {
    const dir = path.join(root, 'src');
    const files = readdirSync(dir).filter((name) => name.endsWith('.ts'));
    const banned = /\breact\b|\bdocument\b|\bwindow\b|Date\.now|\bcrypto\b/;
    for (const name of files) {
      const text = readFileSync(path.join(dir, name), 'utf8');
      expect(text, name).not.toMatch(banned);
    }
  });
});
