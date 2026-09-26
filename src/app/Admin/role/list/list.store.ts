import { inject, Injectable } from '@angular/core';
import {
  patchState,
  signalStore,
  withMethods,
  withState
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';

import { Role } from '../../../model/role';
import { RolesService } from '../../../core/service/roles.service';

interface RoleState {
  roles: Role[];
  loading: boolean;
  error: string | null;
  selected: Role | null;
  total: number;
}

const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null,
  selected: null,
  total: 0
};

export const ListStore = signalStore(
  {providedIn: 'root'},

  withState(initialState),

  withMethods((store, roleService = inject(RolesService)) => ({

    loadRoles: async (params?: any): Promise<void> => {
      patchState(store, {
        loading: true,
        error: null
      });

      try {
        const res = await firstValueFrom(
          roleService.getRoles(params)
        );

        patchState(store, {
          roles: res.records,
          total: res.pagination.total,
          loading: false
        });

      } catch (err) {
        patchState(store, {
          error: 'Failed to load roles',
          loading: false
        });
      }
    },

    selectedRole: (id: number): void => {
      const role =
        store.roles().find(role => role.id === id) ?? null;

      patchState(store, {
        selected: role
      });
    }

  }))
)