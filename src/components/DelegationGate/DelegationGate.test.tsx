import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DelegationGate } from './DelegationGate';

const BASE_PROPS = {
  requestingAgent: 'Orchestrator-Prime',
  proposedSubagent: {
    role: 'Code Writer',
    mandate: 'Write and test a data migration script for the users table',
    allowedTools: ['bash', 'read_file', 'write_file', 'run_tests'],
    maxDepth: 1,
    estimatedTokens: 18000,
    estimatedCost: '$0.27',
  },
  onApprove: vi.fn(),
  onDeny: vi.fn(),
};

describe('DelegationGate', () => {
  describe('rendering', () => {
    it('renders the requesting agent name', () => {
      render(<DelegationGate {...BASE_PROPS} />);
      expect(screen.getByText('Orchestrator-Prime')).toBeInTheDocument();
    });

    it('renders the proposed sub-agent role and mandate', () => {
      render(<DelegationGate {...BASE_PROPS} />);
      expect(screen.getByText('Code Writer')).toBeInTheDocument();
      expect(screen.getByText('Write and test a data migration script for the users table')).toBeInTheDocument();
    });

    it('renders allowed tools as chips', () => {
      render(<DelegationGate {...BASE_PROPS} />);
      expect(screen.getByText('bash')).toBeInTheDocument();
      expect(screen.getByText('read_file')).toBeInTheDocument();
      expect(screen.getByText('run_tests')).toBeInTheDocument();
    });

    it('renders estimated cost and token count', () => {
      render(<DelegationGate {...BASE_PROPS} />);
      expect(screen.getByText(/\$0\.27/)).toBeInTheDocument();
      expect(screen.getByText(/18,000|18000/)).toBeInTheDocument();
    });

    it('renders maxDepth when provided as "N levels"', () => {
      render(<DelegationGate {...BASE_PROPS} />);
      // maxDepth=1 renders as "1 levels"
      expect(screen.getByText('1 levels')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<DelegationGate {...BASE_PROPS} className="custom-gate" />);
      expect(screen.getByRole('alertdialog')).toHaveClass('custom-gate');
    });
  });

  describe('states', () => {
    it('shows no tools section when allowedTools is omitted', () => {
      const props = {
        ...BASE_PROPS,
        proposedSubagent: { ...BASE_PROPS.proposedSubagent, allowedTools: undefined },
      };
      render(<DelegationGate {...props} />);
      expect(screen.queryByText('bash')).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onApprove when Approve Spawn is clicked', async () => {
      const user = userEvent.setup();
      const handleApprove = vi.fn();
      render(<DelegationGate {...BASE_PROPS} onApprove={handleApprove} />);

      await user.click(screen.getByRole('button', { name: /Approve Spawn/i }));
      expect(handleApprove).toHaveBeenCalledTimes(1);
    });

    it('calls onDeny when Deny is clicked', async () => {
      const user = userEvent.setup();
      const handleDeny = vi.fn();
      render(<DelegationGate {...BASE_PROPS} onDeny={handleDeny} />);

      await user.click(screen.getByRole('button', { name: /Deny/i }));
      expect(handleDeny).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has alertdialog role', () => {
      render(<DelegationGate {...BASE_PROPS} />);
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('has aria-modal attribute', () => {
      render(<DelegationGate {...BASE_PROPS} />);
      expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true');
    });
  });
});
