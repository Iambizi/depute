import type { Meta, StoryObj } from '@storybook/react';
import { DecisionRecord } from '../src/components/DecisionRecord';
import { buildReceipt, sha256 } from '../src/utils/receipt';

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

export const StandingApproval: Story = {
  name: 'Standing approval',
  args: {
    decision: 'approved',
    approver: {
      name: 'Ada',
      timestamp: '2026-11-16T12:00:00.000Z',
    },
    agentContext: {
      intent: 'Buy 40 USD of ETH',
    },
    approvalReceipt: buildReceipt({
      id: 'covered',
      instruction: 'Buy 40 USD of ETH',
      payload: { title: 'Buy 40 USD of ETH' },
      decision: {
        outcome: 'approved',
        decidedAt: '2026-11-16T12:00:00.000Z',
        presentedAt: '2026-11-16T12:00:00.000Z',
      },
      authorizedBy: {
        mandateReceiptHash: sha256('mandate'),
        coveredBy: 'under max 100 USD, before Dec 1',
        checkedAt: '2026-11-01T12:00:00.000Z',
      },
    }),
  },
};
