import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { UiSpinnerComponent, type SpinnerSize } from '@ui/shared-ui/spinner';
import { UiTooltipDirective } from '@ui/shared-ui/tooltip';

export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'accent-1'
  | 'accent-2'
  | 'accent-3';

export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonShape = 'square' | 'circle';

interface IconButtonStyles {
  bg: string;
  color: string;
  border: string;
  hoverBg: string;
}

const VARIANT_MAP: Record<IconButtonVariant, IconButtonStyles> = {
  primary: {
    bg: 'var(--color-primary-default)',
    color: 'var(--color-on-primary)',
    border: 'none',
    hoverBg: 'var(--color-primary-emphasis)',
  },
  secondary: {
    bg: 'transparent',
    color: 'var(--color-primary-default)',
    border: '1px solid var(--color-primary-default)',
    hoverBg: 'var(--color-primary-subtle)',
  },
  ghost: {
    bg: 'transparent',
    color: 'var(--color-primary-default)',
    border: 'none',
    hoverBg: 'var(--color-primary-subtle)',
  },
  danger: {
    bg: 'var(--color-error-default)',
    color: 'var(--color-on-error)',
    border: 'none',
    hoverBg: 'var(--color-error-emphasis)',
  },
  'accent-1': {
    bg: 'var(--color-accent-1-default)',
    color: 'var(--color-on-accent-1)',
    border: 'none',
    hoverBg: 'var(--color-accent-1-emphasis)',
  },
  'accent-2': {
    bg: 'var(--color-accent-2-default)',
    color: 'var(--color-on-accent-2)',
    border: 'none',
    hoverBg: 'var(--color-accent-2-emphasis)',
  },
  'accent-3': {
    bg: 'var(--color-accent-3-default)',
    color: 'var(--color-on-accent-3)',
    border: 'none',
    hoverBg: 'var(--color-accent-3-emphasis)',
  },
};

const ICON_SIZE_MAP: Record<IconButtonSize, IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const SPINNER_SIZE_MAP: Record<IconButtonSize, SpinnerSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'md',
};

const SHAPE_MAP: Record<IconButtonShape, string> = {
  square: 'var(--radius-md)',
  circle: 'var(--radius-full)',
};

const DIMENSION_MAP: Record<IconButtonSize, string> = {
  sm: 'calc(var(--spacing) * 7)',
  md: 'calc(var(--spacing) * 9)',
  lg: 'calc(var(--spacing) * 11)',
};

@Component({
  selector: 'ui-icon-button',
  imports: [UiIconComponent, UiSpinnerComponent, UiTooltipDirective],
  template: `
    <button
      [type]="type()"
      [attr.aria-label]="label()"
      [disabled]="disabled() || loading()"
      [uiTooltip]="label()"
      [uiTooltipPosition]="tooltipPosition()"
      [attr.aria-busy]="loading() || null"
      class="icon-btn"
      [class.icon-btn--loading]="loading()"
      [class.icon-btn--disabled]="disabled()"
    >
      @if (loading()) {
        <ui-spinner [size]="spinnerSize()" color="muted" />
      } @else {
        <ui-icon [name]="icon()" [size]="iconSize()" />
      }
    </button>
  `,
  styleUrl: './icon-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--icon-btn-bg]': 'styles().bg',
    '[style.--icon-btn-color]': 'styles().color',
    '[style.--icon-btn-border]': 'styles().border',
    '[style.--icon-btn-hover-bg]': 'styles().hoverBg',
    '[style.--icon-btn-radius]': 'radiusValue()',
    '[style.--icon-btn-size]': 'dimensionValue()',
  },
})
export class UiIconButtonComponent {
  icon = input.required<string>();
  label = input.required<string>();
  variant = input<IconButtonVariant>('ghost');
  size = input<IconButtonSize>('md');
  shape = input<IconButtonShape>('square');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');

  protected styles = computed(() => VARIANT_MAP[this.variant()]);
  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
  protected spinnerSize = computed(() => SPINNER_SIZE_MAP[this.size()]);
  protected radiusValue = computed(() => SHAPE_MAP[this.shape()]);
  protected dimensionValue = computed(() => DIMENSION_MAP[this.size()]);
}
