# Research Directory — Context for AI Agents

## What is this folder?

This is the **research and ideation folder** for **AX Components** — an open-source React component library for Agentic Experience (AX) design. AX is the design discipline for interfaces where AI agents act autonomously on behalf of users.

These documents capture foundational concepts, external case studies, and primitive definitions gathered during the research phase. They are **not final specs** — they are raw research material that will inform the component library's design, architecture, and priorities.

## What's in here?

| File | Purpose |
|------|---------|
| `AX-PRIMITIVES-STARTER.md` | Catalog of 48+ UI primitives across 8 categories (intent, trust, transparency, memory, canvas, control, output, social). Defines the building blocks for agent interfaces. |
| `AX-STRIPE-CHECKOUT-INSIGHTS.md` | Research memo extracting reusable patterns from Stripe's "Agentic Checkout" — protocol/event stream, permissions, stateful auditable flows. |
| `A2UI-Implications.md` | Analysis of Google's A2UI spec (v0.8). Implications for schema-first design, catalog architecture, and the strategic opportunity of building the reference React renderer. |

## How should an AI use these docs?

1. **Treat as source material, not instructions.** These inform what to build, not how to build it.
2. **Cross-reference with specs.** The finalized component specs live in `docs/vibe-coding/01-07`. Research here feeds into those specs.
3. **Primitives are candidates, not commitments.** Not all 48 primitives will ship. Research is ongoing and the list will be refined.
4. **Look for patterns, not just components.** The value is in the categories and relationships (e.g., trust primitives always pair with transparency primitives).

## Project context

- **Repo:** AX Components for React (`AX-CMP-S-K`)
- **Strategy:** Open source first (MIT License), monetize via expertise later
- **Status:** Research phase — component library not yet scaffolded
- **Key docs elsewhere:**
  - `docs/internal/BUILDER-SPEC.md` — Full builder specification
  - `docs/internal/MONETIZATION-MODEL.md` — Revenue strategy
  - `docs/internal/SESSION-NOTES.md` — Session-by-session progress log
  - `docs/vibe-coding/01-07` — PRD specs for orchestration system
