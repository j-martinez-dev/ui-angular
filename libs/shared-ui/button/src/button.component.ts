import {
  Component,
  computed,
  input,
} from '@angular/core';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { UiSpinnerComponent, type SpinnerSize } from '@ui/shared-ui/spinner';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'accent-1'
  | 'accent-2'
  | 'accent-3';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStyles {
  bg: string;
  color: string;
  border: string;
  hoverBg: string;
}

const VARIANT_MAP: Record<ButtonVariant, ButtonStyles> = {
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
  template: `
    <button
      [type]="type()"
      class="btn"
      [disabled]="disabled() || loading()"
      [class.btn--full-width]="fullWidth()"
      [class.btn--loading]="loading()"
      [class.btn--disabled]="disabled()"
      [attr.aria-busy]="loading() || null"
    >
      @if (loading()) {
        <ui-spinner [size]="spinnerSize()" color="muted" />
      } @else if (iconLeft()) {
        <ui-icon [name]="iconLeft()!" [size]="iconSize()" />
      }

      <span class="btn-label">
        <ng-content />
      </span>

      @if (!loading() && iconRight()) {
        <ui-icon [name]="iconRight()!" [size]="iconSize()" />
      }
    </button>
  `,
  styleUrl: './button.component.scss',
  host: {
    '[style.--btn-bg]': 'styles().bg',
    '[style.--btn-color]': 'styles().color',
    '[style.--btn-border]': 'styles().border',
    '[style.--btn-hover-bg]': 'styles().hoverBg',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
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

  protected styles = computed(() => VARIANT_MAP[this.variant()]);
  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
  protected spinnerSize = computed(() => SPINNER_SIZE_MAP[this.size()]);
}
