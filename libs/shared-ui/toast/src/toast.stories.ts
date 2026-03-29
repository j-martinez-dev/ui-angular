import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, inject, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroInformationCircle,
  heroCheckCircle,
  heroExclamationTriangle,
  heroXCircle,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { UiButtonComponent } from '@ui/shared-ui/button';
import { UiToastComponent } from './toast.component';
import { UiToastContainerComponent } from './toast-container.component';
import { UiToastService } from './toast.service';
import { type ToastPosition, type ToastType } from './toast.types';

const icons = {
  heroInformationCircle,
  heroCheckCircle,
  heroExclamationTriangle,
  heroXCircle,
  heroXMark,
};

// ── Docs ─────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-toast-docs',
  imports: [UiButtonComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">Toast</h2>
        <p class="ui-body-md ui-text-muted">
          Non-blocking notifications triggered via UiToastService. Supports five types,
          auto-dismiss, action buttons, and configurable positioning.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Usage</h3>
        <div class="flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button (click)="showDefault()">Default</ui-button>
          <ui-button variant="secondary" (click)="showSuccess()">Success</ui-button>
          <ui-button variant="secondary" (click)="showWarning()">Warning</ui-button>
          <ui-button variant="secondary" (click)="showError()">Error</ui-button>
          <ui-button variant="secondary" (click)="showInfo()">Info</ui-button>
          <ui-button variant="ghost" (click)="showWithAction()">With Action</ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">API — ToastConfig</h3>
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
              <td class="ui-code p-2">message</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">—</td>
              <td class="ui-body-sm p-2">Toast message text (required)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">type</td>
              <td class="ui-code p-2">default | success | warning | error | info</td>
              <td class="ui-code p-2">default</td>
              <td class="ui-body-sm p-2">Visual style and icon</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">duration</td>
              <td class="ui-code p-2">number</td>
              <td class="ui-code p-2">4000</td>
              <td class="ui-body-sm p-2">Auto-dismiss after ms (0 = persistent)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">actionLabel</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">undefined</td>
              <td class="ui-body-sm p-2">Optional action button text</td>
            </tr>
            <tr>
              <td class="ui-code p-2">onAction</td>
              <td class="ui-code p-2">() => void</td>
              <td class="ui-code p-2">undefined</td>
              <td class="ui-body-sm p-2">Callback when action is clicked</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class ToastDocsComponent {
  private readonly toast = inject(UiToastService);

  showDefault(): void {
    this.toast.show({ message: 'This is a default notification.' });
  }

  showSuccess(): void {
    this.toast.show({ message: 'Changes saved successfully.', type: 'success' });
  }

  showWarning(): void {
    this.toast.show({ message: 'Storage is almost full.', type: 'warning' });
  }

  showError(): void {
    this.toast.show({ message: 'Failed to save changes.', type: 'error' });
  }

  showInfo(): void {
    this.toast.show({ message: 'A new version is available.', type: 'info' });
  }

  showWithAction(): void {
    this.toast.show({
      message: 'Item deleted.',
      actionLabel: 'Undo',
      onAction: () => console.log('Undo clicked'),
      duration: 6000,
    });
  }
}

// ── Playground ───────────────────────────────────────────────────────────────

@Component({
  selector: 'story-playground-toast',
  imports: [UiButtonComponent],
  template: `
    <div class="flex justify-center p-20">
      <ui-button (click)="show()">Show Toast</ui-button>
    </div>
  `,
})
class PlaygroundToastComponent {
  toastMessage = input('Something happened.');
  toastType = input<ToastType>('default');
  toastDuration = input(4000);
  toastPosition = input<ToastPosition>('bottom-right');

  private readonly toast = inject(UiToastService);

  show(): void {
    this.toast.configure({ position: this.toastPosition() });
    this.toast.show({
      message: this.toastMessage(),
      type: this.toastType(),
      duration: this.toastDuration(),
    });
  }
}

// ── Variants ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-toast-variants',
  imports: [UiButtonComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-4">
        <p class="ui-overline">Types</p>
        <div class="flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (t of types; track t) {
            <ui-button variant="secondary" (click)="showType(t)">{{ t }}</ui-button>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With action</p>
        <div class="flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button variant="secondary" (click)="showAction()">With undo action</ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Persistent (duration: 0)</p>
        <div class="flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button variant="secondary" (click)="showPersistent()">Persistent toast</ui-button>
          <ui-button variant="ghost" (click)="dismissAll()">Dismiss all</ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Positions</p>
        <div class="flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          @for (p of positions; track p) {
            <ui-button variant="secondary" (click)="showPosition(p)">{{ p }}</ui-button>
          }
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Long content</p>
        <div class="flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button variant="secondary" (click)="showLong()">Long message</ui-button>
          <ui-button variant="secondary" (click)="showLongWithAction()">Long + action</ui-button>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Stack overflow (max 5)</p>
        <div class="flex flex-wrap items-center gap-4 p-6" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-button variant="secondary" (click)="showMany()">Show 7 toasts</ui-button>
        </div>
      </section>
    </div>
  `,
})
class ToastVariantsComponent {
  private readonly toast = inject(UiToastService);

  types: ToastType[] = ['default', 'success', 'warning', 'error', 'info'];
  positions: ToastPosition[] = [
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right',
  ];

  showType(type: ToastType): void {
    this.toast.show({ message: `This is a ${type} toast.`, type });
  }

  showAction(): void {
    this.toast.show({
      message: 'Item moved to trash.',
      actionLabel: 'Undo',
      onAction: () => console.log('Undo!'),
      duration: 8000,
    });
  }

  showPersistent(): void {
    this.toast.show({
      message: 'This toast stays until dismissed.',
      type: 'warning',
      duration: 0,
    });
  }

  dismissAll(): void {
    this.toast.dismissAll();
  }

  showPosition(position: ToastPosition): void {
    this.toast.configure({ position });
    this.toast.show({ message: `Position: ${position}`, type: 'info' });
  }

  showLong(): void {
    this.toast.show({
      message: 'Your export is being processed. This may take a few minutes depending on the size of the dataset. You will receive a notification when the file is ready to download.',
      type: 'info',
      duration: 8000,
    });
  }

  showLongWithAction(): void {
    this.toast.show({
      message: 'The deployment to production failed due to a configuration mismatch in the environment variables. Please review your settings and try again.',
      type: 'error',
      duration: 0,
      actionLabel: 'View details',
      onAction: () => console.log('View details clicked'),
    });
  }

  showMany(): void {
    for (let i = 1; i <= 7; i++) {
      this.toast.show({ message: `Toast #${i}`, type: this.types[i % this.types.length] });
    }
  }
}

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<UiToastComponent> = {
  title: 'Shared UI/Toast',
  component: UiToastComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
    moduleMetadata({
      imports: [UiToastComponent, UiToastContainerComponent, UiButtonComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<UiToastComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [ToastDocsComponent] }),
  ],
  render: () => ({
    template: `<story-toast-docs />`,
  }),
};

export const Playground: Story = {
  decorators: [
    moduleMetadata({ imports: [PlaygroundToastComponent] }),
  ],
  argTypes: {
    toast: { table: { disable: true } },
  },
  args: {
    // @ts-expect-error — story-level args, not component inputs
    toastMessage: 'Something happened.',
    toastType: 'default',
    toastDuration: 4000,
    toastPosition: 'bottom-right',
  },
  render: (args) => ({
    props: args,
    template: `
      <story-playground-toast
        [toastMessage]="toastMessage"
        [toastType]="toastType"
        [toastDuration]="toastDuration"
        [toastPosition]="toastPosition"
      />
    `,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [ToastVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-toast-variants />`,
  }),
};
