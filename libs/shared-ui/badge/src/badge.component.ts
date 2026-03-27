import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UiIconComponent, IconSize } from '@ui/shared-ui/icon';

export type BadgeVariant = 'filled' | 'subtle' | 'outline';
export type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'muted';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill';

interface BadgeStyles {
  bg: string;
  color: string;
  border: string;
}

const ICON_SIZE_MAP: Record<BadgeSize, IconSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
};

const SHAPE_MAP: Record<BadgeShape, string> = {
  rounded: 'var(--radius-sm)',
  pill: 'var(--radius-full)',
};

const FILLED_MAP: Record<BadgeColor, BadgeStyles> = {
  primary: { bg: 'var(--color-primary-default)', color: 'var(--color-on-primary)', border: 'none' },
  success: { bg: 'var(--color-success-default)', color: 'var(--color-on-success)', border: 'none' },
  warning: { bg: 'var(--color-warning-default)', color: 'var(--color-on-warning)', border: 'none' },
  error: { bg: 'var(--color-error-default)', color: 'var(--color-on-error)', border: 'none' },
  info: { bg: 'var(--color-info-default)', color: 'var(--color-on-info)', border: 'none' },
  muted: { bg: 'var(--color-text-muted)', color: 'var(--color-text-default)', border: 'none' },
};

const SUBTLE_MAP: Record<BadgeColor, BadgeStyles> = {
  primary: { bg: 'var(--color-primary-subtle)', color: 'var(--color-primary-emphasis)', border: 'none' },
  success: { bg: 'var(--color-success-subtle)', color: 'var(--color-success-emphasis)', border: 'none' },
  warning: { bg: 'var(--color-warning-subtle)', color: 'var(--color-warning-emphasis)', border: 'none' },
  error: { bg: 'var(--color-error-subtle)', color: 'var(--color-error-emphasis)', border: 'none' },
  info: { bg: 'var(--color-info-subtle)', color: 'var(--color-info-emphasis)', border: 'none' },
  muted: { bg: 'var(--color-surface-sunken)', color: 'var(--color-text-default)', border: 'none' },
};

const OUTLINE_MAP: Record<BadgeColor, BadgeStyles> = {
  primary: { bg: 'transparent', color: 'var(--color-primary-default)', border: '1px solid var(--color-primary-default)' },
  success: { bg: 'transparent', color: 'var(--color-success-default)', border: '1px solid var(--color-success-default)' },
  warning: { bg: 'transparent', color: 'var(--color-warning-default)', border: '1px solid var(--color-warning-default)' },
  error: { bg: 'transparent', color: 'var(--color-error-default)', border: '1px solid var(--color-error-default)' },
  info: { bg: 'transparent', color: 'var(--color-info-default)', border: '1px solid var(--color-info-default)' },
  muted: { bg: 'transparent', color: 'var(--color-text-muted)', border: '1px solid var(--color-text-muted)' },
};

const VARIANT_MAPS: Record<BadgeVariant, Record<BadgeColor, BadgeStyles>> = {
  filled: FILLED_MAP,
  subtle: SUBTLE_MAP,
  outline: OUTLINE_MAP,
};

@Component({
  selector: 'ui-badge',
  imports: [UiIconComponent],
  template: `
    @if (icon()) {
      <ui-icon [name]="icon()!" [size]="iconSize()" />
    }
    <span>
      <ng-content />
    </span>
  `,
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--badge-bg]': 'styles().bg',
    '[style.--badge-color]': 'styles().color',
    '[style.--badge-border]': 'styles().border',
    '[style.border-radius]': 'radiusValue()',
    '[class.badge-sm]': 'size() === "sm"',
    '[class.badge-md]': 'size() === "md"',
    '[class.badge-lg]': 'size() === "lg"',
  },
})
export class UiBadgeComponent {
  variant = input<BadgeVariant>('filled');
  color = input<BadgeColor>('primary');
  size = input<BadgeSize>('md');
  shape = input<BadgeShape>('rounded');
  icon = input<string>();

  protected styles = computed(() => VARIANT_MAPS[this.variant()][this.color()]);
  protected radiusValue = computed(() => SHAPE_MAP[this.shape()]);
  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
}
