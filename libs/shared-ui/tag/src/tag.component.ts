import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiIconComponent } from '@ui/shared-ui/icon';

export type TagVariant = 'filled' | 'subtle' | 'outline';
export type TagColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'muted';
export type TagSize = 'sm' | 'md' | 'lg';

interface TagStyles {
  bg: string;
  color: string;
  border: string;
  hoverBg: string;
}

const FILLED_MAP: Record<TagColor, TagStyles> = {
  primary: {
    bg: 'var(--color-primary-default)',
    color: 'var(--color-on-primary)',
    border: 'none',
    hoverBg: 'var(--color-primary-emphasis)',
  },
  success: {
    bg: 'var(--color-success-default)',
    color: 'var(--color-on-success)',
    border: 'none',
    hoverBg: 'var(--color-success-emphasis)',
  },
  warning: {
    bg: 'var(--color-warning-default)',
    color: 'var(--color-on-warning)',
    border: 'none',
    hoverBg: 'var(--color-warning-emphasis)',
  },
  error: {
    bg: 'var(--color-error-default)',
    color: 'var(--color-on-error)',
    border: 'none',
    hoverBg: 'var(--color-error-emphasis)',
  },
  info: {
    bg: 'var(--color-info-default)',
    color: 'var(--color-on-info)',
    border: 'none',
    hoverBg: 'var(--color-info-emphasis)',
  },
  muted: {
    bg: 'var(--color-border-default)',
    color: 'var(--color-text-default)',
    border: 'none',
    hoverBg: 'var(--color-border-strong)',
  },
};

const SUBTLE_MAP: Record<TagColor, TagStyles> = {
  primary: {
    bg: 'var(--color-primary-subtle)',
    color: 'var(--color-primary-emphasis)',
    border: 'none',
    hoverBg: 'oklch(from var(--color-primary-subtle) calc(l - 0.05) c h)',
  },
  success: {
    bg: 'var(--color-success-subtle)',
    color: 'var(--color-success-emphasis)',
    border: 'none',
    hoverBg: 'oklch(from var(--color-success-subtle) calc(l - 0.05) c h)',
  },
  warning: {
    bg: 'var(--color-warning-subtle)',
    color: 'var(--color-warning-emphasis)',
    border: 'none',
    hoverBg: 'oklch(from var(--color-warning-subtle) calc(l - 0.05) c h)',
  },
  error: {
    bg: 'var(--color-error-subtle)',
    color: 'var(--color-error-emphasis)',
    border: 'none',
    hoverBg: 'oklch(from var(--color-error-subtle) calc(l - 0.05) c h)',
  },
  info: {
    bg: 'var(--color-info-subtle)',
    color: 'var(--color-info-emphasis)',
    border: 'none',
    hoverBg: 'oklch(from var(--color-info-subtle) calc(l - 0.05) c h)',
  },
  muted: {
    bg: 'var(--color-border-default)',
    color: 'var(--color-text-default)',
    border: 'none',
    hoverBg: 'var(--color-border-strong)',
  },
};

const OUTLINE_MAP: Record<TagColor, TagStyles> = {
  primary: {
    bg: 'transparent',
    color: 'var(--color-primary-default)',
    border: '1px solid var(--color-primary-default)',
    hoverBg: 'var(--color-primary-subtle)',
  },
  success: {
    bg: 'transparent',
    color: 'var(--color-success-default)',
    border: '1px solid var(--color-success-default)',
    hoverBg: 'var(--color-success-subtle)',
  },
  warning: {
    bg: 'transparent',
    color: 'var(--color-warning-default)',
    border: '1px solid var(--color-warning-default)',
    hoverBg: 'var(--color-warning-subtle)',
  },
  error: {
    bg: 'transparent',
    color: 'var(--color-error-default)',
    border: '1px solid var(--color-error-default)',
    hoverBg: 'var(--color-error-subtle)',
  },
  info: {
    bg: 'transparent',
    color: 'var(--color-info-default)',
    border: '1px solid var(--color-info-default)',
    hoverBg: 'var(--color-info-subtle)',
  },
  muted: {
    bg: 'transparent',
    color: 'var(--color-text-muted)',
    border: '1px solid var(--color-border-default)',
    hoverBg: 'var(--color-surface-sunken)',
  },
};

const VARIANT_MAPS: Record<TagVariant, Record<TagColor, TagStyles>> = {
  filled: FILLED_MAP,
  subtle: SUBTLE_MAP,
  outline: OUTLINE_MAP,
};

@Component({
  selector: 'ui-tag',
  imports: [UiIconComponent],
  template: `
    <span
      class="tag"
      [class.tag--clickable]="clickable()"
      [attr.role]="clickable() ? 'button' : null"
      [attr.tabindex]="clickable() ? 0 : null"
      (click)="onClick()"
      (keydown)="onKeydown($event)"
    >
      <span class="tag-label">
        <ng-content />
      </span>

      @if (removable()) {
        <button
          type="button"
          class="tag-remove"
          aria-label="Remove"
          (click)="onRemove($event)"
        >
          <ui-icon name="heroXMark" size="xs" />
        </button>
      }
    </span>
  `,
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--tag-bg]': 'styles().bg',
    '[style.--tag-color]': 'styles().color',
    '[style.--tag-border]': 'styles().border',
    '[style.--tag-hover-bg]': 'styles().hoverBg',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
  },
})
export class UiTagComponent {
  variant = input<TagVariant>('subtle');
  color = input<TagColor>('primary');
  size = input<TagSize>('md');
  removable = input<boolean>(false);
  clickable = input<boolean>(false);

  removed = output<void>();
  tagClick = output<void>();

  protected styles = computed(() => VARIANT_MAPS[this.variant()][this.color()]);

  onClick(): void {
    if (this.clickable()) this.tagClick.emit();
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.removed.emit();
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.clickable() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.tagClick.emit();
    }
  }
}
