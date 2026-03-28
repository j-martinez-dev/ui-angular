import { Component, input } from '@angular/core';
import { UiIconComponent } from '@ui/shared-ui/icon';
import { UiBadgeComponent, type BadgeColor } from '@ui/shared-ui/badge';
import { type StatsItem, type StatsTrend } from './stats-block.types';

const TREND_COLOR_MAP: Record<StatsTrend, BadgeColor> = {
  up: 'success',
  down: 'error',
  neutral: 'muted',
};

const TREND_ICON_MAP: Record<StatsTrend, string> = {
  up: 'heroArrowTrendingUp',
  down: 'heroArrowTrendingDown',
  neutral: 'heroMinus',
};

@Component({
  selector: 'ui-stats-block',
  imports: [UiIconComponent, UiBadgeComponent],
  template: `
    <div
      class="stats-block"
      role="list"
      [style.--stats-columns]="columns()"
    >
      @for (item of items(); track item.label) {
        <div class="stats-card" role="listitem">

          <div class="stats-card-header">
            <span class="stats-label">{{ item.label }}</span>
            @if (item.icon) {
              <ui-icon
                [name]="item.icon"
                size="md"
                color="muted"
                class="stats-icon"
              />
            }
          </div>

          <span class="stats-value">{{ item.value }}</span>

          @if (item.trend) {
            <div class="stats-trend">
              <ui-badge
                [color]="trendColor(item.trend.direction)"
                variant="subtle"
                [icon]="trendIcon(item.trend.direction)"
                size="sm"
              >
                {{ item.trend.value }}
              </ui-badge>
              @if (item.trend.label) {
                <span class="stats-trend-label">{{ item.trend.label }}</span>
              }
            </div>
          }

        </div>
      }
    </div>
  `,
  styleUrl: './stats-block.component.scss',
})
export class UiStatsBlockComponent {
  items = input.required<StatsItem[]>();
  columns = input<1 | 2 | 3 | 4>(4);

  trendColor(direction: StatsTrend): BadgeColor {
    return TREND_COLOR_MAP[direction];
  }

  trendIcon(direction: StatsTrend): string {
    return TREND_ICON_MAP[direction];
  }
}
