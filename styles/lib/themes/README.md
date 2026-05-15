# Creating a new theme

Each theme is a CSS file that overrides the design system tokens under a class selector.

## Steps

### 1. Create the file

Add a new file in `styles/lib/themes/`:

```
styles/lib/themes/my-theme.css
```

### 2. Define the class with token overrides

Use the selector `.theme-<name>` and override the tokens you need:

```css
.theme-my-theme {
  /* Colors */
  --color-primary-subtle: oklch(...);
  --color-primary-default: oklch(...);
  --color-primary-emphasis: oklch(...);
  --color-on-primary: oklch(...);

  /* Surfaces */
  --color-surface-base: oklch(...);
  --color-surface-raised: oklch(...);
  --color-surface-overlay: oklch(...);
  --color-surface-sunken: oklch(...);

  /* Text */
  --color-text-default: oklch(...);
  --color-text-muted: oklch(...);
  --color-text-disabled: oklch(...);

  /* Borders */
  --color-border-default: oklch(...);
  --color-border-strong: oklch(...);

  /* Shadows */
  --shadow-sm: ...;
  --shadow-md: ...;
  --shadow-lg: ...;
  --shadow-xl: ...;
}
```

### 3. Import it in `styles/index.css`

```css
@import "./lib/themes/my-theme.css";
```

### 4. Register it in Storybook

In `apps/storybook/.storybook/preview.ts`, add the theme to the `themes` object:

```ts
withThemeByClassName({
  themes: {
    light: '',
    dark: 'theme-dark',
    stripe: 'theme-stripe',
    'my-theme': 'theme-my-theme',  // <-- add here
  },
  defaultTheme: 'light',
}),
```

### 5. Use it in a consuming app

Add the class to the `<html>` element:

```html
<html class="theme-my-theme">
```

## Token reference

The full list of tokens to override:

| Group | Tokens |
|-------|--------|
| Primary | `--color-primary-subtle`, `--color-primary-default`, `--color-primary-emphasis`, `--color-on-primary` |
| Success | `--color-success-subtle`, `--color-success-default`, `--color-success-emphasis`, `--color-on-success` |
| Warning | `--color-warning-subtle`, `--color-warning-default`, `--color-warning-emphasis`, `--color-on-warning` |
| Error | `--color-error-subtle`, `--color-error-default`, `--color-error-emphasis`, `--color-on-error` |
| Info | `--color-info-subtle`, `--color-info-default`, `--color-info-emphasis`, `--color-on-info` |
| Surfaces | `--color-surface-base`, `--color-surface-raised`, `--color-surface-overlay`, `--color-surface-sunken` |
| Text | `--color-text-default`, `--color-text-muted`, `--color-text-disabled` |
| Borders | `--color-border-default`, `--color-border-strong` |
| Shadows | `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` |

All color values use the `oklch()` format: `oklch(lightness chroma hue)`.

## Notes

- The `light` theme is the default and lives in `styles/lib/theme.css` inside `@theme`. It does not use a class selector.
- You only need to override the tokens you want to change. Any token not overridden will inherit from the light default.
- Accents (`--color-accent-*`) are defined by consuming projects, not by themes.

---

# Building a theme from a `DESIGN.md`

[getdesign.md](https://getdesign.md/) publishes ~70 brand DESIGN.md files (Stripe, Figma, Vercel, Apple…). Each is a YAML-fronted markdown document describing colors, typography, radii, spacing, and components for that brand. We can translate any of those into a theme for this design system by mapping its keys to our tokens.

The `theme-from-designmd` skill at `.claude/skills/theme-from-designmd/` automates the translation. The rules below are the canonical mapping it follows — read them if you're doing this manually or want to understand why the skill produces what it produces.

## Mapping table

### Colors

| DESIGN.md key | Our token |
|---|---|
| `colors.primary` | `--color-primary-default` |
| `colors.primary-deep` | `--color-primary-deep` |
| `colors.primary-press` / `primary-pressed` | `--color-primary-emphasis` |
| `colors.primary-soft` | `--color-primary-soft` |
| `colors.primary-subdued` / `primary-bg-subdued-hover` | `--color-primary-subtle` |
| `colors.on-primary` | `--color-on-primary` |
| Same pattern for `success`, `warning`, `error`, `info` | Same `--color-{name}-*` tokens |
| `colors.ink` | `--color-text-default` |
| `colors.ink-secondary` | `--color-text-secondary` |
| `colors.ink-mute` / `ink-mute-2` | `--color-text-muted` |
| `colors.canvas` / `bg` / `background` | `--color-surface-raised` (and `--color-surface-base` if no separate "page" value) |
| `colors.canvas-soft` / `bg-page` | `--color-surface-base` (page) or `--color-surface-sunken` |
| `colors.canvas-cream` / brand accent surface | `--color-accent-1-subtle` |
| `colors.brand-dark-*` / inverted surface | `--color-surface-inverse` (+ matching `--color-on-surface-inverse`) |
| `colors.hairline` / `border` | `--color-border-default` |
| `colors.hairline-input` | `--color-border-input` |
| `colors.ruby` / `magenta` / `lemon` / decorative accents | `--color-accent-2-*` / `accent-3-*` — **do not** repurpose as `--color-error-*` unless DESIGN.md explicitly labels them semantic |

**Rules of thumb:**
- If DESIGN.md lacks `success` / `warning` / `error` / `info`, **do not invent them** — let the base tokens cascade through.
- If DESIGN.md gives a single text color, set `default` and derive `secondary` / `muted` / `disabled` from a lightness ramp.
- All values stay in their source notation (hex or oklch). Mixing inside one theme file is fine — the brand themes (`stripe`, `vercel`, `linear`, `figma`) all use hex while the base theme uses oklch.

### Border radius

| DESIGN.md key | Our token |
|---|---|
| `rounded.xs` | `--radius-xs` |
| `rounded.sm` | `--radius-sm` |
| `rounded.md` | `--radius-md` |
| `rounded.lg` | `--radius-lg` |
| `rounded.xl` | `--radius-xl` |
| `rounded.pill` / `rounded.full` | `--radius-full` |

### Spacing

DESIGN.md spacing scales are almost always 4px-based multiples — identical to our `--spacing: 0.25rem` base. Don't override `--spacing` unless the DESIGN.md explicitly uses a non-4px base unit (rare).

### Typography

| DESIGN.md key | Our token |
|---|---|
| `typography.{role}.fontFamily` | Set `--font-sans` once at the top of the theme block if it differs from the default Plus Jakarta Sans stack |
| `typography.{role}.fontSize` | `--type-{role}-size` |
| `typography.{role}.fontWeight` | `--type-{role}-weight` |
| `typography.{role}.lineHeight` | `--type-{role}-leading` |
| `typography.{role}.letterSpacing` | `--type-{role}-tracking` |
| `typography.*.fontFeature` (global use, e.g. `ss01`) | `--font-feature-default` |
| `typography.body-tabular.fontFeature: tnum` | `--font-feature-tabular` (already `"tnum"` in base) |

Roles available: `display-xxl`, `display-xl`, `display-lg`, `display-md`, `body-tabular`, `micro`, `micro-cap`. Use their utility classes (`.ui-display-xxl`, `.ui-body-tabular`, …) in templates.

### Decorations

| DESIGN.md content | Our token |
|---|---|
| Decorative gradient mesh / hero backdrop described in the Overview or Elevation sections | `--gradient-hero` (CSS gradient or `url(...)`) |

For brands whose backdrop is an organic SVG mesh that can't be expressed as a flat CSS gradient, render it as a best-effort `linear-gradient(...)` approximation and note the limitation in a comment in the theme file. Authoring the SVG mesh as a `background-image: url(...)` is also valid if the asset is bundled.

## How the skill uses these rules

1. Fetches the raw DESIGN.md from the awesome-design-md repository.
2. Parses the YAML frontmatter for structured tokens.
3. Reads the narrative sections to disambiguate decorative vs. semantic colors.
4. Applies the mapping above to produce `styles/lib/themes/<brand>.css` with `.theme-<brand> { ... }`.
5. Emits only tokens that differ from the base (keeps each theme file lean).
6. Adds the import line in `styles/index.css` and registers the theme in `apps/storybook/.storybook/preview.ts`.
7. Reports which tokens were dropped or need manual review.
