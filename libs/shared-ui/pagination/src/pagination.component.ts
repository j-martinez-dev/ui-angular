import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { UiIconButtonComponent, type IconButtonSize } from '@ui/shared-ui/icon-button';

export type PaginationSize = 'sm' | 'md' | 'lg';

const BUTTON_SIZE_MAP: Record<PaginationSize, IconButtonSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

@Component({
  selector: 'ui-pagination',
  imports: [UiIconButtonComponent],
  template: `
    <nav class="pagination" [attr.aria-label]="'Pagination'">

      @if (showInfo()) {
        <span class="pagination-info">
          {{ rangeStart() }}&ndash;{{ rangeEnd() }} de {{ totalItems() }} résultats
        </span>
      }

      <div class="pagination-controls">

        @if (pageSizeOptions()) {
          <div class="pagination-size-selector">
            <span class="pagination-size-label">Lignes par page</span>
            <select
              class="pagination-size-select"
              [attr.aria-label]="'Lignes par page'"
              (change)="onPageSizeChange($event)"
            >
              @for (option of pageSizeOptions(); track option) {
                <option [value]="option" [selected]="option === pageSize()">{{ option }}</option>
              }
            </select>
          </div>
        }

        <div class="pagination-pages" role="list">
          <ui-icon-button
            icon="heroChevronLeft"
            label="Previous page"
            variant="ghost"
            [size]="buttonSize()"
            [disabled]="currentPage() === 1"
            (click)="goToPage(currentPage() - 1)"
          />

          @for (page of visiblePages(); track $index) {
            @if (page === '...') {
              <span class="pagination-ellipsis" aria-hidden="true">…</span>
            } @else {
              <button
                class="pagination-page"
                [class.pagination-page--active]="page === currentPage()"
                [attr.aria-current]="page === currentPage() ? 'page' : null"
                [attr.aria-label]="'Page ' + page"
                (click)="goToPage(+page)"
              >
                {{ page }}
              </button>
            }
          }

          <ui-icon-button
            icon="heroChevronRight"
            label="Next page"
            variant="ghost"
            [size]="buttonSize()"
            [disabled]="currentPage() === totalPages()"
            (click)="goToPage(currentPage() + 1)"
          />
        </div>

      </div>
    </nav>
  `,
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

  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

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

  rangeStart = computed(() => (this.currentPage() - 1) * this.pageSize() + 1);
  rangeEnd = computed(() => Math.min(this.currentPage() * this.pageSize(), this.totalItems()));

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) return;
    this.pageChange.emit(page);
  }

  onPageSizeChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(value);
    this.pageChange.emit(1);
  }
}
