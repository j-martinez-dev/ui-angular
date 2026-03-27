import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
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
import {
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { UiInputComponent } from '@ui/shared-ui/input';
import { UiTooltipDirective } from '@ui/shared-ui/tooltip';
import { type SelectOption } from './select.types';

let nextId = 0;

export type SelectVariant = 'outlined' | 'filled' | 'ghost';
export type SelectSize = 'sm' | 'md' | 'lg';

interface VariantStyles {
  bg: string;
  border: string;
  focusBorder: string;
  invalidBorder: string;
}

const VARIANT_MAP: Record<SelectVariant, VariantStyles> = {
  outlined: {
    bg: 'var(--color-surface-raised)',
    border: '1px solid var(--color-border-default)',
    focusBorder: '1px solid var(--color-primary-default)',
    invalidBorder: '1px solid var(--color-error-default)',
  },
  filled: {
    bg: 'var(--color-surface-sunken)',
    border: 'none',
    focusBorder: 'none',
    invalidBorder: 'none',
  },
  ghost: {
    bg: 'transparent',
    border: 'none',
    focusBorder: 'none',
    invalidBorder: 'none',
  },
};

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
  imports: [UiIconComponent, UiInputComponent, UiTooltipDirective],
  template: `
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
        [attr.aria-activedescendant]="focusedOptionId()"
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
        <div class="select-panel" role="listbox">
          @if (searchable()) {
            <div class="select-search">
              <ui-input type="search" size="sm" [(value)]="searchQuery" placeholder="Search..." />
            </div>
          }
          <div class="select-options">
            @for (option of filteredOptions(); track option.value; let i = $index) {
              <div
                class="select-option"
                [class.select-option--selected]="isSelected(option)"
                [class.select-option--disabled]="option.disabled"
                [class.select-option--focused]="focusedIndex() === i"
                [attr.id]="panelId + '-option-' + i"
                [attr.aria-selected]="isSelected(option)"
                role="option"
                (click)="selectOption(option)"
                (mouseenter)="focusedIndex.set(i)"
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
              <div class="select-empty">No options found</div>
            }
          </div>
        </div>
      </ng-template>
    }
  `,
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
  // Signal Forms contract
  value = model<T | null>(null);
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
  placeholder = input<string>('Select an option');
  variant = input<SelectVariant>('outlined');
  size = input<SelectSize>('md');
  searchable = input<boolean>(false);
  id = input<string>();

  // Internal state
  isOpen = signal<boolean>(false);
  searchQuery = signal<string>('');
  focusedIndex = signal<number>(-1);
  protected readonly panelId = `ui-select-panel-${nextId++}`;

  // Template refs
  private triggerEl = viewChild<ElementRef<HTMLElement>>('trigger');
  private panelTpl = viewChild<TemplateRef<unknown>>('panelTpl');

  // Services
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  private backdropSub: { unsubscribe(): void } | null = null;

  // Computed
  protected variantStyles = computed(() => VARIANT_MAP[this.variant()]);
  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
  protected heightValue = computed(() => HEIGHT_MAP[this.size()]);

  protected selectedLabel = computed(() =>
    this.options().find(o => o.value === this.value())?.label ?? null,
  );

  protected focusedOptionId = computed(() => {
    const idx = this.focusedIndex();
    return idx >= 0 ? `${this.panelId}-option-${idx}` : null;
  });

  protected filteredOptions = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return q ? this.options().filter(o => o.label.toLowerCase().includes(q)) : this.options();
  });

  ngOnDestroy(): void {
    this.backdropSub?.unsubscribe();
    this.overlayRef?.dispose();
  }

  isSelected(option: SelectOption<T>): boolean {
    return option.value === this.value();
  }

  isTruncated(el: HTMLElement): boolean {
    return el.scrollWidth > el.clientWidth;
  }

  toggleDropdown(): void {
    if (this.disabled() || this.readonly()) return;
    this.isOpen() ? this.close() : this.open();
  }

  selectOption(option: SelectOption<T>): void {
    if (option.disabled) return;
    this.value.set(option.value);
    this.close();
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen()) {
          const opts = this.filteredOptions();
          const idx = this.focusedIndex();
          if (idx >= 0 && idx < opts.length && !opts[idx].disabled) {
            this.selectOption(opts[idx]);
          }
        } else {
          this.open();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        } else {
          this.moveFocus(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.moveFocus(-1);
        }
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
      case 'Tab':
        if (this.isOpen()) {
          this.close();
        }
        break;
    }
  }

  // ── Private ─────────────────────────────────────────────────────────────

  private open(): void {
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
    this.searchQuery.set('');

    // Set initial focused index to selected option
    const selectedIdx = this.filteredOptions().findIndex(o => o.value === this.value());
    this.focusedIndex.set(selectedIdx >= 0 ? selectedIdx : 0);

    this.backdropSub = this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  private close(): void {
    if (!this.isOpen()) return;
    this.backdropSub?.unsubscribe();
    this.backdropSub = null;
    this.overlayRef?.detach();
    this.isOpen.set(false);
    this.focusedIndex.set(-1);
    this.triggerEl()?.nativeElement.focus();
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

  private moveFocus(delta: number): void {
    const opts = this.filteredOptions();
    if (opts.length === 0) return;

    let idx = this.focusedIndex() + delta;

    // Skip disabled options
    while (idx >= 0 && idx < opts.length && opts[idx].disabled) {
      idx += delta;
    }

    if (idx >= 0 && idx < opts.length) {
      this.focusedIndex.set(idx);
      this.scrollToFocused(idx);
    }
  }

  private scrollToFocused(idx: number): void {
    const el = document.getElementById(`${this.panelId}-option-${idx}`);
    el?.scrollIntoView({ block: 'nearest' });
  }
}
