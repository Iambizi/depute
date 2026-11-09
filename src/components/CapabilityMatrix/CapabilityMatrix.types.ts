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

/** A standing grant. Revoke does not approve anything. The host opens Delegation Gate for that. */
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

  /** Standing grants. This list does not approve or revoke by itself. */
  grants?: readonly LiveGrant[];

  /** Tells the host the person asked to revoke. The host shows Delegation Gate. */
  onRevoke?: (grant: LiveGrant) => void;

  /** Additional CSS class */
  className?: string;
}
