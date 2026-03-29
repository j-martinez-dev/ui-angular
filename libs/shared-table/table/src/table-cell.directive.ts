import { Directive, input } from '@angular/core';

@Directive({
  selector: '[uiTableCell]',
  host: {
    'class': 'ui-table__cell',
    '[class.ui-table__cell--left]': 'align() === "left"',
    '[class.ui-table__cell--center]': 'align() === "center"',
    '[class.ui-table__cell--right]': 'align() === "right"',
    '[class.ui-table__cell--truncate]': 'truncate()',
  },
})
export class UiTableCellDirective {
  align = input<'left' | 'center' | 'right'>('left');
  truncate = input<boolean>(false);
}
