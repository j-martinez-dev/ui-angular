import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'ui-tooltip',
  imports: [NgTemplateOutlet],
  template: `
    <div class="tooltip-panel">
      @if (isTemplate()) {
        <ng-container [ngTemplateOutlet]="templateContent()" />
      } @else {
        <span>{{ content() }}</span>
      }
    </div>
  `,
  styleUrl: './tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tooltip',
  },
})
export class UiTooltipComponent {
  content = input.required<string | TemplateRef<unknown>>();

  protected isTemplate = computed(() => this.content() instanceof TemplateRef);

  protected templateContent = computed(() => this.content() as TemplateRef<unknown>);
}
