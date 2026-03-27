import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroTrash,
  heroPencil,
  heroPlus,
  heroCog6Tooth,
  heroHeart,
  heroArrowPath,
} from '@ng-icons/heroicons/outline';
import {
  UiIconButtonComponent,
  IconButtonVariant,
  IconButtonSize,
  IconButtonShape,
} from './icon-button.component';

const icons = {
  heroTrash,
  heroPencil,
  heroPlus,
  heroCog6Tooth,
  heroHeart,
  heroArrowPath,
};

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-icon-button-docs',
  imports: [UiIconButtonComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Icon Button</h2>
        <p class="ui-body-md ui-text-muted">
          A compact button that displays only an icon with an accessible label
          exposed via aria-label and a tooltip. Ideal for toolbars, action rows, and inline controls.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex items-center gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-icon-button icon="heroPencil" label="Edit" variant="ghost" />
          <ui-icon-button icon="heroTrash" label="Delete" variant="danger" />
          <ui-icon-button icon="heroPlus" label="Add" variant="primary" shape="circle" />
          <code class="ui-code">&lt;ui-icon-button icon="heroPencil" label="Edit" /&gt;</code>
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
              <td class="ui-code p-2">icon</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">required</td>
              <td class="ui-body-sm p-2">Heroicon name</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">label</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">required</td>
              <td class="ui-body-sm p-2">Accessible label and tooltip text</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">variant</td>
              <td class="ui-code p-2">primary | secondary | ghost | danger | accent-*</td>
              <td class="ui-code p-2">ghost</td>
              <td class="ui-body-sm p-2">Visual style</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Button size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">shape</td>
              <td class="ui-code p-2">square | circle</td>
              <td class="ui-code p-2">square</td>
              <td class="ui-body-sm p-2">Border radius shape</td>
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
            <tr>
              <td class="ui-code p-2">tooltipPosition</td>
              <td class="ui-code p-2">top | bottom | left | right</td>
              <td class="ui-code p-2">top</td>
              <td class="ui-body-sm p-2">Tooltip position</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class IconButtonDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: IconButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const SIZES: IconButtonSize[] = ['sm', 'md', 'lg'];
const SHAPES: IconButtonShape[] = ['square', 'circle'];

@Component({
  selector: 'story-icon-button-variants',
  imports: [UiIconButtonComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variants</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <ui-icon-button icon="heroHeart" [label]="variant" [variant]="variant" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <ui-icon-button icon="heroCog6Tooth" [label]="size" variant="primary" [size]="size" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Shapes</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (shape of shapes; track shape) {
            <ui-icon-button icon="heroPlus" [label]="shape" variant="primary" [shape]="shape" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Loading</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <ui-icon-button icon="heroArrowPath" [label]="variant" [variant]="variant" [loading]="true" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Disabled</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <ui-icon-button icon="heroHeart" [label]="variant" [variant]="variant" [disabled]="true" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <ui-icon-button icon="heroHeart" [label]="variant" [variant]="variant" />
          }
          <ui-icon-button icon="heroPlus" label="Add" variant="primary" shape="circle" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <ui-icon-button icon="heroHeart" [label]="variant" [variant]="variant" />
          }
          <ui-icon-button icon="heroPlus" label="Add" variant="primary" shape="circle" />
        </div>
      </section>

    </div>
  `,
})
class IconButtonVariantsComponent {
  variants = VARIANTS;
  sizes = SIZES;
  shapes = SHAPES;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiIconButtonComponent> = {
  title: 'Components/IconButton',
  component: UiIconButtonComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(icons),
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'accent-1', 'accent-2', 'accent-3'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['square', 'circle'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    tooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<UiIconButtonComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [IconButtonDocsComponent] }),
  ],
  render: () => ({
    template: `<story-icon-button-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    icon: 'heroPencil',
    label: 'Edit',
    variant: 'ghost',
    size: 'md',
    shape: 'square',
    type: 'button',
    disabled: false,
    loading: false,
    tooltipPosition: 'top',
  },
  render: (args) => ({
    props: args,
    template: `<ui-icon-button ${argsToTemplate(args)} />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [IconButtonVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-icon-button-variants />`,
  }),
};
