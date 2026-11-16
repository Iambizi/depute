# @depute/core

Framework-free approval model: types, a pure reducer, and a generated JSON Schema. No React, no DOM, and no hashing. Hashes and signatures stay caller-supplied strings.

This package is not published. The approval machine stays here. `ax-depute add` copies `src/presented.ts` into the user's project as `types/ax-core.ts` and `src/receipt.ts` as `utils/ax-receipt.ts`. Receipt hashing lives in `receipt.ts`. Host signers attach Ed25519 and passkey signatures. This package does not generate or store keys. `triggers.ts` decides when a payee must be approved again, and when a run of small auto-approved payments should warn without opening a gate. `agreement.ts` measures whether the person followed the agent's recommendation. The host passes the grants, the payments, and the decisions. Publishing the machine (epic Q1) is still open.

Recording a transition here makes the decision legible. It does not make the action safe, and it does not absorb liability. The caller's server decides.

Code Mode sandboxes (a V8 isolate, or another edge runtime) are a live place to run an approved program. Dispatch checks for that program live in `src/machine.ts`. `test/machine.test.ts` covers them. This package compares a caller-supplied program hash and does not run the program. There is no example server in this repo. Which runtime an example should target (epic Q3) is still open.
