import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroCheck, heroMinus } from '@ng-icons/heroicons/outline';
import { UiCheckboxComponent, CheckboxSize } from './checkbox.component';

const icons = { heroCheck, heroMinus };

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-checkbox-docs',
  imports: [UiCheckboxComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Checkbox</h2>
        <p class="ui-body-md ui-text-muted">
          A boolean toggle control that supports checked, unchecked, and indeterminate states.
          Integrates with Angular Signal Forms via the FormCheckboxControl interface.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-checkbox label="Accept terms and conditions" />
          <code class="ui-code">&lt;ui-checkbox label="Accept terms and conditions" /&gt;</code>
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
              <td class="ui-body-sm p-2">Label text displayed next to the checkbox</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">indeterminate</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows dash icon regardless of checked value</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Checkbox and label size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the checkbox</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">invalid</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows error border (managed by form field)</td>
            </tr>
            <tr>
              <td class="ui-code p-2">required</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Marks as required (aria-required)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class CheckboxDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const SIZES: CheckboxSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-checkbox-variants',
  imports: [UiCheckboxComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">States</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-checkbox label="Unchecked" />
          <ui-checkbox label="Checked" [checked]="true" />
          <ui-checkbox label="Indeterminate" [indeterminate]="true" />
          <ui-checkbox label="Disabled unchecked" [disabled]="true" />
          <ui-checkbox label="Disabled checked" [checked]="true" [disabled]="true" />
          <ui-checkbox label="Invalid" [invalid]="true" />
          <ui-checkbox label="Invalid checked" [checked]="true" [invalid]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <ui-checkbox [label]="'Size: ' + size" [size]="size" [checked]="true" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Without label</p>
        <div class="flex items-center gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-checkbox />
          <ui-checkbox [checked]="true" />
          <ui-checkbox [indeterminate]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Interactive group</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-checkbox label="Option A" [(checked)]="optionA" />
          <ui-checkbox label="Option B" [(checked)]="optionB" />
          <ui-checkbox label="Option C" [(checked)]="optionC" />
          <p class="ui-caption ui-text-muted">
            Selected: {{ selectedOptions() }}
          </p>
        </div>
      </section>

    </div>
  `,
})
class CheckboxVariantsComponent {
  sizes = SIZES;
  optionA = signal(true);
  optionB = signal(false);
  optionC = signal(true);

  selectedOptions() {
    const opts: string[] = [];
    if (this.optionA()) opts.push('A');
    if (this.optionB()) opts.push('B');
    if (this.optionC()) opts.push('C');
    return opts.length ? opts.join(', ') : 'none';
  }
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiCheckboxComponent> = {
  title: 'Shared Forms/Checkbox',
  component: UiCheckboxComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    indeterminate: {
      control: 'boolean',
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
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<UiCheckboxComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [CheckboxDocsComponent] }),
  ],
  render: () => ({
    template: `<story-checkbox-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    checked: false,
    label: 'Accept terms',
    indeterminate: false,
    size: 'md',
    disabled: false,
    invalid: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<ui-checkbox ${argsToTemplate(args)} />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [CheckboxVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-checkbox-variants />`,
  }),
};
