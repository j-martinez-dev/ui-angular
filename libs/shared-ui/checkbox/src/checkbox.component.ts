import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import {
  FormCheckboxControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import { UiIconComponent, IconSize } from '@ui/shared-ui/icon';

export type CheckboxSize = 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<CheckboxSize, IconSize> = {
  sm: 'xs',
  md: 'xs',
  lg: 'sm',
};

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [UiIconComponent],
  template: `
    @if (!hidden()) {
      <label class="checkbox-wrapper" [class.checkbox--disabled]="disabled()">
        <input
          type="checkbox"
          class="sr-only"
          [checked]="checked()"
          [disabled]="disabled()"
          [indeterminate]="indeterminate()"
          [attr.aria-invalid]="invalid() || null"
          [attr.aria-required]="required() || null"
          (change)="onCheckedChange($event)"
          (blur)="touched.set(true)"
        />
        <span
          class="checkbox-box"
          [class.checkbox-box--checked]="checked()"
          [class.checkbox-box--indeterminate]="indeterminate()"
          [class.checkbox-box--invalid]="invalid()"
        >
          @if (indeterminate()) {
            <ui-icon name="heroMinus" [size]="iconSize()" />
          } @else if (checked()) {
            <ui-icon name="heroCheck" [size]="iconSize()" />
          }
        </span>
        @if (label()) {
          <span class="checkbox-label">{{ label() }}</span>
        }
      </label>
    }
  `,
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
  },
})
export class UiCheckboxComponent implements FormCheckboxControl {
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
  indeterminate = input<boolean>(false);
  size = input<CheckboxSize>('md');
  required = input<boolean>(false);

  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);

  onCheckedChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked.set(input.checked);
  }
}
