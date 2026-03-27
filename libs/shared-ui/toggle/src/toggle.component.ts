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

export type ToggleSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-toggle',
  template: `
    @if (!hidden()) {
      <label class="toggle-wrapper" [class.toggle--disabled]="disabled()">
        <input
          type="checkbox"
          class="sr-only"
          [checked]="checked()"
          [disabled]="disabled()"
          [attr.aria-invalid]="invalid() || null"
          [attr.aria-required]="required() || null"
          (change)="onCheckedChange($event)"
          (blur)="touched.set(true)"
        />
        <span
          class="toggle-track"
          [class.toggle-track--checked]="checked()"
          [class.toggle-track--invalid]="invalid()"
        >
          <span class="toggle-thumb"></span>
        </span>
        @if (label()) {
          <span class="toggle-label">{{ label() }}</span>
        }
      </label>
    }
  `,
  styleUrl: './toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
  },
})
export class UiToggleComponent implements FormCheckboxControl {
  // Signal Forms contract
  checked = model<boolean>(false);
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  required = input<boolean>(false);

  // Additional inputs
  label = input<string>();
  size = input<ToggleSize>('md');

  onCheckedChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked.set(input.checked);
  }
}
