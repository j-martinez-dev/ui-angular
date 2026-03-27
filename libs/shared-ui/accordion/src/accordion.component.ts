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
  template: `
    <div class="accordion">
      @for (item of items(); track item.id) {
        <details
          class="accordion-item"
          [class.accordion-item--disabled]="item.disabled"
          [attr.name]="mode() === 'single' ? accordionName : null"
          [open]="openSet().has(item.id)"
          (toggle)="onToggle($event, item.id)"
        >
          <summary
            class="accordion-header"
            [class.accordion-header--disabled]="item.disabled"
          >
            <span class="accordion-title">{{ item.title }}</span>
            <ui-icon
              name="heroChevronDown"
              size="sm"
              color="muted"
              class="accordion-chevron"
            />
          </summary>

          <div class="accordion-content">
            @if (isTemplate(item.content)) {
              <ng-container [ngTemplateOutlet]="asTemplate(item.content)" />
            } @else {
              {{ item.content }}
            }
          </div>
        </details>
      }
    </div>
  `,
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
