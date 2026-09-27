import { inject, Injectable } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User} from '../user.model'
import { UserService } from '../../../core/service/user.service';
import { firstValueFrom, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { QueryParams } from '../../../core/helper/query-params';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  total: number;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
  total: 0,
};


export const IndexStore = signalStore(
    { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userService = inject(UserService)) => ({

     loadUsers: rxMethod<QueryParams>(
    pipe(
      tap(() => {
        patchState(store, {
          loading: true,
          error: null,
        });
      }),

    switchMap((params) =>
      userService.getUsers(params).pipe(
        tapResponse({
          next: (res) => {
            patchState(store, {
              users: res.records,
              total: res.pagination.total,
              loading: false,
            });
          },

          error: (err) => {
            console.error(err);

            patchState(store, {
              loading: false,
              error: 'Failed to load users',
            });
          },
        })
      )
    )
  )
),
  
    async loadUserById(id: number): Promise<void> {
      patchState(store, { loading: true, error: null });
      try {
       const user = await firstValueFrom<User>(userService.getUserById(id));
        patchState(store, { selectedUser: user, loading: false });
      } catch (err) {
        console.error(err);
        patchState(store, { error: 'Failed to load user', loading: false });
      }
    },

    /** Set selected user */
    setSelected(user: User) {
      patchState(store, { selectedUser: user });
    },

    /** Clear selected user */
    clearSelectedUser() {
      patchState(store, { selectedUser: null });
    },

    /** Update user */
    async updateUser(id: number, updated: Partial<User>): Promise<void> {
      patchState(store, { loading: true, error: null });
      try {
        const user = await firstValueFrom(userService.updateUser(id, updated));
        patchState(store, {
          selectedUser: user,
          users: store.users().map(u => (u.id === id ? user : u)),
          loading: false,
        });
      } catch (err) {
        console.error(err);
        patchState(store, { error: 'Failed to update user', loading: false });
      }
    },

    /** Delete user */
    async deleteUser(id: number): Promise<void> {
      patchState(store, { loading: true, error: null });
      try {
        await firstValueFrom(userService.deleteUser(id));
        patchState(store, {
          users: store.users().filter(u => u.id !== id),
          loading: false,
        });
      } catch (err) {
        console.error(err);
        patchState(store, { error: 'Failed to delete user', loading: false });
      }
    },
  }))
) 
