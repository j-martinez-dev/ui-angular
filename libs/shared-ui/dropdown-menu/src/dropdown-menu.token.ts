import { InjectionToken } from '@angular/core';

export interface DropdownMenuRef {
  close(): void;
}

export const DROPDOWN_MENU = new InjectionToken<DropdownMenuRef>('UiDropdownMenu');
