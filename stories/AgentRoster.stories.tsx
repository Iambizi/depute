import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AgentRoster } from '../src/components/AgentRoster';
import { generateMockAgentRoster } from '../src/utils/mockData';
import type { AgentRosterItem } from '../src/components/AgentRoster/AgentRoster.types';
import type { AgentStatus } from '../src/components/OrchestratorView/OrchestratorView.types';

const meta: Meta<typeof AgentRoster> = {
  title: 'AX Components v1/AgentRoster',
  component: AgentRoster,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AgentRoster>;

// ============================================================
// SHARED
// ============================================================

export const Default: Story = {
  args: { agents: generateMockAgentRoster(6) },
};

export const AllWorking: Story = {
  name: 'State: All Working',
  args: {
    agents: generateMockAgentRoster(5).map((a) => ({
      ...a, status: 'working' as AgentStatus, currentTask: 'Processing assigned sub-task',
    })),
  },
};

export const WithFailure: Story = {
  name: 'State: One Agent Failed',
  args: {
    agents: generateMockAgentRoster(4).map((a, i) =>
      i === 2 ? { ...a, status: 'failed' as AgentStatus, currentTask: 'Crashed: timeout on tool call' } : a
    ),
  },
};

export const LargeSwarm: Story = {
  name: 'State: Large Swarm (12 Agents)',
  args: { agents: generateMockAgentRoster(12) },
};

export const AllCompleted: Story = {
  name: 'State: Post-Run All Completed',
  args: {
    agents: generateMockAgentRoster(5).map((a) => ({
      ...a, status: 'completed' as AgentStatus, currentTask: undefined,
    })),
  },
};

export const EmptyRoster: Story = {
  name: 'State: Empty Roster',
  args: { agents: [] },
};

// ============================================================
// PROTOTYPING
// ============================================================

export const SimulateLiveStatuses: Story = {
  name: 'Prototype: Simulated Live Status Updates',
  render: () => {
    const [agents, setAgents] = useState<AgentRosterItem[]>(generateMockAgentRoster(6));
    const statuses: AgentStatus[] = ['working', 'idle', 'blocked', 'completed'];

    useEffect(() => {
      const interval = setInterval(() => {
        setAgents((prev) =>
          prev.map((a) =>
            Math.random() > 0.6
              ? { ...a, status: statuses[Math.floor(Math.random() * statuses.length)] }
              : a
          )
        );
      }, 1800);
      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#6b7280', margin: 0 }}>
          Agent statuses cycle every ~1.8s to simulate live swarm activity.
        </p>
        <AgentRoster agents={agents} />
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
    agents: [
      { id: 'a1', name: 'Orchestrator-Prime', role: 'Orchestrator', status: 'working', currentTask: 'Delegating tasks across branches', tokensUsed: 4200, lastActive: '2m ago' },
      { id: 'a2', name: 'Researcher-A', role: 'Researcher', status: 'working', currentTask: 'Fetching API documentation', tokensUsed: 8100, lastActive: 'just now' },
      { id: 'a3', name: 'Code-Writer-1', role: 'Code Writer', status: 'idle', tokensUsed: 1200, lastActive: '5m ago' },
      { id: 'a4', name: 'QA-Inspector', role: 'QA Inspector', status: 'completed', tokensUsed: 6300, lastActive: '1m ago' },
    ] satisfies AgentRosterItem[],
  },
};
