import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroCheck } from '@ng-icons/heroicons/outline';
import { UiStepperComponent, type StepperOrientation } from './stepper.component';
import { type StepperItem } from './stepper.types';

const icons = { heroCheck };

const STEPS: StepperItem[] = [
  { label: 'Informations', description: 'Données personnelles' },
  { label: 'Adresse', description: 'Lieu de résidence' },
  { label: 'Paiement', description: 'Coordonnées bancaires' },
  { label: 'Confirmation', description: 'Vérification finale' },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-stepper-docs',
  imports: [UiStepperComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Stepper</h2>
        <p class="ui-body-md ui-text-muted">
          A progress indicator that displays wizard steps with completed, active, and pending states.
          Supports horizontal and vertical orientations.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-6 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-stepper [steps]="steps" [currentStep]="2" label="Order progress" />
          <code class="ui-code">&lt;ui-stepper [steps]="steps" [currentStep]="2" /&gt;</code>
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
              <td class="ui-code p-2">steps</td>
              <td class="ui-code p-2">StepperItem[]</td>
              <td class="ui-code p-2">required</td>
              <td class="ui-body-sm p-2">List of steps</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">currentStep</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">required</td>
              <td class="ui-body-sm p-2">Current active step (1-based)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">orientation</td>
              <td class="ui-code p-2">horizontal | vertical</td>
              <td class="ui-code p-2">horizontal</td>
              <td class="ui-body-sm p-2">Layout direction</td>
            </tr>
            <tr>
              <td class="ui-code p-2">label</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">Progression</td>
              <td class="ui-body-sm p-2">Accessible name (aria-label)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class StepperDocsComponent {
  steps = STEPS;
}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-stepper-variants',
  imports: [UiStepperComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Horizontal — Step 1</p>
        <div class="p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-stepper [steps]="steps" [currentStep]="1" label="Step 1" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Horizontal — Step 2</p>
        <div class="p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-stepper [steps]="steps" [currentStep]="2" label="Step 2" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Horizontal — Step 3</p>
        <div class="p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-stepper [steps]="steps" [currentStep]="3" label="Step 3" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Horizontal — All complete</p>
        <div class="p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-stepper [steps]="steps" [currentStep]="5" label="All complete" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Vertical — Step 2</p>
        <div class="p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          <ui-stepper [steps]="steps" [currentStep]="2" orientation="vertical" label="Vertical step 2" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Without descriptions</p>
        <div class="p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-stepper [steps]="simpleSteps" [currentStep]="2" label="Simple steps" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <ui-stepper [steps]="steps" [currentStep]="3" label="Dark theme" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <ui-stepper [steps]="steps" [currentStep]="3" label="Pastel theme" />
        </div>
      </section>

    </div>
  `,
})
class StepperVariantsComponent {
  steps = STEPS;
  simpleSteps: StepperItem[] = [
    { label: 'Étape 1' },
    { label: 'Étape 2' },
    { label: 'Étape 3' },
  ];
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiStepperComponent> = {
  title: 'Shared UI/Stepper',
  component: UiStepperComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    currentStep: {
      control: { type: 'number', min: 1, max: 5 },
    },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<UiStepperComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [StepperDocsComponent] }),
  ],
  render: () => ({
    template: `<story-stepper-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    steps: STEPS,
    currentStep: 2,
    orientation: 'horizontal',
    label: 'Order progress',
  },
  render: (args) => ({
    props: args,
    template: `<ui-stepper
      [steps]="steps"
      [currentStep]="currentStep"
      [orientation]="orientation"
      [label]="label"
    />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [StepperVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-stepper-variants />`,
  }),
};
