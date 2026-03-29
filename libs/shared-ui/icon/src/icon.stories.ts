import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroArrowRight,
  heroCheck,
  heroExclamationTriangle,
  heroHeart,
  heroInformationCircle,
  heroStar,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { UiIconComponent, IconSize, IconColor } from './icon.component';

const icons = {
  heroArrowRight,
  heroCheck,
  heroExclamationTriangle,
  heroHeart,
  heroInformationCircle,
  heroStar,
  heroXMark,
};

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-icon-docs',
  imports: [UiIconComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Icon</h2>
        <p class="ui-body-md ui-text-muted">
          A thin wrapper around @ng-icons that adds semantic sizing,
          design-token color mapping, and automatic accessibility attributes.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex items-center gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-icon name="heroHeart" size="lg" color="error" label="Favorite" />
          <code class="ui-code">&lt;ui-icon name="heroHeart" size="lg" color="error" label="Favorite" /&gt;</code>
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
              <td class="ui-code p-2">name</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">required</td>
              <td class="ui-body-sm p-2">Icon name from @ng-icons</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">xs | sm | md | lg | xl | 2xl</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Icon size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">color</td>
              <td class="ui-code p-2">primary | success | ... | accent-3</td>
              <td class="ui-body-sm p-2">undefined (inherits currentColor)</td>
              <td class="ui-body-sm p-2">Semantic color token</td>
            </tr>
            <tr>
              <td class="ui-code p-2">label</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Accessible label (decorative if absent)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class IconDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const COLORS: IconColor[] = ['default', 'primary', 'success', 'warning', 'error', 'info', 'muted', 'disabled'];

@Component({
  selector: 'story-icon-variants',
  imports: [UiIconComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex items-end gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <div class="flex flex-col items-center gap-2">
              <ui-icon name="heroStar" [size]="size" color="primary" />
              <span class="ui-caption">{{ size }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Colors</p>
        <div class="flex items-center gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (color of colors; track color) {
            <div class="flex flex-col items-center gap-2">
              <ui-icon name="heroHeart" size="lg" [color]="color" />
              <span class="ui-caption">{{ color }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Inherits currentColor</p>
        <div class="flex items-center gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); color: var(--color-error-default);">
          <ui-icon name="heroXMark" size="lg" />
          <span class="ui-body-sm">Parent color is error — icon inherits it</span>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Different icons</p>
        <div class="flex items-center gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-icon name="heroArrowRight" size="lg" color="primary" />
          <ui-icon name="heroCheck" size="lg" color="success" />
          <ui-icon name="heroExclamationTriangle" size="lg" color="warning" />
          <ui-icon name="heroXMark" size="lg" color="error" />
          <ui-icon name="heroInformationCircle" size="lg" color="info" />
        </div>
      </section>

    </div>
  `,
})
class IconVariantsComponent {
  sizes = SIZES;
  colors = COLORS;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiIconComponent> = {
  title: 'Shared UI/Icon',
  component: UiIconComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(icons),
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    color: {
      control: 'select',
      options: [
        undefined,
        'default',
        'primary',
        'success',
        'warning',
        'error',
        'info',
        'muted',
        'disabled',
        'accent-1',
        'accent-2',
        'accent-3',
      ],
    },
    label: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<UiIconComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [IconDocsComponent] }),
  ],
  render: () => ({
    template: `<story-icon-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    name: 'heroHeart',
    size: 'md',
    color: 'primary',
    label: '',
  },
  render: (args) => ({
    props: args,
    template: `<ui-icon ${argsToTemplate(args)} />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [IconVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-icon-variants />`,
  }),
};
