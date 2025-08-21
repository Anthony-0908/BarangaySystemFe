import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';

import { DashboardComponent } from './Admin/dashboard/dashboard.component';
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
    path:'', 
    component:MasterLayoutComponent,
    children:[
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
