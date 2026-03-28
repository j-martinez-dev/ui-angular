import { Component, input, output } from '@angular/core';
import { UiBreadcrumbComponent, type BreadcrumbItem } from '@ui/shared-ui/breadcrumb';

@Component({
  selector: 'ui-page-header',
  imports: [UiBreadcrumbComponent],
  template: `
    <div class="page-header">
      <div class="page-header-main">

        <div class="page-header-content">
          @if (breadcrumbs()?.length) {
            <ui-breadcrumb
              [items]="breadcrumbs()!"
              size="sm"
              (itemClick)="breadcrumbClick.emit($event)"
            />
          }

          <div class="page-header-titles">
            <h1 class="page-header-title">{{ title() }}</h1>
            @if (description()) {
              <p class="page-header-description">{{ description() }}</p>
            }
          </div>
        </div>

        <div class="page-header-actions">
          <ng-content select="[slot=actions]" />
        </div>

      </div>

      <hr class="page-header-divider" />
    </div>
  `,
  styleUrl: './page-header.component.scss',
})
export class UiPageHeaderComponent {
  title = input.required<string>();
  description = input<string>();
  breadcrumbs = input<BreadcrumbItem[]>();

  breadcrumbClick = output<unknown>();
}
