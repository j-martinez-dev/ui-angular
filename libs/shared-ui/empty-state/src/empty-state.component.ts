import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { UiButtonComponent, type ButtonVariant } from '@ui/shared-ui/button';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<EmptyStateSize, IconSize> = {
  sm: 'lg',
  md: 'xl',
  lg: '2xl',
};

@Component({
  selector: 'ui-empty-state',
  imports: [UiIconComponent, UiButtonComponent],
  template: `
    <div class="empty-state">
      @if (icon()) {
        <ui-icon
          [name]="icon()!"
          [size]="iconSize()"
          color="muted"
          class="empty-state-icon"
        />
      }

      <div class="empty-state-content">
        <h3 class="empty-state-title">{{ title() }}</h3>
        @if (description()) {
          <p class="empty-state-description">{{ description() }}</p>
        }
      </div>

      @if (actionLabel()) {
        <ui-button
          [variant]="actionVariant()"
          size="md"
          (click)="actionClick.emit()"
        >
          {{ actionLabel() }}
        </ui-button>
      }
    </div>
  `,
  styleUrl: './empty-state.component.scss',
  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
  },
})
export class UiEmptyStateComponent {
  title = input.required<string>();
  description = input<string>();
  icon = input<string>();
  actionLabel = input<string>();
  actionVariant = input<ButtonVariant>('primary');
  size = input<EmptyStateSize>('md');

  actionClick = output<void>();

  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
}
