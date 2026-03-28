import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroHome,
  heroUsers,
  heroPlus,
  heroArrowDownTray,
  heroCog6Tooth,
  heroChevronRight,
  heroFolder,
  heroDocument,
} from '@ng-icons/heroicons/outline';
import { UiPageHeaderComponent } from './page-header.component';
import { UiButtonComponent } from '@ui/shared-ui/button';
import { type BreadcrumbItem } from '@ui/shared-ui/breadcrumb';

const icons = {
  heroHome,
  heroUsers,
  heroPlus,
  heroArrowDownTray,
  heroCog6Tooth,
  heroChevronRight,
  heroFolder,
  heroDocument,
};

const SAMPLE_BREADCRUMBS: BreadcrumbItem[] = [
  { value: 'home', label: 'Accueil', icon: 'heroHome' },
  { value: 'users', label: 'Utilisateurs' },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-page-header-docs',
  imports: [UiPageHeaderComponent, UiButtonComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Page Header</h2>
        <p class="ui-body-md ui-text-muted">
          En-tête de page avec titre, description optionnelle, fil d'Ariane et zone d'actions.
          Utilisé en haut de chaque page pour donner le contexte et les actions principales.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Utilisation</h3>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-page-header
            title="Utilisateurs"
            description="Gérez les utilisateurs et leurs permissions"
            [breadcrumbs]="breadcrumbs"
          >
            <div slot="actions" class="flex gap-2">
              <ui-button variant="secondary" iconLeft="heroArrowDownTray">Exporter</ui-button>
              <ui-button variant="primary" iconLeft="heroPlus">Nouvel utilisateur</ui-button>
            </div>
          </ui-page-header>
        </div>
        <code class="ui-code">&lt;ui-page-header title="Utilisateurs" [breadcrumbs]="items"&gt;...&lt;/ui-page-header&gt;</code>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Entrées</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <th class="ui-body-sm p-2 text-left">Input</th>
              <th class="ui-body-sm p-2 text-left">Type</th>
              <th class="ui-body-sm p-2 text-left">Défaut</th>
              <th class="ui-body-sm p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">title</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">requis</td>
              <td class="ui-body-sm p-2">Titre principal de la page</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">description</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Texte de support sous le titre</td>
            </tr>
            <tr>
              <td class="ui-code p-2">breadcrumbs</td>
              <td class="ui-code p-2">BreadcrumbItem[]</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Éléments du fil d'Ariane</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class PageHeaderDocsComponent {
  breadcrumbs = SAMPLE_BREADCRUMBS;
}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-page-header-variants',
  imports: [UiPageHeaderComponent, UiButtonComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Complet — titre, description, breadcrumbs, actions</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-page-header
            title="Utilisateurs"
            description="Gérez les utilisateurs et leurs permissions"
            [breadcrumbs]="breadcrumbs"
          >
            <div slot="actions" class="flex gap-2">
              <ui-button variant="secondary" iconLeft="heroArrowDownTray">Exporter</ui-button>
              <ui-button variant="primary" iconLeft="heroPlus">Nouveau</ui-button>
            </div>
          </ui-page-header>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Titre seul</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-page-header title="Tableau de bord" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Titre + description</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-page-header
            title="Paramètres"
            description="Configurez les options de votre application"
          />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Titre + breadcrumbs (sans description)</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-page-header
            title="Documents"
            [breadcrumbs]="deepBreadcrumbs"
          />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Titre + actions (sans breadcrumbs)</p>
        <div class="p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-page-header title="Rapports">
            <div slot="actions">
              <ui-button variant="primary" iconLeft="heroArrowDownTray">Télécharger</ui-button>
            </div>
          </ui-page-header>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Thème — Dark</p>
        <div class="theme-dark p-6" style="background: var(--color-surface-base); border-radius: var(--radius-md);">
          <ui-page-header
            title="Utilisateurs"
            description="Gérez les utilisateurs et leurs permissions"
            [breadcrumbs]="breadcrumbs"
          >
            <div slot="actions" class="flex gap-2">
              <ui-button variant="secondary" iconLeft="heroCog6Tooth">Options</ui-button>
              <ui-button variant="primary" iconLeft="heroPlus">Nouveau</ui-button>
            </div>
          </ui-page-header>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Thème — Pastel</p>
        <div class="theme-pastel p-6" style="background: var(--color-surface-base); border-radius: var(--radius-md);">
          <ui-page-header
            title="Utilisateurs"
            description="Gérez les utilisateurs et leurs permissions"
            [breadcrumbs]="breadcrumbs"
          >
            <div slot="actions" class="flex gap-2">
              <ui-button variant="secondary" iconLeft="heroCog6Tooth">Options</ui-button>
              <ui-button variant="primary" iconLeft="heroPlus">Nouveau</ui-button>
            </div>
          </ui-page-header>
        </div>
      </section>

    </div>
  `,
})
class PageHeaderVariantsComponent {
  breadcrumbs = SAMPLE_BREADCRUMBS;

  deepBreadcrumbs: BreadcrumbItem[] = [
    { value: 'home', label: 'Accueil', icon: 'heroHome' },
    { value: 'projects', label: 'Projets', icon: 'heroFolder' },
    { value: 'docs', label: 'Documents', icon: 'heroDocument' },
  ];
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiPageHeaderComponent> = {
  title: 'Components/PageHeader',
  component: UiPageHeaderComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<UiPageHeaderComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [PageHeaderDocsComponent] }),
  ],
  render: () => ({
    template: `<story-page-header-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    title: 'Utilisateurs',
    description: 'Gérez les utilisateurs et leurs permissions',
    breadcrumbs: SAMPLE_BREADCRUMBS,
  },
  render: (args) => ({
    props: args,
    template: `<ui-page-header ${argsToTemplate(args)} />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [PageHeaderVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-page-header-variants />`,
  }),
};
