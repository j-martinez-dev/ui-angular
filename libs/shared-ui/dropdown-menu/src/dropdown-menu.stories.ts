import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroEllipsisVertical,
  heroPencil,
  heroDocumentDuplicate,
  heroTrash,
  heroArrowDownTray,
  heroShare,
  heroCog6Tooth,
  heroArchiveBox,
  heroEye,
  heroStar,
} from '@ng-icons/heroicons/outline';
import { UiDropdownMenuComponent } from './dropdown-menu.component';
import { UiMenuItemComponent } from './menu-item.component';
import { UiMenuSeparatorComponent } from './menu-separator.component';

const icons = {
  heroEllipsisVertical,
  heroPencil,
  heroDocumentDuplicate,
  heroTrash,
  heroArrowDownTray,
  heroShare,
  heroCog6Tooth,
  heroArchiveBox,
  heroEye,
  heroStar,
};

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-dropdown-docs',
  imports: [UiDropdownMenuComponent, UiMenuItemComponent, UiMenuSeparatorComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Dropdown Menu</h2>
        <p class="ui-body-md ui-text-muted">
          A contextual menu that appears from a trigger button. Uses CDK Overlay for positioning
          and supports keyboard navigation, separators, and danger variants.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex items-center gap-6 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-dropdown-menu label="Row actions">
            <ui-menu-item icon="heroPencil" (itemClick)="noop()">Edit</ui-menu-item>
            <ui-menu-item icon="heroDocumentDuplicate" (itemClick)="noop()">Duplicate</ui-menu-item>
            <ui-menu-separator />
            <ui-menu-item icon="heroTrash" variant="danger" (itemClick)="noop()">Delete</ui-menu-item>
          </ui-dropdown-menu>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Inputs (UiDropdownMenuComponent)</h3>
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
              <td class="ui-code p-2">icon</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">heroEllipsisVertical</td>
              <td class="ui-body-sm p-2">Heroicon name for the trigger button</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">label</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">Open menu</td>
              <td class="ui-body-sm p-2">Aria label for the trigger button</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">triggerVariant</td>
              <td class="ui-code p-2">primary | secondary | ghost | danger</td>
              <td class="ui-code p-2">ghost</td>
              <td class="ui-body-sm p-2">Visual variant of the trigger icon button</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">triggerSize</td>
              <td class="ui-code p-2">sm | md | lg</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Size of the trigger icon button</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">position</td>
              <td class="ui-code p-2">bottom-start | bottom-end | top-start | top-end</td>
              <td class="ui-code p-2">bottom-end</td>
              <td class="ui-body-sm p-2">Preferred position of the menu panel</td>
            </tr>
            <tr>
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the trigger button</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Inputs (UiMenuItemComponent)</h3>
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
              <td class="ui-code p-2">icon</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">undefined</td>
              <td class="ui-body-sm p-2">Optional Heroicon name shown on the left</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">variant</td>
              <td class="ui-code p-2">default | danger</td>
              <td class="ui-code p-2">default</td>
              <td class="ui-body-sm p-2">Visual style — danger uses error color</td>
            </tr>
            <tr>
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the menu item</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class DropdownMenuDocsComponent {
  noop() {}
}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-dropdown-variants',
  imports: [UiDropdownMenuComponent, UiMenuItemComponent, UiMenuSeparatorComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Trigger variants</p>
        <div class="flex flex-wrap items-center gap-6 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (v of triggerVariants; track v) {
            <div class="flex flex-col items-center gap-2">
              <ui-dropdown-menu [label]="v + ' trigger'" [triggerVariant]="v">
                <ui-menu-item icon="heroPencil" (itemClick)="noop()">Edit</ui-menu-item>
                <ui-menu-item icon="heroDocumentDuplicate" (itemClick)="noop()">Duplicate</ui-menu-item>
                <ui-menu-separator />
                <ui-menu-item icon="heroTrash" variant="danger" (itemClick)="noop()">Delete</ui-menu-item>
              </ui-dropdown-menu>
              <span class="ui-caption">{{ v }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Trigger sizes</p>
        <div class="flex flex-wrap items-center gap-6 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (s of sizes; track s) {
            <div class="flex flex-col items-center gap-2">
              <ui-dropdown-menu [label]="s + ' size'" [triggerSize]="s">
                <ui-menu-item icon="heroEye" (itemClick)="noop()">View</ui-menu-item>
                <ui-menu-item icon="heroPencil" (itemClick)="noop()">Edit</ui-menu-item>
              </ui-dropdown-menu>
              <span class="ui-caption">{{ s }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With icons & separator</p>
        <div class="flex flex-wrap items-center gap-6 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-dropdown-menu label="File actions">
            <ui-menu-item icon="heroArrowDownTray" (itemClick)="noop()">Download</ui-menu-item>
            <ui-menu-item icon="heroShare" (itemClick)="noop()">Share</ui-menu-item>
            <ui-menu-item icon="heroStar" (itemClick)="noop()">Favorite</ui-menu-item>
            <ui-menu-separator />
            <ui-menu-item icon="heroArchiveBox" (itemClick)="noop()">Archive</ui-menu-item>
            <ui-menu-item icon="heroTrash" variant="danger" (itemClick)="noop()">Delete</ui-menu-item>
          </ui-dropdown-menu>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Disabled items & disabled trigger</p>
        <div class="flex flex-wrap items-center gap-6 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-dropdown-menu label="With disabled items">
            <ui-menu-item icon="heroPencil" (itemClick)="noop()">Edit</ui-menu-item>
            <ui-menu-item icon="heroShare" [disabled]="true">Share (disabled)</ui-menu-item>
            <ui-menu-separator />
            <ui-menu-item icon="heroTrash" variant="danger" (itemClick)="noop()">Delete</ui-menu-item>
          </ui-dropdown-menu>
          <ui-dropdown-menu label="Disabled trigger" [disabled]="true">
            <ui-menu-item>Unreachable</ui-menu-item>
          </ui-dropdown-menu>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Positions</p>
        <div class="flex flex-wrap items-center justify-center gap-10 p-10" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (p of positions; track p) {
            <div class="flex flex-col items-center gap-2">
              <ui-dropdown-menu [label]="p" [position]="p">
                <ui-menu-item (itemClick)="noop()">Item 1</ui-menu-item>
                <ui-menu-item (itemClick)="noop()">Item 2</ui-menu-item>
              </ui-dropdown-menu>
              <span class="ui-caption">{{ p }}</span>
            </div>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-wrap items-center gap-6 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <ui-dropdown-menu label="Dark menu">
            <ui-menu-item icon="heroPencil" (itemClick)="noop()">Edit</ui-menu-item>
            <ui-menu-item icon="heroCog6Tooth" (itemClick)="noop()">Settings</ui-menu-item>
            <ui-menu-separator />
            <ui-menu-item icon="heroTrash" variant="danger" (itemClick)="noop()">Delete</ui-menu-item>
          </ui-dropdown-menu>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-wrap items-center gap-6 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <ui-dropdown-menu label="Pastel menu">
            <ui-menu-item icon="heroPencil" (itemClick)="noop()">Edit</ui-menu-item>
            <ui-menu-item icon="heroCog6Tooth" (itemClick)="noop()">Settings</ui-menu-item>
            <ui-menu-separator />
            <ui-menu-item icon="heroTrash" variant="danger" (itemClick)="noop()">Delete</ui-menu-item>
          </ui-dropdown-menu>
        </div>
      </section>

    </div>
  `,
})
class DropdownMenuVariantsComponent {
  triggerVariants = ['primary', 'secondary', 'ghost', 'danger'] as const;
  sizes = ['sm', 'md', 'lg'] as const;
  positions = ['bottom-start', 'bottom-end', 'top-start', 'top-end'] as const;
  noop() {}
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiDropdownMenuComponent> = {
  title: 'Shared UI/DropdownMenu',
  component: UiDropdownMenuComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
    moduleMetadata({
      imports: [UiDropdownMenuComponent, UiMenuItemComponent, UiMenuSeparatorComponent],
    }),
  ],
  argTypes: {
    triggerVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    triggerSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    position: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    },
  },
};

export default meta;
type Story = StoryObj<UiDropdownMenuComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [DropdownMenuDocsComponent] }),
  ],
  render: () => ({
    template: `<story-dropdown-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    icon: 'heroEllipsisVertical',
    label: 'Open menu',
    triggerVariant: 'ghost',
    triggerSize: 'md',
    position: 'bottom-end',
    disabled: false,
  },
  render: (args) => ({
    props: { ...args, noop: () => {} },
    template: `
      <div class="flex justify-center p-20">
        <ui-dropdown-menu
          [icon]="icon"
          [label]="label"
          [triggerVariant]="triggerVariant"
          [triggerSize]="triggerSize"
          [position]="position"
          [disabled]="disabled"
        >
          <ui-menu-item icon="heroPencil" (itemClick)="noop()">Edit</ui-menu-item>
          <ui-menu-item icon="heroDocumentDuplicate" (itemClick)="noop()">Duplicate</ui-menu-item>
          <ui-menu-item icon="heroShare" (itemClick)="noop()">Share</ui-menu-item>
          <ui-menu-separator />
          <ui-menu-item icon="heroTrash" variant="danger" (itemClick)="noop()">Delete</ui-menu-item>
        </ui-dropdown-menu>
      </div>
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [DropdownMenuVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-dropdown-variants />`,
  }),
};
