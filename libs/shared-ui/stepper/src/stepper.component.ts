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
  templateUrl: './stepper.component.html',
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
