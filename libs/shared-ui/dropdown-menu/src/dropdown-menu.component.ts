import {
  afterNextRender,
  Component,
  contentChildren,
  ElementRef,
  inject,
  Injector,
  input,
  OnDestroy,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import { UiMenuItemComponent } from './menu-item.component';
import { DROPDOWN_MENU, type DropdownMenuRef } from './dropdown-menu.token';

export type DropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

const POSITION_MAP: Record<
  DropdownPosition,
  { originX: 'start' | 'end'; originY: 'top' | 'bottom'; overlayX: 'start' | 'end'; overlayY: 'top' | 'bottom' }
> = {
  'bottom-start': { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
  'bottom-end': { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
  'top-start': { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
  'top-end': { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
};

@Component({
  selector: 'ui-dropdown-menu',
  imports: [UiIconButtonComponent],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: DROPDOWN_MENU, useExisting: UiDropdownMenuComponent }],
})
export class UiDropdownMenuComponent implements DropdownMenuRef, OnDestroy {
  icon = input<string>('heroEllipsisVertical');
  label = input<string>('Ouvrir le menu');
  triggerVariant = input<'primary' | 'secondary' | 'ghost' | 'danger'>('ghost');
  triggerSize = input<'sm' | 'md' | 'lg'>('md');
  position = input<DropdownPosition>('bottom-end');
  disabled = input<boolean>(false);

  isOpen = signal(false);

  private triggerEl = viewChild('triggerRef', { read: ElementRef });
  private panelTpl = viewChild<TemplateRef<unknown>>('panelTpl');
  private menuItems = contentChildren(UiMenuItemComponent);

  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  private backdropSub: { unsubscribe(): void } | null = null;
  private focusedIndex = -1;

  ngOnDestroy(): void {
    this.backdropSub?.unsubscribe();
    this.overlayRef?.dispose();
  }

  toggleMenu(): void {
    if (this.disabled()) return;
    this.isOpen() ? this.close() : this.open();
  }

  onPanelKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveFocus(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveFocus(-1);
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Home':
        event.preventDefault();
        this.focusedIndex = 0;
        this.menuItems().filter(item => !item.disabled())[0]?.focus();
        break;
      case 'End': {
        event.preventDefault();
        const items = this.menuItems().filter(item => !item.disabled());
        this.focusedIndex = items.length - 1;
        items[this.focusedIndex]?.focus();
        break;
      }
      case 'Tab':
        this.close();
        break;
    }
  }

  // ── Private ─────────────────────────────────────────────────────────────

  private open(): void {
    if (this.isOpen()) return;

    const triggerEl = this.triggerEl();
    const panelTpl = this.panelTpl();
    if (!triggerEl || !panelTpl) return;

    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay(triggerEl);
    } else {
      this.updateOverlayPosition(triggerEl);
    }

    const portal = new TemplatePortal(panelTpl, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);
    this.focusedIndex = -1;

    this.backdropSub = this.overlayRef.backdropClick().subscribe(() => this.close());

    afterNextRender(() => this.moveFocus(1), { injector: this.injector });
  }

  close(): void {
    if (!this.isOpen()) return;
    this.backdropSub?.unsubscribe();
    this.backdropSub = null;
    this.overlayRef?.detach();
    this.isOpen.set(false);
    this.focusedIndex = -1;

    // Return focus to the trigger
    const trigger = this.triggerEl()?.nativeElement?.querySelector('button');
    trigger?.focus();
  }

  private createOverlay(triggerEl: ElementRef<HTMLElement>): OverlayRef {
    return this.overlay.create({
      positionStrategy: this.buildPositionStrategy(triggerEl),
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private updateOverlayPosition(triggerEl: ElementRef<HTMLElement>): void {
    this.overlayRef!.updatePositionStrategy(this.buildPositionStrategy(triggerEl));
  }

  private buildPositionStrategy(triggerEl: ElementRef<HTMLElement>) {
    const pos = POSITION_MAP[this.position()];
    const offsetY = pos.overlayY === 'top' ? 4 : -4;

    return this.overlay
      .position()
      .flexibleConnectedTo(triggerEl)
      .withPositions([
        { originX: pos.originX, originY: pos.originY, overlayX: pos.overlayX, overlayY: pos.overlayY, offsetY },
      ]);
  }

  private moveFocus(delta: number): void {
    const items = this.menuItems().filter(item => !item.disabled());
    if (items.length === 0) return;

    let next = this.focusedIndex + delta;
    if (next < 0) next = items.length - 1;
    if (next >= items.length) next = 0;
    this.focusedIndex = next;
    items[this.focusedIndex].focus();
  }
}
