import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'story-typography',
  standalone: true,
  template: `
    <div class="flex flex-col gap-12 p-8" style="background: var(--color-surface-base); color: var(--color-text-default);">

      <!-- Headings -->
      <section class="flex flex-col gap-4">
        <p class="ui-overline">Headings</p>
        <div class="flex flex-col gap-3" style="border-left: 3px solid var(--color-border-default); padding-left: 1rem;">
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 4rem;">.ui-h1</span>
            <h1 class="ui-h1">Main title</h1>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 4rem;">.ui-h2</span>
            <h2 class="ui-h2">Section title</h2>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 4rem;">.ui-h3</span>
            <h3 class="ui-h3">Subtitle</h3>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 4rem;">.ui-h4</span>
            <h4 class="ui-h4">Heading 4</h4>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 4rem;">.ui-h5</span>
            <h5 class="ui-h5">Heading 5</h5>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 4rem;">.ui-h6</span>
            <h6 class="ui-h6">Heading 6</h6>
          </div>
        </div>
      </section>

      <!-- Body -->
      <section class="flex flex-col gap-4">
        <p class="ui-overline">Body</p>
        <div class="flex flex-col gap-3" style="border-left: 3px solid var(--color-border-default); padding-left: 1rem;">
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 7rem;">.ui-body-lg</span>
            <p class="ui-body-lg">Large text — intros, highlights</p>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 7rem;">.ui-body-md</span>
            <p class="ui-body-md">Standard text — general content</p>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 7rem;">.ui-body-sm</span>
            <p class="ui-body-sm">Small text — secondary, forms</p>
          </div>
        </div>
      </section>

      <!-- Special -->
      <section class="flex flex-col gap-4">
        <p class="ui-overline">Special</p>
        <div class="flex flex-col gap-3" style="border-left: 3px solid var(--color-border-default); padding-left: 1rem;">
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 7rem;">.ui-caption</span>
            <span class="ui-caption">Supporting text, timestamps, metadata</span>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 7rem;">.ui-overline</span>
            <span class="ui-overline">Section label</span>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 7rem;">.ui-code</span>
            <code class="ui-code">const value = 42;</code>
          </div>
        </div>
      </section>

      <!-- Color modifiers -->
      <section class="flex flex-col gap-4">
        <p class="ui-overline">Color modifiers</p>
        <div class="flex flex-col gap-3" style="border-left: 3px solid var(--color-border-default); padding-left: 1rem;">
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 9rem;">.ui-text-muted</span>
            <p class="ui-body-md ui-text-muted">Secondary text</p>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 9rem;">.ui-text-danger</span>
            <p class="ui-body-md ui-text-danger">Error message</p>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="ui-caption" style="min-width: 9rem;">.ui-text-success</span>
            <p class="ui-body-md ui-text-success">Operation completed</p>
          </div>
        </div>
      </section>

    </div>
  `,
})
class TypographyStoryComponent {}

const meta: Meta<TypographyStoryComponent> = {
  title: 'Foundations/Typography',
  component: TypographyStoryComponent,
};

export default meta;

type Story = StoryObj<TypographyStoryComponent>;

export const AllClasses: Story = {};
