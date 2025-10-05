// core/interceptors/auth.interceptor.ts
import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { AuthStore } from '../store/auth.store';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authStore = inject(AuthStore);
  const token = authStore.token(); // raw token from store

  // Only attach token for requests going to your API (Laravel backend)
  if (token && req.url.startsWith('http://localhost:8000/api')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
