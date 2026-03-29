import {
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { Tab, Tabs, TabList } from '@angular/aria/tabs';
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
  imports: [UiIconComponent, Tabs, TabList, Tab],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
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

  protected selectionMode = computed(() =>
    this.activation() === 'automatic' ? 'follow' as const : 'explicit' as const,
  );

  protected selectedTab = linkedSignal(() => {
    const val = this.activeTabValue();
    return val !== null ? '' + val : undefined;
  });

  selectTab(value: T): void {
    this.activeTabValue.set(value);
    this.activeValueChange.emit(value);
  }

  onSelectedTabChange(tabValue: string | undefined): void {
    if (tabValue === undefined) return;
    const tab = this.tabs().find(t => '' + t.value === tabValue);
    if (tab) {
      this.selectTab(tab.value);
    }
  }
}
