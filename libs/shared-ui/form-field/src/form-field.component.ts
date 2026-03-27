import {
  ChangeDetectionStrategy,
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
  template: `
    <div class="form-field" [class.form-field--invalid]="invalid()">

      @if (label()) {
        <label class="form-field-label" [attr.for]="controlId()">
          {{ label() }}
          @if (required()) {
            <span class="form-field-required" aria-hidden="true">*</span>
          }
        </label>
      }

      <div class="form-field-control">
        <ng-content />
      </div>

      @if (invalid() && errors().length > 0) {
        <div class="form-field-errors" [id]="errorsId()" role="alert">
          @for (error of errors(); track error.message) {
            <span class="form-field-error">
              <ui-icon name="heroExclamationCircle" size="xs" color="error" />
              {{ error.message }}
            </span>
          }
        </div>
      } @else if (hint()) {
        <span class="form-field-hint" [id]="hintId()">{{ hint() }}</span>
      }

    </div>
  `,
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
