'use client';

import { SharedContextLedger } from '@/depute/components/SharedContextLedger';

const entries = [
  {
    id: 'e1',
    scope: 'global' as const,
    type: 'fact' as const,
    key: 'user.name',
    value: 'Alice Chen',
    provenance: { authorAgent: 'Orchestrator', timestamp: new Date(Date.now() - 30000).toISOString() },
  },
  {
    id: 'e2',
    scope: 'branch' as const,
    type: 'decision' as const,
    key: 'task.priority',
    value: 'high',
    provenance: { authorAgent: 'Planner-1', timestamp: new Date(Date.now() - 20000).toISOString() },
  },
  {
    id: 'e3',
    scope: 'agent-local' as const,
    type: 'fact' as const,
    key: 'analysis.complete',
    value: 'true',
    provenance: { authorAgent: 'Analyst-2', timestamp: new Date(Date.now() - 5000).toISOString() },
  },
];

export function SharedContextLedgerDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <SharedContextLedger entries={entries} />
    </div>
  );
}
