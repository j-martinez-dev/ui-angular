import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import {
  UiTagComponent,
  TagVariant,
  TagColor,
  TagSize,
} from './tag.component';

const icons = { heroXMark };

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-tag-docs',
  imports: [UiTagComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Tag</h2>
        <p class="ui-body-md ui-text-muted">
          A compact label for categorization, filtering, or selection.
          Supports filled, subtle, and outline variants with semantic colors.
          Can be clickable and/or removable.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-tag variant="subtle" color="primary">Angular</ui-tag>
          <ui-tag variant="filled" color="success">Active</ui-tag>
          <ui-tag variant="outline" color="error">Deprecated</ui-tag>
          <ui-tag variant="subtle" color="info" [removable]="true">Removable</ui-tag>
        </div>
        <code class="ui-code">&lt;ui-tag variant="subtle" color="primary"&gt;Angular&lt;/ui-tag&gt;</code>
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
              <td class="ui-code p-2">filled | subtle | outline</td>
              <td class="ui-code p-2">subtle</td>
              <td class="ui-body-sm p-2">Visual style</td>
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
              <td class="ui-body-sm p-2">Tag size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">removable</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows remove button</td>
            </tr>
            <tr>
              <td class="ui-code p-2">clickable</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Makes tag interactive</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class TagDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: TagVariant[] = ['filled', 'subtle', 'outline'];
const COLORS: TagColor[] = ['primary', 'success', 'warning', 'error', 'info', 'muted'];
const SIZES: TagSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-tag-variants',
  imports: [UiTagComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      @for (variant of variants; track variant) {
        <section class="flex flex-col gap-4">
          <p class="ui-overline">{{ variant }}</p>
          <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
            @for (color of colors; track color) {
              <ui-tag [variant]="variant" [color]="color">{{ color }}</ui-tag>
            }
          </div>
        </section>
      }

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <ui-tag variant="subtle" color="primary" [size]="size">{{ size }}</ui-tag>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Removable</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (color of colors; track color) {
            <ui-tag variant="subtle" [color]="color" [removable]="true">{{ color }}</ui-tag>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Clickable</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-tag variant="subtle" color="primary" [clickable]="true">Click me</ui-tag>
          <ui-tag variant="filled" color="success" [clickable]="true">Clickable</ui-tag>
          <ui-tag variant="outline" color="error" [clickable]="true">Interactive</ui-tag>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Clickable + Removable</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-tag variant="subtle" color="primary" [clickable]="true" [removable]="true">Angular</ui-tag>
          <ui-tag variant="subtle" color="success" [clickable]="true" [removable]="true">TypeScript</ui-tag>
          <ui-tag variant="subtle" color="info" [clickable]="true" [removable]="true">Tailwind</ui-tag>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-base); border-radius: var(--radius-md);">
          @for (color of colors; track color) {
            <ui-tag variant="subtle" [color]="color">{{ color }}</ui-tag>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-base); border-radius: var(--radius-md);">
          @for (color of colors; track color) {
            <ui-tag variant="subtle" [color]="color">{{ color }}</ui-tag>
          }
        </div>
      </section>

    </div>
  `,
})
class TagVariantsComponent {
  variants = VARIANTS;
  colors = COLORS;
  sizes = SIZES;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiTagComponent> = {
  title: 'Components/Tag',
  component: UiTagComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'subtle', 'outline'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info', 'muted'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    removable: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiTagComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [TagDocsComponent] }),
  ],
  render: () => ({
    template: `<story-tag-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    variant: 'subtle',
    color: 'primary',
    size: 'md',
    removable: false,
    clickable: false,
  },
  render: (args) => ({
    props: args,
    template: `<ui-tag ${argsToTemplate(args)}>Tag</ui-tag>`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [TagVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-tag-variants />`,
  }),
};
