import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UiIconComponent, IconSize } from '@ui/shared-ui/icon';

export type AvatarColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'muted';
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

const COLOR_MAP: Record<AvatarColor, AvatarColorConfig> = {
  primary: { bg: 'var(--color-primary-subtle)', color: 'var(--color-primary-emphasis)' },
  success: { bg: 'var(--color-success-subtle)', color: 'var(--color-success-emphasis)' },
  warning: { bg: 'var(--color-warning-subtle)', color: 'var(--color-warning-emphasis)' },
  error: { bg: 'var(--color-error-subtle)', color: 'var(--color-error-emphasis)' },
  info: { bg: 'var(--color-info-subtle)', color: 'var(--color-info-emphasis)' },
  muted: { bg: 'var(--color-surface-sunken)', color: 'var(--color-text-default)' },
};

@Component({
  selector: 'ui-avatar',
  imports: [UiIconComponent],
  template: `
    @if (initials()) {
      <span class="avatar-initials">{{ initials() }}</span>
    } @else {
      <ui-icon name="heroUser" [size]="iconSize()" />
    }
  `,
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  color = input<AvatarColor>('primary');
  size = input<AvatarSize>('md');
  shape = input<AvatarShape>('circle');

  protected sizeConfig = computed(() => SIZE_MAP[this.size()]);
  protected colorConfig = computed(() => COLOR_MAP[this.color()]);
  protected radiusValue = computed(() => SHAPE_MAP[this.shape()]);
  protected iconSize = computed(() => SIZE_MAP[this.size()].iconSize);
  protected ariaLabel = computed(() => this.initials() || 'User avatar');
}
