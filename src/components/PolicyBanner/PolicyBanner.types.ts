/**
 * PolicyBanner — Type Definitions
 *
 * v2 Compliance & Forensics primitive.
 * Persistent banner showing the agent's current operating policy/environment.
 *
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 7)
 */

/** Operating environment/policy mode */
export type PolicyMode =
  | 'sandbox'
  | 'staging'
  | 'production'
  | 'simulation'
  | 'test'
  | 'drafting'
  | 'executing';

/** Severity level determines visual treatment */
export type PolicySeverity = 'info' | 'warning' | 'critical';

export interface PolicyConstraint {
  /** Human-readable label (e.g. "Max Spend", "Allowed Tools") */
  label: string;
  /** Current value or description */
  value: string;
}

export interface PolicyBannerProps {
  /** The current operating mode/environment */
  mode: PolicyMode;

  /** Human-readable label override (defaults to mode name) */
  label?: string;

  /** Short description of the active policy */
  description?: string;

  /** Visual severity — controls color treatment (auto-detected from mode if omitted) */
  severity?: PolicySeverity;

  /** Active policy constraints to display */
  constraints?: PolicyConstraint[];

  /** Whether the banner can be collapsed (default: false — always visible) */
  collapsible?: boolean;

  /** Whether the banner is currently collapsed */
  collapsed?: boolean;

  /** Called when collapse toggle is clicked */
  onToggleCollapse?: () => void;

  /** Called when the user clicks "View Full Policy" */
  onViewPolicy?: () => void;

  /** Whether to show a pulsing indicator for live/production modes */
  showLiveIndicator?: boolean;

  /** Additional CSS class */
  className?: string;
}
