import { Component, input, output, signal } from '@angular/core';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import { type NavbarItem } from './navbar.types';

@Component({
  selector: 'ui-navbar',
  imports: [UiIconComponent, UiIconButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class UiNavbarComponent<T = string> {
  items = input<NavbarItem<T>[]>([]);
  activeValue = input<T>();
  position = input<'static' | 'fixed'>('static');
  transparent = input<boolean>(false);

  activeValueChange = output<T>();

  isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  onItemClick(item: NavbarItem<T>): void {
    if (item.disabled) return;
    this.activeValueChange.emit(item.value);
  }
}
