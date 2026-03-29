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

let nextPanelId = 0;

export class SelectOverlayController<T = unknown> {
  readonly isOpen = signal<boolean>(false);
  readonly searchQuery = signal<string>('');
  readonly panelId = `ui-select-panel-${nextPanelId++}`;

  private overlayRef: OverlayRef | null = null;
  private backdropSub: { unsubscribe(): void } | null = null;

  constructor(
    private readonly overlay: Overlay,
    private readonly viewContainerRef: ViewContainerRef,
  ) {}

  destroy(): void {
    this.backdropSub?.unsubscribe();
    this.overlayRef?.dispose();
  }

  isTruncated(el: HTMLElement): boolean {
    return el.scrollWidth > el.clientWidth;
  }

  open(
    triggerEl: ElementRef<HTMLElement> | undefined,
    panelTpl: TemplateRef<unknown> | undefined,
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

    this.backdropSub = this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close(triggerEl?: ElementRef<HTMLElement>): void {
    if (!this.isOpen()) return;
    this.backdropSub?.unsubscribe();
    this.backdropSub = null;
    this.overlayRef?.detach();
    this.isOpen.set(false);
    triggerEl?.nativeElement.focus();
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
