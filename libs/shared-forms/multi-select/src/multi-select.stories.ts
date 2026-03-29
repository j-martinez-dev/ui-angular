import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { heroChevronDown, heroMagnifyingGlass, heroXMark, heroCheck, heroMinus } from '@ng-icons/heroicons/outline';
import {
  UiMultiSelectComponent,
  MultiSelectVariant,
  MultiSelectSize,
} from './multi-select.component';
import { SelectOption } from '@ui/shared-forms/select';

const icons = { heroChevronDown, heroMagnifyingGlass, heroXMark, heroCheck, heroMinus };

const LONG_LABELS: SelectOption<string>[] = [
  { label: 'Short', value: 'short' },
  { label: 'This option has a very long label that will overflow', value: 'medium' },
  { label: 'An extremely verbose option label designed to test truncation with ellipsis and conditional tooltip behavior in the multi-select dropdown', value: 'long' },
  { label: 'Another long description to verify everything works', value: 'another' },
];

const COUNTRIES: SelectOption<string>[] = [
  { label: 'Argentina', value: 'ar' },
  { label: 'Brazil', value: 'br' },
  { label: 'Chile', value: 'cl' },
  { label: 'Colombia', value: 'co' },
  { label: 'Mexico', value: 'mx' },
  { label: 'Peru', value: 'pe' },
  { label: 'Uruguay', value: 'uy' },
  { label: 'Venezuela', value: 've', disabled: true },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-multi-select-docs',
  imports: [UiMultiSelectComponent, JsonPipe],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Multi Select</h2>
        <p class="ui-body-md ui-text-muted">
          A dropdown that allows selecting multiple options with checkboxes.
          Supports search, counter display, and integrates with Angular Signal Forms.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-multi-select [options]="countries" placeholder="Select countries" [(value)]="selected" />
          <p class="ui-caption ui-text-muted">Selected: {{ selected() | json }}</p>
          <code class="ui-code">&lt;ui-multi-select [options]="countries" [(value)]="selected" /&gt;</code>
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
              <td class="ui-code p-2">SelectOption&lt;T&gt;[]</td>
              <td class="ui-code p-2">[]</td>
              <td class="ui-body-sm p-2">List of available options</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">placeholder</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">Select options</td>
              <td class="ui-body-sm p-2">Placeholder text</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">variant</td>
              <td class="ui-code p-2">outlined | filled | ghost</td>
              <td class="ui-code p-2">outlined</td>
              <td class="ui-body-sm p-2">Visual style</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Component size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">searchable</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows search input in dropdown</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">maxLabels</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">1</td>
              <td class="ui-body-sm p-2">Labels shown before switching to counter</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the component</td>
            </tr>
            <tr>
              <td class="ui-code p-2">invalid</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows invalid/error border</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class MultiSelectDocsComponent {
  countries = COUNTRIES;
  selected = signal<string[]>(['ar', 'br']);
}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: MultiSelectVariant[] = ['outlined', 'filled', 'ghost'];
const SIZES: MultiSelectSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-multi-select-variants',
  imports: [UiMultiSelectComponent, JsonPipe],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variants</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          @for (variant of variants; track variant) {
            <ui-multi-select [options]="countries" [variant]="variant" [placeholder]="variant + ' variant'" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          @for (size of sizes; track size) {
            <ui-multi-select [options]="countries" [size]="size" [placeholder]="size + ' size'" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Searchable</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-multi-select [options]="countries" [searchable]="true" placeholder="Search countries..." />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Pre-selected + counter</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-multi-select [options]="countries" [(value)]="preselected" [maxLabels]="1" />
          <p class="ui-caption ui-text-muted">Selected: {{ preselected() | json }}</p>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Long labels (truncated)</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          <ui-multi-select [options]="longLabels" placeholder="Pick options" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">States</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-multi-select [options]="countries" [disabled]="true" placeholder="Disabled" />
          <ui-multi-select [options]="countries" [invalid]="true" placeholder="Invalid" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-multi-select [options]="countries" placeholder="Select countries" />
          <ui-multi-select [options]="countries" variant="filled" placeholder="Filled" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-multi-select [options]="countries" placeholder="Select countries" />
          <ui-multi-select [options]="countries" variant="filled" placeholder="Filled" />
        </div>
      </section>

    </div>
  `,
})
class MultiSelectVariantsComponent {
  countries = COUNTRIES;
  longLabels = LONG_LABELS;
  variants = VARIANTS;
  sizes = SIZES;
  preselected = signal<string[]>(['ar', 'br', 'cl']);
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiMultiSelectComponent<string>> = {
  title: 'Components/MultiSelect',
  component: UiMultiSelectComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    placeholder: { control: 'text' },
    searchable: { control: 'boolean' },
    maxLabels: { control: 'number' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiMultiSelectComponent<string>>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [MultiSelectDocsComponent] }),
  ],
  render: () => ({
    template: `<story-multi-select-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    placeholder: 'Select countries...',
    searchable: false,
    maxLabels: 1,
    disabled: false,
    invalid: false,
  },
  render: (args) => ({
    props: { ...args, options: COUNTRIES },
    template: `<div class="max-w-sm"><ui-multi-select [options]="options" ${argsToTemplate(args)} /></div>`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [MultiSelectVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-multi-select-variants />`,
  }),
};
