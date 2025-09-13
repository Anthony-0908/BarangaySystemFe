import { inject, Injectable } from "@angular/core";
import {signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { AuthService } from "../../core/service/reset-password.service";
import { tap, catchError } from 'rxjs/operators';
import { User } from "../../model/user";
import { EMPTY } from "rxjs";

interface ResetPaswordState { 
  email:string;
  loading:boolean;
  success:boolean;
  error:string | null;
}

const initialState: ResetPaswordState = {
  email:"",
  loading:false,
  success:false,
  error:null,
}

@Injectable({
  providedIn: 'root'
})

export class ResetPasswordStore extends signalStore(
  withState(initialState),

  withMethods((store, authService = inject(AuthService)) => ({
    setEmail(email:string){
      patchState(store, {email});
    },

    resetPassword() {
      patchState(store, {loading:true, success:false, error:null});

      authService.resetpassword(store.email()).pipe(
        tap({
          next:() => { 
            patchState(store, {loading:false, success:true});

          },
          error:(err) => { 
            patchState(store, { 
              loading:false,
              error: err?.message || "An error occurred"
            });
          },
        }),
        catchError(() => { 
          patchState(store, {loading:false, error:"Unexpected error ", });
          return EMPTY;
        })
      ).subscribe();

    }
  }))
){}