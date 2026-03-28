import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroHome,
  heroUsers,
  heroFolder,
  heroCog6Tooth,
  heroChartBarSquare,
  heroInbox,
  heroBell,
  heroShieldCheck,
  heroChevronLeft,
  heroChevronRight,
  heroQuestionMarkCircle,
} from '@ng-icons/heroicons/outline';
import { UiSidebarComponent } from './sidebar.component';
import { UiAvatarComponent } from '@ui/shared-ui/avatar';
import { type SidebarGroup } from './sidebar.types';

const icons = {
  heroHome,
  heroUsers,
  heroFolder,
  heroCog6Tooth,
  heroChartBarSquare,
  heroInbox,
  heroBell,
  heroShieldCheck,
  heroChevronLeft,
  heroChevronRight,
  heroQuestionMarkCircle,
};

const SAMPLE_GROUPS: SidebarGroup[] = [
  {
    label: 'Général',
    items: [
      { value: 'dashboard', label: 'Tableau de bord', icon: 'heroHome' },
      { value: 'inbox', label: 'Boîte de réception', icon: 'heroInbox', badge: 3 },
      { value: 'analytics', label: 'Analytique', icon: 'heroChartBarSquare' },
    ],
  },
  {
    label: 'Gestion',
    items: [
      { value: 'users', label: 'Utilisateurs', icon: 'heroUsers', badge: '12' },
      { value: 'projects', label: 'Projets', icon: 'heroFolder' },
      { value: 'security', label: 'Sécurité', icon: 'heroShieldCheck', disabled: true },
    ],
  },
  {
    label: 'Système',
    items: [
      { value: 'notifications', label: 'Notifications', icon: 'heroBell' },
      { value: 'settings', label: 'Paramètres', icon: 'heroCog6Tooth' },
      { value: 'help', label: 'Aide', icon: 'heroQuestionMarkCircle' },
    ],
  },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-sidebar-docs',
  imports: [UiSidebarComponent, UiAvatarComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Sidebar</h2>
        <p class="ui-body-md ui-text-muted">
          Barre latérale de navigation avec groupes, icônes, badges et mode réduit.
          Supporte un slot d'en-tête (logo) et un slot de pied de page (profil).
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Utilisation</h3>
        <div style="height: 620px; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
          <ui-sidebar
            [groups]="groups"
            [activeValue]="active()"
            (activeValueChange)="active.set($event)"
          >
            <div slot="header">
              <span class="ui-h4" style="color: var(--color-primary-default);">MonApp</span>
            </div>
            <div slot="footer" class="flex items-center gap-2">
              <ui-avatar initials="JD" color="primary" size="sm" />
              <span class="ui-body-sm">Jean Dupont</span>
            </div>
          </ui-sidebar>
        </div>
        <code class="ui-code">&lt;ui-sidebar [groups]="groups" [activeValue]="active" (activeValueChange)="active = $event"&gt;...&lt;/ui-sidebar&gt;</code>
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
              <td class="ui-code p-2">groups</td>
              <td class="ui-code p-2">SidebarGroup&lt;T&gt;[]</td>
              <td class="ui-code p-2">requis</td>
              <td class="ui-body-sm p-2">Groupes de navigation</td>
            </tr>
            <tr>
              <td class="ui-code p-2">activeValue</td>
              <td class="ui-code p-2">T</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Valeur de l'élément actif</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class SidebarDocsComponent {
  groups = SAMPLE_GROUPS;
  active = signal('dashboard');
}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-sidebar-variants',
  imports: [UiSidebarComponent, UiAvatarComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Étendue — avec en-tête et pied de page</p>
        <div style="height: 620px; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
          <ui-sidebar
            [groups]="groups"
            [activeValue]="active1()"
            (activeValueChange)="active1.set($event)"
          >
            <div slot="header">
              <span class="ui-h4" style="color: var(--color-primary-default);">MonApp</span>
            </div>
            <div slot="footer" class="flex items-center gap-2">
              <ui-avatar initials="JD" color="primary" size="sm" />
              <span class="ui-body-sm">Jean Dupont</span>
            </div>
          </ui-sidebar>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Plusieurs sous-groupes</p>
        <div style="height: 700px; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
          <ui-sidebar
            [groups]="manyGroups"
            [activeValue]="active5()"
            (activeValueChange)="active5.set($event)"
          >
            <div slot="header">
              <span class="ui-h4" style="color: var(--color-primary-default);">AdminPro</span>
            </div>
          </ui-sidebar>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sans groupes nommés</p>
        <div style="height: 400px; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
          <ui-sidebar
            [groups]="flatGroups"
            [activeValue]="active2()"
            (activeValueChange)="active2.set($event)"
          />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Thème — Dark</p>
        <div class="theme-dark" style="height: 620px; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
          <ui-sidebar
            [groups]="groups"
            [activeValue]="active3()"
            (activeValueChange)="active3.set($event)"
          >
            <div slot="header">
              <span class="ui-h4" style="color: var(--color-primary-default);">MonApp</span>
            </div>
            <div slot="footer" class="flex items-center gap-2">
              <ui-avatar initials="MD" color="primary" size="sm" />
              <span class="ui-body-sm">Marie Dubois</span>
            </div>
          </ui-sidebar>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Thème — Pastel</p>
        <div class="theme-pastel" style="height: 620px; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
          <ui-sidebar
            [groups]="groups"
            [activeValue]="active4()"
            (activeValueChange)="active4.set($event)"
          >
            <div slot="header">
              <span class="ui-h4" style="color: var(--color-primary-default);">MonApp</span>
            </div>
            <div slot="footer" class="flex items-center gap-2">
              <ui-avatar initials="PL" color="primary" size="sm" />
              <span class="ui-body-sm">Pierre Leroy</span>
            </div>
          </ui-sidebar>
        </div>
      </section>

    </div>
  `,
})
class SidebarVariantsComponent {
  groups = SAMPLE_GROUPS;
  active1 = signal('dashboard');
  active2 = signal('dashboard');
  active3 = signal('inbox');
  active4 = signal('analytics');
  active5 = signal('overview');

  flatGroups: SidebarGroup[] = [
    {
      items: [
        { value: 'dashboard', label: 'Tableau de bord', icon: 'heroHome' },
        { value: 'inbox', label: 'Boîte de réception', icon: 'heroInbox', badge: 5 },
        { value: 'users', label: 'Utilisateurs', icon: 'heroUsers' },
        { value: 'settings', label: 'Paramètres', icon: 'heroCog6Tooth' },
      ],
    },
  ];

  manyGroups: SidebarGroup[] = [
    {
      label: 'Aperçu',
      items: [
        { value: 'overview', label: 'Vue d\'ensemble', icon: 'heroHome' },
        { value: 'analytics', label: 'Analytique', icon: 'heroChartBarSquare', badge: 'Nouveau' },
      ],
    },
    {
      label: 'Contenu',
      items: [
        { value: 'documents', label: 'Documents', icon: 'heroFolder', badge: 24 },
        { value: 'inbox', label: 'Messages', icon: 'heroInbox', badge: 3 },
      ],
    },
    {
      label: 'Équipe',
      items: [
        { value: 'members', label: 'Membres', icon: 'heroUsers' },
        { value: 'roles', label: 'Rôles et accès', icon: 'heroShieldCheck' },
      ],
    },
    {
      label: 'Configuration',
      items: [
        { value: 'notifications', label: 'Notifications', icon: 'heroBell' },
        { value: 'settings', label: 'Paramètres', icon: 'heroCog6Tooth' },
        { value: 'help', label: 'Centre d\'aide', icon: 'heroQuestionMarkCircle', disabled: true },
      ],
    },
  ];
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiSidebarComponent> = {
  title: 'Components/Sidebar',
  component: UiSidebarComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
};

export default meta;
type Story = StoryObj<UiSidebarComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [SidebarDocsComponent] }),
  ],
  render: () => ({
    template: `<story-sidebar-docs />`,
  }),
};

export const Playground: Story = {
  decorators: [
    moduleMetadata({ imports: [SidebarDocsComponent] }),
  ],
  render: () => ({
    template: `
      <div style="height: 620px; border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
        <story-sidebar-docs />
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [SidebarVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-sidebar-variants />`,
  }),
};
