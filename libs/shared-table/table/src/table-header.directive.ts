import { Directive } from '@angular/core';

@Directive({
  selector: '[uiTableHeader]',
  host: { 'class': 'ui-table__header' },
})
export class UiTableHeaderDirective {}
