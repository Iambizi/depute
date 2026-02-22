import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OrchestratorView } from '../src/components/OrchestratorView';
import { generateMockOrchestratorTree } from '../src/utils/mockData';
import type { OrchestratorNode } from '../src/components/OrchestratorView/OrchestratorView.types';

const meta: Meta<typeof OrchestratorView> = {
  title: 'AX Components v1/OrchestratorView',
  component: OrchestratorView,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OrchestratorView>;

// ============================================================
// SHARED
// ============================================================

export const Default: Story = {
  args: { nodes: generateMockOrchestratorTree() },
};

export const AllIdle: Story = {
  name: 'State: All Idle',
  args: {
    nodes: [
      {
        id: '1', label: 'Orchestrator-Prime', role: 'Orchestrator', status: 'idle',
        children: [
          { id: '2', label: 'Researcher-A', role: 'Researcher', status: 'idle' },
          { id: '3', label: 'Code-Writer-1', role: 'Code Writer', status: 'idle' },
        ],
      },
    ] satisfies OrchestratorNode[],
  },
};

export const BlockedBranch: Story = {
  name: 'State: Blocked Branch',
  args: {
    nodes: [
      {
        id: '1', label: 'Orchestrator-Prime', role: 'Orchestrator', status: 'working',
        currentTask: 'Waiting on blocked sub-agent',
        children: [
          { id: '2', label: 'Researcher-A', role: 'Researcher', status: 'completed' },
          {
            id: '3', label: 'Code-Writer-1', role: 'Code Writer', status: 'blocked',
            currentTask: 'Awaiting API key from environment',
            children: [
              { id: '4', label: 'Validator-3', role: 'Validator', status: 'idle' },
            ],
          },
        ],
      },
    ] satisfies OrchestratorNode[],
  },
};

export const DeepTree: Story = {
  name: 'State: Deep 3-Level Tree',
  args: { nodes: generateMockOrchestratorTree() },
};

export const EmptySwarm: Story = {
  name: 'State: Empty (No Nodes)',
  args: { nodes: [] },
};

// ============================================================
// PROTOTYPING
// ============================================================

export const PrototypeWithSelection: Story = {
  name: 'Prototype: Live Node Selection',
  render: () => {
    const nodes = generateMockOrchestratorTree();
    const [selectedId, setSelectedId] = useState<string | undefined>();

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'sans-serif' }}>
        <OrchestratorView nodes={nodes} selectedNodeId={selectedId} onNodeClick={(n) => setSelectedId((prev) => prev === n.id ? undefined : n.id)} />
        {selectedId && (
          <div style={{ fontSize: '12px', color: '#6b7280', padding: '8px 12px', background: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            Selected node: <strong>{selectedId}</strong>
            <button onClick={() => setSelectedId(undefined)} style={{ marginLeft: '8px', fontSize: '11px', cursor: 'pointer', padding: '2px 8px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
              Clear
            </button>
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
    nodes: [
      {
        id: 'orch-1', label: 'Orchestrator', role: 'Orchestrator', status: 'working',
        currentTask: 'Delegating sub-tasks across 2 branches',
        children: [
          { id: 'res-1', label: 'Researcher', role: 'Researcher', status: 'working', currentTask: 'Fetching competitor pricing data' },
          { id: 'cw-1', label: 'Code Writer', role: 'Code Writer', status: 'idle' },
        ],
      },
    ] satisfies OrchestratorNode[],
  },
};

export const PostRunCompleted: Story = {
  name: 'Production: Post-Run All Completed',
  args: {
    nodes: [
      {
        id: '1', label: 'Orchestrator-Prime', role: 'Orchestrator', status: 'completed',
        children: [
          { id: '2', label: 'Researcher-A', role: 'Researcher', status: 'completed' },
          {
            id: '3', label: 'Code-Writer-1', role: 'Code Writer', status: 'completed',
            children: [
              { id: '4', label: 'QA-Inspector', role: 'QA Inspector', status: 'completed' },
            ],
          },
        ],
      },
    ] satisfies OrchestratorNode[],
  },
};
