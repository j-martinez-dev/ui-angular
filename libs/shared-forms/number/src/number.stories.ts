import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { UiNumberComponent, NumberVariant, NumberSize } from './number.component';

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-number-docs',
  imports: [UiNumberComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Number</h2>
        <p class="ui-body-md ui-text-muted">
          A numeric input component that formats values using Angular's DecimalPipe.
          Shows formatted numbers when idle and raw values when editing.
          Supports outlined, filled, and ghost variants.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-number placeholder="0" />
          <ui-number [(value)]="demoValue" format="1.2-2" placeholder="0,00" />
          <ui-number variant="filled" placeholder="0" />
          <code class="ui-code">&lt;ui-number format="1.2-2" placeholder="0,00" /&gt;</code>
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
              <td class="ui-code p-2">format</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">1.0-2</td>
              <td class="ui-body-sm p-2">DecimalPipe format string</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">locale</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">fr-FR</td>
              <td class="ui-body-sm p-2">Locale used for number formatting</td>
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
              <td class="ui-code p-2">0</td>
              <td class="ui-body-sm p-2">Placeholder text</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">min / max</td>
              <td class="ui-code p-2">number | undefined</td>
              <td class="ui-code p-2">undefined</td>
              <td class="ui-body-sm p-2">Value bounds — clamped on blur</td>
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
class NumberDocsComponent {
  demoValue = signal(1234.5);
}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: NumberVariant[] = ['outlined', 'filled', 'ghost'];
const SIZES: NumberSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-number-variants',
  imports: [UiNumberComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variants</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          @for (variant of variants; track variant) {
            <ui-number [variant]="variant" [(value)]="variantValues[variant]" placeholder="0,00" format="1.2-2" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          @for (size of sizes; track size) {
            <ui-number [size]="size" [(value)]="sizeValues[size]" placeholder="0" format="1.0-0" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Formatting</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-number [(value)]="integerValue" format="1.0-0" placeholder="0" />
          <ui-number [(value)]="currencyValue" format="1.2-2" placeholder="0,00" />
          <ui-number [(value)]="preciseValue" format="1.0-4" placeholder="0" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With min / max</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-number [(value)]="clampedValue" [min]="0" [max]="100" format="1.0-0" placeholder="0–100" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">States</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-number [(value)]="disabledValue" [disabled]="true" format="1.2-2" placeholder="0,00" />
          <ui-number [(value)]="readonlyValue" [readonly]="true" format="1.2-2" placeholder="0,00" />
          <ui-number [(value)]="invalidValue" [invalid]="true" format="1.2-2" placeholder="0,00" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-number placeholder="0,00" format="1.2-2" />
          <ui-number variant="filled" placeholder="0,00" format="1.2-2" />
          <ui-number variant="ghost" placeholder="0,00" format="1.2-2" />
          <ui-number [invalid]="true" placeholder="0,00" format="1.2-2" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-number placeholder="0,00" format="1.2-2" />
          <ui-number variant="filled" placeholder="0,00" format="1.2-2" />
          <ui-number variant="ghost" placeholder="0,00" format="1.2-2" />
          <ui-number [invalid]="true" placeholder="0,00" format="1.2-2" />
        </div>
      </section>

    </div>
  `,
})
class NumberVariantsComponent {
  variants = VARIANTS;
  sizes = SIZES;

  variantValues: Record<string, number | null> = {
    outlined: 1234.56,
    filled: 9876.54,
    ghost: 42,
  };

  sizeValues: Record<string, number | null> = {
    sm: 100,
    md: 2500,
    lg: 50000,
  };

  integerValue = signal<number | null>(42);
  currencyValue = signal<number | null>(1234.5);
  preciseValue = signal<number | null>(3.14159);
  clampedValue = signal<number | null>(50);
  disabledValue = signal<number | null>(999.99);
  readonlyValue = signal<number | null>(1500.75);
  invalidValue = signal<number | null>(0);
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiNumberComponent> = {
  title: 'Shared Forms/Number',
  component: UiNumberComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    format: { control: 'text' },
    locale: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiNumberComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [NumberDocsComponent] }),
  ],
  render: () => ({
    template: `<story-number-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    format: '1.0-2',
    locale: 'fr-FR',
    placeholder: '0',
    disabled: false,
    readonly: false,
    invalid: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-sm"><ui-number ${argsToTemplate(args)} /></div>`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [NumberVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-number-variants />`,
  }),
};
