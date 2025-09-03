import {Component , inject, Injectable, OnInit} from '@angular/core';
import { UserService } from '../../../core/service/user.service';
import { User } from '../../../model/user';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';


interface UserState { 
  users:User[],
  loading:boolean;
  error:string | null;

}

const initialState: UserState = {
  users: [],
  loading:false,
  error:null,
}



@Injectable({ providedIn: 'root' })
export class IndexStore extends signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userService = inject(UserService)) => ({
    loadUsers: async () => {
      patchState(store, { loading: true, error: null });
      try {
        const users = await userService.getUsers().toPromise();
        console.log('Api is loaded', users);
        patchState(store, { users, loading: false });
      } catch (err) {
        patchState(store, { error: 'Failed to load users', loading: false });
      }
    },

    // addUser: async (user: Partial<User>) => {
    //   try {
    //     const newUser = await userService.createUser(user).toPromise();
    //     patchState(store, { users: [...store.users(), newUser] });
    //   } catch (err) {
    //     patchState(store, { error: 'Failed to add user' });
    //   }
    // },

    // deleteUser: async (id: number) => {
    //   try {
    //     await userService.deleteUser(id).toPromise();
    //     patchState(store, { users: store.users().filter(u => u.id !== id) });
    //   } catch (err) {
    //     patchState(store, { error: 'Failed to delete user' });
    //   }
    // },
  }))
) {}