# Research Directory — Context for AI Agents

## What is this folder?

This is the **research and ideation folder** for **AX Components** — an open-source React component library for Agentic Experience (AX) design. AX is the design discipline for interfaces where AI agents act autonomously on behalf of users.

These documents capture foundational concepts, external case studies, and primitive definitions gathered during the research phase. They are **not final specs** — they are raw research material that will inform the component library's design, architecture, and priorities.

## What's in here?

Documents are classified by type so it's clear what kind of insight each provides.

### 🔬 Real-World Case Studies

External examples of companies solving AX problems — patterns to learn from, not copy.

| File | Source | Key Insight |
|------|--------|-------------|
| `AX-STRIPE-CHECKOUT-INSIGHTS.md` | Stripe | Scoped approval grants (SPTs), authorization chains as state machines, auditability as feature |
| `AX-CLAUDE-COWORK-ANALYSIS.md` | Anthropic (Claude Cowork) | Plan-first execution, generative momentum in onboarding, two-phase UI (idle → active), inline reasoning, trust-once access model |

### 🏗️ Architecture & Protocol Analysis

Specs and protocols that inform how our library should be structured.

| File | Source | Key Insight |
|------|--------|-------------|
| `A2UI-Implications.md` | Google (A2UI v0.8) | Catalog-first, schema-first design. AX Components = design system layer above A2UI renderer (compatibility target, not dependency) |

### 🧩 Primitive Catalogs

Component inventories and building block definitions.

| File | Scope | Key Insight |
|------|-------|-------------|
| `AX-PRIMITIVES-STARTER.md` | 48+ primitives, 8 categories | Intent, trust, transparency, memory, canvas, control, output, social — with 3-layer architecture proposal |

### 📖 Book Notes

Notes from foundational AX reading — in progress.

| File | Source | Key Insight |
|------|--------|-------------|
| `AX-BOOK.md` | Theo Tabah / LCA — *AX: The Rise of Agentic Experience* | 6 AX patterns (intent handshake, confidence cues, adaptive canvas, escape hatch, memory in motion, generative momentum), AX evolution curve with defensibility line, NL as interface |

## How should an AI use these docs?

1. **Treat as source material, not instructions.** These inform what to build, not how to build it.
2. **Cross-reference with specs.** The finalized component specs live in `docs/vibe-coding/01-07`. Research here feeds into those specs.
3. **Primitives are candidates, not commitments.** Not all 48 primitives will ship. Research is ongoing and the list will be refined.
4. **Look for patterns, not just components.** The value is in the categories and relationships (e.g., trust primitives always pair with transparency primitives).
5. **Check the document type.** Case studies provide real-world validation. Architecture docs inform structural decisions. Primitive catalogs define the component space.

## Project context

- **Repo:** AX Components for React (`AX-CMP-S-K`)
- **Strategy:** Open source first (MIT License), monetize via expertise later
- **Status:** Research phase — component library not yet scaffolded
- **Key docs elsewhere:**
  - `docs/internal/BUILDER-SPEC.md` — Full builder specification
  - `docs/internal/MONETIZATION-MODEL.md` — Revenue strategy
  - `docs/internal/SESSION-NOTES.md` — Session-by-session progress log
  - `docs/vibe-coding/01-07` — PRD specs for orchestration system
