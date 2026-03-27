import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  OnDestroy,
  output,
} from '@angular/core';
import { UiInputComponent } from '@ui/shared-ui/input';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';

@Component({
  selector: 'ui-search-bar',
  imports: [UiInputComponent, UiIconButtonComponent],
  template: `
    <search class="search-bar" [attr.aria-label]="ariaLabel()">
      <ui-input
        type="search"
        [placeholder]="placeholder()"
        [size]="size()"
        [variant]="variant()"
        [disabled]="disabled()"
        [clearable]="true"
        [(value)]="query"
        (valueChange)="onValueChange($event)"
        (keydown.enter)="onEnter()"
      />
      <ui-icon-button
        icon="heroMagnifyingGlass"
        label="Search"
        variant="primary"
        [size]="size()"
        [disabled]="disabled()"
        (click)="onSearch()"
      />
    </search>
  `,
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSearchBarComponent implements OnDestroy {
  placeholder = input<string>('Search...');
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'outlined' | 'filled' | 'ghost'>('outlined');
  debounce = input<number>(0);
  disabled = input<boolean>(false);
  value = input<string>('');
  ariaLabel = input<string>('Search');

  search = output<string>();
  searchChange = output<string>();
  cleared = output<void>();

  query = linkedSignal(() => this.value());

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  onValueChange(value: string): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    if (this.debounce() > 0) {
      this.debounceTimer = setTimeout(() => {
        this.searchChange.emit(value);
        if (value === '') this.cleared.emit();
      }, this.debounce());
    } else {
      this.searchChange.emit(value);
      if (value === '') this.cleared.emit();
    }
  }

  onEnter(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.search.emit(this.query());
  }

  onSearch(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.search.emit(this.query());
  }
}
