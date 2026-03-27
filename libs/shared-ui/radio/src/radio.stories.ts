import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { UiRadioComponent, RadioSize } from './radio.component';

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-radio-docs',
  imports: [UiRadioComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Radio</h2>
        <p class="ui-body-md ui-text-muted">
          A single boolean radio control for use within radio groups.
          Integrates with Angular Signal Forms via the FormCheckboxControl interface.
          Grouping and mutual exclusion are handled at the form schema level.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-radio label="Option A" [checked]="true" />
          <ui-radio label="Option B" />
          <code class="ui-code">&lt;ui-radio label="Option A" [checked]="true" /&gt;</code>
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
              <td class="ui-code p-2">checked</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Two-way bound checked state (model signal)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">label</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Label text displayed next to the radio</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Radio and label size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the radio</td>
            </tr>
            <tr>
              <td class="ui-code p-2">invalid</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows error border (managed by form field)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class RadioDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const SIZES: RadioSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-radio-variants',
  imports: [UiRadioComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">States</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-radio label="Unchecked" />
          <ui-radio label="Checked" [checked]="true" />
          <ui-radio label="Disabled unchecked" [disabled]="true" />
          <ui-radio label="Disabled checked" [checked]="true" [disabled]="true" />
          <ui-radio label="Invalid" [invalid]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <ui-radio [label]="'Size: ' + size" [size]="size" [checked]="true" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Without label</p>
        <div class="flex items-center gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-radio />
          <ui-radio [checked]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Interactive group</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-radio label="Small" [(checked)]="optSmall" (checkedChange)="select('small')" />
          <ui-radio label="Medium" [(checked)]="optMedium" (checkedChange)="select('medium')" />
          <ui-radio label="Large" [(checked)]="optLarge" (checkedChange)="select('large')" />
          <p class="ui-caption ui-text-muted">
            Selected: {{ selected() }}
          </p>
        </div>
      </section>

    </div>
  `,
})
class RadioVariantsComponent {
  sizes = SIZES;
  optSmall = signal(false);
  optMedium = signal(true);
  optLarge = signal(false);
  selected = signal('medium');

  select(value: string): void {
    this.optSmall.set(value === 'small');
    this.optMedium.set(value === 'medium');
    this.optLarge.set(value === 'large');
    this.selected.set(value);
  }
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiRadioComponent> = {
  title: 'Components/Radio',
  component: UiRadioComponent,
  argTypes: {
    checked: {
      control: 'boolean',
    },
    label: {
      control: 'text',
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
type Story = StoryObj<UiRadioComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [RadioDocsComponent] }),
  ],
  render: () => ({
    template: `<story-radio-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    checked: false,
    label: 'Radio option',
    size: 'md',
    disabled: false,
    invalid: false,
  },
  render: (args) => ({
    props: args,
    template: `<ui-radio ${argsToTemplate(args)} />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [RadioVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-radio-variants />`,
  }),
};
