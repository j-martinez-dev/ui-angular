# Angular Aria Migration Design

Integrate `@angular/aria` into existing UI components to replace manual keyboard navigation and ARIA attribute management with headless directives.

## Scope

**In scope (5 components):**

1. Tabs → `@angular/aria/tabs`
2. Dropdown Menu → `@angular/aria/menu`
3. Select → `@angular/aria/listbox`
4. Multi-Select → `@angular/aria/listbox`
5. Autocomplete → `@angular/aria/listbox`

**Out of scope:**

- Accordion (uses native `<details>/<summary>`, minimal ARIA code)

## Approach

Component-by-component migration in order of complexity. Each component is built, tested, and verified in isolation before moving to the next.

**Migration order:** Tabs → Dropdown Menu → Select → Multi-Select → Autocomplete

## Strategy: CDK Overlay + @angular/aria layering

Components that use CDK Overlay for panel positioning (Dropdown Menu, Select, Multi-Select, Autocomplete) keep CDK Overlay for positioning and apply `@angular/aria` directives to the overlay content for keyboard navigation and ARIA management.

## Component Designs

### 1. Tabs

**Directives:** `ngTabs`, `ngTabList`, `ngTab`, `ngTabPanel`

**Remove:**

- `onKeydown()` method (~25 lines)
- `moveFocus()`, `focusFirst()`, `focusLast()`, `focusTabButton()` methods (~35 lines)
- `viewChildren('tabBtn')` query
- `activeTabId` / `activePanelId` computed signals (IDs managed by directives)
- All manual template bindings: `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `tabindex`

**Keep:**

- `selectTab()`, `activeTabValue` linkedSignal, `activeValueChange` output
- Icon rendering, size/variant CSS classes
- All SCSS unchanged

**Template after:**

```html
<div ngTabs class="tabs" [class.tabs--vertical]="orientation() === 'vertical'"
     [class.tabs--horizontal]="orientation() === 'horizontal'">
  <ul ngTabList class="tabs-strip"
      [class.tabs-strip--pill]="variant() === 'pill'"
      [attr.aria-orientation]="orientation()">
    @for (tab of tabs(); track tab.value) {
      <li ngTab [value]="tab.value" class="tab"
          [class.tab--active]="activeTabValue() === tab.value"
          [class.tab--disabled]="tab.disabled"
          [class.tab--line]="variant() === 'line'"
          [class.tab--pill]="variant() === 'pill'"
          [disabled]="tab.disabled"
          (click)="selectTab(tab.value)">
        @if (tab.icon) {
          <ui-icon [name]="tab.icon" [size]="iconSize()" />
        }
        <span>{{ tab.label }}</span>
      </li>
    }
  </ul>
</div>
```

**Estimated savings:** ~70 lines

---

### 2. Dropdown Menu

**Directives:** `ngMenu`, `ngMenuItem` (on overlay panel content)

**Remove:**

- `onPanelKeydown()` method (~25 lines)
- `moveFocus()` method (~10 lines)
- `focusedIndex` signal
- Manual `role="menu"` on panel, `aria-haspopup`/`aria-expanded` bindings on trigger
- `UiMenuItemComponent.focus()` method and `role="menuitem"` binding

**Keep:**

- CDK Overlay lifecycle: `open()`, `close()`, `createOverlay()`, `buildPositionStrategy()`
- `DROPDOWN_MENU` injection token (menu items call `close()` on click)
- `isOpen` signal for trigger state
- `afterNextRender()` initial focus logic

**Trigger approach:** Keep `aria-haspopup`/`aria-expanded` manual on the trigger (just 2 attributes) to avoid conflict between `ngMenuTrigger` popup control and CDK Overlay.

**Panel template after:**

```html
<ng-template #panelTpl>
  <ul ngMenu class="menu-panel">
    <ng-content />
  </ul>
</ng-template>
```

**Menu item template after:**

```html
<li ngMenuItem [value]="variant()" [disabled]="disabled()"
    class="menu-item" (click)="onItemClick()">
  @if (icon()) {
    <ui-icon [name]="icon()!" size="sm" />
  }
  <span class="menu-item-label">
    <ng-content />
  </span>
</li>
```

**Estimated savings:** ~40 lines

---

### 3. Select

**Directives:** `ngListbox`, `ngOption` (on overlay panel content)

**Remove:**

- `onKeydown()` within-panel navigation (ArrowUp/Down delegation to `moveFocus`)
- `focusedIndex` / `focusedOptionId` from component and `SelectOverlayController`
- `moveFocus()`, `scrollToFocused()` from `SelectOverlayController`
- Manual `role="listbox"`, `role="option"`, `aria-selected`, `aria-activedescendant` bindings

**Keep:**

- CDK Overlay via `SelectOverlayController` (thin wrapper: open/close/destroy/isTruncated)
- `onKeydown()` simplified to open/close only: Enter/Space toggle, ArrowDown open, Escape/Tab close
- Trigger ARIA: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"` (3 manual attributes)
- `filteredOptions` computed, `searchable` feature, variant/size styling

**SelectOverlayController after (thin wrapper):**

```typescript
export class SelectOverlayController<T> {
  readonly isOpen = signal(false);
  readonly searchQuery = signal('');
  readonly panelId = `ui-select-panel-${nextPanelId++}`;

  open(triggerEl, panelTpl) { /* CDK attach */ }
  close(triggerEl?) { /* CDK detach + focus return */ }
  destroy() { /* CDK dispose */ }
  isTruncated(el) { /* unchanged */ }
}
```

**Panel template after:**

```html
<ng-template #panelTpl>
  <div class="select-panel">
    @if (searchable()) {
      <div class="select-search">
        <ui-input type="search" size="sm" [(value)]="searchQuery" placeholder="Rechercher..." />
      </div>
    }
    <ul ngListbox [(values)]="value" class="select-options">
      @for (option of filteredOptions(); track option.value) {
        <li ngOption [value]="option.value" [disabled]="option.disabled"
            class="select-option"
            [class.select-option--selected]="isSelected(option)"
            (click)="selectOption(option)">
          <span>{{ option.label }}</span>
          @if (isSelected(option)) {
            <ui-icon name="heroCheck" size="sm" color="primary" />
          }
        </li>
      } @empty {
        <div class="select-empty">Aucune option trouvée</div>
      }
    </ul>
  </div>
</ng-template>
```

**Estimated savings:** ~35 lines (component) + ~25 lines (controller)

---

### 4. Multi-Select

Same approach as Select with two differences:

- `ngListbox [multi]="true"`
- `[(values)]` binds to `T[]` array instead of `T | null`

**Remove/Keep:** Same as Select.

**Panel template after:**

```html
<ul ngListbox [(values)]="value" [multi]="true" class="select-options">
  @for (option of filteredOptions(); track option.value) {
    <li ngOption [value]="option.value" [disabled]="option.disabled"
        class="select-option"
        [class.select-option--selected]="isSelected(option)"
        (click)="toggleOption(option)">
      <ui-checkbox [checked]="isSelected(option)" size="sm" />
      <span>{{ option.label }}</span>
    </li>
  } @empty {
    <div class="select-empty">Aucune option trouvée</div>
  }
</ul>
```

**Estimated savings:** ~30 lines

---

### 5. Autocomplete

**Directives:** `ngListbox`, `ngOption` (on overlay panel content)

**Remove:**

- `moveFocus()` method (~15 lines)
- `focusedIndex` / `focusedOptionId` signals and computed
- Manual `role="listbox"`, `role="option"`, `aria-selected` bindings

**Keep:**

- CDK Overlay lifecycle (standalone, not shared controller)
- Input trigger ARIA: `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"`, `aria-controls`, `aria-label`, `aria-invalid`
- `onInput()`, `onFocus()`, `onBlur()`, debounce logic, `clearInput()`
- Loading and empty states

**Key concern:** Focus stays on the `<input>` while the user types. `ngListbox` may expect focus on the list for keyboard navigation. If `ngListbox` uses roving tabindex, arrow keys won't reach it.

**Strategy:** Keep `ArrowDown`/`ArrowUp`/`Enter` handlers on the input that programmatically interact with the listbox. If `ngListbox` exposes an API for moving active option, use it. Otherwise, keep `moveFocus()` for autocomplete only and use `ngOption` purely for `aria-selected` management.

**Fallback:** If `ngListbox` doesn't support external keyboard delegation, Autocomplete keeps its keyboard code and only gains semantic directives on options.

**Estimated savings:** ~25-35 lines (depends on `ngListbox` API)

---

## SCSS Impact

No SCSS changes required. All styling targets CSS classes, not ARIA attributes. The `@angular/aria` directives add ARIA attributes automatically, but existing CSS doesn't depend on them (it uses `.tab--active`, `.select-option--focused`, etc.).

**Exception:** If we choose to style via ARIA attributes (e.g., `[aria-selected="true"]` instead of `.select-option--selected`), we could further simplify templates by removing redundant CSS classes. This is optional and can be evaluated per component.

## Testing Strategy

Each component migration is verified with:

1. `ng build` — no compilation errors
2. Storybook — visual regression check (Docs, Playground, Variants stories)
3. Keyboard navigation — manual verification of Arrow keys, Home/End, Escape, Tab, Enter/Space
4. Screen reader — verify ARIA attributes are correctly applied by directives

## Total Estimated Impact

| Component | Lines removed | Lines added (directives) | Net savings |
|---|---|---|---|
| Tabs | ~70 | ~5 | ~65 |
| Dropdown Menu | ~40 | ~5 | ~35 |
| Select | ~60 | ~5 | ~55 |
| Multi-Select | ~30 | ~3 | ~27 |
| Autocomplete | ~25-35 | ~3 | ~22-32 |
| **Total** | **~225-235** | **~21** | **~204-214** |

## Risks

1. **`ngListbox` focus model vs combobox pattern** — `ngListbox` may use roving tabindex which conflicts with focus-on-trigger/input. Mitigated by keeping trigger keyboard handlers and using `ngListbox` only for ARIA semantics.
2. **`ngMenu` + CDK Overlay** — `ngMenuTrigger` may try to control popup visibility. Mitigated by not using `ngMenuTrigger` and only applying `ngMenu`/`ngMenuItem` to panel content.
3. **`@angular/aria` is new** — Angular 21.2 package, may have rough edges. Mitigated by component-by-component approach allowing early detection and fallback.
