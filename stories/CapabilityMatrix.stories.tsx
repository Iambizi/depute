import type { Meta, StoryObj } from '@storybook/react';
import { CapabilityMatrix } from '../src/components/CapabilityMatrix';
import type { CapabilityMatrixProps } from '../src/components/CapabilityMatrix';

const meta: Meta<CapabilityMatrixProps> = {
  title: 'v2 — Compliance & Forensics/CapabilityMatrix',
  component: CapabilityMatrix,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CapabilityMatrixProps>;

export const Default: Story = {
  args: {
    title: 'Agent Permissions',
    agentId: 'research-agent-01',
    description: 'Active session permissions for the current workflow',
    capabilities: [
      { name: 'database.users', description: 'User records', permission: 'read', category: 'Data' },
      { name: 'database.orders', description: 'Order records', permission: 'full', category: 'Data' },
      { name: 'database.logs', description: 'Audit logs', permission: 'write', category: 'Data' },
      { name: 'email.send', description: 'Send emails', permission: 'none', category: 'Communications' },
      { name: 'email.draft', description: 'Draft emails', permission: 'write', category: 'Communications' },
      { name: 'deploy.staging', description: 'Deploy to staging', permission: 'conditional', condition: 'approved by lead', category: 'Infrastructure' },
      { name: 'deploy.production', description: 'Deploy to prod', permission: 'none', category: 'Infrastructure' },
    ],
  },
};

export const FintechAgent: Story = {
  name: '💰 Fintech: Trading Bot',
  args: {
    title: 'Trading Bot Capabilities',
    agentId: 'trading-bot-alpha',
    capabilities: [
      { name: 'market.read', description: 'Read market data', permission: 'full', category: 'Market' },
      { name: 'order.place', description: 'Place orders', permission: 'conditional', condition: 'under $10k', category: 'Trading' },
      { name: 'order.cancel', description: 'Cancel orders', permission: 'full', category: 'Trading' },
      { name: 'funds.withdraw', description: 'Withdraw funds', permission: 'none', category: 'Banking' },
      { name: 'funds.transfer', description: 'Internal transfers', permission: 'none', category: 'Banking' },
    ],
  },
};

export const FlatList: Story = {
  name: 'Flat (No Groups)',
  args: {
    title: 'Tool Access',
    groupByCategory: false,
    capabilities: [
      { name: 'file.read', permission: 'full' },
      { name: 'file.write', permission: 'write' },
      { name: 'file.delete', permission: 'none' },
      { name: 'shell.execute', permission: 'conditional', condition: 'sandboxed' },
    ],
  },
};
