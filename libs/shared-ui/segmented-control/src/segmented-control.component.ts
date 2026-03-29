import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { type TabItem } from '@ui/shared-ui/tabs';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';
export type SegmentedControlVariant = 'default' | 'pill' | 'bordered';
export type SegmentedControlColor = 'neutral' | 'primary' | 'success' | 'warning' | 'error' | 'info';

const ICON_SIZE_MAP: Record<SegmentedControlSize, IconSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
};

const COLOR_MAP: Record<SegmentedControlColor, {
  activeBg: string;
  activeText: string;
  hoverBg: string;
  hoverText: string;
  subtleBg: string;
}> = {
  neutral: {
    activeBg: 'var(--color-surface-raised)',
    activeText: 'var(--color-text-default)',
    hoverBg: 'oklch(from var(--color-surface-base) l c h / 0.5)',
    hoverText: 'var(--color-text-default)',
    subtleBg: 'var(--color-surface-sunken)',
  },
  primary: {
    activeBg: 'var(--color-primary-default)',
    activeText: 'var(--color-on-primary)',
    hoverBg: 'var(--color-primary-subtle)',
    hoverText: 'var(--color-primary-emphasis)',
    subtleBg: 'var(--color-primary-subtle)',
  },
  success: {
    activeBg: 'var(--color-success-default)',
    activeText: 'var(--color-on-success)',
    hoverBg: 'var(--color-success-subtle)',
    hoverText: 'var(--color-success-emphasis)',
    subtleBg: 'var(--color-success-subtle)',
  },
  warning: {
    activeBg: 'var(--color-warning-default)',
    activeText: 'var(--color-on-warning)',
    hoverBg: 'var(--color-warning-subtle)',
    hoverText: 'var(--color-warning-emphasis)',
    subtleBg: 'var(--color-warning-subtle)',
  },
  error: {
    activeBg: 'var(--color-error-default)',
    activeText: 'var(--color-on-error)',
    hoverBg: 'var(--color-error-subtle)',
    hoverText: 'var(--color-error-emphasis)',
    subtleBg: 'var(--color-error-subtle)',
  },
  info: {
    activeBg: 'var(--color-info-default)',
    activeText: 'var(--color-on-info)',
    hoverBg: 'var(--color-info-subtle)',
    hoverText: 'var(--color-info-emphasis)',
    subtleBg: 'var(--color-info-subtle)',
  },
};

@Component({
  selector: 'ui-segmented-control',
  imports: [UiIconComponent],
  styleUrl: './segmented-control.component.scss',
  host: {
    '[style.--sc-active-bg]': 'colorStyles().activeBg',
    '[style.--sc-active-text]': 'colorStyles().activeText',
    '[style.--sc-hover-bg]': 'colorStyles().hoverBg',
    '[style.--sc-hover-text]': 'colorStyles().hoverText',
    '[style.--sc-subtle-bg]': 'colorStyles().subtleBg',
  },
  template: `
    <div
      class="segmented-control"
      [class.segmented-control--full-width]="fullWidth()"
      [class.segmented-control--disabled]="disabled()"
      [class.size-sm]="size() === 'sm'"
      [class.size-md]="size() === 'md'"
      [class.size-lg]="size() === 'lg'"
      [class.variant-default]="variant() === 'default'"
      [class.variant-pill]="variant() === 'pill'"
      [class.variant-bordered]="variant() === 'bordered'"
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
  variant = input<SegmentedControlVariant>('default');
  color = input<SegmentedControlColor>('neutral');
  fullWidth = input<boolean>(false);
  disabled = input<boolean>(false);
  label = input<string | undefined>(undefined);

  valueChange = output<T>();

  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
  protected colorStyles = computed(() => COLOR_MAP[this.color()]);

  protected selectOption(option: TabItem<T>): void {
    if (option.disabled || this.disabled()) return;
    this.valueChange.emit(option.value);
  }
}
