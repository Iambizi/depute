import type { Meta, StoryObj } from '@storybook/react';
import { BudgetMeter } from '../src/components/BudgetMeter';
import type { BudgetMeterProps } from '../src/components/BudgetMeter';

const meta: Meta<BudgetMeterProps> = {
  title: 'v2 — Compliance & Forensics/BudgetMeter',
  component: BudgetMeter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A visual gauge showing session budget vs. burn rate. Designed for delegation scenarios where humans give agents a spending/usage limit and let them run autonomously within bounds.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    unit: {
      control: 'select',
      options: ['currency', 'tokens', 'api-calls', 'compute', 'custom'],
    },
    severity: {
      control: 'select',
      options: [undefined, 'normal', 'elevated', 'critical', 'exceeded'],
    },
    compact: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<BudgetMeterProps>;

const currencyFormat = (v: number) => `$${v.toLocaleString()}`;
const tokenFormat = (v: number) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M tok`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}k tok`;
  return `${v} tok`;
};

/* ------------------------------------------------------------------ */
/* Default                                                             */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    label: 'Session Budget',
    spent: 250,
    limit: 1000,
    unit: 'currency',
    formatValue: currencyFormat,
  },
};

/* ------------------------------------------------------------------ */
/* Severity States                                                     */
/* ------------------------------------------------------------------ */

export const Normal: Story = {
  args: {
    label: 'API Budget',
    spent: 120,
    limit: 500,
    unit: 'api-calls',
    formatValue: (v) => `${v} calls`,
  },
};

export const Elevated: Story = {
  args: {
    label: 'Token Allowance',
    spent: 650_000,
    limit: 1_000_000,
    unit: 'tokens',
    formatValue: tokenFormat,
    burnRate: 2500,
    formatBurnRate: (r) => `${(r / 1000).toFixed(1)}k tok/min`,
    estimatedTimeRemaining: '~2 hr 20 min',
  },
};

export const Critical: Story = {
  args: {
    label: 'Session Spend',
    spent: 4250,
    limit: 5000,
    unit: 'currency',
    formatValue: currencyFormat,
    burnRate: 12,
    formatBurnRate: (r) => `$${r}/min`,
    estimatedTimeRemaining: '~62 min',
  },
};

export const Exceeded: Story = {
  args: {
    label: 'Compute Budget',
    spent: 1100,
    limit: 1000,
    unit: 'compute',
    formatValue: (v) => `${v} GPU-hrs`,
  },
};

/* ------------------------------------------------------------------ */
/* Compact Variant                                                     */
/* ------------------------------------------------------------------ */

export const CompactNormal: Story = {
  name: 'Compact — Normal',
  args: {
    label: 'Budget',
    spent: 150,
    limit: 500,
    unit: 'currency',
    formatValue: currencyFormat,
    compact: true,
  },
};

export const CompactCritical: Story = {
  name: 'Compact — Critical',
  args: {
    label: 'Tokens',
    spent: 890_000,
    limit: 1_000_000,
    unit: 'tokens',
    formatValue: tokenFormat,
    compact: true,
  },
};

/* ------------------------------------------------------------------ */
/* Cross-Vertical Examples                                             */
/* ------------------------------------------------------------------ */

export const FintechTrading: Story = {
  name: '💰 Fintech: Max Session Spend',
  args: {
    label: 'Trading Session',
    spent: 3200,
    limit: 5000,
    unit: 'currency',
    formatValue: currencyFormat,
    burnRate: 45,
    formatBurnRate: (r) => `$${r}/min`,
    estimatedTimeRemaining: '~40 min',
  },
};

export const DevOpsCompute: Story = {
  name: '🔧 DevOps: Compute Quota',
  args: {
    label: 'Daily Compute',
    spent: 340,
    limit: 500,
    unit: 'compute',
    formatValue: (v) => `${v} vCPU-hrs`,
    burnRate: 8,
    formatBurnRate: (r) => `${r} vCPU-hrs/min`,
  },
};

export const HRScreening: Story = {
  name: '👥 HR: Candidate Processing',
  args: {
    label: 'Candidate Batch',
    spent: 38,
    limit: 50,
    unit: 'custom',
    formatValue: (v) => `${v} candidates`,
    burnRate: 2,
    formatBurnRate: (r) => `${r} candidates/min`,
    estimatedTimeRemaining: '~6 min',
  },
};

export const WithCallbacks: Story = {
  name: 'With Exceeded Callback',
  args: {
    label: 'Monitored Budget',
    spent: 980,
    limit: 1000,
    unit: 'currency',
    formatValue: currencyFormat,
    onBudgetExceeded: () => alert('⚠️ Budget exceeded! Agent will be paused.'),
    onCriticalThreshold: () => console.log('Critical threshold reached'),
  },
};
