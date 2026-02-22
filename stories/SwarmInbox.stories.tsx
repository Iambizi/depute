import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SwarmInbox } from '../src/components/SwarmInbox';
import { generateMockSwarmInbox } from '../src/utils/mockData';
import type { SwarmInboxItem } from '../src/components/SwarmInbox/SwarmInbox.types';

const meta: Meta<typeof SwarmInbox> = {
  title: 'AX Components v1/SwarmInbox',
  component: SwarmInbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SwarmInbox>;

// ============================================================
// SHARED
// ============================================================

export const Default: Story = {
  args: { items: generateMockSwarmInbox(5) },
};

export const AllCritical: Story = {
  name: 'State: All Critical',
  args: {
    items: generateMockSwarmInbox(4).map((i) => ({ ...i, severity: 'critical' as const })),
  },
};

export const MixedSeverities: Story = {
  name: 'State: Mixed Severities',
  args: {
    items: [
      { id: 'i1', type: 'escalation', severity: 'critical', title: 'Agent failure escalated for review', agentId: 'Code-Writer-1', branchPath: 'root → Code Writer → Validator', timestamp: 'just now' },
      { id: 'i2', type: 'budget_overrun', severity: 'critical', title: 'Token budget exceeded', agentId: 'Data-Analyst', timestamp: '1m ago', detail: 'Agent consumed 142% of its allocation (28,400 / 20,000 tokens).' },
      { id: 'i3', type: 'stalled', severity: 'warning', title: 'Agent stalled — no progress in 5 minutes', agentId: 'Researcher-A', timestamp: '3m ago' },
      { id: 'i4', type: 'approval', severity: 'warning', title: 'Action requires your sign-off', agentId: 'Orchestrator-Prime', timestamp: '5m ago' },
      { id: 'i5', type: 'conflict', severity: 'info', title: 'Output conflict detected between two agents', agentId: 'Synthesizer-Z', timestamp: '8m ago', detail: 'Code-Writer-1 and Code-Writer-2 produced conflicting implementations for auth.ts.' },
    ] satisfies SwarmInboxItem[],
  },
};

export const EmptyInbox: Story = {
  name: 'State: Empty Inbox',
  args: { items: [] },
};

export const LargeInbox: Story = {
  name: 'State: Large Inbox (10 Items)',
  args: { items: generateMockSwarmInbox(10) },
};

// ============================================================
// PROTOTYPING
// ============================================================

export const PrototypeDismissable: Story = {
  name: 'Prototype: Dismissable Items',
  render: () => {
    const [items, setItems] = useState<SwarmInboxItem[]>(generateMockSwarmInbox(6));

    const dismiss = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

    return <SwarmInbox items={items} onDismissItem={dismiss} />;
  },
};

export const PrototypeOpenItem: Story = {
  name: 'Prototype: Open Item (Inspect Panel Simulation)',
  render: () => {
    const [items, setItems] = useState<SwarmInboxItem[]>(generateMockSwarmInbox(5));
    const [selected, setSelected] = useState<SwarmInboxItem | null>(null);

    return (
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: '1' }}>
          <SwarmInbox items={items} onOpenItem={setSelected} onDismissItem={(id) => setItems((p) => p.filter((i) => i.id !== id))} />
        </div>
        {selected && (
          <div style={{ flex: '1', fontFamily: 'sans-serif', fontSize: '12px', padding: '12px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <strong style={{ fontSize: '13px' }}>Inspecting Item</strong>
            <pre style={{ marginTop: '8px', whiteSpace: 'pre-wrap', color: '#374151' }}>{JSON.stringify(selected, null, 2)}</pre>
            <button onClick={() => setSelected(null)} style={{ marginTop: '8px', cursor: 'pointer', padding: '4px 10px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>Close</button>
          </div>
        )}
      </div>
    );
  },
};

// ============================================================
// PRODUCTION
// ============================================================

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: {
    items: [
      { id: 'p1', type: 'approval', severity: 'warning', title: 'Action requires your sign-off', agentId: 'Orchestrator-Prime', timestamp: '2m ago' },
      { id: 'p2', type: 'escalation', severity: 'critical', title: 'Agent failure escalated for review', agentId: 'Code-Writer-1', branchPath: 'root → Code Writer', timestamp: 'just now' },
    ] satisfies SwarmInboxItem[],
  },
};
