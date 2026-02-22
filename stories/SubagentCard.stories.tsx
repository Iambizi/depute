import type { Meta, StoryObj } from '@storybook/react';
import { SubagentCard } from '../src/components/SubagentCard';
import { generateMockSubagentCard } from '../src/utils/mockData';

const meta: Meta<typeof SubagentCard> = {
  title: 'AX Components v1/SubagentCard',
  component: SubagentCard,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['idle', 'working', 'blocked', 'failed', 'completed'] },
    tokensUsed: { control: { type: 'number', min: 0 } },
    planStepsCompleted: { control: { type: 'number', min: 0 } },
    planStepCount: { control: { type: 'number', min: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof SubagentCard>;

// ============================================================
// SHARED
// ============================================================

export const Default: Story = {
  args: generateMockSubagentCard({ status: 'working' }),
};

export const StateIdle: Story = {
  name: 'State: Idle',
  args: generateMockSubagentCard({ status: 'idle', currentTask: undefined, planStepsCompleted: 0 }),
};

export const StateWorking: Story = {
  name: 'State: Working',
  args: generateMockSubagentCard({ status: 'working' }),
};

export const StateBlocked: Story = {
  name: 'State: Blocked',
  args: generateMockSubagentCard({ status: 'blocked', currentTask: 'Awaiting approval gate response' }),
};

export const StateFailed: Story = {
  name: 'State: Failed',
  args: generateMockSubagentCard({ status: 'failed', currentTask: 'Tool call exceeded token budget' }),
};

export const StateCompleted: Story = {
  name: 'State: Completed',
  args: generateMockSubagentCard({ status: 'completed', planStepsCompleted: 6, planStepCount: 6, currentTask: undefined }),
};

// ============================================================
// PROTOTYPING
// ============================================================

export const CardGrid: Story = {
  name: 'Prototype: Multiple Cards in a Grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
      {(['idle', 'working', 'blocked', 'failed', 'completed'] as const).map((status) => (
        <SubagentCard key={status} {...generateMockSubagentCard({ status })} />
      ))}
    </div>
  ),
};

// ============================================================
// PRODUCTION
// ============================================================

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: {
    agentName: 'Code-Writer-1',
    role: 'Code Writer',
    status: 'working',
    currentTask: 'Generating TypeScript interfaces from JSON schema',
    planStepCount: 5,
    planStepsCompleted: 3,
    tokensUsed: 8420,
  },
};

export const HighTokenUsage: Story = {
  name: 'Production: High Token Usage Warning',
  args: {
    agentName: 'Data-Analyst',
    role: 'Data Analyst',
    status: 'working',
    currentTask: 'Summarizing findings from 200-page report',
    planStepCount: 8,
    planStepsCompleted: 4,
    tokensUsed: 38500,
  },
};
