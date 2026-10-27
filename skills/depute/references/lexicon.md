# depute lexicon

Canonical wording for the terms depute uses. These sentences match `https://depute.dev/docs/lexicon` (`apps/www/content/docs/lexicon.mdx`). Quote them; do not paraphrase them.

depute documents this vocabulary. It does not claim to have invented the underlying research. Origin tags stay attached to their terms.

Components are UI and callbacks. Enforcement is the caller's backend.

Where that check runs, including a program that dispatches tools from a sandbox, is the server enforcement guide (`apps/www/content/docs/server-enforcement.mdx`).

## Frame

### Delegation UI

Software UI has gone through two eras. **Command Line:** you told the machine what to do, step by step. **Navigation:** you drove software through menus, flows, and screens. That paradigm held for thirty years — and it's the one that's dying.

**Delegation UI** is the third era. You describe an outcome and an agent pursues it. The interface is no longer a vehicle you drive — it's a cockpit you monitor. You're setting intent, reviewing decisions, and maintaining oversight.

Also described as: third era, cockpit you monitor, supervise instead of operate.

Origin: published in the depute README as the project's frame for this interface era.

### Agentic Experience

**Depute** is a React component library for Agentic Experience (AX) design — purpose-built UI primitives for AI agent supervision and human oversight.

Origin: Tabah & Landon, *AX: The Rise of Agentic Experience* (LCA). Chapter mappings used elsewhere in depute — Ch. 9, Ch. 12, and Pattern 6 ("Generative Momentum") — are pending confirmation against the physical copy.

### depute

*Depute (verb meaning to appoint or delegate).*

## Failures

### Automation Bias

Users blindly rubber-stamp agent actions without scrutiny.

Also described as: rubber-stamping, click-through approvals, passive oversight.

Origin: Mosier & Skitka (1996); Parasuraman & Manzey (2010). Mosier, K. L., & Skitka, L. J. (1996). Human decision makers and automated decision aids: Made for each other? In R. Parasuraman & M. Mouloua (Eds.), *Automation and Human Performance: Theory and Applications*. Lawrence Erlbaum. Parasuraman, R., & Manzey, D. H. (2010). Complacency and bias in human use of automation: An attentional integration. *Human Factors, 52*(3), 381–410.

Answered by Automation Bias Alert and Confidence Meter.

### Execution Amnesia

Users lose track of the total "blast radius" of a massive agent session. When working with AI IDEs or multi-agent swarms, humans "fire and forget". After 10 prompts, humans suffer from Execution Amnesia—they no longer know what files were created, what systems were mutated, or what environment variables were exposed.

Also described as: lost track of what the agent did, fire and forget, blast radius.

Origin: wording published in the depute docs. No earlier paper is cited for this phrase here.

Answered by Session Overview and State Diff.

### Responsibility Diffusion

Users approve actions assuming the machine is accountable. In enterprise and high-compliance environments, "Responsibility Diffusion" happens when humans blindly click approve because they aren't explicitly reminded that their identity is being audited.

Also described as: diffusion of responsibility, who approved, the machine is accountable.

Origin: lineage of Darley & Latané (1968). Darley, J. M., & Latané, B. (1968). Bystander intervention in emergencies: Diffusion of responsibility. *Journal of Personality and Social Psychology, 8*(4), 377–383. That paper is about bystander intervention. The depute docs apply the lineage to a person approving an agent action while assuming the machine is accountable.

Answered by Decision Record and Binding Approval.

### Cascading Failures

An agentic error pollutes downstream autonomous systems rapidly.

Also described as: downstream autonomous systems, error pollutes downstream.

Origin: sentence published on the depute introduction, under systemic threats targeted by frameworks such as the Singapore IMDA Model AI Governance Framework for Agentic AI (January 2026).

Answered by Swarm Monitor and Orchestrator View.

### Hallucinated Planning

An agent proposes a destructive or nonsensical sequence of tools.

Also described as: destructive plan, nonsensical sequence of tools.

Origin: sentence published on the depute introduction, under systemic threats targeted by frameworks such as the Singapore IMDA Model AI Governance Framework for Agentic AI (January 2026).

Answered by Plan Card and Confidence Meter.

### Rogue Tool Use

An agent attempts an irreversible action out-of-bounds.

Also described as: irreversible action, out-of-bounds tool call.

Origin: sentence published on the depute introduction, under systemic threats targeted by frameworks such as the Singapore IMDA Model AI Governance Framework for Agentic AI (January 2026).

Answered by Approval Gate and Tool Trace.

### Unpredictable Outcomes

A run completes with thousands of opaque, unlogged side effects.

Also described as: opaque side effects, unlogged side effects.

Origin: sentence published on the depute introduction, under systemic threats targeted by frameworks such as the Singapore IMDA Model AI Governance Framework for Agentic AI (January 2026).

Answered by State Diff and Session Overview.

## Patterns

### Audit Triad

`DecisionRecord` is one of three audit-layer components. Each captures a different moment in the accountability chain:

| Component | Scope | Records | Question it answers |
|-----------|-------|---------|---------------------|
| Decision Record | Per-approval | Who approved, why, and under what policy | "Who authorized this?" |
| Transaction Receipt | Per-action | What the machine did, with verification hash | "What actually happened?" |
| Session Overview | Per-session | Semantic rollup of everything the agent touched | "What was the total blast radius?" |

Use all three together for full audit coverage: `DecisionRecord` captures the human side, `TransactionReceipt` captures the machine side, and `SessionOverview` captures the session-level summary.

### Decision Record

Immutable visual receipt of a human approval decision to counteract Responsibility Diffusion. Scope: per-approval. Records who approved, why, and under what policy. Question it answers: "Who authorized this?"

It is an immutable *visual* receipt. It displays the decision. Enforcement is the caller's backend.

A program receipt — the program, its bindings, and the effects that were actually dispatched — is specified in the server enforcement guide (`apps/www/content/docs/server-enforcement.mdx`).

### Who approved

Plain-language form of the Decision Record question: who approved, why, and under what policy. The record's own question is "Who authorized this?" See Responsibility Diffusion.

### Transaction Receipt

Per-action record of what the machine did, with a verification hash. Question it answers: "What actually happened?"

`Transaction Receipt` is the audit-log component. After an irreversible action passes a gate, the supervisor needs a record of the outcome. A hash or signature shown here is supplied by your backend. The component does not create one. `TransactionReceipt` displays the `hash` and `signature` you pass in. It does not compute them.

### Session Overview

Semantic rollup of a high-velocity agent session to prevent execution amnesia and cognitive load. Scope: per-session. Records a semantic rollup of everything the agent touched. Question it answers: "What was the total blast radius?"

### Binding Approval

`BindingApproval` does not sign, hash, or talk to a ledger. Pass `signature` and `hash` when your backend has already produced them, and pass `onVerify` if the app should check that proof. The component only displays those values.

The failure it sits under is Responsibility Diffusion.

### Scoped grant

Approvals are scoped grants, not binary yes/no decisions. A user approving "send emails" shouldn't be approving "send unlimited emails forever."

A scoped grant is scoped to a specific target, resource-bounded, time-bounded, and revocable at any time.

Origin: Stripe SPT (Shared Payment Token), as credited in the depute design rationale.

Answered by Approval Gate.

### Staged approval

Preview → Confirm → Execute. Stripe validates at multiple points in a transaction flow, not just once. `mode="staged"` lets `ApprovalGate` function as a multi-step gate rather than a single popup.

Origin: Stripe's Authorization Chain pattern, as credited in the depute design rationale.

Answered by Approval Gate.

### Provenance

The agent's "receipt" of work completed. It renders the final output alongside crucial provenance data: precisely which plan step and tool calls generated it.

Origin: Stripe's audit trail and Coinbase's receipts pattern, as credited in the depute design rationale. Once agents act autonomously, auditability becomes the trust backbone.

Answered by Artifact Card.

### Plan-first

Show the trajectory, then execute. `PlanCard` shows the plan before execution, not after.

Origin: Claude Cowork (Anthropic), as credited in the depute design rationale. Cowork calls this "Generative Momentum" (AX Book Pattern 6). That chapter mapping is pending confirmation against the physical copy.

Answered by Plan Card.

### Mandate

`ApprovalGate` approves an **action**. `DelegationGate` approves the **creation of an autonomous entity**.

Coinbase's "Mandate + Guardrails" pattern (set a budget, define constraints, then authorize) maps directly to `DelegationGate`. You're not just saying yes — you're issuing a mandate with guardrails.

Origin: Coinbase Agentic Wallets, as credited in the depute design rationale.

Answered by Delegation Gate.

## System terms

### Blast radius

The total "blast radius" of a massive agent session is what users lose track of under Execution Amnesia: what files were created, what systems were mutated, or what environment variables were exposed. The per-session question in the Audit Triad is "What was the total blast radius?"

### Live fire

`Policy Banner` is a persistent boundary indicator. It visually anchors the agent's current operating policy, ensuring the human operator strictly understands whether they are supervising a simulation, navigating staging environments, or engaging in a live fire production exercise.

Also described as: live fire mistakes, production rather than sandbox.

Answered by Policy Banner.

### Budget

Visual gauge showing session budget vs. burn rate. Delegation requires guardrails. Instead of blocking every action, `Budget Meter` allows users to grant agents an explicit budget (API tokens, currency, or API call limits) and tracks the real-time burn rate.

Also described as: burn rate, session budget, unbounded API budget.

Answered by Budget Meter.

### Capability

`Capability Matrix` is the "Agent Handshake." As products explicitly declare their tools to agents via frameworks like WebMCP, humans need to see that exact programmatic contract. This component visualizes what an agent is capable of doing in the current specific operating context.

Also described as: agent handshake, permissions the agent holds.

Answered by Capability Matrix.

### Human-in-the-loop

When deploying Agentic AI into production, "human-in-the-loop" is no longer a sufficient framing. The levels below are the classification the docs use instead.

Origin: the depute governance page, citing the Singapore IMDA Model AI Governance Framework for Agentic AI (January 2026).

### L1 Human-Led

**Agent proposes, human operates.** The agent acts exclusively as an advisor. It generates data, intelligence, or suggestions, but the human must manually execute the final action in their own tooling.

Origin: Singapore IMDA Model AI Governance Framework for Agentic AI (January 2026), as mapped on the governance levels page. depute supplies the UI named below. It did not author the L1–L4 framework.

Answered by Artifact Card and Tool Trace.

### L2 Collaborative

**Agent and human work together.** The agent can draft actions and stage tools, but requires active back-and-forth guidance and synchronous alignment.

Origin: Singapore IMDA Model AI Governance Framework for Agentic AI (January 2026), as mapped on the governance levels page.

Answered by Delegation Gate and State Diff.

### L3 Supervised

**Agent operates, human approves.** The most critical boundary for high-stakes deployments. The agent can run end-to-end, and an irreversible action waits for an explicit human confirmation. The UI displays that confirmation. Your backend records it.

Origin: Singapore IMDA Model AI Governance Framework for Agentic AI (January 2026), as mapped on the governance levels page.

Answered by Approval Gate, Automation Bias Alert, and Decision Record.

### L4 Autonomous

**Agent operates, human observes.** The agent runs asynchronously in the background across prolonged periods. The risk shifts from "preventing a single bad action" to "detecting cascading failures" across a massive, opaque blast radius.

Origin: Singapore IMDA Model AI Governance Framework for Agentic AI (January 2026), as mapped on the governance levels page.

Answered by Run Controls, Session Overview, Orchestrator View, and Swarm Monitor.

### Primitive

A foundational, single-responsibility building block (e.g., `PlanCard`, `ApprovalGate`).

### View

A compositional surface that aggregates multiple primitives into a larger macro-interface (e.g., `OrchestratorView`, `SwarmInbox`).

### Control

An operational or forensic surface used to halt, direct, or audit execution (e.g., `EscalationRouter`, `DecisionRecord`).

### Pattern

A highly specialized workflow wrapper designed to enforce a specific behavioral policy (e.g., `AutomationBiasAlert`, `HandoffProtocol`).

The four classes above are the docs taxonomy. They are copied from the introduction page.
