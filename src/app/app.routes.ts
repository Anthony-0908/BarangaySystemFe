import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';

import { USERS_ROUTES } from './Admin/user/user.route';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UserComponent } from './Admin/user/user.component';
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
        title: 'Users'
      },
      // {
      //   path:'users',
      //   loadComponent:() => import('./Admin/user/user.component').then(m => m.UserComponent)
      // },
      {
        path:'dashboard',
        loadComponent: () => import('./Admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard'
      }
    ]
  }
  // {
  //   path:'dashboard',
  //   loadComponent:() => import('./')
  // }
];
