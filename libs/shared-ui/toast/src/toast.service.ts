import { ComponentRef, effect, type EffectRef, inject, Injectable, Injector, signal } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { type OutputRefSubscription } from '@angular/core';
import { UiToastContainerComponent } from './toast-container.component';
import {
  type ToastConfig,
  type ToastGlobalConfig,
  type ToastItem,
  type ToastPosition,
} from './toast.types';

const POSITION_OFFSET = 'calc(var(--spacing) * 4)';

function applyPosition(strategy: ReturnType<ReturnType<Overlay['position']>['global']>, position: ToastPosition) {
  switch (position) {
    case 'top-left':
      return strategy.top(POSITION_OFFSET).left(POSITION_OFFSET);
    case 'top-center':
      return strategy.top(POSITION_OFFSET).centerHorizontally();
    case 'top-right':
      return strategy.top(POSITION_OFFSET).right(POSITION_OFFSET);
    case 'bottom-left':
      return strategy.bottom(POSITION_OFFSET).left(POSITION_OFFSET);
    case 'bottom-center':
      return strategy.bottom(POSITION_OFFSET).centerHorizontally();
    case 'bottom-right':
      return strategy.bottom(POSITION_OFFSET).right(POSITION_OFFSET);
  }
}

@Injectable({ providedIn: 'root' })
export class UiToastService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);

  private readonly toasts = signal<ToastItem[]>([]);
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

  private position: ToastPosition = 'bottom-right';
  private maxToasts = 5;
  private defaultDuration = 4000;

  private overlayRef: OverlayRef | null = null;
  private containerRef: ComponentRef<UiToastContainerComponent> | null = null;
  private syncEffectRef: EffectRef | null = null;
  private dismissSub: OutputRefSubscription | null = null;

  configure(config: ToastGlobalConfig): void {
    if (config.maxToasts != null) this.maxToasts = config.maxToasts;
    if (config.duration != null) this.defaultDuration = config.duration;

    if (config.position != null && config.position !== this.position) {
      this.position = config.position;
      if (this.overlayRef) {
        this.destroyContainer();
        this.ensureContainer();
      }
    }
  }

  show(config: ToastConfig): string {
    const id = crypto.randomUUID();
    const toast: ToastItem = {
      id,
      message: config.message,
      type: config.type ?? 'default',
      duration: config.duration ?? this.defaultDuration,
      actionLabel: config.actionLabel ?? '',
      onAction: config.onAction,
    };

    this.ensureContainer();

    this.toasts.update(current => {
      const next = [...current, toast];
      while (next.length > this.maxToasts) {
        const removed = next.shift()!;
        this.clearTimer(removed.id);
      }
      return next;
    });

    if (toast.duration > 0) {
      const timer = setTimeout(() => this.dismiss(id), toast.duration);
      this.timers.set(id, timer);
    }

    return id;
  }

  dismiss(id: string): void {
    this.clearTimer(id);
    this.toasts.update(current => current.filter(t => t.id !== id));
  }

  dismissAll(): void {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
    this.toasts.set([]);
  }

  private clearTimer(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
  }

  private destroyContainer(): void {
    this.syncEffectRef?.destroy();
    this.syncEffectRef = null;
    this.dismissSub?.unsubscribe();
    this.dismissSub = null;
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.containerRef = null;
  }

  private ensureContainer(): void {
    if (this.overlayRef) return;

    const positionStrategy = applyPosition(
      this.overlay.position().global(),
      this.position,
    );

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      hasBackdrop: false,
      panelClass: 'ui-toast-overlay',
    });

    const portal = new ComponentPortal(UiToastContainerComponent);
    this.containerRef = this.overlayRef.attach(portal);

    this.containerRef.setInput('toasts', this.toasts());
    this.containerRef.setInput('position', this.position);

    this.syncEffectRef = effect(() => {
      this.containerRef!.setInput('toasts', this.toasts());
    }, { injector: this.injector });

    this.dismissSub = this.containerRef.instance.dismissed.subscribe((id: string) => {
      this.dismiss(id);
    });
  }
}
