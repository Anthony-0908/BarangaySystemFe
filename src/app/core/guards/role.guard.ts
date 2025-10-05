// core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  const token = authStore.token();
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const requiredRoles = route.data['roles'] as string[] | undefined;
  if (requiredRoles && requiredRoles.length > 0) {
    const userRoles = authStore.roles();
    const hasRole = requiredRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      router.navigate(['/forbidden']); // 👈 create ForbiddenComponent
      return false;
    }
  }

  return true;
};
