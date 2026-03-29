import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroChevronLeft, heroChevronRight, heroChevronDown } from '@ng-icons/heroicons/outline';
import { UiPaginationComponent, type PaginationSize } from './pagination.component';

const icons = { heroChevronLeft, heroChevronRight, heroChevronDown };

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-pagination-docs',
  imports: [UiPaginationComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Pagination</h2>
        <p class="ui-body-md ui-text-muted">
          A navigation component for paginated data. Supports page size selection,
          result count info, and truncated page ranges with ellipsis.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-pagination
            [totalItems]="100"
            [pageSize]="10"
            [currentPage]="page()"
            (pageChange)="page.set($event)"
          />
          <p class="ui-caption ui-text-muted">Current page: {{ page() }}</p>
          <code class="ui-code">&lt;ui-pagination [totalItems]="100" [currentPage]="page()" (pageChange)="page.set($event)" /&gt;</code>
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
              <td class="ui-code p-2">totalItems</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">required</td>
              <td class="ui-body-sm p-2">Total number of items</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">pageSize</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">10</td>
              <td class="ui-body-sm p-2">Items per page</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">currentPage</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">1</td>
              <td class="ui-body-sm p-2">Active page (1-based)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">pageSizeOptions</td>
              <td class="ui-code p-2">number[]</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Shows a page size selector</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">showInfo</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows result range text</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Size of controls</td>
            </tr>
            <tr>
              <td class="ui-code p-2">maxVisiblePages</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">5</td>
              <td class="ui-body-sm p-2">Max page buttons before truncation</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class PaginationDocsComponent {
  page = signal(3);
}

// ── Variants ────────────────────────────────────────────────────────────────

const SIZES: PaginationSize[] = ['sm', 'md', 'lg'];

@Component({
  selector: 'story-pagination-variants',
  imports: [UiPaginationComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-col gap-6 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (size of sizes; track size) {
            <div class="flex flex-col gap-1">
              <span class="ui-caption ui-text-muted">{{ size }}</span>
              <ui-pagination [totalItems]="100" [currentPage]="5" [size]="size" />
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With info &amp; page size selector</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-pagination
            [totalItems]="248"
            [pageSize]="pageSizeFull()"
            [currentPage]="pageFull()"
            [pageSizeOptions]="[5, 10, 25, 50]"
            [showInfo]="true"
            (pageChange)="pageFull.set($event)"
            (pageSizeChange)="pageSizeFull.set($event)"
          />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Few pages (no truncation)</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-pagination [totalItems]="30" [pageSize]="10" [currentPage]="2" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Many pages (truncation with ellipsis)</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-pagination [totalItems]="500" [pageSize]="10" [currentPage]="25" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Interactive</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-pagination
            [totalItems]="200"
            [currentPage]="pageInteractive()"
            [showInfo]="true"
            (pageChange)="pageInteractive.set($event)"
          />
          <p class="ui-caption ui-text-muted">Page: {{ pageInteractive() }}</p>
        </div>
      </section>

    </div>
  `,
})
class PaginationVariantsComponent {
  sizes = SIZES;
  pageFull = signal(3);
  pageSizeFull = signal(10);
  pageInteractive = signal(1);
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiPaginationComponent> = {
  title: 'Shared Table/Pagination',
  component: UiPaginationComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    totalItems: {
      control: 'number',
    },
    pageSize: {
      control: 'number',
    },
    currentPage: {
      control: 'number',
    },
    showInfo: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    maxVisiblePages: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<UiPaginationComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [PaginationDocsComponent] }),
  ],
  render: () => ({
    template: `<story-pagination-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    currentPage: 5,
    showInfo: true,
    size: 'md',
    maxVisiblePages: 5,
  },
  render: (args) => ({
    props: args,
    template: `<ui-pagination
      [totalItems]="totalItems"
      [pageSize]="pageSize"
      [currentPage]="currentPage"
      [showInfo]="showInfo"
      [size]="size"
      [maxVisiblePages]="maxVisiblePages"
    />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [PaginationVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-pagination-variants />`,
  }),
};
