import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import {
  UiTextareaComponent,
  TextareaVariant,
  TextareaSize,
} from './textarea.component';

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-textarea-docs',
  imports: [UiTextareaComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Textarea</h2>
        <p class="ui-body-md ui-text-muted">
          A multi-line text input that integrates with Angular Signal Forms.
          Supports outlined, filled, and ghost variants, auto-resize, and all standard form states.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-textarea placeholder="Write something..." />
          <ui-textarea variant="filled" placeholder="Filled variant" />
          <ui-textarea [autoResize]="true" placeholder="Auto-resize — type to grow" />
          <code class="ui-code">&lt;ui-textarea placeholder="Write something..." /&gt;</code>
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
              <td class="ui-code p-2">variant</td>
              <td class="ui-code p-2">outlined | filled | ghost</td>
              <td class="ui-code p-2">outlined</td>
              <td class="ui-body-sm p-2">Visual style</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Textarea size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">placeholder</td>
              <td class="ui-body-sm p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Placeholder text</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">rows</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">3</td>
              <td class="ui-body-sm p-2">Initial visible rows</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">autoResize</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Textarea grows with content</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the textarea</td>
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
class TextareaDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: TextareaVariant[] = ['outlined', 'filled', 'ghost'];
const SIZES: TextareaSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-textarea-variants',
  imports: [UiTextareaComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variants</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          @for (variant of variants; track variant) {
            <ui-textarea [variant]="variant" [placeholder]="variant + ' variant'" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          @for (size of sizes; track size) {
            <ui-textarea [size]="size" [placeholder]="size + ' size'" [rows]="2" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Auto-resize</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-textarea [autoResize]="true" placeholder="Type to grow..." [rows]="1" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">States</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-textarea placeholder="Disabled" [disabled]="true" />
          <ui-textarea placeholder="Readonly" [readonly]="true" [(value)]="readonlyValue" />
          <ui-textarea placeholder="Invalid" [invalid]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-textarea placeholder="Outlined" />
          <ui-textarea variant="filled" placeholder="Filled" />
          <ui-textarea variant="ghost" placeholder="Ghost" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-textarea placeholder="Outlined" />
          <ui-textarea variant="filled" placeholder="Filled" />
          <ui-textarea variant="ghost" placeholder="Ghost" />
        </div>
      </section>

    </div>
  `,
})
class TextareaVariantsComponent {
  variants = VARIANTS;
  sizes = SIZES;
  readonlyValue = signal('This content is read-only');
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiTextareaComponent> = {
  title: 'Components/Textarea',
  component: UiTextareaComponent,
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
    rows: { control: 'number' },
    autoResize: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiTextareaComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [TextareaDocsComponent] }),
  ],
  render: () => ({
    template: `<story-textarea-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    placeholder: 'Type something...',
    rows: 3,
    autoResize: false,
    disabled: false,
    readonly: false,
    invalid: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-sm"><ui-textarea ${argsToTemplate(args)} /></div>`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [TextareaVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-textarea-variants />`,
  }),
};
