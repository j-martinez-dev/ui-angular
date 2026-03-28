import { Component } from '@angular/core';

@Component({
  selector: 'ui-menu-separator',
  template: `<hr class="menu-separator" />`,
  styles: [`
    .menu-separator {
      border: none;
      border-top: 1px solid var(--color-border-default);
      margin: var(--spacing) 0;
    }
  `],
})
export class UiMenuSeparatorComponent {}
