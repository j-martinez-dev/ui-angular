import { Directive, ViewEncapsulation, input } from '@angular/core';

export type TableSize = 'sm' | 'md' | 'lg';

@Directive({
  selector: '[uiTable]',
  host: {
    'class': 'ui-table',
    '[class.ui-table--striped]': 'striped()',
    '[class.ui-table--bordered]': 'bordered()',
    '[class.ui-table--hoverable]': 'hoverable()',
    '[class.ui-table--sm]': 'size() === "sm"',
    '[class.ui-table--md]': 'size() === "md"',
    '[class.ui-table--lg]': 'size() === "lg"',
  },
})
export class UiTableDirective {
  size = input<TableSize>('md');
  striped = input<boolean>(false);
  bordered = input<boolean>(false);
  hoverable = input<boolean>(true);
}
