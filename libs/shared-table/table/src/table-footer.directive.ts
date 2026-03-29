import { Directive } from '@angular/core';

@Directive({
  selector: '[uiTableFooter]',
  host: { 'class': 'ui-table__footer' },
})
export class UiTableFooterDirective {}
