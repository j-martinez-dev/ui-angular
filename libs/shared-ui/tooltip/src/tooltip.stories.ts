import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component, TemplateRef, viewChild } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroInformationCircle, heroTrash } from '@ng-icons/heroicons/outline';
import { UiTooltipDirective, type TooltipPosition } from './tooltip.directive';
import { UiTooltipComponent } from './tooltip.component';
import { UiButtonComponent } from '@ui/shared-ui/button';
import { UiIconComponent } from '@ui/shared-ui/icon';

const icons = { heroInformationCircle, heroTrash };

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-tooltip-docs',
  imports: [UiTooltipDirective, UiButtonComponent, UiIconComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Tooltip</h2>
        <p class="ui-body-md ui-text-muted">
          A floating label that appears on hover or focus to provide supplementary information.
          Supports plain text and ng-template content. Positioned via Angular CDK Overlay.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex items-center gap-6 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button uiTooltip="Save your changes" uiTooltipPosition="top">Hover me</ui-button>
          <code class="ui-code">&lt;button uiTooltip="Save your changes"&gt;Hover me&lt;/button&gt;</code>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Inputs (directive)</h3>
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
              <td class="ui-code p-2">uiTooltip</td>
              <td class="ui-code p-2">string | TemplateRef</td>
              <td class="ui-code p-2">required</td>
              <td class="ui-body-sm p-2">Tooltip content — plain text or an ng-template</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">uiTooltipPosition</td>
              <td class="ui-code p-2">top | bottom | left | right</td>
              <td class="ui-code p-2">top</td>
              <td class="ui-body-sm p-2">Preferred position relative to the host</td>
            </tr>
            <tr>
              <td class="ui-code p-2">uiTooltipDelay</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">300</td>
              <td class="ui-body-sm p-2">Delay in ms before the tooltip appears</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class TooltipDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

const POSITIONS: TooltipPosition[] = ['top', 'bottom', 'left', 'right'];

@Component({
  selector: 'story-tooltip-variants',
  imports: [UiTooltipDirective, UiButtonComponent, UiIconComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Positions</p>
        <div class="flex flex-wrap items-center justify-center gap-6 p-10" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (pos of positions; track pos) {
            <ui-button variant="secondary" [uiTooltip]="'Tooltip on ' + pos" [uiTooltipPosition]="pos">
              {{ pos }}
            </ui-button>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">On icon button</p>
        <div class="flex flex-wrap items-center gap-6 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button variant="danger" iconLeft="heroTrash" uiTooltip="Delete this item" uiTooltipPosition="bottom">
            Delete
          </ui-button>
          <span uiTooltip="More information" uiTooltipPosition="right" style="cursor: help;">
            <ui-icon name="heroInformationCircle" size="lg" color="muted" />
          </span>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Template content</p>
        <div class="flex flex-wrap items-center gap-6 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ng-template #richTip>
            <strong>Keyboard shortcut:</strong> Ctrl+S
          </ng-template>
          <ui-button variant="primary" [uiTooltip]="richTip" uiTooltipPosition="bottom">
            Save
          </ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-wrap items-center justify-center gap-6 p-10" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <ui-button variant="primary" uiTooltip="Dark theme tooltip" uiTooltipPosition="top">
            Hover me
          </ui-button>
          <ui-button variant="secondary" uiTooltip="Another tooltip" uiTooltipPosition="bottom">
            Or me
          </ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-wrap items-center justify-center gap-6 p-10" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <ui-button variant="primary" uiTooltip="Pastel theme tooltip" uiTooltipPosition="top">
            Hover me
          </ui-button>
          <ui-button variant="secondary" uiTooltip="Soft tooltip" uiTooltipPosition="bottom">
            Or me
          </ui-button>
        </div>
      </section>

    </div>
  `,
})
class TooltipVariantsComponent {
  positions = POSITIONS;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiTooltipDirective> = {
  title: 'Components/Tooltip',
  component: UiTooltipDirective,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
    moduleMetadata({
      imports: [UiTooltipDirective, UiButtonComponent, UiIconComponent],
    }),
  ],
  argTypes: {
    uiTooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    uiTooltipDelay: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<UiTooltipDirective>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [TooltipDocsComponent] }),
  ],
  render: () => ({
    template: `<story-tooltip-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    uiTooltip: 'This is a tooltip',
    uiTooltipPosition: 'top',
    uiTooltipDelay: 300,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex justify-center p-20">
        <ui-button variant="primary" ${argsToTemplate(args)}>
          Hover me
        </ui-button>
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [TooltipVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-tooltip-variants />`,
  }),
};
