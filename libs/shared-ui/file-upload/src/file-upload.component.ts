import {
  Component,
  ElementRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormValueControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import { formatFileSize, isFileAccepted, isFileSizeValid } from './file-upload.utils';

@Component({
  selector: 'ui-file-upload',
  imports: [UiIconComponent, UiIconButtonComponent],
  template: `
    @if (!hidden()) {
      <div
        class="file-upload"
        [class.file-upload--dragging]="isDragging()"
        [class.file-upload--has-file]="!!value()"
        [class.file-upload--disabled]="disabled()"
        [class.file-upload--readonly]="readonly()"
        [class.file-upload--invalid]="invalid()"
        [attr.tabindex]="disabled() || readonly() ? -1 : 0"
        role="button"
        [attr.aria-label]="value() ? value()!.name : placeholder()"
        [attr.aria-disabled]="disabled()"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        (click)="openFilePicker()"
        (keydown.enter)="openFilePicker()"
        (keydown.space)="onSpaceKey($event)"
      >
        <input
          #fileInput
          type="file"
          class="sr-only"
          [accept]="accept()"
          [disabled]="disabled()"
          (change)="onFileSelected($event)"
        />

        @if (!value()) {
          <div class="file-upload-empty">
            <ui-icon name="heroArrowUpTray" size="xl" color="muted" />
            <p class="file-upload-placeholder">{{ placeholder() }}</p>
            @if (accept()) {
              <p class="file-upload-hint">{{ accept() }}</p>
            }
            @if (maxSize()) {
              <p class="file-upload-hint">Max: {{ formatFileSize(maxSize()!) }}</p>
            }
          </div>
        } @else {
          <div class="file-upload-preview" (click)="$event.stopPropagation()">
            <ui-icon name="heroDocument" size="lg" color="muted" />
            <div class="file-upload-info">
              <span class="file-upload-name">{{ value()!.name }}</span>
              <span class="file-upload-size">{{ formatFileSize(value()!.size) }}</span>
            </div>
            @if (!readonly()) {
              <ui-icon-button
                icon="heroXMark"
                label="Remove file"
                variant="ghost"
                size="sm"
                (click)="removeFile()"
              />
            }
          </div>
        }
      </div>
    }
  `,
  styleUrl: './file-upload.component.scss',
})
export class UiFileUploadComponent implements FormValueControl<File | null> {
  value = model<File | null>(null);
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  required = input<boolean>(false);

  accept = input<string>('');
  maxSize = input<number | undefined>(undefined);
  placeholder = input<string>('Glissez un fichier ici ou cliquez pour sélectionner');

  fileRejected = output<{ file: File; reason: 'type' | 'size' }>();

  isDragging = signal<boolean>(false);
  private fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  protected formatFileSize = formatFileSize;

  openFilePicker(): void {
    if (this.readonly()) return;
    this.fileInput().nativeElement.click();
  }

  onSpaceKey(event: Event): void {
    event.preventDefault();
    this.openFilePicker();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.readonly()) this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    const target = event.currentTarget as HTMLElement;
    const related = event.relatedTarget as Node | null;
    if (related && target.contains(related)) return;
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    if (this.readonly()) return;
    this.processFile(event.dataTransfer?.files[0]);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.processFile(input.files?.[0]);
    input.value = '';
  }

  removeFile(): void {
    this.value.set(null);
    this.touched.set(true);
  }

  private processFile(file: File | undefined): void {
    if (!file) return;
    if (!isFileAccepted(file, this.accept())) {
      this.fileRejected.emit({ file, reason: 'type' });
      return;
    }
    if (!isFileSizeValid(file, this.maxSize())) {
      this.fileRejected.emit({ file, reason: 'size' });
      return;
    }
    this.value.set(file);
    this.touched.set(true);
  }
}
