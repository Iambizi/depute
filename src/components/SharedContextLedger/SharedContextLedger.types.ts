export interface ContextLedgerEntry {
  id: string;
  scope: 'global' | 'branch' | 'agent-local';
  type: 'fact' | 'decision' | 'constraint' | 'artifact';
  key: string;
  value: string;
  provenance: {
    authorAgent: string;
    source?: string;
    timestamp: string;
  };
  conflict?: boolean;
}

export interface SharedContextLedgerProps {
  /** The root layout class name */
  className?: string;
  entries?: ContextLedgerEntry[];
  currentScope?: 'global' | 'branch' | 'agent-local';
  onFilterContext?: (scope: 'global' | 'branch' | 'agent-local') => void;
}
