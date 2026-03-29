import { Component, computed, input, output } from '@angular/core';
import { UiButtonComponent } from '@ui/shared-ui/button';

@Component({
  selector: 'ui-wizard-bottom-bar',
  imports: [UiButtonComponent],
  template: `
    <div class="wizard-bottom-bar">

      <div class="wizard-bottom-bar-inner">

        <!-- Previous button — hidden on first step -->
        @if (!isFirstStep()) {
          <ui-button
            variant="secondary"
            size="md"
            iconLeft="heroChevronLeft"
            (click)="previous.emit()"
          >
            {{ previousLabel() }}
          </ui-button>
        } @else {
          <div class="wizard-bottom-bar-spacer"></div>
        }

        <!-- Center info -->
        <div class="wizard-bottom-bar-info">
          <span class="wizard-step-label">{{ stepLabel() }}</span>
        </div>

        <!-- Next / Finish button -->
        <ui-button
          variant="primary"
          size="md"
          [iconRight]="isLastStep() ? 'heroCheck' : 'heroChevronRight'"
          [loading]="loading()"
          [disabled]="nextDisabled()"
          (click)="onNext()"
        >
          {{ isLastStep() ? finishLabel() : nextLabel() }}
        </ui-button>

      </div>

    </div>
  `,
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
