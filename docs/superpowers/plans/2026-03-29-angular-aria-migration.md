# @angular/aria Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace manual keyboard navigation and ARIA attribute management in 5 components with `@angular/aria` headless directives.

**Architecture:** Component-by-component migration — Tabs first (no overlay), then Dropdown Menu, Select, Multi-Select, and Autocomplete (all CDK Overlay). CDK Overlay stays for positioning; `@angular/aria` handles keyboard nav + ARIA semantics.

**Tech Stack:** Angular 21.2, `@angular/aria`, `@angular/cdk/overlay`, Nx monorepo

---

### Task 0: Install @angular/aria

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

Run:
```bash
npm install @angular/aria
```

- [ ] **Step 2: Verify installation**

Run:
```bash
npx ng build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @angular/aria"
```

---

### Task 1: Migrate Tabs to @angular/aria/tabs

**Files:**
- Modify: `libs/shared-ui/tabs/src/tabs.component.ts`
- Modify: `libs/shared-ui/tabs/src/tabs.component.html`
- No SCSS changes

- [ ] **Step 1: Update the component TypeScript**

Replace the full content of `libs/shared-ui/tabs/src/tabs.component.ts` with:

```typescript
import {
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { Tab, Tabs, TabList } from '@angular/aria/tabs';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { type TabItem } from './tabs.types';

export type TabsVariant = 'line' | 'pill';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsSize = 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<TabsSize, IconSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
};

@Component({
  selector: 'ui-tabs',
  imports: [UiIconComponent, Tabs, TabList, Tab],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
  },
})
export class UiTabsComponent<T = string> {
  tabs = input<TabItem<T>[]>([]);
  activeValue = input<T>();
  variant = input<TabsVariant>('line');
  orientation = input<TabsOrientation>('horizontal');
  size = input<TabsSize>('md');
  activation = input<'automatic' | 'manual'>('automatic');

  activeValueChange = output<T>();

  activeTabValue = linkedSignal<T | null>(() => {
    const explicit = this.activeValue();
    if (explicit !== undefined) return explicit as T;
    const firstEnabled = this.tabs().find(t => !t.disabled);
    return firstEnabled?.value ?? null;
  });

  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);

  selectTab(value: T): void {
    this.activeTabValue.set(value);
    this.activeValueChange.emit(value);
  }
}
```

Key changes:
- Removed: `onKeydown()`, `moveFocus()`, `focusFirst()`, `focusLast()`, `focusTabButton()`, `viewChildren`, `ElementRef` import, `activeTabId`, `activePanelId`
- Added: `Tabs`, `TabList`, `Tab` imports from `@angular/aria/tabs`

- [ ] **Step 2: Update the template**

Replace the full content of `libs/shared-ui/tabs/src/tabs.component.html` with:

```html
<div
  ngTabs
  class="tabs"
  [class.tabs--vertical]="orientation() === 'vertical'"
  [class.tabs--horizontal]="orientation() === 'horizontal'"
>
  <div
    ngTabList
    class="tabs-strip"
    [class.tabs-strip--pill]="variant() === 'pill'"
  >
    @for (tab of tabs(); track tab.value) {
      <button
        ngTab
        [value]="'' + tab.value"
        class="tab"
        [class.tab--active]="activeTabValue() === tab.value"
        [class.tab--disabled]="tab.disabled"
        [class.tab--line]="variant() === 'line'"
        [class.tab--pill]="variant() === 'pill'"
        [disabled]="tab.disabled ?? false"
        (click)="selectTab(tab.value)"
      >
        @if (tab.icon) {
          <ui-icon [name]="tab.icon" [size]="iconSize()" />
        }
        <span>{{ tab.label }}</span>
      </button>
    }
  </div>
</div>
```

Key changes:
- `role="tablist"`, `[attr.aria-orientation]`, `role="tab"`, `[attr.aria-selected]`, `[attr.aria-controls]`, `[attr.tabindex]`, `(keydown)` — all removed
- `ngTabs`, `ngTabList`, `ngTab` directives added
- `[value]` uses string coercion (`'' + tab.value`) since `ngTab` expects string values
- Removed `#tabBtn` template references (no longer needed for programmatic focus)

- [ ] **Step 3: Build and verify**

Run:
```bash
npx ng build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 4: Visual check in Storybook**

Run:
```bash
npx storybook dev
```

Navigate to **Shared UI / Tabs**. Verify:
- All three stories render (Docs, Playground, Variants)
- Line and pill variants display correctly
- Horizontal and vertical orientations work
- Keyboard navigation works: Arrow keys move between tabs, Home/End go to first/last, disabled tabs are skipped
- Focus ring appears on focused tab

- [ ] **Step 5: Commit**

```bash
git add libs/shared-ui/tabs/src/tabs.component.ts libs/shared-ui/tabs/src/tabs.component.html
git commit -m "refactor(tabs): migrate to @angular/aria/tabs directives

Replace manual keyboard navigation (onKeydown, moveFocus, focusFirst,
focusLast, focusTabButton) and ARIA attribute management (role, aria-selected,
aria-controls, tabindex) with ngTabs, ngTabList, and ngTab directives."
```

---

### Task 2: Migrate Dropdown Menu to @angular/aria/menu

**Files:**
- Modify: `libs/shared-ui/dropdown-menu/src/dropdown-menu.component.ts`
- Modify: `libs/shared-ui/dropdown-menu/src/dropdown-menu.component.html`
- Modify: `libs/shared-ui/dropdown-menu/src/menu-item.component.ts`
- Modify: `libs/shared-ui/dropdown-menu/src/menu-item.component.html`
- No SCSS changes

- [ ] **Step 1: Update the dropdown menu component TypeScript**

Replace the full content of `libs/shared-ui/dropdown-menu/src/dropdown-menu.component.ts` with:

```typescript
import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Injector,
  input,
  OnDestroy,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Menu, MenuItem } from '@angular/aria/menu';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import { DROPDOWN_MENU, type DropdownMenuRef } from './dropdown-menu.token';

export type DropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

const POSITION_MAP: Record<
  DropdownPosition,
  { originX: 'start' | 'end'; originY: 'top' | 'bottom'; overlayX: 'start' | 'end'; overlayY: 'top' | 'bottom' }
> = {
  'bottom-start': { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
  'bottom-end': { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
  'top-start': { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
  'top-end': { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
};

@Component({
  selector: 'ui-dropdown-menu',
  imports: [UiIconButtonComponent, Menu, MenuItem],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: DROPDOWN_MENU, useExisting: UiDropdownMenuComponent }],
})
export class UiDropdownMenuComponent implements DropdownMenuRef, OnDestroy {
  icon = input<string>('heroEllipsisVertical');
  label = input<string>('Ouvrir le menu');
  triggerVariant = input<'primary' | 'secondary' | 'ghost' | 'danger'>('ghost');
  triggerSize = input<'sm' | 'md' | 'lg'>('md');
  position = input<DropdownPosition>('bottom-end');
  disabled = input<boolean>(false);

  isOpen = signal(false);

  private triggerEl = viewChild('triggerRef', { read: ElementRef });
  private panelTpl = viewChild<TemplateRef<unknown>>('panelTpl');

  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  private backdropSub: { unsubscribe(): void } | null = null;

  ngOnDestroy(): void {
    this.backdropSub?.unsubscribe();
    this.overlayRef?.dispose();
  }

  toggleMenu(): void {
    if (this.disabled()) return;
    this.isOpen() ? this.close() : this.open();
  }

  // ── Private ─────────────────────────────────────────────────────────────

  private open(): void {
    if (this.isOpen()) return;

    const triggerEl = this.triggerEl();
    const panelTpl = this.panelTpl();
    if (!triggerEl || !panelTpl) return;

    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay(triggerEl);
    } else {
      this.updateOverlayPosition(triggerEl);
    }

    const portal = new TemplatePortal(panelTpl, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);

    this.backdropSub = this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close(): void {
    if (!this.isOpen()) return;
    this.backdropSub?.unsubscribe();
    this.backdropSub = null;
    this.overlayRef?.detach();
    this.isOpen.set(false);

    // Return focus to the trigger
    const trigger = this.triggerEl()?.nativeElement?.querySelector('button');
    trigger?.focus();
  }

  private createOverlay(triggerEl: ElementRef<HTMLElement>): OverlayRef {
    return this.overlay.create({
      positionStrategy: this.buildPositionStrategy(triggerEl),
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private updateOverlayPosition(triggerEl: ElementRef<HTMLElement>): void {
    this.overlayRef!.updatePositionStrategy(this.buildPositionStrategy(triggerEl));
  }

  private buildPositionStrategy(triggerEl: ElementRef<HTMLElement>) {
    const pos = POSITION_MAP[this.position()];
    const offsetY = pos.overlayY === 'top' ? 4 : -4;

    return this.overlay
      .position()
      .flexibleConnectedTo(triggerEl)
      .withPositions([
        { originX: pos.originX, originY: pos.originY, overlayX: pos.overlayX, overlayY: pos.overlayY, offsetY },
      ]);
  }
}
```

Key changes:
- Removed: `onPanelKeydown()`, `moveFocus()`, `focusedIndex`, `contentChildren(UiMenuItemComponent)`, `afterNextRender` initial focus call
- Removed: `UiMenuItemComponent` from `contentChildren` import
- Added: `Menu`, `MenuItem` imports from `@angular/aria/menu`
- CDK Overlay lifecycle stays identical

- [ ] **Step 2: Update the dropdown menu template**

Replace the full content of `libs/shared-ui/dropdown-menu/src/dropdown-menu.component.html` with:

```html
<div class="dropdown-menu">
  <ui-icon-button
    #triggerRef
    [icon]="icon()"
    [label]="label()"
    [variant]="triggerVariant()"
    [size]="triggerSize()"
    [disabled]="disabled()"
    [attr.aria-haspopup]="'menu'"
    [attr.aria-expanded]="isOpen()"
    (click)="toggleMenu()"
  />
</div>

<ng-template #panelTpl>
  <div
    ngMenu
    class="menu-panel"
  >
    <ng-content />
  </div>
</ng-template>
```

Key changes:
- Removed: `role="menu"`, `(keydown)="onPanelKeydown($event)"`
- Added: `ngMenu` directive on the panel `<div>`
- Kept: `aria-haspopup` and `aria-expanded` manual on trigger (avoids conflict with CDK Overlay)

- [ ] **Step 3: Update the menu item component TypeScript**

Replace the full content of `libs/shared-ui/dropdown-menu/src/menu-item.component.ts` with:

```typescript
import {
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { DROPDOWN_MENU } from './dropdown-menu.token';

@Component({
  selector: 'ui-menu-item',
  imports: [UiIconComponent],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class UiMenuItemComponent {
  icon = input<string>();
  variant = input<'default' | 'danger'>('default');
  disabled = input<boolean>(false);

  itemClick = output<void>();

  private readonly dropdownMenu = inject(DROPDOWN_MENU, { optional: true });

  protected onItemClick(): void {
    this.itemClick.emit();
    this.dropdownMenu?.close();
  }
}
```

Key changes:
- Removed: `focus()` method, `btnRef` viewChild, `ElementRef`/`viewChild` imports
- `ngMenuItem` directive on the template handles focus management

- [ ] **Step 4: Update the menu item template**

Replace the full content of `libs/shared-ui/dropdown-menu/src/menu-item.component.html` with:

```html
<button
  ngMenuItem
  class="menu-item"
  [class.menu-item--danger]="variant() === 'danger'"
  [class.menu-item--disabled]="disabled()"
  [disabled]="disabled()"
  (click)="onItemClick()"
>
  @if (icon()) {
    <ui-icon [name]="icon()!" size="sm" />
  }
  <span class="menu-item-label">
    <ng-content />
  </span>
</button>
```

Key changes:
- Removed: `#btnRef`, `role="menuitem"`
- Added: `ngMenuItem` directive (handles role, focus, keyboard nav)

- [ ] **Step 5: Add MenuItem import to menu-item component**

The `UiMenuItemComponent` needs to import `MenuItem` from `@angular/aria/menu`. Update the imports array in `libs/shared-ui/dropdown-menu/src/menu-item.component.ts`:

```typescript
import { MenuItem } from '@angular/aria/menu';
// ...
@Component({
  // ...
  imports: [UiIconComponent, MenuItem],
  // ...
})
```

Full updated file for `libs/shared-ui/dropdown-menu/src/menu-item.component.ts`:

```typescript
import {
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { MenuItem } from '@angular/aria/menu';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { DROPDOWN_MENU } from './dropdown-menu.token';

@Component({
  selector: 'ui-menu-item',
  imports: [UiIconComponent, MenuItem],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class UiMenuItemComponent {
  icon = input<string>();
  variant = input<'default' | 'danger'>('default');
  disabled = input<boolean>(false);

  itemClick = output<void>();

  private readonly dropdownMenu = inject(DROPDOWN_MENU, { optional: true });

  protected onItemClick(): void {
    this.itemClick.emit();
    this.dropdownMenu?.close();
  }
}
```

- [ ] **Step 6: Build and verify**

Run:
```bash
npx ng build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 7: Visual check in Storybook**

Run Storybook and navigate to **Shared UI / DropdownMenu**. Verify:
- All three stories render (Docs, Playground, Variants)
- Menu opens on click, closes on backdrop click and Escape
- Keyboard: ArrowDown/Up navigates items, Escape closes, disabled items are skipped
- Focus returns to trigger on close
- Separators still render correctly between menu items

- [ ] **Step 8: Commit**

```bash
git add libs/shared-ui/dropdown-menu/src/dropdown-menu.component.ts libs/shared-ui/dropdown-menu/src/dropdown-menu.component.html libs/shared-ui/dropdown-menu/src/menu-item.component.ts libs/shared-ui/dropdown-menu/src/menu-item.component.html
git commit -m "refactor(dropdown-menu): migrate to @angular/aria/menu directives

Replace manual keyboard navigation (onPanelKeydown, moveFocus, focusedIndex)
and ARIA management (role=menu, role=menuitem) with ngMenu and ngMenuItem
directives. CDK Overlay retained for positioning."
```

---

### Task 3: Slim down SelectOverlayController

**Files:**
- Modify: `libs/shared-forms/select/src/select-overlay.ts`

- [ ] **Step 1: Replace SelectOverlayController with thin CDK wrapper**

Replace the full content of `libs/shared-forms/select/src/select-overlay.ts` with:

```typescript
import {
  ElementRef,
  signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

let nextPanelId = 0;

export class SelectOverlayController<T = unknown> {
  readonly isOpen = signal<boolean>(false);
  readonly searchQuery = signal<string>('');
  readonly panelId = `ui-select-panel-${nextPanelId++}`;

  private overlayRef: OverlayRef | null = null;
  private backdropSub: { unsubscribe(): void } | null = null;

  constructor(
    private readonly overlay: Overlay,
    private readonly viewContainerRef: ViewContainerRef,
  ) {}

  destroy(): void {
    this.backdropSub?.unsubscribe();
    this.overlayRef?.dispose();
  }

  isTruncated(el: HTMLElement): boolean {
    return el.scrollWidth > el.clientWidth;
  }

  open(
    triggerEl: ElementRef<HTMLElement> | undefined,
    panelTpl: TemplateRef<unknown> | undefined,
  ): void {
    if (this.isOpen()) return;
    if (!triggerEl || !panelTpl) return;

    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay(triggerEl);
    }

    this.overlayRef.updateSize({ width: triggerEl.nativeElement.offsetWidth });

    const portal = new TemplatePortal(panelTpl, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);
    this.searchQuery.set('');

    this.backdropSub = this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close(triggerEl?: ElementRef<HTMLElement>): void {
    if (!this.isOpen()) return;
    this.backdropSub?.unsubscribe();
    this.backdropSub = null;
    this.overlayRef?.detach();
    this.isOpen.set(false);
    triggerEl?.nativeElement.focus();
  }

  private createOverlay(triggerEl: ElementRef<HTMLElement>): OverlayRef {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerEl)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
      ]);

    return this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }
}
```

Key changes:
- Removed: `focusedIndex` signal, `focusedOptionId()` method, `moveFocus()` method, `scrollToFocused()` method, `toggle()` method
- Removed: `SelectOption` type import (no longer needed)
- `open()` signature simplified — removed `initialFocusIndex` parameter
- Pure CDK Overlay lifecycle wrapper

- [ ] **Step 2: Build and verify**

Run:
```bash
npx ng build
```

Expected: Build WILL FAIL because Select and Multi-Select still reference removed methods (`moveFocus`, `focusedIndex`, `focusedOptionId`). This is expected — we fix them in Tasks 4 and 5.

- [ ] **Step 3: Commit (work-in-progress)**

```bash
git add libs/shared-forms/select/src/select-overlay.ts
git commit -m "refactor(select): slim SelectOverlayController to thin CDK wrapper

Remove keyboard/focus logic (moveFocus, focusedIndex, focusedOptionId,
scrollToFocused) — these will be handled by @angular/aria/listbox directives."
```

---

### Task 4: Migrate Select to @angular/aria/listbox

**Files:**
- Modify: `libs/shared-forms/select/src/select.component.ts`
- Modify: `libs/shared-forms/select/src/select.component.html`
- No SCSS changes

- [ ] **Step 1: Update the Select component TypeScript**

Replace the full content of `libs/shared-forms/select/src/select.component.ts` with:

```typescript
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormValueControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import { Overlay } from '@angular/cdk/overlay';
import { Listbox, Option } from '@angular/aria/listbox';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { UiInputComponent } from '@ui/shared-forms/input';
import { UiTooltipDirective } from '@ui/shared-ui/tooltip';
import { type SelectOption } from './select.types';
import { FORM_FIELD_VARIANT_MAP, type FormFieldVariant } from '@ui/shared-forms/input';
import { SelectOverlayController } from './select-overlay';

export type SelectVariant = FormFieldVariant;
export type SelectSize = 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<SelectSize, IconSize> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

const HEIGHT_MAP: Record<SelectSize, string> = {
  sm: 'calc(var(--spacing) * 8)',
  md: 'calc(var(--spacing) * 10)',
  lg: 'calc(var(--spacing) * 12)',
};

@Component({
  selector: 'ui-select',
  imports: [UiIconComponent, UiInputComponent, UiTooltipDirective, Listbox, Option],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[style.--select-bg]': 'variantStyles().bg',
    '[style.--select-border]': 'variantStyles().border',
    '[style.--select-focus-border]': 'variantStyles().focusBorder',
    '[style.--select-invalid-border]': 'variantStyles().invalidBorder',
    '[style.--select-height]': 'heightValue()',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.variant-filled]': 'variant() === "filled"',
    '[class.variant-ghost]': 'variant() === "ghost"',
  },
})
export class UiSelectComponent<T = unknown> implements FormValueControl<T | null>, OnDestroy {
  value = model<T | null>(null);
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  required = input<boolean>(false);

  options = input<SelectOption<T>[]>([]);
  placeholder = input<string>('Sélectionnez une option');
  variant = input<SelectVariant>('outlined');
  size = input<SelectSize>('md');
  searchable = input<boolean>(false);
  id = input<string>();

  protected readonly oc = new SelectOverlayController<T>(inject(Overlay), inject(ViewContainerRef));
  protected readonly isOpen = this.oc.isOpen;
  protected readonly searchQuery = this.oc.searchQuery;
  protected readonly panelId = this.oc.panelId;

  private triggerEl = viewChild<ElementRef<HTMLElement>>('trigger');
  private panelTpl = viewChild<unknown>('panelTpl');

  protected variantStyles = computed(() => FORM_FIELD_VARIANT_MAP[this.variant()]);
  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
  protected heightValue = computed(() => HEIGHT_MAP[this.size()]);

  protected selectedLabel = computed(() =>
    this.options().find(o => o.value === this.value())?.label ?? null,
  );

  protected filteredOptions = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return q ? this.options().filter(o => o.label.toLowerCase().includes(q)) : this.options();
  });

  ngOnDestroy(): void {
    this.oc.destroy();
  }

  isSelected(option: SelectOption<T>): boolean {
    return option.value === this.value();
  }

  isTruncated(el: HTMLElement): boolean {
    return this.oc.isTruncated(el);
  }

  toggleDropdown(): void {
    if (this.disabled() || this.readonly()) return;
    if (this.isOpen()) {
      this.oc.close(this.triggerEl());
    } else {
      this.oc.open(this.triggerEl(), this.panelTpl() as any);
    }
  }

  selectOption(option: SelectOption<T>): void {
    if (option.disabled) return;
    this.value.set(option.value);
    this.oc.close(this.triggerEl());
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggleDropdown();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggleDropdown();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggleDropdown();
        }
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.oc.close(this.triggerEl());
        }
        break;
      case 'Tab':
        if (this.isOpen()) {
          this.oc.close(this.triggerEl());
        }
        break;
    }
  }
}
```

Key changes:
- Removed: `focusedIndex`, `focusedOptionId` (handled by `ngListbox`)
- Added: `Listbox`, `Option` imports from `@angular/aria/listbox`
- `onKeydown()` simplified to open/close only — no within-panel navigation
- `toggleDropdown()` no longer passes `initialFocusIndex` to `oc.open()`

- [ ] **Step 2: Update the Select template**

Replace the full content of `libs/shared-forms/select/src/select.component.html` with:

```html
@if (!hidden()) {
  <div
    #trigger
    class="select-trigger"
    [class.select-trigger--open]="isOpen()"
    [class.select-trigger--disabled]="disabled()"
    [class.select-trigger--readonly]="readonly()"
    [class.select-trigger--invalid]="invalid()"
    [attr.aria-expanded]="isOpen()"
    [attr.aria-haspopup]="'listbox'"
    [attr.id]="id() || null"
    role="combobox"
    tabindex="0"
    (click)="toggleDropdown()"
    (keydown)="onKeydown($event)"
    (blur)="touched.set(true)"
  >
    <span
      #valueLabel
      class="select-value"
      [class.select-value--placeholder]="!value()"
      [uiTooltip]="selectedLabel() ?? ''"
      uiTooltipPosition="top"
      [uiTooltipDisabled]="!value() || !isTruncated(valueLabel)"
    >
      {{ selectedLabel() ?? placeholder() }}
    </span>
    <ui-icon
      name="heroChevronDown"
      [size]="iconSize()"
      color="muted"
      class="select-chevron"
      [class.select-chevron--open]="isOpen()"
    />
  </div>

  <ng-template #panelTpl>
    <div class="select-panel">
      @if (searchable()) {
        <div class="select-search">
          <ui-input type="search" size="sm" [(value)]="searchQuery" placeholder="Rechercher..." />
        </div>
      }
      <div ngListbox class="select-options">
        @for (option of filteredOptions(); track option.value; let i = $index) {
          <div
            ngOption
            [value]="'' + option.value"
            class="select-option"
            [class.select-option--selected]="isSelected(option)"
            [class.select-option--disabled]="option.disabled"
            [attr.id]="panelId + '-option-' + i"
            (click)="selectOption(option)"
          >
            <span
              #optionLabel
              [uiTooltip]="option.label"
              uiTooltipPosition="right"
              [uiTooltipDisabled]="!isTruncated(optionLabel)"
            >{{ option.label }}</span>
            @if (isSelected(option)) {
              <ui-icon name="heroCheck" size="sm" color="primary" />
            }
          </div>
        } @empty {
          <div class="select-empty">Aucune option trouvée</div>
        }
      </div>
    </div>
  </ng-template>
}
```

Key changes:
- Removed: `role="listbox"` on panel, `role="option"` on options, `[attr.aria-selected]`, `[attr.aria-activedescendant]` on trigger, `(mouseenter)` focus tracking, `[class.select-option--focused]`
- Added: `ngListbox` on options container, `ngOption` with `[value]` on each option
- Trigger keeps manual `role="combobox"`, `aria-expanded`, `aria-haspopup` (3 attributes)

- [ ] **Step 3: Build and verify**

Run:
```bash
npx ng build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 4: Visual check in Storybook**

Navigate to **Shared Forms / Select**. Verify:
- All three stories render (Docs, Playground, Variants)
- Dropdown opens on click, Enter, Space, ArrowDown
- Keyboard: Arrow keys navigate options in dropdown, Escape/Tab closes
- Selected option shows check icon
- Searchable mode filters options
- Disabled options cannot be selected
- Tooltip shows on truncated labels

- [ ] **Step 5: Commit**

```bash
git add libs/shared-forms/select/src/select.component.ts libs/shared-forms/select/src/select.component.html
git commit -m "refactor(select): migrate panel to @angular/aria/listbox directives

Replace manual focus tracking (focusedIndex, focusedOptionId, moveFocus)
and ARIA attributes (role=listbox, role=option, aria-selected) with
ngListbox and ngOption directives. Trigger ARIA kept manual."
```

---

### Task 5: Migrate Multi-Select to @angular/aria/listbox

**Files:**
- Modify: `libs/shared-forms/multi-select/src/multi-select.component.ts`
- Modify: `libs/shared-forms/multi-select/src/multi-select.component.html`
- No SCSS changes

- [ ] **Step 1: Update the Multi-Select component TypeScript**

Replace the full content of `libs/shared-forms/multi-select/src/multi-select.component.ts` with:

```typescript
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormValueControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import { Overlay } from '@angular/cdk/overlay';
import { Listbox, Option } from '@angular/aria/listbox';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { UiInputComponent } from '@ui/shared-forms/input';
import { UiCheckboxComponent } from '@ui/shared-forms/checkbox';
import { UiTooltipDirective } from '@ui/shared-ui/tooltip';
import { type SelectOption, SelectOverlayController } from '@ui/shared-forms/select';
import { FORM_FIELD_VARIANT_MAP, type FormFieldVariant } from '@ui/shared-forms/input';

export type MultiSelectVariant = FormFieldVariant;
export type MultiSelectSize = 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<MultiSelectSize, IconSize> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

const HEIGHT_MAP: Record<MultiSelectSize, string> = {
  sm: 'calc(var(--spacing) * 8)',
  md: 'calc(var(--spacing) * 10)',
  lg: 'calc(var(--spacing) * 12)',
};

@Component({
  selector: 'ui-multi-select',
  imports: [UiIconComponent, UiInputComponent, UiCheckboxComponent, UiTooltipDirective, Listbox, Option],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[style.--select-bg]': 'variantStyles().bg',
    '[style.--select-border]': 'variantStyles().border',
    '[style.--select-focus-border]': 'variantStyles().focusBorder',
    '[style.--select-invalid-border]': 'variantStyles().invalidBorder',
    '[style.--select-height]': 'heightValue()',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.variant-filled]': 'variant() === "filled"',
    '[class.variant-ghost]': 'variant() === "ghost"',
  },
})
export class UiMultiSelectComponent<T = unknown> implements FormValueControl<T[]>, OnDestroy {
  // Signal Forms contract
  value = model<T[]>([]);
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  required = input<boolean>(false);

  // Additional inputs
  options = input<SelectOption<T>[]>([]);
  placeholder = input<string>('Sélectionnez des options');
  variant = input<MultiSelectVariant>('outlined');
  size = input<MultiSelectSize>('md');
  searchable = input<boolean>(false);
  maxLabels = input<number>(1);
  id = input<string>();

  protected readonly oc = new SelectOverlayController<T>(inject(Overlay), inject(ViewContainerRef));
  protected readonly isOpen = this.oc.isOpen;
  protected readonly searchQuery = this.oc.searchQuery;
  protected readonly panelId = this.oc.panelId;

  private triggerEl = viewChild<ElementRef<HTMLElement>>('trigger');
  private panelTpl = viewChild<unknown>('panelTpl');

  protected variantStyles = computed(() => FORM_FIELD_VARIANT_MAP[this.variant()]);
  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
  protected heightValue = computed(() => HEIGHT_MAP[this.size()]);

  protected triggerLabel = computed(() => {
    const selected = this.value();
    if (selected.length === 0) return null;
    const labels = this.options()
      .filter(o => selected.includes(o.value))
      .map(o => o.label);
    if (labels.length <= this.maxLabels()) return labels.join(', ');
    const rest = labels.length - this.maxLabels();
    return `${labels.slice(0, this.maxLabels()).join(', ')} +${rest} more`;
  });

  protected filteredOptions = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return q ? this.options().filter(o => o.label.toLowerCase().includes(q)) : this.options();
  });

  ngOnDestroy(): void {
    this.oc.destroy();
  }

  isSelected(option: SelectOption<T>): boolean {
    return this.value().includes(option.value);
  }

  isTruncated(el: HTMLElement): boolean {
    return this.oc.isTruncated(el);
  }

  toggleDropdown(): void {
    if (this.disabled() || this.readonly()) return;
    if (this.isOpen()) {
      this.oc.close(this.triggerEl());
    } else {
      this.oc.open(this.triggerEl(), this.panelTpl() as any);
    }
  }

  toggleOption(option: SelectOption<T>): void {
    if (option.disabled) return;
    const current = this.value();
    const isSelected = current.includes(option.value);
    this.value.set(
      isSelected
        ? current.filter(v => v !== option.value)
        : [...current, option.value],
    );
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggleDropdown();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggleDropdown();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggleDropdown();
        }
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.oc.close(this.triggerEl());
        }
        break;
      case 'Tab':
        if (this.isOpen()) {
          this.oc.close(this.triggerEl());
        }
        break;
    }
  }
}
```

Key changes:
- Removed: `focusedIndex`, `focusedOptionId` (handled by `ngListbox`)
- Removed: `nextId` counter (unused)
- Added: `Listbox`, `Option` imports from `@angular/aria/listbox`
- `onKeydown()` simplified to open/close only
- `toggleDropdown()` no longer passes `initialFocusIndex`

- [ ] **Step 2: Update the Multi-Select template**

Replace the full content of `libs/shared-forms/multi-select/src/multi-select.component.html` with:

```html
@if (!hidden()) {
  <div
    #trigger
    class="select-trigger"
    [class.select-trigger--open]="isOpen()"
    [class.select-trigger--disabled]="disabled()"
    [class.select-trigger--readonly]="readonly()"
    [class.select-trigger--invalid]="invalid()"
    [attr.aria-expanded]="isOpen()"
    [attr.aria-haspopup]="'listbox'"
    [attr.id]="id() || null"
    role="combobox"
    tabindex="0"
    (click)="toggleDropdown()"
    (keydown)="onKeydown($event)"
    (blur)="touched.set(true)"
  >
    <span
      #valueLabel
      class="select-value"
      [class.select-value--placeholder]="!value().length"
      [uiTooltip]="triggerLabel() ?? ''"
      uiTooltipPosition="top"
      [uiTooltipDisabled]="!value().length || !isTruncated(valueLabel)"
    >
      {{ triggerLabel() ?? placeholder() }}
    </span>
    <ui-icon
      name="heroChevronDown"
      [size]="iconSize()"
      color="muted"
      class="select-chevron"
      [class.select-chevron--open]="isOpen()"
    />
  </div>

  <ng-template #panelTpl>
    <div class="select-panel">
      @if (searchable()) {
        <div class="select-search">
          <ui-input type="search" size="sm" [(value)]="searchQuery" placeholder="Rechercher..." />
        </div>
      }
      <div ngListbox [multi]="true" class="select-options">
        @for (option of filteredOptions(); track option.value; let i = $index) {
          <div
            ngOption
            [value]="'' + option.value"
            class="select-option"
            [class.select-option--selected]="isSelected(option)"
            [class.select-option--disabled]="option.disabled"
            [attr.id]="panelId + '-option-' + i"
            (click)="toggleOption(option)"
          >
            <ui-checkbox [checked]="isSelected(option)" size="sm" />
            <span
              #optionLabel
              [uiTooltip]="option.label"
              uiTooltipPosition="right"
              [uiTooltipDisabled]="!isTruncated(optionLabel)"
            >{{ option.label }}</span>
          </div>
        } @empty {
          <div class="select-empty">Aucune option trouvée</div>
        }
      </div>
    </div>
  </ng-template>
}
```

Key changes:
- Removed: `role="listbox"`, `aria-multiselectable="true"`, `role="option"`, `[attr.aria-selected]`, `[attr.aria-activedescendant]` on trigger, `(mouseenter)` focus tracking, `[class.select-option--focused]`
- Added: `ngListbox [multi]="true"` on options container, `ngOption [value]` on each option

- [ ] **Step 3: Build and verify**

Run:
```bash
npx ng build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 4: Visual check in Storybook**

Navigate to **Shared Forms / MultiSelect**. Verify:
- All three stories render (Docs, Playground, Variants)
- Multiple options can be selected/deselected
- Checkboxes update correctly
- Keyboard: Arrow keys navigate, Enter/Space toggles selection
- Counter label shows correctly (e.g., "Argentina +2 more")
- Searchable mode filters options

- [ ] **Step 5: Commit**

```bash
git add libs/shared-forms/multi-select/src/multi-select.component.ts libs/shared-forms/multi-select/src/multi-select.component.html
git commit -m "refactor(multi-select): migrate panel to @angular/aria/listbox directives

Replace manual focus tracking and ARIA attributes with ngListbox[multi]
and ngOption directives. Trigger ARIA kept manual."
```

---

### Task 6: Migrate Autocomplete to @angular/aria/listbox

**Files:**
- Modify: `libs/shared-forms/autocomplete/src/autocomplete.component.ts`
- No SCSS changes

- [ ] **Step 1: Update the Autocomplete component TypeScript**

Replace the full content of `libs/shared-forms/autocomplete/src/autocomplete.component.ts` with:

```typescript
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  output,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormValueControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Listbox, Option } from '@angular/aria/listbox';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import { UiSpinnerComponent } from '@ui/shared-ui/spinner';
import { type SelectOption } from '@ui/shared-forms/select';
import {
  FORM_FIELD_VARIANT_MAP,
  type FormFieldVariant,
} from '@ui/shared-forms/input';

export type AutocompleteVariant = FormFieldVariant;
export type AutocompleteSize = 'sm' | 'md' | 'lg';

const HEIGHT_MAP: Record<AutocompleteSize, string> = {
  sm: 'calc(var(--spacing) * 8)',
  md: 'calc(var(--spacing) * 10)',
  lg: 'calc(var(--spacing) * 12)',
};

let nextPanelId = 0;

@Component({
  selector: 'ui-autocomplete',
  imports: [UiIconComponent, UiIconButtonComponent, UiSpinnerComponent, Listbox, Option],
  styleUrl: './autocomplete.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[style.--ac-bg]': 'variantStyles().bg',
    '[style.--ac-border]': 'variantStyles().border',
    '[style.--ac-focus-border]': 'variantStyles().focusBorder',
    '[style.--ac-invalid-border]': 'variantStyles().invalidBorder',
    '[style.--ac-height]': 'heightValue()',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.variant-filled]': 'variant() === "filled"',
    '[class.variant-ghost]': 'variant() === "ghost"',
  },
  template: `
    @if (!hidden()) {
      <div
        #trigger
        class="autocomplete-wrapper"
        [class.autocomplete-wrapper--focused]="isOpen()"
        [class.autocomplete-wrapper--disabled]="disabled()"
        [class.autocomplete-wrapper--readonly]="readonly()"
        [class.autocomplete-wrapper--invalid]="invalid()"
      >
        <input
          class="autocomplete-input"
          type="text"
          [value]="inputText()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [readonly]="readonly()"
          [attr.required]="required() || null"
          [attr.aria-invalid]="invalid() || null"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-autocomplete]="'list'"
          [attr.aria-controls]="isOpen() ? panelId : null"
          [attr.aria-label]="label()"
          role="combobox"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (keydown)="onKeydown($event)"
        />
        @if (inputText() && !disabled() && !readonly()) {
          <ui-icon-button
            icon="heroXMark"
            label="Effacer"
            variant="ghost"
            size="sm"
            (click)="clearInput()"
          />
        } @else {
          <ui-icon name="heroMagnifyingGlass" size="sm" color="muted" />
        }
      </div>

      <ng-template #panelTpl>
        <div class="autocomplete-panel" [attr.id]="panelId">
          @if (loading()) {
            <div class="autocomplete-loading">
              <ui-spinner size="sm" color="primary" label="Chargement des suggestions" />
            </div>
          } @else if (options().length === 0 && hasSearched()) {
            <div class="autocomplete-empty">{{ noResultsLabel() }}</div>
          } @else {
            <div ngListbox class="autocomplete-options-list">
              @for (option of options(); track option.value; let i = $index) {
                <div
                  ngOption
                  [value]="'' + option.value"
                  class="autocomplete-option"
                  [class.autocomplete-option--selected]="value() === option.value"
                  [attr.id]="panelId + '-option-' + i"
                  (mousedown)="selectOption(option)"
                >
                  <span>{{ option.label }}</span>
                  @if (value() === option.value) {
                    <ui-icon name="heroCheck" size="sm" color="primary" />
                  }
                </div>
              }
            </div>
          }
        </div>
      </ng-template>
    }
  `,
})
export class UiAutocompleteComponent<T = string>
  implements FormValueControl<T | null>, OnDestroy
{
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  // Signal Forms contract
  value = model<T | null>(null);
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  required = input<boolean>(false);

  // Accessibility
  label = input<string | undefined>(undefined);

  // Additional inputs
  options = input<SelectOption<T>[]>([]);
  placeholder = input<string>('Rechercher...');
  debounce = input<number>(300);
  loading = input<boolean>(false);
  noResultsLabel = input<string>('Aucun résultat');
  variant = input<AutocompleteVariant>('outlined');
  size = input<AutocompleteSize>('md');

  // Outputs
  search = output<string>();

  // Internal state
  protected inputText = signal<string>('');
  protected isOpen = signal<boolean>(false);
  protected hasSearched = signal<boolean>(false);
  protected readonly panelId = `ui-autocomplete-panel-${nextPanelId++}`;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private overlayRef: OverlayRef | null = null;
  private backdropSub: { unsubscribe(): void } | null = null;

  private triggerEl = viewChild<ElementRef<HTMLElement>>('trigger');
  private panelTpl = viewChild<TemplateRef<unknown>>('panelTpl');

  // Computed
  protected variantStyles = computed(() => FORM_FIELD_VARIANT_MAP[this.variant()]);
  protected heightValue = computed(() => HEIGHT_MAP[this.size()]);

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.backdropSub?.unsubscribe();
    this.overlayRef?.dispose();
  }

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputText.set(input.value);

    if (!input.value) {
      this.value.set(null);
      this.closePanel();
      return;
    }

    this.openPanel();

    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.search.emit(input.value);
      this.hasSearched.set(true);
    }, this.debounce());
  }

  protected onFocus(): void {
    if (this.inputText()) this.openPanel();
  }

  protected onBlur(): void {
    setTimeout(() => {
      if (!this.value()) this.clearInput();
      this.closePanel();
      this.touched.set(true);
    }, 150);
  }

  protected selectOption(option: SelectOption<T>): void {
    if (option.disabled) return;
    this.value.set(option.value);
    this.inputText.set(option.label);
    this.closePanel();
  }

  protected clearInput(): void {
    this.inputText.set('');
    this.value.set(null);
    this.hasSearched.set(false);
    this.closePanel();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) return;

    switch (event.key) {
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.closePanel();
        }
        break;
      case 'Enter':
        // Let ngListbox handle selection if panel is open
        break;
    }
  }

  private openPanel(): void {
    if (this.isOpen()) return;
    const triggerEl = this.triggerEl();
    const panelTpl = this.panelTpl();
    if (!triggerEl || !panelTpl) return;

    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay(triggerEl);
    }

    this.overlayRef.updateSize({ width: triggerEl.nativeElement.offsetWidth });
    const portal = new TemplatePortal(panelTpl, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);

    this.backdropSub = this.overlayRef.backdropClick().subscribe(() => {
      if (!this.value()) this.clearInput();
      this.closePanel();
      this.touched.set(true);
    });
  }

  private closePanel(): void {
    if (!this.isOpen()) return;
    this.backdropSub?.unsubscribe();
    this.backdropSub = null;
    this.overlayRef?.detach();
    this.isOpen.set(false);
  }

  private createOverlay(triggerEl: ElementRef<HTMLElement>): OverlayRef {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerEl)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
      ]);

    return this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }
}
```

Key changes:
- Removed: `focusedIndex`, `focusedOptionId` signals and computed, `moveFocus()` method
- Removed: `[attr.aria-activedescendant]`, `role="listbox"`, `role="option"`, `[attr.aria-selected]`, `(mouseenter)` focus tracking, `[class.autocomplete-option--focused]`
- Added: `Listbox`, `Option` imports, `ngListbox` and `ngOption` directives in template
- `onKeydown()` reduced to just Escape handling — `ngListbox` handles ArrowDown/Up/Enter within panel
- CDK Overlay lifecycle unchanged

- [ ] **Step 2: Build and verify**

Run:
```bash
npx ng build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 3: Visual check in Storybook**

Navigate to **Shared Forms / Autocomplete**. Verify:
- All three stories render (Docs, Playground, Variants)
- Typing shows suggestions, debounce works
- Clicking an option selects it and closes panel
- Escape closes panel
- Loading spinner shows when `loading=true`
- "No results" message shows when no matches
- Disabled/readonly/invalid states work

- [ ] **Step 4: Commit**

```bash
git add libs/shared-forms/autocomplete/src/autocomplete.component.ts
git commit -m "refactor(autocomplete): migrate panel to @angular/aria/listbox directives

Replace manual focus tracking (focusedIndex, focusedOptionId, moveFocus)
and ARIA attributes (role=listbox, role=option, aria-selected) with
ngListbox and ngOption directives. CDK Overlay and debounce logic retained."
```

---

### Task 7: Final build verification

**Files:** None (verification only)

- [ ] **Step 1: Full build**

Run:
```bash
npx ng build
```

Expected: Build succeeds with zero errors across all libraries.

- [ ] **Step 2: Full Storybook verification**

Run:
```bash
npx storybook dev
```

Visit each migrated component story and verify keyboard navigation + visual correctness:
- Shared UI / Tabs
- Shared UI / DropdownMenu
- Shared Forms / Select
- Shared Forms / MultiSelect
- Shared Forms / Autocomplete

- [ ] **Step 3: Verify no regressions in consuming components**

Check that components which import from the migrated libraries still work:
- Any component importing `SelectOverlayController` from `@ui/shared-forms/select`
- Any component importing `UiMenuItemComponent` from `@ui/shared-ui/dropdown-menu`

Run:
```bash
npx ng build
```

Expected: No compilation errors.
