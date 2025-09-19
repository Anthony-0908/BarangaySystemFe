import {Routes} from "@angular/router";
export const USERS_ROUTES: Routes = [ 
  {
    path:'',
    loadComponent:() => import("./index/index.component").then(m => m.IndexComponent),
  },
  {
    path:'create',
    loadComponent:() => import('./create/create.component').then(m => m.CreateComponent)
  },
  {
    path:':id/edit',
    loadComponent:() => import('./update/update.component').then(m => m.UpdateComponent)
  }
]     