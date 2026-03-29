import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroMagnifyingGlass,
  heroXMark,
  heroCheck,
} from '@ng-icons/heroicons/outline';
import {
  UiAutocompleteComponent,
  type AutocompleteVariant,
  type AutocompleteSize,
} from './autocomplete.component';
import { type SelectOption } from '@ui/shared-forms/select';

const icons = { heroMagnifyingGlass, heroXMark, heroCheck };

const CITY_OPTIONS: SelectOption<string>[] = [
  { label: 'Paris', value: 'paris' },
  { label: 'Lyon', value: 'lyon' },
  { label: 'Marseille', value: 'marseille' },
  { label: 'Toulouse', value: 'toulouse' },
  { label: 'Nice', value: 'nice' },
  { label: 'Nantes', value: 'nantes' },
  { label: 'Montpellier', value: 'montpellier' },
  { label: 'Strasbourg', value: 'strasbourg' },
  { label: 'Bordeaux', value: 'bordeaux' },
  { label: 'Lille', value: 'lille' },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-autocomplete-docs',
  imports: [UiAutocompleteComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Autocomplete</h2>
        <p class="ui-body-md ui-text-muted">
          A search-driven selection component that filters options as the user types.
          Emits a search event with debounce so consumers can provide suggestions asynchronously.
          Value is only set via option selection — free text is not accepted.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-4 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-autocomplete
            [options]="filteredCities()"
            placeholder="Rechercher une ville..."
            label="City"
            (search)="onSearch($event)"
          />
          <code class="ui-code">&lt;ui-autocomplete [options]="cities" (search)="onSearch($event)" /&gt;</code>
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
              <td class="ui-code p-2">options</td>
              <td class="ui-code p-2">SelectOption&lt;T&gt;[]</td>
              <td class="ui-code p-2">[]</td>
              <td class="ui-body-sm p-2">List of suggestions</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">placeholder</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">Rechercher...</td>
              <td class="ui-body-sm p-2">Placeholder text</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">debounce</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">300</td>
              <td class="ui-body-sm p-2">Debounce delay in ms before emitting search</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">loading</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows spinner while suggestions load</td>
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
              <td class="ui-body-sm p-2">Input size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">label</td>
              <td class="ui-code p-2">string | undefined</td>
              <td class="ui-code p-2">undefined</td>
              <td class="ui-body-sm p-2">Accessible name (aria-label)</td>
            </tr>
            <tr>
              <td class="ui-code p-2">noResultsLabel</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">Aucun résultat</td>
              <td class="ui-body-sm p-2">Text shown when no suggestions</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Outputs</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <th class="ui-body-sm p-2 text-left">Output</th>
              <th class="ui-body-sm p-2 text-left">Type</th>
              <th class="ui-body-sm p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="ui-code p-2">search</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">Emitted with debounce as the user types</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class AutocompleteDocsComponent {
  private allCities = CITY_OPTIONS;
  filteredCities = signal<SelectOption<string>[]>([]);

  onSearch(query: string): void {
    const q = query.toLowerCase();
    this.filteredCities.set(
      this.allCities.filter(c => c.label.toLowerCase().includes(q)),
    );
  }
}

// ── Variants ────────────────────────────────────────────────────────────────

const VARIANTS: AutocompleteVariant[] = ['outlined', 'filled', 'ghost'];
const SIZES: AutocompleteSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-autocomplete-variants',
  imports: [UiAutocompleteComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variants</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          @for (variant of variants; track variant) {
            <ui-autocomplete
              [variant]="variant"
              [options]="filteredCities()"
              [placeholder]="'Variant: ' + variant"
              label="City"
              (search)="onSearch($event)"
            />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          @for (size of sizes; track size) {
            <ui-autocomplete
              [size]="size"
              [options]="filteredCities()"
              [placeholder]="'Size: ' + size"
              label="City"
              (search)="onSearch($event)"
            />
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">States</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-autocomplete [disabled]="true" placeholder="Disabled" label="Disabled" />
          <ui-autocomplete [readonly]="true" placeholder="Readonly" label="Readonly" />
          <ui-autocomplete [invalid]="true" placeholder="Invalid" label="Invalid" [options]="filteredCities()" (search)="onSearch($event)" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Loading</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 400px;">
          <ui-autocomplete
            [options]="[]"
            [loading]="true"
            placeholder="Searching..."
            label="Loading"
          />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-autocomplete [options]="filteredCities()" placeholder="Rechercher..." label="City" (search)="onSearch($event)" />
          <ui-autocomplete [options]="filteredCities()" variant="filled" placeholder="Rechercher..." label="City" (search)="onSearch($event)" />
          <ui-autocomplete [options]="filteredCities()" variant="ghost" placeholder="Rechercher..." label="City" (search)="onSearch($event)" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-col gap-3 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 400px;">
          <ui-autocomplete [options]="filteredCities()" placeholder="Rechercher..." label="City" (search)="onSearch($event)" />
          <ui-autocomplete [options]="filteredCities()" variant="filled" placeholder="Rechercher..." label="City" (search)="onSearch($event)" />
          <ui-autocomplete [options]="filteredCities()" variant="ghost" placeholder="Rechercher..." label="City" (search)="onSearch($event)" />
        </div>
      </section>

    </div>
  `,
})
class AutocompleteVariantsComponent {
  variants = VARIANTS;
  sizes = SIZES;

  private allCities = CITY_OPTIONS;
  filteredCities = signal<SelectOption<string>[]>([]);

  onSearch(query: string): void {
    const q = query.toLowerCase();
    this.filteredCities.set(
      this.allCities.filter(c => c.label.toLowerCase().includes(q)),
    );
  }
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiAutocompleteComponent> = {
  title: 'Shared Forms/Autocomplete',
  component: UiAutocompleteComponent,
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
    label: { control: 'text' },
    debounce: { control: 'number' },
    loading: { control: 'boolean' },
    noResultsLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiAutocompleteComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [AutocompleteDocsComponent] }),
  ],
  render: () => ({
    template: `<story-autocomplete-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    placeholder: 'Rechercher une ville...',
    label: 'City',
    debounce: 300,
    loading: false,
    noResultsLabel: 'Aucun résultat',
    disabled: false,
    readonly: false,
    invalid: false,
  },
  render: (args) => ({
    props: {
      ...args,
      options: CITY_OPTIONS,
    },
    template: `<div class="max-w-sm"><ui-autocomplete
      [variant]="variant"
      [size]="size"
      [placeholder]="placeholder"
      [label]="label"
      [debounce]="debounce"
      [loading]="loading"
      [noResultsLabel]="noResultsLabel"
      [disabled]="disabled"
      [readonly]="readonly"
      [invalid]="invalid"
      [options]="options"
    /></div>`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [AutocompleteVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-autocomplete-variants />`,
  }),
};
