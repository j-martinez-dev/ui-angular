import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { UiTableDirective } from './table.directive';
import { UiTableHeaderDirective } from './table-header.directive';
import { UiTableBodyDirective } from './table-body.directive';
import { UiTableFooterDirective } from './table-footer.directive';
import { UiTableRowDirective } from './table-row.directive';
import { UiTableHeadDirective } from './table-head.directive';
import { UiTableCellDirective } from './table-cell.directive';
import { UiBadgeComponent } from '@ui/shared-ui/badge';

const TABLE_IMPORTS = [
  UiTableDirective,
  UiTableHeaderDirective,
  UiTableBodyDirective,
  UiTableFooterDirective,
  UiTableRowDirective,
  UiTableHeadDirective,
  UiTableCellDirective,
];

interface Row {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  statusColor: 'success' | 'warning' | 'error' | 'muted';
  amount: string;
}

const SAMPLE_ROWS: Row[] = [
  { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com', role: 'Admin', status: 'Actif', statusColor: 'success', amount: '1 250 €' },
  { id: 2, name: 'Marie Dubois', email: 'marie.dubois@example.com', role: 'Éditeur', status: 'Actif', statusColor: 'success', amount: '980 €' },
  { id: 3, name: 'Pierre Leroy', email: 'pierre.leroy@example.com', role: 'Lecteur', status: 'Inactif', statusColor: 'muted', amount: '0 €' },
  { id: 4, name: 'Sophie Martin', email: 'sophie.martin@example.com', role: 'Admin', status: 'En attente', statusColor: 'warning', amount: '2 100 €' },
  { id: 5, name: 'Lucas Bernard', email: 'lucas.bernard@example.com', role: 'Éditeur', status: 'Suspendu', statusColor: 'error', amount: '450 €' },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-table-docs',
  imports: [...TABLE_IMPORTS, UiBadgeComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Table</h2>
        <p class="ui-body-md ui-text-muted">
          Directives to style native HTML tables with the design system.
          Preserves full semantics of table, thead, tbody, tfoot, tr, th, td elements.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <table uiTable [hoverable]="true" size="md">
          <thead uiTableHeader>
            <tr uiTableRow>
              <th uiTableHead>Nom</th>
              <th uiTableHead>E-mail</th>
              <th uiTableHead>Rôle</th>
              <th uiTableHead align="center">Statut</th>
              <th uiTableHead align="right">Montant</th>
            </tr>
          </thead>
          <tbody uiTableBody>
            @for (row of rows; track row.id) {
              <tr uiTableRow>
                <td uiTableCell>{{ row.name }}</td>
                <td uiTableCell>{{ row.email }}</td>
                <td uiTableCell>{{ row.role }}</td>
                <td uiTableCell align="center">
                  <ui-badge [color]="row.statusColor" variant="subtle" size="sm">{{ row.status }}</ui-badge>
                </td>
                <td uiTableCell align="right">{{ row.amount }}</td>
              </tr>
            }
          </tbody>
        </table>
        <code class="ui-code">&lt;table uiTable [hoverable]="true" size="md"&gt;...&lt;/table&gt;</code>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Inputs (uiTable)</h3>
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
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Cell padding size</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">striped</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Alternating row backgrounds</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">bordered</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Borders on all cells</td>
            </tr>
            <tr>
              <td class="ui-code p-2">hoverable</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">true</td>
              <td class="ui-body-sm p-2">Highlight rows on hover</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class TableDocsComponent {
  rows = SAMPLE_ROWS;
}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-table-variants',
  imports: [...TABLE_IMPORTS, UiBadgeComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Size — sm</p>
        <table uiTable size="sm" [hoverable]="true">
          <thead uiTableHeader>
            <tr uiTableRow>
              <th uiTableHead>Nom</th>
              <th uiTableHead>E-mail</th>
              <th uiTableHead>Rôle</th>
              <th uiTableHead align="right">Montant</th>
            </tr>
          </thead>
          <tbody uiTableBody>
            @for (row of rows; track row.id) {
              <tr uiTableRow>
                <td uiTableCell>{{ row.name }}</td>
                <td uiTableCell>{{ row.email }}</td>
                <td uiTableCell>{{ row.role }}</td>
                <td uiTableCell align="right">{{ row.amount }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Size — lg</p>
        <table uiTable size="lg" [hoverable]="true">
          <thead uiTableHeader>
            <tr uiTableRow>
              <th uiTableHead>Nom</th>
              <th uiTableHead>E-mail</th>
              <th uiTableHead>Rôle</th>
              <th uiTableHead align="right">Montant</th>
            </tr>
          </thead>
          <tbody uiTableBody>
            @for (row of rows; track row.id) {
              <tr uiTableRow>
                <td uiTableCell>{{ row.name }}</td>
                <td uiTableCell>{{ row.email }}</td>
                <td uiTableCell>{{ row.role }}</td>
                <td uiTableCell align="right">{{ row.amount }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Striped</p>
        <table uiTable [striped]="true" [hoverable]="false">
          <thead uiTableHeader>
            <tr uiTableRow>
              <th uiTableHead>Nom</th>
              <th uiTableHead>E-mail</th>
              <th uiTableHead>Rôle</th>
              <th uiTableHead align="center">Statut</th>
            </tr>
          </thead>
          <tbody uiTableBody>
            @for (row of rows; track row.id) {
              <tr uiTableRow>
                <td uiTableCell>{{ row.name }}</td>
                <td uiTableCell>{{ row.email }}</td>
                <td uiTableCell>{{ row.role }}</td>
                <td uiTableCell align="center">
                  <ui-badge [color]="row.statusColor" variant="subtle" size="sm">{{ row.status }}</ui-badge>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Bordered</p>
        <table uiTable [bordered]="true">
          <thead uiTableHeader>
            <tr uiTableRow>
              <th uiTableHead>Nom</th>
              <th uiTableHead>E-mail</th>
              <th uiTableHead>Rôle</th>
              <th uiTableHead align="right">Montant</th>
            </tr>
          </thead>
          <tbody uiTableBody>
            @for (row of rows; track row.id) {
              <tr uiTableRow>
                <td uiTableCell>{{ row.name }}</td>
                <td uiTableCell>{{ row.email }}</td>
                <td uiTableCell>{{ row.role }}</td>
                <td uiTableCell align="right">{{ row.amount }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Clickable rows</p>
        <table uiTable [hoverable]="true">
          <thead uiTableHeader>
            <tr uiTableRow>
              <th uiTableHead>Nom</th>
              <th uiTableHead>E-mail</th>
              <th uiTableHead>Rôle</th>
            </tr>
          </thead>
          <tbody uiTableBody>
            @for (row of rows; track row.id) {
              <tr uiTableRow
                [clickable]="true"
                [active]="selectedId() === row.id"
                (rowClick)="selectedId.set(row.id)"
              >
                <td uiTableCell>{{ row.name }}</td>
                <td uiTableCell>{{ row.email }}</td>
                <td uiTableCell>{{ row.role }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Column sorting</p>
        <table uiTable [hoverable]="true">
          <thead uiTableHeader>
            <tr uiTableRow>
              <th uiTableHead [sortable]="true" [sortDirection]="sortCol() === 'name' ? sortDir() : null" (sortChange)="onSort('name', $event)">Nom</th>
              <th uiTableHead>E-mail</th>
              <th uiTableHead [sortable]="true" [sortDirection]="sortCol() === 'amount' ? sortDir() : null" (sortChange)="onSort('amount', $event)" align="right">Montant</th>
            </tr>
          </thead>
          <tbody uiTableBody>
            @for (row of rows; track row.id) {
              <tr uiTableRow>
                <td uiTableCell>{{ row.name }}</td>
                <td uiTableCell>{{ row.email }}</td>
                <td uiTableCell align="right">{{ row.amount }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With footer</p>
        <table uiTable>
          <thead uiTableHeader>
            <tr uiTableRow>
              <th uiTableHead>Nom</th>
              <th uiTableHead>Rôle</th>
              <th uiTableHead align="right">Montant</th>
            </tr>
          </thead>
          <tbody uiTableBody>
            @for (row of rows; track row.id) {
              <tr uiTableRow>
                <td uiTableCell>{{ row.name }}</td>
                <td uiTableCell>{{ row.role }}</td>
                <td uiTableCell align="right">{{ row.amount }}</td>
              </tr>
            }
          </tbody>
          <tfoot uiTableFooter>
            <tr uiTableRow>
              <td uiTableCell>Total</td>
              <td uiTableCell></td>
              <td uiTableCell align="right">4 780 €</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark p-6" style="background: var(--color-surface-base); border-radius: var(--radius-md);">
          <table uiTable [hoverable]="true" [striped]="true">
            <thead uiTableHeader>
              <tr uiTableRow>
                <th uiTableHead>Nom</th>
                <th uiTableHead>E-mail</th>
                <th uiTableHead align="center">Statut</th>
                <th uiTableHead align="right">Montant</th>
              </tr>
            </thead>
            <tbody uiTableBody>
              @for (row of rows; track row.id) {
                <tr uiTableRow>
                  <td uiTableCell>{{ row.name }}</td>
                  <td uiTableCell>{{ row.email }}</td>
                  <td uiTableCell align="center">
                    <ui-badge [color]="row.statusColor" variant="subtle" size="sm">{{ row.status }}</ui-badge>
                  </td>
                  <td uiTableCell align="right">{{ row.amount }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel p-6" style="background: var(--color-surface-base); border-radius: var(--radius-md);">
          <table uiTable [hoverable]="true">
            <thead uiTableHeader>
              <tr uiTableRow>
                <th uiTableHead>Nom</th>
                <th uiTableHead>E-mail</th>
                <th uiTableHead align="center">Statut</th>
                <th uiTableHead align="right">Montant</th>
              </tr>
            </thead>
            <tbody uiTableBody>
              @for (row of rows; track row.id) {
                <tr uiTableRow>
                  <td uiTableCell>{{ row.name }}</td>
                  <td uiTableCell>{{ row.email }}</td>
                  <td uiTableCell align="center">
                    <ui-badge [color]="row.statusColor" variant="subtle" size="sm">{{ row.status }}</ui-badge>
                  </td>
                  <td uiTableCell align="right">{{ row.amount }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

    </div>
  `,
})
class TableVariantsComponent {
  rows = SAMPLE_ROWS;
  selectedId = signal<number | null>(null);
  sortCol = signal<string | null>(null);
  sortDir = signal<'asc' | 'desc' | null>(null);

  onSort(col: string, dir: 'asc' | 'desc'): void {
    this.sortCol.set(col);
    this.sortDir.set(dir);
  }
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiTableDirective> = {
  title: 'Shared UI/Table',
  component: UiTableDirective,
};

export default meta;
type Story = StoryObj<UiTableDirective>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [TableDocsComponent] }),
  ],
  render: () => ({
    template: `<story-table-docs />`,
  }),
};

export const Playground: Story = {
  decorators: [
    moduleMetadata({ imports: [TableDocsComponent] }),
  ],
  render: () => ({
    template: `<story-table-docs />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [TableVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-table-variants />`,
  }),
};
