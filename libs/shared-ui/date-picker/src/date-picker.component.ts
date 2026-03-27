import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormValueControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import {
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { UiInputComponent, type InputVariant, type InputSize } from '@ui/shared-ui/input';
import { UiDatePickerCalendarComponent } from './date-picker-calendar.component';

export type DatePickerVariant = InputVariant;
export type DatePickerSize = InputSize;

@Component({
  selector: 'ui-date-picker',
  imports: [UiInputComponent, UiDatePickerCalendarComponent],
  template: `
    @if (!hidden()) {
      <div #trigger class="datepicker" (click)="toggleCalendar()" (keydown.enter)="toggleCalendar()">
        <ui-input
          type="text"
          [variant]="variant()"
          [size]="size()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [readonly]="true"
          [invalid]="invalid()"
          [value]="displayValue()"
          suffix="heroCalendarDays"
          [suffixIsIcon]="true"
        />
      </div>

      <ng-template #calendarTpl>
        <ui-date-picker-calendar
          [value]="value()"
          [minDate]="minDate()"
          [maxDate]="maxDate()"
          [firstDayOfWeek]="firstDayOfWeek()"
          [locale]="locale()"
          (dateSelected)="onDateSelected($event)"
          (closeRequested)="close()"
        />
      </ng-template>
    }
  `,
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDatePickerComponent implements FormValueControl<Date | null>, OnDestroy {
  // Signal Forms contract
  value = model<Date | null>(null);
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  required = input<boolean>(false);

  // Additional inputs
  displayFormat = input<string>('dd/MM/yyyy');
  placeholder = input<string>('Select a date');
  minDate = input<Date | undefined>(undefined);
  maxDate = input<Date | undefined>(undefined);
  firstDayOfWeek = input<0 | 1>(1);
  locale = input<string>('fr-FR');
  variant = input<DatePickerVariant>('outlined');
  size = input<DatePickerSize>('md');

  // Internal state
  isOpen = signal<boolean>(false);

  // Template refs
  private triggerEl = viewChild<ElementRef<HTMLElement>>('trigger');
  private calendarTpl = viewChild<TemplateRef<unknown>>('calendarTpl');

  // Services
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  private backdropSub: { unsubscribe(): void } | null = null;

  // Computed
  protected displayValue = computed(() => {
    const date = this.value();
    if (!date) return '';
    return this.formatDate(date, this.displayFormat());
  });

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }

  toggleCalendar(): void {
    if (this.disabled() || this.readonly()) return;
    this.isOpen() ? this.close() : this.open();
  }

  onDateSelected(date: Date): void {
    this.value.set(date);
    this.touched.set(true);
    this.close();
  }

  // ── Private ─────────────────────────────────────────────────────────────

  private open(): void {
    if (this.isOpen()) return;

    const triggerEl = this.triggerEl();
    const calendarTpl = this.calendarTpl();
    if (!triggerEl || !calendarTpl) return;

    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay(triggerEl);
    }

    const portal = new TemplatePortal(calendarTpl, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);

    this.backdropSub = this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close(): void {
    if (!this.isOpen()) return;
    this.backdropSub?.unsubscribe();
    this.backdropSub = null;
    this.overlayRef?.detach();
    this.isOpen.set(false);
  }

  private createOverlay(triggerEl: ElementRef<HTMLElement>): OverlayRef {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerEl)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
      ]);

    return this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private formatDate(date: Date, format: string): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = String(date.getFullYear());
    return format
      .replace('dd', dd)
      .replace('MM', mm)
      .replace('yyyy', yyyy);
  }
}
