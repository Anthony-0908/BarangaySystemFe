import { inject } from "@angular/core";
import { UserService } from "../../../core/service/user.service";
import { User } from "../../../model/user";
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { tap } from 'rxjs/operators';;
export interface CreateUserState {
  users: User[];
  loading: boolean;
}

const initialState: CreateUserState = {
  users: [],
  loading: false,
};

export const CreateUserStore = signalStore(
  withState(initialState),
  withMethods((store) => {
    const userService = inject(UserService);

    return {
      addUser(user: User) {
        patchState(store, { loading: true });

        userService.create(user).pipe(
          tap(() => {
            patchState(store, {
              users: [...store.users(), user],
              loading: false,
            });
          })
        ).subscribe();
      },
    };
  })
);