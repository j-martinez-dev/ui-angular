import { Component, computed, input, output } from '@angular/core';
import { UiButtonComponent } from '@ui/shared-ui/button';

@Component({
  selector: 'ui-wizard-bottom-bar',
  imports: [UiButtonComponent],
  templateUrl: './wizard-bottom-bar.component.html',
  styleUrl: './wizard-bottom-bar.component.scss',
})
export class UiWizardBottomBarComponent {
  currentStep = input.required<number>();
  totalSteps = input.required<number>();
  previousLabel = input<string>('Précédent');
  nextLabel = input<string>('Suivant');
  finishLabel = input<string>('Terminer');
  nextDisabled = input<boolean>(false);
  loading = input<boolean>(false);

  previous = output<void>();
  next = output<void>();
  finish = output<void>();

  isFirstStep = computed(() => this.currentStep() === 1);
  isLastStep = computed(() => this.currentStep() === this.totalSteps());

  stepLabel = computed(() =>
    `Étape ${this.currentStep()} sur ${this.totalSteps()}`
  );

  onNext(): void {
    if (this.isLastStep()) {
      this.finish.emit();
    } else {
      this.next.emit();
    }
  }
}
