import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { AgentRoster } from './AgentRoster';
import type { AgentRosterItem } from './AgentRoster.types';

const MOCK_AGENTS: AgentRosterItem[] = [
  { id: 'a1', name: 'Orchestrator-Prime', role: 'Orchestrator', status: 'working', currentTask: 'Delegating tasks', tokensUsed: 4200, lastActive: '2m ago' },
  { id: 'a2', name: 'Researcher-A', role: 'Researcher', status: 'idle', tokensUsed: 800, lastActive: '5m ago' },
  { id: 'a3', name: 'QA-Inspector', role: 'QA Inspector', status: 'failed', currentTask: 'Validation crashed', tokensUsed: 3100, lastActive: 'just now' },
];

describe('AgentRoster', () => {
  describe('rendering', () => {
    it('renders all agent names', () => {
      render(<AgentRoster agents={MOCK_AGENTS} />);
      expect(screen.getByText('Orchestrator-Prime')).toBeInTheDocument();
      expect(screen.getByText('Researcher-A')).toBeInTheDocument();
      expect(screen.getByText('QA-Inspector')).toBeInTheDocument();
    });

    it('shows empty state when no agents', () => {
      render(<AgentRoster agents={[]} />);
      // Empty state text: "No agents in roster."
      expect(screen.getByText(/No agents in roster/)).toBeInTheDocument();
    });

    it('displays agent roles', () => {
      render(<AgentRoster agents={MOCK_AGENTS} />);
      expect(screen.getByText('Orchestrator')).toBeInTheDocument();
      expect(screen.getByText('Researcher')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<AgentRoster agents={MOCK_AGENTS} className="custom-roster" />);
      expect(screen.getByRole('region', { name: /agent roster/i })).toHaveClass('custom-roster');
    });
  });

  describe('states', () => {
    it('shows status summary pill for working agents', () => {
      render(<AgentRoster agents={MOCK_AGENTS} />);
      // Summary pills format: "1 working"
      expect(screen.getByText(/1 working/)).toBeInTheDocument();
    });

    it('shows summary pill for failed agents', () => {
      render(<AgentRoster agents={MOCK_AGENTS} />);
      expect(screen.getByText(/1 failed/)).toBeInTheDocument();
    });

    it('shows current task when present', () => {
      render(<AgentRoster agents={MOCK_AGENTS} />);
      expect(screen.getByText('Delegating tasks')).toBeInTheDocument();
    });

    it('shows status summary counts in header', () => {
      render(<AgentRoster agents={MOCK_AGENTS} />);
      // At least one summary badge visible
      expect(screen.getByText(/working/)).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onAgentSelect when a row is clicked', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(<AgentRoster agents={MOCK_AGENTS} onAgentSelect={handleSelect} />);

      // Row has aria-label when selectable
      const row = screen.getByRole('button', { name: /Researcher-A/i });
      await user.click(row);
      expect(handleSelect).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'a2', name: 'Researcher-A' })
      );
    });
  });

  describe('accessibility', () => {
    it('has a region landmark with appropriate label', () => {
      render(<AgentRoster agents={MOCK_AGENTS} />);
      expect(screen.getByRole('region', { name: /agent roster/i })).toBeInTheDocument();
    });

    it('renders agents in a list or table structure', () => {
      render(<AgentRoster agents={MOCK_AGENTS} />);
      const rows = screen.getAllByRole('row');
      // Header + 3 agents
      expect(rows.length).toBeGreaterThanOrEqual(3);
    });
  });
});
