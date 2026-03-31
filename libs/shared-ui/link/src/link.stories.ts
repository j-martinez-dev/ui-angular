import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { UiLinkDirective } from './link.directive';

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-link-docs',
  imports: [UiLinkDirective],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Link</h2>
        <p class="ui-body-md ui-text-muted">
          A directive that applies consistent link styling to any element.
          Supports variant colors and underline behaviors.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <a href="javascript:void(0)" uiLink>Default link</a>
          <a href="javascript:void(0)" uiLink="muted">Muted link</a>
          <a href="javascript:void(0)" uiLink="danger">Danger link</a>
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
              <td class="ui-code p-2">uiLink</td>
              <td class="ui-code p-2">'default' | 'muted' | 'danger'</td>
              <td class="ui-code p-2">'default'</td>
              <td class="ui-body-sm p-2">Visual variant</td>
            </tr>
            <tr>
              <td class="ui-code p-2">underline</td>
              <td class="ui-code p-2">'always' | 'hover' | 'never'</td>
              <td class="ui-code p-2">'hover'</td>
              <td class="ui-body-sm p-2">When to show the underline</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class LinkDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-link-variants',
  imports: [UiLinkDirective],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variants</p>
        <div class="flex gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <a href="javascript:void(0)" uiLink>Default</a>
          <a href="javascript:void(0)" uiLink="muted">Muted</a>
          <a href="javascript:void(0)" uiLink="danger">Danger</a>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Underline — Always</p>
        <div class="flex gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <a href="javascript:void(0)" uiLink underline="always">Default</a>
          <a href="javascript:void(0)" uiLink="muted" underline="always">Muted</a>
          <a href="javascript:void(0)" uiLink="danger" underline="always">Danger</a>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Underline — Hover</p>
        <div class="flex gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <a href="javascript:void(0)" uiLink underline="hover">Default</a>
          <a href="javascript:void(0)" uiLink="muted" underline="hover">Muted</a>
          <a href="javascript:void(0)" uiLink="danger" underline="hover">Danger</a>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Underline — Never</p>
        <div class="flex gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <a href="javascript:void(0)" uiLink underline="never">Default</a>
          <a href="javascript:void(0)" uiLink="muted" underline="never">Muted</a>
          <a href="javascript:void(0)" uiLink="danger" underline="never">Danger</a>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">In context</p>
        <div class="flex flex-col gap-2 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 500px;">
          <p class="ui-body-md">
            En continuant, vous acceptez nos
            <a href="javascript:void(0)" uiLink underline="always">conditions d'utilisation</a>
            et notre
            <a href="javascript:void(0)" uiLink underline="always">politique de confidentialité</a>.
          </p>
          <p class="ui-body-sm ui-text-muted">
            <a href="javascript:void(0)" uiLink="danger" underline="hover">Supprimer le compte</a>
          </p>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex gap-6 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <a href="javascript:void(0)" uiLink>Default</a>
          <a href="javascript:void(0)" uiLink="muted">Muted</a>
          <a href="javascript:void(0)" uiLink="danger">Danger</a>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex gap-6 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <a href="javascript:void(0)" uiLink>Default</a>
          <a href="javascript:void(0)" uiLink="muted">Muted</a>
          <a href="javascript:void(0)" uiLink="danger">Danger</a>
        </div>
      </section>

    </div>
  `,
})
class LinkVariantsComponent {}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiLinkDirective> = {
  title: 'Shared UI/Link',
  component: UiLinkDirective,
  argTypes: {
    uiLink: {
      control: 'select',
      options: ['default', 'muted', 'danger'],
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'never'],
    },
  },
};

export default meta;
type Story = StoryObj<UiLinkDirective>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [LinkDocsComponent] }),
  ],
  render: () => ({
    template: `<story-link-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    uiLink: 'default',
    underline: 'hover',
  },
  render: (args) => ({
    props: args,
    template: `
      <a href="javascript:void(0)" [uiLink]="uiLink" [underline]="underline">
        Example link
      </a>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [LinkVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-link-variants />`,
  }),
};
