import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { UiSeparatorComponent } from './separator.component';

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-separator-docs',
  imports: [UiSeparatorComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Separator</h2>
        <p class="ui-body-md ui-text-muted">
          A visual divider for separating content sections.
          Supports horizontal and vertical orientations, with an optional centered label.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-6 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <p class="ui-body-sm">Content above</p>
          <ui-separator />
          <p class="ui-body-sm">Content below</p>
          <ui-separator label="ou" />
          <p class="ui-body-sm">Alternative content</p>
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
              <td class="ui-code p-2">orientation</td>
              <td class="ui-code p-2">horizontal | vertical</td>
              <td class="ui-code p-2">horizontal</td>
              <td class="ui-body-sm p-2">Direction of the separator</td>
            </tr>
            <tr>
              <td class="ui-code p-2">label</td>
              <td class="ui-code p-2">string | undefined</td>
              <td class="ui-code p-2">undefined</td>
              <td class="ui-body-sm p-2">Centered text label</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class SeparatorDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-separator-variants',
  imports: [UiSeparatorComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Horizontal — No label</p>
        <div class="flex flex-col gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <p class="ui-body-sm">Section A</p>
          <ui-separator />
          <p class="ui-body-sm">Section B</p>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Horizontal — With label</p>
        <div class="flex flex-col gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <p class="ui-body-sm">Connexion par email</p>
          <ui-separator label="ou" />
          <p class="ui-body-sm">Connexion par réseau social</p>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Horizontal — Long label</p>
        <div class="flex flex-col gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-separator label="Informations supplémentaires" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Vertical — Inline items</p>
        <div class="flex items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md); height: 48px;">
          <span class="ui-body-sm">Accueil</span>
          <ui-separator orientation="vertical" />
          <span class="ui-body-sm">Produits</span>
          <ui-separator orientation="vertical" />
          <span class="ui-body-sm">Contact</span>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-col gap-4 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <p class="ui-body-sm">Section A</p>
          <ui-separator />
          <ui-separator label="ou" />
          <p class="ui-body-sm">Section B</p>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-col gap-4 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <p class="ui-body-sm">Section A</p>
          <ui-separator />
          <ui-separator label="ou" />
          <p class="ui-body-sm">Section B</p>
        </div>
      </section>

    </div>
  `,
})
class SeparatorVariantsComponent {}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiSeparatorComponent> = {
  title: 'Shared UI/Separator',
  component: UiSeparatorComponent,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<UiSeparatorComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [SeparatorDocsComponent] }),
  ],
  render: () => ({
    template: `<story-separator-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    label: 'ou',
  },
  render: (args) => ({
    props: args,
    template: `<div style="max-width: 400px;">
      <ui-separator [orientation]="orientation" [label]="label" />
    </div>`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [SeparatorVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-separator-variants />`,
  }),
};
