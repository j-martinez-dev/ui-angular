import {
  Component,
  computed,
  input,
} from '@angular/core';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { UiSpinnerComponent, type SpinnerSize } from '@ui/shared-ui/spinner';
import { BUTTON_VARIANT_MAP, type ButtonVariant } from './button-variants';

export { ButtonVariant };
export type ButtonSize = 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<ButtonSize, IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'md',
};

const SPINNER_SIZE_MAP: Record<ButtonSize, SpinnerSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'md',
};

@Component({
  selector: 'ui-button',
  imports: [UiIconComponent, UiSpinnerComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[style.--btn-bg]': 'styles().bg',
    '[style.--btn-color]': 'styles().color',
    '[style.--btn-border]': 'styles().border',
    '[style.--btn-hover-bg]': 'styles().hoverBg',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[style.pointer-events]': 'disabled() || loading() ? "none" : null',
  },
})
export class UiButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);
  iconLeft = input<string>();
  iconRight = input<string>();

  protected styles = computed(() => BUTTON_VARIANT_MAP[this.variant()]);
  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
  protected spinnerSize = computed(() => SPINNER_SIZE_MAP[this.size()]);
}
