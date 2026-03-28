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
import { FORM_FIELD_VARIANT_MAP, type FormFieldVariant } from '@ui/shared-ui/input';

let nextId = 0;

export type TextareaVariant = FormFieldVariant;
export type TextareaSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-textarea',
  template: `
    @if (!hidden()) {
      <div
        class="textarea-wrapper"
        [class.textarea-wrapper--focused]="isFocused()"
        [class.textarea-wrapper--disabled]="disabled()"
        [class.textarea-wrapper--readonly]="readonly()"
        [class.textarea-wrapper--invalid]="invalid()"
      >
        <textarea
          class="textarea-field"
          [value]="value()"
          [rows]="rows()"
          [placeholder]="placeholder() ?? ''"
          [disabled]="disabled()"
          [readonly]="readonly()"
          [attr.id]="id() || null"
          [attr.required]="required() || null"
          [attr.minlength]="minLength() ?? null"
          [attr.maxlength]="maxLength() ?? null"
          [attr.aria-invalid]="invalid() || null"
          [attr.aria-required]="required() || null"
          [attr.aria-describedby]="effectiveDescribedBy()"
          [class.textarea-field--auto-resize]="autoResize()"
          (input)="onInput($event)"
          (focus)="isFocused.set(true)"
          (blur)="onBlur()"
        ></textarea>
      </div>
      @if (showCount()) {
        <span class="textarea-count" [id]="countId">{{ charCount() }}</span>
      }
    }
  `,
  styleUrl: './textarea.component.scss',
  host: {
    '[style.--textarea-bg]': 'variantStyles().bg',
    '[style.--textarea-border]': 'variantStyles().border',
    '[style.--textarea-focus-border]': 'variantStyles().focusBorder',
    '[style.--textarea-invalid-border]': 'variantStyles().invalidBorder',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.variant-filled]': 'variant() === "filled"',
    '[class.variant-ghost]': 'variant() === "ghost"',
  },
})
export class UiTextareaComponent implements FormValueControl<string> {
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
  variant = input<TextareaVariant>('outlined');
  size = input<TextareaSize>('md');
  placeholder = input<string>();
  rows = input<number>(3);
  autoResize = input<boolean>(false);
  showCount = input<boolean>(false);
  id = input<string>();
  ariaDescribedBy = input<string>();

  // Internal state
  protected isFocused = signal<boolean>(false);
  protected countId = 'textarea-count-' + nextId++;

  // Computed
  protected variantStyles = computed(() => FORM_FIELD_VARIANT_MAP[this.variant()]);

  protected effectiveDescribedBy = computed(() => {
    const ids = [this.ariaDescribedBy(), this.showCount() ? this.countId : null].filter(Boolean);
    return ids.length ? ids.join(' ') : null;
  });

  protected charCount = computed(() => {
    const max = this.maxLength();
    const len = this.value().length;
    return max != null ? `${len} / ${max}` : `${len}`;
  });

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.value.set(textarea.value);

    if (this.autoResize()) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.touched.set(true);
  }
}
