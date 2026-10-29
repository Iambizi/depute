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
    /** Trust of the source this entry already records. */
    trust?: 'trusted' | 'untrusted' | 'unknown';
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
