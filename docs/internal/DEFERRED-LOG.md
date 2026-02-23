# Deferred Items Log

Anything captured in research but not immediately actionable lives here.
Each item has a **trigger** — the milestone that should prompt a review.
Update status as milestones are hit.

---

## Active Deferrals

| Item | File | Trigger | Status |
|---|---|---|---|
| AXK distribution model (shadcn registry, CLI, components.json) | [AXK-DISTRIBUTION-DEEP-DIVE.md](research/AXK-DISTRIBUTION-DEEP-DIVE.md) | ✅ v0 primitives shipped → **Review now** | 🔄 **Feb 22 — Decision overridden: building CLI NOW.** Prior deferral (post-reference-app) revoked. CLI is next deliverable. See Session 11 in SESSION-NOTES. |
| Formal event model + state machine vocabulary | [DELEGATION-ERA-STRATEGY.md](research/strategy/DELEGATION-ERA-STRATEGY.md) | Before building reference app | ⏳ Pending |
| Coinbase Agentic Wallets — payments/scoped auth implications | [COINBASE-AGENTIC-WALLETS.md](research/COINBASE-AGENTIC-WALLETS.md) | v1 ApprovalGate / scoped grants | ⏳ Pending |
| A2UI model — "UI as capability surface" framing | [A2UI-Implications.md](research/architecture-and-protocols/A2UI-Implications.md) | Before writing positioning / README | ⏳ Pending |
| AX Meta Strategy — moat, positioning, defensibility | [AX-META-STRATEGY.md](research/strategy/AX-META-STRATEGY.md) | Before public launch / pitch | ⏳ Pending |
| Stripe Checkout UX insights — approval + trust patterns | [AX-STRIPE-CHECKOUT-INSIGHTS.md](research/case-studies/AX-STRIPE-CHECKOUT-INSIGHTS.md) | Before finalizing ApprovalGate v1 | ⏳ Pending |
| Distribution strategy (shadcn model overview) | [DISTRIBUTION-STRATEGY-SHADCN.md](research/architecture-and-protocols/DISTRIBUTION-STRATEGY-SHADCN.md) | Same as AXK deep-dive above | ✅ Reviewed Feb 19 — confirms registry approach; **Feb 22: CLI deferral overridden — building now.** |
| Skill Layer Opportunity — MCP protocol, skill economy | [SKILL-LAYER-OPPORTUNITY.md](research/architecture-and-protocols/SKILL-LAYER-OPPORTUNITY.md) | Post-V0 Traction / post-Theo outreach | ⏳ Updated Feb 21 — Vercel skills.sh (launched Jan 20, 2026) confirmed as primary distribution target. Anthropic native skills (folder + SKILL.md + YAML frontmatter) is a parallel ecosystem — clarify which to target first. AX skill concept: encode judgment about when to use each primitive. Description field is the critical investment for trigger reliability. |
| Anthropic Skills Guide — packaging, testing, distribution | [ANTHROPIC-SKILLS-GUIDE.md](research/ANTHROPIC-SKILLS-GUIDE.md) | When building the AX skill | ⏳ Pending — full guide retrieved Feb 21. Key: SKILL.md structure, progressive disclosure, trigger testing (over/under), skills.sh vs native Claude skills distinction. Open question: which ecosystem to target first, or sequence both. Full PDF in Claude session context from Feb 21 — re-fetch at trigger time rather than distilling now.|
| Multi-Agent Orchestration UI (Agentic Coding Levels) | [AGENTIC-CODING-LEVELS.md](research/architecture-and-protocols/AGENTIC-CODING-LEVELS.md) | During v1 primitive selection | ⏳ Pending |

---

## Completed Deferrals

| Item | File | Resolved |
|---|---|---|
| AX Book — 12 chapters of agent UX research | [AX-BOOK.md](research/book-notes/AX-BOOK.md) | ✅ Feb 2026 — informed all 6 primitives |
| v0 Catalog — what 6 primitives to build | [CATALOG-v0.md](research/catalog-versions/CATALOG-v0.md) | ✅ Feb 15, 2026 — locked and built |
| AX Primitives starter list | [AX-PRIMITIVES-STARTER.md](research/AX-PRIMITIVES-STARTER.md) | ✅ Feb 15, 2026 — superseded by CATALOG-v0 |
| Claude co-work analysis | [AX-CLAUDE-COWORK-ANALYSIS.md](research/case-studies/AX-CLAUDE-COWORK-ANALYSIS.md) | ✅ Applied to build approach |

---

## How to Use This Log

- **Each session:** Scan the "Active Deferrals" table. If a trigger has been hit, do a quick review before starting the next build phase.
- **When adding a new deferred item:** Add a row with a specific, milestone-based trigger. "Someday" is not a trigger.
- **When a trigger is hit:** Move the row to Completed and link where the insight was applied.