import type { Meta, StoryObj } from '@storybook/react';
import { SwarmMonitor } from '../src/components/SwarmMonitor';
import { generateMockSwarmMetrics } from '../src/utils/mockData';

const meta: Meta<typeof SwarmMonitor> = {
  title: 'AX Components v1/SwarmMonitor',
  component: SwarmMonitor,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SwarmMonitor>;

// ============================================================
// SHARED
// ============================================================

export const Default: Story = {
  args: generateMockSwarmMetrics(),
};

export const HealthySwarm: Story = {
  name: 'State: Healthy Swarm',
  args: generateMockSwarmMetrics({
    metrics: {
      activeInstances: 6, idleInstances: 2, totalCost: '$0.48',
      tokensBurned: 32000, errorRate: 2, taskCompletionRate: 65,
      estimatedTimeRemaining: '8m',
    },
  }),
};

export const HighErrorRate: Story = {
  name: 'State: High Error Rate',
  args: generateMockSwarmMetrics({
    metrics: {
      activeInstances: 4, idleInstances: 0, totalCost: '$1.20',
      tokensBurned: 80000, errorRate: 32, taskCompletionRate: 28,
      estimatedTimeRemaining: '22m',
    },
  }),
};

export const NoETA: Story = {
  name: 'State: No ETA / Completion Rate',
  args: generateMockSwarmMetrics({
    metrics: {
      activeInstances: 2, idleInstances: 1, totalCost: '$0.05',
      tokensBurned: 3200, errorRate: 0,
    },
  }),
};

export const NearComplete: Story = {
  name: 'State: Near Completion',
  args: generateMockSwarmMetrics({
    metrics: {
      activeInstances: 1, idleInstances: 5, totalCost: '$2.10',
      tokensBurned: 140000, errorRate: 5, taskCompletionRate: 92,
      estimatedTimeRemaining: '1m',
    },
  }),
};

// ============================================================
// PROTOTYPING
// ============================================================

export const WithGlobalControls: Story = {
  name: 'Prototype: With Pause / Kill Controls',
  args: {
    ...generateMockSwarmMetrics(),
    onGlobalPause: () => { alert('⏸ Swarm paused'); },
    onGlobalKill: () => { alert('⏹ Swarm killed'); },
  },
};

// ============================================================
// PRODUCTION
// ============================================================

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: {
    metrics: {
      activeInstances: 5,
      idleInstances: 2,
      totalCost: '$0.72',
      tokensBurned: 48000,
      errorRate: 8,
      taskCompletionRate: 52,
      estimatedTimeRemaining: '11m',
    },
  },
};
