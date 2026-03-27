import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroChevronDown,
  heroUser,
  heroLockClosed,
  heroCreditCard,
  heroCog6Tooth,
  heroBell,
} from '@ng-icons/heroicons/outline';
import { UiTabsComponent, type TabsVariant, type TabsSize } from './tabs.component';
import { type TabItem } from './tabs.types';

const icons = {
  heroChevronDown,
  heroUser,
  heroLockClosed,
  heroCreditCard,
  heroCog6Tooth,
  heroBell,
};

const SIMPLE_TABS: TabItem[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'features', label: 'Features' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'docs', label: 'Documentation' },
];

const ICON_TABS: TabItem[] = [
  { value: 'profile', label: 'Profile', icon: 'heroUser' },
  { value: 'security', label: 'Security', icon: 'heroLockClosed' },
  { value: 'billing', label: 'Billing', icon: 'heroCreditCard' },
  { value: 'settings', label: 'Settings', icon: 'heroCog6Tooth' },
  { value: 'notifications', label: 'Notifications', icon: 'heroBell' },
];

const WITH_DISABLED: TabItem[] = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'archived', label: 'Archived', disabled: true },
  { value: 'deleted', label: 'Deleted' },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-tabs-docs',
  imports: [UiTabsComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Tabs</h2>
        <p class="ui-body-md ui-text-muted">
          A tab strip component for switching between views. Supports line and pill variants,
          horizontal and vertical orientations, icons, and keyboard navigation.
          Content rendering is handled by the consumer.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          <ui-tabs [tabs]="tabs" />
        </div>
        <code class="ui-code">&lt;ui-tabs [tabs]="tabs" (activeValueChange)="onTab($event)" /&gt;</code>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Inputs</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <th class="ui-body-sm p-2 text-left">Input</th>
              <th class="ui-body-sm p-2 text-left">Type</th>
              <th class="ui-body-sm p-2 text-left">Default</th>
              <th class="ui-body-sm p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">tabs</td>
              <td class="ui-code p-2">TabItem[]</td>
              <td class="ui-code p-2">[]</td>
              <td class="ui-body-sm p-2">List of tab items</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">activeValue</td>
              <td class="ui-code p-2">T</td>
              <td class="ui-body-sm p-2">first tab</td>
              <td class="ui-body-sm p-2">Currently active tab value</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">variant</td>
              <td class="ui-code p-2">line | pill</td>
              <td class="ui-code p-2">line</td>
              <td class="ui-body-sm p-2">Visual style</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">orientation</td>
              <td class="ui-code p-2">horizontal | vertical</td>
              <td class="ui-code p-2">horizontal</td>
              <td class="ui-body-sm p-2">Layout direction</td>
            </tr>
            <tr>
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Tab size</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class TabsDocsComponent {
  tabs = SIMPLE_TABS;
}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: TabsVariant[] = ['line', 'pill'];
const SIZES: TabsSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-tabs-variants',
  imports: [UiTabsComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      @for (variant of variants; track variant) {
        <section class="flex flex-col gap-4">
          <p class="ui-overline">{{ variant }}</p>
          <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
            <ui-tabs [tabs]="simpleTabs" [variant]="variant" />
          </div>
        </section>
      }

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes (line)</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          @for (size of sizes; track size) {
            <ui-tabs [tabs]="simpleTabs" variant="line" [size]="size" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes (pill)</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          @for (size of sizes; track size) {
            <ui-tabs [tabs]="simpleTabs" variant="pill" [size]="size" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With icons</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 600px;">
          <ui-tabs [tabs]="iconTabs" variant="line" />
        </div>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 600px;">
          <ui-tabs [tabs]="iconTabs" variant="pill" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With disabled tab</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          <ui-tabs [tabs]="withDisabled" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Vertical — Line</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px; min-height: 200px;">
          <ui-tabs [tabs]="iconTabs" variant="line" orientation="vertical" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Vertical — Pill</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px; min-height: 200px;">
          <ui-tabs [tabs]="iconTabs" variant="pill" orientation="vertical" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 520px;">
          <div class="flex flex-col gap-4">
            <ui-tabs [tabs]="simpleTabs" variant="line" />
            <ui-tabs [tabs]="simpleTabs" variant="pill" />
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 520px;">
          <div class="flex flex-col gap-4">
            <ui-tabs [tabs]="simpleTabs" variant="line" />
            <ui-tabs [tabs]="simpleTabs" variant="pill" />
          </div>
        </div>
      </section>

    </div>
  `,
})
class TabsVariantsComponent {
  variants = VARIANTS;
  sizes = SIZES;
  simpleTabs = SIMPLE_TABS;
  iconTabs = ICON_TABS;
  withDisabled = WITH_DISABLED;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiTabsComponent> = {
  title: 'Components/Tabs',
  component: UiTabsComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'pill'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<UiTabsComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [TabsDocsComponent] }),
  ],
  render: () => ({
    template: `<story-tabs-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    tabs: SIMPLE_TABS as any,
    variant: 'line',
    orientation: 'horizontal',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-lg">
        <ui-tabs [tabs]="tabs" [variant]="variant" [orientation]="orientation" [size]="size" />
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [TabsVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-tabs-variants />`,
  }),
};
