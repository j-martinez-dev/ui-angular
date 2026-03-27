import {
  ComponentRef,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  ConnectedPosition,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { UiTooltipComponent } from './tooltip.component';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

// Matches var(--spacing) base unit (0.25rem = 4px at default font size)
const OFFSET = 4;

const POSITION_MAP: Record<TooltipPosition, ConnectedPosition & { offsetX?: number; offsetY?: number }> = {
  top: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -OFFSET,
  },
  bottom: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: OFFSET,
  },
  left: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -OFFSET,
  },
  right: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: OFFSET,
  },
};

let nextId = 0;

@Directive({
  selector: '[uiTooltip]',
})
export class UiTooltipDirective implements OnDestroy {
  uiTooltip = input.required<string | TemplateRef<unknown>>();
  uiTooltipPosition = input<TooltipPosition>('top');
  uiTooltipDelay = input<number>(300);
  uiTooltipDisabled = input<boolean>(false);

  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);

  private overlayRef: OverlayRef | null = null;
  private componentRef: ComponentRef<UiTooltipComponent> | null = null;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private lastPosition: TooltipPosition | null = null;
  private readonly tooltipId = `ui-tooltip-${nextId++}`;

  // ── Event listeners ───────────────────────────────────────────────────

  constructor() {
    const el = this.elementRef.nativeElement as HTMLElement;

    el.addEventListener('mouseenter', this.onShow);
    el.addEventListener('focusin', this.onShow);
    el.addEventListener('mouseleave', this.onHide);
    el.addEventListener('focusout', this.onHide);
    el.addEventListener('keydown', this.onKeydown);
  }

  ngOnDestroy(): void {
    const el = this.elementRef.nativeElement as HTMLElement;
    el.removeEventListener('mouseenter', this.onShow);
    el.removeEventListener('focusin', this.onShow);
    el.removeEventListener('mouseleave', this.onHide);
    el.removeEventListener('focusout', this.onHide);
    el.removeEventListener('keydown', this.onKeydown);

    this.clearTimer();
    this.hide();
    this.overlayRef?.dispose();
  }

  // ── Show / Hide ───────────────────────────────────────────────────────

  private onShow = (): void => {
    if (this.componentRef || this.uiTooltipDisabled()) return;
    this.clearTimer();
    this.showTimer = setTimeout(() => this.show(), this.uiTooltipDelay());
  };

  private onHide = (): void => {
    this.clearTimer();
    this.hide();
  };

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.componentRef) {
      this.clearTimer();
      this.hide();
    }
  };

  private show(): void {
    if (this.componentRef || this.uiTooltipDisabled()) return;

    // Dispose stale overlay if position changed since last creation
    if (this.overlayRef && this.lastPosition !== this.uiTooltipPosition()) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }

    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay();
      this.lastPosition = this.uiTooltipPosition();
    }

    const portal = new ComponentPortal(UiTooltipComponent, this.viewContainerRef);
    this.componentRef = this.overlayRef.attach(portal);
    this.componentRef.setInput('content', this.uiTooltip());

    const tooltipEl = this.componentRef.location.nativeElement as HTMLElement;
    tooltipEl.setAttribute('id', this.tooltipId);

    (this.elementRef.nativeElement as HTMLElement).setAttribute(
      'aria-describedby',
      this.tooltipId,
    );
  }

  private hide(): void {
    if (!this.componentRef) return;

    this.overlayRef?.detach();
    this.componentRef = null;

    (this.elementRef.nativeElement as HTMLElement).removeAttribute('aria-describedby');
  }

  // ── Helpers ───────────────────────────────────────────────────────────

  private createOverlay(): OverlayRef {
    const position = POSITION_MAP[this.uiTooltipPosition()];

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([position]);

    return this.overlay.create({ positionStrategy, scrollStrategy: this.overlay.scrollStrategies.close() });
  }

  private clearTimer(): void {
    if (this.showTimer !== null) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
  }
}
