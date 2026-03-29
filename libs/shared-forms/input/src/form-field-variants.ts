export type FormFieldVariant = 'outlined' | 'filled' | 'ghost';

export interface FormFieldVariantStyles {
  bg: string;
  border: string;
  focusBorder: string;
  invalidBorder: string;
}

export const FORM_FIELD_VARIANT_MAP: Record<FormFieldVariant, FormFieldVariantStyles> = {
  outlined: {
    bg: 'var(--color-surface-raised)',
    border: '1px solid var(--color-border-default)',
    focusBorder: '1px solid var(--color-primary-default)',
    invalidBorder: '1px solid var(--color-error-default)',
  },
  filled: {
    bg: 'var(--color-surface-sunken)',
    border: 'none',
    focusBorder: 'none',
    invalidBorder: 'none',
  },
  ghost: {
    bg: 'transparent',
    border: 'none',
    focusBorder: 'none',
    invalidBorder: 'none',
  },
};
