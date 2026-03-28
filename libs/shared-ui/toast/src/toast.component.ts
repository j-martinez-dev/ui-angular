import {
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { UiIconComponent, type IconColor } from '@ui/shared-ui/icon';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import { type ToastItem, type ToastType } from './toast.types';

const ICON_MAP: Record<ToastType, string> = {
  default: 'heroInformationCircle',
  success: 'heroCheckCircle',
  warning: 'heroExclamationTriangle',
  error: 'heroXCircle',
  info: 'heroInformationCircle',
};

const ICON_COLOR_MAP: Record<ToastType, IconColor> = {
  default: 'muted',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

@Component({
  selector: 'ui-toast',
  imports: [UiIconComponent, UiIconButtonComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      [class]="'ui-toast ui-toast--' + toast().type"
      [attr.role]="toast().type === 'error' ? 'alert' : 'status'"
      [attr.aria-live]="toast().type === 'error' ? 'assertive' : 'polite'"
    >
      <ui-icon [name]="resolvedIcon()" size="sm" [color]="resolvedIconColor()" />

      <div class="ui-toast-content">
        <p class="ui-toast-message">{{ toast().message }}</p>
        @if (toast().actionLabel) {
          <button type="button" class="ui-toast-action" (click)="onAction()">
            {{ toast().actionLabel }}
          </button>
        }
      </div>

      <ui-icon-button
        icon="heroXMark"
        label="Fermer"
        variant="ghost"
        size="sm"
        class="ui-toast-dismiss"
        (click)="dismissed.emit()"
      />
    </div>
  `,
  styleUrl: './toast.component.scss',
})
export class UiToastComponent {
  toast = input.required<ToastItem>();
  dismissed = output<void>();

  protected resolvedIcon = computed(() => ICON_MAP[this.toast().type]);
  protected resolvedIconColor = computed(() => ICON_COLOR_MAP[this.toast().type]);

  protected onAction(): void {
    this.toast().onAction?.();
    this.dismissed.emit();
  }
}
