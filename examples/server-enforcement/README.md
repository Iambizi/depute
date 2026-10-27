# Server enforcement example

A Node handler that stores an approval snapshot and checks it when a tool call or a program asks to run. The program text is hashed here. `@depute/core` compares the digest the server passes in. It does not compute one.

The four program checks, and the forged `APPROVE` check, live in `enforce.test.ts`. Run them with `npm run test:core`.

This example is not a sandbox, and it does not simulate an escape. A sandbox the agent can leave is not supervision. The check belongs at dispatch, outside the loop the agent controls. Recording the refusal makes the decision legible and provable. It does not make the action safe, and it does not absorb liability.

Which runtime should host this check (Node, or an isolate/edge runtime) is still open. See the [server enforcement guide](../../apps/www/content/docs/server-enforcement.mdx).
