import {
  Component,
  contentChildren,
  ElementRef,
  inject,
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
  template: `
    <div class="dropdown-menu">
      <ui-icon-button
        #triggerRef
        [icon]="icon()"
        [label]="label()"
        [variant]="triggerVariant()"
        [size]="triggerSize()"
        [disabled]="disabled()"
        [attr.aria-haspopup]="'menu'"
        [attr.aria-expanded]="isOpen()"
        (click)="toggleMenu()"
      />
    </div>

    <ng-template #panelTpl>
      <div
        class="menu-panel"
        role="menu"
        (keydown)="onPanelKeydown($event)"
      >
        <ng-content />
      </div>
    </ng-template>
  `,
  styleUrl: './dropdown-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UiDropdownMenuComponent implements OnDestroy {
  icon = input<string>('heroEllipsisVertical');
  label = input<string>('Open menu');
  triggerVariant = input<'primary' | 'secondary' | 'ghost' | 'danger'>('ghost');
  triggerSize = input<'sm' | 'md' | 'lg'>('md');
  position = input<DropdownPosition>('bottom-end');
  disabled = input<boolean>(false);

  isOpen = signal(false);

  private triggerEl = viewChild<ElementRef<HTMLElement>>('triggerRef');
  private panelTpl = viewChild<TemplateRef<unknown>>('panelTpl');
  private menuItems = contentChildren(UiMenuItemComponent);

  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  private backdropSub: { unsubscribe(): void } | null = null;
  private focusedIndex = -1;

  ngOnDestroy(): void {
    this.backdropSub?.unsubscribe();
    this.overlayRef?.dispose();
  }

  toggleMenu(): void {
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
    }

    const portal = new TemplatePortal(panelTpl, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);
    this.focusedIndex = -1;

    this.backdropSub = this.overlayRef.backdropClick().subscribe(() => this.close());

    // Focus first enabled item
    requestAnimationFrame(() => this.moveFocus(1));
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
    const pos = POSITION_MAP[this.position()];
    const offsetY = pos.overlayY === 'top' ? 4 : -4;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerEl)
      .withPositions([
        { originX: pos.originX, originY: pos.originY, overlayX: pos.overlayX, overlayY: pos.overlayY, offsetY },
      ]);

    return this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private moveFocus(delta: number): void {
    const items = this.menuItems().filter(item => !item.disabled());
    if (items.length === 0) return;

    this.focusedIndex = Math.max(0, Math.min(items.length - 1, this.focusedIndex + delta));
    items[this.focusedIndex].focus();
  }
}
