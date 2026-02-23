import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { OrchestratorView } from './OrchestratorView';
import type { OrchestratorNode } from './OrchestratorView.types';

const MOCK_NODES: OrchestratorNode[] = [
  {
    id: 'root',
    label: 'Orchestrator-Prime',
    role: 'Orchestrator',
    status: 'working',
    currentTask: 'Coordinating sub-agents',
    children: [
      { id: 'child-1', label: 'Researcher-A', role: 'Researcher', status: 'working', currentTask: 'Fetching docs' },
      { id: 'child-2', label: 'Code-Writer-1', role: 'Code Writer', status: 'blocked', currentTask: 'Awaiting approval' },
    ],
  },
];

describe('OrchestratorView', () => {
  describe('rendering', () => {
    it('renders with required props and shows root node', () => {
      render(<OrchestratorView nodes={MOCK_NODES} />);
      // aria-label is "Orchestrator agent tree"
      expect(screen.getByRole('region', { name: /orchestrator agent tree/i })).toBeInTheDocument();
      expect(screen.getByText('Orchestrator-Prime')).toBeInTheDocument();
    });

    it('shows agent count summary', () => {
      render(<OrchestratorView nodes={MOCK_NODES} />);
      // Counter is rendered as "3 agents"
      expect(screen.getByText(/3 agents/)).toBeInTheDocument();
    });

    it('renders empty state when no nodes provided', () => {
      render(<OrchestratorView nodes={[]} />);
      expect(screen.getByText(/no agents spawned/i)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<OrchestratorView nodes={MOCK_NODES} className="custom-tree" />);
      expect(screen.getByRole('region', { name: /orchestrator agent tree/i })).toHaveClass('custom-tree');
    });
  });

  describe('states', () => {
    it('shows capitalized status badge for a working node', () => {
      render(<OrchestratorView nodes={MOCK_NODES} />);
      // STATUS_LABELS maps 'working' → 'Working'
      expect(screen.getAllByText('Working').length).toBeGreaterThan(0);
    });

    it('shows Blocked status on blocked node', () => {
      render(<OrchestratorView nodes={MOCK_NODES} />);
      expect(screen.getByText('Blocked')).toBeInTheDocument();
    });

    it('displays currentTask when present', () => {
      render(<OrchestratorView nodes={MOCK_NODES} />);
      expect(screen.getByText('Coordinating sub-agents')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('expands and collapses child nodes on toggle click', async () => {
      const user = userEvent.setup();
      render(<OrchestratorView nodes={MOCK_NODES} />);

      // Children visible by default (expanded)
      expect(screen.getByText('Researcher-A')).toBeInTheDocument();

      // Click the collapse toggle on the root node
      const toggleBtn = screen.getByLabelText(/Collapse Orchestrator-Prime/i);
      await user.click(toggleBtn);
      expect(screen.queryByText('Researcher-A')).not.toBeInTheDocument();

      // Expand again
      const expandBtn = screen.getByLabelText(/Expand Orchestrator-Prime/i);
      await user.click(expandBtn);
      expect(screen.getByText('Researcher-A')).toBeInTheDocument();
    });

    it('calls onNodeClick when a node button is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<OrchestratorView nodes={MOCK_NODES} onNodeClick={handleClick} />);

      // Each node renders as a button when onNodeClick provided; click by aria-label
      const researcherBtn = screen.getByLabelText(/Researcher-A, Working/i);
      await user.click(researcherBtn);
      expect(handleClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'child-1', label: 'Researcher-A' })
      );
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA tree role', () => {
      render(<OrchestratorView nodes={MOCK_NODES} />);
      expect(screen.getByRole('tree')).toBeInTheDocument();
    });

    it('tree node buttons have accessible labels', () => {
      render(<OrchestratorView nodes={MOCK_NODES} onNodeClick={vi.fn()} />);
      // Each node has aria-label="Label, Status"
      expect(screen.getByLabelText(/Orchestrator-Prime, Working/i)).toBeInTheDocument();
    });
  });
});
