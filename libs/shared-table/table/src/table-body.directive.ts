import { Directive } from '@angular/core';

@Directive({
  selector: '[uiTableBody]',
  host: { 'class': 'ui-table__body' },
})
export class UiTableBodyDirective {}
