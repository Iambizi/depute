# Intel report progress

Source: depute Intel Report #1, Oct 26–28, 2026. Supervision has to be legible and provable.

`@depute/core` stays private. The CLI copies the presented types and the receipt module into the user's project.

| ID | Work | Status |
| --- | --- | --- |
| PR0 | Handoff types, `PresentedPayload`, CLI copy as `ax-core.ts` | Merged in #31 |
| R1a | Receipt schema, canonical SHA-256, `verify`, export JSON | Merged in https://github.com/Iambizi/depute/pull/32 |
| R1b | App Ed25519 signature on every receipt; passkey on high-stakes approvals | Restacked onto main. First merged only into its parent in https://github.com/Iambizi/depute/pull/33 |
| R2 | Approval triggers for a new payee, purpose change, and an untrusted source | Restacked onto main. First merged only into its parent in https://github.com/Iambizi/depute/pull/34 |
| R3 | Required why, 100 characters when a payment trigger fired | Restacked onto main. First merged only into its parent in https://github.com/Iambizi/depute/pull/35 |
| R4 | Budget meter warning for a burst of small auto-approved payments | Restacked onto main. First merged only into its parent in https://github.com/Iambizi/depute/pull/37 |
| R5 | Log whether the human followed the agent's recommendation | Restacked onto main. First merged only into its parent in https://github.com/Iambizi/depute/pull/38 |
| R6 | Payee and amount confirm step a fast biometric cannot skip | Restacked onto main. First merged only into its parent in https://github.com/Iambizi/depute/pull/39 |
| R7 | Provenance on the gate and tool trace; untrusted source forces staged mode | Restacked onto main. First merged only into its parent in https://github.com/Iambizi/depute/pull/40 |
| R8 | Liability notice on binding approval and the policy banner | Restacked onto main. First merged only into its parent in https://github.com/Iambizi/depute/pull/41 |
| R9 | One decision path for React and a chat surface | Not started. Waits on the channel rule. |
| R10 | Bank-scoped delegation: identity, scopes, expiry, revoke | Not started. Component shape is still open. |
| R15 | Classify approval channels by whether the agent can read them | Recorded. Integrator-declared only. No hardware attestation. |
| R16 | Mark limit or permission changes the agent asked for | Recorded. No cooling period and no allow-or-deny switch. |
| R17 | Say who enforces each limit | In this change. Declared only. |

Decided and not reopened: both keys, tiered (R1b); receipts are standalone with an optional `previousReceiptHash`; export JSON from day one; core stays copied, not published.

The public rationale is `apps/www/content/docs/approval-record.mdx` (first opened in https://github.com/Iambizi/depute/pull/36, now restacked onto main). The specification is the pattern. Reports from 26–28 October 2026 are illustrations, dated with the review. An unconfirmed report is not a requirement.

Reports #2 and #3 (30 October and 6 November 2026) follow this restack. Expiry default, user-verification as a requirement, an isolated approval window, the delegation view shape, the payment-state append model, cooling periods, emergency-stop shape, supervisory vocabulary, and full terms storage stay open. `@depute/core` stays unpublished (epic Q1). The example sandbox runtime stays open (epic Q3).

With every later item, in the same change as the code: update that page, the component rationale, and `skills/depute/references/design-rationale.md`. A component page states the pattern and links to the writeup. It does not retell a headline as the reason the control exists.
