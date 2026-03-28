export type StatsTrend = 'up' | 'down' | 'neutral';

export interface StatsItem {
  label: string;
  value: string | number;
  icon?: string;
  trend?: {
    direction: StatsTrend;
    value: string;
    label?: string;
  };
}
