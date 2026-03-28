export type ToastType = 'default' | 'success' | 'warning' | 'error' | 'info';

export type ToastPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

export interface ToastGlobalConfig {
  position?: ToastPosition;
  maxToasts?: number;
  duration?: number;
}

export interface ToastItem extends Required<Omit<ToastConfig, 'onAction'>> {
  id: string;
  onAction?: () => void;
}
