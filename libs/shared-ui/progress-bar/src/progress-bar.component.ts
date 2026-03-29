import {
  Component,
  computed,
  input,
} from '@angular/core';

export type ProgressBarVariant = 'default' | 'striped';
export type ProgressBarColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'muted';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

interface ProgressBarColorConfig {
  track: string;
  fill: string;
}

const SIZE_MAP: Record<ProgressBarSize, string> = {
  sm: 'var(--spacing)',
  md: 'calc(var(--spacing) * 2)',
  lg: 'calc(var(--spacing) * 3)',
};

const COLOR_MAP: Record<ProgressBarColor, ProgressBarColorConfig> = {
  primary: { track: 'var(--color-primary-subtle)', fill: 'var(--color-primary-default)' },
  success: { track: 'var(--color-success-subtle)', fill: 'var(--color-success-default)' },
  warning: { track: 'var(--color-warning-subtle)', fill: 'var(--color-warning-default)' },
  error: { track: 'var(--color-error-subtle)', fill: 'var(--color-error-default)' },
  info: { track: 'var(--color-info-subtle)', fill: 'var(--color-info-default)' },
  muted: { track: 'var(--color-surface-sunken)', fill: 'var(--color-text-muted)' },
};

@Component({
  selector: 'ui-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  host: {
    'role': 'progressbar',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': '100',
    '[attr.aria-valuenow]': 'indeterminate() ? null : clampedValue()',
    '[attr.aria-busy]': 'indeterminate() ? "true" : null',
    '[style.--progress-fill-color]': 'colorConfig().fill',
    '[style.--progress-track-color]': 'colorConfig().track',
    '[style.--progress-value]': 'progressValue()',
    '[style.--progress-height]': 'heightValue()',
    '[class.is-indeterminate]': 'indeterminate()',
    '[class.is-striped]': 'variant() === "striped"',
    '[attr.aria-label]': 'label() ?? null',
  },
})
export class UiProgressBarComponent {
  value = input<number>(0);
  variant = input<ProgressBarVariant>('default');
  color = input<ProgressBarColor>('primary');
  size = input<ProgressBarSize>('md');
  indeterminate = input<boolean>(false);
  label = input<string>();

  protected clampedValue = computed(() => Math.max(0, Math.min(100, this.value())));
  protected colorConfig = computed(() => COLOR_MAP[this.color()]);
  protected heightValue = computed(() => SIZE_MAP[this.size()]);
  protected progressValue = computed(() =>
    this.indeterminate() ? '40%' : this.clampedValue() + '%'
  );
}
