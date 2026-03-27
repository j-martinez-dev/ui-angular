import { TemplateRef } from '@angular/core';

export interface AccordionItem {
  id: string;
  title: string;
  content: string | TemplateRef<unknown>;
  disabled?: boolean;
}
