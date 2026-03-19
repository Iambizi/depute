import type { Meta, StoryObj } from '@storybook/react';
import { StateDiff } from '../src/components/StateDiff';
import type { StateDiffProps } from '../src/components/StateDiff';

const meta: Meta<StateDiffProps> = {
  title: 'v2 — Compliance & Forensics/StateDiff',
  component: StateDiff,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Structured before/after view of state mutations. Shows exactly what an agent changed in a database, ledger, or infrastructure — not natural language summaries, but field-level proof.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hideUnchanged: { control: 'boolean' },
    defaultCollapsed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<StateDiffProps>;

/* ------------------------------------------------------------------ */
/* Default                                                             */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    title: 'User Record Update',
    description: 'Agent modified 3 fields in the user profile database',
    entries: [
      { path: 'user.email', type: 'modified', before: 'alice@old.com', after: 'alice@new.com' },
      { path: 'user.name', type: 'unchanged', before: 'Alice Johnson' },
      { path: 'user.role', type: 'added', after: 'admin' },
      { path: 'user.legacy_id', type: 'removed', before: 'USR-12345' },
    ],
    timestamp: '2026-03-19T12:00:00Z',
    sourceId: 'tool-42',
  },
};

/* ------------------------------------------------------------------ */
/* Grouped                                                             */
/* ------------------------------------------------------------------ */

export const Grouped: Story = {
  args: {
    title: 'Ledger Update',
    description: 'Agent processed a payment across two accounts',
    groups: [
      {
        label: 'Sender Account',
        entries: [
          { path: 'sender.balance', type: 'modified', before: 5000, after: 4500 },
          { path: 'sender.last_tx', type: 'modified', before: '2026-03-18', after: '2026-03-19' },
        ],
      },
      {
        label: 'Receiver Account',
        entries: [
          { path: 'receiver.balance', type: 'modified', before: 1200, after: 1700 },
          { path: 'receiver.last_tx', type: 'modified', before: '2026-03-15', after: '2026-03-19' },
        ],
      },
    ],
    timestamp: '2026-03-19T14:30:00Z',
  },
};

/* ------------------------------------------------------------------ */
/* Feature Variants                                                    */
/* ------------------------------------------------------------------ */

export const HideUnchanged: Story = {
  name: 'Hide Unchanged Fields',
  args: {
    title: 'Config Update',
    entries: [
      { path: 'config.timeout', type: 'modified', before: 30, after: 60 },
      { path: 'config.retries', type: 'unchanged', before: 3 },
      { path: 'config.region', type: 'unchanged', before: 'us-east-1' },
      { path: 'config.debug', type: 'added', after: true },
    ],
    hideUnchanged: true,
  },
};

export const StartCollapsed: Story = {
  args: {
    title: 'Infrastructure Mutation',
    entries: [
      { path: 'instance.type', type: 'modified', before: 't3.micro', after: 't3.large' },
      { path: 'instance.count', type: 'modified', before: 2, after: 5 },
    ],
    defaultCollapsed: true,
  },
};

/* ------------------------------------------------------------------ */
/* Cross-Vertical Examples                                             */
/* ------------------------------------------------------------------ */

export const FintechLedger: Story = {
  name: '💰 Fintech: Ledger Delta',
  args: {
    title: 'Transaction Ledger',
    description: 'Agent executed a wire transfer of $500',
    groups: [
      {
        label: 'Source Account (****4521)',
        entries: [
          { path: 'balance.available', type: 'modified', label: 'Available Balance', before: '$12,450.00', after: '$11,950.00' },
          { path: 'balance.pending', type: 'unchanged', label: 'Pending', before: '$0.00' },
          { path: 'tx.count', type: 'modified', label: 'Transaction Count', before: 47, after: 48 },
        ],
      },
      {
        label: 'Destination Account (****8903)',
        entries: [
          { path: 'balance.available', type: 'modified', label: 'Available Balance', before: '$3,200.00', after: '$3,700.00' },
        ],
      },
    ],
    timestamp: '2026-03-19T14:32:11Z',
    sourceId: 'wire-transfer-891',
  },
};

export const DevOpsTerraform: Story = {
  name: '🔧 DevOps: Terraform Plan',
  args: {
    title: 'Infrastructure Changes',
    description: 'Agent applied Terraform plan — 3 resources modified, 1 added',
    groups: [
      {
        label: 'aws_instance.api_server',
        entries: [
          { path: 'instance_type', type: 'modified', before: 't3.medium', after: 't3.xlarge' },
          { path: 'ebs_size_gb', type: 'modified', before: 50, after: 100 },
        ],
      },
      {
        label: 'aws_rds.primary',
        entries: [
          { path: 'engine_version', type: 'modified', before: '15.2', after: '16.1' },
          { path: 'multi_az', type: 'unchanged', before: true },
        ],
      },
      {
        label: 'aws_cloudwatch.alarm (NEW)',
        entries: [
          { path: 'metric', type: 'added', after: 'CPUUtilization' },
          { path: 'threshold', type: 'added', after: '80%' },
          { path: 'action', type: 'added', after: 'SNS:arn:...ops-alerts' },
        ],
      },
    ],
    changeCount: 6,
  },
};

export const HRCandidate: Story = {
  name: '👥 HR: Candidate Record',
  args: {
    title: 'Candidate Status Update',
    entries: [
      { path: 'status', type: 'modified', label: 'Status', before: 'Screening', after: 'Interview Scheduled' },
      { path: 'interviewer', type: 'added', label: 'Assigned Interviewer', after: 'Sarah Chen' },
      { path: 'interview_date', type: 'added', label: 'Interview Date', after: '2026-03-25' },
      { path: 'resume_score', type: 'unchanged', label: 'Resume Score', before: '87/100' },
    ],
  },
};
