import { Directive, input, output } from '@angular/core';

@Directive({
  selector: '[uiTableRow]',
  host: {
    'class': 'ui-table__row',
    '[class.ui-table__row--clickable]': 'clickable()',
    '[class.ui-table__row--active]': 'active()',
    '[class.ui-table__row--disabled]': 'disabled()',
    '(click)': 'onClick()',
  },
})
export class UiTableRowDirective {
  clickable = input<boolean>(false);
  active = input<boolean>(false);
  disabled = input<boolean>(false);

  rowClick = output<void>();

  onClick(): void {
    if (this.clickable() && !this.disabled()) this.rowClick.emit();
  }
}
