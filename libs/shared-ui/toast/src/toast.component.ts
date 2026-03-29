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
  templateUrl: './toast.component.html',
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
