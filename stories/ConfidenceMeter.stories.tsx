import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfidenceMeter } from '../src/components/ConfidenceMeter';
import { generateRandomConfidence } from '../src/utils/mockData';

const meta: Meta<typeof ConfidenceMeter> = {
  title: 'AX Components/ConfidenceMeter',
  component: ConfidenceMeter,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    display: { control: 'select', options: ['meter', 'badge'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showValue: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    animate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ConfidenceMeter>;

// ============================================================
// SHARED STORIES
// ============================================================

export const Default: Story = {
  args: { value: 82, display: 'meter', size: 'md', showValue: true, showLabel: true },
};

export const AllFeatures: Story = {
  args: {
    value: 74,
    display: 'meter',
    size: 'lg',
    showValue: true,
    showLabel: true,
    animate: true,
    reasoning: 'Score is slightly lower due to ambiguous phrasing in the third source document.',
  },
};

// Confidence level stories
export const HighConfidence: Story = {
  name: 'Level: High (≥80)',
  args: { value: 91, display: 'meter', showValue: true, showLabel: true },
};

export const MediumConfidence: Story = {
  name: 'Level: Medium (40–79)',
  args: { value: 63, display: 'meter', showValue: true, showLabel: true },
};

export const LowConfidence: Story = {
  name: 'Level: Low (<40)',
  args: { value: 22, display: 'meter', showValue: true, showLabel: true },
};

// Display variants
export const BadgeDisplay: Story = {
  name: 'Display: Badge',
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <ConfidenceMeter value={91} display="badge" size="sm" showLabel showValue />
      <ConfidenceMeter value={63} display="badge" size="md" showLabel showValue />
      <ConfidenceMeter value={22} display="badge" size="lg" showLabel showValue />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'Display: All Sizes (Meter)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '280px' }}>
      <ConfidenceMeter value={75} display="meter" size="sm" showLabel showValue />
      <ConfidenceMeter value={75} display="meter" size="md" showLabel showValue />
      <ConfidenceMeter value={75} display="meter" size="lg" showLabel showValue />
    </div>
  ),
};

// ============================================================
// PROTOTYPING STORIES
// ============================================================

export const PrototypeQuickStart: Story = {
  name: 'Quick Start: Prototype Confidence Display',
  render: () => {
    const [value, setValue] = useState(generateRandomConfidence());

    useEffect(() => {
      const interval = setInterval(() => {
        setValue(generateRandomConfidence());
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '280px' }}>
        <ConfidenceMeter value={value} display="meter" size="lg" showValue showLabel animate />
        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#888' }}>
          Updates every 2s
        </span>
      </div>
    );
  },
};

export const TestVariations: Story = {
  name: 'Test Different Display Configurations',
  render: () => {
    const [value, setValue] = useState(75);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{ width: '280px' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '280px' }}>
          <ConfidenceMeter value={value} display="meter" size="sm" showValue showLabel animate />
          <ConfidenceMeter value={value} display="meter" size="md" showValue showLabel animate />
          <ConfidenceMeter value={value} display="badge" size="md" showValue showLabel />
        </div>
      </div>
    );
  },
};

export const SimulateRealTimeUpdates: Story = {
  name: 'Simulate Real-Time Updates — Live Score',
  render: () => {
    const [score, setScore] = useState(50);
    const [reasoning, setReasoning] = useState<string | undefined>(undefined);

    useEffect(() => {
      let current = 50;
      const interval = setInterval(() => {
        // Drift score ±15 per tick, clamped 0–100
        current = Math.max(0, Math.min(100, current + (Math.random() - 0.5) * 30));
        setScore(Math.round(current));
        setReasoning(
          current >= 80
            ? 'All source documents are consistent and high-quality.'
            : current >= 40
              ? 'Some ambiguity detected in source material.'
              : 'Insufficient data to make a confident determination.'
        );
      }, 1500);
      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <ConfidenceMeter value={score} display="meter" size="lg" showValue showLabel animate reasoning={reasoning} />
      </div>
    );
  },
};

// ============================================================
// PRODUCTION STORIES
// ============================================================

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: { value: 87, display: 'meter', showLabel: true, showValue: true },
};

export const WithRealAPIData: Story = {
  name: 'With Real API Data — Inline Badge',
  render: () => (
    <div style={{ fontFamily: 'sans-serif', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#374151' }}>
      <span>Extracting key metrics</span>
      <ConfidenceMeter value={84} display="badge" size="sm" showLabel />
    </div>
  ),
};

export const ErrorHandling: Story = {
  name: 'Error Handling — Zero / Missing Score',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '280px' }}>
      <ConfidenceMeter value={0} display="meter" size="md" showValue showLabel />
      <ConfidenceMeter value={undefined} display="meter" size="md" showValue showLabel />
      <ConfidenceMeter value={-10} display="meter" size="md" showValue showLabel />
      <ConfidenceMeter value={150} display="meter" size="md" showValue showLabel />
    </div>
  ),
};
