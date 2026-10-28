# Intel report progress

Source: depute Intel Report #1, Oct 26–28, 2026. Supervision has to be legible and provable.

`@depute/core` stays private. The CLI copies the presented types and the receipt module into the user's project.

| ID | Work | Status |
| --- | --- | --- |
| PR0 | Handoff types, `PresentedPayload`, CLI copy as `ax-core.ts` | Merged in #31 |
| R1a | Receipt schema, canonical SHA-256, `verify`, export JSON | In review: https://github.com/Iambizi/depute/pull/32 |
| R1b | App Ed25519 signature on every receipt; passkey on high-stakes approvals | In review: https://github.com/Iambizi/depute/pull/33 |
| R2 | Approval triggers for a new payee, purpose change, and untrusted source | In review: https://github.com/Iambizi/depute/pull/34 |
| R3 | Required why, 100 characters when a payment trigger fired | In review: https://github.com/Iambizi/depute/pull/35 |
| R4 | Budget meter warning for a burst of small auto-approved payments | In review: https://github.com/Iambizi/depute/pull/37 |
| R5 | Log whether the human followed the agent's recommendation | Not started |
| R6 | Payee and amount confirm step a fast biometric cannot skip | Not started |
| R7 | Provenance on the gate and tool trace; untrusted source forces staged mode | Not started |
| R8 | Liability notice on binding approval and the policy banner | Not started |
| R9 | One decision path for React and a chat surface | Not started |
| R10 | Bank-scoped delegation: identity, scopes, expiry, revoke | Not started |

Decided and not reopened: both keys, tiered (R1b); receipts are standalone with an optional `previousReceiptHash`; export JSON from day one; core stays copied, not published.

The public rationale is `apps/www/content/docs/approval-record.mdx` (in review: https://github.com/Iambizi/depute/pull/36). The specification is the pattern. Reports from 26–28 October 2026 are illustrations, dated with the review. An unconfirmed report is not a requirement.

With every later item, in the same change as the code: update that page, the component rationale, and `skills/depute/references/design-rationale.md`. A component page states the pattern and links to the writeup. It does not retell a headline as the reason the control exists.
