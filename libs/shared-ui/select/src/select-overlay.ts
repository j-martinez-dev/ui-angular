import {
  ElementRef,
  signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { type SelectOption } from './select.types';

let nextPanelId = 0;

export class SelectOverlayController<T = unknown> {
  readonly isOpen = signal<boolean>(false);
  readonly searchQuery = signal<string>('');
  readonly focusedIndex = signal<number>(-1);
  readonly panelId = `ui-select-panel-${nextPanelId++}`;

  private overlayRef: OverlayRef | null = null;
  private backdropSub: { unsubscribe(): void } | null = null;

  constructor(
    private readonly overlay: Overlay,
    private readonly viewContainerRef: ViewContainerRef,
  ) {}

  focusedOptionId(): string | null {
    const idx = this.focusedIndex();
    return idx >= 0 ? `${this.panelId}-option-${idx}` : null;
  }

  destroy(): void {
    this.backdropSub?.unsubscribe();
    this.overlayRef?.dispose();
  }

  isTruncated(el: HTMLElement): boolean {
    return el.scrollWidth > el.clientWidth;
  }

  toggle(disabled: boolean, readonly: boolean): void {
    if (disabled || readonly) return;
    this.isOpen() ? this.close() : this.open(undefined, undefined, undefined);
  }

  open(
    triggerEl: ElementRef<HTMLElement> | undefined,
    panelTpl: TemplateRef<unknown> | undefined,
    initialFocusIndex: number | undefined,
  ): void {
    if (this.isOpen()) return;
    if (!triggerEl || !panelTpl) return;

    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay(triggerEl);
    }

    this.overlayRef.updateSize({ width: triggerEl.nativeElement.offsetWidth });

    const portal = new TemplatePortal(panelTpl, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);
    this.searchQuery.set('');
    this.focusedIndex.set(initialFocusIndex ?? 0);

    this.backdropSub = this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close(triggerEl?: ElementRef<HTMLElement>): void {
    if (!this.isOpen()) return;
    this.backdropSub?.unsubscribe();
    this.backdropSub = null;
    this.overlayRef?.detach();
    this.isOpen.set(false);
    this.focusedIndex.set(-1);
    triggerEl?.nativeElement.focus();
  }

  moveFocus(delta: number, options: SelectOption<T>[]): void {
    if (options.length === 0) return;

    let idx = this.focusedIndex() + delta;

    while (idx >= 0 && idx < options.length && options[idx].disabled) {
      idx += delta;
    }

    if (idx >= 0 && idx < options.length) {
      this.focusedIndex.set(idx);
      this.scrollToFocused(idx);
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

  private scrollToFocused(idx: number): void {
    const el = document.getElementById(`${this.panelId}-option-${idx}`);
    el?.scrollIntoView({ block: 'nearest' });
  }
}
