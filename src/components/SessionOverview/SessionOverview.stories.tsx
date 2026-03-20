import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SessionOverview } from './SessionOverview';

const meta = {
  title: 'ax-components-v2/SessionOverview',
  component: SessionOverview,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SessionOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sessionSummary: 'Analyzed 3 recent log files and pushed an emergency patch to the auth service.',
    duration: '4m 12s',
    surfacesTouched: [
      { type: 'system', label: 'production-cluster-01', action: 'read' },
      { type: 'file', label: 'auth/middleware.ts', action: 'write' },
      { type: 'api', label: 'Deploy Service', action: 'execute' },
    ],
    keyDecisions: [
      { description: 'Bypassed standard staging review due to the severe P0 classification.' },
      { description: 'Hardcoded the hotfix instead of rolling back the entire release train.' },
    ],
  },
};

export const RoutineDataExtraction: Story = {
  args: {
    sessionSummary: 'Extracted Q3 revenue data and compiled the weekly performance report.',
    duration: '1m 05s',
    surfacesTouched: [
      { type: 'database', label: 'analytics_warehouse', action: 'read' },
      { type: 'api', label: 'Stripe Billing', action: 'read' },
      { type: 'file', label: 'q3_report_draft.md', action: 'write' },
    ],
    // Empty key decisions array should hide the section
    keyDecisions: [],
  },
};

export const HighVelocityScraping: Story = {
  args: {
    sessionSummary: 'Scraped 45 endpoints and aggregated user telemetry into the new schema.',
    duration: '45m 22s',
    surfacesTouched: [
      { type: 'api', label: 'telemetry/v1/*', action: 'read' },
      { type: 'database', label: 'metrics_db (staging)', action: 'write' },
      { type: 'system', label: 'cron-runner', action: 'execute' },
    ],
    keyDecisions: [
      { description: 'Dropped 14 corrupted records that failed schema validation.' },
      { description: 'Automatically increased API rate limits after hitting 429 errors twice.' },
    ],
  },
};
