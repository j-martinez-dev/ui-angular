import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { type TabItem } from '@ui/shared-ui/tabs';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<SegmentedControlSize, IconSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
};

@Component({
  selector: 'ui-segmented-control',
  imports: [UiIconComponent],
  styleUrl: './segmented-control.component.scss',
  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
  },
  template: `
    <div
      class="segmented-control"
      [class.segmented-control--full-width]="fullWidth()"
      [class.segmented-control--disabled]="disabled()"
      role="group"
      [attr.aria-label]="label()"
    >
      @for (option of options(); track option.value) {
        <button
          class="segmented-option"
          [class.segmented-option--active]="value() === option.value"
          [disabled]="option.disabled || disabled()"
          [attr.aria-pressed]="value() === option.value"
          type="button"
          (click)="selectOption(option)"
        >
          @if (option.icon) {
            <ui-icon [name]="option.icon" [size]="iconSize()" />
          }
          <span>{{ option.label }}</span>
        </button>
      }
    </div>
  `,
})
export class UiSegmentedControlComponent<T = string> {
  options = input.required<TabItem<T>[]>();
  value = input<T>();
  size = input<SegmentedControlSize>('md');
  fullWidth = input<boolean>(false);
  disabled = input<boolean>(false);
  label = input<string | undefined>(undefined);

  valueChange = output<T>();

  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);

  protected selectOption(option: TabItem<T>): void {
    if (option.disabled || this.disabled()) return;
    this.valueChange.emit(option.value);
  }
}
