import { inject } from '@angular/core/primitives/di';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorage } from '../services/local-storage';

export const accessGuard: CanActivateFn = (route, state) => {
  const local = inject(LocalStorage);
  const router = inject(Router);

  const token = local.getItem('accessToken')

  if (!token) {
    router.navigate(['/auth']);
    return false;
  }

  return true;
};
