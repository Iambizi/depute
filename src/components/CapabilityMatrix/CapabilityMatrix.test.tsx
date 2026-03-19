import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CapabilityMatrix } from './CapabilityMatrix';
import type { Capability } from './CapabilityMatrix.types';

const sampleCapabilities: Capability[] = [
  { name: 'database.users', description: 'User records', permission: 'read', category: 'Data' },
  { name: 'database.orders', description: 'Order records', permission: 'full', category: 'Data' },
  { name: 'email.send', description: 'Send emails', permission: 'none', category: 'Communications' },
  { name: 'email.draft', description: 'Draft emails', permission: 'write', category: 'Communications' },
  { name: 'deploy.staging', description: 'Deploy to staging', permission: 'conditional', condition: 'approved by lead', category: 'Infrastructure' },
];

describe('CapabilityMatrix', () => {
  describe('rendering', () => {
    it('renders with required props', () => {
      render(<CapabilityMatrix title="Agent Permissions" capabilities={sampleCapabilities} />);
      expect(screen.getByRole('region')).toBeInTheDocument();
      expect(screen.getByText('Agent Permissions')).toBeInTheDocument();
    });

    it('renders all capability names', () => {
      render(<CapabilityMatrix title="Permissions" capabilities={sampleCapabilities} />);
      expect(screen.getByText('database.users')).toBeInTheDocument();
      expect(screen.getByText('email.send')).toBeInTheDocument();
      expect(screen.getByText('deploy.staging')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(
        <CapabilityMatrix
          title="Permissions"
          capabilities={sampleCapabilities}
          description="Permissions for the current session"
        />
      );
      expect(screen.getByText('Permissions for the current session')).toBeInTheDocument();
    });

    it('renders agent ID', () => {
      render(
        <CapabilityMatrix
          title="Permissions"
          capabilities={sampleCapabilities}
          agentId="research-agent-01"
        />
      );
      expect(screen.getByText('research-agent-01')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<CapabilityMatrix title="Permissions" capabilities={sampleCapabilities} className="custom-matrix" />);
      expect(screen.getByRole('region')).toHaveClass('custom-matrix');
    });
  });

  describe('grouping', () => {
    it('groups by category by default', () => {
      render(<CapabilityMatrix title="Permissions" capabilities={sampleCapabilities} />);
      expect(screen.getByText('Data')).toBeInTheDocument();
      expect(screen.getByText('Communications')).toBeInTheDocument();
      expect(screen.getByText('Infrastructure')).toBeInTheDocument();
    });

    it('renders flat list when groupByCategory is false', () => {
      render(<CapabilityMatrix title="Permissions" capabilities={sampleCapabilities} groupByCategory={false} />);
      expect(screen.queryByText('Data')).not.toBeInTheDocument();
      expect(screen.getByText('database.users')).toBeInTheDocument();
    });
  });

  describe('permissions', () => {
    it('displays summary badges', () => {
      render(<CapabilityMatrix title="Permissions" capabilities={sampleCapabilities} />);
      expect(screen.getByText('4 allowed')).toBeInTheDocument();
      expect(screen.getByText('1 denied')).toBeInTheDocument();
    });

    it('renders conditional permission with condition', () => {
      render(<CapabilityMatrix title="Permissions" capabilities={sampleCapabilities} />);
      expect(screen.getByText('if approved by lead')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onCapabilityClick when row is clicked', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <CapabilityMatrix title="Permissions" capabilities={sampleCapabilities} onCapabilityClick={onClick} />
      );

      await user.click(screen.getByText('database.users'));
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'database.users' })
      );
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA role', () => {
      render(<CapabilityMatrix title="Permissions" capabilities={sampleCapabilities} />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('has descriptive aria-label', () => {
      render(<CapabilityMatrix title="Agent Permissions" capabilities={sampleCapabilities} />);
      expect(screen.getByRole('region')).toHaveAttribute(
        'aria-label',
        'Agent Permissions: 4 allowed, 1 denied out of 5 capabilities'
      );
    });

    it('has table role for the body', () => {
      render(<CapabilityMatrix title="Permissions" capabilities={sampleCapabilities} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });
});
