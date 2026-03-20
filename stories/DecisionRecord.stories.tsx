import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DecisionRecord } from '../src/components/DecisionRecord';

const meta = {
  title: 'ax-components-v2/DecisionRecord',
  component: DecisionRecord,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    decision: {
      control: 'radio',
      options: ['approved', 'rejected', 'modified'],
    },
  },
} satisfies Meta<typeof DecisionRecord>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    decision: 'approved',
    approver: {
      name: 'Sarah Connor',
      role: 'SecOps Lead',
      timestamp: new Date(),
    },
    agentContext: {
      intent: 'Execute `DROP TABLE dummy_data` in production database',
      policyInvoked: 'DB-RESTRICT-01',
    },
    humanReasoning: 'Confirmed via Slack that this is scheduled maintenance.',
  },
};

export const Rejected: Story = {
  args: {
    decision: 'rejected',
    approver: {
      name: 'Michael Burn',
      timestamp: new Date(),
    },
    agentContext: {
      intent: 'Transfer 50,000 USDC to 0x123...abc',
    },
    humanReasoning: 'Address is not whitelisted. Halting execution.',
  },
};

export const Modified: Story = {
  args: {
    decision: 'modified',
    approver: {
      name: 'Alex Developer',
      role: 'Staff Engineer',
      timestamp: new Date(),
    },
    agentContext: {
      intent: 'Push 15 commits directly to `main` branch',
      policyInvoked: 'GIT-FLOW-02',
    },
    humanReasoning: 'Bypass denied. Diverted commits to a new PR branch instead.',
  },
};

export const MinimalContext: Story = {
  args: {
    decision: 'approved',
    approver: {
      name: 'System Auto-Approver',
      timestamp: new Date(),
    },
    agentContext: {
      intent: 'Generate weekly team summary report',
    },
  },
};
