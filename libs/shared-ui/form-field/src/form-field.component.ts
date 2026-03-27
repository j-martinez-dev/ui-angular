import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { UiIconComponent } from '@ui/shared-ui/icon';

@Component({
  selector: 'ui-form-field',
  imports: [UiIconComponent],
  template: `
    <div class="form-field" [class.form-field--invalid]="invalid()">

      @if (label()) {
        <label class="form-field-label">
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
        <div class="form-field-errors" role="alert">
          @for (error of errors(); track error.message) {
            <span class="form-field-error">
              <ui-icon name="heroExclamationCircle" size="xs" color="error" />
              {{ error.message }}
            </span>
          }
        </div>
      } @else if (hint()) {
        <span class="form-field-hint">{{ hint() }}</span>
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
}
