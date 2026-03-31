import {
  Component,
  computed,
  contentChild,
  input,
} from '@angular/core';
import { FormField } from '@angular/forms/signals';
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

  private readonly field = contentChild(FormField);

  /** Whether the field is required — derived from the FormField state */
  required = computed(() => this.field()?.state().required() ?? false);

  /** Whether the field is invalid — derived from the FormField state */
  invalid = computed(() => this.field()?.state().invalid() ?? false);

  /** Whether the field has been touched — derived from the FormField state */
  touched = computed(() => this.field()?.state().touched() ?? false);

  /** Validation errors — derived from the FormField state */
  errors = computed(() => this.field()?.state().errors() ?? []);

  private readonly fieldId = `ui-form-field-${nextId++}`;

  /** Pass this to the control's [id] input to link the <label> */
  controlId = computed(() => `${this.fieldId}-control`);

  /** Pass this to the control's [ariaDescribedBy] input to link hint text */
  hintId = computed(() => `${this.fieldId}-hint`);

  /** Pass this to the control's [ariaDescribedBy] input to link error messages */
  errorsId = computed(() => `${this.fieldId}-errors`);

  /** The current describedBy id (hint or errors, depending on state) */
  describedBy = computed(() => {
    if (this.invalid() && this.touched() && this.errors().length > 0) return this.errorsId();
    if (this.hint()) return this.hintId();
    return null;
  });
}
