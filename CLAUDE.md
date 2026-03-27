# Design System — Token Documentation

This document describes the design system token system and how to use them correctly when implementing components or consuming the library.

---

## Token system architecture

Tokens live in `styles/` and are structured as follows:

- `lib/theme.css` — base tokens (light mode)
- `lib/themes/dark.css` — overrides for dark mode (`.theme-dark`)
- `lib/themes/pastel.css` — overrides for pastel theme (`.theme-pastel`)
- `lib/typography.css` — typography utility classes

The entry point is `styles/index.css`, which imports all files in order.

All tokens are **CSS custom properties** defined inside Tailwind 4's `@theme`, which means Tailwind consumes them automatically and exposes them as utilities.

---

## How to consume tokens

### In an Angular project within the monorepo

Add the following to the consuming project's `styles.css`:

```css
@import "styles/index.css";
```

### In a component with SCSS

Reference tokens directly as CSS custom properties:

```scss
.my-component {
  background-color: var(--color-surface-raised);
  color: var(--color-text-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

### In a component with Tailwind classes

Tailwind 4 exposes tokens automatically as utilities:

```html
<div class="bg-surface-raised text-text-default rounded-md shadow-md">
  ...
</div>
```

---

## Color tokens

### Semantic scale

Each color has **3 levels** plus a text color to use on top of it:

| Level | Usage |
|---|---|
| `subtle` | Backgrounds, badges, alerts, soft hover states |
| `default` | The main color — buttons, icons, focus borders |
| `emphasis` | Active hover states, more intense version of the color |
| `on-{color}` | Text color when the background is `{color}-default` |

### Available colors

#### Primary
```css
var(--color-primary-subtle)    /* Soft primary background */
var(--color-primary-default)   /* Main color */
var(--color-primary-emphasis)  /* Hover / active */
var(--color-on-primary)        /* Text on top of primary-default */
```

#### Success
```css
var(--color-success-subtle)
var(--color-success-default)
var(--color-success-emphasis)
var(--color-on-success)
```

#### Warning
```css
var(--color-warning-subtle)
var(--color-warning-default)
var(--color-warning-emphasis)
var(--color-on-warning)        /* Dark — warning is a light color */
```

#### Error
```css
var(--color-error-subtle)
var(--color-error-default)
var(--color-error-emphasis)
var(--color-on-error)
```

#### Info
```css
var(--color-info-subtle)
var(--color-info-default)
var(--color-info-emphasis)
var(--color-on-info)
```

#### Accents (defined by the consuming project)
```css
var(--color-accent-1-subtle)
var(--color-accent-1-default)
var(--color-accent-1-emphasis)
var(--color-on-accent-1)

var(--color-accent-2-subtle)
var(--color-accent-2-default)
var(--color-accent-2-emphasis)
var(--color-on-accent-2)

var(--color-accent-3-subtle)
var(--color-accent-3-default)
var(--color-accent-3-emphasis)
var(--color-on-accent-3)
```

> ⚠️ Accents are empty by default. Each consuming project must define them in its own CSS. If not defined, they must not be used.

### Surfaces

Surfaces define the visual depth levels of the UI:

```css
var(--color-surface-base)     /* Page background */
var(--color-surface-raised)   /* Cards, panels */
var(--color-surface-overlay)  /* Modals, dropdowns, tooltips */
var(--color-surface-sunken)   /* Inputs, visually recessed areas */
```

**Expected visual hierarchy:**
```
surface-sunken  →  surface-base  →  surface-raised  →  surface-overlay
  (lowest)                                                (highest)
```

### Text

```css
var(--color-text-default)   /* Primary text */
var(--color-text-muted)     /* Secondary text, captions, placeholders */
var(--color-text-disabled)  /* Text in disabled states */
```

### Borders

```css
var(--color-border-default)  /* Standard borders — inputs, cards, dividers */
var(--color-border-strong)   /* Higher contrast borders — focus, separators */
```

### Focus

```css
var(--color-focus-ring)  /* Focus outline color — used on all interactive elements */
```

All interactive components use the same focus style:
```scss
outline: 2px solid var(--color-focus-ring);
outline-offset: 2px;
```

### Disabled

```css
var(--opacity-disabled)  /* 0.4 in light/pastel, 0.35 in dark */
```

All disabled states must use this token instead of hardcoding opacity:
```scss
.my-component--disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
  pointer-events: none;
}
```

---

## Typography tokens

### Font families

```css
var(--font-sans)  /* Plus Jakarta Sans — general use */
var(--font-mono)  /* Fira Code — code, technical values */
```

> The consuming project must load the font (e.g., Google Fonts, Fontsource, or self-hosted). The token only declares the font-family stack.

The size scale, weights, and line-heights are inherited from Tailwind 4 defaults:

```css
/* Sizes */
var(--text-xs)    /* 0.75rem */
var(--text-sm)    /* 0.875rem */
var(--text-base)  /* 1rem */
var(--text-lg)    /* 1.125rem */
var(--text-xl)    /* 1.25rem */
var(--text-2xl)   /* 1.5rem */
var(--text-3xl)   /* 1.875rem */
var(--text-4xl)   /* 2.25rem */
var(--text-5xl)   /* 3rem */

/* Weights */
var(--font-weight-normal)    /* 400 */
var(--font-weight-medium)    /* 500 */
var(--font-weight-semibold)  /* 600 */
var(--font-weight-bold)      /* 700 */

/* Line heights */
var(--leading-tight)    /* 1.25 */
var(--leading-snug)     /* 1.375 */
var(--leading-normal)   /* 1.5 */
var(--leading-relaxed)  /* 1.625 */
```

---

## Shadow tokens

```css
var(--shadow-sm)   /* Subtle floating elements — small dropdowns */
var(--shadow-md)   /* Cards, panels */
var(--shadow-lg)   /* Modals, drawers */
var(--shadow-xl)   /* Prominent overlays */
```

> In dark mode, shadows automatically have higher opacity to maintain the perception of depth.

---

## Border radius tokens

```css
var(--radius-sm)    /* 0.25rem — badges, tags, small inputs */
var(--radius-md)    /* 0.5rem  — buttons, inputs, cards */
var(--radius-lg)    /* 1rem    — large panels, modals */
var(--radius-full)  /* 9999px  — pills, avatars, toggles */
```

---

## Spacing

Tailwind 4 exposes a single `--spacing` base unit (0.25rem = 4px). All spacing in component SCSS should use multiples of this unit instead of hardcoded `px` values:

```scss
// ✅ Correct — uses Tailwind spacing base
.my-component {
  padding: var(--spacing) calc(var(--spacing) * 2);       /* 4px 8px */
  gap: calc(var(--spacing) * 1.5);                         /* 6px */
  margin-bottom: calc(var(--spacing) * 4);                 /* 16px */
}

// ❌ Incorrect — hardcoded px
.my-component {
  padding: 4px 8px;
  gap: 6px;
}
```

Common multiples:

| Expression | Value |
|---|---|
| `calc(var(--spacing) * 0.5)` | 2px / 0.125rem |
| `var(--spacing)` | 4px / 0.25rem |
| `calc(var(--spacing) * 1.5)` | 6px / 0.375rem |
| `calc(var(--spacing) * 2)` | 8px / 0.5rem |
| `calc(var(--spacing) * 3)` | 12px / 0.75rem |
| `calc(var(--spacing) * 4)` | 16px / 1rem |

> For templates, use Tailwind utility classes (`p-2`, `gap-1.5`, etc.) as stated in rule #5. The `var(--spacing)` pattern is for SCSS files where Tailwind classes are not available.

---

## Icon size tokens

Shared scale for all iconographic/indicator elements: icons, spinners, badges, avatars, and similar small visual elements. Components should reference these tokens instead of hardcoding sizes.

```css
var(--icon-size-xs)   /* 0.75rem — inline indicators, status dots */
var(--icon-size-sm)   /* 1rem    — buttons, form fields */
var(--icon-size-md)   /* 1.25rem — default, standalone icons */
var(--icon-size-lg)   /* 1.5rem  — section headers, emphasis */
var(--icon-size-xl)   /* 2rem    — hero sections, empty states */
var(--icon-size-2xl)  /* 2.5rem  — splash, decorative use */
```

---

## Avatar size tokens

Dedicated scale for avatar components. Larger than icon sizes because avatars contain initials or images.

```css
var(--avatar-size-sm)   /* 1.5rem — inline, compact lists */
var(--avatar-size-md)   /* 2rem   — default, navigation */
var(--avatar-size-lg)   /* 2.5rem — cards, profiles */
var(--avatar-size-xl)   /* 3rem   — hero, detail views */
```

---

## Transition tokens

```css
/* Durations */
var(--duration-fast)     /* 100ms — micro-interactions, toggles */
var(--duration-normal)   /* 200ms — hover effects, color changes */
var(--duration-slow)     /* 300ms — modals, drawers, page transitions */

/* Easings */
var(--easing-default)    /* cubic-bezier(0.4, 0, 0.2, 1) — general purpose */
var(--easing-in)         /* cubic-bezier(0, 0, 0.2, 1)   — elements entering (deceleration) */
var(--easing-out)        /* cubic-bezier(0.4, 0, 1, 1)   — elements exiting (acceleration) */
```

Usage:
```scss
.my-component {
  transition: background-color var(--duration-normal) var(--easing-default);
}
```

### Animation guidelines

- **Hover effects and color changes** — use `--duration-normal` with `--easing-default`
- **Micro-interactions** (toggles, checkmarks, dots) — use `--duration-fast` with `--easing-default`
- **Entry/exit animations** (modals, drawers, tooltips) — use `--duration-slow` with `--easing-in`/`--easing-out`
- **Always respect `prefers-reduced-motion`** — every animated component must include:

```scss
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
    animation: none;
  }
}
```

---

## Z-index tokens

```css
var(--z-dropdown)  /* 100 — dropdowns, select menus */
var(--z-sticky)    /* 200 — sticky headers, toolbars */
var(--z-overlay)   /* 300 — overlays, backdrops */
var(--z-modal)     /* 400 — modals, dialogs */
var(--z-toast)     /* 500 — toasts, notifications (always on top) */
```

---

## Theming

Three themes are available out of the box:

| Theme | CSS class | File | Description |
|---|---|---|---|
| Light | _(default)_ | `lib/theme.css` | Neutral light theme with blue primary |
| Dark | `.theme-dark` | `lib/themes/dark.css` | Dark surfaces, lighter accent colors, stronger shadows |
| Pastel | `.theme-pastel` | `lib/themes/pastel.css` | Warm cream surfaces, lavender primary, tinted shadows |

Activate a theme by adding its class to a container element (typically `<html>` or a wrapper `<div>`). Themes can be nested — a `.theme-dark` section inside a `.theme-pastel` page works correctly.

Tokens have exactly the same names in all themes — there are no theme-specific tokens. The switch is transparent to components.

```scss
// ✅ Correct — works in both modes automatically
.my-component {
  background: var(--color-surface-raised);
  color: var(--color-text-default);
}

// ❌ Incorrect — hardcoded colors break dark mode
.my-component {
  background: #ffffff;
  color: #111111;
}
```

---

## Defining accents in a consuming project

```css
/* consuming project's styles.css */
@import "styles/index.css";

@theme {
  --color-accent-1-subtle: oklch(95% 0.04 330);
  --color-accent-1-default: oklch(60% 0.2 330);
  --color-accent-1-emphasis: oklch(50% 0.2 330);
  --color-on-accent-1: oklch(99% 0 0);
}
```

For dark mode accents in the consuming project, override inside the `.theme-dark` selector:

```css
.theme-dark {
  --color-accent-1-subtle: oklch(25% 0.07 330);
  --color-accent-1-default: oklch(70% 0.2 330);
  --color-accent-1-emphasis: oklch(80% 0.2 330);
  --color-on-accent-1: oklch(10% 0 0);
}
```

---

## Typography utility classes

These classes are available globally once `styles/index.css` is imported.

### Headings

```html
<h1 class="ui-h1">Main title</h1>
<h2 class="ui-h2">Section title</h2>
<h3 class="ui-h3">Subtitle</h3>
<h4 class="ui-h4">Heading 4</h4>
<h5 class="ui-h5">Heading 5</h5>
<h6 class="ui-h6">Heading 6</h6>
```

> `ui-h*` classes are independent of the HTML element. You can apply `ui-h2` to a `<p>` if the visual hierarchy requires it without affecting document semantics.

### Body text

```html
<p class="ui-body-lg">Large text — intros, highlights</p>
<p class="ui-body-md">Standard text — general content</p>
<p class="ui-body-sm">Small text — secondary, forms</p>
```

### Special

```html
<span class="ui-caption">Supporting text, timestamps, metadata</span>
<span class="ui-overline">SECTION LABEL</span>
<code class="ui-code">const value = 42;</code>
```

### Color modifiers

```html
<p class="ui-body-md ui-text-muted">Secondary text</p>
<p class="ui-body-sm ui-text-danger">Error message</p>
<p class="ui-body-sm ui-text-success">Operation completed</p>
```

---

## Signal Forms integration

Form control components (Checkbox, Radio, Toggle, Slider) implement Angular Signal Forms interfaces from `@angular/forms/signals`:

| Component | Interface | Value type |
|---|---|---|
| `UiCheckboxComponent` | `FormCheckboxControl` | `boolean` (checked) |
| `UiRadioComponent` | `FormCheckboxControl` | `boolean` (checked) |
| `UiToggleComponent` | `FormCheckboxControl` | `boolean` (checked) |
| `UiSliderComponent` | `FormValueControl<number>` | `number` (value) |
| `UiInputComponent` | `FormValueControl<string>` | `string` (value) |
| `UiTextareaComponent` | `FormValueControl<string>` | `string` (value) |
| `UiSelectComponent` | `FormValueControl<T \| null>` | `T \| null` (value) |
| `UiMultiSelectComponent` | `FormValueControl<T[]>` | `T[]` (value) |
| `UiDatePickerComponent` | `FormValueControl<Date \| null>` | `Date \| null` (value) |

These components expose `model()` signals for two-way binding (`checked` or `value`) and `input()` signals for form state (`disabled`, `invalid`, `errors`, `hidden`, `readonly`, `disabledReasons`). The form framework manages these inputs — consumers should not set `disabled` or `invalid` manually when using Signal Forms.

For standalone use without Signal Forms, inputs like `disabled` and `invalid` can be set directly via template bindings.

---

## Date handling with date-fns

All date manipulation in the library uses [date-fns](https://date-fns.org/) v4. Never use manual `Date` arithmetic (`getMonth() + 1`, `new Date(year, month - 1)`, etc.).

### Key functions used

```ts
import {
  startOfMonth, startOfWeek, addDays, addMonths, subMonths,
  addYears, subYears, getMonth, getYear, getDate,
  setMonth, setYear, isBefore, isAfter, startOfDay, endOfDay,
  format, eachDayOfInterval,
} from 'date-fns';
```

### Locale handling

Locales are mapped from BCP-47 strings to date-fns locale objects in a shared file:

```ts
// date-picker.locale.ts
import { type Locale } from 'date-fns';
import { fr, enUS, es } from 'date-fns/locale';

export const LOCALE_MAP: Record<string, Locale> = {
  'fr-FR': fr,
  'en-US': enUS,
  'es-ES': es,
};
```

- **Fallback**: always fall back to `enUS` when a locale string is not in the map
- **Adding locales**: import from `date-fns/locale` and add to the map — no other code changes needed
- **Format patterns**: use date-fns format tokens (`dd/MM/yyyy`, `LLLL yyyy`, `EEEEEE`, `LLL`) — not `Intl.DateTimeFormat`

### Accepted exceptions

- `@keyframes` opacity values (e.g., spinner dot pulse `opacity: 0.3`) are not token violations — CSS keyframes need literal numeric values for animation rhythm

---

## Rules for implementing components

When implementing any component in the library, follow these rules without exception:

1. **Never hardcode colors** — always use color tokens
2. **Never hardcode border radii** — always use `var(--radius-*)`
3. **Never hardcode shadows** — always use `var(--shadow-*)`
4. **Never hardcode fonts** — always use `var(--font-sans)` or `var(--font-mono)`
5. **Use Tailwind for spacing and layout** — `p-4`, `gap-2`, `flex`, etc. In SCSS, use `var(--spacing)` multiples
6. **Never hardcode transition durations or easings** — always use `var(--duration-*)` and `var(--easing-*)`
7. **Never hardcode component dimensions** — use `var(--icon-size-*)` for icons/spinners, `var(--avatar-size-*)` for avatars, and `var(--spacing)` multiples for heights/widths of bars, tracks, and similar elements
8. **Use tokens for everything themeable** — colors, radii, shadows, typography, sizing, transitions
9. **Do not use accents without verifying** that the consuming project has defined them
10. **Use `var(--color-focus-ring)` for focus outlines** — never hardcode focus colors
11. **Use `var(--opacity-disabled)` for disabled states** — never hardcode opacity values
12. **Always include `@media (prefers-reduced-motion: reduce)`** for any component with `transition` or `animation` in its SCSS
13. **Do not set `changeDetection` explicitly** — Angular's default is already `OnPush` in this project. Adding it is redundant noise
14. **Never use `line-height: 1`** — use `var(--leading-snug)` (1.375) for compact text or `var(--leading-tight)` (1.25) for headings. The only exception is avatar initials (single uppercase letters inside centered containers).
15. **Prefer HTML5 semantic elements** — use `<details>`/`<summary>` for accordions, `<search>` for search landmarks, `<nav>` + `<ol>` for breadcrumbs, `<label>` for form labels, native `<button>` and `<input>` elements. Only use `<div>` with ARIA roles when no semantic element exists.
16. **Components using `@angular/cdk/overlay` must use `ViewEncapsulation.None`** — CDK Overlay portals render content outside the component host, so scoped SCSS will not apply to the overlay panel. Move overlay-specific styles under a unique host class to avoid global leaks.
17. **Extract shared SCSS when multiple components share identical styles** — never duplicate an entire SCSS file across components. Use a shared partial (e.g., `_select-shared.scss`) and `@use` it in each component.
18. **Always generate Storybook stories** — every component must have a `.stories.ts` file colocated next to it with exactly **3 exported stories**:

### Story structure

Each component story file must export:

#### 1. `Docs` — Documentation
A read-only showcase that explains what the component is and how to use it. It should display:
- The component name and a short description
- A usage example rendered visually
- A table or list of inputs/outputs with their types and defaults

```ts
export const Docs: Story = {};
```

#### 2. `Playground` — Interactive
The main interactive story. All component inputs are exposed as Storybook controls so the user can experiment with every option in real time.

```ts
export const Playground: Story = {
  args: {
    // all inputs with sensible defaults
  },
};
```

#### 3. `Variants` — Visual catalog
A single canvas that renders the component in all its meaningful combinations (sizes, colors, states, disabled, etc.) side by side for quick visual comparison.

```ts
export const Variants: Story = {};
```

### File structure example

```
libs/shared-ui/button/
  ├── ng-package.json           ← secondary entry point
  ├── index.ts                  ← public API
  └── src/
      ├── button.component.ts
      ├── button.component.scss
      └── button.stories.ts    ← Docs + Playground + Variants
```

### Storybook title convention

Use the pattern `Components/<ComponentName>`:

```ts
const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
};
```
