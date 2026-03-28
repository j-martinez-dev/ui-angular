import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { UiAvatarComponent, type AvatarColor, type AvatarSize } from '@ui/shared-ui/avatar';

export type ListItemSize = 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<ListItemSize, IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'md',
};

const AVATAR_SIZE_MAP: Record<ListItemSize, AvatarSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

@Component({
  selector: 'ui-list-item',
  imports: [UiIconComponent, UiAvatarComponent],
  template: `
    @if (clickable()) {
      <button
        type="button"
        class="list-item list-item--clickable"
        [class.list-item--disabled]="disabled()"
        (click)="onClick()"
      >
        @if (icon()) {
          <span class="list-item-left">
            <ui-icon [name]="icon()!" [size]="iconSize()" color="muted" />
          </span>
        } @else if (avatar()) {
          <span class="list-item-left">
            <ui-avatar [initials]="avatar()!" [color]="avatarColor()" [size]="avatarSize()" />
          </span>
        }

        <span class="list-item-content">
          <span class="list-item-label">{{ label() }}</span>
          @if (description()) {
            <span class="list-item-description">{{ description() }}</span>
          }
        </span>

        <span class="list-item-end">
          <ng-content select="[slot=end]" />
        </span>
      </button>
    } @else {
      <div
        class="list-item"
        [class.list-item--disabled]="disabled()"
      >
        @if (icon()) {
          <span class="list-item-left">
            <ui-icon [name]="icon()!" [size]="iconSize()" color="muted" />
          </span>
        } @else if (avatar()) {
          <span class="list-item-left">
            <ui-avatar [initials]="avatar()!" [color]="avatarColor()" [size]="avatarSize()" />
          </span>
        }

        <span class="list-item-content">
          <span class="list-item-label">{{ label() }}</span>
          @if (description()) {
            <span class="list-item-description">{{ description() }}</span>
          }
        </span>

        <span class="list-item-end">
          <ng-content select="[slot=end]" />
        </span>
      </div>
    }
  `,
  styleUrl: './list-item.component.scss',
  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
  },
})
export class UiListItemComponent {
  label = input.required<string>();
  description = input<string>();
  icon = input<string>();
  avatar = input<string>();
  avatarColor = input<AvatarColor>('primary');
  clickable = input<boolean>(false);
  disabled = input<boolean>(false);
  size = input<ListItemSize>('md');

  itemClick = output<void>();

  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);
  protected avatarSize = computed(() => AVATAR_SIZE_MAP[this.size()]);

  onClick(): void {
    if (this.clickable()) this.itemClick.emit();
  }
}
