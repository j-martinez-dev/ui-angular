import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { type AccordionItem } from './accordion.types';

@Component({
  selector: 'ui-accordion',
  imports: [UiIconComponent, NgTemplateOutlet],
  template: `
    <div class="accordion">
      @for (item of items(); track item.id) {
        <div
          class="accordion-item"
          [class.accordion-item--expanded]="isExpanded(item.id)"
          [class.accordion-item--disabled]="item.disabled"
        >
          <button
            class="accordion-header"
            [id]="'header-' + item.id"
            [attr.aria-expanded]="isExpanded(item.id)"
            [attr.aria-controls]="'panel-' + item.id"
            [disabled]="item.disabled"
            (click)="toggleItem(item.id)"
          >
            <span class="accordion-title">{{ item.title }}</span>
            <ui-icon
              name="heroChevronDown"
              size="sm"
              color="muted"
              class="accordion-chevron"
              [class.accordion-chevron--open]="isExpanded(item.id)"
            />
          </button>

          <div
            class="accordion-panel"
            [id]="'panel-' + item.id"
            role="region"
            [attr.aria-labelledby]="'header-' + item.id"
          >
            <div class="accordion-content">
              @if (isTemplate(item.content)) {
                <ng-container [ngTemplateOutlet]="asTemplate(item.content)" />
              } @else {
                <p>{{ item.content }}</p>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAccordionComponent implements OnInit {
  items = input<AccordionItem[]>([]);
  mode = input<'single' | 'multiple'>('single');
  expandedIds = input<string[]>([]);

  expandedIdsChange = output<string[]>();

  openIds = signal<string[]>([]);

  ngOnInit(): void {
    this.openIds.set(this.expandedIds());
  }

  isExpanded(id: string): boolean {
    return this.openIds().includes(id);
  }

  toggleItem(id: string): void {
    if (this.mode() === 'single') {
      this.openIds.set(
        this.openIds().includes(id) ? [] : [id],
      );
    } else {
      this.openIds.update(ids =>
        ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id],
      );
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
