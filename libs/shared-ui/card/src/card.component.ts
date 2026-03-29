import { Component, computed, input, output } from '@angular/core';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

interface CardStyles {
  bg: string;
  border: string;
  shadow: string;
  hoverShadow: string;
  hoverBorder: string;
  hoverBg: string;
}

const VARIANT_MAP: Record<CardVariant, CardStyles> = {
  elevated: {
    bg: 'var(--color-surface-raised)',
    border: 'none',
    shadow: 'var(--shadow-md)',
    hoverShadow: 'var(--shadow-lg)',
    hoverBorder: 'none',
    hoverBg: 'var(--color-surface-raised)',
  },
  outlined: {
    bg: 'var(--color-surface-raised)',
    border: '1px solid var(--color-border-default)',
    shadow: 'none',
    hoverShadow: 'none',
    hoverBorder: '1px solid var(--color-border-strong)',
    hoverBg: 'var(--color-surface-raised)',
  },
  flat: {
    bg: 'var(--color-surface-raised)',
    border: 'none',
    shadow: 'none',
    hoverShadow: 'none',
    hoverBorder: 'none',
    hoverBg: 'var(--color-surface-sunken)',
  },
};

@Component({
  selector: 'ui-card',
  template: `
    <div
      class="card"
      [class]="'card--' + variant()"
      [class.card--clickable]="clickable()"
      [class.card--disabled]="disabled()"
      [attr.role]="clickable() ? 'button' : null"
      [attr.tabindex]="clickable() ? 0 : null"
      (click)="onClick()"
      (keydown)="onKeydown($event)"
    >
      @if (image()) {
        <div class="card-image">
          <img [src]="image()" [alt]="imageAlt()" />
        </div>
      }

      <ng-content select="[slot=header]" />

      <div class="card-body">
        <ng-content />
      </div>

      <ng-content select="[slot=footer]" />
    </div>
  `,
  styleUrl: './card.component.scss',
  host: {
    '[style.--card-bg]': 'styles().bg',
    '[style.--card-border]': 'styles().border',
    '[style.--card-shadow]': 'styles().shadow',
    '[style.--card-hover-shadow]': 'styles().hoverShadow',
    '[style.--card-hover-border]': 'styles().hoverBorder',
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
