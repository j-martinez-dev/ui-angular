import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroArrowRight,
  heroPlus,
  heroTrash,
  heroArrowPath,
  heroPencil,
} from '@ng-icons/heroicons/outline';
import {
  UiButtonComponent,
  ButtonVariant,
  ButtonSize,
} from './button.component';

const icons = {
  heroArrowRight,
  heroPlus,
  heroTrash,
  heroArrowPath,
  heroPencil,
};

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-button-docs',
  imports: [UiButtonComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Button</h2>
        <p class="ui-body-md ui-text-muted">
          A versatile button component supporting multiple variants, sizes, icons, and loading states.
          Use for primary actions, secondary options, destructive operations, and more.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex items-center gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button variant="primary">Primary</ui-button>
          <ui-button variant="secondary">Secondary</ui-button>
          <ui-button variant="ghost">Ghost</ui-button>
          <ui-button variant="danger">Danger</ui-button>
        </div>
        <code class="ui-code">&lt;ui-button variant="primary"&gt;Click me&lt;/ui-button&gt;</code>
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
              <td class="ui-code p-2">primary | secondary | ghost | danger | accent-1 | accent-2 | accent-3</td>
              <td class="ui-code p-2">primary</td>
              <td class="ui-body-sm p-2">Visual style of the button</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Button size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">type</td>
              <td class="ui-code p-2">button | submit | reset</td>
              <td class="ui-code p-2">button</td>
              <td class="ui-body-sm p-2">Native button type</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the button</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">loading</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows spinner and disables interaction</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">fullWidth</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Stretches button to 100% width</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">iconLeft</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Heroicon name rendered to the left</td>
            </tr>
            <tr>
              <td class="ui-code p-2">iconRight</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Heroicon name rendered to the right</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class ButtonDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const SIZES: ButtonSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-button-variants',
  imports: [UiButtonComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variants</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <ui-button [variant]="variant">{{ variant }}</ui-button>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <ui-button variant="primary" [size]="size">{{ size }}</ui-button>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With icons</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button variant="primary" iconLeft="heroPlus">Add item</ui-button>
          <ui-button variant="secondary" iconRight="heroArrowRight">Continue</ui-button>
          <ui-button variant="danger" iconLeft="heroTrash">Delete</ui-button>
          <ui-button variant="ghost" iconLeft="heroPencil">Edit</ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Loading</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <ui-button [variant]="variant" [loading]="true">{{ variant }}</ui-button>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Disabled</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <ui-button [variant]="variant" [disabled]="true">{{ variant }}</ui-button>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Full width</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button variant="primary" [fullWidth]="true">Full width primary</ui-button>
          <ui-button variant="secondary" [fullWidth]="true">Full width secondary</ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <ui-button [variant]="variant">{{ variant }}</ui-button>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <ui-button [variant]="variant">{{ variant }}</ui-button>
          }
        </div>
      </section>

    </div>
  `,
})
class ButtonVariantsComponent {
  variants = VARIANTS;
  sizes = SIZES;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiButtonComponent> = {
  title: 'Shared UI/Button',
  component: UiButtonComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'accent-1', 'accent-2', 'accent-3'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    iconLeft: {
      control: 'select',
      options: [undefined, ...Object.keys(icons)],
    },
    iconRight: {
      control: 'select',
      options: [undefined, ...Object.keys(icons)],
    },
  },
};

export default meta;
type Story = StoryObj<UiButtonComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [ButtonDocsComponent] }),
  ],
  render: () => ({
    template: `<story-button-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconLeft: undefined,
    iconRight: undefined,
  },
  render: (args) => ({
    props: args,
    template: `<ui-button ${argsToTemplate(args)}>Button</ui-button>`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [ButtonVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-button-variants />`,
  }),
};
