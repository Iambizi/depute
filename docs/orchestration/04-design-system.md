# 04 - Design System

## CSS Custom Properties

All design tokens are defined as CSS custom properties on `:root` and consumed by component CSS Modules.

## Color Tokens

### Base Palette

```css
:root {
  /* Neutrals */
  --ax-color-gray-50: #f9fafb;
  --ax-color-gray-100: #f3f4f6;
  --ax-color-gray-200: #e5e7eb;
  --ax-color-gray-300: #d1d5db;
  --ax-color-gray-400: #9ca3af;
  --ax-color-gray-500: #6b7280;
  --ax-color-gray-600: #4b5563;
  --ax-color-gray-700: #374151;
  --ax-color-gray-800: #1f2937;
  --ax-color-gray-900: #111827;

  /* Blue (Active / In Progress) */
  --ax-color-blue-50: #eff6ff;
  --ax-color-blue-100: #dbeafe;
  --ax-color-blue-500: #3b82f6;
  --ax-color-blue-600: #2563eb;
  --ax-color-blue-700: #1d4ed8;

  /* Green (Success / Completed) */
  --ax-color-green-50: #f0fdf4;
  --ax-color-green-100: #dcfce7;
  --ax-color-green-500: #22c55e;
  --ax-color-green-600: #16a34a;
  --ax-color-green-700: #15803d;

  /* Red (Error / Failed) */
  --ax-color-red-50: #fef2f2;
  --ax-color-red-100: #fee2e2;
  --ax-color-red-500: #ef4444;
  --ax-color-red-600: #dc2626;
  --ax-color-red-700: #b91c1c;

  /* Amber (Warning / Waiting) */
  --ax-color-amber-50: #fffbeb;
  --ax-color-amber-100: #fef3c7;
  --ax-color-amber-500: #f59e0b;
  --ax-color-amber-600: #d97706;
  --ax-color-amber-700: #b45309;
}
```

### Semantic Status Colors

```css
:root {
  /* Status backgrounds */
  --ax-status-pending-bg: var(--ax-color-gray-100);
  --ax-status-pending-color: var(--ax-color-gray-500);
  --ax-status-pending-border: var(--ax-color-gray-300);

  --ax-status-active-bg: var(--ax-color-blue-50);
  --ax-status-active-color: var(--ax-color-blue-600);
  --ax-status-active-border: var(--ax-color-blue-500);

  --ax-status-completed-bg: var(--ax-color-green-50);
  --ax-status-completed-color: var(--ax-color-green-600);
  --ax-status-completed-border: var(--ax-color-green-500);

  --ax-status-failed-bg: var(--ax-color-red-50);
  --ax-status-failed-color: var(--ax-color-red-600);
  --ax-status-failed-border: var(--ax-color-red-500);

  --ax-status-waiting-bg: var(--ax-color-amber-50);
  --ax-status-waiting-color: var(--ax-color-amber-600);
  --ax-status-waiting-border: var(--ax-color-amber-500);
}
```

### Confidence Visualization Colors

```css
:root {
  /* Confidence levels */
  --ax-confidence-high-color: var(--ax-color-green-600);
  --ax-confidence-high-bg: var(--ax-color-green-50);

  --ax-confidence-medium-color: var(--ax-color-amber-600);
  --ax-confidence-medium-bg: var(--ax-color-amber-50);

  --ax-confidence-low-color: var(--ax-color-red-600);
  --ax-confidence-low-bg: var(--ax-color-red-50);
}
```

## Typography

```css
:root {
  /* Font family */
  --ax-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, sans-serif;
  --ax-font-family-mono: 'SF Mono', SFMono-Regular, ui-monospace,
    'DejaVu Sans Mono', Menlo, Consolas, monospace;

  /* Font sizes */
  --ax-font-size-xs: 0.75rem;    /* 12px */
  --ax-font-size-sm: 0.875rem;   /* 14px */
  --ax-font-size-base: 1rem;     /* 16px */
  --ax-font-size-lg: 1.125rem;   /* 18px */
  --ax-font-size-xl: 1.25rem;    /* 20px */

  /* Font weights */
  --ax-font-weight-normal: 400;
  --ax-font-weight-medium: 500;
  --ax-font-weight-semibold: 600;
  --ax-font-weight-bold: 700;

  /* Line heights */
  --ax-line-height-tight: 1.25;
  --ax-line-height-normal: 1.5;
  --ax-line-height-relaxed: 1.75;
}
```

## Spacing

```css
:root {
  --ax-space-1: 0.25rem;   /* 4px */
  --ax-space-2: 0.5rem;    /* 8px */
  --ax-space-3: 0.75rem;   /* 12px */
  --ax-space-4: 1rem;      /* 16px */
  --ax-space-5: 1.25rem;   /* 20px */
  --ax-space-6: 1.5rem;    /* 24px */
  --ax-space-8: 2rem;      /* 32px */
  --ax-space-10: 2.5rem;   /* 40px */
  --ax-space-12: 3rem;     /* 48px */
}
```

## Border Radius

```css
:root {
  --ax-radius-sm: 0.25rem;   /* 4px */
  --ax-radius-md: 0.375rem;  /* 6px */
  --ax-radius-lg: 0.5rem;    /* 8px */
  --ax-radius-xl: 0.75rem;   /* 12px */
  --ax-radius-full: 9999px;  /* Pill shape */
}
```

## Shadows

```css
:root {
  --ax-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --ax-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --ax-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

## Animation Tokens

```css
:root {
  /* Durations */
  --ax-duration-fast: 150ms;
  --ax-duration-normal: 300ms;
  --ax-duration-slow: 500ms;
  --ax-duration-pulse: 1500ms;

  /* Easings */
  --ax-ease-default: ease-in-out;
  --ax-ease-in: ease-in;
  --ax-ease-out: ease-out;
  --ax-ease-linear: linear;
}

/* Prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  :root {
    --ax-duration-fast: 0ms;
    --ax-duration-normal: 0ms;
    --ax-duration-slow: 0ms;
    --ax-duration-pulse: 0ms;
  }
}
```

## Keyframe Animations

```css
/* Pulse animation for active states */
@keyframes ax-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Spin animation for loading indicators */
@keyframes ax-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Slide in from left for new steps */
@keyframes ax-slide-in {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Fade in */
@keyframes ax-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Scale pop for completion checkmarks */
@keyframes ax-scale-pop {
  0% { transform: scale(0); }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
```

## Confidence Bar Gradient

The confidence score maps to a gradient from red (0%) through amber (50%) to green (100%):

```css
.confidenceBar {
  background: linear-gradient(
    to right,
    var(--ax-color-red-500) 0%,
    var(--ax-color-amber-500) 50%,
    var(--ax-color-green-500) 100%
  );
}
```

For discrete confidence levels:

| Range | Level | Color Token |
|-------|-------|-------------|
| 0-39% | Low | `--ax-confidence-low-color` |
| 40-79% | Medium | `--ax-confidence-medium-color` |
| 80-100% | High | `--ax-confidence-high-color` |

## Component Surface Tokens

```css
:root {
  /* Component backgrounds */
  --ax-surface-primary: #ffffff;
  --ax-surface-secondary: var(--ax-color-gray-50);
  --ax-surface-elevated: #ffffff;

  /* Borders */
  --ax-border-color: var(--ax-color-gray-200);
  --ax-border-width: 1px;

  /* Text */
  --ax-text-primary: var(--ax-color-gray-900);
  --ax-text-secondary: var(--ax-color-gray-600);
  --ax-text-tertiary: var(--ax-color-gray-400);
  --ax-text-inverse: #ffffff;
}
```

## Usage in CSS Modules

Components consume tokens via CSS custom properties:

```css
/* PlanCard.module.css */
.tracker {
  font-family: var(--ax-font-family);
  border: var(--ax-border-width) solid var(--ax-border-color);
  border-radius: var(--ax-radius-lg);
  background: var(--ax-surface-primary);
  padding: var(--ax-space-4);
}

.stepActive {
  background: var(--ax-status-active-bg);
  border-left: 3px solid var(--ax-status-active-border);
  color: var(--ax-status-active-color);
}
```

## Customization

Users can override any token at the application level:

```css
/* Override in consuming app */
:root {
  --ax-color-blue-500: #6366f1; /* Use indigo instead of blue */
  --ax-font-family: 'Inter', sans-serif;
  --ax-radius-lg: 1rem; /* Rounder corners */
}
```
