# Skill Layer Opportunity & Broader Paradigm Positioning

## Context
On the day V0 primitives were completed (Feb 18), Greg Isenberg published a newsletter arguing that the software paradigm is shifting from SaaS features to AI "skills" — packaged workflows containing structured instructions, defined I/O, and encoded judgment that agents can invoke repeatably. The core claim: value is moving from owning the interface to becoming the default callable pattern.

This was discussed in the context of the AX Component Starter Kit, which had just shipped five production-ready primitives (ApprovalGate, ConfidenceMeter, RunControls, ToolTrace, ArtifactCard) with clean TypeScript build and proper accessibility semantics.

## Key Insight
The AX library is already a skill library in Greg's framing — it encodes design judgment about how agents communicate with humans into repeatable, callable patterns. This is the interface layer of the skill economy, which Greg's newsletter largely ignores. Most skill discussion focuses on agents executing tasks; the human-facing output layer is underexplored.

## Deferred Opportunity
A natural evolution exists: build an AX skill that takes a description of an agent's workflow and returns the right primitive configuration. This would dogfood the library, demonstrate its value, and position it within the emerging skill economy. MCP (Model Context Protocol) is the protocol worth watching for distribution.

## Decision at Time of Writing
Deferred to avoid scope creep during critical V0 → public launch window. Revisit once library has traction and Theo outreach has happened.

## Open Questions
- Is MCP the right protocol, or does something else win?
- Does the skill live inside the library repo or as a separate project?
- Could empirical usage data from the component library inform the skill's encoded judgment?
