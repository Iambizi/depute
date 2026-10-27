import { describe, expect, it } from 'vitest';
import { createDesk, type Session } from './desk';

const PROGRAM = 'await mail.send({ to: "ada@example.com" })';
const ada: Session = { actorId: 'ada', name: 'Ada' };
const mallory: Session = { actorId: 'mallory', name: 'Mallory' };

function programDesk() {
  const desk = createDesk();
  desk.createProgram({
    id: 'apr-program',
    action: 'notify',
    title: 'Notify Ada',
    programText: PROGRAM,
    allowedBindings: ['mail.send'],
    declaredEffects: [{ kind: 'write', target: 'mailbox' }],
    resourceLimits: { durationSeconds: 30, spend: '$0', scope: 'one message' },
    approverIds: ['ada'],
    deadline: 100,
  });
  return desk;
}

describe('forged APPROVE', () => {
  it('rejects an APPROVE after the deadline or from a non-approver', () => {
    const desk = createDesk();
    desk.createToolCall({
      id: 'apr-tool',
      action: 'wire',
      title: 'Wire',
      approverIds: ['ada'],
      deadline: 100,
    });

    const late = desk.approve('apr-tool', ada, 101, { reason: 'ok' });
    expect(late.accepted).toBe(false);
    expect(late.error).toMatch(/deadline/);
    expect(desk.get('apr-tool')?.state).toBe('pending');

    const forged = desk.approve('apr-tool', mallory, 10, {
      by: { id: 'ada', name: 'Ada' },
      reason: 'ok',
    });
    expect(forged.accepted).toBe(false);
    expect(forged.error).toMatch(/not an approver/);
    expect(desk.get('apr-tool')?.state).toBe('pending');
    expect(desk.get('apr-tool')?.history).toEqual([]);

    const refusals = desk.history().filter((entry) => !entry.accepted);
    expect(refusals.map((entry) => entry.kind)).toEqual(['APPROVE', 'APPROVE']);
  });
});

describe('program execution', () => {
  it('rejects execution of a program that is not approved', () => {
    const desk = programDesk();
    const result = desk.execute('apr-program', 10, PROGRAM);
    expect(result.accepted).toBe(false);
    expect(result.error).toMatch(/not allowed/);
    expect(desk.get('apr-program')?.state).toBe('pending');
    expect(desk.get('apr-program')?.consumed).toBe(false);
  });

  it('rejects program text that was changed after approval', () => {
    const desk = programDesk();
    expect(desk.approve('apr-program', ada, 10).accepted).toBe(true);
    const result = desk.execute('apr-program', 20, `${PROGRAM}\nawait payments.send()`);
    expect(result.accepted).toBe(false);
    expect(result.error).toMatch(/hash/);
    expect(desk.get('apr-program')?.consumed).toBe(false);
    expect(desk.get('apr-program')?.state).toBe('approved');
  });

  it('rejects a dispatch to a binding outside the approved set', () => {
    const desk = programDesk();
    expect(desk.approve('apr-program', ada, 10).accepted).toBe(true);
    const result = desk.dispatch('apr-program', 'payments.send', 20, 'move $500');
    expect(result.accepted).toBe(false);
    expect(result.error).toMatch(/outside the approved set/);
    expect(desk.get('apr-program')?.dispatches).toEqual([]);
  });

  it('rejects a replay of an already-consumed program approval', () => {
    const desk = programDesk();
    expect(desk.approve('apr-program', ada, 10).accepted).toBe(true);
    expect(desk.dispatch('apr-program', 'mail.send', 20, 'to ada').accepted).toBe(true);
    expect(desk.execute('apr-program', 30, PROGRAM).accepted).toBe(true);

    const replay = desk.execute('apr-program', 40, PROGRAM);
    expect(replay.accepted).toBe(false);
    expect(replay.error).toMatch(/consumed/);
    expect(desk.get('apr-program')?.history.filter((event) => event.type === 'EXECUTE')).toHaveLength(1);

    const record = desk.decision('apr-program', ['sent']);
    expect(record.program?.logs).toEqual(['sent']);
    expect(record.program?.dispatches).toEqual([
      { binding: 'mail.send', detail: 'to ada', at: 20 },
    ]);
    expect(record.program?.programHash).toBe(desk.get('apr-program')?.request.programHash);
    expect(record.program?.declaredEffects).toEqual([{ kind: 'write', target: 'mailbox' }]);
  });
});
