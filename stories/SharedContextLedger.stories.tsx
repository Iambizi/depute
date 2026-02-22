import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SharedContextLedger } from '../src/components/SharedContextLedger';
import { generateMockContextLedger } from '../src/utils/mockData';
import type { ContextLedgerEntry } from '../src/components/SharedContextLedger/SharedContextLedger.types';

const meta: Meta<typeof SharedContextLedger> = {
  title: 'AX Components v1/SharedContextLedger',
  component: SharedContextLedger,
  tags: ['autodocs'],
  argTypes: {
    currentScope: { control: 'select', options: ['global', 'branch', 'agent-local'] },
  },
};

export default meta;
type Story = StoryObj<typeof SharedContextLedger>;

// ============================================================
// SHARED
// ============================================================

export const Default: Story = {
  args: generateMockContextLedger(),
};

export const GlobalScope: Story = {
  name: 'State: Scoped to Global',
  args: generateMockContextLedger({ currentScope: 'global' }),
};

export const BranchScope: Story = {
  name: 'State: Scoped to Branch',
  args: generateMockContextLedger({ currentScope: 'branch' }),
};

export const AgentLocalScope: Story = {
  name: 'State: Scoped to Agent-Local',
  args: generateMockContextLedger({ currentScope: 'agent-local' }),
};

export const WithConflicts: Story = {
  name: 'State: With Conflicts',
  args: generateMockContextLedger({
    entries: generateMockContextLedger().entries?.map((e, i) => i < 2 ? { ...e, conflict: true } : e),
  }),
};

export const EmptyLedger: Story = {
  name: 'State: Empty Ledger',
  args: { entries: [] },
};

// ============================================================
// PROTOTYPING
// ============================================================

export const PrototypeScopeSwitching: Story = {
  name: 'Prototype: Scope Filter Switching',
  render: () => {
    const [scope, setScope] = useState<'global' | 'branch' | 'agent-local'>('branch');
    const data = generateMockContextLedger();

    return (
      <SharedContextLedger
        {...data}
        currentScope={scope}
        onFilterContext={setScope}
      />
    );
  },
};

// ============================================================
// PRODUCTION
// ============================================================

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: {
    currentScope: 'branch',
    entries: [
      {
        id: 'e1', scope: 'global', type: 'decision', key: 'primary_goal',
        value: 'Refactor authentication layer to use JWTs',
        provenance: { authorAgent: 'Orchestrator-Prime', timestamp: '12m ago' },
      },
      {
        id: 'e2', scope: 'branch', type: 'constraint', key: 'user_constraints',
        value: 'Must stay under 8k tokens per sub-agent',
        provenance: { authorAgent: 'Planner-Beta', timestamp: '10m ago' },
      },
      {
        id: 'e3', scope: 'branch', type: 'fact', key: 'active_hypothesis',
        value: 'Errors are concentrated in the cache invalidation layer',
        provenance: { authorAgent: 'Researcher-A', source: 'Code review analysis', timestamp: '5m ago' },
        conflict: true,
      },
      {
        id: 'e4', scope: 'agent-local', type: 'decision', key: 'previously_tried',
        value: 'Approach via regex failed — switching to AST parsing',
        provenance: { authorAgent: 'Code-Writer-1', timestamp: '2m ago' },
      },
    ] satisfies ContextLedgerEntry[],
  },
};
