import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { type BreadcrumbItem } from './breadcrumb.types';

export type BreadcrumbSize = 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<BreadcrumbSize, IconSize> = {
  sm: 'xs',
  md: 'xs',
  lg: 'sm',
};

@Component({
  selector: 'ui-breadcrumb',
  imports: [UiIconComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
  },
})
export class UiBreadcrumbComponent<T = string> {
  items = input<BreadcrumbItem<T>[]>([]);
  size = input<BreadcrumbSize>('md');

  itemClick = output<T>();

  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);

  onItemClick(event: MouseEvent, value: T): void {
    // Only emit for SPA navigation; let Ctrl+Click / middle-click work natively
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault();
      this.itemClick.emit(value);
    }
  }
}
