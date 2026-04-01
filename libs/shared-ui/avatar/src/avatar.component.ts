import {
  Component,
  computed,
  input,
} from '@angular/core';
import { UiIconComponent, IconSize } from '@ui/shared-ui/icon';

export type AvatarVariant = 'subtle' | 'inverted';
export type AvatarColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'muted' | 'accent-1' | 'accent-2' | 'accent-3';
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

interface AvatarSizeConfig {
  dimension: string;
  fontSize: string;
  iconSize: IconSize;
}

const SIZE_MAP: Record<AvatarSize, AvatarSizeConfig> = {
  sm: { dimension: 'var(--avatar-size-sm)', fontSize: 'var(--text-xs)', iconSize: 'sm' },
  md: { dimension: 'var(--avatar-size-md)', fontSize: 'var(--text-sm)', iconSize: 'md' },
  lg: { dimension: 'var(--avatar-size-lg)', fontSize: 'var(--text-base)', iconSize: 'md' },
  xl: { dimension: 'var(--avatar-size-xl)', fontSize: 'var(--text-lg)', iconSize: 'lg' },
};

const SHAPE_MAP: Record<AvatarShape, string> = {
  circle: 'var(--radius-full)',
  square: 'var(--radius-md)',
};

interface AvatarColorConfig {
  bg: string;
  color: string;
}

const SUBTLE_MAP: Record<AvatarColor, AvatarColorConfig> = {
  primary: { bg: 'var(--color-primary-subtle)', color: 'var(--color-primary-emphasis)' },
  success: { bg: 'var(--color-success-subtle)', color: 'var(--color-success-emphasis)' },
  warning: { bg: 'var(--color-warning-subtle)', color: 'var(--color-warning-emphasis)' },
  error: { bg: 'var(--color-error-subtle)', color: 'var(--color-error-emphasis)' },
  info: { bg: 'var(--color-info-subtle)', color: 'var(--color-info-emphasis)' },
  muted: { bg: 'var(--color-surface-sunken)', color: 'var(--color-text-default)' },
  'accent-1': { bg: 'var(--color-accent-1-subtle)', color: 'var(--color-accent-1-emphasis)' },
  'accent-2': { bg: 'var(--color-accent-2-subtle)', color: 'var(--color-accent-2-emphasis)' },
  'accent-3': { bg: 'var(--color-accent-3-subtle)', color: 'var(--color-accent-3-emphasis)' },
};

const INVERTED_MAP: Record<AvatarColor, AvatarColorConfig> = {
  primary: { bg: 'var(--color-primary-emphasis)', color: 'var(--color-on-primary)' },
  success: { bg: 'var(--color-success-emphasis)', color: 'var(--color-on-success)' },
  warning: { bg: 'var(--color-warning-emphasis)', color: 'var(--color-on-warning)' },
  error: { bg: 'var(--color-error-emphasis)', color: 'var(--color-on-error)' },
  info: { bg: 'var(--color-info-emphasis)', color: 'var(--color-on-info)' },
  muted: { bg: 'var(--color-text-default)', color: 'var(--color-surface-base)' },
  'accent-1': { bg: 'var(--color-accent-1-emphasis)', color: 'var(--color-on-accent-1)' },
  'accent-2': { bg: 'var(--color-accent-2-emphasis)', color: 'var(--color-on-accent-2)' },
  'accent-3': { bg: 'var(--color-accent-3-emphasis)', color: 'var(--color-on-accent-3)' },
};

const VARIANT_MAPS: Record<AvatarVariant, Record<AvatarColor, AvatarColorConfig>> = {
  subtle: SUBTLE_MAP,
  inverted: INVERTED_MAP,
};

@Component({
  selector: 'ui-avatar',
  imports: [UiIconComponent],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  host: {
    'role': 'img',
    '[attr.aria-label]': 'ariaLabel()',
    '[style.--avatar-bg]': 'colorConfig().bg',
    '[style.--avatar-color]': 'colorConfig().color',
    '[style.--avatar-radius]': 'radiusValue()',
    '[style.width]': 'sizeConfig().dimension',
    '[style.height]': 'sizeConfig().dimension',
    '[style.font-size]': 'sizeConfig().fontSize',
  },
})
export class UiAvatarComponent {
  initials = input<string>();
  variant = input<AvatarVariant>('subtle');
  color = input<AvatarColor>('primary');
  size = input<AvatarSize>('md');
  shape = input<AvatarShape>('circle');

  protected sizeConfig = computed(() => SIZE_MAP[this.size()]);
  protected colorConfig = computed(() => VARIANT_MAPS[this.variant()][this.color()]);
  protected radiusValue = computed(() => SHAPE_MAP[this.shape()]);
  protected iconSize = computed(() => SIZE_MAP[this.size()].iconSize);
  protected ariaLabel = computed(() => this.initials() || 'User avatar');
}
