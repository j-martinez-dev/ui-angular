export interface SidebarItem<T = string> {
  value: T;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface SidebarGroup<T = string> {
  label?: string;
  items: SidebarItem<T>[];
}
