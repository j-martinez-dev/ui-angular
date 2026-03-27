import {
  Component,
  computed,
  ElementRef,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormValueControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'search';
export type InputVariant = 'outlined' | 'filled' | 'ghost';
export type InputSize = 'sm' | 'md' | 'lg';

interface VariantStyles {
  bg: string;
  border: string;
  focusBorder: string;
  invalidBorder: string;
}

const VARIANT_MAP: Record<InputVariant, VariantStyles> = {
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

const ICON_SIZE_MAP: Record<InputSize, IconSize> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

const HEIGHT_MAP: Record<InputSize, string> = {
  sm: 'calc(var(--spacing) * 8)',
  md: 'calc(var(--spacing) * 10)',
  lg: 'calc(var(--spacing) * 12)',
};

@Component({
  selector: 'ui-input',
  imports: [UiIconComponent, UiIconButtonComponent],
  template: `
    @if (!hidden()) {
      <div
        class="input-wrapper"
        [class.input-wrapper--focused]="isFocused()"
        [class.input-wrapper--disabled]="disabled()"
        [class.input-wrapper--readonly]="readonly()"
        [class.input-wrapper--invalid]="invalid()"
      >
        @if (resolvedPrefix()) {
          <span class="input-prefix">
            @if (resolvedPrefixIsIcon()) {
              <ui-icon [name]="resolvedPrefix()!" [size]="iconSize()" color="muted" />
            } @else {
              <span class="input-prefix-text">{{ resolvedPrefix() }}</span>
            }
          </span>
        }

        <input
          #inputEl
          class="input-field"
          [type]="type()"
          [value]="value()"
          [placeholder]="placeholder() ?? ''"
          [disabled]="disabled()"
          [readonly]="readonly()"
          [attr.id]="id() || null"
          [attr.required]="required() || null"
          [attr.minlength]="minLength() ?? null"
          [attr.maxlength]="maxLength() ?? null"
          [attr.aria-invalid]="invalid() || null"
          [attr.aria-required]="required() || null"
          [attr.aria-describedby]="ariaDescribedBy() || null"
          (input)="onInput($event)"
          (focus)="isFocused.set(true)"
          (blur)="onBlur()"
        />

        @if (clearable() && value() && !disabled() && !readonly()) {
          <ui-icon-button
            icon="heroXMark"
            variant="ghost"
            size="sm"
            label="Clear input"
            (click)="clearValue()"
          />
        }

        @if (suffix()) {
          <span class="input-suffix">
            @if (suffixIsIcon()) {
              <ui-icon [name]="suffix()!" [size]="iconSize()" color="muted" />
            } @else {
              <span class="input-suffix-text">{{ suffix() }}</span>
            }
          </span>
        }
      </div>
    }
  `,
  styleUrl: './input.component.scss',
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
export class UiInputComponent implements FormValueControl<string> {
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
  type = input<InputType>('text');
  variant = input<InputVariant>('outlined');
  size = input<InputSize>('md');
  placeholder = input<string>();
  prefix = input<string>();
  suffix = input<string>();
  clearable = input<boolean>(false);
  prefixIsIcon = input<boolean>(true);
  suffixIsIcon = input<boolean>(true);
  id = input<string>();
  ariaDescribedBy = input<string>();

  // Internal state
  isFocused = signal<boolean>(false);
  private inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');

  // Computed
  protected variantStyles = computed(() => VARIANT_MAP[this.variant()]);
  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
  protected heightValue = computed(() => HEIGHT_MAP[this.size()]);

  protected resolvedPrefix = computed(() => {
    const explicit = this.prefix();
    if (explicit) return explicit;
    return this.type() === 'search' ? 'heroMagnifyingGlass' : undefined;
  });

  protected resolvedPrefixIsIcon = computed(() => {
    if (this.prefix()) return this.prefixIsIcon();
    return this.type() === 'search' ? true : this.prefixIsIcon();
  });

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.touched.set(true);
  }

  clearValue(): void {
    this.value.set('');
    this.inputEl()?.nativeElement.focus();
  }
}
