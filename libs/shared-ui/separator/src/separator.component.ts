import {
  Component,
  input,
} from '@angular/core';

export type SeparatorOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ui-separator',
  styleUrl: './separator.component.scss',
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
  label = input<string | undefined>(undefined);
}
