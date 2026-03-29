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
