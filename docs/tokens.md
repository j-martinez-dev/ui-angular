# Design Tokens

Design tokens are the single source of truth for visual styling across the entire design system. They are CSS custom properties defined in `styles/lib/theme.css` and consumed automatically by Tailwind 4 as utility classes.

---

## Architecture

```
styles/
  index.css              ← entry point (import this in your app)
  lib/
    theme.css            ← base tokens (light mode)
    themes/
      dark.css           ← dark mode overrides (.theme-dark)
      pastel.css         ← pastel theme overrides (.theme-pastel)
    typography.css       ← typography utility classes
    table.css            ← table directive styles
```

### How to use

**In your app's `styles.css`:**
```css
@import "styles/index.css";
```

**In SCSS (component styles):**
```scss
.my-element {
  background: var(--color-surface-raised);
  color: var(--color-text-default);
  border-radius: var(--radius-md);
}
```

**In templates (Tailwind utilities):**
```html
<div class="bg-surface-raised text-text-default rounded-md shadow-md p-4 gap-2">
```

---

## Colors

### Semantic colors

Each semantic color has 3 levels plus a contrast text color:

| Level | Purpose |
|---|---|
| `subtle` | Backgrounds, badges, soft hover states |
| `default` | Main color — buttons, icons, focus borders |
| `emphasis` | Active hover, intense version |
| `on-{color}` | Text on top of `{color}-default` background |

**Available colors:** `primary`, `success`, `warning`, `error`, `info`

```css
var(--color-primary-subtle)
var(--color-primary-default)
var(--color-primary-emphasis)
var(--color-on-primary)
```

### Accent colors

Three accent slots (`accent-1`, `accent-2`, `accent-3`) are empty by default. Each consuming project defines them:

```css
@theme {
  --color-accent-1-subtle: oklch(95% 0.04 330);
  --color-accent-1-default: oklch(60% 0.2 330);
  --color-accent-1-emphasis: oklch(50% 0.2 330);
  --color-on-accent-1: oklch(99% 0 0);
}
```

### Surfaces

Visual depth levels from lowest to highest:

```
surface-sunken  →  surface-base  →  surface-raised  →  surface-overlay
  (inputs)         (page bg)       (cards, panels)    (modals, dropdowns)
```

### Text

```css
var(--color-text-default)    /* primary text */
var(--color-text-muted)      /* secondary, captions */
var(--color-text-disabled)   /* disabled state */
```

### Borders

```css
var(--color-border-default)  /* standard borders */
var(--color-border-strong)   /* high contrast */
```

### Focus

```css
var(--color-focus-ring)      /* all interactive elements use this */
```

Standard focus style:
```scss
outline: 2px solid var(--color-focus-ring);
outline-offset: 2px;
```

### Disabled

```css
var(--opacity-disabled)      /* 0.4 light/pastel, 0.35 dark */
```

---

## Typography

### Font families

```css
var(--font-sans)   /* Plus Jakarta Sans */
var(--font-mono)   /* Fira Code */
```

### Sizes

| Token | Value |
|---|---|
| `--text-xs` | 0.75rem |
| `--text-sm` | 0.875rem |
| `--text-base` | 1rem |
| `--text-lg` | 1.125rem |
| `--text-xl` | 1.25rem |
| `--text-2xl` | 1.5rem |
| `--text-3xl` | 1.875rem |
| `--text-4xl` | 2.25rem |
| `--text-5xl` | 3rem |

### Weights

| Token | Value |
|---|---|
| `--font-weight-normal` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |

### Line heights

| Token | Value | Use |
|---|---|---|
| `--leading-tight` | 1.25 | Headings |
| `--leading-snug` | 1.375 | Compact text |
| `--leading-normal` | 1.5 | Default |
| `--leading-relaxed` | 1.625 | Body text |

### Utility classes

**Headings:** `.ui-h1` through `.ui-h6` (independent of HTML element)

**Body:** `.ui-body-lg`, `.ui-body-md`, `.ui-body-sm`

**Special:** `.ui-caption`, `.ui-overline`, `.ui-code`

**Modifiers:** `.ui-text-muted`, `.ui-text-danger`, `.ui-text-success`

```html
<h2 class="ui-h2">Page Title</h2>
<p class="ui-body-md ui-text-muted">Supporting description</p>
<code class="ui-code">const x = 42;</code>
```

---

## Spacing

Base unit: `--spacing` = 0.25rem (4px)

In SCSS, use `calc()` multiples:

```scss
padding: calc(var(--spacing) * 4);    /* 16px */
gap: calc(var(--spacing) * 2);        /* 8px */
margin: calc(var(--spacing) * 0.5);   /* 2px */
```

In templates, use Tailwind utilities: `p-4`, `gap-2`, `m-0.5`

| Expression | Value |
|---|---|
| `var(--spacing)` | 4px |
| `calc(var(--spacing) * 2)` | 8px |
| `calc(var(--spacing) * 3)` | 12px |
| `calc(var(--spacing) * 4)` | 16px |

---

## Shadows

| Token | Use |
|---|---|
| `--shadow-sm` | Small dropdowns |
| `--shadow-md` | Cards, panels |
| `--shadow-lg` | Modals, drawers |
| `--shadow-xl` | Prominent overlays |

Dark mode shadows have higher opacity to maintain depth perception.

---

## Border radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 0.25rem | Badges, tags |
| `--radius-md` | 0.5rem | Buttons, inputs, cards |
| `--radius-lg` | 1rem | Panels, modals |
| `--radius-full` | 9999px | Pills, avatars |

---

## Icon sizes

| Token | Value | Use |
|---|---|---|
| `--icon-size-xs` | 0.75rem | Status dots |
| `--icon-size-sm` | 1rem | Buttons, forms |
| `--icon-size-md` | 1.25rem | Default standalone |
| `--icon-size-lg` | 1.5rem | Section headers |
| `--icon-size-xl` | 2rem | Hero sections |
| `--icon-size-2xl` | 2.5rem | Decorative |

---

## Avatar sizes

| Token | Value | Use |
|---|---|---|
| `--avatar-size-sm` | 1.5rem | Compact lists |
| `--avatar-size-md` | 2rem | Navigation |
| `--avatar-size-lg` | 2.5rem | Cards, profiles |
| `--avatar-size-xl` | 3rem | Hero, detail views |

---

## Transitions

### Durations

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 100ms | Micro-interactions, toggles |
| `--duration-normal` | 200ms | Hover effects |
| `--duration-slow` | 300ms | Modals, drawers |

### Easings

| Token | Use |
|---|---|
| `--easing-default` | General purpose |
| `--easing-in` | Elements entering (deceleration) |
| `--easing-out` | Elements exiting (acceleration) |

### Guidelines

- Hover and color changes: `--duration-normal` + `--easing-default`
- Micro-interactions: `--duration-fast` + `--easing-default`
- Entry animations: `--duration-slow` + `--easing-out`
- Exit animations: `--duration-slow` + `--easing-in`
- Always include `@media (prefers-reduced-motion: reduce)` to disable animations

---

## Z-index

| Token | Value | Use |
|---|---|---|
| `--z-dropdown` | 100 | Dropdowns, select menus |
| `--z-sticky` | 200 | Sticky headers |
| `--z-overlay` | 300 | Overlays, backdrops |
| `--z-modal` | 400 | Modals, dialogs |
| `--z-toast` | 500 | Toasts (always on top) |

---

## Theming

Three themes available out of the box:

| Theme | Activation | Description |
|---|---|---|
| Light | _(default)_ | Neutral light with blue primary |
| Dark | `.theme-dark` | Dark surfaces, lighter accents |
| Pastel | `.theme-pastel` | Warm cream, lavender primary |

Apply by adding the class to any container:

```html
<html class="theme-dark">
```

Themes can be nested — a `.theme-dark` section inside a `.theme-pastel` page works correctly. Token names are identical across all themes.
