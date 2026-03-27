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
              <th class="ui-body-sm" style="text-align: left; padding: 0.5rem;">Input</th>
              <th class="ui-body-sm" style="text-align: left; padding: 0.5rem;">Type</th>
              <th class="ui-body-sm" style="text-align: left; padding: 0.5rem;">Default</th>
              <th class="ui-body-sm" style="text-align: left; padding: 0.5rem;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">variant</td>
              <td class="ui-code" style="padding: 0.5rem;">circular | dots</td>
              <td class="ui-code" style="padding: 0.5rem;">circular</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Visual style of the spinner</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">size</td>
              <td class="ui-code" style="padding: 0.5rem;">xs | sm | md | lg | xl</td>
              <td class="ui-code" style="padding: 0.5rem;">md</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Spinner size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">color</td>
              <td class="ui-code" style="padding: 0.5rem;">primary | success | warning | error | info | muted</td>
              <td class="ui-code" style="padding: 0.5rem;">primary</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Semantic color token</td>
            </tr>
            <tr>
              <td class="ui-code" style="padding: 0.5rem;">label</td>
              <td class="ui-code" style="padding: 0.5rem;">string</td>
              <td class="ui-code" style="padding: 0.5rem;">Chargement...</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Accessible label (aria-label)</td>
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
    label: 'Chargement...',
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
