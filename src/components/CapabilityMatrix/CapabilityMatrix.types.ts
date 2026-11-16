import type { ApprovalReceipt, RevokeMethod } from '../../utils/receipt';

/**
 * CapabilityMatrix — Type Definitions
 *
 * v2 Compliance & Forensics primitive.
 * Permission inspector showing the agent's allowed/denied capabilities.
 *
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 3)
 */

/** Permission level for a capability */
export type PermissionLevel = 'full' | 'read' | 'write' | 'none' | 'conditional';

/** A single capability entry */
export interface Capability {
  /** Tool or resource name (e.g. "database.users", "email.send") */
  name: string;

  /** Human-readable description */
  description?: string;

  /** Permission level */
  permission: PermissionLevel;

  /** Condition for conditional permissions */
  condition?: string;

  /** Category grouping (e.g. "Data", "Communications", "Infrastructure") */
  category?: string;
}

/** A standing grant. Revoke records a receipt. It does not approve a new grant. */
export interface LiveGrant {
  id: string;
  agentId: string;
  onBehalfOf?: string;
  scope: string;
  limit?: string;
  /** ISO-8601. Missing means the grant has no expiry. */
  expiresAt?: string;
  /** ISO-8601. */
  lastUsedAt?: string;
  /** Who holds the grant, as the host names them. Declared. */
  counterparty?: string;
  /** Approval receipt this grant came from, when the host still has the hash. */
  approvalReceiptHash?: string;
}

/** What the host reports after a revoke. A missing result stays "Revoke requested". */
export interface RevokeHostResult {
  state: 'confirmed' | 'unknown';
  method?: RevokeMethod;
}

export interface CapabilityMatrixProps {
  /** Title (e.g. "Agent Permissions", "Tool Access Matrix") */
  title: string;

  /** Description of the capability scope */
  description?: string;

  /** List of capabilities */
  capabilities: Capability[];

  /** Agent identity label (e.g. "research-agent-01") */
  agentId?: string;

  /** Whether to group capabilities by category (default: true) */
  groupByCategory?: boolean;

  /** Whether to highlight denied capabilities (default: true) */
  highlightDenied?: boolean;

  /** Called when user clicks on a capability for details */
  onCapabilityClick?: (capability: Capability) => void;

  /** Standing grants. This list does not approve a new grant. */
  grants?: readonly LiveGrant[];

  /**
   * Tells the host the person asked to revoke. "Revoked" is shown only when
   * the promise resolves `{ state: 'confirmed' }`. A void return stays
   * "Revoke requested". Delegation Gate remains the approve or deny step
   * for a new or changed grant.
   */
  onRevoke?: (grant: LiveGrant) => void | Promise<RevokeHostResult | void>;

  /** How the host says the revoke is sent, when the callback does not say. Declared. */
  revokeMethod?: RevokeMethod;

  /**
   * When set, a revoke that is still pending after this many milliseconds
   * becomes Unknown, with retry. There is no default.
   */
  revokeTimeoutMs?: number;

  /** Revoke receipt. The host stores it. */
  onReceipt?: (receipt: ApprovalReceipt) => void;

  /** Additional CSS class */
  className?: string;
}
