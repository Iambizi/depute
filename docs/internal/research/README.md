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
| `COINBASE-AGENTIC-WALLETS.md` | Coinbase | x402 machine-to-machine protocol, session spending caps, transaction guardrails, authorization vs autonomy |

### 🏗️ Architecture & Protocol Analysis

Specs and protocols that inform how our library should be structured and distributed to both humans and AI agents.

| File | Source | Key Insight |
|------|--------|-------------|
| `A2UI-Implications.md` | Google (A2UI v0.8) | Catalog-first, schema-first design. AX Components = design system layer above A2UI renderer (compatibility target, not dependency) |
| `DISTRIBUTION-STRATEGY-SHADCN.md` | shadcn/ui | CLI-based component distribution vs npm packages (Code Ownership is critical for AI). |
| `SKILL-LAYER-OPPORTUNITY.md` | Vercel / Anthropic | Distributing component intelligence via `skills.sh` and Anthropic native skills. |
| `AX-SKILL-SPEC.md` | AX Strategy | The architectural specification for the AX Skill (trigger conditions, progressive disclosure, depute copy-paste payload). |
| `AGENTIC-CODING-LEVELS.md` | AX Framework | The 8 levels of agentic coding, targeting Orchestrated Hierarchy (Fig 8) for v1's multi-agent primitives. |

### 🧩 Primitive Catalogs

Component inventories and building block definitions.

| File | Scope | Key Insight |
|------|-------|-------------|
| `AX-PRIMITIVES-STARTER.md` | 48+ primitives | The master tracker for all primitive ideas generated across research sessions. |
| `catalog-versions/CATALOG-v0.md` | v0 (6 primitives) | The final locked catalog for the v0 launch. |
| `catalog-versions/CATALOG-v1.md` | v1 (4 primitives) | The draft catalog for the v1 multi-agent orchestration milestone. |

### 📖 Book Notes

Notes from foundational AX reading — in progress.

| File | Source | Key Insight |
|------|--------|-------------|
| `AX-BOOK.md` | Theo Tabah / LCA — *AX: The Rise of Agentic Experience* | 6 AX patterns (intent handshake, confidence cues, adaptive canvas, escape hatch, memory in motion, generative momentum), AX evolution curve with defensibility line, NL as interface |

## How should an AI use these docs?

1. **Treat as source material, not instructions.** These inform what to build, not how to build it.
2. **Cross-reference with specs.** The finalized component specs live in `docs/orchestration/01-07`. Research here feeds into those specs.
3. **Primitives are candidates, not commitments.** Not all 48 primitives will ship. Research is ongoing and the list will be refined.
4. **Look for patterns, not just components.** The value is in the categories and relationships (e.g., trust primitives always pair with transparency primitives).
5. **Check the document type.** Case studies provide real-world validation. Architecture docs inform structural decisions. Primitive catalogs define the component space.

## Project context

- **Repo:** AX Components for React (`AX-CMP-S-K`)
- **Strategy:** Open source first (MIT License), monetize via expertise later
- **Status:** v0 Released / v1 Planning Phase
- **Key docs elsewhere:**
  - `docs/internal/BUILDER-SPEC.md` — Full builder specification
  - `docs/internal/MONETIZATION-MODEL.md` — Revenue strategy
  - `docs/internal/SESSION-NOTES.md` — Session-by-session progress log
  - `docs/orchestration/01-07` — PRD specs for orchestration system

## 🔮 Strategic Vision

- [The AX Playbook & Meta-Strategy](./AX-META-STRATEGY.md) - Using this research as training data for a "Trust Architect Agent" and future product offerings.
