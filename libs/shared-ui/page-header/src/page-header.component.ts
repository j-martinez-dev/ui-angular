import { Component, input, output } from '@angular/core';
import { UiBreadcrumbComponent, type BreadcrumbItem } from '@ui/shared-ui/breadcrumb';

@Component({
  selector: 'ui-page-header',
  imports: [UiBreadcrumbComponent],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class UiPageHeaderComponent {
  title = input.required<string>();
  description = input<string>();
  breadcrumbs = input<BreadcrumbItem[]>();

  breadcrumbClick = output<unknown>();
}
