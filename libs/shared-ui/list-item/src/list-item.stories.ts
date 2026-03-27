import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroUser,
  heroEnvelope,
  heroTrash,
  heroCog6Tooth,
  heroChevronRight,
  heroStar,
} from '@ng-icons/heroicons/outline';
import { UiListItemComponent, type ListItemSize } from './list-item.component';
import { UiBadgeComponent } from '@ui/shared-ui/badge';
import { UiIconComponent } from '@ui/shared-ui/icon';

const icons = { heroUser, heroEnvelope, heroTrash, heroCog6Tooth, heroChevronRight, heroStar };

const SIZES: ListItemSize[] = ['sm', 'md', 'lg'];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-list-item-docs',
  imports: [UiListItemComponent, UiBadgeComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">List Item</h2>
        <p class="ui-body-md ui-text-muted">
          A versatile list row component with optional icon, avatar, description, and a projectable end slot.
          Supports clickable and disabled states.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 480px;">
          <ui-list-item label="John Doe" description="Admin" avatar="JD">
            <ui-badge slot="end" color="success" variant="subtle">Active</ui-badge>
          </ui-list-item>
          <ui-list-item label="Jane Smith" description="Editor" avatar="JS" avatarColor="info">
            <ui-badge slot="end" color="info" variant="subtle">Online</ui-badge>
          </ui-list-item>
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
              <td class="ui-code p-2">label</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">required</td>
              <td class="ui-body-sm p-2">Primary text</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">description</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Secondary text</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">icon</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Heroicon name (left)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">avatar</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Initials for avatar (left)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">clickable</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Makes item interactive</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables interaction</td>
            </tr>
            <tr>
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Item size</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class ListItemDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-list-item-variants',
  imports: [UiListItemComponent, UiBadgeComponent, UiIconComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With icons</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 480px;">
          <ui-list-item label="Profile" description="View your profile" icon="heroUser" [clickable]="true" />
          <ui-list-item label="Messages" description="3 unread" icon="heroEnvelope" [clickable]="true" />
          <ui-list-item label="Settings" description="Manage preferences" icon="heroCog6Tooth" [clickable]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With avatars</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 480px;">
          <ui-list-item label="Alice Johnson" description="Product Manager" avatar="AJ" avatarColor="primary">
            <ui-badge slot="end" color="success" variant="subtle">Online</ui-badge>
          </ui-list-item>
          <ui-list-item label="Bob Martinez" description="Engineer" avatar="BM" avatarColor="info">
            <ui-badge slot="end" color="muted" variant="subtle">Away</ui-badge>
          </ui-list-item>
          <ui-list-item label="Carol Zhang" description="Designer" avatar="CZ" avatarColor="warning">
            <ui-badge slot="end" color="error" variant="subtle">Busy</ui-badge>
          </ui-list-item>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With end slot content</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 480px;">
          <ui-list-item label="Favorites" icon="heroStar" [clickable]="true">
            <ui-icon slot="end" name="heroChevronRight" size="sm" color="muted" />
          </ui-list-item>
          <ui-list-item label="Delete account" description="This action is irreversible" icon="heroTrash" [clickable]="true">
            <ui-badge slot="end" color="error" variant="filled">Danger</ui-badge>
          </ui-list-item>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 480px;">
          @for (size of sizes; track size) {
            <ui-list-item [label]="size + ' size'" description="Description text" icon="heroUser" [size]="size" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Disabled</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 480px;">
          <ui-list-item label="Disabled item" description="Cannot interact" icon="heroCog6Tooth" [disabled]="true" [clickable]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 480px;">
          <ui-list-item label="Dark theme item" description="With description" icon="heroUser" [clickable]="true" />
          <ui-list-item label="Another item" avatar="DK" avatarColor="info">
            <ui-badge slot="end" color="info" variant="subtle">New</ui-badge>
          </ui-list-item>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 480px;">
          <ui-list-item label="Pastel theme item" description="Soft colors" icon="heroStar" [clickable]="true" />
          <ui-list-item label="Pastel avatar" avatar="PT" avatarColor="success">
            <ui-badge slot="end" color="success" variant="subtle">Active</ui-badge>
          </ui-list-item>
        </div>
      </section>

    </div>
  `,
})
class ListItemVariantsComponent {
  sizes = SIZES;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiListItemComponent> = {
  title: 'Components/ListItem',
  component: UiListItemComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    icon: {
      control: 'select',
      options: [undefined, ...Object.keys(icons)],
    },
    avatar: { control: 'text' },
    avatarColor: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info', 'muted'],
    },
    clickable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<UiListItemComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [ListItemDocsComponent] }),
  ],
  render: () => ({
    template: `<story-list-item-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    label: 'List item',
    description: 'A description',
    icon: 'heroUser',
    avatar: undefined,
    avatarColor: 'primary',
    clickable: false,
    disabled: false,
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-md">
        <ui-list-item ${argsToTemplate(args)} />
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [ListItemVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-list-item-variants />`,
  }),
};
