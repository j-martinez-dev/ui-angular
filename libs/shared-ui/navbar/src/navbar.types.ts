export interface NavbarItem<T = string> {
  value: T;
  label: string;
  icon?: string;
  disabled?: boolean;
}
