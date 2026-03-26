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

const ICON_SIZE_MAP: Record<BadgeSize, IconSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
};

const SHAPE_MAP: Record<BadgeShape, string> = {
  rounded: 'var(--radius-sm)',
  pill: 'var(--radius-full)',
};

function resolveStyles(variant: BadgeVariant, color: BadgeColor) {
  switch (variant) {
    case 'filled':
      return {
        bg: color === 'muted' ? 'var(--color-text-muted)' : `var(--color-${color}-default)`,
        color: color === 'muted' ? 'var(--color-text-default)' : `var(--color-on-${color})`,
        border: 'none',
      };
    case 'subtle':
      return {
        bg: `var(--color-${color}-subtle)`,
        color: color === 'muted' ? 'var(--color-text-default)' : `var(--color-${color}-emphasis)`,
        border: 'none',
      };
    case 'outline':
      return {
        bg: 'transparent',
        color: color === 'muted' ? 'var(--color-text-muted)' : `var(--color-${color}-default)`,
        border: `1px solid ${color === 'muted' ? 'var(--color-text-muted)' : `var(--color-${color}-default)`}`,
      };
  }
}

@Component({
  selector: 'ui-badge',
  standalone: true,
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

  protected styles = computed(() => resolveStyles(this.variant(), this.color()));
  protected radiusValue = computed(() => SHAPE_MAP[this.shape()]);
  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
}
