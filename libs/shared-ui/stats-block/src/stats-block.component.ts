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
  templateUrl: './stats-block.component.html',
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
