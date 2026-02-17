# AXK Distribution Deep Dive — Shadcn Learning Sprint

**Type:** 🔬 Research / Design Input
**Status:** ✅ Reviewed — Deferred to post-v0 (after all 6 primitives ship)
**Source:** ChatGPT analysis of shadcn docs (components.json, registry system, blocks)
**Date:** Feb 17, 2026

> **When to revisit:** After all 6 v0 primitives are built and verified.
> Specifically, this doc becomes actionable when you're ready to:
> 1. Build the `axk` CLI (`axk init`, `axk add`, `axk list`, `axk doctor`)
> 2. Create Block 01 (run-monitoring-flow)
> 3. Design the `axk.json` project fingerprint

---

## Key Insight

shadcn/ui spread because of three structural reasons:
1. **Config-as-fingerprint** (`components.json`) — the CLI knows your project layout
2. **Registry-as-distribution** — standardized manifests make "copy into repo" scalable
3. **Blocks-as-adoption-wedge** — installable compositions, not just parts

---

## 1) components.json — Project Fingerprint

### Problem it solves
The CLI can't reliably "generate and place code" unless it knows the project's structure and conventions.

components.json acts like a project fingerprint:
- tells the CLI where to install files
- tells the CLI how to resolve import paths (aliases)
- locks a style preset so installs and upgrades remain predictable
- can define multiple registries (including private registries)

### Data structures
A single config JSON with:
- `$schema`: JSON schema validation
- `style`: named style preset, typically immutable after init
- `aliases`: mapping for generated imports
- `registries`: namespaced registries with URL templates and optional auth headers/params

### AXK equivalent
`axk.json` should encode:
- install paths (components/headless/utils/styles)
- alias strategy
- styling system (CSS Modules) and tokens location
- feature flags (include stories/tests/simulator)
- registry namespaces (public and private)

#### Proposed `axk.json` schema

```json
{
  "$schema": "https://axk.dev/schema/axk.json",
  "version": "0.1",
  "project": {
    "framework": "react",
    "bundler": "vite",
    "typescript": true
  },
  "style": {
    "system": "css-modules",
    "tokens": {
      "cssVarsFile": "src/styles/ax-tokens.css",
      "namespace": "ax"
    }
  },
  "paths": {
    "components": "src/components/ax",
    "headless": "src/headless/ax",
    "utils": "src/utils/ax",
    "styles": "src/styles"
  },
  "aliases": {
    "ax": "@/components/ax",
    "axHeadless": "@/headless/ax",
    "axUtils": "@/utils/ax"
  },
  "features": {
    "includeStories": true,
    "includeTests": true,
    "includeSimulator": true
  },
  "registries": {
    "@axk": "https://axk.dev/r/{name}.json",
    "@internal": {
      "url": "https://internal.company.com/ax/{name}.json",
      "headers": {
        "Authorization": "Bearer ${AXK_TOKEN}"
      }
    }
  }
}
```

---

## 2) registry.json — Registry System

### Problem it solves
"Copy into repo" only scales if distribution is standardized. A registry enables discoverable, installable artifacts with dependency graphs.

### Data structures
- Root `registry.json` with items listing
- Each item: name, type, files[], dependencies, registryDependencies
- Item types distinguish primitives vs blocks

### AXK equivalent
Two-level system:
1. **Registry index** (`registry.json`) — catalog of all installables
2. **Per-item manifests** — detailed install unit descriptions

AX-specific metadata (first-class):
- `stateModel` (states + events)
- `a11yNotes` (keyboard + focus + aria-live)
- `axPrinciples` tags
- `scenarios` / simulator metadata

> **Note:** We already have `registry/registry.json` with all 6 v0 primitives including a11yNotes, stateModel, and axPrinciples. The per-item manifest split is a v1 optimization.

---

## 3) Blocks — Installable Compositions

### Problem it solves
Components aren't the whole product. Teams want installable flows that match real application needs.

### AXK Blocks v0 Ideas

**Block 01: run-monitoring-flow**
- PlanCard → RunControls → ToolTrace → ApprovalGate → ArtifactCard
- Scenarios: success/fail/timeout/approval-mid-run
- Proves "prototype to production"

**Block 02: failure-recovery-flow**
- ToolTrace (error grouping) + RunControls (retry/cancel) + ArtifactCard error states
- Scenarios: tool failure mid-run, partial completion, retry success

**Block 03: confidence-and-escalation-flow**
- ConfidenceMeter + ApprovalGate escalation thresholds + ToolTrace annotations
- Scenarios: confidence improving, low-confidence triggers gate, mismatch cues

---

## Implementation Order (When Revisited)

1. Build minimal `axk.json` (just `paths` + `style.tokens` — skip auth/aliases/features)
2. Implement `axk init` (writes `axk.json` + copies baseline tokens)
3. Implement `axk add <primitive>` (reads `registry.json`, copies files to configured paths)
4. Build Block 01 as the "wow demo"
5. Add `axk doctor` (validates config + required tokens)
6. Add `axk list` (shows available/installed primitives)

---

## Key Takeaways

1. **Namespaced registries with auth** = enterprise wedge (v1+)
2. **Registry index + manifests** = scalable distribution (v1 — we have registry.json for v0)
3. **Blocks = compounding adoption loop** (requires components first)
4. **Dependency graphs** (`registryDependencies`) = clean flow installs

*Filed: Feb 17, 2026 — Revisit after all 6 v0 primitives are built and verified.*
