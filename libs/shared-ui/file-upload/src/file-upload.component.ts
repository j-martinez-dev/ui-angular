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
            <ui-icon-button
              icon="heroXMark"
              label="Remove file"
              variant="ghost"
              size="sm"
              (click)="removeFile()"
            />
          </div>
        }
      </div>
    }
  `,
  styleUrl: './file-upload.component.scss',
})
export class UiFileUploadComponent implements FormValueControl<File | null> {
  // Signal Forms contract
  value = model<File | null>(null);
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
  placeholder = input<string>('Glissez un fichier ici ou cliquez pour sélectionner');

  // Outputs
  fileRejected = output<{ file: File; reason: 'type' | 'size' }>();

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
    this.processFile(event.dataTransfer?.files[0]);
  }

  onFileSelected(event: Event): void {
    this.processFile((event.target as HTMLInputElement).files?.[0]);
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
