import {
  Component,
  input,
} from '@angular/core';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { type StepperItem } from './stepper.types';

export type StepperOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ui-stepper',
  imports: [UiIconComponent],
  styleUrl: './stepper.component.scss',
  host: {
    'role': 'navigation',
    '[attr.aria-label]': 'label()',
  },
  template: `
    @if (!hidden()) {
      <ol
        class="stepper"
        [class.stepper--horizontal]="orientation() === 'horizontal'"
        [class.stepper--vertical]="orientation() === 'vertical'"
      >
        @for (step of steps(); track $index; let last = $last) {
          <li
            class="stepper-step"
            [class.stepper-step--completed]="isCompleted($index)"
            [class.stepper-step--active]="isActive($index)"
            [class.stepper-step--pending]="isPending($index)"
            [attr.aria-current]="isActive($index) ? 'step' : null"
          >
            <div class="stepper-indicator">
              @if (isCompleted($index)) {
                <ui-icon name="heroCheck" size="sm" />
              } @else {
                <span class="stepper-number">{{ $index + 1 }}</span>
              }
            </div>

            <div class="stepper-content">
              <span class="stepper-label">{{ step.label }}</span>
              @if (step.description) {
                <span class="stepper-description">{{ step.description }}</span>
              }
            </div>

            @if (!last) {
              <div class="stepper-connector" aria-hidden="true"></div>
            }
          </li>
        }
      </ol>
    }
  `,
})
export class UiStepperComponent {
  steps = input.required<StepperItem[]>();
  currentStep = input.required<number>();
  orientation = input<StepperOrientation>('horizontal');
  hidden = input<boolean>(false);
  label = input<string>('Progression');

  protected isCompleted(index: number): boolean {
    return index + 1 < this.currentStep();
  }

  protected isActive(index: number): boolean {
    return index + 1 === this.currentStep();
  }

  protected isPending(index: number): boolean {
    return index + 1 > this.currentStep();
  }
}
