
export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  role?: string;          // role required (optional)
  permission?: string;    // permission required (optional)
  children?: MenuItem[];  // for nested menus]
  expanded?: boolean; // 👈 for collapsible menus
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',   // ✅ PrimeIcon for Home
    route: '/dashboard'
  },
  {
    label: 'Users',
    icon: 'pi pi-users',   // ✅ PrimeIcon for Users
    route: '/users',
    permission: 'view-users'
  },
  {
    label: 'Admin Panel',
    icon: 'pi pi-cog',   // ✅ PrimeIcon for Settings
    route: '/admin',
    role: 'admin'
  },
  {
    label: 'Reports',
    icon: 'pi pi-chart-bar',   // ✅ PrimeIcon for Reports
    children: [
      { label: 'Monthly', route: '/reports/monthly', permission: 'view-reports', icon: 'pi pi-calendar' },
      { label: 'Yearly', route: '/reports/yearly', role: 'manager', icon: 'pi pi-calendar-times' }
    ]
  }
];