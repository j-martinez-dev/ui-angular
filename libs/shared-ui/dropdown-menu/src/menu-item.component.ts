import {
  Component,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { DROPDOWN_MENU } from './dropdown-menu.token';

@Component({
  selector: 'ui-menu-item',
  imports: [UiIconComponent],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class UiMenuItemComponent {
  icon = input<string>();
  variant = input<'default' | 'danger'>('default');
  disabled = input<boolean>(false);

  itemClick = output<void>();

  private readonly dropdownMenu = inject(DROPDOWN_MENU, { optional: true });
  private btnRef = viewChild<ElementRef<HTMLButtonElement>>('btnRef');

  focus(): void {
    this.btnRef()?.nativeElement.focus();
  }

  protected onItemClick(): void {
    this.itemClick.emit();
    this.dropdownMenu?.close();
  }
}
