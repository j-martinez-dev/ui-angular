import { Component, computed, input, output } from '@angular/core';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

interface CardStyles {
  bg: string;
  border: string;
  shadow: string;
  hoverShadow: string;
  hoverBorderColor: string;
  hoverBg: string;
}

const VARIANT_MAP: Record<CardVariant, CardStyles> = {
  elevated: {
    bg: 'var(--color-surface-raised)',
    border: 'none',
    shadow: 'var(--shadow-md)',
    hoverShadow: 'var(--shadow-lg)',
    hoverBorderColor: 'transparent',
    hoverBg: 'var(--color-surface-raised)',
  },
  outlined: {
    bg: 'var(--color-surface-raised)',
    border: '1px solid var(--color-border-default)',
    shadow: 'none',
    hoverShadow: 'none',
    hoverBorderColor: 'var(--color-border-strong)',
    hoverBg: 'var(--color-surface-raised)',
  },
  flat: {
    bg: 'var(--color-surface-raised)',
    border: 'none',
    shadow: 'none',
    hoverShadow: 'none',
    hoverBorderColor: 'transparent',
    hoverBg: 'var(--color-surface-sunken)',
  },
};

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  host: {
    '[style.--card-bg]': 'styles().bg',
    '[style.--card-border]': 'styles().border',
    '[style.--card-shadow]': 'styles().shadow',
    '[style.--card-hover-shadow]': 'styles().hoverShadow',
    '[style.--card-hover-border-color]': 'styles().hoverBorderColor',
    '[style.--card-hover-bg]': 'styles().hoverBg',
  },
})
export class UiCardComponent {
  variant = input<CardVariant>('elevated');
  clickable = input<boolean>(false);
  disabled = input<boolean>(false);
  image = input<string>();
  imageAlt = input<string>('');

  cardClick = output<void>();

  protected styles = computed(() => VARIANT_MAP[this.variant()]);

  onClick(): void {
    if (this.clickable() && !this.disabled()) this.cardClick.emit();
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.clickable() && !this.disabled() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.cardClick.emit();
    }
  }
}
