---
name: vibe-step-1-ideation
description: Create all 7 PRD docs and progress.json from BUILDER-SPEC.md
disable-model-invocation: true
allowed-tools: Read, Write, Bash(mkdir *)
---

# Step 1: Ideation - Create PRD Documentation

Generate the 7 numbered PRD documents and progress tracking file for the vibe-coding system.

## Prerequisites

- `BUILDER-SPEC.md` must exist in the project root
- `MONETIZATION-MODEL.md` must exist in the project root
- `CLAUDE.md` must exist in the project root

Read all three files to gather source content.

## Step 1: Create Directory

```bash
mkdir -p docs/vibe-coding
```

## Step 2: Create PRD Documents

Create all 7 documents in `docs/vibe-coding/` by extracting and organizing content from the source files:

### Doc 01: `01-project-specification.md`
**Sources:** BUILDER-SPEC.md (Project Context, Goals, Design Principles), MONETIZATION-MODEL.md (component roadmap, tier structure)
**Content:** Project identity, AX definition, goals, dual-audience approach, design principles, component roadmap with tiers, success criteria

### Doc 02: `02-technical-architecture.md`
**Sources:** BUILDER-SPEC.md (Technical Specifications, Project Structure), CLAUDE.md (Tech Stack)
**Content:** Stack details with versions, project directory structure, Vite library mode config, TypeScript config, package.json fields, dev scripts, component file pattern, export strategy, CI/CD pipeline

### Doc 03: `03-ux-design.md`
**Sources:** BUILDER-SPEC.md (Visual Design Guidelines, Accessibility)
**Content:** Dual-audience UX patterns, interaction patterns (progressive disclosure, confidence communication, status transitions, HITL gates, indeterminate progress), animation principles with timing table, layout patterns, responsive behavior, color usage rules, error state UX

### Doc 04: `04-design-system.md`
**Sources:** New content (derived from design guidelines)
**Content:** Full CSS custom property token system: base color palette, semantic status colors, confidence visualization colors, typography scale, spacing scale, border radius, shadows, animation tokens (durations + easings), keyframe animations, confidence bar gradient, component surface tokens, usage examples, customization guide

### Doc 05: `05-interface-states.md`
**Sources:** BUILDER-SPEC.md (AgentStep interface), new content for other 3 components
**Content:** State matrix for each of the 4 components listing every possible state with visual description and screen reader text. Props interaction matrices. Status lifecycle diagrams. Cross-component state interactions.

### Doc 06: `06-technical-specifications.md`
**Sources:** BUILDER-SPEC.md (AgentProgressTracker API), new interfaces for other 3 components
**Content:** Shared types (common.ts), full TypeScript interface for each component with JSDoc, key implementation details per component, mock data utility API with function signatures

### Doc 07: `07-universal-format-standards.md`
**Sources:** CLAUDE.md (Code Quality Standards, patterns), new standards
**Content:** TypeScript style rules, naming conventions table, file structure template, test format template, Storybook story format, CSS Module conventions, commit message format, import order rules, comment guidelines

## Step 3: Create Progress File

Create `docs/vibe-coding/progress.json` with this structure:

```json
{
  "version": "1.0.0",
  "lastUpdated": "",
  "globalSteps": {
    "step-1-ideation": { "name": "Create PRD Docs", "status": "not_started", "command": "/vibe-step-1-ideation", "completedAt": null },
    "step-1b-init-project": { "name": "Initialize Project", "status": "not_started", "command": "/vibe-step-1b-init-project", "dependsOn": ["step-1-ideation"], "completedAt": null },
    "step-2-design-tokens": { "name": "Design Tokens", "status": "not_started", "command": "/vibe-step-2-design-tokens", "dependsOn": ["step-1b-init-project"], "completedAt": null },
    "step-3-shared-types": { "name": "Shared Types", "status": "not_started", "command": "/vibe-step-3-shared-types", "dependsOn": ["step-1b-init-project"], "completedAt": null },
    "step-8-docs": { "name": "Documentation", "status": "not_started", "command": "/vibe-step-8-docs", "dependsOn": [], "completedAt": null },
    "step-9-validate": { "name": "Final Validation", "status": "not_started", "command": "/vibe-step-9-validate", "dependsOn": ["step-8-docs"], "completedAt": null }
  },
  "components": {
    "AgentProgressTracker": {
      "step-4-component": { "status": "not_started", "completedAt": null },
      "step-5-mock-data": { "status": "not_started", "completedAt": null },
      "step-6-stories": { "status": "not_started", "completedAt": null },
      "step-7-tests": { "status": "not_started", "completedAt": null }
    },
    "ConfidenceScoreBadge": { ... same pattern ... },
    "AgentStatusIndicator": { ... same pattern ... },
    "BasicHumanApprovalGate": { ... same pattern ... }
  }
}
```

## Step 4: Update Progress

Read `docs/vibe-coding/progress.json`, set `globalSteps.step-1-ideation.status` to `"completed"`, set `globalSteps.step-1-ideation.completedAt` to the current ISO timestamp, update `lastUpdated`, and write it back.

## Exit Criteria

- All 7 docs exist in `docs/vibe-coding/` with substantive content (not placeholder)
- `progress.json` exists with all steps initialized
- `step-1-ideation` is marked as `completed` in progress.json
- Confirm to user: "Step 1 complete. Run `/vibe-step-1b-init-project` next."
