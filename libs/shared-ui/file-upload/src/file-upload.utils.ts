export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isFileAccepted(file: File, accept: string): boolean {
  if (!accept) return true;
  const acceptedTypes = accept.split(',').map(t => t.trim());
  return acceptedTypes.some(type => {
    if (type.startsWith('.')) return file.name.endsWith(type);
    if (type.endsWith('/*')) return file.type.startsWith(type.replace('/*', '/'));
    return file.type === type;
  });
}

export function isFileSizeValid(file: File, maxSize: number | undefined): boolean {
  if (!maxSize) return true;
  return file.size <= maxSize;
}
