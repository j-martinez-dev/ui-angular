# Project Architecture

Technical overview of the design system's structure, build system, and key decisions.

---

## Monorepo layout

The project is an Nx monorepo with two library projects and one Storybook application:

```
/
├── libs/
│   ├── shared-ui/          ← general UI components (26 components)
│   └── shared-forms/       ← form controls (13 components)
├── apps/
│   └── storybook/          ← Storybook documentation app
├── styles/                 ← global design tokens and CSS
├── docs/                   ← project documentation
└── .github/workflows/      ← CI/CD (GitHub Pages deploy)
```

---

## Library separation

### `@ui/shared-ui`

Presentational and layout components with no form state management:

Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Card, Dropdown Menu, Empty State, Icon, Icon Button, List Item, Modal, Navbar, Page Header, Progress Bar, Sidebar, Spinner, Stats Block, Table, Tabs, Tag, Toast, Tooltip, Wizard Bottom Bar

### `@ui/shared-forms`

Form controls implementing Angular Signal Forms interfaces, plus form-adjacent components:

Checkbox, Date Picker, File Upload, Form Field, Input, Multi Select, Pagination, Radio, Search Bar, Select, Slider, Textarea, Toggle

**Why separate?** Form components have a dependency on `@angular/forms/signals` and carry form state logic. Separating them:
- Allows apps that don't use forms to import only `shared-ui`
- Avoids circular dependencies (`shared-ui` components don't import form controls)
- Makes the dependency graph clear: `shared-forms` → `shared-ui` (one-way)

---

## Secondary entry points

Each component is its own secondary entry point with an `ng-package.json`:

```
libs/shared-ui/button/
  ng-package.json     ← { "lib": { "entryFile": "index.ts" } }
  index.ts            ← export { UiButtonComponent } from './src/...'
  src/
    button.component.ts
    button.component.html
    button.component.scss
    button.stories.ts
```

This enables tree-shakable imports:

```ts
// Only imports button code, not the entire library
import { UiButtonComponent } from '@ui/shared-ui/button';
```

---

## Build system

### Library builds

Both libraries use `@nx/angular:ng-packagr-lite`:

```bash
npx nx build shared-ui        # → dist/libs/shared-ui/
npx nx build shared-forms      # → dist/libs/shared-forms/
```

Nx automatically resolves build dependencies: `shared-forms` depends on `shared-ui`, so `shared-ui` builds first.

### Storybook

```bash
npx nx run storybook:storybook          # dev server (port 4400)
npx nx run storybook:build-storybook    # static build → dist/storybook/
```

---

## Token system

Tokens are plain CSS custom properties inside Tailwind 4's `@theme` block. This means:

1. **Tailwind consumes them automatically** — `bg-surface-raised`, `text-text-muted`, etc.
2. **SCSS can reference them directly** — `var(--color-surface-raised)`
3. **Theming is transparent** — same token names across all themes; only values change

Token files are not part of any Angular library — they live in `styles/` and are imported globally.

---

## Dependency graph

```
shared-forms ──→ shared-ui ──→ @angular/core
     │                │            @angular/cdk
     │                └──→ @ng-icons/core
     │
     └──→ @angular/forms/signals
```

`shared-ui` has zero dependencies on `shared-forms`. This prevents circular dependencies.

---

## CI/CD

### GitHub Actions

`.github/workflows/deploy-storybook.yml` deploys Storybook to GitHub Pages on every push to `main`:

1. `npm ci`
2. `npx nx build shared-ui && npx nx build shared-forms`
3. `npx nx run storybook:build-storybook`
4. Deploy to GitHub Pages

---

## Key technical decisions

| Decision | Rationale |
|---|---|
| **Signal inputs/outputs** | Modern Angular API, better change detection integration |
| **External templates** | Consistent pattern, better IDE support for HTML |
| **No explicit OnPush** | Project-wide default avoids redundant boilerplate |
| **Global CSS for table** | Directives can't have scoped styles; global CSS with BEM naming prevents leaks |
| **`ViewEncapsulation.None` for overlay components** | CDK Overlay portals render outside the component host |
| **date-fns for dates** | Consistent, locale-aware, no manual Date arithmetic |
| **French default labels** | Target market; i18n handled by consuming applications |
| **BEM-like CSS naming** | Prevents class collisions in global styles (`.ui-table__head--sortable`) |
