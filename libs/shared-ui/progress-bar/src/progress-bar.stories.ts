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
  standalone: true,
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
              <th class="ui-body-sm" style="text-align: left; padding: 0.5rem;">Input</th>
              <th class="ui-body-sm" style="text-align: left; padding: 0.5rem;">Type</th>
              <th class="ui-body-sm" style="text-align: left; padding: 0.5rem;">Default</th>
              <th class="ui-body-sm" style="text-align: left; padding: 0.5rem;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">value</td>
              <td class="ui-code" style="padding: 0.5rem;">number</td>
              <td class="ui-code" style="padding: 0.5rem;">0</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Progress value (0–100), clamped automatically</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">variant</td>
              <td class="ui-code" style="padding: 0.5rem;">default | striped</td>
              <td class="ui-code" style="padding: 0.5rem;">default</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Visual style of the bar</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">color</td>
              <td class="ui-code" style="padding: 0.5rem;">primary | success | warning | error | info | muted</td>
              <td class="ui-code" style="padding: 0.5rem;">primary</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Semantic color token</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">size</td>
              <td class="ui-code" style="padding: 0.5rem;">sm | md | lg</td>
              <td class="ui-code" style="padding: 0.5rem;">md</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Bar height</td>
            </tr>
            <tr>
              <td class="ui-code" style="padding: 0.5rem;">indeterminate</td>
              <td class="ui-code" style="padding: 0.5rem;">boolean</td>
              <td class="ui-code" style="padding: 0.5rem;">false</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Continuous animation regardless of value</td>
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
  standalone: true,
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
