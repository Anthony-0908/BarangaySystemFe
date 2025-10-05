import {Routes} from "@angular/router";
import { authGuard } from "../../core/guards/auth.guard";

export const USERS_ROUTES: Routes = [ 
  {
    path: '',
    loadComponent: () =>
      import('./index/index.component').then(m => m.IndexComponent),
    // canActivate: [authGuard],

  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create/create.component').then(m => m.CreateComponent),
    // canActivate: [authGuard],
 
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./update/update.component').then(m => m.UpdateComponent),
    // canActivate: [authGuard],
   
  }
]     