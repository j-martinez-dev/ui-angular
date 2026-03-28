import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiIconComponent } from '@ui/shared-ui/icon';

export type AlertVariant = 'filled' | 'subtle' | 'outline';
export type AlertColor = 'success' | 'warning' | 'error' | 'info';

interface AlertStyles {
  bg: string;
  color: string;
  border: string;
}

const ICON_MAP: Record<AlertColor, string> = {
  success: 'heroCheckCircle',
  warning: 'heroExclamationTriangle',
  error: 'heroXCircle',
  info: 'heroInformationCircle',
};

const FILLED_MAP: Record<AlertColor, AlertStyles> = {
  success: {
    bg: 'var(--color-success-default)',
    color: 'var(--color-on-success)',
    border: 'none',
  },
  warning: {
    bg: 'var(--color-warning-default)',
    color: 'var(--color-on-warning)',
    border: 'none',
  },
  error: {
    bg: 'var(--color-error-default)',
    color: 'var(--color-on-error)',
    border: 'none',
  },
  info: {
    bg: 'var(--color-info-default)',
    color: 'var(--color-on-info)',
    border: 'none',
  },
};

const SUBTLE_MAP: Record<AlertColor, AlertStyles> = {
  success: {
    bg: 'var(--color-success-subtle)',
    color: 'var(--color-success-emphasis)',
    border: 'none',
  },
  warning: {
    bg: 'var(--color-warning-subtle)',
    color: 'var(--color-warning-emphasis)',
    border: 'none',
  },
  error: {
    bg: 'var(--color-error-subtle)',
    color: 'var(--color-error-emphasis)',
    border: 'none',
  },
  info: {
    bg: 'var(--color-info-subtle)',
    color: 'var(--color-info-emphasis)',
    border: 'none',
  },
};

const OUTLINE_MAP: Record<AlertColor, AlertStyles> = {
  success: {
    bg: 'var(--color-surface-raised)',
    color: 'var(--color-success-default)',
    border: '1px solid var(--color-success-default)',
  },
  warning: {
    bg: 'var(--color-surface-raised)',
    color: 'var(--color-warning-default)',
    border: '1px solid var(--color-warning-default)',
  },
  error: {
    bg: 'var(--color-surface-raised)',
    color: 'var(--color-error-default)',
    border: '1px solid var(--color-error-default)',
  },
  info: {
    bg: 'var(--color-surface-raised)',
    color: 'var(--color-info-default)',
    border: '1px solid var(--color-info-default)',
  },
};

const VARIANT_MAPS: Record<AlertVariant, Record<AlertColor, AlertStyles>> = {
  filled: FILLED_MAP,
  subtle: SUBTLE_MAP,
  outline: OUTLINE_MAP,
};

@Component({
  selector: 'ui-alert',
  imports: [UiIconComponent],
  template: `
    <div class="alert" [attr.role]="live() === 'off' ? null : 'alert'" [attr.aria-live]="live()">
      <ui-icon [name]="resolvedIcon()" size="md" />

      <div class="alert-content">
        @if (title()) {
          <p class="alert-title">{{ title() }}</p>
        }
        <div class="alert-message">
          <ng-content />
        </div>
        @if (actionLabel()) {
          <button
            type="button"
            class="alert-action"
            (click)="actionClick.emit()"
          >{{ actionLabel() }}</button>
        }
      </div>

      @if (removable()) {
        <button
          type="button"
          class="alert-close"
          aria-label="Fermer l'alerte"
          (click)="removed.emit()"
        >
          <ui-icon name="heroXMark" size="sm" />
        </button>
      }
    </div>
  `,
  styleUrl: './alert.component.scss',
  host: {
    '[style.--alert-bg]': 'styles().bg',
    '[style.--alert-color]': 'styles().color',
    '[style.--alert-border]': 'styles().border',
  },
})
export class UiAlertComponent {
  live = input<'assertive' | 'polite' | 'off'>('assertive');
  variant = input<AlertVariant>('subtle');
  color = input<AlertColor>('info');
  title = input<string>();
  actionLabel = input<string>();
  removable = input<boolean>(false);
  icon = input<string>();

  removed = output<void>();
  actionClick = output<void>();

  protected styles = computed(() => VARIANT_MAPS[this.variant()][this.color()]);
  protected resolvedIcon = computed(() => this.icon() ?? ICON_MAP[this.color()]);
}
