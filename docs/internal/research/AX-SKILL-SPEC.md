# AX Skill Architecture Specification

> **Status:** Draft (Planning Phase)

## The Distribution Shift

In v0, the library was built for human developers to download and integrate. 
In v1, we recognize that AI Coding Agents (Claude, Cursor, Copilot) are the primary builders of these Dashboards. Therefore, **AX Components must be packaged as an executable "Skill" that teaches an AI Agent how, when, and why to use the library.**

## Ecosystems

We target two parallel skill ecosystems:
1. **`skills.sh` (Vercel)**: An npm-like registry for AI agents.
2. **Anthropic Native Skills (`.claude/skills/ax-components/SKILL.md`)**: Local workspace abilities for Claude.

Both ecosystems require similar anatomy: a trigger condition, a structural definition, and copy-paste instructions.

---

## The AX Skill Anatomy

### 1. Trigger Definition

The most important part of the Skill is *when* the agent decides to invoke it. The Trigger block must encode our design judgment.

**Trigger Conditions:**
* The user asks to build an "AI Dashboard" or "Agent UI."
* The user needs to integrate an AI agent (e.g., Vercel AI SDK, OpenAI, Anthropic) into a robust interface.
* The user requires a "Human-in-the-Loop" fallback or an "Approval" step.
* The agent's output is probabilistic, streaming, or multi-step, and requires a structured React visualization.

### 2. Progressive Disclosure (The Component Matrix)

The Skill cannot just dump 10 React components into the prompt context at once. It must teach the agent to select the correct primitive based on the user's need.

**Selection Logic (encoded in markdown):**
* **Need:** To show the user a multi-step execution plan? → **Select:** `PlanCard`
* **Need:** To intercept an action for human permission? → **Select:** `ApprovalGate`
* **Need:** To show the internal thoughts or tool calls of an agent? → **Select:** `ToolTrace`
* **Need:** To manage multiple concurrent worker agents? → **Select:** `OrchestratorView` (v1)

### 3. The `AXK` Copy-Paste Pattern

The Skill must instruct the agent *how* to generate the UI code. We use the shadcn/ui "copy-paste" model, adapted for AI consumption.

**Agent Instructions for creating a component:**
1. Fetch the raw `.tsx` code for the selected component from the remote AX repository (or prompt context if bundled).
2. Fetch the corresponding `.module.css` file.
3. Write both files precisely to `src/components/{ComponentName}/`.
4. Do **not** invent wrapper components or alter the `.tsx` logic during installation. Drop the code directly into the user's source tree so they own it.

---

## File Structure for the Skill

To implement this vision, we will structure the root repository to expose these skills natively:

```text
/
├── .claude/
│   └── skills/
│       └── ax-components/
│           └── SKILL.md        <-- the Anthropic-native trigger file
├── skills/
│   └── ax-components/
│       ├── package.json        <-- the skills.sh registry metadata
│       └── index.md            <-- the skills.sh instruction payload
```

## Next Steps

1. **Write actual `SKILL.md` template**: Construct the file using Anthropic's YAML frontmatter standards (Name, Description bounds, Tools allowed).
2. **Draft the Retrieval System**: Determine if the SKILL.md file will embed all 6 component source codes directly (heavy context), or instruct the agent to use `curl`/`fetch` to retrieve the source code files dynamically from GitHub when needed.
