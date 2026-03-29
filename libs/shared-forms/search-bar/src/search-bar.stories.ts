import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass, heroXMark } from '@ng-icons/heroicons/outline';
import { UiSearchBarComponent } from './search-bar.component';

const icons = { heroMagnifyingGlass, heroXMark };

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-search-bar-docs',
  imports: [UiSearchBarComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Search Bar</h2>
        <p class="ui-body-md ui-text-muted">
          A composite search component with a text input, clear button, and search trigger.
          Supports debounced live search, Enter-to-search, and clear events.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 480px;">
          <ui-search-bar placeholder="Search products..." (search)="onSearch($event)" />
          @if (lastSearch()) {
            <p class="ui-caption ui-text-muted mt-2">Last search: "{{ lastSearch() }}"</p>
          }
        </div>
        <code class="ui-code">&lt;ui-search-bar (search)="onSearch($event)" /&gt;</code>
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
              <td class="ui-code p-2">placeholder</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">Search...</td>
              <td class="ui-body-sm p-2">Input placeholder</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Component size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">variant</td>
              <td class="ui-code p-2">outlined | filled | ghost</td>
              <td class="ui-code p-2">outlined</td>
              <td class="ui-body-sm p-2">Input variant</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">debounce</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">0</td>
              <td class="ui-body-sm p-2">Debounce delay in ms (0 = instant)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the component</td>
            </tr>
            <tr>
              <td class="ui-code p-2">value</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">''</td>
              <td class="ui-body-sm p-2">Initial search value</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class SearchBarDocsComponent {
  lastSearch = signal('');
  onSearch(query: string): void {
    this.lastSearch.set(query);
  }
}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-search-bar-variants',
  imports: [UiSearchBarComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variants</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 480px;">
          <ui-search-bar variant="outlined" placeholder="Outlined search..." />
          <ui-search-bar variant="filled" placeholder="Filled search..." />
          <ui-search-bar variant="ghost" placeholder="Ghost search..." />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 480px;">
          <ui-search-bar size="sm" placeholder="Small" />
          <ui-search-bar size="md" placeholder="Medium" />
          <ui-search-bar size="lg" placeholder="Large" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With initial value</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 480px;">
          <ui-search-bar value="Angular components" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Debounced (300ms)</p>
        <div class="flex flex-col gap-2 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 480px;">
          <ui-search-bar [debounce]="300" placeholder="Type to search..." (searchChange)="onLiveSearch($event)" />
          @if (liveQuery()) {
            <p class="ui-caption ui-text-muted">Live: "{{ liveQuery() }}"</p>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Disabled</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md); max-width: 480px;">
          <ui-search-bar [disabled]="true" placeholder="Disabled search" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 480px;">
          <ui-search-bar placeholder="Dark theme search..." />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md); max-width: 480px;">
          <ui-search-bar placeholder="Pastel theme search..." />
        </div>
      </section>

    </div>
  `,
})
class SearchBarVariantsComponent {
  liveQuery = signal('');
  onLiveSearch(query: string): void {
    this.liveQuery.set(query);
  }
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiSearchBarComponent> = {
  title: 'Components/SearchBar',
  component: UiSearchBarComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'ghost'],
    },
    debounce: { control: 'number' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<UiSearchBarComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [SearchBarDocsComponent] }),
  ],
  render: () => ({
    template: `<story-search-bar-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    placeholder: 'Search...',
    size: 'md',
    variant: 'outlined',
    debounce: 0,
    disabled: false,
    value: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-md">
        <ui-search-bar ${argsToTemplate(args)} />
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [SearchBarVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-search-bar-variants />`,
  }),
};
