# Distribution Strategy: The shadcn/ui Model

**Type:** 🏗️ Architectural Case Study
**Source:** shadcn/ui Analysis (Feb 2026)
**Context:** Evaluating "Copy-Paste" vs "npm Package" for AX Components.

---

## 1. The Core Innovation
shadcn/ui (launched March 2023) achieved 100K+ stars by rethinking distribution:
- **Old Way:** `npm install @mui/button` (Vendor lock-in, black box)
- **shadcn Way:** `npx shadcn-ui@latest add button` (Copies code to your repo, you own it)

### Why It Worked
1.  **Ownership:** Developers can tweak the component code directly (critical for AI/AX).
2.  **No Lock-in:** You aren't stuck waiting for the library maintainer to fix a bug.
3.  **AI-Friendly:** The source code lives in the project, meaning AI coding assistants (Cursor, Windsurf) can read/edit it easily.

---

## 2. Parallels to AX Project

| Dimension | shadcn/ui (2023) | AX Components (2026) |
|---|---|---|
| **Problem** | Traditional libs lock you in; hard to style | Traditional UX patterns don't fit agents |
| **Era** | Early Server Components era | Early Agentic Experience era |
| **Solution** | Copiable, owns-the-code components | Copiable, owns-the-code AX primitives |
| **Reference App** | "Taxonomy" (Open source app) | "AX Dashboard" (Proposed reference app) |
| **AI Fit** | High (transparent code) | **Critical** (Agents must read UI code to use it) |

## 3. Strategic Advantages for Us

**1. "Code Ownership" is vital for Agents**
An agentic interface often needs deep customization (e.g., custom `render` logic for specific tool outputs). Wrapping this in a rigid npm package package `node_modules` black box is a hindrance.
**Decision:** We should likely adopt the CLI/Copy distribution model.

**2. Reference Implementation > Documentation**
In a new field (AX), people don't just need docs; they need to see *how it fits together*.
- shadcn had `Taxonomy` (a real app).
- We need an equivalent **"AX Reference App"** that proves the patterns work.

**3. "AI-Native" Repository**
If our components are distributed as code, user's AI assistants can read them.
- Example: "Hey Claude, modify the `PlanCard` component to show icons."
- This is impossible with a compiled `npm` package.

---

## 4. Technical Anatomy (The Stack)

Based on [Manupa's Anatomy of shadcn/ui](https://manupa.dev/blog/anatomy-of-shadcn-ui), the architecture has 4 distinct layers:

### Layer A: Structure & Behavior (Headless)
- Uses **Radix UI** for complex interactions (Dialog, Popover, Switch).
- Uses **React Hook Form** for form state.
- Uses **Tanstack Table** for data grids.
- **Key Pattern:** Components use `forwardRef` to ensure they work with form libraries and focus management.

### Layer B: Style (Tailwind + CSS Vars)
- **Tailwind** for atomic classes.
- **CSS Variables** (`global.css`) for theming (radius, colors) — allows changing the "brand" without touching component code.
- **`cn` Utility:** A wrapper around `clsx` and `tailwind-merge` to handle class conflicts dynamically.

### Layer C: Variance (CVA)
- Uses **Class Variance Authority (cva)** to define component variants (e.g., `button({ variant: "destructive", size: "sm" })`).
- This decouples "style logic" from "render logic."

### Layer D: Distribution (CLI)
- `registry.json`: The "database" of available components.
- CLI downloads the code + dependencies for the specific component requested.

---

## 5. Architecture Plan (The "AXK" Model)

We should structure the library similarly:
1.  **Headless Logic:** Hook-based state machines (`useAgent`, `useApproval`).
2.  **Styled Shells:** Tailwind/CSS-in-JS versions of the UI (`<AgentPanel />`).
3.  **Registry:** A CLI that pulls the specific styled version you want.

### Key Questions to Solve
- **Updates:** How do we ship security fixes if everyone has a forked copy? (shadcn uses `diff` commands now).
- **Dependencies:** What creates the "headless" layer? (XState? Just React Hooks?)
- **Reference App:** What is our "Taxonomy"? (Maybe a "Research Assistant" app?)

---

## 5. Action Items

1.  **Study shadcn CLI:** Understand how the `registry.json` works.
2.  **Define the "Headless" Layer:** This is what we *might* publish as npm packages (the complex logic), while keeping the UI as copy-paste.
3.  **Plan the Reference App:** Decide what "Taxonomy for Agents" looks like.

---
