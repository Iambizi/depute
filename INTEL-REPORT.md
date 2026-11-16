# Intel report progress

Source: depute Intel Report #1, Oct 26–28, 2026. Supervision has to be legible and provable.

`@depute/core` stays private. The CLI copies the presented types and the receipt module into the user's project.

| ID | Work | Status |
| --- | --- | --- |
| PR0 | Handoff types, `PresentedPayload`, CLI copy as `ax-core.ts` | Merged in https://github.com/Iambizi/depute/pull/31 |
| R1a | Receipt schema, canonical SHA-256, `verify`, export JSON | Merged in https://github.com/Iambizi/depute/pull/32 |
| R1b | App Ed25519 signature on every receipt; passkey on high-stakes approvals | Landed on main in https://github.com/Iambizi/depute/pull/42. First merged only into its parent in https://github.com/Iambizi/depute/pull/33 |
| R2 | Approval triggers for a new payee, purpose change, and an untrusted source | Landed on main in https://github.com/Iambizi/depute/pull/42. First merged only into its parent in https://github.com/Iambizi/depute/pull/34 |
| R3 | Required why, 100 characters when a payment trigger fired | Landed on main in https://github.com/Iambizi/depute/pull/42. First merged only into its parent in https://github.com/Iambizi/depute/pull/35 |
| R4 | Budget meter warning for a burst of small auto-approved payments | Landed on main in https://github.com/Iambizi/depute/pull/42. First merged only into its parent in https://github.com/Iambizi/depute/pull/37 |
| R5 | Log whether the human followed the agent's recommendation | Landed on main in https://github.com/Iambizi/depute/pull/42. First merged only into its parent in https://github.com/Iambizi/depute/pull/38 |
| R6 | Payee and amount confirm step a fast biometric cannot skip | Landed on main in https://github.com/Iambizi/depute/pull/42. First merged only into its parent in https://github.com/Iambizi/depute/pull/39 |
| R7 | Provenance on the gate and tool trace; untrusted source forces staged mode | Landed on main in https://github.com/Iambizi/depute/pull/42. First merged only into its parent in https://github.com/Iambizi/depute/pull/40 |
| R8 | Liability notice on binding approval and the policy banner | Landed on main in https://github.com/Iambizi/depute/pull/42. First merged only into its parent in https://github.com/Iambizi/depute/pull/41 |
| R9 | One decision path for React and a chat surface | Not started. The channel rule landed in https://github.com/Iambizi/depute/pull/49. There is still no shared decision path for a chat surface. |
| R10 | Bank-scoped delegation: identity, scopes, expiry, revoke | Landed on main in https://github.com/Iambizi/depute/pull/55. Capability Matrix lists host-declared agent, scope, limit, expiry, and last use. Revoke receipt landed in https://github.com/Iambizi/depute/pull/58. No new component. depute does not check the grant. |
| R11 | Bind an approval to the exact presented payload, once | Landed on main in https://github.com/Iambizi/depute/pull/59. `executionMatches` voids a different payload. `approvalUsable` refuses a passed display deadline and a second use when the host passes `consumed: true`. That flag is declared. The signed receipt is not rewritten. |
| R13 | Show when automation silently stopped | Landed on main in https://github.com/Iambizi/depute/pull/49. First merged only into its parent in https://github.com/Iambizi/depute/pull/47. Warning on Tool Trace. |
| R14 | Later payment states as new receipts | Landed on main in https://github.com/Iambizi/depute/pull/57 (`held`, `voided`, `refunded`). First merged only into its parent in https://github.com/Iambizi/depute/pull/54. `unknown` landed in https://github.com/Iambizi/depute/pull/61. A signed receipt is not rewritten. |
| R15 | Classify approval channels by whether the agent can read them | Landed on main in https://github.com/Iambizi/depute/pull/49. First merged only into its parent in https://github.com/Iambizi/depute/pull/44. Integrator-declared only. No hardware attestation. |
| R16 | Mark limit or permission changes the agent asked for | Landed on main in https://github.com/Iambizi/depute/pull/49. First merged only into its parent in https://github.com/Iambizi/depute/pull/43. No cooling period and no allow-or-deny switch. |
| R17 | Say who enforces each limit | Landed on main in https://github.com/Iambizi/depute/pull/49. First merged only into its parent in https://github.com/Iambizi/depute/pull/45. Declared only. |
| R19 | Hash of the terms the person was shown | Landed on main in https://github.com/Iambizi/depute/pull/57. First merged only into its parent in https://github.com/Iambizi/depute/pull/53. Stores `textHash`, `sourceUrl`, `version`, and `shownAt`. The integrator keeps the full text. |
| R20 | Show when an agent acts under the person's own credentials | Landed on main in https://github.com/Iambizi/depute/pull/49. First merged only into its parent in https://github.com/Iambizi/depute/pull/46. Warning on the gate. This warning has no delegation list. |
| R21 | Custody | Open. Not implemented. |
| R22 | Oversight profile from settings depute already has | Landed on main in https://github.com/Iambizi/depute/pull/64. `describeOversight` returns depute labels. The receipt can store that profile. It is not a compliance claim. |
| R23 | Surface what the agent assumed | Landed on main in https://github.com/Iambizi/depute/pull/49. First merged only into its parent in https://github.com/Iambizi/depute/pull/48. Acknowledgement on Approval Gate. |
| R24 | Host-confirmed revoke receipt | Landed on main in https://github.com/Iambizi/depute/pull/58. "Revoked" is shown only after the host confirms. Notice to the counterparty is a later receipt. |
| R25 | Standing autonomy choice as its own receipt | Landed on main in https://github.com/Iambizi/depute/pull/62. `kind: "mandate"`. Nothing is preselected. `confirm-none` only when the host opts in. No cooling period. |
| R26 | Which standing approval covered an action | Landed on main in https://github.com/Iambizi/depute/pull/63. `authorizedBy` stores the mandate hash, the criteria the host says matched, and the check time. Decision Record does not say "approved by you". Both the hash link and the criteria are declared. |
| R27 | What a stop left pending, final, or unknown | Landed on main in https://github.com/Iambizi/depute/pull/61. The stop receipt can list `pending`, `completedFinal`, and `mayHaveRun`. "May have run" is not shown as cancelled. A payment whose outcome is unknown is a later receipt with `payment.state` of `unknown`. |
| R28 | Counterparty policy on the gate | Landed on main in https://github.com/Iambizi/depute/pull/65. `prohibits-agents` shows the declared prohibition sentence. Other stances do not. depute does not check the merchant's rule. |

Decided and not reopened: both keys, tiered (R1b); receipts are standalone with an optional `previousReceiptHash`; export JSON from day one; core stays copied, not published. A cooling period is not part of the limit-change control (https://github.com/Iambizi/depute/pull/49) or the mandate receipt (https://github.com/Iambizi/depute/pull/62). The receipt stores a hash of the terms, not the full text (https://github.com/Iambizi/depute/pull/57).

The public rationale is `apps/www/content/docs/approval-record.mdx` (first opened in https://github.com/Iambizi/depute/pull/36, now restacked onto main). The specification is the pattern. Reports from 26–28 October 2026 are illustrations, dated with the review. An unconfirmed report is not a requirement.

Reports #2 and #3 (30 October and 6 November 2026) and Report #4 are in the table where the code on main does the work.

These closed without a new id:

- Passkey verification rejects an assertion whose user-verified flag is unset, and still rejects one that was not user-present. The flag is not copied into the receipt hash. Landed in https://github.com/Iambizi/depute/pull/51.
- The receipt stores `issuedAt` and `expiresAt`. The default display deadline is 10 minutes. The gate shows the countdown and Expired. The backend still enforces the deadline. Landed in https://github.com/Iambizi/depute/pull/52.
- Emergency stop sits on Escalation Router. Stopped is shown only after the host confirms. Otherwise the label is Unknown. Stop does not use a passkey. Resume does, and it is high-stakes. The stop receipt sets `kind` to `stop`. Landed on main in https://github.com/Iambizi/depute/pull/57. First merged only into its parent in https://github.com/Iambizi/depute/pull/56. What the stop left behind is R27.

Still open: R9, R21 custody, an isolated approval window, and an integration demo. `@depute/core` stays unpublished (epic Q1). The example sandbox runtime stays open (epic Q3). There is no example server in this repo. Program dispatch checks live in `@depute/core`.

With every later item, in the same change as the code: update that page, the component rationale, and `skills/depute/references/design-rationale.md`. A component page states the pattern and links to the writeup. It does not retell a headline as the reason the control exists.
