import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { UiIconButtonComponent } from '@ui/shared-ui/icon-button';
import { UiModalRef } from './modal-ref';
import { type ModalContent, type ModalSize } from './modal.types';

let nextId = 0;

@Component({
  selector: 'ui-modal',
  imports: [UiIconButtonComponent, A11yModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      #modalEl
      [class]="'ui-modal ui-modal--' + size()"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="title() ? titleId : null"
      cdkTrapFocus
      [cdkTrapFocusAutoCapture]="true"
    >
      <!-- Header -->
      <div class="ui-modal-header">
        <ng-content select="[slot=header]">
          @if (title()) {
            <h2 [id]="titleId" class="ui-modal-title">{{ title() }}</h2>
          }
        </ng-content>
        @if (showCloseButton()) {
          <ui-icon-button
            icon="heroXMark"
            label="Close modal"
            variant="ghost"
            size="sm"
            class="ui-modal-close"
            (click)="close()"
          />
        }
      </div>

      <!-- Body -->
      <div class="ui-modal-body">
        <ng-content />
        <ng-container #bodyContainer />
      </div>

      <!-- Footer -->
      <ng-content select="[slot=footer]" />
    </div>
  `,
  styleUrl: './modal.component.scss',
})
export class UiModalComponent {
  title = input<string>();
  size = input<ModalSize>('md');
  closeOnBackdrop = input<boolean>(true);
  closeOnEscape = input<boolean>(true);
  showCloseButton = input<boolean>(true);

  /** @internal — set by UiModalService to render dynamic content */
  readonly _content = signal<ModalContent | null>(null);
  /** @internal — injector for dynamic component content */
  readonly _contentInjector = signal<Injector | null>(null);

  protected readonly titleId = `ui-modal-title-${nextId++}`;

  private readonly modalRef = inject(UiModalRef);
  private readonly injector = inject(Injector);
  private readonly modalEl = viewChild<ElementRef<HTMLElement>>('modalEl');
  private readonly bodyContainer = viewChild('bodyContainer', { read: ViewContainerRef });

  constructor() {
    effect(() => {
      const content = this._content();
      const container = this.bodyContainer();
      if (!content || !container) return;

      container.clear();
      if (content instanceof TemplateRef) {
        container.createEmbeddedView(content);
      } else {
        container.createComponent(content, {
          injector: this._contentInjector() ?? undefined,
        });
      }
    });

    afterNextRender(() => {
      this.modalEl()?.nativeElement?.focus();
    }, { injector: this.injector });
  }

  close(): void {
    this.modalRef.close();
  }
}
