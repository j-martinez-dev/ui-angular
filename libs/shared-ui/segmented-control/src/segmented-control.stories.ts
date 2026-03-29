import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroBars3,
  heroSquares2x2,
  heroSun,
  heroMoon,
  heroComputerDesktop,
} from '@ng-icons/heroicons/outline';
import {
  UiSegmentedControlComponent,
  type SegmentedControlSize,
} from './segmented-control.component';
import { type TabItem } from '@ui/shared-ui/tabs';

const icons = { heroBars3, heroSquares2x2, heroSun, heroMoon, heroComputerDesktop };

const PERIOD_OPTIONS: TabItem<string>[] = [
  { value: 'week', label: 'Semaine' },
  { value: 'month', label: 'Mois' },
  { value: 'year', label: 'Année' },
];

const VIEW_OPTIONS: TabItem<string>[] = [
  { value: 'list', label: 'Liste', icon: 'heroBars3' },
  { value: 'grid', label: 'Grille', icon: 'heroSquares2x2' },
];

const THEME_OPTIONS: TabItem<string>[] = [
  { value: 'light', label: 'Clair', icon: 'heroSun' },
  { value: 'dark', label: 'Sombre', icon: 'heroMoon' },
  { value: 'system', label: 'Système', icon: 'heroComputerDesktop' },
];

const WITH_DISABLED: TabItem<string>[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B', disabled: true },
  { value: 'c', label: 'Option C' },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-segmented-docs',
  imports: [UiSegmentedControlComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Segmented Control</h2>
        <p class="ui-body-md ui-text-muted">
          A group of mutually exclusive options displayed as connected buttons.
          Used for switching views, filters, or modes.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-segmented-control
            [options]="periods"
            [value]="selectedPeriod()"
            label="Period"
            (valueChange)="selectedPeriod.set($event)"
          />
          <code class="ui-code">&lt;ui-segmented-control [options]="periods" [value]="selected" (valueChange)="selected = $event" /&gt;</code>
        </div>
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
              <td class="ui-code p-2">options</td>
              <td class="ui-code p-2">TabItem&lt;T&gt;[]</td>
              <td class="ui-code p-2">required</td>
              <td class="ui-body-sm p-2">List of options</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">value</td>
              <td class="ui-code p-2">T</td>
              <td class="ui-code p-2">undefined</td>
              <td class="ui-body-sm p-2">Currently selected value</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Control size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">fullWidth</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Stretch to container width</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables all options</td>
            </tr>
            <tr>
              <td class="ui-code p-2">label</td>
              <td class="ui-code p-2">string | undefined</td>
              <td class="ui-code p-2">undefined</td>
              <td class="ui-body-sm p-2">Accessible name (aria-label)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class SegmentedDocsComponent {
  periods = PERIOD_OPTIONS;
  selectedPeriod = signal('month');
}

// ── Variants ────────────────────────────────────────────────────────────────

const SIZES: SegmentedControlSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-segmented-variants',
  imports: [UiSegmentedControlComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <ui-segmented-control
              [options]="periods"
              [value]="selectedPeriod()"
              [size]="size"
              [label]="'Period ' + size"
              (valueChange)="selectedPeriod.set($event)"
            />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With icons</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-segmented-control
            [options]="viewOptions"
            [value]="selectedView()"
            label="View mode"
            (valueChange)="selectedView.set($event)"
          />
          <ui-segmented-control
            [options]="themeOptions"
            [value]="selectedTheme()"
            label="Theme"
            (valueChange)="selectedTheme.set($event)"
          />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Full width</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-segmented-control
            [options]="viewOptions"
            [value]="selectedView()"
            [fullWidth]="true"
            label="View mode"
            (valueChange)="selectedView.set($event)"
          />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">States</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-segmented-control
            [options]="withDisabled"
            [value]="'a'"
            label="With disabled option"
          />
          <ui-segmented-control
            [options]="periods"
            [value]="'month'"
            [disabled]="true"
            label="Fully disabled"
          />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <ui-segmented-control
            [options]="themeOptions"
            [value]="selectedTheme()"
            label="Theme"
            (valueChange)="selectedTheme.set($event)"
          />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <ui-segmented-control
            [options]="themeOptions"
            [value]="selectedTheme()"
            label="Theme"
            (valueChange)="selectedTheme.set($event)"
          />
        </div>
      </section>

    </div>
  `,
})
class SegmentedVariantsComponent {
  sizes = SIZES;
  periods = PERIOD_OPTIONS;
  viewOptions = VIEW_OPTIONS;
  themeOptions = THEME_OPTIONS;
  withDisabled = WITH_DISABLED;

  selectedPeriod = signal('month');
  selectedView = signal('list');
  selectedTheme = signal('system');
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiSegmentedControlComponent> = {
  title: 'Shared UI/Segmented Control',
  component: UiSegmentedControlComponent,
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
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiSegmentedControlComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [SegmentedDocsComponent] }),
  ],
  render: () => ({
    template: `<story-segmented-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    options: PERIOD_OPTIONS,
    value: 'month',
    size: 'md',
    fullWidth: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<ui-segmented-control
      [options]="options"
      [value]="value"
      [size]="size"
      [fullWidth]="fullWidth"
      [disabled]="disabled"
      label="Period"
    />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [SegmentedVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-segmented-variants />`,
  }),
};
