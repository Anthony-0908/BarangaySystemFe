import { Routes } from '@angular/router';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { authGuard } from './core/guards/role.guard';
import { USERS_ROUTES } from './Admin/user/user.route';
import { ROLES_ROUTES } from './Admin/role/role.route';
export const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path:'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) ,
    title: 'Login'
  },

  {
    path:'reset-password',
    loadComponent: () => import('./auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
    title: 'Reset Password' 
  },

  {
    path:'', 
    component:MasterLayoutComponent,
    children:[
      {
        path:'users',
        children:USERS_ROUTES,
        canActivate: [authGuard],
        data: { roles: ['Admin'] }, // 👈 only admins can enter
        title: 'Users'
      },
      {
        path:'roles',
        children:ROLES_ROUTES,
        data: {roles:['Admin']},
        title:'Roles',
      },
      // {
      //   path:'users',
      //   loadComponent:() => import('./Admin/user/user.component').then(m => m.UserComponent)
      // },
      {
        path:'dashboard',
        loadComponent: () => import('./Admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard'
      },
      {
        path:'roles',
        loadComponent: () => import('./Admin/role/role.component').then(m => m.RoleComponent),
        title: 'roles'
      }
    ]
  }
  // {
  //   path:'dashboard',
  //   loadComponent:() => import('./')
  // }
];
