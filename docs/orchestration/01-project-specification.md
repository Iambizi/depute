# 01 - Project Specification

## Project Identity

**Name:** AX Components for React
**Tagline:** "From prototype to production"
**Domain:** Agentic Experience (AX) Design
**Catalog Status:** v0 passed validation / ready for release (Feb 20, 2026)
**Distribution Model:** AXK (CLI copy-paste, shadcn-style)

## What is Agentic Experience (AX)?

AX is the design discipline for interfaces where AI agents act on behalf of users. Unlike traditional UX where humans click through interfaces, AX addresses:

- **Probabilistic outcomes**: Agent actions have confidence scores, not binary success/failure
- **Autonomous multi-step workflows**: Agents execute complex tasks without constant human input
- **Transparency requirements**: Users need to see what agents are doing and why
- **Human-in-the-loop patterns**: Critical decisions require human approval
- **Asynchronous operations**: Agent tasks may take seconds or minutes to complete

## The Problem

Traditional UI components assume deterministic workflows. Figma prototypes can't handle AI's probabilistic nature. Teams need functional prototypes that respond to real agent behavior, then ship those same components to production. No translation layer, no rebuild.

## The Solution

Production-ready React components specifically designed for agentic interactions. Use them to prototype agent experiences, then deploy the same code to production.

**AXK Model (shadcn-style):**
- UI primitives are **copied into the user's repo** via a CLI (no npm black box).
- Headless hooks can be published as a small package, but UI code is owned by the user.
- A registry defines available primitives and variants.

## Project Goals

1. Build production-ready React components that solve core AX design patterns
2. Serve both prototyping workflows (designers) and production engineering
3. Provide TypeScript types for full type safety
4. Create reusable, customizable components that work with any AI agent backend
5. Document AX design principles each component addresses
6. Enable rapid prototyping AND production deployment

## Dual-Audience Approach

Every component serves TWO distinct audiences:

### Designers/PMs (Prototyping)
- Need functional prototypes with mock data
- Prototypes should respond, fail gracefully, show probabilistic behavior
- No backend setup required
- 5-minute setup to working prototype

### Engineers (Production)
- Need production-ready components
- Handle real agent APIs, edge cases, and performance
- Full TypeScript support
- Same component code as prototypes, minimal changes

## Design Principles

1. **Transparency First**: Always show what the agent is doing and why
2. **Confidence Communication**: Make probabilistic nature visible but not overwhelming
3. **Graceful Degradation**: Work well even with minimal information
4. **Human Control**: Enable oversight without requiring constant attention
5. **Familiar Patterns**: Build on React conventions developers know
6. **Prototype-to-Production Path**: Components work identically in both contexts

## Component Roadmap (v0)

> **Strategy:** Open source first (MIT License). All primitives are free. See `MONETIZATION-MODEL.md` for revenue strategy via consulting, content, and enterprise support.

### Core Primitives (Open Source, MIT License)

v0 ships **6 primitives across 4 categories**:

| Category | Primitives (v0) | AX Problem Solved |
|----------|-----------------|-------------------|
| Intent & Delegation | `PlanCard` | Moving from "talking" to "committing work" |
| Trust & Approval | `ApprovalGate`, `ConfidenceMeter` | Boundaries, consent, and confidence |
| Transparency & Trace | `ToolTrace`, `ArtifactCard` | Making the system legible while working + clear outputs |
| Control & Steering | `RunControls` | Steering agents without breaking flow |

### Upcoming v1 (Orchestration & Distribution)

With v0 solving single-agent oversight, v1 focuses on multi-agent swarms and AI-native distribution.
* **Orchestration Primitives**: `AgentRoster`, `OrchestratorView`, `SubagentCard`, `TaskQueue`, `HandoffProtocol`, `DelegationGate`, `SwarmMonitor`, `EscalationRouter`, `SwarmInbox`, `BranchControls`, `SharedContextLedger`
* **Distribution Layer**: Native AI Skills (`skills.sh` and Anthropic `.claude/skills`) to teach coding agents how to install and use AX Components.

*Deferred primitives (v2+):* `IntentBar`, `MemoryPanel`, `ThrottleControl`, `RiskBadge`, `AdaptiveCanvas`, financial primitives.

### Architecture Overview

Three-layer structure (AXK):

1. **Headless Hooks** — State machines and hooks (`useRun()`, `useApprovalGate()`, `useTrace()`)
2. **Styled UI Primitives** — Copy-paste React components owned by the user
3. **Registry + CLI** — Distribute primitives and variants into user repos


## Success Criteria

### A designer should be able to:
- Install the library
- Import a component and mock data utilities
- Have a working, interactive prototype in under 5 minutes
- Test different agent behaviors without backend setup

### An engineer should be able to:
- Use the same component in production
- Connect to real agent APIs with minimal code changes
- Trust the component to handle edge cases
- Ship to production with confidence
