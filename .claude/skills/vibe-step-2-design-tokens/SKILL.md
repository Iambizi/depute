---
name: vibe-step-2-design-tokens
description: Create CSS custom properties for colors, spacing, typography, and animations
disable-model-invocation: true
allowed-tools: Read, Write, Bash(mkdir *)
---

# Step 2: Design Tokens

Create the CSS custom properties token system that all components will consume.

## Prerequisites

Read `docs/vibe-coding/progress.json` and verify:
- `step-1b-init-project` status is `completed`

If not, tell the user to run `/vibe-step-1b-init-project` first.

## Reference Docs

Read this for the complete token specification:
- `docs/vibe-coding/04-design-system.md` — All CSS custom properties, colors, typography, spacing, animations

## Step 1: Create Tokens File

Create `src/styles/tokens.css` containing ALL CSS custom properties from `04-design-system.md`:

1. **Base color palette** (gray, blue, green, red, amber scales)
2. **Semantic status colors** (pending, active, completed, failed, waiting — bg, color, border)
3. **Confidence visualization colors** (high, medium, low)
4. **Typography** (font family, sizes, weights, line heights)
5. **Spacing** scale (space-1 through space-12)
6. **Border radius** (sm, md, lg, xl, full)
7. **Shadows** (sm, md, lg)
8. **Animation tokens** (durations, easings)
9. **Component surface tokens** (backgrounds, borders, text colors)

Include the `@media (prefers-reduced-motion: reduce)` block that zeros out animation durations.

## Step 2: Create Animations File

Create `src/styles/animations.css` containing all `@keyframes` definitions from `04-design-system.md`:

- `ax-pulse` — for active status pulsing
- `ax-spin` — for loading spinners
- `ax-slide-in` — for new step appearance
- `ax-fade-in` — for general reveals
- `ax-scale-pop` — for completion checkmarks

## Step 3: Create Styles Index

Create `src/styles/index.css` that imports both:

```css
@import './tokens.css';
@import './animations.css';
```

## Step 4: Import in Entry Point

Update `src/index.ts` to import the styles so they're included in the bundle:

```typescript
import './styles/index.css';
```

## Step 5: Update Progress

Read `docs/vibe-coding/progress.json`, set `globalSteps.step-2-design-tokens.status` to `"completed"`, set `completedAt` to current ISO timestamp, update `lastUpdated`, write back.

## Exit Criteria

- `src/styles/tokens.css` exists with all CSS custom properties from doc 04
- `src/styles/animations.css` exists with all keyframe definitions
- `src/styles/index.css` imports both files
- `src/index.ts` imports the styles
- All token names use the `--ax-` prefix
- `prefers-reduced-motion` media query included
- Progress updated
- Confirm to user: "Design tokens created. If step 3 is also done, run `/vibe-step-4-component AgentProgressTracker` next."
