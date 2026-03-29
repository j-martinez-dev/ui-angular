import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroChevronLeft,
  heroChevronRight,
  heroCheck,
} from '@ng-icons/heroicons/outline';
import { UiWizardBottomBarComponent } from './wizard-bottom-bar.component';

const icons = {
  heroChevronLeft,
  heroChevronRight,
  heroCheck,
};

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-wizard-docs',
  imports: [UiWizardBottomBarComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Wizard Bottom Bar</h2>
        <p class="ui-body-md ui-text-muted">
          Fixed bottom bar for multi-step wizard flows.
          Shows previous/next navigation, step counter, and a finish button on the last step.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <p class="ui-body-sm ui-text-muted">
          Use the buttons below to navigate between steps. The bar is rendered inline here for demonstration.
        </p>
        <div style="position: relative; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden; height: 72px;">
          <div style="position: absolute; bottom: 0; left: 0; right: 0;">
            <ui-wizard-bottom-bar
              [currentStep]="step()"
              [totalSteps]="4"
              (previous)="prev()"
              (next)="nextStep()"
              (finish)="onFinish()"
            />
          </div>
        </div>
        <div class="flex gap-2">
          <button class="ui-body-sm" style="padding: 4px 12px; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); cursor: pointer; background: var(--color-surface-raised);" (click)="prev()">← Prev</button>
          <button class="ui-body-sm" style="padding: 4px 12px; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); cursor: pointer; background: var(--color-surface-raised);" (click)="nextStep()">Next →</button>
          <span class="ui-body-sm ui-text-muted" style="padding: 4px 8px;">Current: {{ step() }}/4</span>
        </div>
        <code class="ui-code">&lt;ui-wizard-bottom-bar [currentStep]="step" [totalSteps]="4" (next)="next()" (finish)="finish()" /&gt;</code>
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
              <td class="ui-code p-2">currentStep</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">required</td>
              <td class="ui-body-sm p-2">Current step (1-based)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">totalSteps</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">required</td>
              <td class="ui-body-sm p-2">Total number of steps</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">previousLabel</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">'Précédent'</td>
              <td class="ui-body-sm p-2">Label for the previous button</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">nextLabel</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">'Suivant'</td>
              <td class="ui-body-sm p-2">Label for the next button</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">finishLabel</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">'Terminer'</td>
              <td class="ui-body-sm p-2">Label for the finish button</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">nextDisabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the next/finish button</td>
            </tr>
            <tr>
              <td class="ui-code p-2">loading</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows loading state on next/finish</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [`
    :host ::ng-deep ui-wizard-bottom-bar .wizard-bottom-bar {
      position: absolute;
    }
  `],
})
class WizardDocsComponent {
  step = signal(1);
  prev() { this.step.update(s => Math.max(1, s - 1)); }
  nextStep() { this.step.update(s => Math.min(4, s + 1)); }
  onFinish() { this.step.set(1); }
}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-wizard-variants',
  imports: [UiWizardBottomBarComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">First step</p>
        <div style="position: relative; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden; height: 72px;">
          <div style="position: absolute; bottom: 0; left: 0; right: 0;">
            <ui-wizard-bottom-bar [currentStep]="1" [totalSteps]="4" />
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Middle step</p>
        <div style="position: relative; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden; height: 72px;">
          <div style="position: absolute; bottom: 0; left: 0; right: 0;">
            <ui-wizard-bottom-bar [currentStep]="2" [totalSteps]="4" />
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Last step</p>
        <div style="position: relative; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden; height: 72px;">
          <div style="position: absolute; bottom: 0; left: 0; right: 0;">
            <ui-wizard-bottom-bar [currentStep]="4" [totalSteps]="4" />
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Next disabled</p>
        <div style="position: relative; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden; height: 72px;">
          <div style="position: absolute; bottom: 0; left: 0; right: 0;">
            <ui-wizard-bottom-bar [currentStep]="2" [totalSteps]="4" [nextDisabled]="true" />
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Loading</p>
        <div style="position: relative; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden; height: 72px;">
          <div style="position: absolute; bottom: 0; left: 0; right: 0;">
            <ui-wizard-bottom-bar [currentStep]="3" [totalSteps]="4" [loading]="true" />
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Custom labels</p>
        <div style="position: relative; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden; height: 72px;">
          <div style="position: absolute; bottom: 0; left: 0; right: 0;">
            <ui-wizard-bottom-bar
              [currentStep]="2"
              [totalSteps]="3"
              previousLabel="Retour"
              nextLabel="Continuer"
              finishLabel="Envoyer"
            />
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark" style="position: relative; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden; height: 72px; background: var(--color-surface-base);">
          <div style="position: absolute; bottom: 0; left: 0; right: 0;">
            <ui-wizard-bottom-bar [currentStep]="2" [totalSteps]="4" />
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel" style="position: relative; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden; height: 72px; background: var(--color-surface-base);">
          <div style="position: absolute; bottom: 0; left: 0; right: 0;">
            <ui-wizard-bottom-bar [currentStep]="3" [totalSteps]="5" />
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    :host ::ng-deep ui-wizard-bottom-bar .wizard-bottom-bar {
      position: absolute;
    }
  `],
})
class WizardVariantsComponent {}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiWizardBottomBarComponent> = {
  title: 'Shared UI/WizardBottomBar',
  component: UiWizardBottomBarComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    currentStep: { control: 'number' },
    totalSteps: { control: 'number' },
    previousLabel: { control: 'text' },
    nextLabel: { control: 'text' },
    finishLabel: { control: 'text' },
    nextDisabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiWizardBottomBarComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [WizardDocsComponent] }),
  ],
  render: () => ({
    template: `<story-wizard-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    previousLabel: 'Précédent',
    nextLabel: 'Suivant',
    finishLabel: 'Terminer',
    nextDisabled: false,
    loading: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="position: relative; height: 72px; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
        <div style="position: absolute; bottom: 0; left: 0; right: 0;">
          <ui-wizard-bottom-bar ${argsToTemplate(args)} />
        </div>
      </div>
    `,
    styles: [`
      :host ::ng-deep ui-wizard-bottom-bar .wizard-bottom-bar {
        position: absolute;
      }
    `],
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [WizardVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-wizard-variants />`,
  }),
};
