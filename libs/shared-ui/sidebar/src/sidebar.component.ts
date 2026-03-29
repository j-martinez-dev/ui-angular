import { Component, input, output, signal } from '@angular/core';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import { UiBadgeComponent } from '@ui/shared-ui/badge';
import { UiTooltipDirective } from '@ui/shared-ui/tooltip';
import { type SidebarItem, type SidebarGroup } from './sidebar.types';

@Component({
  selector: 'ui-sidebar',
  imports: [UiIconComponent, UiIconButtonComponent, UiBadgeComponent, UiTooltipDirective],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class UiSidebarComponent<T = string> {
  groups = input.required<SidebarGroup<T>[]>();
  activeValue = input<T>();

  activeValueChange = output<T>();

  isCollapsed = signal<boolean>(false);

  toggleCollapsed(): void {
    this.isCollapsed.update(v => !v);
  }

  onItemClick(item: SidebarItem<T>): void {
    if (item.disabled) return;
    this.activeValueChange.emit(item.value);
  }
}
