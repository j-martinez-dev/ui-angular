import { Component, computed, input } from '@angular/core';

export type LinkVariant = 'default' | 'muted' | 'danger';
export type LinkUnderline = 'always' | 'hover' | 'never';

const COLOR_MAP: Record<LinkVariant, string> = {
  default: 'var(--color-primary-default)',
  muted: 'var(--color-text-muted)',
  danger: 'var(--color-error-default)',
};

const HOVER_COLOR_MAP: Record<LinkVariant, string> = {
  default: 'var(--color-primary-emphasis)',
  muted: 'var(--color-text-default)',
  danger: 'var(--color-error-emphasis)',
};

@Component({
  selector: '[uiLink]',
  template: '<ng-content />',
  styleUrl: './link.directive.scss',
  host: {
    '[style.--link-color]': 'resolvedColor()',
    '[style.--link-hover-color]': 'resolvedHoverColor()',
    '[class.ui-link--underline-always]': 'underline() === "always"',
    '[class.ui-link--underline-hover]': 'underline() === "hover"',
    '[class.ui-link--underline-never]': 'underline() === "never"',
  },
})
export class UiLinkDirective {
  uiLink = input<LinkVariant>('default');
  underline = input<LinkUnderline>('hover');

  protected resolvedColor = computed(() => COLOR_MAP[this.uiLink()]);
  protected resolvedHoverColor = computed(() => HOVER_COLOR_MAP[this.uiLink()]);
}
