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
  templateUrl: './multi-file-upload.component.html',
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
  placeholder = input<string>('Glissez des fichiers ici ou cliquez pour sélectionner');

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
