import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";

export const ROLES_ROUTES: Routes = [ 
  {
    path:'',
    loadComponent:() => import('./list/list.component').then(m => m.ListComponent),


  },

  {
    path:'create',
    loadComponent:() => import('./create/create-role.component').then(m => m.CreateComponent),
  }
]