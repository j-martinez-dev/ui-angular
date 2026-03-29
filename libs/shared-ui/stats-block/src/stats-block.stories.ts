import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroArrowTrendingUp,
  heroArrowTrendingDown,
  heroMinus,
  heroBanknotes,
  heroUsers,
  heroClock,
} from '@ng-icons/heroicons/outline';
import { UiStatsBlockComponent } from './stats-block.component';
import { type StatsItem } from './stats-block.types';

const icons = {
  heroArrowTrendingUp,
  heroArrowTrendingDown,
  heroMinus,
  heroBanknotes,
  heroUsers,
  heroClock,
};

const SAMPLE_ITEMS: StatsItem[] = [
  { label: 'Revenu total', value: '48 295 \u20AC', icon: 'heroBanknotes', trend: { direction: 'up', value: '+12%', label: 'vs mois dernier' } },
  { label: 'Utilisateurs actifs', value: '2 840', icon: 'heroUsers', trend: { direction: 'up', value: '+4.5%', label: 'vs mois dernier' } },
  { label: 'Taux de d\u00E9sabonnement', value: '3.2%', icon: 'heroArrowTrendingDown', trend: { direction: 'down', value: '-0.8%', label: 'vs mois dernier' } },
  { label: 'Session moyenne', value: '4m 32s', icon: 'heroClock', trend: { direction: 'neutral', value: '0%' } },
];

// \u2500\u2500 Docs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

@Component({
  selector: 'story-stats-block-docs',
  imports: [UiStatsBlockComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Stats Block</h2>
        <p class="ui-body-md ui-text-muted">
          Displays a grid of statistics with values, icons, and trends.
          Ideal for dashboards and summary pages.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <ui-stats-block [items]="items" [columns]="4" />
        <code class="ui-code">&lt;ui-stats-block [items]="items" [columns]="4" /&gt;</code>
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
              <td class="ui-code p-2">StatsItem[]</td>
              <td class="ui-code p-2">required</td>
              <td class="ui-body-sm p-2">List of stat items to display</td>
            </tr>
            <tr>
              <td class="ui-code p-2">columns</td>
              <td class="ui-code p-2">1 | 2 | 3 | 4</td>
              <td class="ui-code p-2">4</td>
              <td class="ui-body-sm p-2">Number of grid columns</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class StatsBlockDocsComponent {
  items = SAMPLE_ITEMS;
}

// \u2500\u2500 Variants \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

@Component({
  selector: 'story-stats-block-variants',
  imports: [UiStatsBlockComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">4 columns</p>
        <ui-stats-block [items]="items" [columns]="4" />
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">3 columns</p>
        <ui-stats-block [items]="items.slice(0, 3)" [columns]="3" />
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">2 columns</p>
        <ui-stats-block [items]="items.slice(0, 2)" [columns]="2" />
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">1 column</p>
        <ui-stats-block [items]="items.slice(0, 2)" [columns]="1" />
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Without icons</p>
        <ui-stats-block [items]="itemsNoIcons" [columns]="3" />
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Without trends</p>
        <ui-stats-block [items]="itemsNoTrends" [columns]="3" />
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme \u2014 Dark</p>
        <div class="theme-dark p-6" style="background: var(--color-surface-base); border-radius: var(--radius-md);">
          <ui-stats-block [items]="items" [columns]="4" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme \u2014 Pastel</p>
        <div class="theme-pastel p-6" style="background: var(--color-surface-base); border-radius: var(--radius-md);">
          <ui-stats-block [items]="items" [columns]="4" />
        </div>
      </section>

    </div>
  `,
})
class StatsBlockVariantsComponent {
  items = SAMPLE_ITEMS;

  itemsNoIcons: StatsItem[] = [
    { label: 'Commandes', value: '1 284', trend: { direction: 'up', value: '+8%', label: 'vs mois dernier' } },
    { label: 'Panier moyen', value: '37.50 \u20AC', trend: { direction: 'down', value: '-2.1%', label: 'vs mois dernier' } },
    { label: 'Taux de conversion', value: '4.8%', trend: { direction: 'neutral', value: '0%' } },
  ];

  itemsNoTrends: StatsItem[] = [
    { label: 'Projets', value: 42, icon: 'heroBanknotes' },
    { label: '\u00C9quipes', value: 8, icon: 'heroUsers' },
    { label: 'Temps total', value: '128h', icon: 'heroClock' },
  ];
}

// \u2500\u2500 Meta \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const meta: Meta<UiStatsBlockComponent> = {
  title: 'Shared UI/StatsBlock',
  component: UiStatsBlockComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
  },
};

export default meta;
type Story = StoryObj<UiStatsBlockComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [StatsBlockDocsComponent] }),
  ],
  render: () => ({
    template: `<story-stats-block-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    items: SAMPLE_ITEMS,
    columns: 4,
  },
  render: (args) => ({
    props: args,
    template: `<ui-stats-block ${argsToTemplate(args)} />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [StatsBlockVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-stats-block-variants />`,
  }),
};
