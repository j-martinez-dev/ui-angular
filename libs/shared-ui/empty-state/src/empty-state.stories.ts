import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata, applicationConfig } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroMagnifyingGlass,
  heroFolderPlus,
  heroInboxStack,
  heroUsers,
  heroCog6Tooth,
} from '@ng-icons/heroicons/outline';
import { UiEmptyStateComponent, type EmptyStateSize } from './empty-state.component';

const icons = { heroMagnifyingGlass, heroFolderPlus, heroInboxStack, heroUsers, heroCog6Tooth };

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-empty-state-docs',
  imports: [UiEmptyStateComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Empty State</h2>
        <p class="ui-body-md ui-text-muted">
          A centered placeholder shown when a section has no data. Supports an icon,
          description, and an optional action button.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-empty-state
            title="No results found"
            description="Try adjusting your search or filters"
            icon="heroMagnifyingGlass"
          />
          <code class="ui-code">&lt;ui-empty-state title="No results found" icon="heroMagnifyingGlass" /&gt;</code>
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
              <td class="ui-code p-2">title</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">required</td>
              <td class="ui-body-sm p-2">Main title text</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">description</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Supporting text below the title</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">icon</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Heroicon name displayed above the title</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">actionLabel</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Label for the optional action button</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">actionVariant</td>
              <td class="ui-code p-2">primary | secondary | ghost</td>
              <td class="ui-code p-2">primary</td>
              <td class="ui-body-sm p-2">Variant passed to the action button</td>
            </tr>
            <tr>
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Controls icon size, font sizes and spacing</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class EmptyStateDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const SIZES: EmptyStateSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-empty-state-variants',
  imports: [UiEmptyStateComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <ui-empty-state
              [title]="'Size: ' + size"
              description="Supporting text for this size variant"
              icon="heroInboxStack"
              [size]="size"
            />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With action button</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-empty-state
            title="No projects yet"
            description="Get started by creating your first project"
            icon="heroFolderPlus"
            actionLabel="Create project"
          />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Action variants</p>
        <div class="flex flex-col gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-empty-state
            title="Primary action"
            icon="heroUsers"
            actionLabel="Invite people"
            actionVariant="primary"
          />
          <ui-empty-state
            title="Secondary action"
            icon="heroCog6Tooth"
            actionLabel="Configure"
            actionVariant="secondary"
          />
          <ui-empty-state
            title="Ghost action"
            icon="heroMagnifyingGlass"
            actionLabel="Try again"
            actionVariant="ghost"
          />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Minimal — title only</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-empty-state title="Nothing here" />
        </div>
      </section>

    </div>
  `,
})
class EmptyStateVariantsComponent {
  sizes = SIZES;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiEmptyStateComponent> = {
  title: 'Components/EmptyState',
  component: UiEmptyStateComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    icon: {
      control: 'text',
    },
    actionLabel: {
      control: 'text',
    },
    actionVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<UiEmptyStateComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [EmptyStateDocsComponent] }),
  ],
  render: () => ({
    template: `<story-empty-state-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filters',
    icon: 'heroMagnifyingGlass',
    actionLabel: 'Clear filters',
    actionVariant: 'primary',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<ui-empty-state ${argsToTemplate(args)} />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [EmptyStateVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-empty-state-variants />`,
  }),
};
