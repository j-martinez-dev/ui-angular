import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { UiSliderComponent, SliderSize } from './slider.component';

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-slider-docs',
  imports: [UiSliderComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Slider</h2>
        <p class="ui-body-md ui-text-muted">
          A range input for selecting numeric values within a min/max range.
          Integrates with Angular Signal Forms via the FormValueControl interface.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-slider [value]="50" />
          <code class="ui-code">&lt;ui-slider [value]="50" /&gt;</code>
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
              <td class="ui-body-sm p-2">Two-way bound numeric value (model signal)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">min</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">0</td>
              <td class="ui-body-sm p-2">Minimum value</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">max</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">100</td>
              <td class="ui-body-sm p-2">Maximum value</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">step</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">1</td>
              <td class="ui-body-sm p-2">Step increment</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Slider size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the slider</td>
            </tr>
            <tr>
              <td class="ui-code p-2">invalid</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows error color (managed by form field)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class SliderDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const SIZES: SliderSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-slider-variants',
  imports: [UiSliderComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">States</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <div class="flex flex-col gap-1">
            <span class="ui-caption ui-text-muted">Default (50%)</span>
            <ui-slider [value]="50" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="ui-caption ui-text-muted">Empty (0%)</span>
            <ui-slider [value]="0" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="ui-caption ui-text-muted">Full (100%)</span>
            <ui-slider [value]="100" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="ui-caption ui-text-muted">Disabled</span>
            <ui-slider [value]="40" [disabled]="true" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="ui-caption ui-text-muted">Invalid</span>
            <ui-slider [value]="30" [invalid]="true" />
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <div class="flex flex-col gap-1">
              <span class="ui-caption ui-text-muted">{{ size }}</span>
              <ui-slider [value]="60" [size]="size" />
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Custom range & step</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <div class="flex flex-col gap-1">
            <span class="ui-caption ui-text-muted">Range 0–10, step 1</span>
            <ui-slider [value]="5" [min]="0" [max]="10" [step]="1" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="ui-caption ui-text-muted">Range 0–1, step 0.1</span>
            <ui-slider [(value)]="rangeValue" [min]="0" [max]="1" [step]="0.1" />
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Interactive</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-slider [(value)]="volume" />
          <p class="ui-caption ui-text-muted">
            Volume: {{ volume() }}%
          </p>
        </div>
      </section>

    </div>
  `,
})
class SliderVariantsComponent {
  sizes = SIZES;
  rangeValue = signal(0.5);
  volume = signal(75);
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiSliderComponent> = {
  title: 'Components/Slider',
  component: UiSliderComponent,
  argTypes: {
    value: {
      control: 'number',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<UiSliderComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [SliderDocsComponent] }),
  ],
  render: () => ({
    template: `<story-slider-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    disabled: false,
    invalid: false,
  },
  render: (args) => ({
    props: args,
    template: `<ui-slider ${argsToTemplate(args)} />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [SliderVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-slider-variants />`,
  }),
};
