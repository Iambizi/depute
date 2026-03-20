import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SessionOverview } from './SessionOverview';

describe('SessionOverview', () => {
  const defaultProps = {
    sessionSummary: 'Refactored 3 UI components and updated the corresponding test suites.',
    duration: '14m 23s',
    surfacesTouched: [
      { type: 'file' as const, label: 'Button.tsx', action: 'write' as const },
      { type: 'database' as const, label: 'users_table', action: 'read' as const },
    ],
    keyDecisions: [
      { description: 'Skipped refactoring Input.tsx due to unresolvable type conflicts.' },
    ],
  };

  it('renders the high-level session data correctly', () => {
    render(<SessionOverview {...defaultProps} />);
    
    expect(screen.getByText('Session Overview')).toBeInTheDocument();
    expect(screen.getByText('14m 23s')).toBeInTheDocument();
    expect(screen.getByText('Refactored 3 UI components and updated the corresponding test suites.')).toBeInTheDocument();
  });

  it('renders surfaces touched with correct actions', () => {
    render(<SessionOverview {...defaultProps} />);
    
    expect(screen.getByText('Impacted Surfaces')).toBeInTheDocument();
    expect(screen.getByText('Button.tsx')).toBeInTheDocument();
    expect(screen.getByText('write')).toBeInTheDocument();
    
    expect(screen.getByText('users_table')).toBeInTheDocument();
    expect(screen.getByText('read')).toBeInTheDocument();
  });

  it('renders key decisions if provided', () => {
    render(<SessionOverview {...defaultProps} />);
    
    expect(screen.getByText('Key AI Decisions')).toBeInTheDocument();
    expect(screen.getByText('Skipped refactoring Input.tsx due to unresolvable type conflicts.')).toBeInTheDocument();
  });

  it('does not render Key AI Decisions section if none provided', () => {
    render(
      <SessionOverview
        {...defaultProps}
        keyDecisions={undefined}
      />
    );
    expect(screen.queryByText('Key AI Decisions')).not.toBeInTheDocument();
  });
});
