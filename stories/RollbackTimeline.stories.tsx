import type { Meta, StoryObj } from '@storybook/react';
import { RollbackTimeline } from '../src/components/RollbackTimeline';
import type { RollbackTimelineProps } from '../src/components/RollbackTimeline';

const meta: Meta<RollbackTimelineProps> = {
  title: 'v2 — Compliance & Forensics/RollbackTimeline',
  component: RollbackTimeline,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<RollbackTimelineProps>;

export const Default: Story = {
  args: {
    title: 'Action History',
    onRollback: (id) => alert(`Rolling back to point ${id}`),
    points: [
      { id: '1', label: 'Fetched user data', status: 'available', timestamp: '12:00:01', reversible: true },
      { id: '2', label: 'Updated email address', status: 'available', timestamp: '12:00:05', reversible: true, dependentCount: 2 },
      { id: '3', label: 'Sent confirmation email', status: 'current', timestamp: '12:00:10', reversible: true },
    ],
  },
};

export const WithIrreversible: Story = {
  name: 'With Irreversible Action',
  args: {
    title: 'Deployment Pipeline',
    points: [
      { id: '1', label: 'Built Docker image', status: 'available', timestamp: '14:00:00', reversible: true },
      { id: '2', label: 'Pushed to registry', status: 'available', timestamp: '14:01:30', reversible: true },
      { id: '3', label: 'Deployed to production', status: 'current', timestamp: '14:02:45', reversible: false },
      { id: '4', label: 'DNS cutover', status: 'available', timestamp: '14:03:00', reversible: false },
    ],
  },
};

export const WithRolledBack: Story = {
  name: 'After Rollback',
  args: {
    title: 'Email Workflow',
    points: [
      { id: '1', label: 'Drafted email', status: 'current', timestamp: '09:00:00', reversible: true },
      { id: '2', label: 'Added attachments', status: 'rolled-back', timestamp: '09:01:00', reversible: true },
      { id: '3', label: 'Sent to distribution list', status: 'rolled-back', timestamp: '09:02:00', reversible: true },
    ],
  },
};
