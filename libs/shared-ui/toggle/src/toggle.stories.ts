import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { UiToggleComponent, ToggleSize } from './toggle.component';

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-toggle-docs',
  imports: [UiToggleComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Toggle</h2>
        <p class="ui-body-md ui-text-muted">
          A sliding toggle switch for boolean values. Integrates with Angular Signal Forms
          via the FormCheckboxControl interface.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-toggle label="Enable notifications" />
          <code class="ui-code">&lt;ui-toggle label="Enable notifications" /&gt;</code>
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
              <td class="ui-code" style="padding: 0.5rem;">checked</td>
              <td class="ui-code" style="padding: 0.5rem;">boolean</td>
              <td class="ui-code" style="padding: 0.5rem;">false</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Two-way bound checked state (model signal)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">label</td>
              <td class="ui-code" style="padding: 0.5rem;">string</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">undefined</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Label text displayed next to the toggle</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">size</td>
              <td class="ui-code" style="padding: 0.5rem;">sm | md | lg</td>
              <td class="ui-code" style="padding: 0.5rem;">md</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Toggle size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">disabled</td>
              <td class="ui-code" style="padding: 0.5rem;">boolean</td>
              <td class="ui-code" style="padding: 0.5rem;">false</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Disables the toggle</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code" style="padding: 0.5rem;">invalid</td>
              <td class="ui-code" style="padding: 0.5rem;">boolean</td>
              <td class="ui-code" style="padding: 0.5rem;">false</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Shows error track color (managed by form field)</td>
            </tr>
            <tr>
              <td class="ui-code" style="padding: 0.5rem;">required</td>
              <td class="ui-code" style="padding: 0.5rem;">boolean</td>
              <td class="ui-code" style="padding: 0.5rem;">false</td>
              <td class="ui-body-sm" style="padding: 0.5rem;">Marks as required (aria-required)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class ToggleDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const SIZES: ToggleSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-toggle-variants',
  imports: [UiToggleComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">States</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-toggle label="Unchecked" />
          <ui-toggle label="Checked" [checked]="true" />
          <ui-toggle label="Disabled unchecked" [disabled]="true" />
          <ui-toggle label="Disabled checked" [checked]="true" [disabled]="true" />
          <ui-toggle label="Invalid" [invalid]="true" />
          <ui-toggle label="Invalid checked" [checked]="true" [invalid]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <ui-toggle [label]="'Size: ' + size" [size]="size" [checked]="true" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Without label</p>
        <div class="flex items-center gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-toggle />
          <ui-toggle [checked]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Interactive group</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-toggle label="Dark mode" [(checked)]="darkMode" />
          <ui-toggle label="Notifications" [(checked)]="notifications" />
          <ui-toggle label="Auto-save" [(checked)]="autoSave" />
          <p class="ui-caption ui-text-muted">
            Active: {{ activeToggles() }}
          </p>
        </div>
      </section>

    </div>
  `,
})
class ToggleVariantsComponent {
  sizes = SIZES;
  darkMode = signal(true);
  notifications = signal(false);
  autoSave = signal(true);

  activeToggles() {
    const opts: string[] = [];
    if (this.darkMode()) opts.push('Dark mode');
    if (this.notifications()) opts.push('Notifications');
    if (this.autoSave()) opts.push('Auto-save');
    return opts.length ? opts.join(', ') : 'none';
  }
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiToggleComponent> = {
  title: 'Components/Toggle',
  component: UiToggleComponent,
  argTypes: {
    checked: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<UiToggleComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [ToggleDocsComponent] }),
  ],
  render: () => ({
    template: `<story-toggle-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    checked: false,
    label: 'Enable feature',
    size: 'md',
    disabled: false,
    invalid: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<ui-toggle ${argsToTemplate(args)} />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [ToggleVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-toggle-variants />`,
  }),
};
