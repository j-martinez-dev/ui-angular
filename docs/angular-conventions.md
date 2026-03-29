# Angular Conventions

Rules and patterns followed across all components in this design system.

---

## Component structure

Every component follows a consistent file structure:

```
libs/shared-ui/<component>/
  ng-package.json           ← secondary entry point
  index.ts                  ← public API exports
  src/
    <component>.component.ts
    <component>.component.html
    <component>.component.scss
    <component>.stories.ts
```

Import path: `@ui/shared-ui/<component>` or `@ui/shared-forms/<component>`

---

## Signals-first API

### Inputs

All inputs use the signal-based `input()` function, never `@Input()` decorator:

```ts
// Required input
title = input.required<string>();

// Optional with default
variant = input<'filled' | 'outlined'>('filled');

// Optional without default
icon = input<string>();
```

### Outputs

All outputs use the signal-based `output()` function:

```ts
activeValueChange = output<T>();
cardClick = output<void>();
```

### Derived state

Use `computed()` for values derived from inputs:

```ts
isFirstStep = computed(() => this.currentStep() === 1);
styles = computed(() => VARIANT_MAP[this.variant()]);
```

### Local state

Use `signal()` for mutable component state:

```ts
isCollapsed = signal<boolean>(false);
```

---

## Change detection

The project default is `ChangeDetectionStrategy.OnPush`. **Do not set `changeDetection` explicitly** in `@Component` — it is redundant.

---

## Template files

All components use external template files via `templateUrl`, not inline `template`:

```ts
@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
```

---

## Host bindings

Use the `host` property in `@Component` or `@Directive`, never `@HostBinding` or `@HostListener`:

```ts
@Component({
  host: {
    '[class.sidebar--collapsed]': 'isCollapsed()',
    '[style.--card-bg]': 'styles().bg',
    '(click)': 'onClick()',
  },
})
```

---

## Template syntax

Use modern Angular control flow, not structural directives:

```html
<!-- Correct -->
@if (item.icon) {
  <ui-icon [name]="item.icon" />
}

@for (item of items(); track item.id) {
  <div>{{ item.label }}</div>
}

<!-- Incorrect — do not use -->
<ui-icon *ngIf="item.icon" [name]="item.icon" />
<div *ngFor="let item of items()">{{ item.label }}</div>
```

Use `[class]` bindings, not `ngClass`. Use `[style]` bindings, not `ngStyle`.

---

## Dependency injection

Use the `inject()` function, not constructor injection:

```ts
private el = inject(ElementRef);
private renderer = inject(Renderer2);
private destroyRef = inject(DestroyRef);
```

---

## Component composition

Reuse existing design system components — never reimplement what already exists:

- Use `UiIconComponent` for icons
- Use `UiIconButtonComponent` for icon-only buttons
- Use `UiBadgeComponent` for status indicators
- Use `UiButtonComponent` for actions
- Use `UiSelectComponent` for dropdowns
- Use `UiTooltipDirective` for hover hints

Native `<button>` is acceptable only for:
- The button primitive itself
- Grid items (calendar days, pagination pages, tab buttons)
- Tiny internal controls (tag remove buttons)

---

## Styling rules

### Token usage

| What | Use | Never |
|---|---|---|
| Colors | `var(--color-*)` | Hex, rgb, hsl |
| Radii | `var(--radius-*)` | `px` values |
| Shadows | `var(--shadow-*)` | `box-shadow: 0 ...` |
| Fonts | `var(--font-sans/mono)` | `font-family: Arial` |
| Spacing (SCSS) | `var(--spacing)` multiples | `px` values |
| Spacing (HTML) | Tailwind `p-4`, `gap-2` | — |
| Transitions | `var(--duration-*)`, `var(--easing-*)` | `150ms ease` |
| Disabled | `var(--opacity-disabled)` | `opacity: 0.4` |
| Focus | `var(--color-focus-ring)` | Custom focus colors |
| Icon sizes | `var(--icon-size-*)` | `width: 16px` |
| Z-index | `var(--z-*)` | `z-index: 100` |

### Animations

Every component with `transition` or `animation` must include:

```scss
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
  }
}
```

Easing direction:
- Entry (appear): `--easing-out` (deceleration)
- Exit (disappear): `--easing-in` (acceleration)
- Hover / toggle: `--easing-default`

### Line height

Never use `line-height: 1`. Use `var(--leading-tight)` (1.25) or `var(--leading-snug)` (1.375). Exception: avatar initials.

---

## Accessibility

### Semantic HTML

Prefer native elements: `<button>`, `<input>`, `<label>`, `<nav>`, `<details>/<summary>`, `<search>`. Only use `<div>` with ARIA roles when no semantic element exists.

### Interactive components with roles

Components with `role="progressbar"`, `role="slider"`, `role="status"` must expose a `label` input bound to `aria-label`:

```ts
label = input.required<string>();
```

### Focus ring

All interactive elements use the same focus style:

```scss
&:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
```

### Screen reader announcements

Use either `aria-label` on the host OR a `.sr-only` span, never both.

---

## ViewEncapsulation

### Default (Emulated)

Most components use Angular's default `ViewEncapsulation.Emulated`. Use `:host` for host styling.

### None

Components using `@angular/cdk/overlay` (Modal, Select, MultiSelect, Toast, Dropdown) must use `ViewEncapsulation.None` because CDK portals render outside the component host.

When using `ViewEncapsulation.None`:
- **Never** use `:host` — it's ignored without Shadow DOM
- Use the element selector directly: `ui-modal { ... }` instead of `:host { ... }`
- Use class selectors for conditional styles: `.size-md .trigger` instead of `:host(.size-md) .trigger`

---

## Default text language

All default placeholders, labels, and ARIA strings in components must be in **French**. Consumers handle i18n at the application level.

Storybook documentation (section headings, descriptions, input tables) must be in **English**.

---

## Signal Forms integration

Form control components implement Angular Signal Forms interfaces:

| Component | Interface | Value type |
|---|---|---|
| Checkbox | `FormCheckboxControl` | `boolean` |
| Radio | `FormCheckboxControl` | `boolean` |
| Toggle | `FormCheckboxControl` | `boolean` |
| Input | `FormValueControl<string>` | `string` |
| Textarea | `FormValueControl<string>` | `string` |
| Slider | `FormValueControl<number>` | `number` |
| Select | `FormValueControl<T \| null>` | `T \| null` |
| MultiSelect | `FormValueControl<T[]>` | `T[]` |
| DatePicker | `FormValueControl<Date \| null>` | `Date \| null` |

These expose `model()` signals for two-way binding and `input()` signals for form state (`disabled`, `invalid`, `errors`, `hidden`, `readonly`).

---

## Storybook stories

Every component must have a `.stories.ts` file with exactly **3 exported stories**:

1. **Docs** — Read-only showcase with description, usage example, and inputs table
2. **Playground** — All inputs exposed as Storybook controls
3. **Variants** — Visual catalog of all meaningful combinations side by side

Story title convention: `'Shared UI/<Name>'` or `'Shared Forms/<Name>'`

---

## Date handling

All date manipulation uses [date-fns](https://date-fns.org/) v4. Never use manual `Date` arithmetic.

Locales are mapped in `date-picker.locale.ts` from BCP-47 strings to date-fns locale objects. Fallback is always `enUS`.
