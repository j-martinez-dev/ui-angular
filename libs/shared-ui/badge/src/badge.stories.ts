import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroCheck,
  heroExclamationTriangle,
  heroInformationCircle,
  heroStar,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import {
  UiBadgeComponent,
  BadgeVariant,
  BadgeColor,
  BadgeSize,
  BadgeShape,
} from './badge.component';

const icons = {
  heroCheck,
  heroExclamationTriangle,
  heroInformationCircle,
  heroStar,
  heroXMark,
};

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-badge-docs',
  imports: [UiBadgeComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Badge</h2>
        <p class="ui-body-md ui-text-muted">
          A small label used for status indicators, counts, or categories.
          Available in filled, subtle, and outline variants with semantic colors.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex items-center gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-badge variant="filled" color="primary">New</ui-badge>
          <ui-badge variant="subtle" color="success">Active</ui-badge>
          <ui-badge variant="outline" color="error">Critical</ui-badge>
          <code class="ui-code">&lt;ui-badge variant="filled" color="primary"&gt;New&lt;/ui-badge&gt;</code>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Inputs</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <th class="ui-body-sm" style="text-align: left; padding: 0.5rem;">Input</th>
              <th class="ui-body-sm" style="text-align: left; padding: 0.5rem;">Type</th>
              <th class="ui-body-sm" style="text-align: left; padding: 0.5rem;">Default</th>
              <th class="ui-body-sm" style="text-align: left; padding: 0.5rem;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">variant</td>
              <td class="ui-code" style="padding: 0.5rem;">filled | subtle | outline</td>
              <td class="ui-code" style="padding: 0.5rem;">filled</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Visual style of the badge</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">color</td>
              <td class="ui-code" style="padding: 0.5rem;">primary | success | warning | error | info | muted</td>
              <td class="ui-code" style="padding: 0.5rem;">primary</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Semantic color token</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">size</td>
              <td class="ui-code" style="padding: 0.5rem;">sm | md | lg</td>
              <td class="ui-code" style="padding: 0.5rem;">md</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Badge size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">shape</td>
              <td class="ui-code" style="padding: 0.5rem;">rounded | pill</td>
              <td class="ui-code" style="padding: 0.5rem;">rounded</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Border radius shape</td>
            </tr>
            <tr>
              <td class="ui-code" style="padding: 0.5rem;">icon</td>
              <td class="ui-code" style="padding: 0.5rem;">string</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">undefined</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Optional icon name rendered to the left</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class BadgeDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: BadgeVariant[] = ['filled', 'subtle', 'outline'];
const COLORS: BadgeColor[] = ['primary', 'success', 'warning', 'error', 'info', 'muted'];
const SIZES: BadgeSize[] = ['sm', 'md', 'lg'];
const SHAPES: BadgeShape[] = ['rounded', 'pill'];

@Component({
  selector: 'story-badge-variants',
  imports: [UiBadgeComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      @for (variant of variants; track variant) {
        <section class="flex flex-col gap-4">
          <p class="ui-overline">{{ variant }}</p>
          <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
            @for (color of colors; track color) {
              <ui-badge [variant]="variant" [color]="color">{{ color }}</ui-badge>
            }
          </div>
        </section>
      }

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <ui-badge variant="filled" color="primary" [size]="size">{{ size }}</ui-badge>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Shapes</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (shape of shapes; track shape) {
            <ui-badge variant="filled" color="primary" [shape]="shape">{{ shape }}</ui-badge>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With icon</p>
        <div class="flex flex-wrap items-center gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-badge variant="filled" color="success" icon="heroCheck">Approved</ui-badge>
          <ui-badge variant="subtle" color="warning" icon="heroExclamationTriangle">Warning</ui-badge>
          <ui-badge variant="outline" color="error" icon="heroXMark">Rejected</ui-badge>
          <ui-badge variant="filled" color="info" icon="heroInformationCircle" shape="pill">Info</ui-badge>
        </div>
      </section>

    </div>
  `,
})
class BadgeVariantsComponent {
  variants = VARIANTS;
  colors = COLORS;
  sizes = SIZES;
  shapes = SHAPES;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiBadgeComponent> = {
  title: 'Components/Badge',
  component: UiBadgeComponent,
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
    shape: {
      control: 'select',
      options: ['rounded', 'pill'],
    },
    icon: {
      control: 'select',
      options: [undefined, ...Object.keys(icons)],
    },
  },
};

export default meta;
type Story = StoryObj<UiBadgeComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [BadgeDocsComponent] }),
  ],
  render: () => ({
    template: `<story-badge-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    variant: 'filled',
    color: 'primary',
    size: 'md',
    shape: 'rounded',
    icon: undefined,
  },
  render: (args) => ({
    props: args,
    template: `<ui-badge ${argsToTemplate(args)}>Badge</ui-badge>`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [BadgeVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-badge-variants />`,
  }),
};
