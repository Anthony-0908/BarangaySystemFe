import { Injectable, signal, computed, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  // Signals
  user = signal<LoginResponse['user'] | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  token = signal<string | null>(localStorage.getItem('token'));
  roles = signal<string[]>(JSON.parse(localStorage.getItem('roles') || '[]'));
  permissions = signal<string[]>(JSON.parse(localStorage.getItem('permissions') || '[]'));
  loading = signal(false);
  error = signal<string | null>(null);

  // Derived/computed signals
  isLoggedIn = computed(() => !!this.token());
  isAdmin = computed(() => this.roles().includes('Admin')); // ✅ note capital “A”

  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone
  ) {}

  /** ✅ Login */
  login(email: string, password: string) {
    this.loading.set(true);
    this.error.set(null);

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.user.set(res.user);
        this.token.set(res.access_token); // ✅ fixed key name
        this.roles.set(res.user.roles ?? []);
        this.permissions.set(res.user.permissions ?? []);

        // persist in localStorage
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('roles', JSON.stringify(res.user.roles ?? []));
        localStorage.setItem('permissions', JSON.stringify(res.user.permissions ?? []));

        // ✅ Run navigation inside Angular zone
        this.zone.run(() => this.router.navigateByUrl('/users'));
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Login failed');
      },
      complete: () => this.loading.set(false),
    });
  }

  /** ✅ Logout */
  logout() {
    this.authService.logout().subscribe({
      next: () => this.clearAuth(),
      error: () => this.clearAuth(),
      complete: () => this.router.navigateByUrl('/login'),
    });
  }

  /** ✅ Clear local state + storage */
  private clearAuth() {
    this.user.set(null);
    this.token.set(null);
    this.roles.set([]);
    this.permissions.set([]);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('permissions');
  }

  getToken(): string | null {
  return this.token() || localStorage.getItem('token');
}
}
