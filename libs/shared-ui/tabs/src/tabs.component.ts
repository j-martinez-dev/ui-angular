import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  linkedSignal,
  output,
  viewChildren,
} from '@angular/core';
import { UiIconComponent, type IconSize } from '@ui/shared-ui/icon';
import { type TabItem } from './tabs.types';

export type TabsVariant = 'line' | 'pill';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsSize = 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<TabsSize, IconSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
};

@Component({
  selector: 'ui-tabs',
  imports: [UiIconComponent],
  template: `
    <div
      class="tabs"
      [class.tabs--vertical]="orientation() === 'vertical'"
      [class.tabs--horizontal]="orientation() === 'horizontal'"
    >
      <div
        class="tabs-strip"
        [class.tabs-strip--pill]="variant() === 'pill'"
        role="tablist"
        [attr.aria-orientation]="orientation()"
      >
        @for (tab of tabs(); track tab.value) {
          <button
            #tabBtn
            class="tab"
            [class.tab--active]="activeTabValue() === tab.value"
            [class.tab--disabled]="tab.disabled"
            [class.tab--line]="variant() === 'line'"
            [class.tab--pill]="variant() === 'pill'"
            role="tab"
            [id]="'tab-' + tab.value"
            [attr.aria-selected]="activeTabValue() === tab.value"
            [attr.aria-controls]="'tabpanel-' + tab.value"
            [attr.tabindex]="activeTabValue() === tab.value ? 0 : -1"
            [disabled]="tab.disabled"
            (click)="selectTab(tab.value)"
            (keydown)="onKeydown($event)"
          >
            @if (tab.icon) {
              <ui-icon [name]="tab.icon" [size]="iconSize()" />
            }
            <span>{{ tab.label }}</span>
          </button>
        }
      </div>
    </div>
  `,
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
  },
})
export class UiTabsComponent<T = string> {
  tabs = input<TabItem<T>[]>([]);
  activeValue = input<T>();
  variant = input<TabsVariant>('line');
  orientation = input<TabsOrientation>('horizontal');
  size = input<TabsSize>('md');
  activation = input<'automatic' | 'manual'>('automatic');

  activeValueChange = output<T>();

  activeTabValue = linkedSignal<T | null>(() => {
    const explicit = this.activeValue();
    if (explicit !== undefined) return explicit as T;
    const firstEnabled = this.tabs().find(t => !t.disabled);
    return firstEnabled?.value ?? null;
  });

  protected iconSize = computed(() => ICON_SIZE_MAP[this.size()]);

  /** Consumers use this to set aria-labelledby on their tabpanel */
  activeTabId = computed(() => {
    const val = this.activeTabValue();
    return val !== null ? `tab-${val}` : null;
  });

  /** Consumers use this to set id on their tabpanel */
  activePanelId = computed(() => {
    const val = this.activeTabValue();
    return val !== null ? `tabpanel-${val}` : null;
  });

  private tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabBtn');

  selectTab(value: T): void {
    this.activeTabValue.set(value);
    this.activeValueChange.emit(value);
  }

  onKeydown(event: KeyboardEvent): void {
    const isHorizontal = this.orientation() === 'horizontal';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

    let handled = true;

    switch (event.key) {
      case nextKey:
        this.moveFocus(1);
        break;
      case prevKey:
        this.moveFocus(-1);
        break;
      case 'Home':
        this.focusFirst();
        break;
      case 'End':
        this.focusLast();
        break;
      case 'Enter':
      case ' ':
        // Native click handles activation
        break;
      default:
        handled = false;
    }

    if (handled) event.preventDefault();
  }

  private moveFocus(delta: number): void {
    const enabledTabs = this.tabs().filter(t => !t.disabled);
    if (enabledTabs.length === 0) return;

    const currentIdx = enabledTabs.findIndex(t => t.value === this.activeTabValue());
    let nextIdx = currentIdx + delta;

    if (nextIdx < 0) nextIdx = enabledTabs.length - 1;
    if (nextIdx >= enabledTabs.length) nextIdx = 0;

    const tab = enabledTabs[nextIdx];
    if (this.activation() === 'automatic') {
      this.selectTab(tab.value);
    }
    this.focusTabButton(tab.value);
  }

  private focusFirst(): void {
    const first = this.tabs().find(t => !t.disabled);
    if (first) {
      if (this.activation() === 'automatic') {
        this.selectTab(first.value);
      }
      this.focusTabButton(first.value);
    }
  }

  private focusLast(): void {
    const last = [...this.tabs()].reverse().find(t => !t.disabled);
    if (last) {
      if (this.activation() === 'automatic') {
        this.selectTab(last.value);
      }
      this.focusTabButton(last.value);
    }
  }

  private focusTabButton(value: T): void {
    queueMicrotask(() => {
      const idx = this.tabs().findIndex(t => t.value === value);
      this.tabButtons()[idx]?.nativeElement.focus();
    });
  }
}
