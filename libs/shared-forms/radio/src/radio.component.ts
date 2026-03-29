import {
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
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
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
  name = input<string>('');
  size = input<RadioSize>('md');
  required = input<boolean>(false);

  onCheckedChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked.set(input.checked);
  }
}
