import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiIconButtonComponent, type IconButtonSize } from '@ui/shared-ui/icon-button';
import { UiSelectComponent, type SelectSize, type SelectOption } from '@ui/shared-forms/select';

export type PaginationSize = 'sm' | 'md' | 'lg';

const BUTTON_SIZE_MAP: Record<PaginationSize, IconButtonSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const SELECT_SIZE_MAP: Record<PaginationSize, SelectSize> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

@Component({
  selector: 'ui-pagination',
  imports: [UiIconButtonComponent, UiSelectComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
  },
})
export class UiPaginationComponent {
  totalItems = input.required<number>();
  pageSize = input<number>(10);
  currentPage = input<number>(1);
  pageSizeOptions = input<number[] | undefined>(undefined);
  showInfo = input<boolean>(false);
  size = input<PaginationSize>('md');
  maxVisiblePages = input<number>(5);

  pageChange = output<number>();
  pageSizeChange = output<number>();

  protected buttonSize = computed(() => BUTTON_SIZE_MAP[this.size()]);
  protected selectSize = computed(() => SELECT_SIZE_MAP[this.size()]);

  protected selectOptions = computed<SelectOption<number>[]>(() => {
    const opts = this.pageSizeOptions();
    if (!opts) return [];
    return opts.map(n => ({ label: String(n), value: n }));
  });

  totalPages = computed(() => Math.ceil(this.totalItems() / Math.max(1, this.pageSize())));

  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const max = this.maxVisiblePages();

    if (total <= max) return Array.from({ length: total }, (_, i) => i + 1);

    const half = Math.floor(max / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(total, start + max - 1);

    if (end - start < max - 1) start = Math.max(1, end - max + 1);

    const pages: (number | '...')[] = [];
    if (start > 1) { pages.push(1); if (start > 2) pages.push('...'); }
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total) { if (end < total - 1) pages.push('...'); pages.push(total); }

    return pages;
  });

  rangeStart = computed(() => this.totalItems() === 0 ? 0 : (this.currentPage() - 1) * this.pageSize() + 1);
  rangeEnd = computed(() => Math.min(this.currentPage() * this.pageSize(), this.totalItems()));

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) return;
    this.pageChange.emit(page);
  }

  onPageSizeChange(value: number | null): void {
    if (value == null) return;
    this.pageSizeChange.emit(value);
    this.pageChange.emit(1);
  }
}
