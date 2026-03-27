import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroCheckCircle,
  heroExclamationTriangle,
  heroXCircle,
  heroInformationCircle,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { UiAlertComponent, AlertVariant, AlertColor } from './alert.component';

const icons = {
  heroCheckCircle,
  heroExclamationTriangle,
  heroXCircle,
  heroInformationCircle,
  heroXMark,
};

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-alert-docs',
  imports: [UiAlertComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Alert</h2>
        <p class="ui-body-md ui-text-muted">
          A contextual feedback banner for success, warning, error, and informational messages.
          Supports filled, subtle, and outline variants with optional title, action button, and close control.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          <ui-alert color="success" title="Saved">Your changes have been saved successfully.</ui-alert>
          <ui-alert color="error" [removable]="true">Something went wrong. Please try again.</ui-alert>
        </div>
        <code class="ui-code">&lt;ui-alert color="success" title="Saved"&gt;...&lt;/ui-alert&gt;</code>
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
              <td class="ui-code p-2">filled | subtle | outline</td>
              <td class="ui-code p-2">subtle</td>
              <td class="ui-body-sm p-2">Visual style</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">color</td>
              <td class="ui-code p-2">success | warning | error | info</td>
              <td class="ui-code p-2">info</td>
              <td class="ui-body-sm p-2">Semantic color</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">title</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Optional bold title</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">actionLabel</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Label for action button</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">removable</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows close button</td>
            </tr>
            <tr>
              <td class="ui-code p-2">icon</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">auto</td>
              <td class="ui-body-sm p-2">Override default icon</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class AlertDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: AlertVariant[] = ['subtle', 'filled', 'outline'];
const COLORS: AlertColor[] = ['success', 'warning', 'error', 'info'];

@Component({
  selector: 'story-alert-variants',
  imports: [UiAlertComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      @for (variant of variants; track variant) {
        <section class="flex flex-col gap-4">
          <p class="ui-overline">{{ variant }}</p>
          <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
            @for (color of colors; track color) {
              <ui-alert [variant]="variant" [color]="color">
                This is a {{ color }} alert with {{ variant }} variant.
              </ui-alert>
            }
          </div>
        </section>
      }

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With title</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          <ui-alert color="success" title="Operation completed">Your data has been saved successfully.</ui-alert>
          <ui-alert color="error" title="Connection failed">Unable to reach the server. Check your network.</ui-alert>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With action</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          <ui-alert color="warning" title="Unsaved changes" actionLabel="Save now">You have unsaved changes that will be lost.</ui-alert>
          <ui-alert color="info" actionLabel="Learn more">A new version is available with improved performance.</ui-alert>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Removable</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 520px;">
          @for (color of colors; track color) {
            <ui-alert [color]="color" [removable]="true" title="Dismissible">
              This {{ color }} alert can be closed.
            </ui-alert>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 520px;">
          @for (color of colors; track color) {
            <ui-alert [color]="color">Dark theme {{ color }} alert.</ui-alert>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 520px;">
          @for (color of colors; track color) {
            <ui-alert [color]="color">Pastel theme {{ color }} alert.</ui-alert>
          }
        </div>
      </section>

    </div>
  `,
})
class AlertVariantsComponent {
  variants = VARIANTS;
  colors = COLORS;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiAlertComponent> = {
  title: 'Components/Alert',
  component: UiAlertComponent,
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
      options: ['success', 'warning', 'error', 'info'],
    },
    title: { control: 'text' },
    actionLabel: { control: 'text' },
    removable: { control: 'boolean' },
    icon: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<UiAlertComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [AlertDocsComponent] }),
  ],
  render: () => ({
    template: `<story-alert-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    variant: 'subtle',
    color: 'info',
    title: 'Heads up',
    actionLabel: undefined,
    removable: false,
    icon: undefined,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-lg">
        <ui-alert ${argsToTemplate(args)}>This is an alert message with useful information.</ui-alert>
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [AlertVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-alert-variants />`,
  }),
};
