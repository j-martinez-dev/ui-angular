export interface TabItem<T = string> {
  value: T;
  label: string;
  icon?: string;
  disabled?: boolean;
}
