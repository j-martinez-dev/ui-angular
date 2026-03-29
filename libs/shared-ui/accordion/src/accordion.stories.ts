import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';
import { UiAccordionComponent } from './accordion.component';
import { type AccordionItem } from './accordion.types';

const icons = { heroChevronDown };

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what',
    title: 'What is this design system?',
    content: 'A collection of reusable Angular components built with a token-based theming system. It supports light, dark, and pastel themes out of the box.',
  },
  {
    id: 'how',
    title: 'How do I install it?',
    content: 'Import the shared-ui library into your Angular project and add the styles entry point to your global styles.',
  },
  {
    id: 'tokens',
    title: 'What are design tokens?',
    content: 'Design tokens are CSS custom properties that define colors, spacing, typography, and other visual attributes. They ensure consistency across all components.',
  },
  {
    id: 'theme',
    title: 'Can I customize the theme?',
    content: 'Yes. Override the CSS custom properties in your project styles or define accent colors in your consuming application.',
  },
  {
    id: 'disabled',
    title: 'This item is disabled',
    content: 'You should not be able to see this content.',
    disabled: true,
  },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-accordion-docs',
  imports: [UiAccordionComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Accordion</h2>
        <p class="ui-body-md ui-text-muted">
          A vertically stacked set of collapsible sections. Supports single or multiple
          expansion modes, disabled items, and smooth CSS-only animations.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          <ui-accordion [items]="items" />
        </div>
        <code class="ui-code">&lt;ui-accordion [items]="items" /&gt;</code>
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
              <td class="ui-code p-2">AccordionItem[]</td>
              <td class="ui-code p-2">[]</td>
              <td class="ui-body-sm p-2">List of accordion sections</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">mode</td>
              <td class="ui-code p-2">single | multiple</td>
              <td class="ui-code p-2">single</td>
              <td class="ui-body-sm p-2">Expansion mode</td>
            </tr>
            <tr>
              <td class="ui-code p-2">expandedIds</td>
              <td class="ui-code p-2">string[]</td>
              <td class="ui-code p-2">[]</td>
              <td class="ui-body-sm p-2">Initially expanded item ids</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class AccordionDocsComponent {
  items = FAQ_ITEMS.filter(i => !i.disabled);
}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-accordion-variants',
  imports: [UiAccordionComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Single mode (default)</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          <ui-accordion [items]="items" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Multiple mode</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          <ui-accordion [items]="items" mode="multiple" [expandedIds]="['what', 'tokens']" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With disabled item</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          <ui-accordion [items]="allItems" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Pre-expanded</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          <ui-accordion [items]="items" [expandedIds]="['how']" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 520px;">
          <ui-accordion [items]="items" [expandedIds]="['what']" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 520px;">
          <ui-accordion [items]="items" [expandedIds]="['tokens']" />
        </div>
      </section>

    </div>
  `,
})
class AccordionVariantsComponent {
  allItems = FAQ_ITEMS;
  items = FAQ_ITEMS.filter(i => !i.disabled);
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiAccordionComponent> = {
  title: 'Shared UI/Accordion',
  component: UiAccordionComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple'],
    },
  },
};

export default meta;
type Story = StoryObj<UiAccordionComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [AccordionDocsComponent] }),
  ],
  render: () => ({
    template: `<story-accordion-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    items: FAQ_ITEMS.filter(i => !i.disabled) as any,
    mode: 'single',
    expandedIds: [],
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-lg">
        <ui-accordion [items]="items" [mode]="mode" [expandedIds]="expandedIds" />
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [AccordionVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-accordion-variants />`,
  }),
};
