import {
  Component,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { UiIconComponent } from '@ui/shared-ui/icon';

@Component({
  selector: 'ui-menu-item',
  imports: [UiIconComponent],
  template: `
    <button
      #btnRef
      class="menu-item"
      [class.menu-item--danger]="variant() === 'danger'"
      [class.menu-item--disabled]="disabled()"
      [disabled]="disabled()"
      role="menuitem"
      (click)="onItemClick()"
    >
      @if (icon()) {
        <ui-icon [name]="icon()!" size="sm" />
      }
      <span class="menu-item-label">
        <ng-content />
      </span>
    </button>
  `,
  styleUrl: './menu-item.component.scss',
})
export class UiMenuItemComponent {
  icon = input<string>();
  variant = input<'default' | 'danger'>('default');
  disabled = input<boolean>(false);

  itemClick = output<void>();

  private btnRef = viewChild<ElementRef<HTMLButtonElement>>('btnRef');

  focus(): void {
    this.btnRef()?.nativeElement.focus();
  }

  protected onItemClick(): void {
    this.itemClick.emit();
  }
}
