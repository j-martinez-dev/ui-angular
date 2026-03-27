import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  signal,
} from '@angular/core';
import {
  FormValueControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree,
} from '@angular/forms/signals';

export type SliderSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-slider',
  template: `
    @if (!hidden()) {
      <div class="slider-wrapper">
        <input
          type="range"
          class="slider-input"
          [value]="value()"
          [min]="min() ?? 0"
          [max]="max() ?? 100"
          [step]="step()"
          [disabled]="disabled()"
          [attr.aria-label]="label()"
          [attr.aria-invalid]="invalid() || null"
          [class.slider-input--invalid]="invalid()"
          [style.--slider-fill-percent]="fillPercent()"
          (input)="onInput($event)"
          (blur)="touched.set(true)"
          (pointerdown)="showTooltip.set(true)"
          (pointerup)="showTooltip.set(false)"
        />
        @if (showTooltip()) {
          <span
            class="slider-tooltip"
            [style.left]="fillPercent()"
          >{{ value() }}</span>
        }
      </div>
    }
  `,
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.slider--disabled]': 'disabled()',
  },
})
export class UiSliderComponent implements FormValueControl<number> {
  // Signal Forms contract
  value = model<number>(0);
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  min = input<number | undefined>(undefined);
  max = input<number | undefined>(undefined);

  // Additional inputs
  label = input<string>('Value');
  step = input<number>(1);
  size = input<SliderSize>('md');

  // Internal state
  showTooltip = signal<boolean>(false);

  protected fillPercent = computed(() => {
    const minVal = this.min() ?? 0;
    const maxVal = this.max() ?? 100;
    const range = maxVal - minVal;
    if (range <= 0) return '0%';
    const clamped = Math.min(Math.max(this.value(), minVal), maxVal);
    return `${((clamped - minVal) / range) * 100}%`;
  });

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(Number(input.value));
  }
}
