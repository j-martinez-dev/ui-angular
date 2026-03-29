import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroArrowUpTray, heroDocument, heroXMark } from '@ng-icons/heroicons/outline';
import { applicationConfig } from '@storybook/angular';
import { UiFileUploadComponent } from './file-upload.component';
import { UiMultiFileUploadComponent } from './multi-file-upload.component';

const icons = { heroArrowUpTray, heroDocument, heroXMark };

// ── Docs ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-file-upload-docs',
  imports: [UiFileUploadComponent, UiMultiFileUploadComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">
      <section class="flex flex-col gap-2">
        <h2 class="ui-h2">File Upload</h2>
        <p class="ui-body-md ui-text-muted">
          A drop zone component for single file selection. Supports drag &amp; drop, file type
          and size validation. Integrates with Angular Signal Forms via FormValueControl.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Single file</h3>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-file-upload />
          <code class="ui-code">&lt;ui-file-upload /&gt;</code>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Multiple files</h3>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-multi-file-upload />
          <code class="ui-code">&lt;ui-multi-file-upload /&gt;</code>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Inputs (UiFileUploadComponent)</h3>
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
              <td class="ui-code p-2">value</td>
              <td class="ui-code p-2">File | null</td>
              <td class="ui-code p-2">null</td>
              <td class="ui-body-sm p-2">Two-way bound file value (model signal)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">accept</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-code p-2">''</td>
              <td class="ui-body-sm p-2">Accepted file types (e.g. '.pdf,.docx', 'image/*')</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">maxSize</td>
              <td class="ui-code p-2">number | undefined</td>
              <td class="ui-code p-2">undefined</td>
              <td class="ui-body-sm p-2">Max file size in bytes</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">placeholder</td>
              <td class="ui-code p-2">string</td>
              <td class="ui-body-sm p-2">Glissez un fichier...</td>
              <td class="ui-body-sm p-2">Drop zone placeholder text</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-default);">
              <td class="ui-code p-2">disabled</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Disables the drop zone</td>
            </tr>
            <tr>
              <td class="ui-code p-2">invalid</td>
              <td class="ui-code p-2">boolean</td>
              <td class="ui-code p-2">false</td>
              <td class="ui-body-sm p-2">Shows error border</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="ui-h3">Additional inputs (UiMultiFileUploadComponent)</h3>
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
            <tr>
              <td class="ui-code p-2">maxFiles</td>
              <td class="ui-code p-2">number | undefined</td>
              <td class="ui-code p-2">undefined</td>
              <td class="ui-body-sm p-2">Maximum number of files allowed</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
})
class FileUploadDocsComponent {}

// ── Variants ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-file-upload-variants',
  imports: [UiFileUploadComponent, UiMultiFileUploadComponent],
  template: `
    <div class="flex flex-col gap-10 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Default</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-file-upload />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">With accept &amp; maxSize</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-file-upload accept="image/*" [maxSize]="5242880" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Disabled</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-file-upload [disabled]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Invalid</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-file-upload [invalid]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Multi file upload</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-multi-file-upload accept=".pdf,.docx" [maxFiles]="3" [maxSize]="10485760" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Multi file — disabled</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-multi-file-upload [disabled]="true" />
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <p class="ui-overline">Interactive — rejection log</p>
        <div class="flex flex-col gap-3 p-4" style="background: var(--color-surface-raised); border-radius: var(--radius-md);">
          <ui-file-upload
            accept="image/*"
            [maxSize]="1048576"
            placeholder="Images uniquement, 1 Mo max"
            (fileRejected)="onRejected($event)"
          />
          @if (rejections().length > 0) {
            <ul class="flex flex-col gap-1">
              @for (r of rejections(); track $index) {
                <li class="ui-caption ui-text-danger">{{ r }}</li>
              }
            </ul>
          }
        </div>
      </section>

    </div>
  `,
})
class FileUploadVariantsComponent {
  rejections = signal<string[]>([]);

  onRejected(event: { file: File; reason: string }): void {
    this.rejections.update(list => [
      ...list,
      `Rejected "${event.file.name}" — reason: ${event.reason}`,
    ]);
  }
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<UiFileUploadComponent> = {
  title: 'Components/FileUpload',
  component: UiFileUploadComponent,
  decorators: [
    applicationConfig({
      providers: [provideIcons(icons)],
    }),
  ],
  argTypes: {
    accept: {
      control: 'text',
    },
    maxSize: {
      control: 'number',
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<UiFileUploadComponent>;

export const Docs: Story = {
  decorators: [
    moduleMetadata({ imports: [FileUploadDocsComponent, UiMultiFileUploadComponent] }),
  ],
  render: () => ({
    template: `<story-file-upload-docs />`,
  }),
};

export const Playground: Story = {
  args: {
    accept: '',
    maxSize: undefined,
    placeholder: 'Glissez un fichier ici ou cliquez pour sélectionner',
    disabled: false,
    invalid: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<ui-file-upload
      [accept]="accept"
      [maxSize]="maxSize"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [invalid]="invalid"
      [required]="required"
    />`,
  }),
};

export const Variants: Story = {
  decorators: [
    moduleMetadata({ imports: [FileUploadVariantsComponent] }),
  ],
  render: () => ({
    template: `<story-file-upload-variants />`,
  }),
};
