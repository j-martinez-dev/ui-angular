# Project Architecture

Technical overview of the design system's structure, build system, and key decisions.

---

## Monorepo layout

The project is an Nx monorepo with three library projects and one Storybook application:

```
/
├── libs/
│   ├── shared-ui/          ← general UI components (24 components)
│   ├── shared-forms/       ← form controls (12 components)
│   └── shared-table/       ← table and pagination (2 components)
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

Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Card, Dropdown Menu, Empty State, Icon, Icon Button, List Item, Modal, Navbar, Page Header, Progress Bar, Sidebar, Spinner, Stats Block, Tabs, Tag, Toast, Tooltip, Wizard Bottom Bar

### `@ui/shared-forms`

Form controls implementing Angular Signal Forms interfaces, plus form-adjacent components:

Checkbox, Date Picker, File Upload, Form Field, Input, Multi Select, Radio, Search Bar, Select, Slider, Textarea, Toggle

### `@ui/shared-table`

Table and pagination components:

Table, Pagination

**Why separate?** Each library has a distinct responsibility:
- **Form components** depend on `@angular/forms/signals` and carry form state logic. Separating them allows apps that don't use forms to import only `shared-ui`.
- **Table components** have their own global CSS (BEM-scoped) and are often used independently of both general UI and forms. Isolating them avoids pulling in table-specific styles when not needed.
- The dependency graph stays clear and one-way: `shared-table` → `shared-ui`, `shared-forms` → `shared-ui`.

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

All libraries use `@nx/angular:ng-packagr-lite`:

```bash
npx nx build shared-ui        # → dist/libs/shared-ui/
npx nx build shared-forms      # → dist/libs/shared-forms/
npx nx build shared-table      # → dist/libs/shared-table/
```

Nx automatically resolves build dependencies: `shared-forms` and `shared-table` depend on `shared-ui`, so `shared-ui` builds first.

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

shared-table ──→ shared-ui
```

`shared-ui` has zero dependencies on `shared-forms` or `shared-table`. This prevents circular dependencies.

---

## CI/CD

### GitHub Actions

`.github/workflows/deploy-storybook.yml` deploys Storybook to GitHub Pages on every push to `main`:

1. `npm ci`
2. `npx nx build shared-ui && npx nx build shared-forms && npx nx build shared-table`
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
