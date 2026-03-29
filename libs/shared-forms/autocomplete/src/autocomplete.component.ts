import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  output,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormValueControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import { UiSpinnerComponent } from '@ui/shared-ui/spinner';
import { type SelectOption } from '@ui/shared-forms/select';
import {
  FORM_FIELD_VARIANT_MAP,
  type FormFieldVariant,
} from '@ui/shared-forms/input';

export type AutocompleteVariant = FormFieldVariant;
export type AutocompleteSize = 'sm' | 'md' | 'lg';

const HEIGHT_MAP: Record<AutocompleteSize, string> = {
  sm: 'calc(var(--spacing) * 8)',
  md: 'calc(var(--spacing) * 10)',
  lg: 'calc(var(--spacing) * 12)',
};

let nextPanelId = 0;

@Component({
  selector: 'ui-autocomplete',
  imports: [UiIconComponent, UiIconButtonComponent, UiSpinnerComponent],
  styleUrl: './autocomplete.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[style.--ac-bg]': 'variantStyles().bg',
    '[style.--ac-border]': 'variantStyles().border',
    '[style.--ac-focus-border]': 'variantStyles().focusBorder',
    '[style.--ac-invalid-border]': 'variantStyles().invalidBorder',
    '[style.--ac-height]': 'heightValue()',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.variant-filled]': 'variant() === "filled"',
    '[class.variant-ghost]': 'variant() === "ghost"',
  },
  template: `
    @if (!hidden()) {
      <div
        #trigger
        class="autocomplete-wrapper"
        [class.autocomplete-wrapper--focused]="isOpen()"
        [class.autocomplete-wrapper--disabled]="disabled()"
        [class.autocomplete-wrapper--readonly]="readonly()"
        [class.autocomplete-wrapper--invalid]="invalid()"
      >
        <input
          class="autocomplete-input"
          type="text"
          [value]="inputText()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [readonly]="readonly()"
          [attr.required]="required() || null"
          [attr.aria-invalid]="invalid() || null"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-autocomplete]="'list'"
          [attr.aria-activedescendant]="focusedOptionId()"
          [attr.aria-controls]="isOpen() ? panelId : null"
          [attr.aria-label]="label()"
          role="combobox"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (keydown)="onKeydown($event)"
        />
        @if (inputText() && !disabled() && !readonly()) {
          <ui-icon-button
            icon="heroXMark"
            label="Effacer"
            variant="ghost"
            size="sm"
            (click)="clearInput()"
          />
        } @else {
          <ui-icon name="heroMagnifyingGlass" size="sm" color="muted" />
        }
      </div>

      <ng-template #panelTpl>
        <div class="autocomplete-panel" [attr.id]="panelId" role="listbox">
          @if (loading()) {
            <div class="autocomplete-loading">
              <ui-spinner size="sm" color="primary" label="Chargement des suggestions" />
            </div>
          } @else if (options().length === 0 && hasSearched()) {
            <div class="autocomplete-empty">{{ noResultsLabel() }}</div>
          } @else {
            @for (option of options(); track option.value; let i = $index) {
              <div
                class="autocomplete-option"
                [class.autocomplete-option--selected]="value() === option.value"
                [class.autocomplete-option--focused]="focusedIndex() === i"
                [attr.id]="panelId + '-option-' + i"
                [attr.aria-selected]="value() === option.value"
                role="option"
                (mousedown)="selectOption(option)"
                (mouseenter)="focusedIndex.set(i)"
              >
                <span>{{ option.label }}</span>
                @if (value() === option.value) {
                  <ui-icon name="heroCheck" size="sm" color="primary" />
                }
              </div>
            }
          }
        </div>
      </ng-template>
    }
  `,
})
export class UiAutocompleteComponent<T = string>
  implements FormValueControl<T | null>, OnDestroy
{
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  // Signal Forms contract
  value = model<T | null>(null);
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  required = input<boolean>(false);

  // Accessibility
  label = input<string | undefined>(undefined);

  // Additional inputs
  options = input<SelectOption<T>[]>([]);
  placeholder = input<string>('Rechercher...');
  debounce = input<number>(300);
  loading = input<boolean>(false);
  noResultsLabel = input<string>('Aucun résultat');
  variant = input<AutocompleteVariant>('outlined');
  size = input<AutocompleteSize>('md');

  // Outputs
  search = output<string>();

  // Internal state
  protected inputText = signal<string>('');
  protected isOpen = signal<boolean>(false);
  protected focusedIndex = signal<number>(-1);
  protected hasSearched = signal<boolean>(false);
  protected readonly panelId = `ui-autocomplete-panel-${nextPanelId++}`;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private overlayRef: OverlayRef | null = null;
  private backdropSub: { unsubscribe(): void } | null = null;

  private triggerEl = viewChild<ElementRef<HTMLElement>>('trigger');
  private panelTpl = viewChild<TemplateRef<unknown>>('panelTpl');

  // Computed
  protected variantStyles = computed(() => FORM_FIELD_VARIANT_MAP[this.variant()]);
  protected heightValue = computed(() => HEIGHT_MAP[this.size()]);

  protected focusedOptionId = computed(() => {
    const idx = this.focusedIndex();
    return idx >= 0 ? `${this.panelId}-option-${idx}` : null;
  });

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.backdropSub?.unsubscribe();
    this.overlayRef?.dispose();
  }

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputText.set(input.value);
    this.focusedIndex.set(-1);

    if (!input.value) {
      this.value.set(null);
      this.closePanel();
      return;
    }

    this.openPanel();

    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.search.emit(input.value);
      this.hasSearched.set(true);
    }, this.debounce());
  }

  protected onFocus(): void {
    if (this.inputText()) this.openPanel();
  }

  protected onBlur(): void {
    setTimeout(() => {
      if (!this.value()) this.clearInput();
      this.closePanel();
      this.touched.set(true);
    }, 150);
  }

  protected selectOption(option: SelectOption<T>): void {
    if (option.disabled) return;
    this.value.set(option.value);
    this.inputText.set(option.label);
    this.closePanel();
  }

  protected clearInput(): void {
    this.inputText.set('');
    this.value.set(null);
    this.hasSearched.set(false);
    this.closePanel();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) return;

    switch (event.key) {
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.closePanel();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (this.isOpen()) {
          this.moveFocus(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.moveFocus(-1);
        }
        break;
      case 'Enter':
        if (this.isOpen()) {
          event.preventDefault();
          const opts = this.options();
          const idx = this.focusedIndex();
          if (idx >= 0 && idx < opts.length && !opts[idx].disabled) {
            this.selectOption(opts[idx]);
          }
        }
        break;
    }
  }

  private openPanel(): void {
    if (this.isOpen()) return;
    const triggerEl = this.triggerEl();
    const panelTpl = this.panelTpl();
    if (!triggerEl || !panelTpl) return;

    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay(triggerEl);
    }

    this.overlayRef.updateSize({ width: triggerEl.nativeElement.offsetWidth });
    const portal = new TemplatePortal(panelTpl, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);

    this.backdropSub = this.overlayRef.backdropClick().subscribe(() => {
      if (!this.value()) this.clearInput();
      this.closePanel();
      this.touched.set(true);
    });
  }

  private closePanel(): void {
    if (!this.isOpen()) return;
    this.backdropSub?.unsubscribe();
    this.backdropSub = null;
    this.overlayRef?.detach();
    this.isOpen.set(false);
    this.focusedIndex.set(-1);
  }

  private moveFocus(delta: number): void {
    const opts = this.options();
    if (opts.length === 0) return;

    let idx = this.focusedIndex() + delta;
    while (idx >= 0 && idx < opts.length && opts[idx].disabled) {
      idx += delta;
    }
    if (idx >= 0 && idx < opts.length) {
      this.focusedIndex.set(idx);
      const el = document.getElementById(`${this.panelId}-option-${idx}`);
      el?.scrollIntoView({ block: 'nearest' });
    }
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
}
