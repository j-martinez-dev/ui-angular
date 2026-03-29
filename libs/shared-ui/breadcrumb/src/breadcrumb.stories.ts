import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroChevronRight,
  heroHome,
  heroFolder,
  heroDocument,
  heroCog6Tooth,
} from '@ng-icons/heroicons/outline';
import { UiBreadcrumbComponent, type BreadcrumbSize } from './breadcrumb.component';
import { type BreadcrumbItem } from './breadcrumb.types';

const icons = { heroChevronRight, heroHome, heroFolder, heroDocument, heroCog6Tooth };

const SIMPLE: BreadcrumbItem[] = [
  { value: 'home', label: 'Home' },
  { value: 'products', label: 'Products' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'phones', label: 'Phones' },
];

const WITH_ICONS: BreadcrumbItem[] = [
  { value: 'home', label: 'Home', icon: 'heroHome' },
  { value: 'docs', label: 'Documents', icon: 'heroFolder' },
  { value: 'file', label: 'Report.pdf', icon: 'heroDocument' },
];

const DEEP: BreadcrumbItem[] = [
  { value: 'home', label: 'Home' },
  { value: 'settings', label: 'Settings' },
  { value: 'account', label: 'Account' },
  { value: 'security', label: 'Security' },
  { value: 'two-factor', label: 'Two-Factor Authentication' },
];

const SIZES: BreadcrumbSize[] = ['sm', 'md', 'lg'];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-breadcrumb-docs',
  imports: [UiBreadcrumbComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Breadcrumb</h2>
        <p class="ui-body-md ui-text-muted">
          A navigation aid that shows the user's location within a hierarchy.
          All items except the last are clickable. Supports icons and multiple sizes.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-breadcrumb [items]="items" />
        </div>
        <code class="ui-code">&lt;ui-breadcrumb [items]="items" (itemClick)="navigate($event)" /&gt;</code>
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
              <td class="ui-code p-2">items</td>
              <td class="ui-code p-2">BreadcrumbItem[]</td>
              <td class="ui-code p-2">[]</td>
              <td class="ui-body-sm p-2">List of breadcrumb items</td>
            </tr>
            <tr>
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Breadcrumb size</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class BreadcrumbDocsComponent {
  items = SIMPLE;
}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-breadcrumb-variants',
  imports: [UiBreadcrumbComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Simple</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-breadcrumb [items]="simple" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With icons</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-breadcrumb [items]="withIcons" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Deep hierarchy</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-breadcrumb [items]="deep" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <ui-breadcrumb [items]="simple" [size]="size" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <ui-breadcrumb [items]="withIcons" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <ui-breadcrumb [items]="withIcons" />
        </div>
      </section>

    </div>
  `,
})
class BreadcrumbVariantsComponent {
  simple = SIMPLE;
  withIcons = WITH_ICONS;
  deep = DEEP;
  sizes = SIZES;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiBreadcrumbComponent> = {
  title: 'Shared UI/Breadcrumb',
  component: UiBreadcrumbComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<UiBreadcrumbComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [BreadcrumbDocsComponent] }),
  ],
  render: () => ({
    template: `<story-breadcrumb-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    items: SIMPLE as any,
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<ui-breadcrumb [items]="items" [size]="size" />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [BreadcrumbVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-breadcrumb-variants />`,
  }),
};
