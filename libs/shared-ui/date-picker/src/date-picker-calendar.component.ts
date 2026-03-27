import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import {
  startOfMonth,
  startOfWeek,
  addDays,
  addMonths,
  addYears,
  subMonths,
  subYears,
  getMonth,
  getYear,
  getDate,
  setMonth,
  setYear,
  isBefore,
  isAfter,
  startOfDay,
  endOfDay,
  format as formatDate,
  eachDayOfInterval,
} from 'date-fns';
import { enUS } from 'date-fns/locale';
import { LOCALE_MAP } from './date-picker.locale';

type CalendarView = 'days' | 'months' | 'years';

interface DayCell {
  date: Date;
  day: number;
  key: string;
  isAdjacentMonth: boolean;
  isDisabled: boolean;
}

interface MonthEntry {
  index: number;
  label: string;
}

function dateKey(d: Date): string {
  return `${getYear(d)}-${getMonth(d)}-${getDate(d)}`;
}

@Component({
  selector: 'ui-date-picker-calendar',
  imports: [UiIconButtonComponent],
  template: `
    <div
      class="calendar"
      role="dialog"
      aria-label="Date picker"
      (keydown)="onKeydown($event)"
    >

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
        <div class="calendar-grid" role="grid">
          @for (day of weekDayNames(); track day) {
            <span class="calendar-weekday">{{ day }}</span>
          }
          @for (cell of dayCells(); track cell.key) {
            <button
              class="calendar-day"
              [class.calendar-day--selected]="selectedKey() === cell.key"
              [class.calendar-day--today]="todayKey === cell.key"
              [class.calendar-day--adjacent]="cell.isAdjacentMonth"
              [class.calendar-day--disabled]="cell.isDisabled"
              [disabled]="cell.isDisabled || cell.isAdjacentMonth"
              (click)="selectDate(cell.date)"
            >
              {{ cell.day }}
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
})
export class UiDatePickerCalendarComponent {
  value = input<Date | null>(null);
  minDate = input<Date | undefined>(undefined);
  maxDate = input<Date | undefined>(undefined);
  firstDayOfWeek = input<0 | 1>(1);
  locale = input<string>('fr-FR');

  dateSelected = output<Date>();
  closeRequested = output<void>();

  view = signal<CalendarView>('days');
  viewDate = signal<Date>(new Date());

  // Static today key — computed once at component creation
  protected readonly todayKey = dateKey(new Date());

  constructor() {
    effect(() => {
      const v = this.value();
      if (v) {
        this.viewDate.set(startOfMonth(v));
      }
    });
  }

  // ── Pre-computed keys for O(1) lookups ──────────────────────────────────

  protected selectedKey = computed(() => {
    const v = this.value();
    return v ? dateKey(v) : null;
  });

  private dateFnsLocale = computed(() => LOCALE_MAP[this.locale()] ?? enUS);

  // ── Computed ────────────────────────────────────────────────────────────

  protected headerLabel = computed(() => {
    const d = this.viewDate();
    const loc = this.dateFnsLocale();

    switch (this.view()) {
      case 'days':
        return formatDate(d, 'LLLL yyyy', { locale: loc });
      case 'months':
        return formatDate(d, 'yyyy', { locale: loc });
      case 'years': {
        const base = getYear(d);
        const start = base - (base % 12);
        return `${start} – ${start + 11}`;
      }
    }
  });

  protected weekDayNames = computed(() => {
    const loc = this.dateFnsLocale();
    const fdow = this.firstDayOfWeek();
    const weekStart = startOfWeek(new Date(), { weekStartsOn: fdow });
    const days = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });
    return days.map(d => formatDate(d, 'EEEEEE', { locale: loc }));
  });

  protected dayCells = computed((): DayCell[] => {
    const vd = this.viewDate();
    const month = getMonth(vd);
    const fdow = this.firstDayOfWeek();
    const min = this.minDate();
    const max = this.maxDate();

    const firstOfMonth = startOfMonth(vd);
    const gridStart = startOfWeek(firstOfMonth, { weekStartsOn: fdow });

    const cells: DayCell[] = [];
    for (let i = 0; i < 42; i++) {
      const date = addDays(gridStart, i);
      const isAdjacentMonth = getMonth(date) !== month;
      const isDisabled = this.isDateDisabled(date, min, max);
      cells.push({ date, day: getDate(date), key: dateKey(date), isAdjacentMonth, isDisabled });
    }

    return cells;
  });

  protected monthNames = computed((): MonthEntry[] => {
    const loc = this.dateFnsLocale();
    return Array.from({ length: 12 }, (_, i) => ({
      index: i,
      label: formatDate(new Date(2024, i, 1), 'LLL', { locale: loc }),
    }));
  });

  protected yearRange = computed((): number[] => {
    const base = getYear(this.viewDate());
    const start = base - (base % 12);
    return Array.from({ length: 12 }, (_, i) => start + i);
  });

  // ── Actions ─────────────────────────────────────────────────────────────

  selectDate(date: Date): void {
    this.dateSelected.emit(date);
  }

  selectMonth(month: number): void {
    this.viewDate.update(d => startOfMonth(setMonth(d, month)));
    this.view.set('days');
  }

  selectYear(year: number): void {
    this.viewDate.update(d => startOfMonth(setYear(d, year)));
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
        this.viewDate.update(d => subMonths(d, 1));
        break;
      case 'months':
        this.viewDate.update(d => subYears(d, 1));
        break;
      case 'years':
        this.viewDate.update(d => subYears(d, 12));
        break;
    }
  }

  navigateNext(): void {
    switch (this.view()) {
      case 'days':
        this.viewDate.update(d => addMonths(d, 1));
        break;
      case 'months':
        this.viewDate.update(d => addYears(d, 1));
        break;
      case 'years':
        this.viewDate.update(d => addYears(d, 12));
        break;
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeRequested.emit();
    }
  }

  // ── Helpers ─────────────────────────────────────────────────────────────

  isCurrentMonth(month: number): boolean {
    return getMonth(this.viewDate()) === month;
  }

  isCurrentYear(year: number): boolean {
    return getYear(this.viewDate()) === year;
  }

  private isDateDisabled(date: Date, min: Date | undefined, max: Date | undefined): boolean {
    if (min && isBefore(date, startOfDay(min))) return true;
    if (max && isAfter(date, endOfDay(max))) return true;
    return false;
  }
}
