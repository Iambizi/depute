import type { Meta, StoryObj } from '@storybook/react';
import { PolicyBanner } from '../src/components/PolicyBanner';
import type { PolicyBannerProps } from '../src/components/PolicyBanner';

const meta: Meta<PolicyBannerProps> = {
  title: 'v2 — Compliance & Forensics/PolicyBanner',
  component: PolicyBanner,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A persistent banner that visually anchors the agent\'s current operating policy, ensuring the human supervisor knows whether they are overseeing a sandbox, staging, or production environment.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['sandbox', 'staging', 'production', 'simulation', 'test', 'drafting', 'executing'],
      description: 'The current operating mode/environment',
    },
    severity: {
      control: 'select',
      options: ['info', 'warning', 'critical'],
      description: 'Visual severity (auto-detected from mode if omitted)',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the constraints section can be collapsed',
    },
    showLiveIndicator: {
      control: 'boolean',
      description: 'Show a pulsing indicator for live modes',
    },
  },
};

export default meta;
type Story = StoryObj<PolicyBannerProps>;

/* ------------------------------------------------------------------ */
/* Default                                                             */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    mode: 'sandbox',
    description: 'No real transactions will be executed',
    constraints: [
      { label: 'Max Spend', value: '$0' },
      { label: 'Network', value: 'TestNet' },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* All Modes                                                           */
/* ------------------------------------------------------------------ */

export const Sandbox: Story = {
  args: {
    mode: 'sandbox',
    description: 'Isolated sandbox environment — all actions are simulated',
    constraints: [
      { label: 'Transfers', value: 'Disabled' },
      { label: 'Network', value: 'TestNet' },
    ],
  },
};

export const Staging: Story = {
  args: {
    mode: 'staging',
    description: 'Pre-production environment — data may persist',
    constraints: [
      { label: 'Max Spend', value: '$100' },
      { label: 'Scope', value: 'Read + Write' },
    ],
  },
};

export const Production: Story = {
  args: {
    mode: 'production',
    description: 'Live environment — all actions are irreversible',
    constraints: [
      { label: 'Max Spend', value: '$5,000' },
      { label: 'Scope', value: 'Full Access' },
      { label: 'Audit Log', value: 'Enabled' },
    ],
  },
};

export const Simulation: Story = {
  args: {
    mode: 'simulation',
    description: 'Running simulated agent workflow — no side effects',
  },
};

export const TestMode: Story = {
  name: 'Test',
  args: {
    mode: 'test',
    description: 'Unit test harness — mock backends only',
  },
};

export const Drafting: Story = {
  args: {
    mode: 'drafting',
    description: 'Contract in draft mode — terms not yet binding',
    constraints: [
      { label: 'Status', value: 'Non-binding' },
    ],
  },
};

export const Executing: Story = {
  args: {
    mode: 'executing',
    description: 'Active execution — contract terms are legally binding',
    constraints: [
      { label: 'Status', value: 'Binding' },
      { label: 'Signatory', value: 'Required' },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Feature Variants                                                    */
/* ------------------------------------------------------------------ */

export const WithViewPolicy: Story = {
  name: 'With View Policy Button',
  args: {
    mode: 'production',
    description: 'Live trading environment',
    constraints: [
      { label: 'Max Trade', value: '$10,000' },
      { label: 'Allowed Pairs', value: 'BTC/USD, ETH/USD' },
    ],
    onViewPolicy: () => alert('Opening full policy document...'),
  },
};

export const Collapsible: Story = {
  args: {
    mode: 'staging',
    description: 'Deployment staging pipeline',
    collapsible: true,
    constraints: [
      { label: 'Target', value: 'us-east-1' },
      { label: 'Max Instances', value: '3' },
      { label: 'Rollback', value: 'Auto' },
      { label: 'Approval', value: 'Required for prod' },
    ],
  },
};

export const WithCustomLabel: Story = {
  name: 'Custom Label (TestNet / MainNet)',
  args: {
    mode: 'sandbox',
    label: 'TestNet',
    description: 'Sepolia testnet — no real ETH will be spent',
    constraints: [
      { label: 'Chain', value: 'Sepolia' },
      { label: 'Gas', value: 'Free (Faucet)' },
    ],
  },
};

export const MainNet: Story = {
  args: {
    mode: 'production',
    label: 'MainNet',
    description: 'Ethereum mainnet — all transactions are final',
    constraints: [
      { label: 'Chain', value: 'ETH Mainnet' },
      { label: 'Max Gas', value: '50 Gwei' },
      { label: 'Max Spend', value: '0.5 ETH' },
    ],
  },
};

export const MinimalBanner: Story = {
  name: 'Minimal (Mode Only)',
  args: {
    mode: 'sandbox',
  },
};

export const NoLiveIndicator: Story = {
  name: 'Production Without Live Indicator',
  args: {
    mode: 'production',
    description: 'Review mode — execution paused',
    showLiveIndicator: false,
  },
};

/* ------------------------------------------------------------------ */
/* Cross-Vertical Examples                                             */
/* ------------------------------------------------------------------ */

export const FintechExample: Story = {
  name: '💰 Fintech: Trading Dashboard',
  args: {
    mode: 'production',
    label: 'Live Trading',
    description: 'Connected to NYSE — market hours active',
    constraints: [
      { label: 'Max Position', value: '$25,000' },
      { label: 'Daily Loss Limit', value: '$2,500' },
      { label: 'Instruments', value: 'Equities, Options' },
    ],
    onViewPolicy: () => alert('Opening risk management policy...'),
  },
};

export const DevOpsExample: Story = {
  name: '🔧 DevOps: Deployment Pipeline',
  args: {
    mode: 'staging',
    label: 'Staging',
    description: 'Pre-prod deployment — changes require manual promotion',
    collapsible: true,
    constraints: [
      { label: 'Region', value: 'us-east-1' },
      { label: 'Writes', value: 'DB read-only' },
      { label: 'Deploy', value: 'Manual approval' },
    ],
  },
};

export const HRExample: Story = {
  name: '👥 HR: Candidate Screening',
  args: {
    mode: 'simulation',
    label: 'Simulation',
    description: 'Dry run — no emails will be sent to candidates',
    constraints: [
      { label: 'Emails', value: 'Disabled' },
      { label: 'Records', value: 'Read-only' },
      { label: 'Max Candidates', value: '50' },
    ],
  },
};
