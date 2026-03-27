import {
  Component,
  computed,
  input,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type IconColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'muted'
  | 'disabled'
  | 'accent-1'
  | 'accent-2'
  | 'accent-3';

const SIZE_MAP: Record<IconSize, string> = {
  xs: 'var(--icon-size-xs)',
  sm: 'var(--icon-size-sm)',
  md: 'var(--icon-size-md)',
  lg: 'var(--icon-size-lg)',
  xl: 'var(--icon-size-xl)',
  '2xl': 'var(--icon-size-2xl)',
};

const COLOR_MAP: Record<IconColor, string> = {
  default: 'var(--color-text-default)',
  primary: 'var(--color-primary-default)',
  success: 'var(--color-success-default)',
  warning: 'var(--color-warning-default)',
  error: 'var(--color-error-default)',
  info: 'var(--color-info-default)',
  muted: 'var(--color-text-muted)',
  disabled: 'var(--color-text-disabled)',
  'accent-1': 'var(--color-accent-1-default)',
  'accent-2': 'var(--color-accent-2-default)',
  'accent-3': 'var(--color-accent-3-default)',
};

@Component({
  selector: 'ui-icon',
  imports: [NgIcon],
  template: `<ng-icon [name]="name()" />`,
  styleUrl: './icon.component.scss',
  host: {
    '[style.font-size]': 'sizeValue()',
    '[style.color]': 'colorValue()',
    '[attr.aria-hidden]': '!label() ? "true" : null',
    '[attr.role]': 'label() ? "img" : null',
    '[attr.aria-label]': 'label() || null',
  },
})
export class UiIconComponent {
  name = input.required<string>();
  size = input<IconSize>('md');
  color = input<IconColor>();
  label = input<string>();

  protected sizeValue = computed(() => SIZE_MAP[this.size()]);
  protected colorValue = computed(() => {
    const c = this.color();
    return c ? COLOR_MAP[c] : undefined;
  });
}
