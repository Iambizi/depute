# @depute/core

Framework-free approval model: types, a pure reducer, and a generated JSON Schema. No React, no DOM, and no hashing. Hashes and signatures stay caller-supplied strings.

This package is not published. Whether core is copied by `ax-depute add`, published as `@depute/core`, or both (epic Q1) is still open. The React components do not import it, so the copy-paste CLI keeps working.

Recording a transition here makes the decision legible. It does not make the action safe, and it does not absorb liability. The caller's server decides.

Code Mode sandboxes (a V8 isolate, or another edge runtime) are a live place to run an approved program. The example server in `examples/server-enforcement` stays on Node. Which runtime the example should target (epic Q3) is still open.
