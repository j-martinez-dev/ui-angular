import { InjectionToken, TemplateRef, Type } from '@angular/core';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

export interface ModalConfig<D = unknown> {
  title?: string;
  size?: ModalSize;
  data?: D;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
}

export type ModalContent<C = unknown> = TemplateRef<C> | Type<C>;

export const UI_MODAL_DATA = new InjectionToken<unknown>('UI_MODAL_DATA');
