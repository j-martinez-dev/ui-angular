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
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { UiInputComponent } from '@ui/shared-ui/input';
import { UiCheckboxComponent } from '@ui/shared-ui/checkbox';
import { UiTooltipDirective } from '@ui/shared-ui/tooltip';
import { type SelectOption, SelectOverlayController } from '@ui/shared-ui/select';
import { FORM_FIELD_VARIANT_MAP, type FormFieldVariant } from '@ui/shared-ui/input';

let nextId = 0;

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
  imports: [UiIconComponent, UiInputComponent, UiCheckboxComponent, UiTooltipDirective],
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
        [attr.aria-activedescendant]="focusedOptionId()"
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
        <div class="select-panel" role="listbox" aria-multiselectable="true">
          @if (searchable()) {
            <div class="select-search">
              <ui-input type="search" size="sm" [(value)]="searchQuery" placeholder="Rechercher..." />
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
              <div class="select-empty">Aucune option trouvée</div>
            }
          </div>
        </div>
      </ng-template>
    }
  `,
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
  protected readonly focusedIndex = this.oc.focusedIndex;
  protected readonly panelId = this.oc.panelId;

  private triggerEl = viewChild<ElementRef<HTMLElement>>('trigger');
  private panelTpl = viewChild<unknown>('panelTpl');

  protected variantStyles = computed(() => FORM_FIELD_VARIANT_MAP[this.variant()]);
  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
  protected heightValue = computed(() => HEIGHT_MAP[this.size()]);

  protected focusedOptionId = computed(() => this.oc.focusedOptionId());

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
      this.oc.open(this.triggerEl(), this.panelTpl() as any, 0);
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
        if (this.isOpen()) {
          const opts = this.filteredOptions();
          const idx = this.focusedIndex();
          if (idx >= 0 && idx < opts.length && !opts[idx].disabled) {
            this.toggleOption(opts[idx]);
          }
        } else {
          this.toggleDropdown();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggleDropdown();
        } else {
          this.oc.moveFocus(1, this.filteredOptions());
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.oc.moveFocus(-1, this.filteredOptions());
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
