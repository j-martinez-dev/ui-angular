import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroUser } from '@ng-icons/heroicons/outline';
import {
  UiAvatarComponent,
  AvatarVariant,
  AvatarColor,
  AvatarSize,
  AvatarShape,
} from './avatar.component';

const icons = { heroUser };

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-avatar-docs',
  imports: [UiAvatarComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Avatar</h2>
        <p class="ui-body-md ui-text-muted">
          Displays user initials or a fallback icon inside a colored shape.
          Useful for user lists, comments, navigation bars, and profile sections.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex items-center gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-avatar initials="JD" size="lg" color="primary" />
          <ui-avatar size="lg" color="muted" />
          <ui-avatar initials="AB" size="lg" color="success" shape="square" />
          <code class="ui-code">&lt;ui-avatar initials="JD" size="lg" color="primary" /&gt;</code>
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
              <td class="ui-code p-2">initials</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Text initials (e.g. 'JD'). Falls back to icon if absent</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">color</td>
              <td class="ui-code p-2">primary | success | warning | error | info | muted | accent-1 | accent-2 | accent-3</td>
              <td class="ui-code p-2">primary</td>
              <td class="ui-body-sm p-2">Semantic color token</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg | xl</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Avatar size</td>
            </tr>
            <tr>
              <td class="ui-code p-2">shape</td>
              <td class="ui-code p-2">circle | square</td>
              <td class="ui-code p-2">circle</td>
              <td class="ui-body-sm p-2">Border radius shape</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class AvatarDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const COLORS: AvatarColor[] = ['primary', 'success', 'warning', 'error', 'info', 'muted', 'accent-1', 'accent-2', 'accent-3'];
const SIZES: AvatarSize[] = ['sm', 'md', 'lg', 'xl'];
const SHAPES: AvatarShape[] = ['circle', 'square'];

@Component({
  selector: 'story-avatar-variants',
  imports: [UiAvatarComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Colors — with initials</p>
        <div class="flex items-center gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (color of colors; track color) {
            <div class="flex flex-col items-center gap-2">
              <ui-avatar [initials]="initialFor(color)" size="lg" [color]="color" />
              <span class="ui-caption">{{ color }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Inverted — with initials</p>
        <div class="flex items-center gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (color of colors; track color) {
            <div class="flex flex-col items-center gap-2">
              <ui-avatar [initials]="initialFor(color)" size="lg" [color]="color" variant="inverted" />
              <span class="ui-caption">{{ color }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Colors — fallback icon</p>
        <div class="flex items-center gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (color of colors; track color) {
            <div class="flex flex-col items-center gap-2">
              <ui-avatar size="lg" [color]="color" />
              <span class="ui-caption">{{ color }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex items-end gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <div class="flex flex-col items-center gap-2">
              <ui-avatar initials="JD" [size]="size" color="primary" />
              <span class="ui-caption">{{ size }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Shapes</p>
        <div class="flex items-center gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (shape of shapes; track shape) {
            <div class="flex flex-col items-center gap-2">
              <ui-avatar initials="AB" size="lg" color="info" [shape]="shape" />
              <span class="ui-caption">{{ shape }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Group</p>
        <div class="flex items-center p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <div class="flex">
            <ui-avatar initials="JD" size="lg" color="primary" style="margin-left: calc(var(--spacing) * -2); border: 2px solid var(--color-surface-raised);" />
            <ui-avatar initials="AB" size="lg" color="success" style="margin-left: calc(var(--spacing) * -2); border: 2px solid var(--color-surface-raised);" />
            <ui-avatar initials="CD" size="lg" color="warning" style="margin-left: calc(var(--spacing) * -2); border: 2px solid var(--color-surface-raised);" />
            <ui-avatar size="lg" color="muted" style="margin-left: calc(var(--spacing) * -2); border: 2px solid var(--color-surface-raised);" />
          </div>
        </div>
      </section>

    </div>
  `,
})
class AvatarVariantsComponent {
  colors = COLORS;
  sizes = SIZES;
  shapes = SHAPES;

  initialFor(color: AvatarColor): string {
    const map: Record<AvatarColor, string> = {
      primary: 'PR',
      success: 'SU',
      warning: 'WA',
      error: 'ER',
      info: 'IN',
      muted: 'MU',
      'accent-1': 'A1',
      'accent-2': 'A2',
      'accent-3': 'A3',
    };
    return map[color];
  }
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiAvatarComponent> = {
  title: 'Shared UI/Avatar',
  component: UiAvatarComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    initials: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['subtle', 'inverted'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info', 'muted', 'accent-1', 'accent-2', 'accent-3'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
  },
};

export default meta;
type Story = StoryObj<UiAvatarComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [AvatarDocsComponent] }),
  ],
  render: () => ({
    template: `<story-avatar-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    initials: 'JD',
    variant: 'subtle',
    color: 'primary',
    size: 'md',
    shape: 'circle',
  },
  render: (args) => ({
    props: args,
    template: `<ui-avatar ${argsToTemplate(args)} />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [AvatarVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-avatar-variants />`,
  }),
};
