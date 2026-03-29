import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroCalendarDays,
  heroChevronLeft,
  heroChevronRight,
} from '@ng-icons/heroicons/outline';
import {
  UiDatePickerComponent,
  DatePickerVariant,
  DatePickerSize,
} from './date-picker.component';

const icons = { heroCalendarDays, heroChevronLeft, heroChevronRight };

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-date-picker-docs',
  imports: [UiDatePickerComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Date Picker</h2>
        <p class="ui-body-md ui-text-muted">
          A date selection component with a trigger field and a calendar overlay.
          Supports outlined, filled, and ghost variants, min/max date constraints,
          locale-aware day and month names, and Signal Forms integration.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          <ui-date-picker placeholder="Pick a date" [(value)]="selectedDate" />
          @if (selectedDate()) {
            <p class="ui-caption ui-text-muted">Selected: {{ selectedDate()?.toLocaleDateString('fr-FR') }}</p>
          }
        </div>
        <code class="ui-code">&lt;ui-date-picker [(value)]="date" /&gt;</code>
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
              <td class="ui-code p-2">displayFormat</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">dd/MM/yyyy</td>
              <td class="ui-body-sm p-2">Format for the display value</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">placeholder</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">Select a date</td>
              <td class="ui-body-sm p-2">Placeholder text</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">variant</td>
              <td class="ui-code p-2">outlined | filled | ghost</td>
              <td class="ui-code p-2">outlined</td>
              <td class="ui-body-sm p-2">Visual style</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Trigger size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">locale</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">fr-FR</td>
              <td class="ui-body-sm p-2">Locale for day/month names</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">firstDayOfWeek</td>
              <td class="ui-code p-2">0 | 1</td>
              <td class="ui-code p-2">1</td>
              <td class="ui-body-sm p-2">0 = Sunday, 1 = Monday</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">minDate / maxDate</td>
              <td class="ui-code p-2">Date</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Date constraints</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the component</td>
            </tr>
            <tr>
              <td class="ui-code p-2">invalid</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows error styling</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class DatePickerDocsComponent {
  selectedDate = signal<Date | null>(null);
}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: DatePickerVariant[] = ['outlined', 'filled', 'ghost'];
const SIZES: DatePickerSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-date-picker-variants',
  imports: [UiDatePickerComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variants</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          @for (variant of variants; track variant) {
            <ui-date-picker [variant]="variant" [placeholder]="variant + ' variant'" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          @for (size of sizes; track size) {
            <ui-date-picker [size]="size" [placeholder]="size + ' size'" />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Pre-selected</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          <ui-date-picker [(value)]="preselected" />
          <p class="ui-caption ui-text-muted">{{ preselected()?.toLocaleDateString('fr-FR') }}</p>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With min/max constraints</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          <ui-date-picker [minDate]="minDate" [maxDate]="maxDate" placeholder="Constrained range" />
          <p class="ui-caption ui-text-muted">Range: {{ minDate.toLocaleDateString('fr-FR') }} – {{ maxDate.toLocaleDateString('fr-FR') }}</p>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">English locale, Sunday start</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          <ui-date-picker locale="en-US" [firstDayOfWeek]="0" displayFormat="MM/dd/yyyy" placeholder="Pick a date" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">States</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 320px;">
          <ui-date-picker [disabled]="true" placeholder="Disabled" />
          <ui-date-picker [invalid]="true" placeholder="Invalid" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 320px;">
          <ui-date-picker placeholder="Outlined" />
          <ui-date-picker variant="filled" placeholder="Filled" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 320px;">
          <ui-date-picker placeholder="Outlined" />
          <ui-date-picker variant="filled" placeholder="Filled" />
        </div>
      </section>

    </div>
  `,
})
class DatePickerVariantsComponent {
  variants = VARIANTS;
  sizes = SIZES;
  preselected = signal<Date | null>(new Date(2025, 2, 15));
  minDate = new Date(2025, 0, 1);
  maxDate = new Date(2025, 11, 31);
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiDatePickerComponent> = {
  title: 'Shared Forms/DatePicker',
  component: UiDatePickerComponent,
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
    displayFormat: { control: 'text' },
    locale: { control: 'text' },
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiDatePickerComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [DatePickerDocsComponent] }),
  ],
  render: () => ({
    template: `<story-date-picker-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    placeholder: 'Select a date',
    displayFormat: 'dd/MM/yyyy',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
    disabled: false,
    readonly: false,
    invalid: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-xs"><ui-date-picker ${argsToTemplate(args)} /></div>`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [DatePickerVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-date-picker-variants />`,
  }),
};
