import {
  Component,
  computed,
  input,
} from '@angular/core';

export type SpinnerVariant = 'circular' | 'dots';
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'muted';

const SIZE_MAP: Record<SpinnerSize, string> = {
  xs: 'var(--icon-size-xs)',
  sm: 'var(--icon-size-sm)',
  md: 'var(--icon-size-md)',
  lg: 'var(--icon-size-lg)',
  xl: 'var(--icon-size-xl)',
};

const COLOR_MAP: Record<SpinnerColor, string> = {
  primary: 'var(--color-primary-default)',
  success: 'var(--color-success-default)',
  warning: 'var(--color-warning-default)',
  error: 'var(--color-error-default)',
  info: 'var(--color-info-default)',
  muted: 'var(--color-text-muted)',
};

@Component({
  selector: 'ui-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  host: {
    'role': 'status',
    '[style.--spinner-color]': 'colorValue()',
    '[style.--spinner-size]': 'sizeValue()',
  },
})
export class UiSpinnerComponent {
  variant = input<SpinnerVariant>('circular');
  size = input<SpinnerSize>('md');
  color = input<SpinnerColor>('primary');
  label = input<string>('Chargement...');

  protected sizeValue = computed(() => SIZE_MAP[this.size()]);
  protected colorValue = computed(() => COLOR_MAP[this.color()]);
}
