import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroEye,
  heroEyeSlash,
  heroExclamationCircle,
} from '@ng-icons/heroicons/outline';
import {
  form,
  FormField,
  required,
  minLength,
} from '@angular/forms/signals';
import { UiPasswordComponent } from './password.component';
import { UiFormFieldComponent } from '@ui/shared-forms/form-field';

const icons = { heroEye, heroEyeSlash, heroExclamationCircle };

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-password-docs',
  imports: [UiPasswordComponent, UiFormFieldComponent, FormField],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Password</h2>
        <p class="ui-body-md ui-text-muted">
          A password input with toggle visibility and optional strength indicator.
          Implements FormValueControl for Signal Forms integration.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Mot de passe">
            <ui-password [formField]="demoForm.password" [showStrength]="true" />
          </ui-form-field>
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
              <td class="ui-code p-2">variant</td>
              <td class="ui-code p-2">'outlined' | 'filled' | 'ghost'</td>
              <td class="ui-code p-2">'outlined'</td>
              <td class="ui-body-sm p-2">Visual style</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">'sm' | 'md' | 'lg'</td>
              <td class="ui-code p-2">'md'</td>
              <td class="ui-body-sm p-2">Component size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">placeholder</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">'Mot de passe'</td>
              <td class="ui-body-sm p-2">Placeholder text</td>
            </tr>
            <tr>
              <td class="ui-code p-2">showStrength</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows password strength indicator</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class PasswordDocsComponent {
  private model = signal({ password: '' });
  demoForm = form(this.model, (s) => {
    required(s.password, { message: 'Le mot de passe est requis' });
    minLength(s.password, 8, { message: '8 caractères minimum' });
  });
}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-password-variants',
  imports: [UiPasswordComponent, UiFormFieldComponent, FormField],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Default</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Mot de passe">
            <ui-password [formField]="basicForm.password" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With strength indicator</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Mot de passe">
            <ui-password [formField]="strengthForm.password" [showStrength]="true" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Small">
            <ui-password [formField]="sizesForm.sm" size="sm" />
          </ui-form-field>
          <ui-form-field label="Medium">
            <ui-password [formField]="sizesForm.md" size="md" />
          </ui-form-field>
          <ui-form-field label="Large">
            <ui-password [formField]="sizesForm.lg" size="lg" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variants</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Outlined">
            <ui-password [formField]="variantsForm.outlined" variant="outlined" />
          </ui-form-field>
          <ui-form-field label="Filled">
            <ui-password [formField]="variantsForm.filled" variant="filled" />
          </ui-form-field>
          <ui-form-field label="Ghost">
            <ui-password [formField]="variantsForm.ghost" variant="ghost" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With validation</p>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Mot de passe">
            <ui-password [formField]="validatedForm.password" [showStrength]="true" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-col gap-4 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Mot de passe">
            <ui-password [formField]="darkForm.password" [showStrength]="true" />
          </ui-form-field>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-col gap-4 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-form-field label="Mot de passe">
            <ui-password [formField]="pastelForm.password" [showStrength]="true" />
          </ui-form-field>
        </div>
      </section>

    </div>
  `,
})
class PasswordVariantsComponent {
  private basicModel = signal({ password: '' });
  basicForm = form(this.basicModel);

  private strengthModel = signal({ password: '' });
  strengthForm = form(this.strengthModel);

  private sizesModel = signal({ sm: '', md: '', lg: '' });
  sizesForm = form(this.sizesModel);

  private variantsModel = signal({ outlined: '', filled: '', ghost: '' });
  variantsForm = form(this.variantsModel);

  private validatedModel = signal({ password: '' });
  validatedForm = form(this.validatedModel, (s) => {
    required(s.password, { message: 'Le mot de passe est requis' });
    minLength(s.password, 8, { message: '8 caractères minimum' });
  });

  private darkModel = signal({ password: '' });
  darkForm = form(this.darkModel, (s) => {
    required(s.password, { message: 'Le mot de passe est requis' });
  });

  private pastelModel = signal({ password: '' });
  pastelForm = form(this.pastelModel, (s) => {
    required(s.password, { message: 'Le mot de passe est requis' });
  });
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiPasswordComponent> = {
  title: 'Shared Forms/Password',
  component: UiPasswordComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    placeholder: { control: 'text' },
    showStrength: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiPasswordComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [PasswordDocsComponent] }),
  ],
  render: () => ({
    template: `<story-password-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    placeholder: 'Mot de passe',
    showStrength: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-sm">
        <ui-password
          [variant]="variant"
          [size]="size"
          [placeholder]="placeholder"
          [showStrength]="showStrength"
        />
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [PasswordVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-password-variants />`,
  }),
};
