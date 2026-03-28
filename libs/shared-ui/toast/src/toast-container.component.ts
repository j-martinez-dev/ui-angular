import {
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { UiToastComponent } from './toast.component';
import { type ToastItem, type ToastPosition } from './toast.types';

@Component({
  selector: 'ui-toast-container',
  imports: [UiToastComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      [class]="'ui-toast-container ui-toast-container--' + position()"
    >
      @for (toast of toasts(); track toast.id) {
        <ui-toast
          [toast]="toast"
          (dismissed)="dismissed.emit(toast.id)"
        />
      }
    </div>
  `,
  styleUrl: './toast-container.component.scss',
})
export class UiToastContainerComponent {
  toasts = input.required<ToastItem[]>();
  position = input.required<ToastPosition>();
  dismissed = output<string>();
}
