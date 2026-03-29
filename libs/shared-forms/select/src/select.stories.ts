import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroChevronDown,
  heroCheck,
  heroMagnifyingGlass,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { UiSelectComponent, type SelectVariant, type SelectSize } from './select.component';
import { type SelectOption } from './select.types';

const icons = { heroChevronDown, heroCheck, heroMagnifyingGlass, heroXMark };

const FRUITS: SelectOption<string>[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Dragonfruit', value: 'dragonfruit' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
];

const COUNTRIES: SelectOption<string>[] = [
  { label: 'Argentina', value: 'ar' },
  { label: 'Brazil', value: 'br' },
  { label: 'Canada', value: 'ca' },
  { label: 'Denmark', value: 'dk' },
  { label: 'Ecuador', value: 'ec' },
  { label: 'France', value: 'fr' },
  { label: 'Germany', value: 'de' },
  { label: 'Hungary', value: 'hu' },
  { label: 'Italy', value: 'it' },
  { label: 'Japan', value: 'jp' },
];

const LONG_LABELS: SelectOption<string>[] = [
  { label: 'A short label', value: 'short' },
  { label: 'This is a moderately long option that should still fit', value: 'medium' },
  { label: 'This option has an extremely long label that will definitely overflow the dropdown panel and needs to be truncated with an ellipsis', value: 'long' },
  { label: 'Another very verbose option to demonstrate text overflow handling in a constrained width select dropdown', value: 'verbose' },
];

const WITH_DISABLED: SelectOption<string>[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B (disabled)', value: 'b', disabled: true },
  { label: 'Option C', value: 'c' },
  { label: 'Option D (disabled)', value: 'd', disabled: true },
  { label: 'Option E', value: 'e' },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-select-docs',
  imports: [UiSelectComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Select</h2>
        <p class="ui-body-md ui-text-muted">
          A dropdown select component that integrates with Angular Signal Forms.
          Supports outlined, filled, and ghost variants, searchable filtering,
          keyboard navigation, and disabled options.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          <ui-select [options]="fruits" placeholder="Pick a fruit" />
          <code class="ui-code">&lt;ui-select [options]="fruits" placeholder="Pick a fruit" /&gt;</code>
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
              <td class="ui-code p-2">SelectOption[]</td>
              <td class="ui-code p-2">[]</td>
              <td class="ui-body-sm p-2">List of selectable options</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">placeholder</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">Select an option</td>
              <td class="ui-body-sm p-2">Text when no value is selected</td>
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
              <td class="ui-body-sm p-2">Select size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">searchable</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Enables search filtering in dropdown</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the select</td>
            </tr>
            <tr>
              <td class="ui-code p-2">invalid</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows invalid/error state</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class SelectDocsComponent {
  fruits = FRUITS;
}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: SelectVariant[] = ['outlined', 'filled', 'ghost'];
const SIZES: SelectSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-select-variants',
  imports: [UiSelectComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variants</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          @for (variant of variants; track variant) {
            <ui-select [options]="fruits" [variant]="variant" [placeholder]="variant + ' variant'" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          @for (size of sizes; track size) {
            <ui-select [options]="fruits" [size]="size" [placeholder]="size + ' size'" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Searchable</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          <ui-select [options]="countries" [searchable]="true" placeholder="Search countries..." />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Long labels (truncated)</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          <ui-select [options]="longLabels" placeholder="Pick an option" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Disabled options</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          <ui-select [options]="withDisabled" placeholder="Some options disabled" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">States</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          <ui-select [options]="fruits" placeholder="Disabled" [disabled]="true" />
          <ui-select [options]="fruits" placeholder="Invalid" [invalid]="true" />
          <ui-select [options]="fruits" placeholder="Pre-selected" [(value)]="preselected" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 320px;">
          <ui-select [options]="fruits" placeholder="Outlined" />
          <ui-select [options]="fruits" variant="filled" placeholder="Filled" />
          <ui-select [options]="fruits" variant="ghost" placeholder="Ghost" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 320px;">
          <ui-select [options]="fruits" placeholder="Outlined" />
          <ui-select [options]="fruits" variant="filled" placeholder="Filled" />
          <ui-select [options]="fruits" variant="ghost" placeholder="Ghost" />
        </div>
      </section>

    </div>
  `,
})
class SelectVariantsComponent {
  variants = VARIANTS;
  sizes = SIZES;
  fruits = FRUITS;
  countries = COUNTRIES;
  longLabels = LONG_LABELS;
  withDisabled = WITH_DISABLED;
  preselected = signal<string | null>('cherry');
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiSelectComponent> = {
  title: 'Components/Select',
  component: UiSelectComponent,
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
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiSelectComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [SelectDocsComponent] }),
  ],
  render: () => ({
    template: `<story-select-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    options: FRUITS as any,
    variant: 'outlined',
    size: 'md',
    placeholder: 'Pick a fruit',
    searchable: false,
    disabled: false,
    readonly: false,
    invalid: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-xs">
        <ui-select
          [options]="options"
          [variant]="variant"
          [size]="size"
          [placeholder]="placeholder"
          [searchable]="searchable"
          [disabled]="disabled"
          [readonly]="readonly"
          [invalid]="invalid"
          [required]="required"
        />
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [SelectVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-select-variants />`,
  }),
};
