import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SharedContextLedger } from './SharedContextLedger';
import type { ContextLedgerEntry } from './SharedContextLedger.types';

const MOCK_ENTRIES: ContextLedgerEntry[] = [
  {
    id: 'e1', scope: 'global', type: 'decision', key: 'primary_goal',
    value: 'Refactor authentication layer',
    provenance: { authorAgent: 'Orchestrator-Prime', timestamp: '10m ago' },
  },
  {
    id: 'e2', scope: 'branch', type: 'constraint', key: 'user_constraints',
    value: 'Must stay under 8k tokens per sub-agent',
    provenance: { authorAgent: 'Planner-Beta', source: 'User requirement', timestamp: '8m ago' },
  },
  {
    id: 'e3', scope: 'agent-local', type: 'fact', key: 'active_hypothesis',
    value: 'Cache invalidation is the root cause',
    provenance: { authorAgent: 'Researcher-A', timestamp: '3m ago' },
    conflict: true,
  },
];

describe('SharedContextLedger', () => {
  describe('rendering', () => {
    it('renders entry keys and values', () => {
      render(<SharedContextLedger entries={MOCK_ENTRIES} />);
      expect(screen.getByText('primary_goal')).toBeInTheDocument();
      expect(screen.getByText('Refactor authentication layer')).toBeInTheDocument();
    });

    it('renders author agent in provenance', () => {
      render(<SharedContextLedger entries={MOCK_ENTRIES} />);
      expect(screen.getByText(/Orchestrator-Prime/)).toBeInTheDocument();
    });

    it('renders provenance source when provided', () => {
      render(<SharedContextLedger entries={MOCK_ENTRIES} />);
      expect(screen.getByText(/User requirement/)).toBeInTheDocument();
    });

    it('renders type tags for each entry', () => {
      render(<SharedContextLedger entries={MOCK_ENTRIES} />);
      expect(screen.getByText('decision')).toBeInTheDocument();
      expect(screen.getByText('constraint')).toBeInTheDocument();
      expect(screen.getByText('fact')).toBeInTheDocument();
    });

    it('shows empty state when no entries', () => {
      render(<SharedContextLedger entries={[]} />);
      // Empty state text from component: "No context entries found in this scope."
      expect(screen.getByText(/No context entries found in this scope/)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<SharedContextLedger entries={MOCK_ENTRIES} className="my-ledger" />);
      expect(container.firstChild).toHaveClass('my-ledger');
    });
  });

  describe('states', () => {
    it('shows conflict badge for entries with conflict flag', () => {
      render(<SharedContextLedger entries={MOCK_ENTRIES} />);
      // conflict entry renders "Conflict Detected" badge
      expect(screen.getByText('Conflict Detected')).toBeInTheDocument();
    });

    it('shows the component heading', () => {
      render(<SharedContextLedger entries={MOCK_ENTRIES} />);
      expect(screen.getByRole('heading', { name: /Shared Context Ledger/i })).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onFilterContext when scope tab buttons are clicked', async () => {
      const user = userEvent.setup();
      const handleFilter = vi.fn();
      render(<SharedContextLedger entries={MOCK_ENTRIES} currentScope="branch" onFilterContext={handleFilter} />);

      const globalBtn = screen.getByRole('button', { name: /Global/i });
      await user.click(globalBtn);
      expect(handleFilter).toHaveBeenCalledWith('global');
    });

    it('active scope tab has the active CSS class', () => {
      const { container } = render(<SharedContextLedger entries={MOCK_ENTRIES} currentScope="branch" />);
      // The Branch tab should have the active class; select by button text
      const branchBtn = screen.getByRole('button', { name: /Branch/i });
      // The active CSS module class will be applied
      expect(branchBtn.className).toContain('active');
    });
  });

  describe('accessibility', () => {
    it('has a heading for the ledger', () => {
      render(<SharedContextLedger entries={MOCK_ENTRIES} />);
      expect(screen.getByRole('heading', { name: /Shared Context Ledger/i })).toBeInTheDocument();
    });

    it('scope filter buttons are rendered', () => {
      render(<SharedContextLedger entries={MOCK_ENTRIES} />);
      expect(screen.getByRole('button', { name: /Global/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Branch/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Local/i })).toBeInTheDocument();
    });
  });
});
