import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import {
  UiProgressBarComponent,
  ProgressBarVariant,
  ProgressBarColor,
  ProgressBarSize,
} from './progress-bar.component';

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-progress-bar-docs',
  imports: [UiProgressBarComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Progress Bar</h2>
        <p class="ui-body-md ui-text-muted">
          A horizontal bar that indicates the completion status of a task.
          Supports determinate and indeterminate modes, with optional stripe animation.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-progress-bar [value]="65" color="primary" size="md" />
          <code class="ui-code">&lt;ui-progress-bar [value]="65" color="primary" size="md" /&gt;</code>
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
              <td class="ui-code p-2">value</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">0</td>
              <td class="ui-body-sm p-2">Progress value (0–100), clamped automatically</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">variant</td>
              <td class="ui-code p-2">default | striped</td>
              <td class="ui-code p-2">default</td>
              <td class="ui-body-sm p-2">Visual style of the bar</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">color</td>
              <td class="ui-code p-2">primary | success | warning | error | info | muted</td>
              <td class="ui-code p-2">primary</td>
              <td class="ui-body-sm p-2">Semantic color token</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Bar height</td>
            </tr>
            <tr>
              <td class="ui-code p-2">indeterminate</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Continuous animation regardless of value</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class ProgressBarDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const COLORS: ProgressBarColor[] = ['primary', 'success', 'warning', 'error', 'info', 'muted'];
const SIZES: ProgressBarSize[] = ['sm', 'md', 'lg'];
const VARIANTS: ProgressBarVariant[] = ['default', 'striped'];

@Component({
  selector: 'story-progress-bar-variants',
  imports: [UiProgressBarComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Colors — determinate (65%)</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (color of colors; track color) {
            <div class="flex flex-col gap-1">
              <span class="ui-caption">{{ color }}</span>
              <ui-progress-bar [value]="65" [color]="color" size="md" />
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <div class="flex flex-col gap-1">
              <span class="ui-caption">{{ size }}</span>
              <ui-progress-bar [value]="50" color="primary" [size]="size" />
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Striped — determinate</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (color of colors; track color) {
            <div class="flex flex-col gap-1">
              <span class="ui-caption">{{ color }}</span>
              <ui-progress-bar [value]="70" variant="striped" [color]="color" size="md" />
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Indeterminate</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <div class="flex flex-col gap-1">
              <span class="ui-caption">{{ variant }}</span>
              <ui-progress-bar [indeterminate]="true" [variant]="variant" color="primary" size="md" />
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Progress steps</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <div class="flex flex-col gap-1">
            <span class="ui-caption">0%</span>
            <ui-progress-bar [value]="0" color="error" size="md" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="ui-caption">25%</span>
            <ui-progress-bar [value]="25" color="warning" size="md" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="ui-caption">50%</span>
            <ui-progress-bar [value]="50" color="info" size="md" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="ui-caption">75%</span>
            <ui-progress-bar [value]="75" color="primary" size="md" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="ui-caption">100%</span>
            <ui-progress-bar [value]="100" color="success" size="md" />
          </div>
        </div>
      </section>

    </div>
  `,
})
class ProgressBarVariantsComponent {
  colors = COLORS;
  sizes = SIZES;
  variants = VARIANTS;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiProgressBarComponent> = {
  title: 'Components/Progress Bar',
  component: UiProgressBarComponent,
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    variant: {
      control: 'select',
      options: ['default', 'striped'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info', 'muted'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    indeterminate: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<UiProgressBarComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [ProgressBarDocsComponent] }),
  ],
  render: () => ({
    template: `<story-progress-bar-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    value: 65,
    variant: 'default',
    color: 'primary',
    size: 'md',
    indeterminate: false,
  },
  render: (args) => ({
    props: args,
    template: `<ui-progress-bar ${argsToTemplate(args)} />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [ProgressBarVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-progress-bar-variants />`,
  }),
};
