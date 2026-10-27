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

export const ProgramReceipt: Story = {
  args: {
    decision: 'approved',
    approver: {
      name: 'Ada',
      role: 'Owner',
      timestamp: '2026-10-26T18:00:00Z',
    },
    agentContext: {
      intent: 'Notify Ada',
      policyInvoked: 'MAIL-01',
    },
    humanReasoning: 'One message, to Ada, then stop.',
    program: {
      text: 'await mail.send({ to: "ada@example.com" })',
      hash: '9f2c0a7b1e44d0c6a1b8e3f54d77c2a0',
      bindings: ['mail.send'],
      declaredEffects: [{ kind: 'write', target: 'mailbox' }],
      logs: ['sent'],
      dispatches: [{ binding: 'mail.send', detail: 'to ada' }],
    },
  },
};

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
