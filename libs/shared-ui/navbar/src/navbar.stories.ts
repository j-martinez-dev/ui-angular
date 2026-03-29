import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroHome,
  heroUsers,
  heroCog6Tooth,
  heroChartBarSquare,
  heroBell,
  heroInbox,
  heroBars3,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { UiNavbarComponent } from './navbar.component';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import { UiAvatarComponent } from '@ui/shared-ui/avatar';
import { UiBadgeComponent } from '@ui/shared-ui/badge';
import { type NavbarItem } from './navbar.types';

const icons = {
  heroHome,
  heroUsers,
  heroCog6Tooth,
  heroChartBarSquare,
  heroBell,
  heroInbox,
  heroBars3,
  heroXMark,
};

const SAMPLE_ITEMS: NavbarItem[] = [
  { value: 'dashboard', label: 'Tableau de bord', icon: 'heroHome' },
  { value: 'users', label: 'Utilisateurs', icon: 'heroUsers' },
  { value: 'analytics', label: 'Analytique', icon: 'heroChartBarSquare' },
  { value: 'inbox', label: 'Messages', icon: 'heroInbox' },
  { value: 'settings', label: 'Paramètres', icon: 'heroCog6Tooth' },
];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-navbar-docs',
  imports: [UiNavbarComponent, UiIconButtonComponent, UiAvatarComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Navbar</h2>
        <p class="ui-body-md ui-text-muted">
          Horizontal navigation bar with links, brand area, and actions.
          Responsive with hamburger menu on mobile.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div style="border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
          <ui-navbar
            [items]="items"
            [activeValue]="active()"
            (activeValueChange)="active.set($event)"
          >
            <div slot="brand">
              <span class="ui-h4" style="color: var(--color-primary-default);">MonApp</span>
            </div>
            <div slot="actions" class="flex items-center gap-2">
              <ui-icon-button icon="heroBell" label="Notifications" variant="ghost" />
              <ui-avatar initials="JD" color="primary" size="sm" />
            </div>
          </ui-navbar>
        </div>
        <code class="ui-code">&lt;ui-navbar [items]="items" [activeValue]="active" (activeValueChange)="active = $event"&gt;...&lt;/ui-navbar&gt;</code>
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
              <td class="ui-code p-2">items</td>
              <td class="ui-code p-2">NavbarItem&lt;T&gt;[]</td>
              <td class="ui-code p-2">[]</td>
              <td class="ui-body-sm p-2">Navigation links</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">activeValue</td>
              <td class="ui-code p-2">T</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">Currently active item value</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">position</td>
              <td class="ui-code p-2">static | fixed</td>
              <td class="ui-code p-2">static</td>
              <td class="ui-body-sm p-2">Navbar position</td>
            </tr>
            <tr>
              <td class="ui-code p-2">transparent</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Transparent background</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class NavbarDocsComponent {
  items = SAMPLE_ITEMS;
  active = signal('dashboard');
}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-navbar-variants',
  imports: [UiNavbarComponent, UiIconButtonComponent, UiAvatarComponent, UiBadgeComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Standard — with brand and actions</p>
        <div style="border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
          <ui-navbar
            [items]="items"
            [activeValue]="active1()"
            (activeValueChange)="active1.set($event)"
          >
            <div slot="brand">
              <span class="ui-h4" style="color: var(--color-primary-default);">MonApp</span>
            </div>
            <div slot="actions" class="flex items-center gap-2">
              <ui-icon-button icon="heroBell" label="Notifications" variant="ghost" />
              <ui-avatar initials="JD" color="primary" size="sm" />
            </div>
          </ui-navbar>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Without icons</p>
        <div style="border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
          <ui-navbar
            [items]="itemsNoIcons"
            [activeValue]="active2()"
            (activeValueChange)="active2.set($event)"
          >
            <div slot="brand">
              <span class="ui-h4" style="color: var(--color-primary-default);">Portail</span>
            </div>
          </ui-navbar>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With disabled item</p>
        <div style="border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
          <ui-navbar
            [items]="itemsWithDisabled"
            [activeValue]="active3()"
            (activeValueChange)="active3.set($event)"
          >
            <div slot="brand">
              <span class="ui-h4" style="color: var(--color-primary-default);">Admin</span>
            </div>
          </ui-navbar>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Transparent — for hero sections</p>
        <div style="border-radius: var(--radius-md); overflow: hidden; background: linear-gradient(135deg, var(--color-primary-subtle), var(--color-info-subtle)); padding-bottom: 80px;">
          <ui-navbar
            [items]="items"
            [activeValue]="active4()"
            [transparent]="true"
            (activeValueChange)="active4.set($event)"
          >
            <div slot="brand">
              <span class="ui-h4" style="color: var(--color-text-default);">MonApp</span>
            </div>
            <div slot="actions" class="flex items-center gap-2">
              <ui-avatar initials="JD" color="primary" size="sm" />
            </div>
          </ui-navbar>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark" style="border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
          <ui-navbar
            [items]="items"
            [activeValue]="active5()"
            (activeValueChange)="active5.set($event)"
          >
            <div slot="brand">
              <span class="ui-h4" style="color: var(--color-primary-default);">MonApp</span>
            </div>
            <div slot="actions" class="flex items-center gap-2">
              <ui-icon-button icon="heroBell" label="Notifications" variant="ghost" />
              <ui-avatar initials="MD" color="primary" size="sm" />
            </div>
          </ui-navbar>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel" style="border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
          <ui-navbar
            [items]="items"
            [activeValue]="active6()"
            (activeValueChange)="active6.set($event)"
          >
            <div slot="brand">
              <span class="ui-h4" style="color: var(--color-primary-default);">MonApp</span>
            </div>
            <div slot="actions" class="flex items-center gap-2">
              <ui-icon-button icon="heroBell" label="Notifications" variant="ghost" />
              <ui-avatar initials="PL" color="primary" size="sm" />
            </div>
          </ui-navbar>
        </div>
      </section>

    </div>
  `,
})
class NavbarVariantsComponent {
  items = SAMPLE_ITEMS;
  active1 = signal('dashboard');
  active2 = signal('home');
  active3 = signal('dashboard');
  active4 = signal('dashboard');
  active5 = signal('analytics');
  active6 = signal('users');

  itemsNoIcons: NavbarItem[] = [
    { value: 'home', label: 'Accueil' },
    { value: 'products', label: 'Produits' },
    { value: 'pricing', label: 'Tarifs' },
    { value: 'about', label: 'À propos' },
    { value: 'contact', label: 'Contact' },
  ];

  itemsWithDisabled: NavbarItem[] = [
    { value: 'dashboard', label: 'Tableau de bord', icon: 'heroHome' },
    { value: 'users', label: 'Utilisateurs', icon: 'heroUsers' },
    { value: 'analytics', label: 'Analytique', icon: 'heroChartBarSquare', disabled: true },
    { value: 'settings', label: 'Paramètres', icon: 'heroCog6Tooth' },
  ];
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiNavbarComponent> = {
  title: 'Components/Navbar',
  component: UiNavbarComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
};

export default meta;
type Story = StoryObj<UiNavbarComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [NavbarDocsComponent] }),
  ],
  render: () => ({
    template: `<story-navbar-docs />`,
  }),
};

export const Playground: Story = {
  decorators: [
    moduleMetadata({ imports: [NavbarDocsComponent] }),
  ],
  render: () => ({
    template: `
      <div style="border: 1px solid var(--color-border-default); border-radius: var(--radius-md); overflow: hidden;">
        <story-navbar-docs />
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [NavbarVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-navbar-variants />`,
  }),
};
