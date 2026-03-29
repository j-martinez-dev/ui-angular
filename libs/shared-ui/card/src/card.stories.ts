import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroHeart,
  heroShare,
  heroEllipsisHorizontal,
} from '@ng-icons/heroicons/outline';
import { UiCardComponent, type CardVariant } from './card.component';
import { UiButtonComponent } from '@ui/shared-ui/button';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';

const icons = {
  heroHeart,
  heroShare,
  heroEllipsisHorizontal,
};

const VARIANTS: CardVariant[] = ['elevated', 'outlined', 'flat'];

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-card-docs',
  imports: [UiCardComponent, UiButtonComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Card</h2>
        <p class="ui-body-md ui-text-muted">
          Conteneur flexible avec en-tête, corps et pied de page optionnels.
          Disponible en trois variantes : élevée, encadrée et plate.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Utilisation</h3>
        <div class="flex gap-4" style="max-width: 400px;">
          <ui-card variant="elevated">
            <div slot="header">
              <h3 class="ui-h5">Titre de la carte</h3>
            </div>
            <p class="ui-body-md ui-text-muted">Contenu descriptif de la carte avec des informations utiles.</p>
            <div slot="footer" class="flex justify-end gap-2">
              <ui-button variant="ghost" size="sm">Annuler</ui-button>
              <ui-button variant="primary" size="sm">Confirmer</ui-button>
            </div>
          </ui-card>
        </div>
        <code class="ui-code">&lt;ui-card variant="elevated"&gt;...&lt;/ui-card&gt;</code>
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
              <td class="ui-code p-2">variant</td>
              <td class="ui-code p-2">elevated | outlined | flat</td>
              <td class="ui-code p-2">elevated</td>
              <td class="ui-body-sm p-2">Style visuel</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">clickable</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Rend la carte interactive</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Désactive les interactions</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">image</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">undefined</td>
              <td class="ui-body-sm p-2">URL de l'image en haut</td>
            </tr>
            <tr>
              <td class="ui-code p-2">imageAlt</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">''</td>
              <td class="ui-body-sm p-2">Texte alternatif de l'image</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class CardDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-card-variants',
  imports: [UiCardComponent, UiButtonComponent, UiIconButtonComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Variantes</p>
        <div class="flex gap-4 flex-wrap">
          @for (variant of variants; track variant) {
            <ui-card [variant]="variant" style="width: 280px;">
              <div slot="header">
                <h3 class="ui-h5">{{ variant }}</h3>
              </div>
              <p class="ui-body-sm ui-text-muted">Carte avec la variante {{ variant }}.</p>
              <div slot="footer" class="flex justify-end">
                <ui-button variant="primary" size="sm">Action</ui-button>
              </div>
            </ui-card>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Cliquable</p>
        <div class="flex gap-4 flex-wrap">
          @for (variant of variants; track variant) {
            <ui-card [variant]="variant" [clickable]="true" style="width: 280px;">
              <div slot="header">
                <h3 class="ui-h5">{{ variant }} — cliquable</h3>
              </div>
              <p class="ui-body-sm ui-text-muted">Survolez pour voir l'effet de hover.</p>
            </ui-card>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Désactivée</p>
        <div class="flex gap-4 flex-wrap">
          @for (variant of variants; track variant) {
            <ui-card [variant]="variant" [disabled]="true" style="width: 280px;">
              <div slot="header">
                <h3 class="ui-h5">{{ variant }} — désactivée</h3>
              </div>
              <p class="ui-body-sm ui-text-muted">Carte en état désactivé.</p>
            </ui-card>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Avec image</p>
        <div class="flex gap-4 flex-wrap">
          <ui-card variant="elevated" image="https://picsum.photos/seed/card1/600/340" imageAlt="Aperçu du projet" style="width: 320px;">
            <div slot="header">
              <h3 class="ui-h5">Projet Alpha</h3>
            </div>
            <p class="ui-body-sm ui-text-muted">Description du projet avec image de couverture.</p>
            <div slot="footer" class="flex justify-between items-center">
              <span class="ui-caption">Il y a 3 jours</span>
              <div class="flex gap-1">
                <ui-icon-button icon="heroHeart" label="J'aime" variant="ghost" size="sm" />
                <ui-icon-button icon="heroShare" label="Partager" variant="ghost" size="sm" />
              </div>
            </div>
          </ui-card>
          <ui-card variant="outlined" [clickable]="true" image="https://picsum.photos/seed/card2/600/340" imageAlt="Aperçu du blog" style="width: 320px;">
            <div slot="header">
              <h3 class="ui-h5">Article de blog</h3>
            </div>
            <p class="ui-body-sm ui-text-muted">Un article intéressant à lire. Cliquez pour ouvrir.</p>
          </ui-card>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Corps seul (sans en-tête ni pied de page)</p>
        <div class="flex gap-4 flex-wrap">
          <ui-card variant="outlined" style="width: 280px;">
            <p class="ui-body-md">Carte simple avec uniquement du contenu dans le corps.</p>
          </ui-card>
          <ui-card variant="flat" style="width: 280px;">
            <p class="ui-body-md">Carte plate sans décoration.</p>
          </ui-card>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Thème — Dark</p>
        <div class="theme-dark flex gap-4 flex-wrap p-6" style="background: var(--color-surface-base); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <ui-card [variant]="variant" style="width: 280px;">
              <div slot="header">
                <h3 class="ui-h5">{{ variant }}</h3>
              </div>
              <p class="ui-body-sm ui-text-muted">Carte en thème sombre.</p>
              <div slot="footer" class="flex justify-end">
                <ui-button variant="primary" size="sm">Action</ui-button>
              </div>
            </ui-card>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Thème — Pastel</p>
        <div class="theme-pastel flex gap-4 flex-wrap p-6" style="background: var(--color-surface-base); border-radius: var(--radius-md);">
          @for (variant of variants; track variant) {
            <ui-card [variant]="variant" style="width: 280px;">
              <div slot="header">
                <h3 class="ui-h5">{{ variant }}</h3>
              </div>
              <p class="ui-body-sm ui-text-muted">Carte en thème pastel.</p>
              <div slot="footer" class="flex justify-end">
                <ui-button variant="primary" size="sm">Action</ui-button>
              </div>
            </ui-card>
          }
        </div>
      </section>

    </div>
  `,
})
class CardVariantsComponent {
  variants = VARIANTS;
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiCardComponent> = {
  title: 'Components/Card',
  component: UiCardComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
    },
    clickable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    image: { control: 'text' },
    imageAlt: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<UiCardComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [CardDocsComponent] }),
  ],
  render: () => ({
    template: `<story-card-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    variant: 'elevated',
    clickable: false,
    disabled: false,
    image: undefined,
    imageAlt: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 360px;">
        <ui-card ${argsToTemplate(args)}>
          <div slot="header">
            <h3 class="ui-h5">Titre de la carte</h3>
          </div>
          <p class="ui-body-md ui-text-muted">Contenu descriptif de la carte.</p>
          <div slot="footer" class="flex justify-end gap-2">
            <ui-button variant="ghost" size="sm">Annuler</ui-button>
            <ui-button variant="primary" size="sm">Confirmer</ui-button>
          </div>
        </ui-card>
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [CardVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-card-variants />`,
  }),
};
