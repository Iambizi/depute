import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PlanCard } from './PlanCard';
import type { PlanStep } from '../../types/common';

const mockSteps: PlanStep[] = [
  { id: '1', label: 'Step 1', status: 'completed' },
  { id: '2', label: 'Step 2', status: 'active', reasoning: 'Thinking...' },
  { id: '3', label: 'Step 3', status: 'pending' },
];

describe('PlanCard', () => {
  describe('rendering', () => {
    it('renders with required props', () => {
      render(<PlanCard title="Test Plan" steps={mockSteps} />);
      expect(screen.getByRole('heading', { level: 3, name: 'Test Plan' })).toBeInTheDocument();
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('renders with all optional props', () => {
      render(
        <PlanCard
          title="Test Plan"
          steps={[{ id: '1', label: 'Step 1', status: 'pending', confidence: 90 }]}
          assumptions={['Assumption 1']}
          reasoning="General reasoning"
          showConfidence={true}
          mode="determinate"
        />
      );
      expect(screen.getByRole('button', { name: /Assumptions \(1\)/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reasoning/i })).toBeInTheDocument();
      expect(screen.getByText(/90% conf/i)).toBeInTheDocument();
    });

    it('renders empty state', () => {
      render(<PlanCard title="Empty Plan" steps={[]} />);
      expect(screen.getByText('No plan steps available')).toBeInTheDocument();
      expect(screen.getByRole('region', { name: 'No plan available' })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<PlanCard title="Test" steps={[]} className="custom-class" />);
      const region = screen.getByRole('region');
      expect(region).toHaveClass('custom-class');
    });
  });

  describe('states', () => {
    it('displays pending state correctly', () => {
      const steps: PlanStep[] = [{ id: '1', label: 'Step 1', status: 'pending' }];
      render(<PlanCard title="Test" steps={steps} />);
      expect(screen.getByRole('region', { name: 'Plan: Test, 1 steps pending' })).toBeInTheDocument();
    });

    it('displays active state correctly', () => {
      render(<PlanCard title="Test" steps={mockSteps} />);
      expect(screen.getByRole('region', { name: 'Plan: Test, step 2 of 3 in progress' })).toBeInTheDocument();
      // Step 2 is active so reasoning should show
      expect(screen.getByText('Thinking...')).toBeInTheDocument();
    });

    it('displays completed state correctly', () => {
      const steps: PlanStep[] = [
        { id: '1', label: 'Step 1', status: 'completed' },
        { id: '2', label: 'Step 2', status: 'completed' },
      ];
      render(<PlanCard title="Test" steps={steps} />);
      expect(screen.getByRole('region', { name: 'Plan: Test, all 2 steps completed' })).toBeInTheDocument();
    });

    it('displays failed state correctly', () => {
      const steps: PlanStep[] = [
        { id: '1', label: 'Step 1', status: 'completed' },
        { id: '2', label: 'Step 2', status: 'failed' },
      ];
      render(<PlanCard title="Test" steps={steps} />);
      expect(screen.getByRole('region', { name: 'Plan: Test, step Step 2 failed' })).toBeInTheDocument();
    });

    it('displays indeterminate state correctly', () => {
      render(<PlanCard title="Test" steps={mockSteps} mode="indeterminate" />);
      expect(screen.getByRole('region', { name: 'Plan: Test, 1 steps completed, more expected' })).toBeInTheDocument();
      expect(screen.getByText('• • •')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onStepClick handler', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<PlanCard title="Test" steps={mockSteps} onStepClick={handleClick} />);
      const stepButton = screen.getAllByRole('button')[0];
      await user.click(stepButton);
      expect(handleClick).toHaveBeenCalledWith(mockSteps[0]);
    });

    it('handles keyboard activation', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<PlanCard title="Test" steps={mockSteps} onStepClick={handleClick} />);
      const stepButton = screen.getAllByRole('button')[0];
      stepButton.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledWith(mockSteps[0]);
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('expands assumptions and reasoning sections', async () => {
      const user = userEvent.setup();
      render(<PlanCard title="Test" steps={mockSteps} assumptions={['A1']} reasoning="R1" />);
      
      const assumptionToggle = screen.getByRole('button', { name: /Assumptions/i });
      const reasoningToggle = screen.getByRole('button', { name: /Reasoning/i });
      
      expect(screen.queryByText('A1')).not.toBeInTheDocument();
      expect(screen.queryByText('R1')).not.toBeInTheDocument();

      await user.click(assumptionToggle);
      expect(screen.getByText('A1')).toBeInTheDocument();
      
      await user.click(reasoningToggle);
      expect(screen.getByText('R1')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA labels', () => {
      render(<PlanCard title="Test Plan" steps={mockSteps} />);
      expect(screen.getByRole('region', { name: /Plan: Test Plan/ })).toBeInTheDocument();
      expect(screen.getByRole('list', { name: 'Steps for Test Plan' })).toBeInTheDocument();
    });

    it('indicates current step', () => {
      render(<PlanCard title="Test" steps={mockSteps} />);
      const items = screen.getAllByRole('listitem');
      // step 2 is active
      expect(items[1]).toHaveAttribute('aria-current', 'step');
      expect(items[0]).not.toHaveAttribute('aria-current');
    });

    it('announces step selection via aria-live', async () => {
      const user = userEvent.setup();
      render(<PlanCard title="Test" steps={mockSteps} onStepClick={vi.fn()} />);
      
      const stepButton = screen.getAllByRole('button')[0];
      await user.click(stepButton);
      
      // The announcer appends a visually hidden live region
      await waitFor(() => {
        expect(screen.getByText('Selected step: Step 1')).toBeInTheDocument();
      });
    });
  });
});
