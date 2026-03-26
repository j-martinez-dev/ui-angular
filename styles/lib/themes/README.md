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
    pastel: 'theme-pastel',
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
