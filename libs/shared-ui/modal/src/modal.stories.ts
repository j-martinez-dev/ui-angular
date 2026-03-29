import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, inject, input, TemplateRef, viewChild } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { UiButtonComponent } from '@ui/shared-ui/button';
import { UiModalComponent } from './modal.component';
import { UiModalService } from './modal.service';
import { UiModalRef } from './modal-ref';
import { UI_MODAL_DATA, type ModalSize } from './modal.types';

// ── Dynamic components used in stories ────────────────────────────────────────

@Component({
  selector: 'story-dynamic-content',
  imports: [UiButtonComponent],
  template: `
    <p class="ui-body-md">{{ data.message }}</p>
    <div class="flex justify-end gap-2 pt-4" style="border-top: 1px solid var(--color-border-default); margin-top: calc(var(--spacing) * 4);">
      <ui-button variant="ghost" (click)="modalRef.close()">Cancel</ui-button>
      <ui-button variant="primary" (click)="modalRef.close('confirmed')">Confirm</ui-button>
    </div>
  `,
})
class DynamicContentComponent {
  readonly data = inject(UI_MODAL_DATA) as { message: string };
  readonly modalRef = inject(UiModalRef);
}

@Component({
  selector: 'story-scrollable-content',
  imports: [UiButtonComponent],
  template: `
    <div class="flex flex-col gap-4">
      <p class="ui-body-md">This modal has enough content to trigger vertical scrolling. The header stays fixed at the top while the body scrolls independently.</p>
      @for (i of paragraphs; track i) {
        <div style="padding: calc(var(--spacing) * 4); background: var(--color-surface-sunken); border-radius: var(--radius-md);">
          <p class="ui-body-sm" style="font-weight: var(--font-weight-semibold); color: var(--color-text-default);">Section {{ i }}</p>
          <p class="ui-body-sm ui-text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        </div>
      }
      <div class="flex justify-end gap-2 pt-4" style="border-top: 1px solid var(--color-border-default);">
        <ui-button variant="ghost" (click)="modalRef.close()">Cancel</ui-button>
        <ui-button variant="primary" (click)="modalRef.close('confirmed')">Accept</ui-button>
      </div>
    </div>
  `,
})
class ScrollableContentComponent {
  readonly modalRef = inject(UiModalRef);
  readonly paragraphs = Array.from({ length: 12 }, (_, i) => i + 1);
}

// ── Docs ─────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-modal-docs',
  imports: [UiButtonComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Modal</h2>
        <p class="ui-body-md ui-text-muted">
          A dialog overlay managed by UiModalService. Supports TemplateRef and dynamic component
          content, configurable sizes, backdrop dismiss, and keyboard (Escape) closing.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button (click)="openTemplate()">Open with TemplateRef</ui-button>
          <ui-button variant="secondary" (click)="openComponent()">Open with Component</ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">API — ModalConfig</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <th class="ui-body-sm p-2 text-left">Property</th>
              <th class="ui-body-sm p-2 text-left">Type</th>
              <th class="ui-body-sm p-2 text-left">Default</th>
              <th class="ui-body-sm p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">title</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">undefined</td>
              <td class="ui-body-sm p-2">Optional title in the header</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">size</td>
              <td class="ui-code p-2">sm | md | lg | xl | fullscreen</td>
              <td class="ui-code p-2">md</td>
              <td class="ui-body-sm p-2">Modal width</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">data</td>
              <td class="ui-code p-2">unknown</td>
              <td class="ui-code p-2">undefined</td>
              <td class="ui-body-sm p-2">Data injected via UI_MODAL_DATA token</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">closeOnBackdrop</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">true</td>
              <td class="ui-body-sm p-2">Close when clicking the backdrop</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">closeOnEscape</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">true</td>
              <td class="ui-body-sm p-2">Close when pressing Escape</td>
            </tr>
            <tr>
              <td class="ui-code p-2">showCloseButton</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">true</td>
              <td class="ui-body-sm p-2">Show the close button in the header</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>

    <ng-template #tpl>
      <p class="ui-body-md">This content is rendered from a TemplateRef.</p>
    </ng-template>
  `,
})
class ModalDocsComponent {
  private readonly modal = inject(UiModalService);
  private readonly tpl = viewChild<TemplateRef<unknown>>('tpl');

  openTemplate(): void {
    const tpl = this.tpl();
    if (!tpl) return;
    const ref = this.modal.open(tpl, { title: 'Template Modal', size: 'sm' });
    ref.closed$.subscribe(r => console.log('Template closed with:', r));
  }

  openComponent(): void {
    const ref = this.modal.open(DynamicContentComponent, {
      title: 'Confirm Action',
      size: 'sm',
      data: { message: 'Are you sure you want to proceed?' },
    });
    ref.closed$.subscribe(r => console.log('Component closed with:', r));
  }
}

// ── Playground ───────────────────────────────────────────────────────────────

@Component({
  selector: 'story-playground-modal',
  imports: [UiButtonComponent],
  template: `
    <div class="flex justify-center p-20">
      <ui-button (click)="open()">Open Modal</ui-button>
    </div>
  `,
})
class PlaygroundModalComponent {
  modalTitle = input('Playground Modal');
  modalSize = input<ModalSize>('md');
  closeOnBackdrop = input(true);
  closeOnEscape = input(true);
  showCloseButton = input(true);

  private readonly modal = inject(UiModalService);

  open(): void {
    this.modal.open(DynamicContentComponent, {
      title: this.modalTitle(),
      size: this.modalSize(),
      closeOnBackdrop: this.closeOnBackdrop(),
      closeOnEscape: this.closeOnEscape(),
      showCloseButton: this.showCloseButton(),
      data: { message: 'This is the playground modal. Adjust controls to change behavior.' },
    });
  }
}

// ── Variants ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-modal-variants',
  imports: [UiButtonComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-4">
        <p class="ui-overline">Sizes</p>
        <div class="flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (s of sizes; track s) {
            <ui-button variant="secondary" (click)="openSize(s)">{{ s }}</ui-button>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Without title</p>
        <div class="flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button variant="secondary" (click)="openNoTitle()">No title</ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">No close button</p>
        <div class="flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button variant="secondary" (click)="openNoClose()">No close button</ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Scrollable content</p>
        <div class="flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button variant="secondary" (click)="openScrollable()">Open scrollable</ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Backdrop dismiss disabled</p>
        <div class="flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button variant="secondary" (click)="openPersistent()">Persistent modal</ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Dark</p>
        <div class="theme-dark flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <ui-button variant="secondary" (click)="openSize('md')">Open in dark</ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Theme — Pastel</p>
        <div class="theme-pastel flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-base); color: var(--color-text-default); border-radius: var(--radius-md);">
          <ui-button variant="secondary" (click)="openSize('md')">Open in pastel</ui-button>
        </div>
      </section>
    </div>
  `,
})
class ModalVariantsComponent {
  private readonly modal = inject(UiModalService);
  sizes: ModalSize[] = ['sm', 'md', 'lg', 'xl', 'fullscreen'];

  openSize(size: ModalSize): void {
    this.modal.open(DynamicContentComponent, {
      title: `Size: ${size}`,
      size,
      data: { message: `This modal uses the "${size}" size.` },
    });
  }

  openNoTitle(): void {
    this.modal.open(DynamicContentComponent, {
      data: { message: 'This modal has no title.' },
    });
  }

  openNoClose(): void {
    this.modal.open(DynamicContentComponent, {
      title: 'No close button',
      showCloseButton: false,
      data: { message: 'Use the footer buttons to close.' },
    });
  }

  openScrollable(): void {
    this.modal.open(ScrollableContentComponent, {
      title: 'Terms & Conditions',
      size: 'md',
    });
  }

  openPersistent(): void {
    this.modal.open(DynamicContentComponent, {
      title: 'Persistent',
      closeOnBackdrop: false,
      closeOnEscape: false,
      data: { message: 'Backdrop and Escape are disabled. Use footer buttons.' },
    });
  }
}

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<UiModalComponent> = {
  title: 'Shared UI/Modal',
  component: UiModalComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons({ heroXMark })],
    }),
    moduleMetadata({
      imports: [UiModalComponent, UiButtonComponent, DynamicContentComponent, ScrollableContentComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<UiModalComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [ModalDocsComponent] }),
  ],
  render: () => ({
    template: `<story-modal-docs />`,
  }),
};

export const Playground: Story = {
  decorators: [
    moduleMetadata({ imports: [PlaygroundModalComponent] }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'fullscreen'],
    },
  },
  args: {
    title: 'Playground Modal',
    size: 'md',
    closeOnBackdrop: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <story-playground-modal
        [modalTitle]="title"
        [modalSize]="size"
        [closeOnBackdrop]="closeOnBackdrop"
        [closeOnEscape]="closeOnEscape"
        [showCloseButton]="showCloseButton"
      />
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [ModalVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-modal-variants />`,
  }),
};
