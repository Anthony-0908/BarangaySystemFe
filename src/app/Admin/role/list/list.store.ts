import { inject,Injectable } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Role } from "../../../model/role";
import { RolesService } from "../../../core/service/roles.service";
import { firstValueFrom } from "rxjs";
import { UserService } from "../../../core/service/user.service";

interface RoleState { 
  roles: Role[];
  loading:boolean;
  error:string | null;
  selected: Role | null;
  total:number;
}

const initialState: RoleState = { 
  roles: [],
  loading:false,
  error:null,
  selected:null,
  total: 0
}

@Injectable({providedIn: 'root' })
export class ListStore extends signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, roleService = inject(RolesService)) => ({
    
    loadRoles: async (params?: any): Promise<void> => { 
      patchState(store, {loading:true , error:null});
      try{
        const res = await firstValueFrom(roleService.getRoles(params));
        patchState(store, {roles: res.data, total:res.total, loading:false});
      }catch(err)
      {
       patchState(store, {error:'Failed to load roles', loading:false});
      }
    },

    selectedRole: (id:number) => { 
      const role = store.roles().find(r => r.id === id) ?? null;
      patchState(store, {selected:role});
    },
  }))
){}