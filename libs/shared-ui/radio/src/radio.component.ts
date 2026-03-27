import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import {
  FormCheckboxControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree,
} from '@angular/forms/signals';

export type RadioSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-radio',
  standalone: true,
  template: `
    @if (!hidden()) {
      <label class="radio-wrapper" [class.radio--disabled]="disabled()">
        <input
          type="radio"
          class="sr-only"
          [checked]="checked()"
          [disabled]="disabled()"
          [attr.aria-invalid]="invalid() || null"
          [attr.aria-required]="required() || null"
          (change)="onCheckedChange($event)"
          (blur)="touched.set(true)"
        />
        <span
          class="radio-circle"
          [class.radio-circle--checked]="checked()"
          [class.radio-circle--invalid]="invalid()"
        >
          @if (checked()) {
            <span class="radio-dot"></span>
          }
        </span>
        @if (label()) {
          <span class="radio-label">{{ label() }}</span>
        }
      </label>
    }
  `,
  styleUrl: './radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
  },
})
export class UiRadioComponent implements FormCheckboxControl {
  // Signal Forms contract
  checked = model<boolean>(false);
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);

  // Additional inputs
  label = input<string>();
  size = input<RadioSize>('md');
  required = input<boolean>(false);

  onCheckedChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked.set(input.checked);
  }
}
