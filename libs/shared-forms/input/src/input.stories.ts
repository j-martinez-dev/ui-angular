import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroMagnifyingGlass,
  heroEnvelope,
  heroLockClosed,
  heroXMark,
  heroCurrencyDollar,
} from '@ng-icons/heroicons/outline';
import {
  UiInputComponent,
  InputVariant,
  InputSize,
  InputType,
} from './input.component';

const icons = {
  heroMagnifyingGlass,
  heroEnvelope,
  heroLockClosed,
  heroXMark,
  heroCurrencyDollar,
};

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-input-docs',
  imports: [UiInputComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Input</h2>
        <p class="ui-body-md ui-text-muted">
          A text input component that integrates with Angular Signal Forms.
          Supports outlined, filled, and ghost variants, prefix/suffix icons or text,
          clearable state, and search-type auto-prefix.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-input placeholder="Enter your name" />
          <ui-input type="search" placeholder="Search..." />
          <ui-input variant="filled" placeholder="Filled variant" />
          <code class="ui-code">&lt;ui-input placeholder="Enter your name" /&gt;</code>
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
              <td class="ui-code p-2">type</td>
              <td class="ui-code p-2">text | password | email | number | search</td>
              <td class="ui-code p-2">text</td>
              <td class="ui-body-sm p-2">Native input type</td>
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
              <td class="ui-body-sm p-2">Input size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">placeholder</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Placeholder text</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">prefix / suffix</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Icon name or text before/after input</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">clearable</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows clear button when value is non-empty</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the input</td>
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
class InputDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: InputVariant[] = ['outlined', 'filled', 'ghost'];
const SIZES: InputSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-input-variants',
  imports: [UiInputComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variants</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          @for (variant of variants; track variant) {
            <ui-input [variant]="variant" [placeholder]="variant + ' variant'" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          @for (size of sizes; track size) {
            <ui-input [size]="size" [placeholder]="size + ' size'" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With prefix / suffix</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-input prefix="heroEnvelope" placeholder="Email address" />
          <ui-input prefix="heroLockClosed" type="password" placeholder="Password" />
          <ui-input prefix="$" [prefixIsIcon]="false" suffix=".00" [suffixIsIcon]="false" placeholder="0" />
          <ui-input suffix="heroCurrencyDollar" placeholder="Amount" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Search</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-input type="search" placeholder="Search..." [clearable]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">States</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-input placeholder="Disabled" [disabled]="true" />
          <ui-input placeholder="Readonly" [readonly]="true" [(value)]="readonlyValue" />
          <ui-input placeholder="Invalid" [invalid]="true" />
          <ui-input placeholder="Clearable with value" [clearable]="true" [(value)]="clearableValue" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-input placeholder="Outlined" />
          <ui-input variant="filled" placeholder="Filled" />
          <ui-input variant="ghost" placeholder="Ghost" />
          <ui-input placeholder="Invalid" [invalid]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-input placeholder="Outlined" />
          <ui-input variant="filled" placeholder="Filled" />
          <ui-input variant="ghost" placeholder="Ghost" />
          <ui-input placeholder="Invalid" [invalid]="true" />
        </div>
      </section>

    </div>
  `,
})
class InputVariantsComponent {
  variants = VARIANTS;
  sizes = SIZES;
  readonlyValue = signal('Read-only content');
  clearableValue = signal('Clear me');
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiInputComponent> = {
  title: 'Components/Input',
  component: UiInputComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search'],
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    placeholder: { control: 'text' },
    prefix: {
      control: 'select',
      options: [undefined, ...Object.keys(icons)],
    },
    suffix: {
      control: 'select',
      options: [undefined, ...Object.keys(icons)],
    },
    clearable: { control: 'boolean' },
    prefixIsIcon: { control: 'boolean' },
    suffixIsIcon: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiInputComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [InputDocsComponent] }),
  ],
  render: () => ({
    template: `<story-input-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    type: 'text',
    variant: 'outlined',
    size: 'md',
    placeholder: 'Type something...',
    prefix: undefined,
    suffix: undefined,
    clearable: false,
    prefixIsIcon: true,
    suffixIsIcon: true,
    disabled: false,
    readonly: false,
    invalid: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-sm"><ui-input ${argsToTemplate(args)} /></div>`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [InputVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-input-variants />`,
  }),
};
