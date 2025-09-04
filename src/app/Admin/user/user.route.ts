import {Routes} from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { CreateComponent } from "./create/create.component";
export const USERS_ROUTES: Routes = [ 
  {
    path:'index',
    loadComponent:() => import("./index/index.component").then(m => m.IndexComponent),
  },
  {
    path:'create',
    loadComponent:() => import('./create/create.component').then(m => m.CreateComponent)
  }
]     