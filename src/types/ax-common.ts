/**
 * AX Components — Shared Types
 *
 * Core TypeScript types used across all AX primitives.
 * These are the stable contracts for the v0 component set.
 *
 * @see docs/orchestration/06-technical-specifications.md
 */

// ---------------------------------------------------------------------------
// Enums / Union Types
// ---------------------------------------------------------------------------

/** Status of an individual plan step */
export type PlanStepStatus = 'pending' | 'active' | 'completed' | 'failed';

/** Execution state for RunControls */
export type RunState = 'idle' | 'running' | 'paused' | 'completed' | 'failed';

/** Approval gate status */
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'expired';

/** Confidence level thresholds */
export type ConfidenceLevel = 'high' | 'medium' | 'low';

// ---------------------------------------------------------------------------
// Data Interfaces
// ---------------------------------------------------------------------------

/** A single step in a plan */
export interface PlanStep {
  id: string;
  label: string;
  description?: string;
  status: PlanStepStatus;
  confidence?: number;
  reasoning?: string;
  timestamp?: string;
}

/** A single tool call entry */
export interface ToolCall {
  id: string;
  name: string;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
  error?: string;
  timestamp: string;
  /** Policy flags declared by the tool (v1 — A2UI compatibility) */
  policyFlags?: {
    requiresApproval?: boolean;
    writesState?: boolean;
    externalAction?: boolean;
  };
}

/** An artifact produced by agent execution */
export interface Artifact {
  id: string;
  title: string;
  type: 'markdown' | 'json' | 'csv' | 'code' | 'other';
  content: string;
  metadata?: Record<string, string>;
  timestamp: string;
  /** ID of the plan step that produced this artifact (provenance) */
  sourceStepId?: string;
  /** IDs of tool calls involved in producing this artifact (provenance) */
  toolCallIds?: string[];
}

// ---------------------------------------------------------------------------
// Utility Functions
// ---------------------------------------------------------------------------

/** Map a confidence score (0-100) to a semantic level */
export function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score >= 80) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}
