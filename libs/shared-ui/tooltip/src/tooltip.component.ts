import {
  Component,
  computed,
  input,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'ui-tooltip',
  imports: [NgTemplateOutlet],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  host: {
    role: 'tooltip',
  },
})
export class UiTooltipComponent {
  content = input.required<string | TemplateRef<unknown>>();

  protected isTemplate = computed(() => this.content() instanceof TemplateRef);

  protected templateContent = computed(() => this.content() as TemplateRef<unknown>);
}
