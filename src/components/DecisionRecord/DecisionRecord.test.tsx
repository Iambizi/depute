import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DecisionRecord } from './DecisionRecord';

describe('DecisionRecord', () => {
  const defaultProps = {
    decision: 'approved' as const,
    approver: {
      name: 'Alice System',
      role: 'Compliance Officer',
      timestamp: new Date('2026-03-20T10:00:00Z'),
    },
    agentContext: {
      intent: 'Transfer $10,000 to Vendor X',
    },
  };

  it('renders the core decision data correctly', () => {
    render(<DecisionRecord {...defaultProps} />);
    
    // Header & Status
    expect(screen.getByText('Decision Record')).toBeInTheDocument();
    expect(screen.getByText('approved')).toBeInTheDocument();
    
    // Approver details
    expect(screen.getByText(/Alice System/)).toBeInTheDocument();
    expect(screen.getByText(/\(Compliance Officer\)/)).toBeInTheDocument();
    
    // Agent context
    expect(screen.getByText('Transfer $10,000 to Vendor X')).toBeInTheDocument();
  });

  it('formats string timestamps correctly', () => {
    render(
      <DecisionRecord
        {...defaultProps}
        approver={{
          ...defaultProps.approver,
          timestamp: '2026-03-20T12:00:00Z',
        }}
      />
    );
    // Since timestamp formatting is localized, we just check that standard text renders
    // without throwing an error
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it('renders optional policy and reasoning when provided', () => {
    render(
      <DecisionRecord
        {...defaultProps}
        agentContext={{
          intent: 'Elevate privileges',
          policyInvoked: 'SEC-004: Strict Access',
        }}
        humanReasoning="Reviewed access logs, looks legitimate."
      />
    );
    
    expect(screen.getByText('SEC-004: Strict Access')).toBeInTheDocument();
    expect(screen.getByText('Reviewed access logs, looks legitimate.')).toBeInTheDocument();
  });

  it('applies decision-specific styling classes', () => {
    const { container: rejectedContainer } = render(
      <DecisionRecord {...defaultProps} decision="rejected" />
    );
    const rejectedBadge = screen.getByText('rejected');
    expect(rejectedBadge.className).toMatch(/rejected/);

    const { container: modifiedContainer } = render(
      <DecisionRecord {...defaultProps} decision="modified" />
    );
    const modifiedBadge = screen.getByText('modified');
    expect(modifiedBadge.className).toMatch(/modified/);
  });
});
