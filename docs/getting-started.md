# Getting Started

How to install, configure, and use the design system in an Angular project.

---

## Installation

The design system is organized as two Nx libraries:

- **`@ui/shared-ui`** — General UI components (buttons, cards, modals, navigation, etc.)
- **`@ui/shared-forms`** — Form controls (inputs, selects, checkboxes, etc.)

Both are consumed as secondary entry points within the monorepo.

---

## Setup

### 1. Import styles

Add the design system styles to your application's main stylesheet:

```css
/* your-app/src/styles.css */
@import "styles/index.css";
```

This imports the token system, Tailwind 4, typography utilities, and all global styles.

### 2. Load fonts

The design system uses **Plus Jakarta Sans** (body) and **Fira Code** (code). Load them via Google Fonts, Fontsource, or self-host:

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fira+Code&display=swap" rel="stylesheet">
```

### 3. Register icons

Components use [ng-icons](https://ng-icons.github.io/ng-icons/) with Heroicons. Register required icons in your app config:

```ts
import { provideIcons } from '@ng-icons/core';
import { heroCheck, heroXMark, heroPlus } from '@ng-icons/heroicons/outline';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIcons({ heroCheck, heroXMark, heroPlus }),
  ],
};
```

### 4. Import components

Import components individually from their entry points:

```ts
import { UiButtonComponent } from '@ui/shared-ui/button';
import { UiInputComponent } from '@ui/shared-forms/input';
import { UiCardComponent } from '@ui/shared-ui/card';

@Component({
  imports: [UiButtonComponent, UiInputComponent, UiCardComponent],
  // ...
})
export class MyComponent {}
```

---

## Theming

### Activate a theme

Add a theme class to any container (typically `<html>` or a wrapper `<div>`):

```html
<!-- Light (default — no class needed) -->
<html>

<!-- Dark -->
<html class="theme-dark">

<!-- Pastel -->
<html class="theme-pastel">
```

Themes can be nested. A `.theme-dark` section inside a `.theme-pastel` page works correctly.

### Define accent colors

Accent colors are empty by default. Define them in your project's stylesheet:

```css
@theme {
  --color-accent-1-subtle: oklch(95% 0.04 330);
  --color-accent-1-default: oklch(60% 0.2 330);
  --color-accent-1-emphasis: oklch(50% 0.2 330);
  --color-on-accent-1: oklch(99% 0 0);
}

.theme-dark {
  --color-accent-1-subtle: oklch(25% 0.07 330);
  --color-accent-1-default: oklch(70% 0.2 330);
  --color-accent-1-emphasis: oklch(80% 0.2 330);
  --color-on-accent-1: oklch(10% 0 0);
}
```

---

## Project structure

```
libs/
  shared-ui/              ← general UI components
    button/
    card/
    modal/
    navbar/
    sidebar/
    table/
    ...
  shared-forms/           ← form controls
    input/
    select/
    checkbox/
    date-picker/
    form-field/
    ...
styles/
  index.css               ← global entry point
  lib/
    theme.css             ← base tokens
    themes/
      dark.css
      pastel.css
    typography.css
    table.css
apps/
  storybook/              ← component documentation
```

---

## Storybook

Run Storybook locally to explore all components:

```bash
npx nx run storybook:storybook
```

Build for deployment:

```bash
npx nx run storybook:build-storybook
```

Every component has three stories: **Docs** (reference), **Playground** (interactive controls), and **Variants** (visual catalog across themes).

---

## Further reading

- [Component Reference](./components.md) — Every component with inputs, outputs, and usage examples
- [Design Tokens](./tokens.md) — Full token catalog with usage guidelines
- [Angular Conventions](./angular-conventions.md) — Coding rules and patterns
