// sidebar-menu.ts
export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  role?: string;          // role required (optional)
  permission?: string;    // permission required (optional)
  children?: MenuItem[];  // for nested menus
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'ri-home-4-line',   // Home icon
    route: '/dashboard'
  },
  {
    label: 'Users',
    icon: 'ri-user-3-line',   // Users icon
    route: '/users',
    permission: 'view-users'
  },
  {
    label: 'Admin Panel',
    icon: 'ri-settings-3-line',   // Settings/gear icon
    route: '/admin',
    role: 'admin'
  },
  {
    label: 'Reports',
    icon: 'ri-bar-chart-2-line',   // Reports/chart icon
    children: [
      { label: 'Monthly', route: '/reports/monthly', permission: 'view-reports', icon: 'ri-calendar-event-line' },
      { label: 'Yearly', route: '/reports/yearly', role: 'manager', icon: 'ri-calendar-2-line' }
    ]
  }
];
