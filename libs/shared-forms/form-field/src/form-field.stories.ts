import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroExclamationCircle,
  heroMagnifyingGlass,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { UiFormFieldComponent } from './form-field.component';
import { UiInputComponent } from '@ui/shared-forms/input';
import { UiTextareaComponent } from '@ui/shared-forms/textarea';
import { UiSelectComponent } from '@ui/shared-forms/select';
import { type SelectOption } from '@ui/shared-forms/select';

const icons = { heroExclamationCircle, heroMagnifyingGlass, heroXMark };

const ROLE_OPTIONS: SelectOption<string>[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-form-field-docs',
  imports: [UiFormFieldComponent, UiInputComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Form Field</h2>
        <p class="ui-body-md ui-text-muted">
          A layout wrapper that adds a label, hint text, and error messages around any form control.
          Works with Signal Forms validation errors.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field #emailField label="Email" hint="We'll never share your email" [required]="true">
            <ui-input type="email" placeholder="you@example.com" [id]="emailField.controlId()" [ariaDescribedBy]="emailField.describedBy()" />
          </ui-form-field>
        </div>
        <code class="ui-code">&lt;ui-form-field label="Email" [required]="true"&gt;...&lt;/ui-form-field&gt;</code>
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
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Label text above the control</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">hint</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Helper text below the control</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">required</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows * indicator</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">invalid</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Error styling on label</td>
            </tr>
            <tr>
              <td class="ui-code p-2">errors</td>
              <td class="ui-code p-2">ValidationError[]</td>
              <td class="ui-code p-2">[]</td>
              <td class="ui-body-sm p-2">Validation errors to display</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class FormFieldDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-form-field-variants',
  imports: [UiFormFieldComponent, UiInputComponent, UiTextareaComponent, UiSelectComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Default with hint</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Full name" hint="First and last name">
            <ui-input placeholder="John Doe" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Required</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Email" [required]="true" hint="We'll never share your email">
            <ui-input type="email" placeholder="you@example.com" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Invalid with errors</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field
            label="Password"
            [required]="true"
            [invalid]="true"
            [errors]="passwordErrors"
          >
            <ui-input type="password" placeholder="••••••••" [invalid]="true" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With textarea</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Bio" hint="Tell us about yourself">
            <ui-textarea placeholder="Write something..." [rows]="3" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With select</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Role" [required]="true">
            <ui-select [options]="roles" placeholder="Choose a role" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Full form example</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Name" [required]="true">
            <ui-input placeholder="Full name" />
          </ui-form-field>
          <ui-form-field label="Email" [required]="true" hint="We'll never share it">
            <ui-input type="email" placeholder="you@example.com" />
          </ui-form-field>
          <ui-form-field label="Role">
            <ui-select [options]="roles" placeholder="Select role" />
          </ui-form-field>
          <ui-form-field label="Notes" hint="Optional">
            <ui-textarea placeholder="Additional info..." [rows]="2" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-col gap-4 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Email" [required]="true" hint="Dark theme">
            <ui-input type="email" placeholder="you@example.com" />
          </ui-form-field>
          <ui-form-field label="Password" [required]="true" [invalid]="true" [errors]="passwordErrors">
            <ui-input type="password" [invalid]="true" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-col gap-4 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Name" hint="Pastel theme">
            <ui-input placeholder="Your name" />
          </ui-form-field>
          <ui-form-field label="Bio" [invalid]="true" [errors]="bioErrors">
            <ui-textarea placeholder="About you" [invalid]="true" [rows]="2" />
          </ui-form-field>
        </div>
      </section>

    </div>
  `,
})
class FormFieldVariantsComponent {
  roles = ROLE_OPTIONS;
  passwordErrors = [
    { message: 'Password must be at least 8 characters' },
    { message: 'Password must contain a number' },
  ];
  bioErrors = [
    { message: 'Bio is required' },
  ];
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiFormFieldComponent> = {
  title: 'Shared Forms/FormField',
  component: UiFormFieldComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiFormFieldComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [FormFieldDocsComponent] }),
  ],
  render: () => ({
    template: `<story-form-field-docs />`,
  }),
};

export const Playground: Story = {
  decorators: [
    moduleMetadata({ imports: [UiInputComponent] }),
  ],
  args: {
    label: 'Field label',
    hint: 'Helper text',
    required: false,
    invalid: false,
    errors: [],
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-sm">
        <ui-form-field [label]="label" [hint]="hint" [required]="required" [invalid]="invalid" [errors]="errors">
          <ui-input placeholder="Type something..." [invalid]="invalid" />
        </ui-form-field>
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [FormFieldVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-form-field-variants />`,
  }),
};
