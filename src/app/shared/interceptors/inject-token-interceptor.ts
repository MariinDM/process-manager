import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorage } from '../services/local-storage';

export const injectTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const local = inject(LocalStorage)
  const accessToken = local.getItem('accessToken');

  if (accessToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next(authReq);
  }

  return next(req);
};