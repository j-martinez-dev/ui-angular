import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';

type CalendarView = 'days' | 'months' | 'years';

interface DayCell {
  date: Date;
  isAdjacentMonth: boolean;
  isDisabled: boolean;
}

interface MonthEntry {
  index: number;
  label: string;
}

@Component({
  selector: 'ui-date-picker-calendar',
  imports: [UiIconButtonComponent],
  template: `
    <div class="calendar" role="dialog" aria-label="Date picker">

      <div class="calendar-header">
        <ui-icon-button
          icon="heroChevronLeft"
          label="Previous"
          variant="ghost"
          size="sm"
          (click)="navigatePrev()"
        />
        <button class="calendar-title" (click)="cycleView()">
          {{ headerLabel() }}
        </button>
        <ui-icon-button
          icon="heroChevronRight"
          label="Next"
          variant="ghost"
          size="sm"
          (click)="navigateNext()"
        />
      </div>

      @if (view() === 'days') {
        <div class="calendar-grid">
          @for (day of weekDayNames(); track day) {
            <span class="calendar-weekday">{{ day }}</span>
          }
          @for (cell of dayCells(); track cellTrackBy(cell)) {
            <button
              class="calendar-day"
              [class.calendar-day--selected]="isSelected(cell.date)"
              [class.calendar-day--today]="isToday(cell.date)"
              [class.calendar-day--adjacent]="cell.isAdjacentMonth"
              [class.calendar-day--disabled]="cell.isDisabled"
              [disabled]="cell.isDisabled || cell.isAdjacentMonth"
              (click)="selectDate(cell.date)"
            >
              {{ cell.date.getDate() }}
            </button>
          }
        </div>
      }

      @if (view() === 'months') {
        <div class="calendar-months">
          @for (month of monthNames(); track month.index) {
            <button
              class="calendar-month"
              [class.calendar-month--selected]="isCurrentMonth(month.index)"
              (click)="selectMonth(month.index)"
            >
              {{ month.label }}
            </button>
          }
        </div>
      }

      @if (view() === 'years') {
        <div class="calendar-years">
          @for (year of yearRange(); track year) {
            <button
              class="calendar-year"
              [class.calendar-year--selected]="isCurrentYear(year)"
              (click)="selectYear(year)"
            >
              {{ year }}
            </button>
          }
        </div>
      }

    </div>
  `,
  styleUrl: './date-picker-calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDatePickerCalendarComponent {
  value = input<Date | null>(null);
  minDate = input<Date | undefined>(undefined);
  maxDate = input<Date | undefined>(undefined);
  firstDayOfWeek = input<0 | 1>(1);
  locale = input<string>('fr-FR');

  dateSelected = output<Date>();

  view = signal<CalendarView>('days');
  viewDate = signal<Date>(new Date());

  // ── Computed ────────────────────────────────────────────────────────────

  protected headerLabel = computed(() => {
    const d = this.viewDate();
    const loc = this.locale();

    switch (this.view()) {
      case 'days': {
        const month = new Intl.DateTimeFormat(loc, { month: 'long' }).format(d);
        return `${month.charAt(0).toUpperCase() + month.slice(1)} ${d.getFullYear()}`;
      }
      case 'months':
        return `${d.getFullYear()}`;
      case 'years': {
        const base = d.getFullYear();
        const start = base - (base % 12);
        return `${start} – ${start + 11}`;
      }
    }
  });

  protected weekDayNames = computed(() => {
    const loc = this.locale();
    const fdow = this.firstDayOfWeek();
    const base = new Date(2024, 0, fdow === 1 ? 1 : 7); // Mon Jan 1, 2024 or Sun Jan 7, 2024
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return new Intl.DateTimeFormat(loc, { weekday: 'short' }).format(d);
    });
  });

  protected dayCells = computed((): DayCell[] => {
    const vd = this.viewDate();
    const year = vd.getFullYear();
    const month = vd.getMonth();
    const fdow = this.firstDayOfWeek();
    const min = this.minDate();
    const max = this.maxDate();

    const firstOfMonth = new Date(year, month, 1);
    let startDay = firstOfMonth.getDay() - fdow;
    if (startDay < 0) startDay += 7;

    const startDate = new Date(year, month, 1 - startDay);
    const cells: DayCell[] = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const isAdjacentMonth = date.getMonth() !== month;
      const isDisabled = this.isDateDisabled(date, min, max);
      cells.push({ date, isAdjacentMonth, isDisabled });
    }

    return cells;
  });

  protected monthNames = computed((): MonthEntry[] => {
    const loc = this.locale();
    return Array.from({ length: 12 }, (_, i) => ({
      index: i,
      label: new Intl.DateTimeFormat(loc, { month: 'short' }).format(new Date(2024, i, 1)),
    }));
  });

  protected yearRange = computed((): number[] => {
    const base = this.viewDate().getFullYear();
    const start = base - (base % 12);
    return Array.from({ length: 12 }, (_, i) => start + i);
  });

  // ── Actions ─────────────────────────────────────────────────────────────

  selectDate(date: Date): void {
    this.dateSelected.emit(date);
  }

  selectMonth(month: number): void {
    this.viewDate.update(d => new Date(d.getFullYear(), month, 1));
    this.view.set('days');
  }

  selectYear(year: number): void {
    this.viewDate.update(d => new Date(year, d.getMonth(), 1));
    this.view.set('months');
  }

  cycleView(): void {
    const v = this.view();
    if (v === 'days') this.view.set('months');
    else if (v === 'months') this.view.set('years');
    else this.view.set('days');
  }

  navigatePrev(): void {
    switch (this.view()) {
      case 'days':
        this.viewDate.update(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
        break;
      case 'months':
        this.viewDate.update(d => new Date(d.getFullYear() - 1, d.getMonth(), 1));
        break;
      case 'years':
        this.viewDate.update(d => new Date(d.getFullYear() - 12, d.getMonth(), 1));
        break;
    }
  }

  navigateNext(): void {
    switch (this.view()) {
      case 'days':
        this.viewDate.update(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
        break;
      case 'months':
        this.viewDate.update(d => new Date(d.getFullYear() + 1, d.getMonth(), 1));
        break;
      case 'years':
        this.viewDate.update(d => new Date(d.getFullYear() + 12, d.getMonth(), 1));
        break;
    }
  }

  // ── Helpers ─────────────────────────────────────────────────────────────

  isSelected(date: Date): boolean {
    const v = this.value();
    if (!v) return false;
    return date.getFullYear() === v.getFullYear()
      && date.getMonth() === v.getMonth()
      && date.getDate() === v.getDate();
  }

  isToday(date: Date): boolean {
    const t = new Date();
    return date.getFullYear() === t.getFullYear()
      && date.getMonth() === t.getMonth()
      && date.getDate() === t.getDate();
  }

  isCurrentMonth(month: number): boolean {
    return this.viewDate().getMonth() === month;
  }

  isCurrentYear(year: number): boolean {
    return this.viewDate().getFullYear() === year;
  }

  cellTrackBy(cell: DayCell): string {
    return `${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.date.getDate()}`;
  }

  private isDateDisabled(date: Date, min: Date | undefined, max: Date | undefined): boolean {
    if (min && date < this.startOfDay(min)) return true;
    if (max && date > this.endOfDay(max)) return true;
    return false;
  }

  private startOfDay(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  private endOfDay(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
  }
}
