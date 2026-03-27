import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import {
  UiSpinnerComponent,
  SpinnerSize,
  SpinnerColor,
  SpinnerVariant,
} from './spinner.component';

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-spinner-docs',
  imports: [UiSpinnerComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Spinner</h2>
        <p class="ui-body-md ui-text-muted">
          A loading indicator available in two visual variants: a circular SVG spinner
          and an animated dots pulse. Supports semantic colors and multiple sizes.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex items-center gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-spinner variant="circular" size="lg" color="primary" />
          <ui-spinner variant="dots" size="lg" color="primary" />
          <code class="ui-code">&lt;ui-spinner variant="circular" size="lg" color="primary" /&gt;</code>
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
              <td class="ui-code p-2">variant</td>
              <td class="ui-code p-2">circular | dots</td>
              <td class="ui-code p-2">circular</td>
              <td class="ui-body-sm p-2">Visual style of the spinner</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">xs | sm | md | lg | xl</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Spinner size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">color</td>
              <td class="ui-code p-2">primary | success | warning | error | info | muted</td>
              <td class="ui-code p-2">primary</td>
              <td class="ui-body-sm p-2">Semantic color token</td>
            </tr>
            <tr>
              <td class="ui-code p-2">label</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">Loading...</td>
              <td class="ui-body-sm p-2">Accessible label (aria-label)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class SpinnerDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const SIZES: SpinnerSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const COLORS: SpinnerColor[] = ['primary', 'success', 'warning', 'error', 'info', 'muted'];
const VARIANTS: SpinnerVariant[] = ['circular', 'dots'];

@Component({
  selector: 'story-spinner-variants',
  imports: [UiSpinnerComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Circular — Sizes</p>
        <div class="flex items-end gap-8 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <div class="flex flex-col items-center gap-3">
              <ui-spinner variant="circular" [size]="size" color="primary" />
              <span class="ui-caption">{{ size }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Dots — Sizes</p>
        <div class="flex items-end gap-8 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <div class="flex flex-col items-center gap-3">
              <ui-spinner variant="dots" [size]="size" color="primary" />
              <span class="ui-caption">{{ size }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Colors — Circular</p>
        <div class="flex items-center gap-8 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (color of colors; track color) {
            <div class="flex flex-col items-center gap-3">
              <ui-spinner variant="circular" size="lg" [color]="color" />
              <span class="ui-caption">{{ color }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Colors — Dots</p>
        <div class="flex items-center gap-8 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (color of colors; track color) {
            <div class="flex flex-col items-center gap-3">
              <ui-spinner variant="dots" size="lg" [color]="color" />
              <span class="ui-caption">{{ color }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">On dark surface</p>
        <div class="flex items-center gap-8 p-4" style="background: var(--color-surface-sunken); border-radius: var(--radius-md);">
          @for (v of variants; track v) {
            <ui-spinner [variant]="v" size="lg" color="primary" />
          }
        </div>
      </section>

    </div>
  `,
})
class SpinnerVariantsComponent {
  sizes = SIZES;
  colors = COLORS;
  variants = VARIANTS;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiSpinnerComponent> = {
  title: 'Components/Spinner',
  component: UiSpinnerComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['circular', 'dots'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info', 'muted'],
    },
    label: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<UiSpinnerComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [SpinnerDocsComponent] }),
  ],
  render: () => ({
    template: `<story-spinner-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    variant: 'circular',
    size: 'md',
    color: 'primary',
    label: 'Loading...',
  },
  render: (args) => ({
    props: args,
    template: `<ui-spinner ${argsToTemplate(args)} />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [SpinnerVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-spinner-variants />`,
  }),
};
