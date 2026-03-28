export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'accent-1'
  | 'accent-2'
  | 'accent-3';

export interface ButtonStyles {
  bg: string;
  color: string;
  border: string;
  hoverBg: string;
}

export const BUTTON_VARIANT_MAP: Record<ButtonVariant, ButtonStyles> = {
  primary: {
    bg: 'var(--color-primary-default)',
    color: 'var(--color-on-primary)',
    border: 'none',
    hoverBg: 'var(--color-primary-emphasis)',
  },
  secondary: {
    bg: 'transparent',
    color: 'var(--color-primary-default)',
    border: '1px solid var(--color-primary-default)',
    hoverBg: 'var(--color-primary-subtle)',
  },
  ghost: {
    bg: 'transparent',
    color: 'var(--color-primary-default)',
    border: 'none',
    hoverBg: 'var(--color-primary-subtle)',
  },
  danger: {
    bg: 'var(--color-error-default)',
    color: 'var(--color-on-error)',
    border: 'none',
    hoverBg: 'var(--color-error-emphasis)',
  },
  'accent-1': {
    bg: 'var(--color-accent-1-default)',
    color: 'var(--color-on-accent-1)',
    border: 'none',
    hoverBg: 'var(--color-accent-1-emphasis)',
  },
  'accent-2': {
    bg: 'var(--color-accent-2-default)',
    color: 'var(--color-on-accent-2)',
    border: 'none',
    hoverBg: 'var(--color-accent-2-emphasis)',
  },
  'accent-3': {
    bg: 'var(--color-accent-3-default)',
    color: 'var(--color-on-accent-3)',
    border: 'none',
    hoverBg: 'var(--color-accent-3-emphasis)',
  },
};
