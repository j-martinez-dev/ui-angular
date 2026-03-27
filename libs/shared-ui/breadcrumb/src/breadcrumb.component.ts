import {
  ChangeDetectionStrategy,
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
  template: `
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        @for (item of items(); track item.value; let last = $last) {
          <li class="breadcrumb-item" [class.breadcrumb-item--active]="last">

            @if (last) {
              <span class="breadcrumb-label breadcrumb-label--active" aria-current="page">
                @if (item.icon) {
                  <ui-icon [name]="item.icon" [size]="iconSize()" />
                }
                {{ item.label }}
              </span>
            } @else if (item.href) {
              <a
                class="breadcrumb-label breadcrumb-label--link"
                [href]="item.href"
                (click)="onItemClick($event, item.value)"
              >
                @if (item.icon) {
                  <ui-icon [name]="item.icon" [size]="iconSize()" />
                }
                {{ item.label }}
              </a>
            } @else {
              <button
                class="breadcrumb-label breadcrumb-label--link"
                (click)="itemClick.emit(item.value)"
              >
                @if (item.icon) {
                  <ui-icon [name]="item.icon" [size]="iconSize()" />
                }
                {{ item.label }}
              </button>
            }

            @if (!last) {
              <ui-icon
                name="heroChevronRight"
                [size]="iconSize()"
                color="muted"
                class="breadcrumb-separator"
              />
            }

          </li>
        }
      </ol>
    </nav>
  `,
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
