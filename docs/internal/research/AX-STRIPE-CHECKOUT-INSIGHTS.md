# Helpful Insights from Stripe’s “Agentic Checkout” (Research Memo)

## Why this doc exists
Stripe is one of the clearest real-world examples of “agent-ready” infrastructure in 2025–2026.

They’re not just adding a chatbox. They’re treating agentic experiences as:
- **protocol + event stream**
- **permissions + approvals**
- **stateful flows that are replayable and auditable**

This memo extracts the most reusable insights from Stripe’s approach and translates them into concrete implications for our AX React component library.

## How to use this doc
This is **research material** meant to inform building later.
It should help us:
- avoid building “prompt-and-pray UI”
- design around **schemas + state machine** as the stable layer
- prioritize primitives that create trust: plan, approvals, diff, trace, permissions

When we start building, this memo becomes a reference for:
- the protocol layer (`@ax/protocol`)
- the run state machine (`@ax/core`)
- the first UI primitives (`@ax/ui`)