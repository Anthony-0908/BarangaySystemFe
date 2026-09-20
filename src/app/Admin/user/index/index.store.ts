import { inject, Injectable } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User} from '../user.model'
import { UserService } from '../../../core/service/user.service';
import { firstValueFrom } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class IndexStore extends signalStore(
  withState(initialState),
  withMethods((store, userService = inject(UserService)) => ({

   async loadUsers(params?: any): Promise<void> {
  patchState(store, {
    loading: true,
    error: null
  });

  try {
    const res = await firstValueFrom(
      userService.getUsers(params)
    );

    console.log('API RESPONSE:', res);
    console.log('API DATA:', res);
    console.log('RECORDS:', res.records);
    console.log('PAGINATION:', res.pagination);

    patchState(store, {
      users: res.records,
      total: res.pagination.total,
      loading: false
    });

    console.log('STORE USERS:', store.users());
    console.log('STORE TOTAL:', store.total());

  } catch (err) {
    console.error('LOAD USERS ERROR:');

    patchState(store, {
      error: 'Failed to load users',
      loading: false
    });
  }
},

  
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
) {}
