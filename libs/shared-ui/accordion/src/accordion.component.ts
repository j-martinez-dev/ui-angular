import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  linkedSignal,
  output,
  QueryList,
  TemplateRef,
  viewChildren,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { type AccordionItem } from './accordion.types';

@Component({
  selector: 'ui-accordion',
  imports: [UiIconComponent, NgTemplateOutlet],
  template: `
    <div class="accordion">
      @for (item of items(); track item.id; let i = $index) {
        <div
          class="accordion-item"
          [class.accordion-item--expanded]="openSet().has(item.id)"
          [class.accordion-item--disabled]="item.disabled"
        >
          <button
            #headerBtn
            class="accordion-header"
            [id]="'header-' + item.id"
            [attr.aria-expanded]="openSet().has(item.id)"
            [attr.aria-controls]="'panel-' + item.id"
            [disabled]="item.disabled"
            (click)="toggleItem(item.id)"
            (keydown)="onKeydown($event, i)"
          >
            <span class="accordion-title">{{ item.title }}</span>
            <ui-icon
              name="heroChevronDown"
              size="sm"
              color="muted"
              class="accordion-chevron"
              [class.accordion-chevron--open]="openSet().has(item.id)"
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
                {{ item.content }}
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
export class UiAccordionComponent {
  items = input<AccordionItem[]>([]);
  mode = input<'single' | 'multiple'>('single');
  expandedIds = input<string[]>([]);

  expandedIdsChange = output<string[]>();

  openIds = linkedSignal(() => this.expandedIds());

  protected openSet = computed(() => new Set(this.openIds()));

  private headerButtons = viewChildren<ElementRef<HTMLButtonElement>>('headerBtn');

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

  onKeydown(event: KeyboardEvent, index: number): void {
    const enabledItems = this.items().map((item, i) => ({ item, i })).filter(e => !e.item.disabled);
    const currentEnabledIdx = enabledItems.findIndex(e => e.i === index);
    if (currentEnabledIdx === -1) return;

    let targetIndex: number | null = null;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        targetIndex = enabledItems[(currentEnabledIdx + 1) % enabledItems.length].i;
        break;
      case 'ArrowUp':
        event.preventDefault();
        targetIndex = enabledItems[(currentEnabledIdx - 1 + enabledItems.length) % enabledItems.length].i;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = enabledItems[0].i;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = enabledItems[enabledItems.length - 1].i;
        break;
    }

    if (targetIndex !== null) {
      const buttons = this.headerButtons();
      buttons[targetIndex]?.nativeElement.focus();
    }
  }

  isTemplate(content: string | TemplateRef<unknown>): boolean {
    return content instanceof TemplateRef;
  }

  asTemplate(content: string | TemplateRef<unknown>): TemplateRef<unknown> {
    return content as TemplateRef<unknown>;
  }
}
