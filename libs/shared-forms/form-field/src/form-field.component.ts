import {
  Component,
  computed,
  input,
} from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { UiIconComponent } from '@ui/shared-ui/icon';

let nextId = 0;

@Component({
  selector: 'ui-form-field',
  imports: [UiIconComponent],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class UiFormFieldComponent {
  label = input<string>();
  hint = input<string>();
  required = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly ValidationError[]>([]);

  private readonly fieldId = `ui-form-field-${nextId++}`;

  /** Pass this to the control's [id] input to link the <label> */
  controlId = computed(() => `${this.fieldId}-control`);

  /** Pass this to the control's [ariaDescribedBy] input to link hint text */
  hintId = computed(() => `${this.fieldId}-hint`);

  /** Pass this to the control's [ariaDescribedBy] input to link error messages */
  errorsId = computed(() => `${this.fieldId}-errors`);

  /** The current describedBy id (hint or errors, depending on state) */
  describedBy = computed(() => {
    if (this.invalid() && this.errors().length > 0) return this.errorsId();
    if (this.hint()) return this.hintId();
    return null;
  });
}
