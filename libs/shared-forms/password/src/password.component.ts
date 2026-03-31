import {
  Component,
  computed,
  input,
  model,
  signal,
} from '@angular/core';
import {
  FormValueControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import { FORM_FIELD_VARIANT_MAP, type FormFieldVariant } from '@ui/shared-forms/input';

export type PasswordVariant = FormFieldVariant;
export type PasswordSize = 'sm' | 'md' | 'lg';

const HEIGHT_MAP: Record<PasswordSize, string> = {
  sm: 'calc(var(--spacing) * 8)',
  md: 'calc(var(--spacing) * 10)',
  lg: 'calc(var(--spacing) * 12)',
};

@Component({
  selector: 'ui-password',
  imports: [UiIconButtonComponent],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  host: {
    '[style.--input-bg]': 'variantStyles().bg',
    '[style.--input-border]': 'variantStyles().border',
    '[style.--input-focus-border]': 'variantStyles().focusBorder',
    '[style.--input-invalid-border]': 'variantStyles().invalidBorder',
    '[style.--input-height]': 'heightValue()',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.variant-filled]': 'variant() === "filled"',
    '[class.variant-ghost]': 'variant() === "ghost"',
  },
})
export class UiPasswordComponent implements FormValueControl<string> {
  // Signal Forms contract
  value = model<string>('');
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  required = input<boolean>(false);
  minLength = input<number | undefined>(undefined);
  maxLength = input<number | undefined>(undefined);

  // Additional inputs
  variant = input<PasswordVariant>('outlined');
  size = input<PasswordSize>('md');
  placeholder = input<string>('Mot de passe');
  showStrength = input<boolean>(false);

  // Internal state
  protected isFocused = signal<boolean>(false);
  protected isVisible = signal<boolean>(false);

  // Computed
  protected variantStyles = computed(() => FORM_FIELD_VARIANT_MAP[this.variant()]);
  protected heightValue = computed(() => HEIGHT_MAP[this.size()]);

  protected strength = computed<'weak' | 'medium' | 'strong' | null>(() => {
    const v = this.value();
    if (!v) return null;

    let score = 0;
    if (v.length >= 8) score++;
    if (v.length >= 12) score++;
    if (/[A-Z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;

    if (score <= 1) return 'weak';
    if (score <= 3) return 'medium';
    return 'strong';
  });

  protected strengthLabel = computed(() => {
    const map = { weak: 'Faible', medium: 'Moyen', strong: 'Fort' };
    return this.strength() ? map[this.strength()!] : '';
  });

  protected toggleVisibility(): void {
    this.isVisible.update(v => !v);
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.touched.set(true);
  }
}
