import { inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { UiModalRef } from './modal-ref';
import { type ModalConfig, type ModalContent, UI_MODAL_DATA } from './modal.types';
import { UiModalComponent } from './modal.component';

@Injectable({ providedIn: 'root' })
export class UiModalService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);

  open<C = unknown, D = unknown, R = unknown>(
    content: ModalContent<C>,
    config?: ModalConfig<D>,
  ): UiModalRef<R> {
    const modalRef = new UiModalRef<R>();

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'ui-modal-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    const modalInjector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: UiModalRef, useValue: modalRef },
        { provide: UI_MODAL_DATA, useValue: config?.data },
      ],
    });

    const portal = new ComponentPortal(UiModalComponent, null, modalInjector);
    const componentRef = overlayRef.attach(portal);
    const instance = componentRef.instance;

    if (config?.title != null) componentRef.setInput('title', config.title);
    if (config?.size != null) componentRef.setInput('size', config.size);
    if (config?.closeOnBackdrop != null) componentRef.setInput('closeOnBackdrop', config.closeOnBackdrop);
    if (config?.closeOnEscape != null) componentRef.setInput('closeOnEscape', config.closeOnEscape);
    if (config?.showCloseButton != null) componentRef.setInput('showCloseButton', config.showCloseButton);

    // Render content inside the modal body
    if (content instanceof TemplateRef) {
      instance._content.set(content);
    } else {
      instance._content.set(content);
      instance._contentInjector.set(modalInjector);
    }

    // Backdrop click
    const backdropSub = overlayRef.backdropClick().subscribe(() => {
      if (config?.closeOnBackdrop !== false) {
        modalRef.close();
      }
    });

    // Dispose on close
    modalRef.closed$.subscribe({
      complete: () => {
        backdropSub.unsubscribe();
        overlayRef.dispose();
      },
    });

    return modalRef;
  }
}
