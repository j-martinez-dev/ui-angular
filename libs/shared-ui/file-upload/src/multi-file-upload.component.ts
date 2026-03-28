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
  selector: 'ui-multi-file-upload',
  imports: [UiIconComponent, UiIconButtonComponent],
  template: `
    @if (!hidden()) {
      <div
        class="file-upload"
        [class.file-upload--dragging]="isDragging()"
        [class.file-upload--has-file]="value().length > 0"
        [class.file-upload--disabled]="disabled()"
        [class.file-upload--invalid]="invalid()"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave()"
        (drop)="onDrop($event)"
        (click)="openFilePicker()"
      >
        <input
          #fileInput
          type="file"
          class="sr-only"
          multiple
          [accept]="accept()"
          [disabled]="disabled()"
          (change)="onFileSelected($event)"
        />

        <div class="file-upload-empty">
          <ui-icon name="heroArrowUpTray" size="xl" color="muted" />
          <p class="file-upload-placeholder">{{ placeholder() }}</p>
          @if (accept()) {
            <p class="file-upload-hint">{{ accept() }}</p>
          }
          @if (maxSize()) {
            <p class="file-upload-hint">Max: {{ formatFileSize(maxSize()!) }}</p>
          }
          @if (maxFiles()) {
            <p class="file-upload-hint">Max files: {{ maxFiles() }}</p>
          }
        </div>

        @if (value().length > 0) {
          <ul class="file-list">
            @for (file of value(); track file.name) {
              <li class="file-list-item" (click)="$event.stopPropagation()">
                <ui-icon name="heroDocument" size="sm" color="muted" />
                <div class="file-upload-info">
                  <span class="file-upload-name">{{ file.name }}</span>
                  <span class="file-upload-size">{{ formatFileSize(file.size) }}</span>
                </div>
                <ui-icon-button
                  icon="heroXMark"
                  label="Remove file"
                  variant="ghost"
                  size="sm"
                  (click)="removeFile(file)"
                />
              </li>
            }
          </ul>
        }
      </div>
    }
  `,
  styleUrl: './multi-file-upload.component.scss',
})
export class UiMultiFileUploadComponent implements FormValueControl<File[]> {
  // Signal Forms contract
  value = model<File[]>([]);
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  required = input<boolean>(false);

  // Additional inputs
  accept = input<string>('');
  maxSize = input<number | undefined>(undefined);
  maxFiles = input<number | undefined>(undefined);
  placeholder = input<string>('Glissez des fichiers ici ou cliquez pour sélectionner');

  // Outputs
  fileRejected = output<{ file: File; reason: 'type' | 'size' | 'limit' }>();

  // Internal state
  isDragging = signal<boolean>(false);
  private fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  protected formatFileSize = formatFileSize;

  openFilePicker(): void {
    this.fileInput().nativeElement.click();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(): void {
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    this.processFiles(event.dataTransfer?.files);
  }

  onFileSelected(event: Event): void {
    this.processFiles((event.target as HTMLInputElement).files);
  }

  removeFile(file: File): void {
    this.value.set(this.value().filter(f => f !== file));
    this.touched.set(true);
  }

  private processFiles(files: FileList | null | undefined): void {
    if (!files || files.length === 0) return;

    const currentFiles = this.value();
    const validFiles: File[] = [];
    let remaining = this.maxFiles() ? this.maxFiles()! - currentFiles.length : Infinity;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!isFileAccepted(file, this.accept())) {
        this.fileRejected.emit({ file, reason: 'type' });
        continue;
      }
      if (!isFileSizeValid(file, this.maxSize())) {
        this.fileRejected.emit({ file, reason: 'size' });
        continue;
      }
      if (remaining <= 0) {
        this.fileRejected.emit({ file, reason: 'limit' });
        continue;
      }

      validFiles.push(file);
      remaining--;
    }

    if (validFiles.length > 0) {
      this.value.set([...currentFiles, ...validFiles]);
      this.touched.set(true);
    }
  }
}
