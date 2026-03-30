import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  model,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
  FormValueControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import {
  FORM_FIELD_VARIANT_MAP,
  type FormFieldVariant,
} from '@ui/shared-forms/input';

export type NumberVariant = FormFieldVariant;
export type NumberSize = 'sm' | 'md' | 'lg';

const HEIGHT_MAP: Record<NumberSize, string> = {
  sm: 'calc(var(--spacing) * 8)',
  md: 'calc(var(--spacing) * 10)',
  lg: 'calc(var(--spacing) * 12)',
};

@Component({
  selector: 'ui-number',
  providers: [DecimalPipe],
  styleUrl: './number.component.scss',
  host: {
    '[style.--number-bg]': 'variantStyles().bg',
    '[style.--number-border]': 'variantStyles().border',
    '[style.--number-focus-border]': 'variantStyles().focusBorder',
    '[style.--number-invalid-border]': 'variantStyles().invalidBorder',
    '[style.--number-height]': 'heightValue()',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.variant-filled]': 'variant() === "filled"',
    '[class.variant-ghost]': 'variant() === "ghost"',
  },
  templateUrl: './number.component.html',
})
export class UiNumberComponent implements FormValueControl<number | null> {
  private decimalPipe = inject(DecimalPipe);

  // Signal Forms contract
  value = model<number | null>(null);
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  required = input<boolean>(false);
  min = input<number | undefined>(undefined);
  max = input<number | undefined>(undefined);

  // Accessibility
  label = input<string | undefined>(undefined);

  // Additional inputs
  format = input<string>('1.0-2');
  locale = input<string>('fr-FR');
  placeholder = input<string>('0');
  variant = input<NumberVariant>('outlined');
  size = input<NumberSize>('md');

  // Internal state
  protected isFocused = signal<boolean>(false);
  protected displayValue = linkedSignal(() => {
    const v = this.value();
    if (this.isFocused()) {
      return v !== null ? String(v) : '';
    }
    return v !== null
      ? this.decimalPipe.transform(v, this.format(), this.locale()) ?? ''
      : '';
  });

  // Computed
  protected variantStyles = computed(() => FORM_FIELD_VARIANT_MAP[this.variant()]);
  protected heightValue = computed(() => HEIGHT_MAP[this.size()]);

  protected onFocus(): void {
    this.isFocused.set(true);
  }

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.displayValue.set(input.value);
  }

  protected onBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    const parsed = this.parseInput(input.value);
    this.value.set(parsed);
    this.isFocused.set(false);
    this.touched.set(true);
  }

  private parseInput(raw: string): number | null {
    const normalized = raw.replace(/,/g, '.');
    const parsed = parseFloat(normalized);
    if (isNaN(parsed)) return null;
    if (this.min() !== undefined && parsed < this.min()!) return this.min()!;
    if (this.max() !== undefined && parsed > this.max()!) return this.max()!;
    return parsed;
  }
}
