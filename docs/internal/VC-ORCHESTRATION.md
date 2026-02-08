# Vibe Coding Orchestration System - Implementation Plan

## Context

This document outlines a "Vibe Coding" system — a structured approach where a PRD is broken into numbered docs, then parsed into step-based slash commands that orchestrate AI-driven implementation. This system will power the AX Components React library build from `BUILDER-SPEC.md`.

## What Gets Created

### 1. Seven Numbered PRD Docs (`docs/vibe-coding/`)

Each doc is a durable reference that slash commands read at execution time:

#### `01-project-specification.md`
- **Purpose:** Project identity, goals, audiences, component roadmap
- **Source:** BUILDER-SPEC + MONETIZATION-MODEL

#### `02-technical-architecture.md`
- **Purpose:** Stack, build pipeline, project structure, configs
- **Source:** BUILDER-SPEC + gaps filled

#### `03-ux-design.md`
- **Purpose:** Interaction patterns, dual-audience UX, animation principles
- **Source:** BUILDER-SPEC + new content

#### `04-design-system.md`
- **Purpose:** Color tokens, typography, spacing, status colors, CSS vars
- **Source:** Mostly new (BUILDER-SPEC has minimal design tokens)

#### `05-interface-states.md`
- **Purpose:** Exhaustive state matrix for every component
- **Source:** BUILDER-SPEC AgentStep + expanded for all 4 components

#### `06-technical-specifications.md`
- **Purpose:** Full TypeScript API reference for all components + utilities
- **Source:** BUILDER-SPEC + new interfaces for 3 additional components

#### `07-universal-format-standards.md`
- **Purpose:** Code style, file naming, test format, story format, commit conventions
- **Source:** CLAUDE.md + new standards

**Plus:** `progress.json` — tracks which steps are completed per component

### 2. Thirteen Slash Commands (`.claude/skills/`)

#### Foundation (run once)

- `/vibe-status` — Dashboard showing what's done, what's next (read-only)
- `/vibe-step-1-ideation` — Reads BUILDER-SPEC.md, creates all 7 numbered docs + progress.json
- `/vibe-step-1b-init-project` — Scaffolds Vite + React + TS project, installs deps, configures Storybook/Vitest
- `/vibe-step-2-design-tokens` — Creates CSS custom properties (colors, spacing, typography, animations)
- `/vibe-step-3-shared-types` — Creates shared TypeScript types in `src/types/common.ts`

#### Per-component (run for each component)

- `/vibe-step-4-component [Name]` — Builds component folder with .tsx, .types.ts, .module.css, index.ts
- `/vibe-step-5-mock-data [Name]` — Creates mock data generators and simulation utilities
- `/vibe-step-6-stories [Name]` — Writes Storybook stories (prototyping + production + shared)
- `/vibe-step-7-tests [Name]` — Writes Vitest tests for all states and interactions

#### Finish (run after components)

- `/vibe-step-8-docs` — Writes README.md, examples/, dual-audience quick starts
- `/vibe-step-9-validate` — Full audit: TypeScript, tests, Storybook build, lint, exports, accessibility

#### Utilities (development/testing helpers)

- `/vibe-clean` — Resets progress.json (optionally for specific component or all)
- `/vibe-skip-to [step]` — Marks all previous steps as complete, useful for testing specific steps

### 3. Dependency Graph

```
step-1-ideation
      │
step-1b-init-project
      │
  ┌───┴───┐
  │       │
step-2  step-3  (can run in parallel)
  │       │
  └───┬───┘
      │
step-4-component [Name]  (per component, can parallelize across components)
      │
  ┌───┴───┐
  │       │
step-5  step-7  (can run in parallel)
  │
step-6
      │
      └── (all components done) ──> step-8-docs ──> step-9-validate
```

### 4. Adding New Components Later

To add `ConfidenceScoreBadge` after `AgentProgressTracker` is complete:

1. Run `/vibe-step-4-component ConfidenceScoreBadge`
2. Run `/vibe-step-5-mock-data ConfidenceScoreBadge`
3. Run `/vibe-step-6-stories ConfidenceScoreBadge`
4. Run `/vibe-step-7-tests ConfidenceScoreBadge`
5. Run `/vibe-step-8-docs` (updates README)
6. Run `/vibe-step-9-validate` (re-validates all)

**Note:** Global steps 1-3 never need re-running.

## Implementation Order

The system will be created in this sequence:

1. **Create `docs/vibe-coding/` directory and all 7 numbered PRD docs**
   - Extract from BUILDER-SPEC.md
   - Fill gaps for design system, interface states, and additional component APIs

2. **Create `docs/vibe-coding/progress.json`**
   - Initialize with all steps as `not_started`

3. **Create all 13 skill files in `.claude/skills/`**
   - Each with prerequisite checks
   - Doc references
   - Step-by-step execution instructions
   - Progress tracking
   - Includes 2 utility commands for development/testing

4. **Update `CLAUDE.md`**
   - Add section about the vibe-coding system and available commands

## Files to Create

```
docs/vibe-coding/
  01-project-specification.md
  02-technical-architecture.md
  03-ux-design.md
  04-design-system.md
  05-interface-states.md
  06-technical-specifications.md
  07-universal-format-standards.md
  progress.json

.claude/skills/
  vibe-status/SKILL.md
  vibe-step-1-ideation/SKILL.md
  vibe-step-1b-init-project/SKILL.md
  vibe-step-2-design-tokens/SKILL.md
  vibe-step-3-shared-types/SKILL.md
  vibe-step-4-component/SKILL.md
  vibe-step-5-mock-data/SKILL.md
  vibe-step-6-stories/SKILL.md
  vibe-step-7-tests/SKILL.md
  vibe-step-8-docs/SKILL.md
  vibe-step-9-validate/SKILL.md
  vibe-clean/SKILL.md
  vibe-skip-to/SKILL.md
```

## Files to Modify

- `CLAUDE.md` — add vibe-coding system documentation

## Verification

After building:

1. Run `/vibe-status` to confirm progress tracking works
2. Confirm all 7 docs exist and are well-structured
3. Confirm all slash commands appear in Claude Code's command palette (type `/vibe-` and see autocomplete)
4. Run `/vibe-step-1-ideation` as a dry test — it should recognize docs already exist