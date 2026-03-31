import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroExclamationCircle,
  heroMagnifyingGlass,
  heroXMark,
  heroChevronDown,
} from '@ng-icons/heroicons/outline';
import {
  form,
  FormField,
  required,
  minLength,
  email,
} from '@angular/forms/signals';
import { UiFormFieldComponent } from './form-field.component';
import { UiInputComponent } from '@ui/shared-forms/input';
import { UiTextareaComponent } from '@ui/shared-forms/textarea';
import { UiSelectComponent } from '@ui/shared-forms/select';
import { type SelectOption } from '@ui/shared-forms/select';

const icons = { heroExclamationCircle, heroMagnifyingGlass, heroXMark, heroChevronDown };

const ROLE_OPTIONS: SelectOption<string>[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-form-field-docs',
  imports: [UiFormFieldComponent, UiInputComponent, FormField],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Form Field</h2>
        <p class="ui-body-md ui-text-muted">
          A layout wrapper that adds a label, hint text, and error messages around any form control.
          Automatically derives required, invalid, dirty, and errors from a projected
          <code class="ui-code">[formField]</code> binding.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Email" hint="We'll never share your email">
            <ui-input [formField]="emailForm.email" type="email" placeholder="you@example.com" />
          </ui-form-field>
        </div>
        <code class="ui-code">&lt;ui-form-field label="Email"&gt;&lt;ui-input [formField]="form.email" /&gt;&lt;/ui-form-field&gt;</code>
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
            <tr>
              <td class="ui-code p-2">hint</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Helper text below the control</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Derived state</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <th class="ui-body-sm p-2 text-left">Signal</th>
              <th class="ui-body-sm p-2 text-left">Type</th>
              <th class="ui-body-sm p-2 text-left">Source</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">required</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-body-sm p-2">FormField → FieldState.required</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">invalid</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-body-sm p-2">FormField → FieldState.invalid</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">dirty</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-body-sm p-2">FormField → FieldState.dirty</td>
            </tr>
            <tr>
              <td class="ui-code p-2">errors</td>
              <td class="ui-code p-2">ValidationError[]</td>
              <td class="ui-body-sm p-2">FormField → FieldState.errors</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class FormFieldDocsComponent {
  private emailModel = signal({ email: '' });
  emailForm = form(this.emailModel, (s) => {
    required(s.email, { message: 'Email is required' });
    email(s.email, { message: 'Invalid email address' });
  });
}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-form-field-variants',
  imports: [UiFormFieldComponent, UiInputComponent, UiTextareaComponent, UiSelectComponent, FormField],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Default with hint</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Full name" hint="First and last name">
            <ui-input [formField]="simpleForm.name" placeholder="John Doe" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Required (auto-detected)</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Email" hint="We'll never share your email">
            <ui-input [formField]="validatedForm.email" type="email" placeholder="you@example.com" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Invalid with errors (type and blur to trigger)</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Password">
            <ui-input [formField]="validatedForm.password" type="password" placeholder="••••••••" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With textarea</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Bio" hint="Tell us about yourself">
            <ui-textarea [formField]="simpleForm.bio" placeholder="Write something..." [rows]="3" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With select</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Role">
            <ui-select [formField]="validatedForm.role" [options]="roles" placeholder="Choose a role" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Full form example</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Name">
            <ui-input [formField]="fullForm.name" placeholder="Full name" />
          </ui-form-field>
          <ui-form-field label="Email" hint="We'll never share it">
            <ui-input [formField]="fullForm.email" type="email" placeholder="you@example.com" />
          </ui-form-field>
          <ui-form-field label="Role">
            <ui-select [formField]="fullForm.role" [options]="roles" placeholder="Select role" />
          </ui-form-field>
          <ui-form-field label="Notes" hint="Optional">
            <ui-textarea [formField]="fullForm.notes" placeholder="Additional info..." [rows]="2" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-col gap-4 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Email" hint="Dark theme">
            <ui-input [formField]="darkForm.email" type="email" placeholder="you@example.com" />
          </ui-form-field>
          <ui-form-field label="Password">
            <ui-input [formField]="darkForm.password" type="password" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-col gap-4 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Name" hint="Pastel theme">
            <ui-input [formField]="pastelForm.name" placeholder="Your name" />
          </ui-form-field>
          <ui-form-field label="Bio">
            <ui-textarea [formField]="pastelForm.bio" placeholder="About you" [rows]="2" />
          </ui-form-field>
        </div>
      </section>

    </div>
  `,
})
class FormFieldVariantsComponent {
  roles = ROLE_OPTIONS;

  private simpleModel = signal({ name: '', bio: '' });
  simpleForm = form(this.simpleModel);

  private validatedModel = signal({ email: '', password: '', role: '' });
  validatedForm = form(this.validatedModel, (s) => {
    required(s.email, { message: 'Email is required' });
    email(s.email, { message: 'Invalid email address' });
    required(s.password, { message: 'Password is required' });
    minLength(s.password, 8, { message: 'Password must be at least 8 characters' });
    required(s.role, { message: 'Role is required' });
  });

  private fullModel = signal({ name: '', email: '', role: '', notes: '' });
  fullForm = form(this.fullModel, (s) => {
    required(s.name, { message: 'Name is required' });
    required(s.email, { message: 'Email is required' });
    email(s.email, { message: 'Invalid email address' });
  });

  private darkModel = signal({ email: '', password: '' });
  darkForm = form(this.darkModel, (s) => {
    required(s.email, { message: 'Email is required' });
    required(s.password, { message: 'Password is required' });
    minLength(s.password, 8, { message: 'Password must be at least 8 characters' });
  });

  private pastelModel = signal({ name: '', bio: '' });
  pastelForm = form(this.pastelModel, (s) => {
    required(s.bio, { message: 'Bio is required' });
  });
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
    moduleMetadata({ imports: [UiInputComponent, FormField] }),
  ],
  args: {
    label: 'Field label',
    hint: 'Helper text',
  },
  render: (args) => ({
    props: {
      ...args,
      model: signal({ value: '' }),
    },
    template: `
      <div class="max-w-sm">
        <ui-form-field [label]="label" [hint]="hint">
          <ui-input placeholder="Type something..." />
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
