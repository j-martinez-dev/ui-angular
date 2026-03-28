import { Component, input, output, signal } from '@angular/core';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import { UiBadgeComponent } from '@ui/shared-ui/badge';
import { UiTooltipDirective } from '@ui/shared-ui/tooltip';
import { type SidebarItem, type SidebarGroup } from './sidebar.types';

@Component({
  selector: 'ui-sidebar',
  imports: [UiIconComponent, UiIconButtonComponent, UiBadgeComponent, UiTooltipDirective],
  template: `
    <aside
      class="sidebar"
      [class.sidebar--collapsed]="isCollapsed()"
    >
      <!-- Header slot -->
      <div class="sidebar-header">
        <ng-content select="[slot=header]" />
        <ui-icon-button
          [icon]="isCollapsed() ? 'heroChevronRight' : 'heroChevronLeft'"
          [label]="isCollapsed() ? 'Déplier la barre latérale' : 'Replier la barre latérale'"
          variant="ghost"
          size="sm"
          (click)="toggleCollapsed()"
        />
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        @for (group of groups(); track $index) {
          <div class="sidebar-group">
            @if (group.label && !isCollapsed()) {
              <span class="sidebar-group-label">{{ group.label }}</span>
            }
            @for (item of group.items; track item.value) {
              <button
                class="sidebar-item"
                [class.sidebar-item--active]="activeValue() === item.value"
                [class.sidebar-item--disabled]="item.disabled"
                [disabled]="item.disabled"
                [uiTooltip]="isCollapsed() ? item.label : ''"
                uiTooltipPosition="right"
                (click)="onItemClick(item)"
              >
                @if (item.icon) {
                  <ui-icon
                    [name]="item.icon"
                    size="sm"
                    [color]="activeValue() === item.value ? 'primary' : 'muted'"
                  />
                }
                @if (!isCollapsed()) {
                  <span class="sidebar-item-label">{{ item.label }}</span>
                  @if (item.badge) {
                    <ui-badge
                      variant="subtle"
                      color="primary"
                      size="sm"
                      class="sidebar-item-badge"
                    >
                      {{ item.badge }}
                    </ui-badge>
                  }
                }
              </button>
            }
          </div>
        }
      </nav>

      <!-- Footer slot -->
      <div class="sidebar-footer">
        <ng-content select="[slot=footer]" />
      </div>
    </aside>
  `,
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
