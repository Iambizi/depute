# 01 - Project Specification

## Project Identity

**Name:** AX Components for React
**Tagline:** "From prototype to production"
**Domain:** Agentic Experience (AX) Design

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

## Component Roadmap

### Free Tier (Open Source, MIT License)

| # | Component | AX Problem Solved |
|---|-----------|-------------------|
| 1 | `AgentProgressTracker` | Probabilistic, dynamic multi-step workflows with confidence scores |
| 2 | `ConfidenceScoreBadge` | Communicating probabilistic outcomes visually |
| 3 | `AgentStatusIndicator` | Real-time agent state transparency |
| 4 | `BasicHumanApprovalGate` | Human-in-the-loop decision points |

### Paid Tier: Production Pack ($79)

| Component | AX Problem Solved |
|-----------|-------------------|
| `MultiStepHumanApprovalWorkflow` | Complex multi-gate approval chains |
| `AgentErrorRecoveryUI` | Graceful error handling with recovery paths |
| `ConfidenceThresholdControl` | User-configurable confidence thresholds |
| `ParallelAgentCoordinator` | Multiple concurrent agent visualization |
| `AgentAuditLog` | Full agent action history and transparency |
| `TokenUsageDisplay` | Resource consumption visibility |
| `AgentContextViewer` | Agent context/memory inspection |
| `RetryStrategySelector` | User-controlled retry behavior |

### Paid Tier: Prototype Pack ($29)

- 3 Prototype Templates (Chat Interface, Agent Dashboard, Document Analysis UI)
- Mock Data Library with pre-built generators
- Rapid Setup Guide with 10-minute quickstart

### Paid Tier: Complete Bundle ($99)

- Everything in both packs
- AX Design Patterns Handbook (50+ pages)
- 6 Complete Application Templates
- Monthly component additions (first 6 months)
- 1-on-1 office hours

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
