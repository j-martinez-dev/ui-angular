import {
  Component,
  computed,
  input,
} from '@angular/core';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { UiSpinnerComponent, type SpinnerSize } from '@ui/shared-ui/spinner';
import { UiTooltipDirective } from '@ui/shared-ui/tooltip';
import { BUTTON_VARIANT_MAP, type ButtonVariant } from '@ui/shared-ui/button';

export type IconButtonVariant = ButtonVariant;
export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonShape = 'square' | 'circle';

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
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
  host: {
    '[style.--icon-btn-bg]': 'styles().bg',
    '[style.--icon-btn-color]': 'styles().color',
    '[style.--icon-btn-border]': 'styles().border',
    '[style.--icon-btn-hover-bg]': 'styles().hoverBg',
    '[style.--icon-btn-radius]': 'radiusValue()',
    '[style.--icon-btn-size]': 'dimensionValue()',
    '[style.pointer-events]': 'disabled() || loading() ? "none" : null',
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

  protected styles = computed(() => BUTTON_VARIANT_MAP[this.variant()]);
  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
  protected spinnerSize = computed(() => SPINNER_SIZE_MAP[this.size()]);
  protected radiusValue = computed(() => SHAPE_MAP[this.shape()]);
  protected dimensionValue = computed(() => DIMENSION_MAP[this.size()]);
}
