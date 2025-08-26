import {Routes} from "@angular/router";
import { IndexComponent } from "./index/index.component";
export const USERS_ROUTES: Routes = [ 
  {
    path:'',
    loadComponent:() => import("./index/index.component").then(m => m.IndexComponent)
  }
]