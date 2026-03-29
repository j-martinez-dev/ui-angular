import {
  Component,
  computed,
  input,
} from '@angular/core';

export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorColor = 'default' | 'strong' | 'primary' | 'success' | 'warning' | 'error' | 'info';

const COLOR_MAP: Record<SeparatorColor, { line: string; label: string }> = {
  default: {
    line: 'var(--color-border-default)',
    label: 'var(--color-text-muted)',
  },
  strong: {
    line: 'var(--color-border-strong)',
    label: 'var(--color-text-default)',
  },
  primary: {
    line: 'var(--color-primary-default)',
    label: 'var(--color-primary-emphasis)',
  },
  success: {
    line: 'var(--color-success-default)',
    label: 'var(--color-success-emphasis)',
  },
  warning: {
    line: 'var(--color-warning-default)',
    label: 'var(--color-warning-emphasis)',
  },
  error: {
    line: 'var(--color-error-default)',
    label: 'var(--color-error-emphasis)',
  },
  info: {
    line: 'var(--color-info-default)',
    label: 'var(--color-info-emphasis)',
  },
};

@Component({
  selector: 'ui-separator',
  styleUrl: './separator.component.scss',
  host: {
    '[class.orientation-horizontal]': 'orientation() === "horizontal"',
    '[class.orientation-vertical]': 'orientation() === "vertical"',
    '[style.--sep-line]': 'colorStyles().line',
    '[style.--sep-label]': 'colorStyles().label',
  },
  template: `
    <div
      class="separator"
      [class.separator--horizontal]="orientation() === 'horizontal'"
      [class.separator--vertical]="orientation() === 'vertical'"
      [class.separator--labeled]="!!label()"
      role="separator"
      [attr.aria-orientation]="orientation()"
    >
      @if (label()) {
        <span class="separator-line"></span>
        <span class="separator-label">{{ label() }}</span>
        <span class="separator-line"></span>
      }
    </div>
  `,
})
export class UiSeparatorComponent {
  orientation = input<SeparatorOrientation>('horizontal');
  color = input<SeparatorColor>('default');
  label = input<string | undefined>(undefined);

  protected colorStyles = computed(() => COLOR_MAP[this.color()]);
}
