import {
  Directive,
  ElementRef,
  Renderer2,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';

@Directive({
  selector: '[uiTableHead]',
  host: {
    'class': 'ui-table__head',
    '[class.ui-table__head--sortable]': 'sortable()',
    '[class.ui-table__head--asc]': 'sortDirection() === "asc"',
    '[class.ui-table__head--desc]': 'sortDirection() === "desc"',
    '[class.ui-table__head--left]': 'align() === "left"',
    '[class.ui-table__head--center]': 'align() === "center"',
    '[class.ui-table__head--right]': 'align() === "right"',
    '[attr.aria-sort]': 'ariaSortValue()',
    '(click)': 'onSort()',
  },
})
export class UiTableHeadDirective {
  sortable = input<boolean>(false);
  sortDirection = input<'asc' | 'desc' | null>(null);
  align = input<'left' | 'center' | 'right'>('left');

  sortChange = output<'asc' | 'desc'>();

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private sortIconEl: HTMLElement | null = null;

  ariaSortValue = computed(() => {
    if (!this.sortable()) return null;
    if (this.sortDirection() === 'asc') return 'ascending';
    if (this.sortDirection() === 'desc') return 'descending';
    return 'none';
  });

  constructor() {
    effect(() => {
      const sortable = this.sortable();
      const direction = this.sortDirection();

      if (!sortable) {
        this.removeSortIcon();
        return;
      }

      this.renderSortIcon(direction);
    });
  }

  onSort(): void {
    if (!this.sortable()) return;
    const next = this.sortDirection() === 'asc' ? 'desc' : 'asc';
    this.sortChange.emit(next);
  }

  private renderSortIcon(direction: 'asc' | 'desc' | null): void {
    if (!this.sortIconEl) {
      this.sortIconEl = this.renderer.createElement('span');
      this.renderer.addClass(this.sortIconEl, 'ui-table__sort-icon');
      this.renderer.appendChild(this.el.nativeElement, this.sortIconEl);
    }

    const symbol = direction === 'asc' ? '↑' : direction === 'desc' ? '↓' : '↕';
    this.sortIconEl!.textContent = symbol;

    if (direction) {
      this.renderer.addClass(this.sortIconEl!, 'ui-table__sort-icon--active');
    } else {
      this.renderer.removeClass(this.sortIconEl!, 'ui-table__sort-icon--active');
    }
  }

  private removeSortIcon(): void {
    if (this.sortIconEl) {
      this.renderer.removeChild(this.el.nativeElement, this.sortIconEl);
      this.sortIconEl = null;
    }
  }
}
