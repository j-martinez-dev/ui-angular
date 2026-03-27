import {
  ChangeDetectionStrategy,
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
import { UiCheckboxComponent } from '@ui/shared-ui/checkbox';
import { UiTooltipDirective } from '@ui/shared-ui/tooltip';
import { type SelectOption } from '@ui/shared-ui/select';

export type MultiSelectVariant = 'outlined' | 'filled' | 'ghost';
export type MultiSelectSize = 'sm' | 'md' | 'lg';

interface VariantStyles {
  bg: string;
  border: string;
  focusBorder: string;
  invalidBorder: string;
}

const VARIANT_MAP: Record<MultiSelectVariant, VariantStyles> = {
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
  imports: [UiIconComponent, UiInputComponent, UiCheckboxComponent, UiTooltipDirective],
  template: `
    @if (!hidden()) {
      <div
        #trigger
        class="select-trigger"
        [class.select-trigger--open]="isOpen()"
        [class.select-trigger--disabled]="disabled()"
        [class.select-trigger--invalid]="invalid()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'listbox'"
        [attr.aria-multiselectable]="true"
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
        <div class="select-panel" role="listbox" aria-multiselectable="true">
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
                [attr.aria-selected]="isSelected(option)"
                role="option"
                (click)="toggleOption(option)"
                (mouseenter)="focusedIndex.set(i)"
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
              <div class="select-empty">No options found</div>
            }
          </div>
        </div>
      </ng-template>
    }
  `,
  styleUrl: './multi-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  placeholder = input<string>('Select options');
  variant = input<MultiSelectVariant>('outlined');
  size = input<MultiSelectSize>('md');
  searchable = input<boolean>(false);
  maxLabels = input<number>(1);

  // Internal state
  isOpen = signal<boolean>(false);
  searchQuery = signal<string>('');
  focusedIndex = signal<number>(-1);

  // Template refs
  private triggerEl = viewChild<ElementRef<HTMLElement>>('trigger');
  private panelTpl = viewChild<TemplateRef<unknown>>('panelTpl');

  // Services
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;

  // Computed
  protected variantStyles = computed(() => VARIANT_MAP[this.variant()]);
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
    this.overlayRef?.dispose();
  }

  isSelected(option: SelectOption<T>): boolean {
    return this.value().includes(option.value);
  }

  isTruncated(el: HTMLElement): boolean {
    return el.scrollWidth > el.clientWidth;
  }

  toggleDropdown(): void {
    if (this.disabled() || this.readonly()) return;
    this.isOpen() ? this.close() : this.open();
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
        if (this.isOpen()) {
          const opts = this.filteredOptions();
          const idx = this.focusedIndex();
          if (idx >= 0 && idx < opts.length && !opts[idx].disabled) {
            this.toggleOption(opts[idx]);
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
    this.focusedIndex.set(0);

    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  private close(): void {
    if (!this.isOpen()) return;
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

    while (idx >= 0 && idx < opts.length && opts[idx].disabled) {
      idx += delta;
    }

    if (idx >= 0 && idx < opts.length) {
      this.focusedIndex.set(idx);
    }
  }
}
