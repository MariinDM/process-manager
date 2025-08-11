import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorage } from '../services/local-storage';

export const authGuard: CanActivateFn = (route, state) => {
  const local = inject(LocalStorage);
  const router = inject(Router);

  const token = local.getItem('accessToken')

  if (token) {
    router.navigate(['/tracking']);
    return false;
  }

  return true;
};
