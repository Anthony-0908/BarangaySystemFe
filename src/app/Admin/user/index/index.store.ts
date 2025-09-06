import { inject, Injectable } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../../../model/user';
import { UserService } from '../../../core/service/user.service';
import { firstValueFrom } from 'rxjs'; // <-- missing import
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  total:number;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
  total:0,
};

@Injectable({ providedIn: 'root' })
export class IndexStore extends signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userService = inject(UserService)) => ({

    // Load all users
  loadUsers: async (params?: any): Promise<void> => {
        patchState(store, { loading: true, error: null });
        try {
          const res = await firstValueFrom(userService.getUsers(params));
          patchState(store, { users: res.data, total: res.total, loading: false });
        } catch (err) {
          patchState(store, { error: 'Failed to load users', loading: false });
        }},

    // Select a user for update
    setSelected: (user: User) => {
      patchState(store, { selectedUser: user });
    },
    
      deleteUser: async (id: number) => { 
      patchState(store, { loading: true, error: null });
      try {
        await firstValueFrom(userService.deleteUser(id));
        patchState(store, {
          users: store.users().filter(u => u.id !== id),
          loading: false,
        });
      } catch (err) {
        patchState(store, { error: 'Failed to delete user', loading: false });
      }
    },

    // Clear selected user
    clearSelectedUser: () => {
      patchState(store, { selectedUser: null });
    },

    // Update user
    updateUser: async (id: number, updatedUser: Partial<User>) => {
      patchState(store, { loading: true, error: null });
      try {
        const user = await userService.updateUser(id, updatedUser).toPromise();
        if (!user) throw new Error('No user returned from API');

        patchState(store, {
          users: store.users().map(u => (u.id === id ? user : u)),
          loading: false,
          selectedUser: user
        });
      } catch (err) {
        patchState(store, { error: 'Failed to update user', loading: false });
      }
    }
  }))
) {}
