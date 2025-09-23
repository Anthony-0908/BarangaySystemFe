import {inject, Injectable} from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Role } from "../../model/role";
import { RolesService } from "../../core/service/roles.service";
import { firstValueFrom } from 'rxjs'; // <-- missing import

interface RoleState{
  roles: Role[];
  loading: boolean;
  error: string | null;

}

const initialState: RoleState = {
  roles:[],
  loading:false,
  error:null,

};

@Injectable({ providedIn: 'root' })
export class RolesStore extends signalStore(
  withState(initialState),
  withMethods((store, rolesService = inject(RolesService)) => ({
    loadRoles: async (params?: any) => {
      patchState(store, { loading: true, error: null });
      try {
        const roles = await firstValueFrom(rolesService.getRoles(params));
        patchState(store, { roles:roles, loading: false });
        console.log('Roles:', roles); 
      } catch (err) {
        patchState(store, { error: 'Failed to load roles', loading: false });
      }
    },
  }))
) {}