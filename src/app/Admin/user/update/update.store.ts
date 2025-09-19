import { Inject } from "@angular/core";
import { UserService } from "../../../core/service/user.service";
import { User} from "../../../model/user";
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { tap } from 'rxjs/operators';;

export interface UpdateUserState { 
  users: User[];
  loading:boolean;
}
const initialState: UpdateUserState = { 
  users:[],
  loading:false,
};

// export const UpdateUserState = signalStore(
//   withState(initialState),
//   withMethods((store) => {
    
//   })

// );