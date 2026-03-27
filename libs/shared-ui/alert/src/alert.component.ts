import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { UiButtonComponent } from '@ui/shared-ui/button';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';

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
    bg: 'transparent',
    color: 'var(--color-success-default)',
    border: '1px solid var(--color-success-default)',
  },
  warning: {
    bg: 'transparent',
    color: 'var(--color-warning-default)',
    border: '1px solid var(--color-warning-default)',
  },
  error: {
    bg: 'transparent',
    color: 'var(--color-error-default)',
    border: '1px solid var(--color-error-default)',
  },
  info: {
    bg: 'transparent',
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
  imports: [UiIconComponent, UiButtonComponent, UiIconButtonComponent],
  template: `
    <div class="alert" role="alert">
      <ui-icon [name]="resolvedIcon()" size="md" />

      <div class="alert-content">
        @if (title()) {
          <p class="alert-title">{{ title() }}</p>
        }
        <div class="alert-message">
          <ng-content />
        </div>
        @if (actionLabel()) {
          <ui-button
            variant="ghost"
            size="sm"
            class="alert-action"
            (click)="actionClick.emit()"
          >
            {{ actionLabel() }}
          </ui-button>
        }
      </div>

      @if (removable()) {
        <ui-icon-button
          icon="heroXMark"
          variant="ghost"
          size="sm"
          label="Close alert"
          class="alert-close"
          (click)="removed.emit()"
        />
      }
    </div>
  `,
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--alert-bg]': 'styles().bg',
    '[style.--alert-color]': 'styles().color',
    '[style.--alert-border]': 'styles().border',
  },
})
export class UiAlertComponent {
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
