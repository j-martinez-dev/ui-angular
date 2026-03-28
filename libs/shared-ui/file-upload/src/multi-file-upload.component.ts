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
        [class.file-upload--readonly]="readonly()"
        [class.file-upload--invalid]="invalid()"
        [attr.tabindex]="disabled() || readonly() ? -1 : 0"
        role="button"
        [attr.aria-label]="value().length > 0
          ? value().length + ' file(s) selected'
          : placeholder()"
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
            @for (file of value(); track $index) {
              <li class="file-list-item" (click)="$event.stopPropagation()">
                <ui-icon name="heroDocument" size="sm" color="muted" />
                <div class="file-upload-info">
                  <span class="file-upload-name">{{ file.name }}</span>
                  <span class="file-upload-size">{{ formatFileSize(file.size) }}</span>
                </div>
                @if (!readonly()) {
                  <ui-icon-button
                    icon="heroXMark"
                    label="Remove file"
                    variant="ghost"
                    size="sm"
                    (click)="removeFile(file)"
                  />
                }
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
  value = model<File[]>([]);
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
  maxFiles = input<number | undefined>(undefined);
  placeholder = input<string>('Drop files here or click to select');

  fileRejected = output<{ file: File; reason: 'type' | 'size' | 'limit' }>();

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
    this.processFiles(event.dataTransfer?.files);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.processFiles(input.files);
    input.value = '';
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
