const fs = require('fs');
const FILE = 'docs/internal/SESSION-NOTES.md';
let content = fs.readFileSync(FILE, 'utf8');

// Update Session 6 date
content = content.replace('## Session 6 - February 11–14, 2026', '## Session 6 - February 11–18, 2026');

// Find start of unformatted bottom items
const marker = '#### 28. Mock Data Utilities Built (Feb 19)';
// 20 is just a buffer to ensure we find the preceding '---' correctly
const bottomStart = content.lastIndexOf('---', content.indexOf(marker) - 1);

let topPart = content.slice(0, bottomStart).trim() + '\n\n';

const newSessions = `## Session 8 - February 20, 2026

### Overview
Completed all unit tests for v0 primitives.

### Accomplishments

#### 31. Step 7 (Unit Tests) Complete
- ✅ Created comprehensive Vitest test suites for \`ApprovalGate\`, \`ConfidenceMeter\`, \`RunControls\`, \`ToolTrace\`, and \`ArtifactCard\`.
- ✅ Fixed failing tests in \`PlanCard\` related to \`aria-live\` staleness.
- ✅ All 6 components now have fully passing unit tests covering rendering, state matrix, interactions, and a11y properties.
- ✅ \`vitest\` logs 84 out of 84 tests passing. \`progress.json\` step-7-tests tracked as completed.

---

## Session 7 - February 19, 2026

### Overview
Built Mock Data Utilities, reviewed distribution strategy, created Deferred Log, finished Step 6 Stories, and upgraded Node environment.

### Accomplishments

#### 28. Mock Data Utilities Built
- ✅ \`src/utils/mockData.ts\` — generators + simulators for all 6 primitives
  - \`generateMockPlan\` (stepCount, confidence, reasoning options)
  - \`simulatePlanExecution\` — auto-advances steps pending → active → completed with real timing; returns \`cancel()\`
  - \`generateMockApproval\` (mode, scope, metadata, agent reasoning)
  - \`generateRandomConfidence\`
  - \`generateMockToolCalls\` — completed/failed calls with policy flags (15% failure rate)
  - \`simulateToolStream\` — streams running → completed/failed entries for ToolTrace; returns \`cancel()\`
  - \`generateMockArtifact\` — realistic markdown/json/csv/code content
  - \`buildRunMonitoringScenario\` — composite scenario wired to all 6 components at once
  - Label banks: \`MOCK_STEP_LABELS\`, \`MOCK_TOOL_NAMES\`, \`MOCK_APPROVAL_SCENARIOS\`
- ✅ All exports added to \`src/index.ts\`
- ✅ Build verified: \`tsc --noEmit\` ✓, \`vite build\` ✓ (54.74 kB JS, 32 modules)

#### 29. Distribution Review + Registry Fix + Deferred Log
- ✅ Reviewed \`AXK-DISTRIBUTION-DEEP-DIVE.md\` and \`DISTRIBUTION-STRATEGY-SHADCN.md\` (overdue since v0 shipped)
- ✅ Fixed \`registry/registry.json\` — restructured from \`primitives{}\` object to \`items[]\` array (shadcn convention)
  - Added kebab-case \`name\` field, \`type: "primitive"\`, \`registryDependencies: []\` to each item
  - All a11yNotes, stateModel, axPrinciples, requiredTokens preserved
- ✅ Created \`docs/internal/DEFERRED-LOG.md\` — single source of truth for all deferred research, with milestone triggers
- ✅ Captured \`docs/internal/research/DELEGATION-ERA-STRATEGY.md\` — OpenClaw→OpenAI signal analysis
  - Confirms supervision UX direction; identifies event model gap for post-reference-app phase
- ✅ CLI / \`axk.json\` / Block 01 remain deferred to post-reference-app (no premature optimization)

#### 30. Stories Built & Node Upgraded
- ✅ **Step 6 Complete**: Wrote Storybook stories for all 6 v0 primitives.
  - 9 stories per component (3 shared, 3 prototyping, 3 production).
  - Includes live simulation states using \`mockData.ts\` utilities.
  - Re-mapped CSS imports in \`.storybook/preview.ts\` to include AX tokens so rendering matches spec.
- ✅ **TypeScript check**: \`tsc --noEmit\` is clean across the entire \`stories/\` directory.
- ✅ **Environment Upgrade**: Storybook v10 required Node.js 20.19+, so upgraded from \`v20.10.0\` to \`v20.20.0\` via \`nvm\`.
- ✅ Verified \`npm run build-storybook\` successfully builds \`storybook-static\` output.

---

`;

const template = `---

## Session Template (for future sessions)

\`\`\`markdown
## Session X - [Date]

### Overview
Brief summary of what was accomplished

### Accomplishments
- ✅ Item completed
- ⚠️ Item attempted but needs follow-up
- ❌ Item blocked or failed

### Decisions Made
Key technical or strategic decisions

### Next Steps
- [ ] Action items for next session

### Notes
Any important context or observations
\`\`\`
`;

const insertionPoint = topPart.indexOf('## Session 6');

const finalContent = topPart.slice(0, insertionPoint) + newSessions + topPart.slice(insertionPoint) + template;

fs.writeFileSync(FILE, finalContent, 'utf8');
console.log('Restructured SESSION-NOTES.md successfully!');
