import { inject, Injectable, signal}  from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../core/service/reset-password.service";
import { LoginResponse } from "./login.model";

@Injectable({providedIn:"root"})
export class LoginStore { 
  private readonly store = inject(AuthService)
  private router = inject(Router)
  user = signal<LoginResponse | null>(null);
  token = signal<string | null>(localStorage.getItem("token"))
  roles = signal<string[]>(JSON.parse(localStorage.getItem("roles") || "[]"));
  loading = signal(false);
  error = signal<string | null>(null);


  login(email:string, password:string) 
  { 
    this.loading.set(true)
    this.error.set(null)

    this.store.login(email, password).subscribe({

    })
  }


    hasRole(role: string): boolean {
    return this.roles().includes(role);
  }

    isAuthenticated(): boolean {
      return !!this.token();
    }
}