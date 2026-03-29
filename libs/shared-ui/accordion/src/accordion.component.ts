import {
  Component,
  computed,
  input,
  linkedSignal,
  output,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { type AccordionItem } from './accordion.types';

let nextId = 0;

@Component({
  selector: 'ui-accordion',
  imports: [UiIconComponent, NgTemplateOutlet],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class UiAccordionComponent {
  items = input<AccordionItem[]>([]);
  mode = input<'single' | 'multiple'>('single');
  expandedIds = input<string[]>([]);

  expandedIdsChange = output<string[]>();

  openIds = linkedSignal(() => this.expandedIds());
  protected openSet = computed(() => new Set(this.openIds()));

  // Unique name for exclusive accordion (single mode)
  protected readonly accordionName = `ui-accordion-${nextId++}`;

  onToggle(event: Event, id: string): void {
    const item = this.items().find(i => i.id === id);
    if (item?.disabled) return;
    const details = event.target as HTMLDetailsElement;
    if (details.open) {
      if (this.mode() === 'single') {
        this.openIds.set([id]);
      } else {
        this.openIds.update(ids => ids.includes(id) ? ids : [...ids, id]);
      }
    } else {
      this.openIds.update(ids => ids.filter(i => i !== id));
    }
    this.expandedIdsChange.emit(this.openIds());
  }

  isTemplate(content: string | TemplateRef<unknown>): boolean {
    return content instanceof TemplateRef;
  }

  asTemplate(content: string | TemplateRef<unknown>): TemplateRef<unknown> {
    return content as TemplateRef<unknown>;
  }
}
